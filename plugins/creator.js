function handler(m) {
const q = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": ""
	},
	"message": {
		"contactMessage": {
			"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;ғᴀɪʀᴜᴢ㍐;;;FN:ғᴀɪʀᴜᴢ㍐\nORG:ғᴀɪʀᴜᴢ㍐;\nTEL;type=CELL;type=VOICE;waid=6285804325802:+62 858-0432-5802\nEND:VCARD"
		}
	},
	"participant": "0@s.whatsapp.net"
}

conn.sendContact(m.chat, '6285804325802', 'ғᴀɪʀᴜᴢ㍐', m)
m.reply(m.chat,'*Tuh Nomer Owner Gwehj*\n*Chat jika PENTING*', q)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
