//UNTUK PENGGUNA WHATSAPP BUSSINES
//GUNAKAN MENU KE 2 YAH
//CRETED BY HYZER OFFICIAL
//JANGAN HAPUS NAMA SAYA, LU CUMA MAKE
let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
wm = global.wm
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const defaultMenu = {
  before:`
  κͺΆπ£κ«βββγ *DASHBOARD* γβββκͺΆπ£κ«
  
ββββ γ TODAY γβββκͺΆπ£κ«
ββοΈ *Days:* %week %weton
ββοΈ *Date:* %date
ββοΈ *Islamic Date:* %dateIslamic
ββοΈ *Time:* %time
β°ββββββββββββκͺΆπ£κ«
ββββγ INFO USER γββκͺΆπ£κ«
ββοΈ Name: %name
ββοΈ Status: --
ββοΈ Limit: %limit
ββοΈ Money: %money
ββοΈ Exp: %totalexp
ββοΈ Level: %level
ββοΈ Role: %role
β°ββββββββββββκͺΆπ£κ«
ββ£ββγ *INFO CMD* γβββκͺΆπ£κ«
β *β* = Premium
β *β* = Limit
β£ββββββββββββκͺΆπ£κ«
%readmore`.trimStart(), 
 header: 'ββ£ββγ %category γβββκͺΆπ£κ«',
 body: 'ββ %cmd %isPremium %islimit',
 footer: 'β£βββββββββββκͺΆπ£κ«\n',
  after: ``,
}

let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': '*MENU UTAMA*',
  'advanced': '*ADVANCED*',
  'absen': '*MENU ABSEN*',
  'anime': '*MENU ANIME*',
  'sticker': '*MENU CONVERT*',
  'downloader': '*MENU DOWNLOADER*',
  'xp': '*MENU EXP*',
  'fun': '*MENU FUN*',
  'game': '*MENU GAME*',
  'github': '*MENU GITHUB*',
  'group': '*MENU GROUP*',
  'image': '*MENU IMAGE*',
  'info': '*MENU INFO*',
  'internet': '*INTERNET*',
  'islam' : '*MENU ISLAMI*',
  'kerang': '*MENU KERANG*',
  'maker': '*MENU MAKER*',
  'owner': '*MENU OWNER*',
  'Pengubah Suara': '*PENGUBAH SUARA*',
  'premium': '*PREMIUM MENU*',
  'quotes' : '*MENU QUOTES*',
  'rpg': '*MENU RPG*',
  'stalk': '*MENU STALK*',
  'shortlink': '*SHORT LINK',
  'tools': '*MENU TOOLS*',
  'vote': '*MENU VOTING*',
  }
  if (teks == 'absen') tags = {
    'absen': 'MENU ABSEN',
    'vote': '*MENU VOTING*',
  }
  if (teks == 'anime') tags = {
  'anime': '*MENU ANIME*',
  }
  if (teks == 'sticker') tags = {
  'sticker': '*MENU CONVERT*',
  }
  if (teks == 'downloader') tags = {
  'downloader': '*MENU DOWNLOADER*',
  }
  if (teks == 'xp') tags = {
  'xp': '*MENU EXP*',
  }
  if (teks == 'fun') tags = {
  'fun': '*MENU FUN*',
  }
  if (teks == 'game') tags = {
  'game': '*MENU GAME*',
  }
  if (teks == 'github') tags = {
  'github': '*MENU GITHUB*',
  }
  if (teks == 'group') tags = {
  'group': '*MENU GROUP*',
  }
  if (teks == 'image') tags = {
  'image': '*MENU IMAGE*',
  }
  if (teks == 'info') tags = {
  'info': '*MENU INFO*',
  }
  if (teks == 'internet') tags = {
  'internet': '*INTERNET*',
  }
  if (teks == 'islam') tags = {
  'islam' : '*MENU ISLAMI*',
  }
  if (teks == 'kerang') tags = {
  'kerang': '*MENU KERANG*',
  }
  if (teks == 'maker') tags = {
  'maker': '*MENU MAKER*',
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'suara') tags = {
  'Pengubah Suara': '*PENGUBAH SUARA*',
  }
  if (teks == 'premium') tags = {
  'premium': '*PREMIUM MENU*',
  }
  if (teks == 'quotes') tags = {
  'quotes' : '*MENU QUOTES*',
  }
  if (teks == 'rpg') tags = {
  'rpg': '*MENU RPG*',
  }
  if (teks == 'stalk') tags = {
  'stalk': '*MENU STALK*',
  }
  if (teks == 'shortlink') tags = {
  'shortlink': '*SHORT LINK',
  }
  if (teks == 'tools') tags = {
  'tools': '*MENU TOOLS*',
  }

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let tulisan = `
${ucapan()} ${name}. Have a great dayοΌ
Terimakasih Atas Kunjungan Anda`.trim()
let sangek = `Berikut adalah list Menu Bot. klik pada "Click Here!" untuk melihat list menu.`
let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
   fdoc2 = {
  key : {
  remoteJid: 'status@broadcast',
  participant : '0@s.whatsapp.net'
  },
  message: {
  documentMessage: {
  title: wm, 
                            }
                          }
                        }
                        
      const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `${ucapan()}, ${name}`,
            description: `βββββγ *${wm}* γβββκͺΆπ£κ«
βκͺΆπ£κ« ->  Aktif selama ${uptime}
βκͺΆπ£κ« ->  _*${Object.keys(global.db.data.users).length}*_ Pengguna
βκͺΆπ£κ« ->  Mode : *${global.opts['self'] ? 'Self' : 'publik'}*
βκͺΆπ£κ« ->  *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
βκͺΆπ£κ« ->  *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
βκͺΆπ£κ« ->  *α¬ββ΅β·βΆΝκͺΆπ₯κ«πΉΝκ°π΄πΌπαͺ΅πΰΎπΝα·γβα­πκͺΆ   ββ€κ«*
β°ββββββββββββββββκͺΆπ£κ«`,
            buttonText: 'KLIK TOD πΏ',
            listType: 1,
            footerText: "πΏπΈπ»πΈπ· πΌπ΄π½π π³πΈ π±π°ππ°π· π½πΆπ°π±",
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `OWNER BOT`,
                  "description": "Nomor Pemilik Bot Chat P/Meminta Save Tidak Akan Di Respon",
                  "rowId": `.owner`
                },{
                  "title": "INFO BOT",
                  "description": "Menampilkan Menu Info",
                  "rowId": `${_p}? info`
                }],
                "title": "INFORMASI BOT"
              }, {
                "rows": [{
                  "title": `κͺΆπ£κ« SEMUA PERINTAH κͺΆπ£κ«`,
                  "description": "Menampilkan Menu All",
                  "rowId": '.? all'
                  }, {
                  "title": "κͺΆπ£κ« ABSEN & VOTING κͺΆπ£κ«",
                  "description": "Menampilkan Menu Absen",
                  "rowId": `${_p}? absen`
                }, {
                  "title": "κͺΆπ£κ« ANIME MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Anime",
                  "rowId": `${_p}? anime`
                }, {
                  "title": "κͺΆπ£κ« STICKER & CONVERTER κͺΆπ£κ«",
                  "description": "Menampilkan Menu Sticker",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": "κͺΆπ£κ« DOWNLOADER MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Downloader",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "κͺΆπ£κ« EXP & LIMIT κͺΆπ£κ«",
                  "description": "Menampilkan Menu Exp",
                  "rowId": `${_p}? xp`
                }, {
                  "title": "κͺΆπ£κ« FUN MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Fun",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "κͺΆπ£κ« GAME MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Game",
                  "rowId": `${_p}? game`
                }, {
                  "title": "κͺΆπ£κ« GITHUB MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Github",
                  "rowId": `${_p}? github`
                }, {
                  "title": "κͺΆπ£κ« GROUP MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Group",
                  "rowId": `${_p}? group`
                }, {
                  "title": "κͺΆπ£κ« IMAGE MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Image",
                  "rowId": `${_p}? image`
                }, {
                  "title": "κͺΆπ£κ« INTERNET MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Internet",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "κͺΆπ£κ« ISLAM MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Islam",
                  "rowId": `${_p}? islam`
                }, {
                  "title": "κͺΆπ£κ« KERANG AJAIB κͺΆπ£κ«",
                  "description": "Menampilkan Menu Kerang",
                  "rowId": `${_p}? kerang`
                }, {
                  "title": "κͺΆπ£κ« MAKER MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Maker",
                  "rowId": `${_p}? maker`
                }, {
                  "title": "κͺΆπ£κ« OWNER MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Owner",
                  "rowId": `${_p}? owner`
                }, {
                  "title": "κͺΆπ£κ« PENGUBAH SUARA κͺΆπ£κ«",
                  "description": "Menampilkan Menu Voice Changer",
                  "rowId": `${_p}? suara`
                }, {
                  "title": "κͺΆπ£κ« PREMIUM MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Premium",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "κͺΆπ£κ« QUOTES MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Quotes",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "κͺΆπ£κ« RPG MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Rpg",
                  "rowId": `${_p}? rpg`
                }, {
                  "title": "κͺΆπ£κ« STALKER MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Stalker",
                  "rowId": `${_p}? stalk`
                }, {
                  "title": "κͺΆπ£κ« SHORT LINK κͺΆπ£κ«",
                  "description": "Menampilkan Menu Short Link",
                  "rowId": `${_p}? shortlink`
                }, {
                  "title": "κͺΆπ£κ« TOOLS MENU κͺΆπ£κ«",
                  "description": "Menampilkan Menu Tools",
                  "rowId": `${_p}? tools`
                }
                  ], {
                  "title": "πΏ CUMA PAJANGAN πΏ",
                  "description": "Banh Gw\n\n\n\n\n\n\n\n\nOrang GayπΏ",
                  "rowId": `${_p}? bacot`
                },
                "title": "LIST MENU"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: fdoc2 });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? 'β' : '')
                  .replace(/%isPremium/g, menu.premium ? 'β' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: text.trim(),
           locationMessage: { 
           jpegThumbnail: fs.readFileSync('./src/welcome.jpg') },
           hydratedFooterText: wm,
           hydratedButtons: [{
            urlButton: {
               displayText: 'Subscribe Banh',
               url: 'https://youtube.com/channel/UC0kxCB-Uci5et_Tz9PcrB6w'
             }

           },
             {
             urlButton: {
               displayText: 'Join Grup V',
               url: 'https://chat.whatsapp.com/BYiXOIiyx36GAPoUxAFclc'
             }

           },
             {
              quickReplyButton: {
               displayText: 'Owner',
               id: '.owner',
             }

           },
             {
              quickReplyButton: {
               displayText: 'Profile',
               id: '.profile',
             }

           },
           {
             quickReplyButton: {
               displayText: 'PapanπΏ',
               id: '.elaina',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}
