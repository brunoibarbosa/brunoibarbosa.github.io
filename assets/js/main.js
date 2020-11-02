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

// Recupera repositórios do Github
async function getRepoGithub() {
    const repositorios = await axios('https://api.github.com/users/brunoibarbosa/repos')
    return repositorios.data
}

// Cria card e coloca dentro do container passado como parâmetro
async function createCard(classContainer) {
    const container = document.querySelector(classContainer)
    const repos = await getRepoGithub()


    for (const key in repos) {
        const section = document.createElement('section')
        section.classList.add('card')

        const img = document.createElement('img')

        img.setAttribute('src', `https://raw.githubusercontent.com/brunoibarbosa/${repos[key].name}/main/.github/logo.svg`)

        section.appendChild(img)
        container.appendChild(section)
    }

    new Glider(document.querySelector('.js-carousel'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dragVelocity: 2,
        scrollLock: true,
        dots: ".js-carousel--dots",
        arrows: {
            prev: ".js-carousel--prev",
            next: ".js-carousel--next",
        },
    });

}
createCard('.repo-github .js-carousel')
