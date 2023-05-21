document.addEventListener('DOMContentLoaded', function() {    
    const buttons = document.querySelectorAll('[data-tab-button]');
    const langOptions = document.getElementsByClassName('lang-option');

    changesHeaderSize();
    defineLangAbbr();
    translate();
    
    window.onscroll = function() {
        changesHeaderSize();
    }
    
    for (let x = 0; x < langOptions.length; x++) {
        langOptions[x].addEventListener('click', function() {
            for (let y = 0; y < langOptions.length; y++) {
                langOptions[y].classList.remove('selected');
            }
            langOptions[x].classList.add('selected');
            defineLangAbbr();
        })
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
    const gallery = document.querySelector('.flickity-slider');
    lang = document.getElementsByClassName('selected')[0].innerHTML;
    if (gallery !== null) {
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
    const languages = await response.json();
    
    let langDataEn = languages.languages.en.strings
    let langDataPt = languages.languages.pt.strings
    let langOptions = document.getElementsByClassName('lang-option');
    let langElems = document.querySelectorAll('[lang]')

    for (let i = 0; i < langOptions.length; i++) {
        langOptions[i].addEventListener('click', function() {
            if (langOptions[i].innerHTML == 'English') {
                for (let i = 0; i < langElems.length; i++) {
                    langElems[i].lang = 'en'
                    if (i > 0) {
                        if (langElems[i].placeholder !== undefined) {
                            langElems[i].placeholder = Object.values(langDataEn)[i-1]
                        } else if (langElems[i].alt !== undefined) {
                            langElems[i].alt = Object.values(langDataEn)[i-1]
                        } else {
                            langElems[i].textContent = Object.values(langDataEn)[i-1]
                        }
                    }
                }
            }
            if (langOptions[i].innerHTML == 'Português') {
                for (let i = 0; i < langElems.length; i++) {
                    langElems[i].lang = 'pt-BR'
                    if (i > 0) {
                        if (langElems[i].placeholder !== undefined) {
                            langElems[i].placeholder = Object.values(langDataPt)[i-1]
                        } else if (langElems[i].alt !== undefined) {
                            langElems[i].alt = Object.values(langDataPt)[i-1]
                        } else {
                            langElems[i].textContent = Object.values(langDataPt)[i-1]
                        }
                    }
                }
            }
        })
    }
}
