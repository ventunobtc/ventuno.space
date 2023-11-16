/*const pug = require('pug')
const { mkdirSync, writeFileSync } = require('fs')
const { dirname, resolve } = require('path')
const { NDKUser } = require('@nostr-dev-kit/ndk')
const team = require('../content/team.json')
const { nostr: einundzwanzigNpub } = require('../content/meta.json')

const einundzwanzigHex = new NDKUser({ npub: einundzwanzigNpub }).hexpubkey()
const names = {
  "_": einundzwanzigHex,
  "einundzwanzig": einundzwanzigHex
}
const relays = {
  [einundzwanzigHex]: [
    "wss://nostr.einundzwanzig.space"
  ]
}

Object.entries(team).forEach(([key, { nostr: npub }]) => {
  if (!npub) return
  const id = key.replace(/[\s]/g, '_')
  names[id] = new NDKUser({ npub }).hexpubkey()
})

const dst = resolve(__dirname, '..', 'dist', '.well-known', 'nostr.json')
const dir = dirname(dst)
const res = { names, relays }

mkdirSync(dir, { recursive: true })
writeFileSync(dst, JSON.stringify(res, null, 2))*/
