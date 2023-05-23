document.addEventListener('DOMContentLoaded', function() {    
    const buttons = document.querySelectorAll('[data-tab-button]');
    langOptions = document.getElementsByClassName('lang-option');
    browserLanguage = window.navigator.language.slice(0, 2);
    languagePreference = sessionStorage.languagePreference
    previusLanguage = sessionStorage.previusLanguage
    
    changesHeaderSize();
    translate();
    defineLangAbbr();

    window.scrollBy(0, 1);

    window.onscroll = function() {
        changesHeaderSize();
        placesMoviesCovers();
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(button) {
            const tabName = button.target.dataset.tabButton;
            const tab = document.querySelector(`[data-tab-id=${tabName}]`).children[0];
            hideTabs();
            tab.classList.add('tab--show');
            removeActiveButton();
            button.target.classList.add('tab-navegation-button--is-active');
        })
    }
})

function changesHeaderSize() {
    const header = document.getElementsByClassName('header')[0];
    const brading = document.getElementsByClassName('branding')[0];
    const langMenu = document.getElementById('lang-submenu');
    const genresMenu = document.getElementById('genre-submenu');
    const nav = document.getElementsByClassName('navegation__list')[0];
    const navItens = document.getElementsByClassName('navegation__item');
    const navArrow = document.getElementsByClassName('navegation__arrow')[0];
    const searchInput = document.getElementsByClassName('account-and-search__input')[0];
    const background = document.getElementsByClassName('background')[0];
    
    if (scrollY > 150) {
        header.style.height = '55px';
        brading.style.height = '35px';
        nav.style.marginLeft = '30px';
        langMenu.style.transform = '';
        genresMenu.style.transform = '';
        navArrow.style.marginLeft = '5px';
        searchInput.style.padding = '7px 10px'
        background.style.backgroundColor = 'rgba(0, 5, 13, .8)'

        for (let i = 0; i < navItens.length; i++) {
            navItens[i].style.margin = '0 9px';
        }
        
    } else {
        header.style.height = '';
        brading.style.height = '';
        langMenu.style.transform = 'translate(-55px, 76px)';
        genresMenu.style.transform = 'translate(-25px, 132px)';
        nav.style.marginLeft  = '';
        navArrow.style.marginLeft = '';
        searchInput.style.padding = ''
        background.style.backgroundColor = ''

        for (let i = 0; i < navItens.length; i++) {
            navItens[i].style.margin = '0 12px';
        }
    }
}

function hideTabs() {
    const tabs = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].children[0].classList.remove('tab--show');
    }
}

function removeActiveButton() {
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('tab-navegation-button--is-active');
    }
}

function defineLangAbbr() {
    const langText = document.getElementsByClassName('lang-abbr')[0];
    lang = document.getElementsByClassName('selected')[0].innerHTML;
    
    if (lang == 'Português') {
        langText.innerHTML = 'PT';
    } else {
        langText.innerHTML = 'EN';
    }
}

async function translate() {
    const requestURL = "./data/langData.json";
    const request = new Request(requestURL);
    
    const response = await fetch(request);
    languages = await response.json();

    let langElems = document.querySelectorAll('[lang]')
    
    if (!languagePreference) {
        if (browserLanguage != 'pt') {
            changesSelectedLanguage('en')
    
            for (let i = 0; i < langElems.length; i++) {
                langElems[i].lang = 'en'
                if (i > 0) {
                    translatesContent('en', i);
                }
            }
        } else {
            changesSelectedLanguage('pt');
        }
    } else {
        if (previusLanguage == 'English') {
            changesSelectedLanguage('en')
            for (let i = 0; i < langElems.length; i++) {
                langElems[i].lang = 'en'
                if (i > 0) {
                    translatesContent('en', i);
                }
            }
        }
    }

    for (let i = 0; i < langOptions.length; i++) {
        langOptions[i].addEventListener('click', function() {
            if (langOptions[i].innerHTML == 'English') {
                for (let i = 0; i < langElems.length; i++) {
                    langElems[i].lang = 'en'
                    if (i > 0) {
                        translatesContent('en', i);
                    }
                }
            }
            if (langOptions[i].innerHTML == 'Português') {
                for (let i = 0; i < langElems.length; i++) {
                    langElems[i].lang = 'pt-BR'
                    if (i > 0) {
                        translatesContent('pt', i);
                    }
                }
            }
            languagePreference = true
            window.onbeforeunload = function(e) {
                let previusLanguage = document.getElementsByClassName('selected')[0].innerHTML;
                sessionStorage.setItem('previusLanguage', previusLanguage)
                sessionStorage.setItem('languagePreference', true)
            }
        })
    }
}

function placesMoviesCovers() {
    const gallery = document.querySelector('.flickity-slider');
    const galleryChildren = gallery.children
    if (lang == 'English') {
        for (let i = 0; i < galleryChildren.length; i++) {
            galleryChildren[i].style.backgroundImage = `url('./images/other-movies/en/movie${i+1}.webp')`;
        }
    } else {
        for (let i = 0; i < galleryChildren.length; i++) {
            galleryChildren[i].style.backgroundImage = `url('./images/other-movies/pt/movie${i+1}.webp')`;
        }
    }
}

function changesSelectedLanguage(lang) {
    if (lang === undefined) {
        for (let x = 0; x < langOptions.length; x++) {
            langOptions[x].addEventListener('click', function() {
                document.getElementsByClassName('selected')[0].classList.remove('selected')
                langOptions[x].classList.add('selected');
            })
        }
    } else if (lang == 'en') {
        langOptions[0].classList.remove('selected');
        langOptions[1].classList.add('selected');
    } else if (lang == 'pt') {
        langOptions[0].classList.add('selected');
        langOptions[1].classList.remove('selected');
    }
    defineLangAbbr();
}

function translatesContent(lang, langElemIndex) {
    let langElems = document.querySelectorAll('[lang]')

    let langDataEn = languages.languages.en.strings
    let langDataPt = languages.languages.pt.strings

    if (lang == 'en') {
        changesSelectedLanguage('en');

        if (langElems[langElemIndex].placeholder !== undefined) {
            langElems[langElemIndex].placeholder = Object.values(langDataEn)[langElemIndex-1]
        } else if (langElems[langElemIndex].alt !== undefined) {
            langElems[langElemIndex].alt = Object.values(langDataEn)[langElemIndex-1]
        } else {
            langElems[langElemIndex].textContent = Object.values(langDataEn)[langElemIndex-1]
        }
    } else if (lang == 'pt') {
        changesSelectedLanguage('pt');

        if (langElems[langElemIndex].placeholder !== undefined) {
            langElems[langElemIndex].placeholder = Object.values(langDataPt)[langElemIndex-1]
        } else if (langElems[langElemIndex].alt !== undefined) {
            langElems[langElemIndex].alt = Object.values(langDataPt)[langElemIndex-1]
        } else {
            langElems[langElemIndex].textContent = Object.values(langDataPt)[langElemIndex-1]
        }
    }
}