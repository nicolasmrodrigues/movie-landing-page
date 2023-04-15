document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(button) {
            const tabName = button.target.dataset.tabButton;
            const tab = document.querySelector(`[data-tab-id=${tabName}]`).children[0]
            hideTabs();
            tab.classList.add('tab--show')
            removeActiveButton();
            button.target.classList.add('tab-navegation-button--is-active')
        })
    }
})

function hideTabs() {
    const tabs = document.querySelectorAll('[data-tab-id]')

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].children[0].classList.remove('tab--show')
    }
}

function removeActiveButton() {
    const buttons = document.querySelectorAll('[data-tab-button]')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('tab-navegation-button--is-active');
    }
}