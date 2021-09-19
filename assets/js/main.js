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
    return {
      itemMenu,
      distanceActive
    }
  })

  document.addEventListener('scroll', checkDistance)

  function checkDistance() {
    for (const i in sectionDistance) {
      const {
        distanceActive,
        itemMenu
      } = sectionDistance[i]

      if (distanceActive >= scrollY) {
        try {
          document.querySelector('.item-menu > a.active').classList.remove('active')
        } catch (e) {}

        itemMenu.classList.add('active')
        break
      }
    }
  }
  checkDistance()
}

// Recupera repositório GitHub
async function getRepoGitHub() {
  try {
    const {
      data
    } = await axios('https://api.github.com/users/brunoibarbosa/repos')
    return data
  } catch (e) {
    throw new Error(e)
  }
}

// Cria os cards que vão dentro do carousel
async function createCardsGitHub() {
  try {
    const repos = await getRepoGitHub()
    const cards = []

    for (const key in repos) {
      const {
        login
      } = repos[key].owner
      const {
        name,
        description,
        default_branch,
        html_url
      } = repos[key]

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

// Cria cards dos projetos do Figma
function createCardsFigma() {
  const projetos = [{
      title: 'LightNote',
      description: 'O LightNote é uma aplicação criada para fazer anotações rápidas.',
      image: './assets/img/lightnote.svg',
      urlDesktop: '',
      urlMobile: 'https://www.figma.com/file/CgNH1xlUjqmDYB1IIsMVqr/LightNote?node-id=0%3A1',
      urlProtoDesktop: '',
      urlProtoMobile: 'https://www.figma.com/proto/CgNH1xlUjqmDYB1IIsMVqr/LightNote?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2'
    },
    {
      title: 'SaúdeTracking',
      description: 'A aplicação do SaúdeTracking tem como objetivo detectar possíveis surtos de doenças em cidades, regiões e estados.',
      image: './assets/img/saude-tracking.svg',
      urlDesktop: 'https://www.figma.com/file/F7Xytbop4wXtgkVop8fdIM/Projeto---Sa%C3%BAdeTracking',
      urlMobile: 'https://www.figma.com/file/2kqNfJiAjvAyrcxw6iEctk/Sa%C3%BAdeTracking-(Mobile)',
      urlProtoDesktop: 'https://www.figma.com/proto/F7Xytbop4wXtgkVop8fdIM/Projeto---Sa%C3%BAdeTracking?scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A4',
      urlProtoMobile: 'https://www.figma.com/proto/2kqNfJiAjvAyrcxw6iEctk/Sa%C3%BAdeTracking-(Mobile)?scaling=scale-down&page-id=0%3A1&starting-point-node-id=226%3A13'
    },
    {
      title: 'Mão de Vaca',
      description: 'O aplicativo Mão de Vaca é um gerenciador de custos doméstico.',
      image: './assets/img/mao-de-vaca.svg',
      urlDesktop: '',
      urlMobile: 'https://www.figma.com/file/rh8judqBVaF2EX3W6l2BfW/M%C3%A3o-de-Vaca',
      urlProtoDesktop: '',
      urlProtoMobile: 'https://www.figma.com/proto/rh8judqBVaF2EX3W6l2BfW/M%C3%A3o-de-Vaca?node-id=15%3A7&scaling=scale-down&page-id=0%3A1&starting-point-node-id=5%3A2'
    },
    {
      title: 'Netflix Clone',
      description: 'Cópia do layout da Netflix feito com o intuito de aprendizado.',
      image: './assets/img/netflix-clone.svg',
      urlDesktop: '',
      urlMobile: 'https://www.figma.com/file/vTbxcSpKVKxWpWNizdcWdF/Netflix---Clone?node-id=0%3A1',
      urlProtoDesktop: '',
      urlProtoMobile: 'https://www.figma.com/proto/vTbxcSpKVKxWpWNizdcWdF/Netflix---Clone?node-id=0%3A1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A4'
    }
  ]
  const cards = []

  projetos.forEach(proj => {
    const section = document.createElement('section')
    section.classList.add('card')

    const img = document.createElement('img')
    img.setAttribute('src', proj.image)
    section.appendChild(img)

    const h2 = document.createElement('h2')
    h2.textContent = proj.title
    section.appendChild(h2)

    const p1 = document.createElement('p')
    p1.textContent = proj.description
    section.appendChild(p1)


    const p2 = document.createElement('p')
    p2.textContent = 'Acessar Figma: '

    if (proj.urlDesktop !== '') {
      const linkDesktop = document.createElement('a')
      linkDesktop.setAttribute('href', proj.urlDesktop)
      linkDesktop.setAttribute('target', '_blank')
      linkDesktop.textContent = 'Desktop'
      p2.appendChild(linkDesktop)
      if (proj.urlMobile !== '') {
        p2.innerHTML = p2.innerHTML + ' e '
      }
    }

    if (proj.urlMobile !== '') {
      const linkMobile = document.createElement('a')
      linkMobile.setAttribute('href', proj.urlMobile)
      linkMobile.setAttribute('target', '_blank')
      linkMobile.textContent = 'Mobile'
      p2.appendChild(linkMobile)
    }

    section.appendChild(p2)

    if (proj.urlProtoDesktop !== '') {
      const aDesktop = document.createElement('a')
      aDesktop.setAttribute('href', proj.urlProtoDesktop)
      aDesktop.setAttribute('target', '_blank')
      aDesktop.textContent = 'Protótipo Desktop'
      section.appendChild(aDesktop)
    }

    if (proj.urlProtoMobile !== '') {
      const aMobile = document.createElement('a')
      aMobile.setAttribute('href', proj.urlProtoMobile)
      aMobile.setAttribute('target', '_blank')
      aMobile.textContent = 'Protótipo Mobile'
      section.appendChild(aMobile)
    }

    cards.push(section)
  })
  return cards
}

// Cria o carousel e coloca dentro do container passado como parâmetro
async function createCarousel(classContainer, cards) {
  try {
    const container = document.querySelector(`${classContainer} .js-carousel`)
    cards.forEach(card => {
      container.appendChild(card)
    })

    // Quando a primeira imagem carregar, é calculado o tamanho das seções
    container.querySelector('.card > img').addEventListener('load', activeSection)

  } catch (e) {
    throw new Error(e)
  }

  new Glider(document.querySelector(`${classContainer} .js-carousel`), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dragVelocity: 2,
    scrollLock: true,
    dots: `${classContainer} .js-carousel--dots`,
    arrows: {
      prev: `${classContainer} .js-carousel--prev`,
      next: `${classContainer} .js-carousel--next`,
    },
    scrollLockDelay: 50,
    responsive: [{
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

async function carouselGenerator() {
  try {
    let cards = await createCardsGitHub()
    createCarousel('.repo-github', cards)

    cards = createCardsFigma()
    createCarousel('.portfolio-design', cards)
  } catch (e) {
    console.log(e)
  }
}
carouselGenerator()
