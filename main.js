const {default: makeWASocket,DisconnectReason,useSingleFileAuthState,delay,downloadContentFromMessage, MessageRetryMap, useMultiFileAuthState} = require("@adiwajshing/baileys");

//MÚDULOS
const fs = require("fs");
const config = require('./config.json')
const P = require("pino");
const fetch = require("node-fetch");
const mimetype = require("mime-types");
const speed = require("performance-now");
const moment = require("moment-timezone");
const { Aki } = require("aki-api");
const axios = require("axios");
const ms = require("parse-ms");
const request = require("request-promise");
const { color } = require('./lib/color');
const toMs = require("ms");
const thiccysapi = require("textmaker-thiccy");
const gis = require("g-i-s");
const googleIt = require("google-it");
const linkfy = require("linkifyjs");
const yts = require("yt-search");
const { igApi, getCookie } = require("insta-fetcher");
const ig = new igApi("oVaYqI8ZPEZUVPLa7V9nw5F8zYP5jPd5");
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const os = require("os");
const phaticusthiccy = require("@phaticusthiccy/open-apis");
const { createSticker } = require("wa-sticker-formatter");
const { exec } = require('child_process')
const Downloader = require("nodejs-file-downloader");
// LIBS
const { validmove, setGame } = require("./db/tictactoe");
const level = require("./lib/level.js");
const webp_mp4 = require("./db/js/webp_mp4.js");
const { getRandom, runtime, formatp } = require("./lib/myfunc");
const { getAdmins, getMembers } = require("./lib/utils");
const { data, data2, hora } = require("./lib/functions.js");
const { sendVideoAsSticker } = require('./lib/rename.js');
//ARQUIVOS JSON
const { state, saveState } = useSingleFileAuthState(`./TOMIOKA_QR.json`)
//tope
const { bemvindo2, _level,countMessage, _premium, premium, mensagem, dinheiro, antifake,bye_group, bye_group2, welcome_group, termos, welkom, welkom2, antilink, simi, akinator, adeuscara, antiviewonce, game, nsfw, antipala, getBuffer} = require('./func.js');
//FIM
blocked = [];
BotName = config.nomeBot
prefix = config.prefix
pack = "⬔ ۪࣪ 🌼𝖈𝖗𝖎𝖆𝖉𝖔𝖗 𝖉𝖔 𝖇𝖔𝖙:\n⤷   ꪶ͢͢͢𝐓𝐈͢𝚯 𝐓𝚯͢𝐌𝐈͢𝚯𝐊𝜟ꫂ\n\n꒺ ׄ₊👑̷ sᴇ ǫᴜɪsᴇʀ ғᴀʟᴀʀ:\n⤷ linktr.ee/tokibot         "
author = `⬔ ۪࣪ ✨ 𝓼𝓲𝓽𝓮:\nlinktr.ee/Tokibot    ↲\n\n꒺ ׄ₊🤖̷ 𝘽𝙊𝙏:\n${BotName}    ↲`
keyale = "key-ivan-safada-_2.0"
banChats = config.banChats 
const vcard ="BEGIN:VCARD\n" + "VERSION:3.0\n" + "FN:Tio Tomioka\n" + "ORG:Criador do Tomioka bot hihi;\n" + "TEL;type=CELL;type=VOICE;waid=554497433716:+55 99743 3716\n" + "END:VCARD";
const descFig = {type: 'full',pack: `${pack}`,author: `${author}`,categories: ['🌹']}
function connect() {
  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    msgRetryCounterMap: MessageRetryMap,
    defaultQueryTimeoutMs: undefined, 
    keepAliveIntervalMs: 1000 * 60 * 10 * 3
    })
  conn.ev.on("connection.update", (update) => {
    if (update.connection == "close") {
      if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.connectionClosed
      ) {
        console.log("conexão fechada, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.connectionLost
      ) {
        console.log("conexão com a internet foi perdida, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.connectionReplaced
      ) {
        console.log("conexão substituida, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.timedOut
      ) {
        console.log("tempo de conexão esgotado, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.loggedOut
      ) {
        console.log("usuario desconectado, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.badSession
      ) {
        console.log("sessão ruim, reconectando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.restartRequired
      ) {
        console.log("reiniciamento exigido, reiniciando...");
        connect();
      } else if (
        update.lastDisconnect.error.output.statusCode ==
        DisconnectReason.multideviceMismatch
      ) {
        console.log(
          "icompatibilidade com varios dispositivos, reconectando..."
        );
        connect();
      }
    }
  });

  //===============(BEM VINDO)=============\\

  conn.ev.on("group-participants.update", async (ale) => {
    const isGroup = ale.id.endsWith("@g.us");
    const mdata = isGroup ? await conn.groupMetadata(ale.id) : {};

    if (Object.keys(mdata).length == 0) return;

    // PEGAR DESCRIÇÃO DO GRUPO.
    const groupDesc = !mdata.desc ? "" : mdata.desc.toString();

    // CONST DO CMD DE BANIR QUEM ESTIVER NA LISTA N
    const adeuscara = JSON.parse(fs.readFileSync("./db/json/adeuscara.json"));
    const dbackid = [];
    for (i = 0; i < adeuscara.length; ++i) dbackid.push(adeuscara[i].groupId);
    console.log(ale);
    if (dbackid.indexOf(ale.id) >= 0) {
      if (ale.action == "add") {
        num = ale.participants[0];
        var ind = dbackid.indexOf(ale.id);
        if (
          adeuscara[ind].actived &&
          adeuscara[ind].number.indexOf(num.split("@")[0]) >= 0
        ) {
          await conn.sendMessage(mdata.id, {
            text: "*Olha quem deu as cara por aqui, sente o poder do ban cabaço*",
          });
          conn.groupParticipantsUpdate(
            mdata.id,
            [ale.participants[0]],
            "remove"
          );
          return;
        }
      }
    }
    // FIM LISTANEGRA CONST ^

    // ANTIFAKE QUE ESTÁ JUNTO COM BEM VINDO
    if (antifake.includes(ale.id)) {
      if (ale.action === "add" && !ale.participants[0].startsWith(55)) {
        num = ale.participants[0];
        conn.sendMessage(mdata.id, {
          text: "Bya bya número fake, você não e bem vindo aqui",
        });
        await delay(1000);
        conn.groupParticipantsUpdate(mdata.id, [ale.participants[0]], "remove");
      }
    }

    if (antifake.includes(ale.id)) {
      if (ale.action === "add" && ale.participants[0].startsWith(55800)) {
        num = ale.participants[0];
        conn.sendMessage(mdata.id, {
          text: "Suma daqui, você não e bem vindo",
        });
        await delay(1000);
        conn.groupParticipantsUpdate(mdata.id, [ale.participants[0]], "remove");
      }
    }
    // FIM ANTIFAKE ^

    // BEM VINDO COMPLETO
    if (welkom.includes(ale.id)) {
      if (antifake.includes(ale.id) && !ale.participants[0].startsWith(55))
        return;
      try {
        try {
          ppimg = await conn.profilePictureUrl(ale.participants[0]);
        } catch {
          ppimg = "https://telegra.ph/file/b5427ea4b8701bc47e751.jpg";
        }

        try {
          ppgp = await conn.profilePictureUrl(mdata.id);
        } catch {
          ppgp = "https://image.flaticon.com/icons/png/512/124/124034.png";
        }

        shortpc = await axios.get(
          `https://tinyurl.com/api-create.php?url=${ppimg}`
        );
        shortgc = await axios.get(
          `https://tinyurl.com/api-create.php?url=${ppgp}`
        );

        const groupIdWelcomed = [];
        const groupIdBye = [];
        for (let obj of welcome_group) groupIdWelcomed.push(obj.jid);
        for (let obj of bye_group) groupIdBye.push(obj.jid);

        const isByed = groupIdBye.indexOf(ale.id) >= 0 ? true : false;

        const isWelcomed = groupIdWelcomed.indexOf(ale.id) >= 0 ? true : false;

        if (ale.action === "add") {
          if (isWelcomed) {
            var ind = groupIdWelcomed.indexOf(ale.id);
            teks = welcome_group[ind].mek
              .replace("#hora#", time)
              .replace("#nomedogp#", mdata.subject)
              .replace("#numerodele#", "@" + ale.participants[0].split("@")[0])
              .replace("#numerobot#", conn.user.id)
              .replace("#prefixo#", prefix)
              .replace("#descrição#", groupDesc);
          } else {
            teks = welcome(ale.participants[0].split("@")[0], mdata.subject);
          }
          let buff = await getBuffer(ppimg);
          ran = getRandom(".jpg");
          await fs.writeFileSync(ran, buff);

          fs.unlinkSync(ran);
          imgbuff = await getBuffer(
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdAmc_FJxlY3xYDoLURHHYmJzmQsSzlkmt7AuyYvcrOu_mjPYR5z8IZLO0&s=10`
          );
          conn.sendMessage(mdata.id, {
            image: imgbuff,
            mentions: ale.participants,
            caption: teks,
          });
        } else if (ale.action === "remove") {
          mem = ale.participants[0];

          try {
            ppimg = await conn.profilePictureUrl(`${mem.split("@")[0]}@c.us`);
          } catch {
            ppimg = "https://telegra.ph/file/b5427ea4b8701bc47e751.jpg";
          }

          if (isByed) {
            var ind = groupIdBye.indexOf(ale.id);
            teks = bye_group[ind].mek
              .replace("#hora#", time)
              .replace("#nomedogp#", mdata.subject)
              .replace("#numerodele#", ale.participants[0].split("@")[0])
              .replace("#numerobot#", conn.user.id)
              .replace("#prefixo#", prefix)
              .replace("#descrição#", groupDesc);
          } else {
            teks = bye(ale.participants[0].split("@")[0]);
          }

          let buff = await getBuffer(ppimg);
          ran = getRandom(".jpg");
          fs.writeFileSync(ran, buff);

          imgbuff = await getBuffer(
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj3QSujsWG0LtzgE_2qRWA5ynruykS246CqQ&usqp=CAU`
          );
          conn.sendMessage(mdata.id, {
            image: imgbuff,
            caption: teks,
            mentions: ale.participants,
          });
          fs.unlinkSync(ran);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
  // FIM ^

  // BEM VINDO 2 ( SEM FOTO )

  conn.ev.on("creds.update", saveState);
  conn.ev.on("group-participants.update", async (ale) => {
    const isGroup = ale.id.endsWith("@g.us");
    const mdata = isGroup ? await conn.groupMetadata(ale.id) : {};

    if (Object.keys(mdata).length == 0) return;

    // PEGAR DESCRIÇÃO DO GRUPO
    const groupDesc = !mdata.desc ? "" : mdata.desc.toString();

    // CONST DO CMD DE BANIR QUEM ESTIVER NA LISTA N
    if (welkom2.includes(ale.id)) {
      if (antifake.includes(ale.id) && !ale.participants[0].startsWith(55))
        return;
      try {
        const welcome_group2 = JSON.parse(
          fs.readFileSync("./db/json/welcomegp2.json")
        );
        const welcome_group = JSON.parse(
          fs.readFileSync("./db/json/welcomegp.json")
        );
        const groupIdWelcomed2 = [];
        const groupIdBye2 = [];
        for (let obj of welcome_group2) groupIdWelcomed2.push(obj.jid);
        for (let obj of bye_group2) groupIdBye2.push(obj.jid);

        const isByed2 = groupIdBye2.indexOf(ale.id) >= 0 ? true : false;

        const isWelcomed2 =
          groupIdWelcomed2.indexOf(ale.id) >= 0 ? true : false;

        if (ale.action === "add") {
          if (isWelcomed2) {
            var ind = groupIdWelcomed2.indexOf(ale.id);
            teks = welcome_group2[ind].mek
              .replace("#hora#", time)
              .replace("#nomedogp#", mdata.subject)
              .replace("#numerodele#", "@" + ale.participants[0].split("@")[0])
              .replace("#numerobot#", conn.user.id)
              .replace("#prefixo#", prefix)
              .replace("#descrição#", groupDesc);
          } else {
            teks = welcome(ale.participants[0].split("@")[0], mdata.subject);
          }

          conn.sendMessage(
            mdata.id,
            { text: teks },
            { mentions: ale.participants }
          );
        } else if (ale.action === "remove") {
          mem = ale.participants[0];

          if (isByed2) {
            var ind = groupIdBye2.indexOf(ale.id);
            teks = bye_group2[ind].mek
              .replace("#hora#", time)
              .replace("#nomedogp#", mdata.subject)
              .replace("#numerodele#", ale.participants[0].split("@")[0])
              .replace("#numerobot#", conn.user.id)
              .replace("#prefixo#", prefix)
              .replace("#descrição#", groupDesc);
          } else {
            teks = bye(ale.participants[0].split("@")[0]);
          }

          conn.sendMessage(
            mdata.id,
            { text: teks },
            { mentions: ale.participants }
          );
          fs.unlinkSync(ran);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  conn.ev.on("creds.update", saveState);

  conn.ev.on("messages.upsert", async (updateM) => {
    if (updateM.type != "notify") return;
    const mek = updateM.messages[0];
    if (!mek.key.participant) mek.key.participant = mek.key.remoteJid;
    mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "");
    if (mek.key.fromMe) return;
    if (!mek.message) return;
    const from = mek.key.remoteJid;
    const info = mek.message;
    const pushname = mek.pushName || "Undefined";
    const type = require("@adiwajshing/baileys").getContentType(info);

    const body =
      type == "conversation"
        ? info[type]
        : type == "imageMessage"
        ? info[type].caption
        : type == "videoMessage"
        ? info[type].caption
        : type == "extendedTextMessage"
        ? info[type].text
        : type == "buttonsResponseMessage"
        ? info[type].selectedButtonId
        : type == "listResponseMessage"
        ? info[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? info[type].selectedId
        : "";

    selectedButton =
      type == "buttonsResponseMessage"
        ? mek.message.buttonsResponseMessage.selectedButtonId
        : "";
    const argsButton = selectedButton.trim().split(/ +/);

    var budy =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : "";
    var pes =
      type === "conversation" && mek.message.conversation
        ? mek.message.conversation
        : type == "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type == "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : type == "extendedTextMessage" && mek.message.extendedTextMessage.text
        ? mek.message.extendedTextMessage.text
        : "";
    function env(text) {
      conn.sendMessage(from, { text: text }, { quoted: mek });
    }
    var sendBimg = async (id, img1, text1, desc1, but = [], vr) => {
      buttonMessage = {
      image: {url: img1},
      caption: text1,
      footerText: desc1,
      buttons: but,
      headerType: 4
      }
      conn.sendMessage(id, buttonMessage, {quoted: mek})
      }

    function mention(text, quoted = true) {
      conn.sendMessage(
        from,
        { text: text, mentions: addMentionsInArray(text, "@s.whatsapp.net") },
        quoted ? { quoted: mek } : {}
      );
    }
    //IMPORTANTES, NÃO MEXA AQUI

    const botN = conn.user.id.replace(/:[0-9]+/gi, "");
    const isBot = mek.key.fromMe;
    const owner = ["554497433716@s.whatsapp.net"];
    const rayssa = ["554497239322@s.whatsapp.net"];

    const isGroup = mek.key.remoteJid.endsWith("g.us");
    const metadata = isGroup ? await conn.groupMetadata(from) : {};
    const IsDonoGo = metadata.owner;
    const groupMetadata = isGroup ? await conn.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupDesc = isGroup ? groupMetadata.desc : "";
    const groupMembers = isGroup ? groupMetadata.participants : [];
    const sender = mek.key.participant;
    const adivinha =
      mek.key.id.length > 21
        ? "Android 📱"
        : mek.key.id.substring(0, 2) == "3A"
        ? "IOS 📱"
        : "WEB  💻";
    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const ants = body;
    const args = body.trim().split(/ +/).slice(1);
    const argss = body.split(/ +/g);
    const texto = args.join(" ");
    const q = args.join(" ");
    const p = args.join(" ");
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const quoted = mek.quoted ? mek.quoted : mek;
    const content = JSON.stringify(mek.message);

    //CONSOLE

    console.log(
      "\n\033[31mENDEREÇO IP: \033[34m" +
        mek.key.remoteJid +
        "\n" +
        "\033[31mID DE MENSAGEM: \033[34m" +
        mek.key.id +
        "\n" +
        "\033[31mUSUÁRIO: \033[34m" +
        mek.key.participant +
        "\n" +
        "\033[31mPUSHNAME: \033[34m" +
        pushname +
        "\n" +
        "\033[31mCOMANDO: \033[34m" +
        texto +
        "\n" +
        "\033[31mData e hora: \033[34m" +
        data2 +
        " " +
        "as" +
        " " +
        hora() +
        "\n\n"
    );

    //VERIFICADOS
    const selo = {
      key: {
        participant: "0@s.whatsapp.net",
        remoteJid: "120363023849383476@g.us",
      },
      message: { conversation: `${BotName}` },
    };
    const whatsapp = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { extendedTextMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const imagemek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { extendedTextMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const videomek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { extendedTextMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const stickermek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { stickerMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const documentomek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { documentMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const contatomek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { contactMessage: { text: `Toki Bot`, title: "hmm" } },
    };
    const audiomek = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: { audioMessage: { text: `Toki Bot`, title: "hmm" } },
    };

    /*  const groupTabela = []	
    for(let obj of profissao_group) groupTabela.push(obj.jid)*/

    //FRASES DE USUÁRIOS

    const isDono = owner.includes(sender);
    const isRayssa = rayssa.includes(sender);
    const isPremium = premium.checkPremiumUser(sender, _premium);	
    const isAdmins = isGroup ? getAdmins(groupMembers) : "";
    const isMemberAdmin = isGroup ? isAdmins.indexOf(sender) > -1 : false;
    const isBotAdm = isGroup ? isAdmins.indexOf(botN) > -1 : false;
    const allMembers = isGroup ? getMembers(groupMembers) : [];
    const isAntiPala = isGroup ? antipala.includes(from) : false;
    const isNsfw = isGroup ? nsfw.includes(from) : true;
    const isGame = isGroup ? game.includes(from) : false;
    const isAntifake = isGroup ? antifake.includes(from) : false;
    const isAntiVO = isGroup ? antiviewonce.includes(from) : false;
    const isSimi = isGroup ? simi.includes(from) : false;
    const isLevelingOn = isGroup ? _level.includes(from) : false;
    const isAntiLink = isGroup ? antilink.includes(from) : false;
    const isCmd = prefix.indexOf(body.slice(0, 1)) > -1;
    const isComum = bemvindo2.includes(sender) ? type === 'videoMessage' || type === 'imageMessage' : true
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? conn.sendMessage(from, { text: teks.trim(), mentions: memberr })
        : conn.sendMessage(from, { text: teks.trim(), mentions: memberr });
    };

    const getFileBuffer = async (mediakey, MediaType) => {
      const stream = await downloadContentFromMessage(mediakey, MediaType);

      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
    };

    const isUrl = (url) => {
      if (linkfy.find(url)[0]) return true;
      return false;
    };
    const getExtension = async (type) => {
      return await mimetype.extension(type);
    };
    //=========(isQuoted/consts)=============\\
    const isImage = type == "imageMessage";
    const isVideo = type == "videoMessage";
    const isAudio = type == "audioMessage";
    const isSticker = type == "stickerMessage";
    const isContact = type == "contactMessage";
    const isLocation = type == "locationMessage";
    const isProduct = type == "productMessage";
    const isMedia =
      type === "imageMessage" ||
      type === "videoMessage" ||
      type === "audioMessage";
    typeMessage = body.substr(0, 50).replace(/\n/g, "");
    if (isImage) typeMessage = "Image";
    else if (isVideo) typeMessage = "Video";
    else if (isAudio) typeMessage = "Audio";
    else if (isSticker) typeMessage = "Sticker";
    else if (isContact) typeMessage = "Contact";
    else if (isLocation) typeMessage = "Location";
    else if (isProduct) typeMessage = "Product";

    const isQuotedMsg =
      type === "extendedTextMessage" && content.includes("textMessage");

    const isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");

    const isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");

    const isQuotedDocument =
      type === "extendedTextMessage" && content.includes("documentMessage");

    const isQuotedAudio =
      type === "extendedTextMessage" && content.includes("audioMessage");

    const isQuotedSticker =
      type === "extendedTextMessage" && content.includes("stickerMessage");

    const isQuotedContact =
      type === "extendedTextMessage" && content.includes("contactMessage");

    const isQuotedLocation =
      type === "extendedTextMessage" && content.includes("locationMessage");

    const isQuotedProduct =
      type === "extendedTextMessage" && content.includes("productMessage");

        //autofigu e ignorar comando não premium 

    
        if(!isPremium && !isRayssa && type === "imageMessage") {
          rane = getRandom('.'+'webp')
          buffimg = await getFileBuffer(mek.message.imageMessage, 'image')
          fig_enviar = await createSticker(buffimg, descFig)
          await conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})
    
        } else if (!isPremium && !isRayssa && type === "videoMessage") {
           boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
            owgi = await getFileBuffer(boij, 'video')
            pack = config.pack
            author = config.author
           await sendVideoAsSticker(conn, from, owgi, mek, { packname: pack, author:author})
  
         ////----parte Rayssa----////
         
          } else if (isRayssa && type === "imageMessage") {
          rane = getRandom('.'+'webp')
           buffimg = await getFileBuffer(mek.message.imageMessage, 'image')
           const rayfig = {type: 'full',pack: `Rapkcz ray🤍`,author: ``,categories: ['🌹']}
           const fig_enviar = await createSticker(buffimg, rayfig)
           conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})
  
        } else if (isRayssa && type === "videoMessage") {
          var pack = `Rapkcz ray🤍`
          boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
           owgi = await getFileBuffer(boij, 'video')
          await sendVideoAsSticker(conn, from, owgi, mek, { packname:pack })
  
  
          ////----parte Premium----////
        } 
  


    switch (command) {
     

      default:
    }
    //==============(ANTILINK)===============\\

    switch (ants) {
    }

    //=======================================\\

    if (isAntiLink) {
      if (type == "stickerMessage")
        if (type == "audioMessage")
          if (type == "imageMessage")
            if (
              budy.includes("https://") ||
              budy.includes(".net") ||
              budy.includes(".com") ||
              budy.includes("//s.kwai.app/") ||
              budy.includes("//vm.tiktok") ||
              budy.includes("www.") ||
              budy.includes("chat.whatsapp") ||
              budy.includes(".xml") ||
              budy.includes("youtube.com") ||
              budy.includes("//t.me/") ||
              budy.includes(".css")
            ) {
              linkgpp = await conn.groupInviteCode(from);
              if (budy.match(`${linkgpp}`))
                return env("Link do nosso grupo, não irei remover.. ");
              if (!isGroup)
                if (isGroupAdmins)
                  return env(
                    `*Vc é admin do gp,fica tranquilo que não irei te banir.*`
                  );
              setTimeout(() => {}, 1100);
              setTimeout(() => {
                conn.groupParticipantsUpdate(from, [sender], "remove");
              }, 1000);
            }
    }
    //========================================\\
  });
}

connect();
