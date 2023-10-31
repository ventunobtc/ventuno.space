const pug = require('pug')
const { mkdirSync, writeFileSync } = require('fs')
const { dirname, resolve } = require('path')

const config = require('../pug.config')
const site = require('../generated/site-data.json')
const episodes = require('../generated/episodes.json')
const donationregister = require('../generated/donationregister.json')
const donationoverview = require('../content/donationoverview.json').reverse()
const team = require('../content/team.json')
const courses = require('../content/courses.json')
const shops = require('../content/shops.json')
const soundboard = require('../content/soundboard.json')
const adventcalendar = require('../content/adventcalendar-2022.json')

const renderPage = (template, out, data = {}) => {
  const file = resolve(__dirname, '..', `src/${template}.pug`)
  const options = Object.assign({}, config, { site }, data)
  const rendered = pug.renderFile(file, options)
  const dest = out === 'index' ? 'index.html' : `${out}/index.html`
  const dst = resolve(__dirname, '..', 'dist', dest)
  const dir = dirname(dst)

  mkdirSync(dir, { recursive: true })
  writeFileSync(dst, rendered)
}

const sortMeetupId = m => `${m.country === 'IT' ? '0' : m.country}-${m.name}`
const meetupsSorted = site.meetups.sort((a, b) => {
  return sortMeetupId(a) > sortMeetupId(b) ? 1 : -1
})

const sortEventId = m => `${m.country === 'IT' ? '0' : m.country}-${m.name}`
const eventsSorted = site.events.sort((a, b) => {
  return sortEventId(a) > sortEventId(b) ? 1 : -1
})

renderPage('index', 'index', { navCurrent: 'index', currentEpisode: episodes[0] })
renderPage('podcast', 'podcast', { navCurrent: 'podcast', episodes: [...episodes] })

renderPage('meetups', 'meetup', { navCurrent: 'meetups', meetups: meetupsSorted })
renderPage('events', 'eventi', { navCurrent: 'events', events: eventsSorted })
//renderPage('courses', 'corsi', { navCurrent: 'corsi', courses })
renderPage('guides', 'guide', { navCurrent: 'guide' })
renderPage('books', 'libri', { navCurrent: 'libri' })
renderPage('donations', 'donazioni', { navCurrent: 'donazioni', donationregister, donationoverview })
renderPage('shops', 'shop', { navCurrent: 'shops', shops })

renderPage('media', 'media', { navCurrent: 'media' })
renderPage('social', 'social', { navCurrent: 'social' })
renderPage('team', 'team', { navCurrent: 'team', team })
//renderPage('soundboard', 'soundboard', { navCurrent: 'soundboard', soundboard })
//renderPage('telegram', 'telegram', { navCurrent: 'telegram', telegram: site.telegram })

renderPage('events/satoshis-bleibe-2022', 'events/satoshis-bleibe-2022', { navCurrent: 'events'})
renderPage('events/bitcoin-im-laendle-2022', 'events/bitcoin-im-laendle-2022', { navCurrent: 'events' })
renderPage('events/sommerfest-hodler-heide-2022', 'events/sommerfest-hodler-heide-2022', { navCurrent: 'events'})
renderPage('events/satoshis-beach-2022', 'events/satoshis-beach-2022', { navCurrent: 'events'})

//renderPage('verein', 'verein', { navCurrent: 'verein' })
//renderPage('contact', 'contact', { navCurrent: 'contact' })
//renderPage('privacy', 'privacy', { navCurrent: 'privacy' })

//renderPage('adventcalendar', 'avvento', { adventcalendar })

renderPage('category', 'podcast/news', { navCurrent: 'podcast', category: 'news', categoryName: 'News', episodes: episodes.filter(e => e.category === 'news') })
renderPage('category', 'podcast/ingterviste', { navCurrent: 'podcast', category: 'interview', categoryName: 'Interviews', episodes: episodes.filter(e => e.category === 'interview') })
renderPage('category', 'podcast/letteratura', { navCurrent: 'podcast', category: 'literature', categoryName: 'Literature', episodes: episodes.filter(e => e.category === 'literature') })
renderPage('category', 'podcast/der-weg', { navCurrent: 'podcast', category: 'der-weg', categoryName: 'Der Weg', episodes: episodes.filter(e => e.category === 'der-weg') })
renderPage('category', 'podcast/verschiedenes', { navCurrent: 'podcast', category: 'verschiedenes', categoryName: 'Verschiedenes', episodes: episodes.filter(e => e.category === 'verschiedenes') })
episodes.forEach(episode => renderPage('episode', `podcast/${episode.slug}`, { navCurrent: 'podcast', episode, team }))
