const { Location, List, Buttons, LocalAuth, Client, ClientInfo, MessageMedia, ChatTypes } = require('whatsapp-web.js');
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('br')
const { color, createSerial, isUrl, msgFilter } = require('./tools')
const { register, util, limit } = require('./function')
const config = require('./config.json')
const fs = require('fs-extra')
const { Aki } = require('aki-api');
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const toMs = require('ms')
const listMessage = require('./message/listmessage')
const menus = require('./message/menus')
const google = require('google-it')
const { misc } = require('./lib')
const axios = require('axios')
const { adminsGroup, getRandom, logoBot } = require('./utilitarios.js');
const { msg } = require('./message');
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const ytmate = require('./lib/ytmate')
const yts = require('yt-search');
const limitCount = 10;
const premium = require('./lib/premium.js');
const ms = require('parse-ms');
let akinator = [{}]
const w5botapi = require('w5-textmaker');
const Downloader = require("nodejs-file-downloader"); 
const runtime = function (seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dia, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " horas, " : " Horas, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minutos, " : " Minutos, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " Segundos") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
uptime = process.uptime();
const temp = (`${runtime(process.uptime())}`)
/////*******DATABASES ***********////
const _registered = JSON.parse(fs.readFileSync('./database/user/registered.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))
const _trava = JSON.parse(fs.readFileSync('./database/bot/trava.json'))
const _bemvindo = JSON.parse(fs.readFileSync('./database/bot/bemvindo.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))

module.exports = msgHandler = async (toki = new Client(), message) => {
    try {

        const { from, type, selectedRowId, selectedButtonId, hasMedia, timestamp: t, mentionedIds: mentionedJidList, hasQuotedMsg } = message
        const quotedMsg = await message.getQuotedMessage();
        const chatInfo = await message.getChat();
        const { name: groupName, isGroup: isGroupMsg, id: id2, participants } = chatInfo
        const { _serialized: groupId } = id2
        const contact = await message.getContact()
        let { pushname, name, isBlocked, number: usuario, id } = contact
        const { _serialized: user } = id
        const formatNumber = await contact.getFormattedNumber()
        pushname = pushname || name || formatNumber
        let lista = undefined
        let { body } = message
        body = message._data.selectedId ? message._data.selectedId : selectedRowId ? selectedRowId : body
        let mediaData = undefined
        let allChats = undefined
        const encryptMedia = hasQuotedMsg ? quotedMsg : message
        const botNumber = config.NumBot
        const nomeBot = 'TokiBot'
        const nomeDono = config.nomeDono
        const ownerNumber = config.Numdono
        const keyale = config.keyale
        const lol = config.lol
        const processTime = (timestamp, now) => { return moment.duration(now - moment(timestamp * 1000)).asSeconds() }
        const datahoje = moment.tz('America/Sao_Paulo').format('DD/MM/YY')
        const horaagora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
        const cmd = body || ''
        const command = cmd.toLowerCase().split(' ')[0] || ''
        const prefix = /^[-°•π÷×¶∆£¢€¥®™✓√=><*,+_|~!#$%^&./\\©^]/.test(command) ? command.match(/^[-°•π÷×¶∆£¢€¥®™✓√=><*,+_|~!#$%^&./\\©^]/gi) : '/'  // Multi-Prefix by: VideFrelan
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const text1 = q && q.includes('|') ? q.substring(0, q.indexOf('|')) : false
        const text2 = q && q.includes('|') ? q.substring(q.lastIndexOf('|') + 1) : false
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''
        //**VALIDAÇÃO **//
        const isRegistered = register.checkRegisteredUser(user, _registered)
        const isAntiLink = isGroupMsg ? antilink.includes(groupId) : false
        const isLink = new RegExp(/(https:|http:|[.]com|www[.]|[.]br|[.]net|[.]gov|[.]xyz)/gi)
        const isOwner = user === "554497433716@c.us"
        const isRayssa = user === "554497239322@c.us"
        const isTrava = type === 'oversized' || body.length >= 50000
        const isPremium = premium.checkPremiumUser(user) 
        const isCmd = body.startsWith(prefix)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
        const isList_response = type === 'list_response'
        const isButtons_response = type === 'template_button_reply'
        const sender = isGroupMsg ? msg.participant : chatInfo
        const isGroupAdmin = isGroupMsg ? adminsGroup(user, participants) : false
        const isBotGroupAdmins = isGroupMsg ? adminsGroup(botNumber, participants) : false
        const comandos = isList_response ? selectedRowId.toLowerCase().split(' ')[0] || '' : command
        const destrava = `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🚮`
        limite = limit.getLimit(from, _limit, limitCount)
        const pack = `❧ Nᴏᴍᴇ ᴅᴏ Usᴜᴀ́ʀɪᴏ:\n❧ Usᴜᴀ́ʀɪᴏ(ᴀ):\n❧ Bᴏᴛ:\n❧ Dᴏɴᴏ Dᴏ Bᴏᴛ:\n❧ Rᴇᴅᴇs Sᴏᴄɪᴀɪs:` 
        const author = `👻 ${pushname}\n📞 ${formatNumber}\n🤖 ${nomeBot}\n👑 ${nomeDono}\n🔗Lɪɴᴋᴛʀ.ᴇᴇ/ᴛᴏᴋɪʙᴏᴛ` 
        //_Tipo de limite usuário
        if (isOwner) {
            var limite = 'dono n tem limite kk'
        } else if (isPremium) {
            var limite = 'Membro vip n tem limite🤩'
        } else if (isCmd) {
            limite = limit.getLimit(from, _limit, limitCount)
        }

        // Mensagens no PV
        if (!isCmd && !isGroupMsg) { console.log('> MENSAGEM NO', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${formatNumber}]"`)) }
        // Mensagem em Grupo
        if (!isCmd && isGroupMsg) { console.log('> MENSAGEM NO', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${formatNumber}]"`), 'EM', color(`"${groupName}"`)) }
        // Comandos no PV
        if (isCmd && !isGroupMsg) { console.log(color(`> COMANDO "[${command.toUpperCase()}]"`), 'NO', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${formatNumber}]"`)) }
        // Comandos em grupo
        if (isCmd && isGroupMsg) { console.log(color(`> COMANDO "[${command.toUpperCase()}]"`), 'NO', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${formatNumber}]"`), 'EM', color(`"${groupName}"`)) }

        //VERIFICAR PREMIUM AUTOMÁTICO automatico automate
         premium.expiredCheck() 
        
        /////////////////////////////////

        //VERIFICADOS//
        const verificadoStatusFoto = async () => { return { quotedParticipant: "0@c.us", quotedRemoteJid: "status@broadcast", quotedMsg: { type: "image", caption: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟", body: await logoBot() }, } }
        const travaNum = async () => { return { quotedParticipant: "0@c.us", quotedRemoteJid: "asckniw@78768ujhyuty", quotedMsg: { type: "image", caption: "BORA TRAVAA ENT", body: await logoBot() }, } }
        const env = async (text, options, error = 'ocorreu um erro..') => {
            try {
                if (text === undefined) return await message.reply(error)
                const allObjects = await Object.assign({ quotedMessageId: msg }, options);
                await toki.sendMessage(from, text, allObjects)
            } catch (err) {
                if (err.toString().match(/canReply/gi)) return console.log(color('[ERRO]', 'red'), color(`alguem apagou a mensagem!`, 'yellow'))
                console.log(err)
                await message.reply(error)
            }
        }
        //DEFINIÇÃO DO TEXAS //OBS N PODE DAR PRA NINGUEM 
        const sendFileFromUrl = async (url, options) => {
            try {

                const mediaObject = await MessageMedia.fromUrl(url, { unsafeMime: true })
                const buffer = Buffer.from(mediaObject.data, 'base64')
                const allObjects = await Object.assign({ quotedMessageId: message.id._serialized }, options);
                Buffer.byteLength(buffer) >= 5000 ? await toki.sendMessage(from, mediaObject, allObjects) : await message.reply("erro", from)
            } catch (err) {
                console.log(err)

                await message.reply('Erro ao baixar... :(')
            }
        }     
        const sendExternal = async (body, url, title, description, options, type) => {
            const allObjects = await Object.assign({
                extra: { //type 2 pra yt
                    ctwaContext: {
                        sourceUrl: url,
                        description: description,
                        title:title,
                        thumbnail: await logoBot(),
                        mediaType:
                        type,
                        mediaUrl: url
                    }

                }
            }, options);
            await toki.sendMessage(from,body,allObjects)
        }
    
        //messagereact reações respostaauto autoresposta
        if (body === 'Tio Tomioka' || body === 'silas' || body === 'Silas' || body === 'Silas Jr' || body === 'tomioka') {
        message.react('👑')
    } 
        if (body === 'bot lixo' || body === 'bot chato' || body === 'bot inutil' || body === 'bot feio') {
        message.react('😢')
        popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuanime/9.webp`)
        sendExternal(popopoc,'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0', 'Criador do bot','clique aq', { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}, 1 )
    }
        if (body === 'bot lindo' || body === 'bot totoso' || body === 'bot gato' || body === 'bot incrivel' || body === 'bot principe' || body === 'bot' || body === 'cade o bot' || body === 'cade bot') {
        message.react('😊')
       
    }
        if (isOwner && body === 'Sou dono?') {message.react('👍🏻')}
        if (body === 'batata' ) {message.react('🍟')}
        if (body === 'lacoste') {message.react('🐊')}  
        if (body === 'bom dia' || body === 'Bom dia' || body === 'BOM DIA' || body === 'Bom Dia') {
        popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/3.webp`)
        sendExternal(popopoc,'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0', 'Criador do bot','clique aq', { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}, 1 )
        }  
        if (body === 'pena de vc') {
            popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/31.webp`)
            sendExternal(popopoc,'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0', 'Criador do bot','clique aq', { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}, 1 )
            }  
            
        //AUTO FIG autofigu
        if (!isRayssa && hasMedia && isImage) {
            const msgMedia = await encryptMedia.downloadMedia()
       //toki.sendMessage(from, msgMedia, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}) 
       sendExternal(msgMedia, 'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0','Criador do bot','clique aq', { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}, 1) 
            console.log(color('[AUTO-FIG]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
        }
        else if (!isRayssa && hasMedia && isVideo) {
            const msgMedia = await encryptMedia.downloadMedia()
            sendExternal(msgMedia, 'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0','Criador do bot','clique aq', { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author}, 1) 
            console.log(color('[AUTO-FIG]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
        } else if (isRayssa && hasMedia && isImage) {
            const msgMedia = await encryptMedia.downloadMedia()
            var ray = `Rapkcz ray❤️`
       toki.sendMessage(from, msgMedia, { sendMediaAsSticker: true, stickerName: ray})  
            console.log(color('[AUTO-FIG]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
        }
        else if (isRayssa && hasMedia && isVideo) {
            var ray = `Rapkcz ray❤️`
            const msgMedia = await encryptMedia.downloadMedia()
            setTimeout(() => { toki.sendMessage(from, msgMedia, { sendMediaAsSticker: true, stickerName: ray}); }, 5000)
            console.log(color('[AUTO-FIG]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
        }
        //ANTI TRAVA PV
        if (isTrava && !isOwner && !isGroupMsg) {
            try {
                const numberContact = await toki.getContactById(user)
                await chatInfo.delete(true)
                await numberContact.block(true)
                await toki.sendMessage(ownerNumber, `Trava detectada de wa.me/${user.replace("@c.us", "")}`)
            } catch (err) {
                
            }
        }
        //DETECTAR TRAVA ZIP ZOP GRUPO
        if (isTrava && isGroupMsg && !isGroupAdmin && !isBotGroupAdmins && !isOwner) {
            await chatInfo.removeParticipants([user])
            await contact.block(true)
            toki.sendMessage(from, destrava)
            await toki.sendMessage(ownerNumber, `Um doente tentou travar um gp: wa.me/${user.replace("@c.us", "")}`)
        }
        if (body.match(isLink) && isAntiLink && !isBotGroupAdmins && isAntiLink && !isGroupAdmin) {
            await chatInfo.removeParticipants([user])
            await toki.sendMessage(user, `nesse grupo não é permitido mandar link no grupo.. por isso foi removido!`)
        }
       
        //=================================\\
    if (!isCmd && !isGroupMsg && !_bemvindo.includes(user)) {

        button = new Buttons(msg.BemVindo(pushname), [
            {
                id: `${prefix}menu`, body: 'MENU PRINCIPAL 📖'
            },
            {
                id: `${prefix}menufigu`, body: 'MENU FIGURINHA 🧩'
            },
            {
                id: `${prefix}termos`, body: 'TERMOS 📝'
            }
        ],
            null,
            `✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD`);
        toki.sendMessage(from, button); 
        _bemvindo.push(user)
        fs.writeFileSync('./database/bot/bemvindo.json', JSON.stringify(_bemvindo))
        
     toki.sendMessage(from, msg.VPN())
      }
     
      if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(`${command} [${args.length}]`), 'from', color(pushname))
      if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(`${command} [${args.length}]`), 'from', color(pushname), 'no', color(groupName))
                 
        // Anti spam
        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)

         //COMANDOS DO BOT A SEGUIR
        switch (comandos) {
            
/*
            case 'teste para pegar msg':
                _trava.push(quotedMsg.body)
                fs.writeFileSync('./database/bot/trava.json', JSON.stringify(_trava))
                message.react('🤖')
            break 
*/


case 'oi':
message.reply('oi')
break

            case prefix+'termos':
                tope = `*📝 TERMOS E POLÍTICAS DE PRIVACIDADE*

                1) - Aquele que vier a prejudicar nosso serviço, estará permanentemente BANIDO de usufruir-lo.
                
                2) - Após a confirmação do pagamento, não será possível solicitar reembolso.
                
                3) - O cliente não poderá transferir seu vip para terceiros.
                
                4) A Lei Geral de Proteção de Dados Pessoais (LGPD) tem como fundamentos:
                O principal objetivo da LGPD é dar às pessoas maior controle sobre suas próprias informações. A lei estabelece regras para empresas e organizações sobre coleta, uso, armazenamento e compartilhamento de dados pessoais, impondo multas e sanções no caso de descumprimento.
                
                I - o respeito à privacidade e a segurança;
                II- a inviolabilidade da intimidade, da honra e da imagem.
                III- não me responsabilizo por qualquer mìdia feita pelo bot/usuário. 
                
                5) Todos estão sujeito a banimento no bot (caso não siga as regras).
                
                6) Em caso de nossos bots ficar fora de serviço, os clientes terão direito de um aumento no seu prazo de vencimento do vip (relativo ao tempo em que ficou inativo).`
                button = new Buttons(tope, [
                    {
                        id: '/termoaceito', body: 'ACEITAR TERMO📝'
                    }
                ],
                    'aceite o termo de responsabilidade para usar o bot',
                    null);
                await toki.sendMessage(from, button);
                message.react('📝')
                break
case prefix+'termoaceito':
    message.reply(from, 'termos aceitos, agora vc pode usar o bot!')
    message.react('✅')
break
            case 'travar':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!q) return toki.sendMessage(from, 'falta o numero')
                     let telpr = args[0]+'@c.us'
                     const travar = toki.sendMessage(telpr,'oi',{extra: await travaNum()}) 
                     setTimeout(() => { travar }, 1000)   
                     message.react('☠️')        
            break 
            //********COMANDOS GRUPO*******//
            case prefix + 'antilink':
                if (!isGroupAdmin) return await toki.sendMessage(from,'vc n é adm!')
                if (!q.match(/on|off/gi)) return toki.sendMessage(from,`${prefix}antilink on | off`)
                if (q === 'on') {
                    antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
                    await toki.sendMessage(from, "ativado")
                    message.react('✅')
                } else if (q === 'off') {
                    antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
                    await toki.sendMessage(from, "desativado")
                    message.react('❌')
                }
                break

            //MARCAR TODAS AS PESSOAS DO GRUPO
            case prefix + 'marcar':
            case prefix + 'hidetag':
                if (!isGroupAdmin && !isOwner) return await toki.sendMessage(from,'tope')
                await toki.sendMessage(from, `-${q}`, { mentions: participants})
                message.react('⚠️')
                break
            //REDEFINIR LINK 
            case prefix + 'redefinir':
                if (!isGroupAdmin && !isOwner) return await toki.sendMessage(from,'tope')
                chatInfo.revokeInvite(true)
                message.react('⚠️')
                break
            //SAIR DO GP
            case prefix + 'sai':
                if (!isGroupAdmin && !isOwner) return await toki.sendMessage(from,'não esto em grupo')
                await message.react('😭')
                await message.reply('ta bom....')
                chatInfo.leave(true)
                break
            //REGISTRO DO USUÁRIO
            case prefix + 'rg': //comando feito pelo @silasvljunior
                if (isRegistered) return await toki.sendMessage(from,"vc ja foi registrado!")
                if (!q.includes('|')) return await toki.sendMessage(from,`formato incorreto!\n é assim!: ${command} nome|idade`)
                message.react('📒')
                team = body.slice(3)
                nomeUser = team.split("|")[0];
                idadeUser = team.split("|")[1];
                const idUser = createSerial(20)
                register.addRegisteredUser(user, nomeUser, idadeUser, temp, idUser, _registered)
                await toki.sendMessage(from, msg.registrar(nomeUser, idadeUser, temp, idUser))
                console.log(color('[REGISTRO]', 'blue'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Nome', color(nomeUser, 'cyan'), 'Idade:', color(idadeUser, 'cyan'), 'id:', color(idUser, 'cyan'))
                break
                case prefix + 'menufigu':
                    await toki.sendMessage(from, msg.FigMenu())
                break
                case prefix+'regras':
                toki.sendMessage(from, msg.regras())    
                break
            //MENU PRINCIPAL
            case prefix + 'menu': case prefix + 'comandos': case 'menu': case 'comandos':
                button = new Buttons(msg.menup(pushname), [
                    {
                        id: `${prefix}ping`, body: 'PING 🏓'
                    },
                    {
                        id: `${prefix}menu`, body: 'MENU PRINCIPAL 📖'
                    },
                    {
                        id: `${prefix}doar`, body: 'DOAR 💰'
                    }
                ],
                    null,
                    null);
                toki.sendMessage(from, button); //"isDynamicReplyButtonsMsg": true
                break
          
                /*
                case 'mediafire':
                if (args.length < 1) return reply('Digite o link do arquivo que deseja buscar no Mediafire')
                try {
                    anu = await fetchJson(`https://api.zeks.xyz/api/mediafire?apikey=${ZeksKey}&url=${args[0]}`, {
                        method: 'get'
                    })
                    buffer = await getBuffer(anu.download)
                    teks = `Nome do  arquivo: ${anu.name_file}
                    Tamanho do arquivo: ${anu.file_size}
                    Data do upload: ${anu.upload_date}
                    Tipo de arquivo: ${anu.file_type}
                    Link pra download: ${anu.download}
                    Descrição: ${anu.description}`
                    tiringa.sendMessage(from, teks, text, {
                        quoted: mek
                    })
                } catch (err) {
                    await toki.sendMessage(from,`Ocorreu um erro!`)
                }
                    break
*/
        case prefix+"gerarcpf":
      case prefix+"gcpf":
        if (!isPremium) return message.reply(msg.naoVip())
        cp1 = `${Math.floor(Math.random() * 300) + 600}`;
        cp2 = `${Math.floor(Math.random() * 300) + 600}`;
        cp3 = `${Math.floor(Math.random() * 300) + 600}`;
        cp4 = `${Math.floor(Math.random() * 30) + 60}`;
        cpff = `${cp1}.${cp2}.${cp3}-${cp4}`;
        message.reply(cpff);
        break;
        case prefix + 'play':
                if (!q) return await toki.sendMessage(from,`Digite o nome da musica\n\nExemplo /play Alone`)
                if (isUrl(url)) return await toki.sendMessage(from,'Comando para download usando url: /playurl')
                 message.react('⏱️')
                try {
                    const play1 = await yts(q)
                    lista = new List(msg.playLista(pushname, q), 'Escolher musica', [{ title: 'TOKI  🇧 🇴 🇹', rows: listMessage.play(play1) }]);
                    await toki.sendMessage(from, lista)
                    message.react('✅')
                } catch (err) {
                    message.react('❌')
                    toki.sendMessage(from,`Ocorreu um erro!`)
                    
                }
            break 
                //BUSCADOR DE MUSICA //AUDIO   
            case prefix + 'play2':
                if (!q) return await toki.sendMessage(from,`Digite o nome da musica\n\nExemplo /play hope`)
            misc.ytPlay(encodeURIComponent(q))
                .then(async ({ result }) => {
                    const newMedia = await MessageMedia.fromUrl(result.audio.link, {unsafeMime:true})
                    const thumb = await MessageMedia.fromUrl(result.info.thumbnail, {unsafeMime:true})
                    if (Number(result.audio.size.split(' MB')[0]) >= 41.0) return toki.sendMessage(from,`A musica encontrada possui mais que 40MB\nEscolha uma musica menor.`)
                    if (Number(result.audio.size.split(' GB')[0]) >= 0.1) return toki.sendMessage(from,`A musica encontrada possui mais que 40MB\nEscolha uma musica menor.`)
                    newMedia.filename = "@silasvljunior.mp3"
                    let button = new Buttons(thumb, [{ url: `${result.audio.link}`, body: 'link' }], null, `➸Titulo: ${result.info.title}\n➸ *canal*: ${result.info.uploader}\n➸ *Tamanho*: ${result.audio.size}\n➸ *duração*: ${result.info.duration}\n➸ *views*: ${result.info.view}\n➸ *likes*: ${result.info.like}\n\n ❗se a midia não for enviada entre nesse link que ele baixará automáticamente`);
                    message.react('✅')
                    await toki.sendMessage(from, button)
                    await toki.sendMessage(from, newMedia, {sendMediaAsDocument:true})
                    console.log(color('[MUSICA]', 'cyan'), color(`Musica ${result.info.title} enviada para`, 'yellow'), color(`${pushname}`, 'magenta'))
               
    
                })
                .catch(async (err) => {
                    console.error(err)
                })
                break
            case prefix + 'playurl':
                if (!q) return await reply(`Digite o link da musica\n\nExemplo: /playurl link`)
                message.react('⏱️')
                try {
                    misc.ytPlayLink(encodeURIComponent(q))
                    .then(async ({ result }) => {
                        const newMedia = await MessageMedia.fromUrl(result.link.link, {unsafeMime:true})
                        const thumb = await MessageMedia.fromUrl(result.thumbnail, {unsafeMime:true})
                        if (Number(result.link.size.split(' MB')[0]) >= 41.0) return toki.sendMessage(from,`A musica encontrada possui mais que 40MB\nEscolha uma musica menor.`)
                        if (Number(result.link.size.split(' GB')[0]) >= 0.1) return toki.sendMessage(from,`A musica encontrada possui mais que 40MB\nEscolha uma musica menor.`)
                        newMedia.filename = "@silasvljunior.mp3"
                        let button = new Buttons(thumb, [{ url: `${result.link.link}`, body: 'link' }], null, `➸Titulo: ${result.title}\n➸ *canal*: ${result.uploader}\n➸ *Tamanho*: ${result.link.size}\n➸ *duração*: ${result.duration}\n➸ *views*: ${result.view}\n➸ *likes*: ${result.like}\n\n ❗se a midia não for enviada entre nesse link que ele baixará automáticamente`);
                        message.react('✅')
                        await toki.sendMessage(from, button)
                        await toki.sendMessage(from, newMedia, {sendMediaAsDocument:true})
                    })
                    .catch(async (err) => {
                        console.error(err)
                    })
                } catch (err) {
                    
                    try {
                        const Play = await ytmate.y2mateA(isList_response ? selectedRowId.slice(10) : q)
                        const newMedia = await MessageMedia.fromUrl(Play[0].thumb)
                        if (Number(Play[0].size.split('MB')[0]) >= 61.0) return toki.sendMessage(from,`A musica encontrada possui mais que 60MB\nEscolha uma musica menor.`)
                        if (Number(Play[0].size.split('GB')[0]) >= 0.1) return toki.sendMessage(from,`A musica encontrada possui mais que 60MB\nEscolha uma musica menor.`) 
                        let button = new Buttons(newMedia, [{ url: `${Play[0].link}`, body: 'link' }], null, `➸Titulo: ${Play[0].judul}\n➸ *tipo*: ${Play[0].tipe}\n➸ *Tamanho*: ${Play[0].size}\n➸ *qualidade*: ${Play[0].quality}\n\n ❗se a midia não for enviada entre nesse link que ele baixará automáticamente`);
                        message.react('✅')
                        await toki.sendMessage(from, button)
                        await sendFileFromUrl(Play[0].link)
                        console.log(color('[MUSICA]', 'cyan'), color(`Musica ${Play[0].judul} enviada para`, 'yellow'), color(`${pushname}`, 'magenta'))
                    } catch (err) {
                        await toki.sendMessage(from,`n deu nenhum`)
                        message.react('❌')
                    }
                    }
                 
                break
            case prefix + 'playurlv':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!q) return await reply(`Digite o link da musica\n\nExemplo: /playurl link`)
                message.react('⏱️')
                try {
                    const Play = await ytmate.y2mateV(isList_response ? selectedRowId.slice(11) : q)
                    const newMedia = await MessageMedia.fromUrl(Play[0].thumb)
                    if (Number(Play[0].size.split('MB')[0]) >= 61.0) return toki.sendMessage(from,`A musica encontrada possui mais que 60MB\nEscolha uma musica menor.`)
                    if (Number(Play[0].size.split('GB')[0]) >= 0.1) return toki.sendMessage(from,`A musica encontrada possui mais que 60MB\nEscolha uma musica menor.`)
                    let button = new Buttons(newMedia, [{ url: `${Play[0].link}`, body: 'link' }], null, `➸Titulo: ${Play[0].judul}\n➸ *tipo*: ${Play[0].tipe}\n➸ *Tamanho*: ${Play[0].size}\n➸ *qualidade*: ${Play[0].quality}\n\n ❗se a midia não for enviada entre nesse link que ele baixará automáticamente`);
                    await toki.sendMessage(from, button)
                    await sendFileFromUrl(Play[0].link)
                    message.react('✅')
                    console.log(color('[MUSICA]', 'cyan'), color(`Musica`, 'yellow', `${Play[0].judul} enviada para`, 'blue'), color(`${pushname}`, 'magenta'))
                } catch (err) {
                    console.log(err)
                    message.react('⏱️')
                    await toki.sendMessage(from,`tentando outro server..`)
                    try {
                        await sendFileFromUrl(`http://aleatoryapi.herokuapp.com/api/download/?url=${encodeURIComponent(q)}&apikey=${keyale}`)
                    } catch (err) {
                        message.react('❌')
                    await toki.sendMessage(from,`n deu tbm`)
                    }
                }
                break
            case prefix + 'playv':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!q) return await toki.sendMessage(from,`Digite o nome do video\n\nExemplo /play Alone`)
                if (isUrl(url)) return await toki.sendMessage(from,'Comando para download usando url (video): /playurlv')
                message.react('⏱️')
                try {
                    const play1 = await yts(q)
                    message.react('✅')
                    lista = new List(msg.playLista(pushname, q), 'Escolher musica', [{ title: 'TOKI  🇧 🇴 🇹', rows: listMessage.play(play1, "/playurlv") }]);
                    await toki.sendMessage(from, lista)

                } catch (err) {
                    console.log(err)
                    message.react('❌')
                    await toki.sendMessage(from,`Ocorreu um erro!`)
                }
                break
                case prefix + 'tk': case prefix + 'tiktok': //comando feito pelo @silasvljunior
                if (!q) return await toki.sendMessage(from, `mande o link na frente do comando\n\nExemplo /tk link`)
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                try {
                    misc.tikTok(encodeURIComponent(q))
                    .then(async ({ result }) => {
                        const newMedia = await MessageMedia.fromUrl(result.link, {unsafeMime:true})
                        newMedia.filename = "@silasvljunior.mp4"
                        message.react('✅')
                        await toki.sendMessage(from, newMedia)
                    })
                    .catch(async (err) => {
                        env('erro')
                    })
                } catch (err) {
                    env('erro')
                }
                 
                break
              break
              case prefix + 'tomp3':
                if (hasMedia && isVideo || isQuotedVideo) {
                    message.react('⏱️')
                    try {
                        console.log(color('[tomp3]', 'green'), 'fazendo download do audio..')
                        mediaData = await encryptMedia.downloadMedia()
                        if (mediaData === 'Media não encontrada, envie a mesma novamente!') return await toki.sendMessage(from,'Media não encontrada, envie a mesma novamente!')
                        const buffer = Buffer.from(mediaData.data, 'base64')
                        const temp = './temp'
                        const name = new Date().getTime()
                        const fileInputPath = path.join(temp, 'video', `${name}.mp4`)
                        const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                        fs.writeFile(fileInputPath, buffer, (err) => {
                            if (err) return console.log(err)
                            ffmpeg(fileInputPath)
                                .format('mp3')
                                // .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                // .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    //console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    message.react('✅')
                                    await toki.sendMessage(from,MessageMedia.fromFilePath(fileOutputPath))
                                        // console.log(color('[WAPI]', 'green'), 'Sucesso enviado mp3!')

                                        (() => {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    } catch (err) {
                        message.react('❌')
                        await toki.sendMessage(from,ind.error())
                    }
                } else {
                    await toki.sendMessage(from,`Marque o video ou coloque o comando na legenda`)
                }
                break
            //FAZER FIGURINHAS
            case prefix + 'toimg': case prefix + 'f':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                message.react('⏱️')
                try {
                    if (isQuotedSticker) {
                        const msgMedia = await quotedMsg.downloadMedia()
                        
                        await toki.sendMessage(from,msgMedia, from, { media: true, caption: msg.mandarCap() })
                        message.react('✅')
                    }
                    else if (hasMedia && isImage || isQuotedImage) {
                        const msgMedia = await encryptMedia.downloadMedia()
                        await toki.sendMessage(from, msgMedia, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author });
                        console.log(color('[FIGURINHA]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
                        message.react('✅')
                    }
                    else if (hasMedia && isVideo || isQuotedVideo) {
                        const msgMedia = await encryptMedia.downloadMedia()
                        await toki.sendMessage(from, msgMedia, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author });
                        console.log(color('[FIGURINHA]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
                        message.react('✅')
                    }
                    else {
                        await toki.sendMessage(from,msg.tutoFig(), from)  //erro se a pessoa comentar qualquer coisa
                        message.react('⁉️') 
                    }
                }
                catch {
                    await toki.sendMessage(from,msg.erroFig(), from) //erro ao fazer fig 
                    message.react('❌')
                }
                break
            //FAZ FIG QUADRADA
            case prefix + 's2': case prefix + 'f2': case prefix + 'figu2': case prefix + 'fig2':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                message.react('⏱️')
                try {

                    if (hasMedia && isImage || isQuotedImage) {
                        try {
                            mediaData = await encryptMedia.downloadMedia()
                            const sticker = await util.formatToWebpSticker(mediaData, {}, true);
                            const stickerMedia = new MessageMedia(sticker.mimetype, sticker.data, sticker.filename);
                            await toki.sendMessage(from, stickerMedia, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author });
                            message.react('✅')
                            console.log(color('[FIGURINHA]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
                        } catch (err) {
                            console.log(err)
                            await toki.sendMessage(from,'Media não encontrada, envie a mesma novamente!')
                            message.react('❌')
                        }

                    } else if (hasMedia && isVideo || isQuotedVideo) {
                        try {
                            mediaData = await encryptMedia.downloadMedia()
                            const sticker = await util.formatToWebpSticker(mediaData, {}, true); //, fps = "30"
                            const stickerMedia = new MessageMedia(sticker.mimetype, sticker.data, sticker.filename);
                            await toki.sendMessage(from, stickerMedia, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author });
                            message.react('✅')
                            console.log(color('[FIGURINHA]', 'cyan'), color(`figurinha feita em ${processTime(t, moment())} segundos!`, 'magenta'))
                        } catch (err) {
                            console.log(err)
                            await toki.sendMessage(from,'Ocorreu um erro, envie novamente o comando na legenda diminuindo a duração do vídeo/gif!!!')
                            message.react('❌')
                        }
                    }
                    else {
                        await toki.sendMessage(from,msg.tutoFig() + "2")
                        message.react('⁉️')
                    }
                } catch (err) {
                    console.log(err)
                    await message.reply('Media não encontrada, envie a mesma novamente!')
                    message.react('❌')
                }
                break
            case prefix + 'semoji':
                if (!q) return toki.sendMessage(from,'Qual emoji?')
                let texto = q
                lista = new List('Escolha um tema de figurinha.', 'abrir menu', [{ title: " Escolha o tema da sua Figurinha ", rows: listMessage.emojii(texto, prefix) }]);
                message.react('😎')
                await toki.sendMessage(from, lista)
                break
            case prefix + 'emooji':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                if (!q) return toki.sendMessage(from,`Exemplo: ${prefixobot}emoji ☹️/whatsapp`)
                emot = q.split('/')[0]
                jemot = q.split('/')[1]
                if (jemot == 'apple') {
                    idemot = 0
                }
                else if (jemot == 'google') {
                    idemot = 1
                }
                else if (jemot == 'samsung') {
                    idemot = 2
                }
                else if (jemot == 'microsoft') {
                    idemot = 3
                }
                else if (jemot == 'whatsapp') {
                    idemot = 4
                }
                else if (jemot == 'twitter') {
                    idemot = 5
                }
                else if (jemot == 'facebook') {
                    idemot = 6
                }
                else if (jemot == 'skype') {
                    idemot = 7
                }
                else if (jemot == 'joypixels') {
                    idemot = 8
                }
                else if (jemot == 'openmoji') {
                    idemot = 9
                }
                else if (jemot == 'notoemoji') {
                    idemot = 10
                }
                else if (jemot == 'Emojipedia') {
                    idemot = 11
                }
                else if (jemot == 'lg') {
                    idemot = 12
                }
                else {
                    //return toki.sendMessage(from,`....`)
                }
                await toki.sendMessage(from,'espere...')
                message.react('⏱️')
                if (idemot == undefined) return
                emoji.get(emot)
                    .then(emoji => {
                        sendFileFromUrl(emoji.images[idemot].url, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                    })
                    message.react('✅')
                break
            //FAZ FIG PISCANTE
            case prefix + 'attp':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                if (!q) return await toki.sendMessage(from,`Exemplo: /attp toki bot`)
                message.react('⏱️')
                try {
                    await axios.get(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`, { responseType: 'arraybuffer' }).then(async (response) => {
                        const attp = Buffer.from(response.data, 'binary').toString('base64')
                        await toki.sendMessage(from, new MessageMedia('image/webp', attp), { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                        message.react('✅')
                    })
                } catch (err) {
                    await toki.sendMessage(from,`ocorreu um erro tente novamente em outra hora`)
                    message.react('❌')
                }
                break
                case prefix + 'ttp':
                    if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                    limit.addLimit(from, _limit, isPremium, isOwner)
                if (!q) return await toki.sendMessage(from,`Exemplo: /ttp toki bot`)
                message.react('⏱️')
                try {
                    const a = new Date().getTime()
                    const downloader = new Downloader({
                        url: `https://aleatoryapi.herokuapp.com/api/ttp?texto=${encodeURIComponent(q)}&apikey=${keyale}`, //If the file name already exists, a new file with the name 200MB1.zip is created.
                        directory: "./temp", //This folder will be created, if it doesn't exist.
                        fileName: a + ".jpg" //The file name.
                    });
                    try {
                        await downloader.download();
                        toki.sendMessage(from, MessageMedia.fromFilePath(`./temp/${a}.jpg`), {sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author} )
                        message.react('✅')
                        fs.unlink(`./temp/${a}.jpg`, () => { })
                    }
                    catch (error) {
                        message.reply(from, "Download falhou..")
                        message.react('❌')
                    }
                } catch (err) {
                    message.react('❌')
                    message.reply('ocorreu um erro no servidor..')
                }
                break
            case prefix + 'misturar':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                if(!q.includes("+")) return toki.sendMessage(from, `trem ta faltando esse (+), vou te dar um exemplo..\nExemplo: ${command} 😒+😁`)
                txt = q.replace(" +", "+").replace("+ ", "+").replace(" + ", "+")
                let [emj1, emj2] = txt.split("+")
                message.react('⏱️')
                try {
                    const a = new Date().getTime()
                    const downloader = new Downloader({
                        url: `https://aleatoryapi.herokuapp.com/api/emojimix?emoj=${encodeURI(emj1)}&emoj2=${encodeURI(emj2)}&apikey=${keyale}`, //If the file name already exists, a new file with the name 200MB1.zip is created.
                        directory: "./temp", //This folder will be created, if it doesn't exist.
                        fileName: a + ".jpg" //The file name.
                    });
                    try {
                        await downloader.download();
                        await toki.sendMessage(from, MessageMedia.fromFilePath(`./temp/${a}.jpg`), {sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author} )
                        message.react('✅')
                        fs.unlink(`./temp/${a}.jpg`, () => { })
                    }  
                    catch (error) {
                        toki.sendMessage(from, "esse não tem desculpe..");
                        message.react('❌')
                        fs.unlink(`./temp/${a}.jpg`, () => { })
                    }
                } catch (err) {
                    message.react('❌')
                } 
                break
            //MANDAR PING DO BOT
            case prefix + 'ping': //comando feito pelo @silasvljunior
            if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                message.react('🤖')
                toki.sendMessage(from, `Pong!\nSpeed: ${processTime(t, moment())} secs\nTempo ativo ${runtime(process.uptime())}`)
                break
            //PESQUISAR NO GOOGLE
            case prefix + 'google':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                message.react('⏱️')
                if (!q) return await toki.sendMessage(from,'Escreva algo para mim pesquisar.')
                await google({ 'query': q }).then(async (results) => {
                    let vars = `🔎 「 ${q} 」 🔎\n`
                    for (let i = 0; i < results.length; i++) { vars += `\n═════════════\n→ ${results[i].title}\n\n→ ${results[i].snippet}\n\n→ ${results[i].link}` }
                    await toki.sendMessage(from, vars)
                    message.react('✅')
                }).catch(async () => { 
                    await toki.sendMessage(from,`Erro ao pesquisar no google,tente novamente mais tarde!`) 
                    message.react('❌')
            })
                break
                 //EFEITOS DE IMAGEM
            case prefix + 'invertido':
                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/invert?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'pincel': case prefix + 'lapis':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/pencil?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'wasted':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/wasted?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'puto':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/triggered?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'puto2':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/creator1/trigger?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'peixe':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/fisheye?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'mask':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/skullmask?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'deep':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/deepfry?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'flip':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/flip?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'gray':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/grayscale?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'round':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/editor/roundimage?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'affect':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/creator1/affect?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            case prefix + 'saturacao':

                if (!hasMedia && !isImage && !isQuotedImage) return await toki.sendMessage(from,msg.marcarFt())
                mediaData = await encryptMedia.downloadMedia()
                linkImg = await uploadImages(mediaData)
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/filter/lofi?apikey=${lol}&img=${linkImg}`, { caption: msg.mandarCap() })
                break
            //****************COMANDOS PREMIUM****************//
            case prefix + 'patrick': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/patrick?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'dado': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/dadu?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'among': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/amongus?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'gura': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/gawrgura?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'doge': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/anjing?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'fofo': //comando feito pelo @silasvljunior

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/sticker/bucinstick?apikey=${lol}`, { sendMediaAsSticker: true, stickerName: packWm, stickerAuthor: authorWm })
                break
            case prefix + 'neko': //comando feito pelo @silasvljunior
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/random/neko?apikey=${lol}`, { caption: msg.mandarCap() })
                break
            case prefix + 'neko18': //comando feito pelo @silasvljunior
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())

                await toki.sendMessage(from,msg.espere())
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/random/nsfw/neko?apikey=${lol}`, { caption: msg.mandarCap() })
                break
               
                case prefix + 'loli18': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/random/loli?apikey=${lol}`, { caption: msg.mandarCap() })
                break
                case prefix + 'loli': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                await sendFileFromUrl(`https://aleatoryapi.herokuapp.com/loli`, { caption: msg.mandarCap() })
                break
                case prefix + 'shota': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                await sendFileFromUrl(`https://aleatoryapi.herokuapp.com/shota`, { caption: msg.mandarCap() })
                break
            case prefix + 'waifu': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/random/waifu?apikey=${lol}`, { caption: msg.mandarCap() })
                break
            case prefix + 'trap': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/random/nsfw/trap?apikey=${lol}`, { caption: msg.mandarCap() })
                break
                case prefix + 'metadinha': //comando feito pelo @silasvljunior
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                await toki.sendMessage(from,'se n mandar em 1 min mande novamente!')
                misc.casal()
                    .then(async ({ result }) => {
                        const Feminina = await MessageMedia.fromUrl(result.female)
                        const Masculino = await MessageMedia.fromUrl(result.male)
                        await toki.sendMessage(from, Feminina, { quotedMessageId: message.id._serialized, caption: `Feminina` })
                        await toki.sendMessage(from, Masculino, { quotedMessageId: message.id._serialized, caption: `Masculino` })
                    })
                    .catch(async (err) => {
                        console.error(err)
                    })
                break
                //PINTEREST
            case prefix + 'pin': //comando feito pelo @silasvljunior

            if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
            if (!q) return await toki.sendMessage(from,`Digite o nome do video para baixar\n\nExemplo: /youtube Gatos fofos`)
            misc.pinBusc(encodeURIComponent(q))
                .then(async ({ result }) => {
                    await sendFileFromUrl(result, { caption: `Pinterest: ${q}` }, true)
                    console.log(color('[PINTEREST]', 'cyan'), color(`pin: ${q} enviado para`, 'yellow'), color(`${pushname}`, 'magenta'))
                })
                .catch(async (err) => {
                    console.error(err)
                    await toki.sendMessage(from,"erro..")
                })
            break
            //LOGOS QUE UTILIZAM DOIS TEXTOS //FEITOS PELO @silasvljunior
            case prefix + 'pornhub':

                if (!q) return await toki.sendMessage(from,`Exemplo: /pornhub toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(8)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'text2':

                if (!q) return await toki.sendMessage(from,`Exemplo: /text2 toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(6)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/glitch?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'avenger':

                if (!q) return await toki.sendMessage(from,`Exemplo: /avenger toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(8)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/avenger?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'space':

                if (!q) return await toki.sendMessage(from,`Exemplo: /space toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(6)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/space?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'ninja':

                if (!q) return await toki.sendMessage(from,`Exemplo: /ninja toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(6)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/ninjalogo?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'marvel':

                if (!q) return await toki.sendMessage(from,`Exemplo: /marvel toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(7)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/marvelstudio?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'lion':

                if (!q) return await toki.sendMessage(from,`Exemplo: /lion toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(5)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lol}&text1=${teks1}&text2=Hum`, { caption: msg.mandarCap() })
                break
            case prefix + 'lobo':

                if (!q) return await toki.sendMessage(from,`Exemplo: /lobo toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(5)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/wolflogo?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'steel':

                if (!q) return await toki.sendMessage(from,`Exemplo: /steel toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(6)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/steel3d?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'wall':

                if (!q) return await toki.sendMessage(from,`Exemplo: /wall toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(5)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/wallgravity?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            case prefix + 'cool':

                if (!q) return await toki.sendMessage(from,`Exemplo: /cool toki Bot`)
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                team = body.slice(5)
                teks1 = team.split("|")[0];
                teks2 = team.split("|")[1];
                await sendFileFromUrl(`https://api.lolhuman.xyz/api/textprome2/coolgravity?apikey=${lol}&text1=${teks1}&text2=${teks2}`, { caption: msg.mandarCap() })
                break
            //****************COMANDOS DONO****************//
            //LIMPA TODOS OS CHATS
            case prefix + 'limpar':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                allChats = await toki.getChats();
                if (!isOwner) return await toki.sendMessage(from,msg.soDono())
                for (let i = 0; i < allChats.length; i++) {
                    if (allChats[i].isGroup) { await allChats[i].clearMessages() }
                    else { await allChats[i].delete() }
                }
                await toki.sendMessage(ownerNumber, msg.prontDono())
                message.react('👑')
                break
            //alugar bot pagar
            case 'premium': case prefix+'alugar': case 'premiumbot': case prefix+'premiumbot':
                toki.sendMessage(from, msg.alugar());
                break
                case prefix+'dono': case 'dono do bot': case 'dono':
                    message.react('👑')
                sendExternal('esse é o contato do meu criador!', 'https://api.whatsapp.com/send/?phone=554497433716&text&type=phone_number&app_absent=0','Criador do bot','clique aq', 1) 
                break 
            //ADD E REMOVER PREMIUM DO USUÁRIO COM TEMPO AGR KK
            case prefix + 'premium':
                  if (!isOwner) return toki.sendMessage(from,'recurso so pro dono');
                if (ar[0] === 'add') {
                    if (mentionedJidList.length === 1) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await toki.sendMessage(from, 'Apenas meu Owner pode usar esse comando')
                            premium.addPremiumUser(prem, args[2])
                            toki.sendMessage(from, `*── 「 PREMIUM 」 ──*\n\n➸ *ID*: ${prem}\n➸ *Expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`)
                            toki.sendMessage(prem, `── 「 PREMIUM 」 ──\n\nVocê agora é um membro vip❤️\n\n➸ *seu vip expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)*`)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2])
                        toki.sendMessage(from, `*── 「 PREMIUM 」 ──*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`)
                        toki.sendMessage(args[1] + '@s.whatsapp.net', `── 「 PREMIUM 」 ──\n\nVocê agora é um membro vip❤️\n\n➸ *seu vip expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`);
                    }
                } else if (ar[0] === 'del') {
                    if (!premium.checkPremiumUser(args[1] + '@c.us')) return await toki.sendMessage(from, `O usuário ${args[1]} não é um membro vip!`)
                   var position = _premium.indexOf(from)
                   _premium.splice(position, 1)
                   fs.writeFileSync(`./database/user/premium.json`, JSON.stringify(_premium))
                }
                else {
                    toki.sendMessage(from, `${prefix + command} add ou ${prefix + command} del`)
                }
                break
                case prefix+'premiumlist': case prefix+'listpremium':
                        
                        if (!isOwner) return await toki.sendMessage(from, msg.soDono())
                        let listPremi = '*── 「 PREMIUM USERS 」 ──*\n\n'
                        const deret = premium.getAllPremiumUser(_premium)
                        const arrayPremi = []
                        for (let i = 0; i < deret.length; i++) {
                            const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                            arrayPremi.push(await toki.getContacts(premium.getAllPremiumUser(_premium)[i]))
                            listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Expira em*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                        }
                        await toki.sendMessage(from, listPremi)
                    break
            //PACKS DE FIGURINHASS
            case prefix + 'packsfigu': case prefix + 'packfigu': case prefix + 'figupack': case prefix + 'figupacks':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                lista = new List('Escolha um tema de figurinha.', 'abrir menu', [{ title: " PACK DE FIGURINHAS ", rows: listMessage.packfig }]);
                await toki.sendMessage(from, lista)
                break
            case prefix + 'figumeme': case 'figmeme':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const memez = `${Math.floor(Math.random() * 129)}`
                const memeu = `${Math.floor(Math.random() * 129)}`
                const memep = `${Math.floor(Math.random() * 129)}`
                const memei = `${Math.floor(Math.random() * 129)}`
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figumemes/${memez}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figumemes/${memeu}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figumemes/${memep}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figumemes/${memei}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                button = new Buttons('Deseja mais figurinhas de meme?', [{ id: `${prefix}figumeme`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            case prefix + 'figudesenho':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const desenhoa = `${Math.floor(Math.random() * 101)}`
                const desenhoe = `${Math.floor(Math.random() * 101)}`
                const desenhoi = `${Math.floor(Math.random() * 101)}`
                const desenhoo = `${Math.floor(Math.random() * 101)}`

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoa}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoe}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoi}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoo}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                button = new Buttons('Deseja mais figurinhas de desenho?', [{ id: `${prefix}figudesenho`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            case prefix + 'figuanime':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const annime = `${Math.floor(Math.random() * 76)}`
                const annnime = `${Math.floor(Math.random() * 76)}`
                const annnnime = `${Math.floor(Math.random() * 76)}`
                const nnnannime = `${Math.floor(Math.random() * 76)}`
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuanime/${annime}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuanime/${annnime}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuanime/${annnnime}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuanime/${nnnannime}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                button = new Buttons('Deseja mais figurinhas de anime?', [{ id: `${prefix}figuanime`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            case prefix + 'figuraiva':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const raivaa = `${Math.floor(Math.random() * 28)}`
                const raivae = `${Math.floor(Math.random() * 28)}`
                const raivai = `${Math.floor(Math.random() * 28)}`
                const raivao = `${Math.floor(Math.random() * 28)}`

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuraiva/${raivaa}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuraiva/${raivae}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuraiva/${raivai}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuraiva/${raivao}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                button = new Buttons('Deseja mais figurinhas de raiva?', [{ id: `${prefix}figuraiva`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            case prefix + 'figuroblox':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const robloxa = `${Math.floor(Math.random() * 20)}`
                const robloxe = `${Math.floor(Math.random() * 20)}`
                const robloxi = `${Math.floor(Math.random() * 20)}`
                const robloxo = `${Math.floor(Math.random() * 20)}`

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuroblox/${robloxa}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuroblox/${robloxe}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuroblox/${robloxi}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figuroblox/${robloxo}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })

                button = new Buttons('Deseja mais figurinhas de roblox?', [{ id: `${prefix}figuroblox`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            case prefix + 'figubb':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)
                const bba = `${Math.floor(Math.random() * 20)}`
                const bbe = `${Math.floor(Math.random() * 20)}`
                const bbi = `${Math.floor(Math.random() * 20)}`
                const bbo = `${Math.floor(Math.random() * 20)}`
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/${bba}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/${bbe}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/${bbi}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                popopoc = MessageMedia.fromFilePath(`./complement/sticker/packsfigu/figubb/${bbo}.webp`)
                await toki.sendMessage(from, popopoc, { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                button = new Buttons('Deseja mais figurinhas de bebê?', [{ id: `${prefix}figubb`, body: 'MAIS FIGURINHA' }], null, 'Selecione abaixo.');
                setTimeout(() => { toki.sendMessage(from, button) }, 2090)
                break
            //ENCURTAR LINK 
            case prefix + 'encurtar':
                if (limit.isLimit(from, _limit, limitCount, isPremium, isOwner)) return await toki.sendMessage(from, msg.Limit())
                limit.addLimit(from, _limit, isPremium, isOwner)

                if (!isUrl(url)) return await toki.sendMessage(from,msg.erroFormato())
                const urlShort = await misc.encurtar(url)
                await toki.sendMessage(from,msg.espere())
                await toki.sendMessage(from,urlShort)
                break
            //PUXAR INFO DO DDD
            case prefix + 'ddd':

               if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                if (!q) return toki.sendMessage(from,'digite o ddd que deseja buscar')
                misc.dddBuscar(encodeURIComponent(q))
                    .then(async ({ state, cities }) => {
                        ccg =
                            ` INFORMAÇÕES DO DDD
                 ‣ Estado: ${state}
                 ‣ Cidades: ${cities}
                           \nfeito pelo @silasvljunior`
                        toki.sendMessage(from,ccg)
                    })

                    .catch(async (err) => {
                        console.error(err)
                    })
                break
            //PUXAR CEP
            case prefix + 'cep': //comando feito pelo @silasvljunior

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                if (!q) return await toki.sendMessage(from,`Digite o cep que deseja buscar`)
                misc.cep(encodeURIComponent(q))
                    .then(async ({ cep, state, city, neighborhood, street }) => {
                        if (cep == undefined) return await toki.sendMessage(from,`Cep não encontrado`)
                        await toki.sendMessage(from,msg.cep(cep, state, city, neighborhood, street))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await toki.sendMessage(from,`Cep nao encontrado`)
                    })
                break
            //RENOMEAR FIGURINHA
            case prefix + 'takestick': case prefix + 'take':
            case prefix + 'rename': case prefix + 'renomear':

                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                if (!q.includes('|')) return await toki.sendMessage(from,"vc tem que separa com | a frase!", from)
                if (!isQuotedSticker) return await toki.sendMessage(from,`Marque a figurinha`, from)
                try {
                    let mediaDataTake = await quotedMsg.downloadMedia()
                    await toki.sendMessage(from, mediaDataTake, { sendMediaAsSticker: true, stickerName: text1, stickerAuthor: text2 })
                    //console.log(color('[TAKE]', 'cyan'), color(`figurinha roubada em ${processTime(t, moment())} segundos!`, 'magenta'))
                } catch (err) {
                    console.log(err)
                    await toki.sendMessage(from,'Media não encontrada, envie a mesma novamente!')
                }
                break
            //PINTEREST
            case prefix + 'pin': case prefix + 'pinterest': //comando feito pelo @silasvljunior
                if (!isPremium) return await toki.sendMessage(from,msg.naoVip())
                if (!q) return await toki.sendMessage(from,`Digite o nome do video para baixar\n\nExemplo: /youtube Gatos fofos`)   
                await sendFileFromUrl(`https://aleatoryapi.herokuapp.com/api/pinterest?text=${q}&apikey=${keyale}`, { caption: msg.mandarCap() })
                break
            //logo de lista :)
            case prefix + 'create-neon-devil-wings-text-effect-online-free-1014.html': //DEVIL
            case prefix + 'make-a-batman-logo-online-free-1066.html': //BATMAN
            case prefix + 'toxic-text-effect-online-901.html': //TOXIC
            case prefix + 'create-logo-joker-online-934.html': //JOKER
            case prefix + '3d-golden-ancient-text-effect-online-free-1060.html': // GOLD
            case prefix + '3d-christmas-text-effect-by-name-1055.html': //NATAL
            case prefix + 'create-thunder-text-effect-online-881.html': //Thunder
            case prefix + 'neon-text-effect-online-879.html': //NEON
            case prefix + 'matrix-style-text-effect-online-884.html': //MATRIX
            case prefix + 'online-thunder-text-effect-generator-1031.html': //Thunder 2
            case prefix + 'create-impressive-glitch-text-effects-online-1027.html': //Falha
            case prefix + 'create-american-flag-3d-text-effect-online-1051.html': //AMÉRICA
            case prefix + 'minion-text-effect-3d-online-978.html': //MINIONS
            case prefix + 'create-a-magma-hot-text-effect-online-1030.html': //MAGMA
            case prefix + '1917-style-text-effect-online-980.html': //1917
            case prefix + 'online-black-and-white-bear-mascot-logo-creation-1012.html': //LOBO
            case prefix + 'dropwater-text-effect-872.html': //ESPELHO
            case prefix + 'halloween-fire-text-effect-940.html': // HALLOWEEN
            case prefix + 'create-a-sketch-text-effect-online-1044.html': //LÁPIS
            case prefix + 'create-a-transformer-text-effect-online-1035.html': //TRANSFORMER
            case prefix + 'create-green-horror-style-text-effect-online-1036.html': //DEMON
            if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!q) return toki.sendMessage(from,'Coloque o seu nome na frente do comando');
                await toki.sendMessage(from, 'Espere um pouquinho');
                w5botapi.textpro(`https://textpro.me${command}`, q).then(async (data) => {
                    try {
                        const a = new Date().getTime()
                        const downloader = new Downloader({
                            url: data, //If the file name already exists, a new file with the name 200MB1.zip is created.
                            directory: "./temp", //This folder will be created, if it doesn't exist.
                            fileName: a + ".jpg" //The file name.
                        });
                        try {
                            await downloader.download(); //Downloader.download() returns a promise.
                            toki.sendMessage(from, MessageMedia.fromFilePath(`./temp/${a}.jpg`))
                            fs.unlink(`./temp/${a}.jpg`, () => { })
                        }
                        catch (error) {
                            //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
                            //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
                            console.log("Download failed", error);
                        }
                    } catch (err) {
                        console.log(err)
                    }
                });
                break
            case prefix + 'logos':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!q) return await toki.sendMessage(from, 'Coloque o seu nome na frente do comando');
                textinho = q
                lista = new List('escolha uma fonte para usar no logo..', 'Abrir opções', [{ title: '✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟', rows: listMessage.logos(textinho) }]);
                await toki.sendMessage(from, lista);
                break
                case prefix+'cursos': case 'cursos':
                    cursos = `*Melhores cursos de programação e edição de imagens e videos com Adobes!*
                    todos pela hotmart e com certificação
                    
                    *PROGRAMAÇÃO*
                    html 
                    https://go.hotmart.com/W74377236P
                    
                    html, css e bootstrap5
                    https://go.hotmart.com/H74377315V
                    
                    JAVA
                    https://go.hotmart.com/D74377639X
                    
                    *ADOBES*
                    
                    ilustrator - Curso completo 
                    https://go.hotmart.com/S74377517D
                    
                    Premier - Curso Básico e intermediário
                    https://go.hotmart.com/I74377535J
                    
                    GAMES MÓDULO I - HTML + ANDROID 
                    https://go.hotmart.com/X74377362D`
                toki.sendMessage(from, cursos)
                break
            ////JOGO AKINATOR
            case prefix + 'akinator':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!isGroupMsg && !isOwner) return await toki.sendMessage(from,'só gp')
                if (akinator[0][from]) return await toki.sendMessage(from,'*Alguem está jogando no momento!*\nSe o jogo foi abandonado, use: /resetaki')
                if (isButtons_response) {
                    if (args[0] == 'nao') return await sendFileFromUrl("https://telegra.ph/file/034b2137d4fe5759c6a48.jpg", { sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author })
                    if (args[0] == 'sim')
                        akinator[0][from] = {
                            id: from,
                            player: user,
                            temp: Date.now() + toMs('10m'),
                            game: new Aki({ region: 'pt' })
                        }
                    await akinator[0][from].game.start()
                    lista = new List(akinator[0][from].game.question, 'Abrir opções', [{ title: '✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟', rows: listMessage.akinator }]);
                    await toki.sendMessage(from, lista);
                } else {
                    button = new Buttons(msg.akinator(pushname), listMessage.akinator2, null, 'Abrir opções');
                    await toki.sendMessage(from, button); //"isDynamicReplyButtonsMsg": true
                    break
                }
                break
            case prefix + 'respaki':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (!isList_response) return;
                if (akinator[0][from] && akinator[0][from].player != user) return;
                if (isGroupMsg && !isOwner) return await toki.sendMessage(from,avisos.gamesNotOn())
                try {
                    await akinator[0][from].game.step(ar[0])
                    if (akinator[0][from].game.progress > 85) {
                        await akinator[0][from].game.win()
                        await sendFileFromUrl(akinator[0][from].game.answers[0].absolute_picture_path, { caption: `Seu personagem é ${akinator[0][from].game.answers[0].name}` })
                        akinator[0][from] = undefined
                    } else {
                        lista = new List(akinator[0][from].game.question, 'Abrir opções', [{ title: '✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟', rows: listMessage.akinator }]);
                        await toki.sendMessage(from, lista)
                    }
                } catch { }
                break
            case prefix + 'resetaki':
                if (!isPremium) return await toki.sendMessage(from, msg.naoVip())
                if (akinator[0][from] === undefined) return await toki.sendMessage(from,'Não a uma sessão em andamento!')
                if (akinator[0][from] && akinator[0][from].player != user && Date.now() <= akinator[0][from].temp) {
                    const akiTemp = ms(akinator[0][from].temp - Date.now())
                    return await toki.sendMessage(from,`Sessão começou recentemente, aguarde ${akiTemp.minutes} minutos!`)
                }
                akinator[0][from] = undefined
                await toki.sendMessage(from,'Akinator resetado com sucesso!')
                break
            //FIM JOGO AKINATOR
            default:
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
