document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(button) {
            const tabName = button.target.dataset.tabButton;
            const tab = document.querySelector(`[data-tab-id=${tabName}]`)
            hideTabs();
            tab.classList.add('tabs__tab--show')
            removeActiveButton();
            button.target.classList.add('tabs__button--is-active')
        })
    }
})

function hideTabs() {
    const tabs = document.querySelectorAll('[data-tab-id]')

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tabs__tab--show')
    }
}

function removeActiveButton() {
    const buttons = document.querySelectorAll('[data-tab-button]')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('tabs__button--is-active');
    }
}