const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
})
const emoji = require('markdown-it-emoji')
const fs = require('fs')
const Parser = require('rss-parser')

const parser = new Parser()

const feedUrl = 'https://chrisotto.dev/feed.xml'
const websiteUrl = 'https://chrisotto.dev/'
const twitterUrl = 'https://twitter.com/chris_otto6'
const linkedInUrl = 'https://www.linkedin.com/in/ottochristopher/'
const instagramUrl = 'https://www.instagram.com/chris_otto6/'
const mediumUrl = 'https://medium.com/@chris_otto6'
const devToUrl = 'https://dev.to/chrisotto'
const blogPostLimit = 5
const badgeHeight = '25'

md.use(emoji)

;(async () => {
  let blogPosts = ''
  try {
    blogPosts = await loadBlogPosts()
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e)
  }

  const twitterBadge = `[<img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=${badgeHeight}>](${twitterUrl})`
  const linkedInBadge = `[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" height=${badgeHeight}>](${linkedInUrl})`
  const instagramBadge = `[<img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" height=${badgeHeight}>](${instagramUrl})`
  const mediumBadge = `[<img src="https://img.shields.io/badge/medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" height=${badgeHeight}>](${mediumUrl})`
  const devToBadge = `[<img src="https://img.shields.io/badge/DEV.TO-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" height=${badgeHeight}>](${devToUrl})`

  const text = `# Hi :wave:\n\n
  ${twitterBadge} ${linkedInBadge} ${instagramBadge} ${mediumBadge} ${devToBadge}\n\n
  [:computer:  Check out my website](${websiteUrl})\n\n
  ## Latest Blog Posts\n
  ${blogPosts}`

  const result = md.render(text)

  fs.writeFile('README.md', result, function (err) {
    if (err) return console.log(err)
    console.log(`${result} > README.md`)
  })
})()

async function loadBlogPosts() {
  const feed = await parser.parseURL(feedUrl)

  let links = ''

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link}>${item.title}</a></li>`
  })

  return `
  <ul>
    ${links}
  </ul>\n
  [:arrow_right:  More blog posts](${websiteUrl})
  `
}
