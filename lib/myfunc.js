/**
   * Create By Dika Ardnt.
   * Contact Me on wa.me/6288292024190
   * Follow https://github.com/DikaArdnt
*/

const { proto, delay, getContentType } = require('@adiwajshing/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const jimp = require('jimp')
const { defaultMaxListeners } = require('stream')


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " dias, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " segundos") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = function(seconds) {
    let h = isNaN(seconds) ? '--' : Math.floor(seconds % (3600 * 24) / 3600)
    let m = isNaN(seconds) ? '--' : Math.floor(seconds % 3600 / 60)
    let s = isNaN(seconds) ? '--' : Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('America/Sao_Paulo').locale('id').format(format)
	}
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
				myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.generateProfilePicture = async (buffer) => {
	const jimp = await jimp_1.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
	}
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error gatau apah')
        }
    })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (conn, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (mekkey) {
        mekid = mekkey.id
        mekisBaileys = mekid.startsWith('BAE5') && mekid.length === 16
        from = mekkey.remoteJid
        mekfromMe = mekkey.fromMe
        mekisGroup = fromekendsWith('@g.us')
        meksender = conn.decodeJid(mekfromMe && conn.user.id || mekparticipant || mekkey.participant || from || '')
        if (mekisGroup) mekparticipant = conn.decodeJid(mekkey.participant) || ''
    }
    if (mekmessage) {
        mekmtype = getContentType(mekmessage)
        mekmsg = (mekmtype == 'viewOnceMessage' ? mekmessage[mekmtype].message[getContentType(mekmessage[mekmtype].message)] : mekmessage[mekmtype])
        mekbody = mekmessage.conversation || mekmsg.caption || mekmsg.text || (mekmtype == 'listResponseMessage') && mekmsg.singleSelectReply.selectedRowId || (mekmtype == 'buttonsResponseMessage') && mekmsg.selectedButtonId || (mekmtype == 'viewOnceMessage') && mekmsg.caption || mektext
        let quoted = mekquoted = mekmsg.contextInfo ? mekmsg.contextInfo.quotedMessage : null
        mekmentionedJid = mekmsg.contextInfo ? mekmsg.contextInfo.mentionedJid : []
        if (mekquoted) {
            let type = getContentType(quoted)
			mekquoted = mekquoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(mekquoted)
				mekquoted = mekquoted[type]
			}
            if (typeof mekquoted === 'string') mekquoted = {
				text: mekquoted
			}
            mekquoted.mtype = type
            mekquoted.id = mekmsg.contextInfo.stanzaId
			mekquoted.chat = mekmsg.contextInfo.remoteJid || from
            mekquoted.isBaileys = mekquoted.id ? mekquoted.id.startsWith('BAE5') && mekquoted.id.length === 16 : false
			mekquoted.sender = conn.decodeJid(mekmsg.contextInfo.participant)
			mekquoted.fromMe = mekquoted.sender === (conn.user && conn.user.id)
            mekquoted.text = mekquoted.text || mekquoted.caption || mekquoted.conversation || mekquoted.contentText || mekquoted.selectedDisplayText || mekquoted.title || ''
			mekquoted.mentionedJid = mekmsg.contextInfo ? mekmsg.contextInfo.mentionedJid : []
            mekgetQuotedObj = mekgetQuotedMessage = async () => {
			if (!mekquoted.id) return false
			let q = await store.loadMessage(from, mekquoted.id, conn)
 			return exports.smsg(conn, q, store)
            }
            let vM = mekquoted.fakeObj = mekfromObject({
                key: {
                    remoteJid: mekquoted.chat,
                    fromMe: mekquoted.fromMe,
                    id: mekquoted.id
                },
                message: quoted,
                ...(mekisGroup ? { participant: mekquoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            mekquoted.delete = () => conn.sendMessage(mekquoted.chat, { delete: vmekkey })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            mekquoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
              *
              * @returns
            */
            mekquoted.download = () => conn.downloadMediaMessage(mekquoted)
        }
    }
    if (mekmsg.url) mekdownload = () => conn.downloadMediaMessage(mekmsg)
    mektext = mekmsg.text || mekmsg.caption || mekmessage.conversation || mekmsg.contentText || mekmsg.selectedDisplayText || mekmsg.title || ''
    /**
	* Reply to this message
	* @param {String|Object} text 
	* @param {String|false} chatId 
	* @param {Object} options 
	*/
    mekreply = (text, chatId = from, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
    /**
	* Copy this message
	*/
	mekcopy = () => exports.smsg(conn, mekfromObject(mektoObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	mekcopyNForward = (jid = from, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    return m
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
