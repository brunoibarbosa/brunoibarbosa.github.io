// Adiciona overlay ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('section')
    overlay.classList.add('overlay')

    document.querySelector('#main-header > .container').appendChild(overlay)
})

// Header Sticky
function headerSticky() {
    const navbarSticky = document.querySelector('#main-header')

    window.addEventListener('DOMContentLoaded', addSticky)
    window.addEventListener('scroll', addSticky)

    function addSticky() {
        pageYOffset > 0 ? navbarSticky.classList.add('sticky') : navbarSticky.classList.remove('sticky')
    }
}
headerSticky()

// Menu Toggle
function showMenu() {
    const menuToggle = document.querySelector('.menu-toggle')
    menuToggle.addEventListener('click', (e) => {
        e.target.classList.toggle('active')
    })

    window.addEventListener('resize', () => menuToggle.classList.remove('active'))
}
showMenu()

// Identifica seção ativa e marca no menu
function activeSection() {
    const sections = [...document.querySelectorAll('main > section')]
    const sectionDistance = sections.map(sec => {
        const itemMenu = document.querySelector(`.item-menu.${sec.id} > a`)
        const distanceActive = sec.offsetTop + (sec.offsetHeight / 2)
        return { itemMenu, distanceActive }
    })

    document.addEventListener('scroll', checkDistance)

    function checkDistance() {
        for (const i in sectionDistance) {
            const { distanceActive, itemMenu } = sectionDistance[i]

            if (distanceActive >= scrollY) {
                try {
                    document.querySelector('.item-menu > a.active').classList.remove('active')
                } catch (e) { }

                itemMenu.classList.add('active')
                break
            }
        }
    }
    checkDistance()
}

// Recupera repositórios do Github
async function getRepoGithub() {
    try {
        const { data } = await axios('https://api.github.com/users/brunoibarbosa/repos')
        return data
    } catch (e) {
        throw new Error(e)
    }
}

// Cria os cards que vão dentro do carousel
async function createCards() {
    try {
        const repos = await getRepoGithub()
        const cards = []

        for (const key in repos) {
            const { login } = repos[key].owner
            const { name, description, default_branch, html_url } = repos[key]

            const section = document.createElement('section')
            section.classList.add('card')

            const img = document.createElement('img')
            img.setAttribute('src', `https://raw.githubusercontent.com/${login}/${name}/${default_branch}/.github/logo.svg`)

            const p = document.createElement('p')
            p.textContent = description

            const a = document.createElement('a')
            a.setAttribute('href', html_url)
            a.setAttribute('target', '_blank')
            a.textContent = 'Ver mais no GitHub'

            section.appendChild(img)
            section.appendChild(p)
            section.appendChild(a)
            cards.push(section)
        }
        return cards

    } catch (e) {
        throw new Error(e)
    }
}

// Cria o carousel e coloca dentro do container passado como parâmetro
async function createCarousel(classContainer) {
    try {
        const container = document.querySelector(classContainer)
        const cards = await createCards()
        cards.forEach(card => {
            container.appendChild(card)
        })

        // Quando a primeira imagem carregar, é calculado o tamanho das seções
        container.querySelector('.card > img').addEventListener('load', activeSection)

    } catch (e) {
        throw new Error(e)
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
        scrollLockDelay: 50,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });
}
createCarousel('.repo-github .js-carousel')
