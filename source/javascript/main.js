document.addEventListener('DOMContentLoaded', function() {    
    const buttons = $('[data-tab-button]');
    langOptions = $('.lang-option');
    browserDefaultLanguage = window.navigator.language.slice(0, 2);
    chosenLanguage = '';
    langElems = $('[lang]');

    if (browserDefaultLanguage === 'pt' && !window.location.hash) {
        window.location.hash = '#pt-br';
    } else if (browserDefaultLanguage !== 'pt' && !window.location.hash){
        window.location.hash = '#en';
    }
    
    changesHeaderSize();
    translate();

    window.scrollBy(0, 1)

    window.onscroll = function() {
        changesHeaderSize();
        placesMoviesCovers();
    }

    $("body").fadeIn("slow");

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
    const header = $('.header')[0];
    const brading = $('.branding')[0];
    const langMenu = $('#lang-submenu')[0];
    const genresMenu = $('#genre-submenu')[0];
    const nav = $('.navegation__list')[0];
    const navItens = $('.navegation__item');
    const navArrow = $('.navegation__arrow')[0];
    const searchInput = $('.account-and-search__input')[0];
    const background = $('.background')[0];
    
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
    const tabs = $('[data-tab-id]');

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].children[0].classList.remove('tab--show');
    }
}

function removeActiveButton() {
    const buttons = $('[data-tab-button]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('tab-navegation-button--is-active');
    }
}

function defineLangAbbr() {
    const langText = document.getElementsByClassName('lang-abbr')[0];
    let currentLanguage = document.documentElement.lang
    
    if (currentLanguage == 'pt-BR') {
        langText.innerHTML = 'PT';
    } else {
        langText.innerHTML = 'EN';
    }
}

async function translate() {
    const requestURL = "./data/langData.json";
    const request = new Request(requestURL);
    
    const response = await fetch(request);
    const langData = await response.json();

    langDataEn = langData.languages.en.strings;
    langDataPt = langData.languages.pt.strings;

    if (window.location.hash === '#en') {
        for (let i = 0; i < langElems.length; i++) {
            translatesContent(langDataEn, i)
        }
    } else if (window.location.hash === '#pt-br') {
        for (let i = 0; i < langElems.length; i++) {
            translatesContent(langDataPt, i)
        }
    }

    for (let i = 0; i < langOptions.length; i++) {
        langOptions[i].addEventListener('click', function() {
            chosenLanguage =  langOptions[i].innerHTML
            
            if (chosenLanguage === 'English') {
                for (let i = 0; i < langElems.length; i++) {
                    translatesContent(langDataEn, i)
                }
            } else if (chosenLanguage ==='Português') {
                for (let i = 0; i < langElems.length; i++) {
                    translatesContent(langDataPt, i)
                }
            }
        })
        defineLangAbbr();
    }
    window.addEventListener('hashchange', function() {
        if (chosenLanguage == '') {
            window.location.reload(true)
        } else {
            defineLangAbbr();
        }
        chosenLanguage = '';
    })
}

function placesMoviesCovers() {
    const movies = $('.flickity-slider')[0].children
    const currentLanguage = document.documentElement.lang.slice(0, 2)
    
    for (let i = 0; i < movies.length; i++) {
        movies[i].style.backgroundImage = `url('./images/other-movies/${currentLanguage}/movie${i+1}.webp')`;
    }
}

function translatesContent(langData) {
    let languageCode;

    if (langData === langDataEn) {
        languageCode = 'en'
    } else {
        languageCode = 'pt-BR'
    }
    
    for (let i = 0; i < langElems.length; i++) {
        langElems[i].lang = languageCode
        if (i !== 0) {
            if (langElems[i].placeholder !== undefined) {
                langElems[i].placeholder = Object.values(langData)[i-1]
            } else if (langElems[i].alt !== undefined) {
                langElems[i].alt = Object.values(langData)[i-1]
            } else {
                langElems[i].textContent = Object.values(langData)[i-1]
            }
        }
    }
}