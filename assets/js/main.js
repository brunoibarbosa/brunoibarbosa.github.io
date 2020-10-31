// Adiciona overlay ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('section')
    overlay.classList.add('overlay')

    document.querySelector('#main-header > .container').appendChild(overlay)
})

// Header Sticky
function headerSticky() {
    const navbarSticky = document.querySelector('#main-header')

    window.addEventListener('scroll', () => {
        pageYOffset > 0 ? navbarSticky.classList.add('sticky') : navbarSticky.classList.remove('sticky')
    })
}
headerSticky()

// Menu Toggle
function showMenu() {
    const menuToggle = document.querySelector('.menu-toggle')
    menuToggle.addEventListener('click', (e) => {
        e.target.classList.toggle('active')
    })
}
showMenu()