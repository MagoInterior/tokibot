const {default: makeWASocket,DisconnectReason,useSingleFileAuthState,delay,downloadContentFromMessage, MessageRetryMap} = require("@adiwajshing/baileys");

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
const { convertSticker } = require("./lib/swm.js");
// LIBS
const { validmove, setGame } = require("./db/tictactoe");
const level = require("./lib/level.js");
const webp_mp4 = require("./db/js/webp_mp4.js");
const { getRandom, runtime, formatp, getBuffer } = require("./lib/myfunc");
const { getAdmins, getMembers } = require("./lib/utils");
const { data, data2, hora } = require("./lib/functions.js");
const {addToken,removeToken,getAllTokens,getTokenByNumber} = require("./lib/fichas.js");
const { sendVideoAsSticker } = require('./lib/rename.js');
//ARQUIVOS JSON
const { state, saveState } = useSingleFileAuthState("auth-info-multi.json");
const { bemvindo2, _level,countMessage, _premium, premium, mensagem, dinheiro, antifake,bye_group, bye_group2, welcome_group, termos, welkom, welkom2, antilink, simi, akinator, adeuscara, antiviewonce, game, nsfw, antipala} = require('./func.js');
//FIM
blocked = [];
BotName = config.nomeBot
prefix = config.prefix
pack = config.pack
author = config.author
keyale = config.keyale
banChats = config.banChats 
global.blocked;
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
    // console.log(mek);

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
      message: { conversation: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD" },
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
    if(!isRayssa && type === "imageMessage") {
      rane = getRandom('.'+'webp')
      buffimg = await getFileBuffer(mek.message.imageMessage, 'image')
      fig_enviar = await createSticker(buffimg, descFig)
await conn.sendMessage(from, {sticker: fig_enviar})

    } else if (!isRayssa && type === "videoMessage") {
       boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
        owgi = await getFileBuffer(boij, 'video')
        pack = config.pack
        author = config.author
       await sendVideoAsSticker(conn, from, owgi, mek, { packname: pack, author:author})

       
      } else if (isRayssa && type === "imageMessage") {
        rane = getRandom('.'+'webp')
      buffimg = await getFileBuffer(mek.message.imageMessage, 'image')
    const rayfig = {
type: 'full',
pack: `Rapkcz ray🤍`,
author: ``,
categories: [
'🌹'
]
}
const fig_enviar = await createSticker(buffimg, rayfig)
conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

      } else if (isRayssa && type === "videoMessage") {
        var pack = `Rapkcz ray🤍`
        boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
         owgi = await getFileBuffer(boij, 'video')
        await sendVideoAsSticker(conn, from, owgi, mek, { packname:pack })
      }


    if(!isGroup && banChats === true && !isDono && !isPremium && !isComum) return env('Olá esse bot ficou privado e só fara figurinhas agr, se quiser vê-lo completo precisa comprar com o criador o acesso vip que terá acesso completo do bot\n\nsegue o link abaixo..\nwa.me/554497433716') 
     bemvindo2.push(sender) 
     fs.writeFileSync("./db/json/bemvindo2.json", JSON.stringify(bemvindo2));
    
    const atibot = mek.isBaileys
      if (atibot === true) return 

 
  // ENVIAR BOTÃO COM TEXTO
  var sendBtext = async (id, text1, desc1, but = [], vr) => {
  buttonMessage = {
  text: text1,
  footer: desc1,
  buttons: but,
  headerType: 1
  }
  conn.sendMessage(id, buttonMessage, {quoted: mek})
  }
  
  
    function sendButtonText(contentText, footerText, options = {}) {
      const content = {
        buttonsMessage: {
          contentText: contentText,
          footerText: footerText,
          buttons: [],
          contextInfo: {
            isForwarded: true,
            forwardingScore: 0,
          },
          headerType: 1,
        },
      };
      const key = Object.keys(content)[0];
      content[key].contextInfo.mentionedJid =
        "contextInfo" in options ? options.contextInfo.mentionedJid : [];
      if ("quoted" in options) {
        const { quoted } = options;
        content[key].contextInfo.participant = quoted.key.participant;
        content[key].contextInfo.quotedMessage = quoted.message;
      } else if ("contextInfo" in options) {
      }
      conn.relayMessage(from, content, {
        messageId: require("@adiwajshing/baileys").generateMessageID(),
        additionalAttributes: {},
      });
    }

    const fetchJson = (url) => {
      return fetch(url)
        .then((response) => response.json())
        .catch((err) => {
          throw new Error(err);
        });
    };
    const addMentionsInArray = (me, idWA) => {
      if (!/@[0-9]+/g.test(me)) {
        const mentioneds = [];
        return mentioneds;
      }
      const mentioneds = [];
      const regExp = /@[0-9]+/g;
      const NumberMentioneds = me.match(regExp);

      for (let i of NumberMentioneds) {
        var ending = i.replace(/@/g, "");
        var format = ending + idWA;
        mentioneds.push(format);
      }
      return mentioneds;
    };

   
    //===============(AUTO-BAN)=============\\
    const dbids = [];
    for (i = 0; i < adeuscara.length; ++i) {
      dbids.push(adeuscara[i].groupId);
    }
    const isAdeusCara = isGroup && dbids.indexOf(from) >= 0 ? true : false;

    //======================================\\

    // Automate

    premium.expiredCheck(_premium);

    //=================================\\

    if (isUrl(body) && isAntiLink && isMemberAdmin && isBotAdm) {
      linkgpp = await conn.groupInviteCode(from);
      if (!isUrl(body)) return;
      if (budy.match(`${linkgpp}`)) return;
      if (isBot) return;
    }

    if (isUrl(body) && isAntiLink && !isMemberAdmin && isBotAdm) {
      linkgpp = await conn.groupInviteCode(from);
      if (budy.match(`${linkgpp}`))
        return env("Link do nosso grupo, não irei remover.. ");
      if (!isUrl(body)) return;
      env("*Link detectado...*");
      conn.groupParticipantsUpdate(from, [sender], "remove");
    }

    if (!isGroup && isBotAdm && isAntiLink) {
      if (mek.key.fromMe) return;
      if (type == "stickerMessage") return;
      if (type == "audioMessage") return;
      linkgppp = await conn.groupInviteCode(from);
      if (
        (!budy.match(linkgppp) && budy.includes("chat.whatsapp.com/")) ||
        budy.includes("whatsapp.com/")
      ) {
        if (budy.match(linkgppp)) return env("Link de nosso grupo 🙂");
        if (mek.key.fromMe) return;
        if (!isMemberAdmin && !isDono) return;
        env("Adeus bosta");
        conn.groupParticipantsUpdate(from, [sender], "remove");
      }
    }

    //=========(isQuoted/consts)=============\\

    const sendStickerFromUrl = async (to, url) => {
      var names = Date.now() / 10000;
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, "./complement/sticker" + names + ".png", async function () {
        console.log("enviando sticker");
        let filess = "./complement/sticker" + names + ".png";
        let asw = "./complement/sticker" + names + ".webp";
        exec(
          `ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${asw}`,
          (err) => {
            let media = fs.readFileSync(asw);
            conn.sendMessage(
              to,
              { sticker: media },
              {
                sendEphemeral: true,
                contextInfo: { forwardingScore: 50, isForwarded: true },
                quoted: mek,
              }
            );
            fs.unlinkSync(filess);
            fs.unlinkSync(asw);
          }
        );
      });
    };

    //======================================\\

    const getGroup = async function (totalchat) {
      let grup = [];
      let a = [];
      let b = [];
      for (c of totalchat) {
        a.push(c.id);
      }
      for (d of a) {
        if (d && d.includes("g.us")) {
          b.push(d);
        }
      }
      for (e of b) {
        let ingfo = await conn.groupMetadata(e);
        grup.push(ingfo);
      }
      return grup;
    };

    /********** sendFileFromUrl ***************/

    function sendFileFromUrl(link) {
      conn
        .sendMessage(from, { image: { url: link } }, { quoted: mek })
        .catch((e) => {
          env("Erro ao baixar e enviar mídia.");
          console.log(e);
        });
    }

    const sendFileFromUrl2 = async (link, type, options) => {
      hasil = await getBuffer(link);
      await conn.sendMessage(from, hasil, type, options).catch((e) => {
        fetch(link).then((hasil) => {
          conn.sendMessage(from, hasil, type, options).catch((e) => {
            conn.sendMessage(from, { url: link }, type, options).catch((e) => {
              env("_[ ! ] Erro ao baixar e enviar mídia_");
              console.log(e);
            });
          });
        });
      });
    };

    const sendMediaURL = async (to, url, text = "", mids = []) => {
      if (mids.length > 0) {
        text = normalizeMention(to, text, mids);
      }
      const fn = Date.now() / 10000;
      const filename = fn.toString();
      let mime = "";
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          mime = res.headers["content-type"];
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, filename, async function () {
        console.log("done");
        let media = fs.readFileSync(filename);
        let type = mime.split("/")[0] + "Message";
        if (mime === "image/gif") {
          type = MessageType.video;
          mime = Mimetype.gif;
        }
        if (mime.split("/")[0] === "audio") {
          mime = Mimetype.mp4Audio;
        }
        conn.sendMessage(to, media, type, {
          quoted: mek,
          Mimetype: mime,
          caption: text,
          contextInfo: { mentionedJid: mids },
        });
        fs.unlinkSync(filename);
      });
    };

    /********** MÓDULO TOGIF ***************/

    const sendStickerUrl = async (to, url) => {
      console.log(
        color(time, "magenta"),
        color(moment.tz("Asia/Jakarta").format("HH:mm:ss"), "gold"),
        color("Downloading sticker...")
      );
      var names = getRandom(".webp");
      var namea = getRandom(".png");
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, namea, async function () {
        let filess = namea;
        let asw = names;
        require("./lib/exif.js");
        exec(
          `ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`,
          (err) => {
            exec(
              `webpmux -set exif ./complementos/sticker/data.exif ${asw} -o ${asw}`,
              async (error) => {
                let media = fs.readFileSync(asw);
                connsendMessage(to, media, sticker, zits);
                console.log(
                  color(time, "magenta"),
                  color(moment.tz("Asia/Jakarta").format("HH:mm:ss"), "gold"),
                  color("Enviando sticker com sucesso!")
                );
              }
            );
          }
        );
      });
    };

    // RANKS para leveis
    {
      const levelRole = level.getLevelingLevel(sender, _level);
      var role = "Bronze 5";
      if (levelRole >= 5 && levelRole <= 9) {
        role = "Bronze 4";
      } else if (levelRole >= 10 && levelRole <= 14) {
        role = "Bronze 3";
      } else if (levelRole >= 15 && levelRole <= 19) {
        role = "Bronze 2";
      } else if (levelRole >= 20 && levelRole <= 24) {
        role = "Bronze 1";
      } else if (levelRole >= 25 && levelRole <= 29) {
        role = "Prata 5";
      } else if (levelRole >= 30 && levelRole <= 34) {
        role = "Prata 4";
      } else if (levelRole >= 35 && levelRole <= 39) {
        role = "Prata 3";
      } else if (levelRole >= 40 && levelRole <= 44) {
        role = "Prata 2";
      } else if (levelRole >= 45 && levelRole <= 49) {
        role = "Prata 1";
      } else if (levelRole >= 50 && levelRole <= 54) {
        role = "Ouro 5";
      } else if (levelRole >= 55 && levelRole <= 59) {
        role = "Ouro 4";
      } else if (levelRole >= 60 && levelRole <= 64) {
        role = "Ouro 3";
      } else if (levelRole >= 65 && levelRole <= 69) {
        role = "Ouro 2";
      } else if (levelRole >= 70 && levelRole <= 74) {
        role = "Ouro 1";
      } else if (levelRole >= 75 && levelRole <= 79) {
        role = "Platina 5";
      } else if (levelRole >= 80 && levelRole <= 84) {
        role = "Platina 4";
      } else if (levelRole >= 85 && levelRole <= 89) {
        role = "Platina 3";
      } else if (levelRole >= 90 && levelRole <= 94) {
        role = "Platina 2";
      } else if (levelRole >= 95 && levelRole <= 99) {
        role = "Platina 1";
      } else if (levelRole >= 100 && levelRole <= 124) {
        role = "DEUS ASH 3";
      } else if (levelRole >= 125 && levelRole <= 149) {
        role = "DEUS ASH 2";
      } else if (levelRole >= 150 && levelRole <= 174) {
        role = "DEUS ASH 1";
      } else if (levelRole >= 175 && levelRole <= 199) {
        role = "ASH MAX 2";
      } else if (levelRole >= 200) {
        role = "ASH MAX";
      }
    }

    // Leveling

    if (isGroup && isCmd && !level.isGained(sender) && isLevelingOn) {
      try {
        const currentLevel = level.getLevelingLevel(sender, _level);
        const requiredXp =
          5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
        level.addLevelingXp(sender, 1, _level);
        if (requiredXp <= level.getLevelingXp(sender, _level)) {
          level.addLevelingLevel(sender, 1, _level);
          const userLevel = level.getLevelingLevel(sender, _level);
          const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100;
          await env(
            `*── 「 LEVEL UP 」 ──*\n\n➸ *Nome*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(
              sender,
              _level
            )} / ${fetchXp}\n➸ *Level*: ${currentLevel} -> ${level.getLevelingLevel(
              sender,
              _level
            )} 🆙 \n➸ *Rank*: *${role}*\n\n*═══〘 ASH BOT 〙═══*`
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    //========(CONTADOR-DE-MENSAGENS)========\\

    const groupIdscount = [];
    const numbersIds = [];
    for (let obj of countMessage) {
      groupIdscount.push(obj.groupId);
    }
    if (isGroup && groupIdscount.indexOf(from) >= 0) {
      var ind = groupIdscount.indexOf(from);
      for (let obj of countMessage[ind].numbers) {
        numbersIds.push(obj.jid);
      }
      if (numbersIds.indexOf(sender) >= 0) {
        var indnum = numbersIds.indexOf(sender);
        countMessage[ind].numbers[indnum].messages += 1;
        countMessage[ind].numbers[indnum].cmd_messages += isCmd ? 1 : 0;
        fs.writeFileSync(
          "./db/json/countmsg.json",
          JSON.stringify(countMessage, null, 2) + "\n"
        );
      } else {
        const messages = 1;
        const cmd_messages = isCmd ? 1 : 0;
        countMessage[ind].numbers.push({
          jid: sender,
          messages: messages,
          cmd_messages: cmd_messages,
        });
        fs.writeFileSync(
          "./db/json/countmsg.json",
          JSON.stringify(countMessage, null, 2) + "\n"
        );
      }
    } else if (isGroup) {
      countMessage.push({
        groupId: from,
        numbers: [
          {
            jid: sender,
            messages: 2,
            cmd_messages: isCmd ? 1 : 0,
          },
        ],
      });
      fs.writeFileSync(
        "./db/json/countmsg.json",
        JSON.stringify(countMessage, null, 2) + "\n"
      );
    }
    //======================================\\

    //começo do dinheiro
    // ADICIONA UMA QUANTIA DE DINHEIRO NA CONTA DO USUÁRIO
    const addATM = (sender) => {
      const obj = { id: sender, dinheiro: 0 };
      dinheiro.push(obj);
      fs.writeFileSync("./db/json/dinheiro.json", JSON.stringify(dinheiro));
    };
    // SISTEMA PARA ADICIONAR/RETIRAR O DINHEIRO DO USUÁRIO

    const addKoinUser = (sender, amount) => {
      let position = false;
      Object.keys(dinheiro).forEach((i) => {
        if (dinheiro[i].id === sender) {
          position = i;
        }
      });
      if (position !== false) {
        dinheiro[position].dinheiro += amount;
        fs.writeFileSync("./db/json/dinheiro.json", JSON.stringify(dinheiro));
      }
    };

    //CHECAR O DINHEIRO
    const checkATMuser = (sender) => {
      let position = false;
      Object.keys(dinheiro).forEach((i) => {
        if (dinheiro[i].id === sender) {
          position = i;
        }
      });
      if (position !== false) {
        return dinheiro[position].dinheiro;
      }
    };

    //COMFIRMAR ATM
    const confirmATM = (sender, amount) => {
      let position = false;
      Object.keys(dinheiro).forEach((i) => {
        if (dinheiro[i].id === sender) {
          position = i;
        }
      });
      if (position !== false) {
        dinheiro[position].dinheiro -= amount;
        fs.writeFileSync("./db/json/dinheiro.json", JSON.stringify(dinheiro));
      }
    };

    //BALANCEAMENTO DA MOEDA/DINHERO DO BOT

    const checkATM = checkATMuser(sender);
    try {
      if (checkATM === undefined) addATM(sender);
      const dinheirosaku = Math.floor(Math.random() * 1) + 2; //GANHA ENTRA 10 * 50 POR CADA MSG
      addKoinUser(sender, dinheirosaku);
    } catch (err) {
      console.error(err);
    }

    //======(JOGO-DA-VELHA)=======(Função)===\\

    //////////_FUNÇÕES DO JOGO DA VELHA_//////
    const cmde = budy.toLowerCase().split(" ")[0] || "";
    let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (fs.existsSync(`./db/tictactoe/db/${from}.json`)) {
      const boardnow = setGame(`${from}`);
      if (budy == "Cex") return env("why");
      if (
        budy.toLowerCase() == "s" ||
        budy.toLowerCase() == "sim" ||
        budy.toLowerCase() == "ok"
      ) {
        if (boardnow.O == sender.replace("@s.whatsapp.net", "")) {
          if (boardnow.status) return env(`O jogo já começou antes!`);
          const matrix = boardnow._matrix;
          boardnow.status = true;
          fs.writeFileSync(
            `./db/tictactoe/db/${from}.json`,
            JSON.stringify(boardnow, null, 2)
          );
          const chatAccept = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
                    
❌ : @${boardnow.X}
⭕ : @${boardnow.O}
               
Sua vez... : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}

${matrix[0][0]}  ${matrix[0][1]}  ${matrix[0][2]}
${matrix[1][0]}  ${matrix[1][1]}  ${matrix[1][2]}
${matrix[2][0]}  ${matrix[2][1]}  ${matrix[2][2]}
`;
          mention(chatAccept);
        }
      } else if (
        budy.toLowerCase() == "n" ||
        budy.toLowerCase() == "não" ||
        budy.toLowerCase() == "no"
      ) {
        if (boardnow.O == sender.replace("@s.whatsapp.net", "")) {
          if (boardnow.status) return env(`O jogo já começou!`);
          fs.unlinkSync(`./db/tictactoe/db/${from}.json`);
          mention(
            `@${boardnow.X} *_Infelizmente seu oponente não aceitou o desafio ❌😕_*`
          );
        }
      }
    }

    if (arrNum.includes(cmde)) {
      const boardnow = setGame(`${from}`);
      if (!boardnow.status)
        return env(`Parece que seu oponente não aceitou o desafio ainda...`);
      if (
        (boardnow.turn == "X" ? boardnow.X : boardnow.O) !=
        sender.replace("@s.whatsapp.net", "")
      )
        return;
      const moving = validmove(Number(budy), `${from}`);
      const matrix = moving._matrix;
      if (moving.isWin) {
        if (moving.winner == "SERI") {
          const chatEqual = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
          
Jogo termina empatado 😐
`;
          env(chatEqual);
          fs.unlinkSync(`./db/tictactoe/db/${from}.json`);
          return;
        }
        const abt = Math.ceil(Math.random() + 4000);
        const winnerJID = moving.winner == "O" ? moving.O : moving.X;
        const looseJID = moving.winner == "O" ? moving.X : moving.O;
        const limWin = Math.floor(Math.random() * 1) + 10;
        const limLoose = Math.floor(Math.random() * 1) + 5;
        const chatWon = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
          
Vencido por @${winnerJID} 😎👑
`;
        level.addLevelingXp(winnerJID + "@s.whatsapp.net", abt, _level);
        mention(chatWon);
        setTimeout(() => {
          if (fs.existsSync("./db/tictactoe/db/" + from + ".json")) {
            fs.unlinkSync("./db/tictactoe/db/" + from + ".json");
            env(`*🕹️JOGO DA VELHA RESETADO...🕹️*`);
          } else {
            console.log(
              color(time, "red"),
              color("[ ESPIRADO ]", "magenta"),
              color("Jogo da velha espirado", "red")
            );
          }
        }, 2000000); //20 minutos
        mention(
          `_*🥳Parabéns @${winnerJID} Você ganhou "${abt}" em xp por ter ganhado o jogo da velha🎉...*_`
        );
        fs.unlinkSync(`./db/tictactoe/db/${from}.json`);
      } else {
        const chatMove = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
          
❌ : @${moving.X}
⭕ : @${moving.O}

Sua vez : @${moving.turn == "X" ? moving.X : moving.O}

${matrix[0][0]}  ${matrix[0][1]}  ${matrix[0][2]}
${matrix[1][0]}  ${matrix[1][1]}  ${matrix[1][2]}
${matrix[2][0]}  ${matrix[2][1]}  ${matrix[2][2]}
`;
        mention(chatMove);
      }
    }

    //PALA
    if (isAntiPala) {
      if (
        body === `Puta` ||
        body === `Fdp` ||
        body === `Pqp` ||
        body === `Lixo` ||
        body === `Mamaco` ||
        body === `Preto` ||
        body === `Seu preto` ||
        body === `Mendigo` ||
        body === `Vsf` ||
        body === `Bts` ||
        body === `Viado`
      ) {
        if (isMemberAdmin) return;
        if (!isBotAdm) return env(mensagem[0].botadmin);
        setTimeout(() => {
          conn.groupParticipantsUpdate(from, [sender], "remove");
        }, 1000);
      }
    }

    //=================================\\
   

    
     
     
    
    /********** IF DE AUTO RESPONDE TXT ***************/

    if (body === `bot` || body === `Bot` || body === `BOT`) {
      env("Euuuuuu");
      conn.sendMessage(
        from,
        { sticker: { url: `./complement/sticker/eu.webp` } },
        { quoted: mek }
      );
    }

    //VISU MSG
    //await conn.sendReadReceipt(from, mek.key.participant, [mek.key.id]);

    //=================================\\
  
 
     if (body.length >= 3000) {

     }
    switch (argsButton[0]) {
      case "finaki":
        if (argsButton[1] == "nao") return env("*Puxa não foi desta vez 😔*");
        env("*SABIA! EU VENCI KK 🥳*");
        akinator[0][from] = undefined;
        fs.writeFileSync(
          "./db/json/akinator.json",
          JSON.stringify(akinator, null, 2)
        );
        break;
      case "akinator":
        if (argsButton[1] == "nao") return env("*Até a próxima amigo*");
        if (akinator[0][from])
          return env(
            "*Desculpe-me amigo alguem ja está jogando, aguarde pra chegar sua vez*"
          );
        akinator[0][from] = {
          id: from,
          player: sender,
          game: new Aki({ region: "pt" }),
        };
        await akinator[0][from].game.start();
        listMessage = {
          text: akinator[0][from].game.question,
          footer: "Mostrar opções",
          buttonText: "Opções",
          title: "Pergunta",
          sections: [
            {
              title: "Opções",
              rows: [
                {
                  rowId: `${prefix}respaki 0`,
                  title: "Sim",
                  description: "",
                },
                {
                  rowId: `${prefix}respaki 1`,
                  title: "Não",
                  description: "",
                },
                {
                  rowId: `${prefix}respaki 2`,
                  title: "Não sei",
                  description: "",
                },
                {
                  rowId: `${prefix}respaki 3`,
                  title: "Provavelmente sim",
                  description: "",
                },
                {
                  rowId: `${prefix}respaki 4`,
                  title: "Provavelmente não",
                  description: "",
                },
              ],
            },
          ],
        };
        conn.sendMessage(from, listMessage, { quoted: mek });
        fs.writeFileSync(
          "./db/json/akinator.json",
          JSON.stringify(akinator, null, 2)
        );
        break;
    }

    if (prefix.indexOf(body.slice(0, 1)) < 0) return;

    switch (command) {
      //MENUS

      /* $eval dados = ("")
 numero = dados.replace('-', '')
 number = numero.replace(' ', '')
 num = number.replace(' ', '')
 nums = num.replace('+', '')
 env(nums) */

      case "templatemessageee":
        conn.sendMessage(from, {
          text: "text1",
          footer: "text2 ",
          templateButtons: [
            {
              index: 1,
              urlButton: {
                displayText: "Meu site ",
                url: "https://linktr.ee/tokibot",
              },
            },
            {
              index: 2,
              callButton: {
                displayText: "call me",
                phoneNumber: "+55 44 99743-3716",
              },
            },
            {
              index: 3,
              quickReplyButton: {
                displayText: "teste",
                id: `${prefix}tac`,
              },
            },
          ],
        });
        break;

      case "menu":
      case "help":
      case "comandos":
        let menuft = `${Math.floor(Math.random() * 12)}`;

        var menuzin = `╭──────────────╮
│░ BEM VINDO AO MENU░
╞─────╮ ▽ ╭─────╯
│
│Toki-Beta MD
│Seu dispositivo: ${adivinha}
│Reportar erro *${prefix}reporte <erro>
╞═⟪ *STICKER* ⟫════
│
│➪ *${prefix}figupacks*
│➪ *${prefix}attp*
│➪ *${prefix}toimg*
│➪ *${prefix}togif*
│
╞═⟪ *ADMINISTRAÇÃO* ⟫════
│
│➪ *${prefix}rankgm*
│➪ *${prefix}setnome*
│➪ *${prefix}setdesc*
│➪ *${prefix}notreleaseconfig*
│➪ *${prefix}releaseconfig*
│➪ *${prefix}closed*
│➪ *${prefix}open*
│➪ *${prefix}notif*
│➪ *${prefix}promote*
│➪ *${prefix}ban*
│➪ *${prefix}demote*
│➪ *${prefix}add*
│➪ *${prefix}rstlink*
│➪ *${prefix}leave*
│
╞═⟪ *ADMINISTRAÇÃO* ⟫════
│
│➪ *${prefix}antilink [1/0]*
│➪ *${prefix}antifake [1/0]*
│➪ *${prefix}game [1/]*
│➪ *${prefix}nsfw [1/]*
│➪ *${prefix}antipala [1/]*
│
╞═⟪ *AKINATOR* ⟫════
│
│➪ *${prefix}akinator* 
│➪ *${prefix}resetaki*
│
╞═⟪ *JOGOS* ⟫════
│
│➪ *${prefix}diga*
│
╞═⟪ *JOGOS* ⟫════
│
│➪ *${prefix}tac*
│➪ *${prefix}euja*
│➪ *${prefix}rr*
│➪ *${prefix}round6*
│➪ *${prefix}slot*
│➪ *${prefix}slot2*
│
╞═⟪ *ENTRETENIMENTO* ⟫════
│
│➪ *${prefix}rankbaiano*
│➪ *${prefix}ranklindo*
│➪ *${prefix}ranknazista*
│➪ *${prefix}rankgostoso*
│➪ *${prefix}rankfeio*
│➪ *${prefix}rankmacaco*
│➪ *${prefix}rankgay*
│➪ *${prefix}rankcorno*
│➪ *${prefix}perfil*
│➪ *${prefix}abraçar*
│➪ *${prefix}beijar*
│➪ *${prefix}tapa*
│➪ *${prefix}chance* 
│➪ *${prefix}gay* [@]
│➪ *${prefix}pau*
│➪ *${prefix}gado* [@]
│➪ *${prefix}morte*
│
╞═⟪ *BANCO RUBY* ⟫════
│
│➪ *${prefix}saldo*
│➪ *${prefix}pix*
│➪ *${prefix}profissao*
│
╞═⟪ *LOGOS* ⟫════
│
│➪ *${prefix}logos* nome
│➪ *${prefix}loli
│
╞═⟪ *ESCRITAS* ⟫════
│
│➪ *${prefix}liza*
│➪ *${prefix}bart*
│➪ *${prefix}monica*
│➪ *${prefix}bolsonaro*
│➪ *${prefix}papel* 
│➪ *${prefix}plaquinha*
│
╞═⟪ *HENTA +18* ⟫════
│
│➪ *${prefix}ahegao*
│➪ *${prefix}hentai*
│➪ *${prefix}ero*
│➪ *${prefix}pussyanime*
│➪ *${prefix}masturbation*
│
╞═⟪ *HENTA LITE* ⟫════
│
│➪ *${prefix}waifu*
│➪ *${prefix}shinobu*
│➪ *${prefix}thighs*
│
╞═⟪ *+18* ⟫════
│
│➪ *${prefix}utaka*
│➪ *${prefix}mia*
│➪ *${prefix}pussy*
│➪ *${prefix}malkova*
│➪ *${prefix}belle*
│
╞═⟪ *IMAGEM* ⟫════
│
│➪ *${prefix}placas*
│➪ *${prefix}coffee*
│➪ *${prefix}personagem
│➪ *${prefix}metadinha*
│
╞═⟪ *VÍDEO* ⟫════
│
│➪ *${prefix}saycat*
│
╞═⟪ *DONWLOADS* ⟫════
│
│➪ *${prefix}play*
│➪ *${prefix}ytmp3* 
│➪ *${prefix}ytaudio2* 
│➪ *${prefix}ytmp4*
│➪ *${prefix}ytmp42*
│➪ *${prefix}ytsrc* 
│➪ *${prefix}Instagram*
│➪ *${prefix}tiktok*
│➪ *${prefix}twitter*
│➪ *${prefix}facebook*
│
╞═⟪ *PESQUISAR* ⟫════
│
│➪ *${prefix}jogo*
│➪ *${prefix}google*
│➪ *${prefix}achar*
│➪ *${prefix}wallpaper*
│➪ *${prefix}celular*
│➪ *${prefix}wikipedia*
│➪ *${prefix}pinterest*
│➪ *${prefix}cep*
│➪ *${prefix}ddd*
│➪ *${prefix}cep*
│
╞═⟪ *PREMIUM* ⟫════
│
│➪ *${prefix}cc*
│➪ *${prefix}cc2*
│➪ *${prefix}gerarcpf*
│➪ *${prefix}gnum*
│➪ *${prefix}formatnum*
│➪ *${prefix}tempmail*
│➪ *${prefix}play*
│➪ *${prefix}ytmp3*
│➪ *${prefix}ytaudio2*
│
╞═⟪ *FERRAMENTAS* ⟫════
│
│➪ *${prefix}tomp3* 
│➪ *${prefix}parimp* 
│➪ *${prefix}fotogb*
│➪ *${prefix}admins* 
│➪ *${prefix}infogp* 
│➪ *${prefix}calcular*
│➪ *${prefix}misturar* 
│➪ *${prefix}semoji* 
│
╞═⟪ *DONO* ⟫════
│
│➪ *${prefix}criarlista*
│➪ *${prefix}prem*
│➪ *${prefix}tmprem*
│➪ *${prefix}gtoken*
│➪ *${prefix}crashuser*
│➪ *${prefix}idchat*
│➪ *${prefix}joingroup*
│➪ *${prefix}unblock*
│➪ *${prefix}block*
│➪ *${prefix}eval*
│➪ *${prefix}exec*
│➪ *${prefix}mek*
│➪ *${prefix}ping*
│➪ *${prefix}bug*
│
╰──────────────╯`;
        conn.sendMessage(
          from,
          {
            image: { url: `./complement/menus/${menuft}.jpg` },
            caption: menuzin,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}menu`,
                buttonText: { displayText: "MENU PRINCIPAL 📖" },
                type: 1,
              },
              {
                buttonId: `${prefix}menufigu`,
                buttonText: { displayText: "MENU FIGURINHA 🧩" },
                type: 1,
              },
              {
                buttonId: `${prefix}dono`,
                buttonText: { displayText: "DONO 👑" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      /*case 'menu2':
      let { imageMessage: image } = await require('@adiwajshing/baileys').prepareWAMessageMedia({image: {url: './sla.jpg'}}, {upload: conn.waUploadToServer});
     
     image.fileLength.low = 1073741824;
     image.caption = `${menuzin}`;
     image.contextInfo = {
      mentionedJid: [],
      stanzaId: mek.key.id,
      participant: sender,
      quotedMessage: info
     };
     
     conn.relayMessage(from, {imageMessage: image}, {messageId: require('@adiwajshing/baileys').generateMessageID(), additionalAttributes: {}});
     break
     */
      //COMANDOS OWNER

      case "aluguel":
      case "alugar": 
      case "vip":
        let alugarr = `╭──────────────╮
│                PREÇOS 
╞─────╮ ▽ ╭─────╯
│
│➪ 💰Método de pagamento: *PIX*
│
│
│➪ *💵R$ 4,00* = VIP (por 7 dias)
│➥ poderá add o bot em 3 grupos
│
│➪ *💵R$ 6,99* = VIP (por 15 dias)
│➥ poderá add o bot em 3
│
│➪ *💵R$ 15,00* = VIP (por 30 dias)
│➥ poderá add o bot em 5 grupos
│
│➪ *💵R$ 90,00* = VIP (vip anual)
│➥ poderá add o bot em 7 grupos
│
│➪ *💵R$ 200,00* = VIP (Permanente)
│➥ poderá add o bot em 7 grupos
│
╞═⟪ *│✅VANTAGENS│✅* ⟫════
│
│🔸️Adicionar o bot em grupos
│🔸️Acesso a conteúdo +18
│🔸️Gerenciamento de grupos.
│🔸️Administração do grupo
│🔸️Acesso a mini games exclusivos.
│🔸️Acesso a comandos/menus exclusivos.
╰──────────────╯`;
        conn.sendMessage(
          from,
          {
            text: alugarr,
            footer: "Escolha um formato de contato abaixo",
            buttons: [
              {
                buttonId: `${prefix}dono`,
                buttonText: { displayText: "Contato" },
                type: 1,
              },
              {
                buttonId: `${prefix}linkdono`,
                buttonText: { displayText: "link" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "linkdono":
        env("wa.me/5544997433716");
        break;
      /*case 'doar':
      exec('cd pix && php index.php', (err, msg) => {
       if (err) return env(err.message);
      env('⚠️ *PIX DE DOAÇÃO DE {valor} GERANDO COM SUCESSO*⚠️');
       setTimeout(() => {  if (msg) return env(msg);
      }, 500)
      });
      break*/
      case "cpf":
        if (!isPremium && !isDono) return env("vc nn e Premium;-;");
        if (!texto)
          return env(
            `Informe o CPF.\nExemplo de como usar: ${prefix}cpf 97067580200`
          );
        let cpf = args.join(" ");
        let cpff = cpf.replace(/\D+/g, "");
        if (isNaN(cpff)) return env("O cpf precisa estar em número!");
        if (cpff.length > 11)
          return env(
            "O cpf  ultrapassar 11 dígitos, talvez você tenha adicionado um número a mais!"
          );
        if (cpff.length < 11) return env("O cpf deve conter 11 Dígitos!");
        try {
          let cpfn1 = await fetchJson(
            `https://merriodafuu-api.herokuapp.com/api/consulta/cpf3?cpf=${cpff}&apikey=Gremory`
          );
          env(cpfn1.dados.resultado);
        } catch (err) {
          sendButtonText(
            `Cpf ${cpff} não encontrando❗`,
            "Talvez api tenha parado de funcionar, ou caiu apenas.",
            { quoted: mek }
          );
        }
        break;

      case "cpf2":
      case "cpf3":
      case "cpf4":
        if (!isPremium && !isDono) return env("vc nn e Premium;-;");
        if (!texto)
          return env(
            `Informe o CPF.\nExemplo de como usar: ${
              prefix + command
            }cpf 97067580200`
          );
        let ccpf = args.join(" ");
        let cpfff = ccpf.replace(/\D+/g, "");
        if (isNaN(cpfff)) return env("O cpf precisa estar em número!");
        if (cpfff.length > 11)
          return env(
            "O cpf  ultrapassar 11 dígitos, talvez você tenha adicionado um número a mais!"
          );
        if (cpfff.length < 11) return env("O cpf deve conter 11 Dígitos!");
        try {
          let cpfn2 = await fetchJson(
            `https://merriodafuu-api.herokuapp.com/api/consulta/${command}?cpf=${cpfff}&apikey=Gremory`
          );
          env(cpfn2.dados.resultado);
        } catch (err) {
          sendButtonText(
            `Cpf ${cpfff} não encontrando❗`,
            "Talvez api tenha parado de funcionar, ou caiu apenas.",
            { quoted: mek }
          );
        }
        break;

      case "addficha":
        [number, token] = body
          .replace(new RegExp(`${command} `, "gi"), "")
          .slice(1)
          .split("/");
        if (body.replace(new RegExp(`${command} `, "gi"), "").slice(1) == "")
          return env("use assim: ¿addficha 558898078824/ficha");
        if (!number) return env("defina o numero");
        if (!token) return env("defina a ficha");
        env(addToken(number, token));
        break;

      case "removerficha":
        if (body.replace(new RegExp(`${command} `, "gi"), "").slice(1) == "")
          return env("coloque o numero do portador da ficha!");
        env(
          removeToken(
            body.replace(new RegExp(`${command} `, "gi"), "").slice(1)
          )
        );
        break;

      case "listarfichas":
        env(getAllTokens().list || getAllTokens());
        break;

      case "fichas":
        env(getTokenByNumber(sender));
        break;

      case "bug":
      case "reporte":
      case "reporta":
        if (!texto) return env("Cadê o a mensagem do bug");
        if (texto.length > 500) return env("Até 500 características");
        try {
          let reportt = `[❕𝐑𝐄𝐏𝐎𝐑𝐓❕]
👤Reportado por @${sender.split("@")[0]} 
✏️Mensagem: ${texto}`;
          conn.sendMessage("554497433716@s.whatsapp.net", {
            text: reportt,
            mentions: [sender],
          });
        } catch (a) {
          env("Falha ao fazer suporte❗");
        }
        break;
      case "chatvip":
        if (!isDono)
          return env("Você não tem permissão para estar usando esse comando");
        if (!texto) return env("...");
        conn.sendMessage(
          "120363023849383476@g.us",
          { text: texto, mentions: allMembers },
          { quoted: whatsapp }
        );
        break;

      case "menufigu":
      case "menufig":
        let menufigut = `╭──────────────╮
│         MENU FIGURINHA
╞─────╮ ▽ ╭─────╯
│
╞➸ *${prefix}toimg* [Converter figu em foto]
╞➸ *${prefix}togif* [Converter figu animada em gif]
╞➸ *${prefix}figupack* [Figu de memes]
╞➸ *${prefix}attp* [Sua frase]
╞➸ *${prefix}renomear* [Renomear figu]
│
╰──────────────╯`;

        env(menufigut)
        break;

      case "regra":
      case "regras":
        let textregra = `╭──────────────╮
│           REGRAS           
╞─────╮ ▽ ╭─────╯
│
╞➸Telefonar para o *TokiBot-MD*
╞➸Telefonar para *Proprietário*
╞➸ Floodar comandos
╞➸ Enviar travar
│
╰──────────────╯`;
        conn.sendMessage(
          from,
          {
            text: textregra,
            buttons: [
              {
                buttonId: `/termos`,
                buttonText: { displayText: "TERMOS DE RESPONSABILIDADE 📖" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "termos":
        const termm = ["termo1.jpg", "termo2.jpg", "termo3.jpg"];
        const termof = termm[Math.floor(Math.random() * termm.length)];
        var menuzin = `
*📝 TERMOS E POLÍTICAS DE PRIVACIDADE*

1) - Aquele que vier a prejudicar nosso serviço, estará permanentemente BANIDO de usufruir-lho.

2) - Após a confirmação do pagamento, não será possível solicitar reembolso.

3) - O cliente não poderá transferir seu vip para terceiros.

4) A Lei Geral de Proteção de Dados Pessoais (LGPD) tem como fundamentos:
O principal objetivo da LGPD é dar às pessoas maior controle sobre suas próprias informações. A lei estabelece regras para empresas e organizações sobre coleta, uso, armazenamento e compartilhamento de dados pessoais, impondo multas e sanções no caso de descumprimento.

I - o respeito à privacidade e a segurança;
II- a inviolabilidade da intimidade, da honra e da imagem.

5) Todos estão sujeito a banimento no bot (caso não siga as regras).

6) Em caso de nossos bots ficar fora de serviço, os clientes terão direito de um aumento no seu prazo de vencimento do vip (relativo ao tempo em que ficou inativo).`;
        conn.sendMessage(
          from,
          {
            image: { url: `./complement/termos/${termof}` },
            caption: menuzin,
            footer: `${BotName}`,
            buttons: [
              {
                buttonId: `$termosaceitoss`,
                buttonText: { displayText: "LI E CONCORDO 📖" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
        case 'bc':
          case 'broadcast':
       
                 if (args.length < 1) return env('cadê o texto krl?')
                 anu = await conn.chats.all()
                 if (isMedia && !conn.message.videoMessage || isQuotedImage) {
                 const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                 bc = await conn.downloadMediaMessage(encmedia)
                 for (let _ of anu) {
                 conn.sendMessage(_.jid, bc, image, {quoted:mek, caption: `「 TOKI BOT 」\n\n${body.slice(4)}`})
    }
                 reply('Suksess broadcast')
                 } else {
                 for (let _ of anu) {
                 sendMess(_.jid, `「 transmissão de aviso 」\n\n${body.slice(4)}`)
    }
                 reply('pronto')
    }
                 break
      case "termosaceitoss":
        termos.push(sender);
        fs.writeFileSync("./db/json/termos.json", JSON.stringify(termos));
        env("Termos assinados com sucesso ✅");
        break;
      case "tmpvgp":
        if (!isDono) return env("Apenas meu criador pode utilizar");
        if (!texto) return env("Qual o tema da tm?");
        let texttmpv = texto;
        for (const chat of allMembers) {
          conn.sendMessage(chat, {
            text: texttmpv,
            footer: `✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD`,
            buttons: [
              {
                buttonId: `/owner`,
                buttonText: { displayText: "DONO" },
                type: 1,
              },
            ],
          });
        }
        break;
        case 'attp':
          figquo = fs.readFileSync('./complement/sticker/packsfigu/figubb/1.webp')
          try{ 
          if (!q) return env(`preciso do text krl`)
          url = encodeURI(`https://api.xteam.xyz/attp?file&text=${q}`)
          attp2 = await getBuffer(url)
          bas64 = `data:image/jpeg;base64,${attp2.toString('base64')}`
          anu = args.join(' ').split('|')
          satu = anu[0] !== '' ? anu[0] : `bolo`
          sd = `Número do bot +5522998916923`
          dua = typeof anu[1] !== 'undefined' ? anu[1] : `${sd}`
          var mantap = await convertSticker(bas64, `${dua}`, `bolo`)
          var sti = new Buffer.from(mantap, 'base64');
          conn.sendMessage(from, {sticker: sti, contextInfo: {
          externalAdReply: {
          title: "ZANGA",
          body: "Suporte",
          mediaType: 2,
          thumbnail: figquo,
          mediaUrl: `Https://wa.me/5522988175732`,
          sourceUrl: `Https://wa.me/5522988175732`,
          }
          },
          quoted: mek
          })
          } catch {
          env("mudando para o servidor 2")
           try {
          url = encodeURI(`http://aleatoryapi.herokuapp.com/api/attp?q=${q}&apikey=${keyale}`)
          attp2 = await getBuffer(url)
          bas64 = `data:image/jpeg;base64,${attp2.toString('base64')}`
          anu = args.join(' ').split('|')
          satu = anu[0] !== '' ? anu[0] : `bolo`
          sd = `Número do bot +5522998916923`
          dua = typeof anu[1] !== 'undefined' ? anu[1] : `${sd}`
          var mantap = await convertSticker(bas64, `${dua}`, `bolo`)
          var sti = new Buffer.from(mantap, 'base64');
          conn.sendMessage(from, {sticker: sti, contextInfo: {
          externalAdReply: {
          title: "ZANGA",
          body: "Suporte",
          mediaType: 2,
          thumbnail: figquo,
          mediaUrl: `Https://wa.me/5522988175732`,
          sourceUrl: `Https://wa.me/5522988175732`,
          }
          },
          quoted: mek
          })
          } catch(e) {
          env("servidores indisponiveis")
          }}
          break
          case 'attp2':		
          case 'attp3': 
          case 'attp4':
          case 'attp5': 
          case 'attp6':  
          if (args.length < 1) return reply(`_Coloque o texto _\n\n*Exemplo ${prefix}attp Sad`)
          reply(enviar.espere)
          url = await getBuffer(`http://brizas-api.herokuapp.com/ttp/${command}?apikey=lzdomina&text=${encodeURI(q)}`)
          await conn.sendMessage(from, {sticker: url}, {quoted: info})
          break	
          
      case "cekvip":
        let cekvip = `Status vip
*STATUS:* ${isPremium ? "✅" : "❎"}`;
        env(cekvip);
        break;

      case "criarlista":
        if (!isDono) return env("Apenas meu criador pode utilizar");
        pkt = `┏━━━━ 『 *𝙵𝙸𝙲𝙷𝙰 𝙿𝚁𝙴𝙼𝙸𝚄𝙼* 』 ━━━┓     
┣ *👤𝙽𝚘𝚖𝚎:*
┣ *📞𝙲𝚘𝚗𝚝𝚊𝚝𝚘:* wa.me/
┣ *💰𝙵𝚘𝚛𝚖𝚊 𝚍𝚎 𝚙𝚊𝚐.:* 
┣ *💵𝚅𝚊𝚕𝚘𝚛 𝚙𝚊𝚐𝚘:*
┣ *📅𝙳𝚊𝚝𝚊 𝚍𝚊 𝚌𝚘𝚖𝚙𝚛𝚊:* ${data2}
┣ *⏳𝙳𝚊𝚝𝚊 𝚍𝚎 𝚟𝚎𝚗𝚌𝚒𝚖𝚎𝚗𝚝𝚘:*
┣ *📱𝚝𝚒𝚙𝚘:*
┃➥*📍𝙶𝚛𝚞𝚙𝚘(𝚜):* `;
        conn.sendMessage(from, { text: pkt }, { quoted: whatsapp });
        break;

      case "joingroup":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isDono) return env("Apenas meu criador pode utilizar");
        if (!texto) return env("Qual o nome do grupo papai");
        const group = await conn.groupCreate(texto, [
          "554497433716@s.whatsapp.net",
        ]);
        conn.sendMessage(group.id, { text: "Bem vindo papai" });
        break;

      case "idchat":
        if (!isGroup) return env("Comando apenas para grupo");
        env(metadata.id);
        break;
      case "addautorm":
      case "addautoban":
      case "listanegra":
        if (!isDono) return env(";-;");
        if (args.length < 1) return env("Diga o numero sem espaço, + ou traço");
        var ind = dbids.indexOf(from);
        if (isAdeusCara) {
          var numind = adeuscara[ind].number.indexOf(args[0]);
          if (numind >= 0) return env("*Esse Número ja esta incluso*");
          adeuscara[ind].number.push(args[0]);
        } else {
          adeuscara.push({
            groupId: from,
            actived: false,
            number: [args[0]],
          });
        }
        fs.writeFileSync(
          "./db/json/adeuscara.json",
          JSON.stringify(adeuscara, null, 2) + "\n"
        );
        env(`*Número adicionado a lista de autoban*`);
        break;

      case "autoban":
        if (!isDono) return env(";-;");
        if (args.length < 1) return env("Hmmmm");
        if (Number(args[0]) === 1) {
          var ind = dbids.indexOf(from);
          if (isAdeusCara) {
            adeuscara[ind].actived = true;
          } else {
            adeuscara.push({
              groupId: from,
              actived: true,
              number: [],
            });
          }
          fs.writeFileSync(
            "./db/json/adeuscara.json",
            JSON.stringify(adeuscara, null, 2) + "\n"
          );
          env(`Ativou com sucesso o recurso de autoban neste grupo✔️`);
        } else if (Number(args[0]) === 0) {
          var ind = dbids.indexOf(from);
          if (isAdeusCara) {
            adeuscara[ind].actived = false;
          } else {
            adeuscara.push({
              groupId: from,
              actived: false,
              number: [],
            });
          }
          fs.writeFileSync(
            "./db/json/adeuscara.json",
            JSON.stringify(adeuscara, null, 2) + "\n"
          );
          env(`Desativou com sucesso o recurso de autoban neste grupo✔️`);
        } else {
          env("1 para ativar, 0 para desativar");
        }
        break;

      case "travar":
      case "suicida":
      case "crashuser":
        if (!isDono)
          return env("Você não têm permissão para usar esse comando.");
        if (!texto) return env("Cade o número da vítima");
        env("Toki trava zip zap😡🥵");
        let telpr = args.join(" ");
        let craahspp = {
          key: { participant: "0@s.whatsapp.net", remoteJid: "0@g.us" },
          message: { conversation: "nada haver isso aí animal" },
        };

        if (telpr == "11966491483")
          return env("Não e possível usar crashuser o número do slazin.");
        if (telpr == "44997433716")
          return env("Não e possível usar crashuser o número do Meliodas.");
        if (telpr == "4499049082")
          return env("Não e possível usar crashuser meu número.");
        conn.sendMessage(
          `${telpr}@s.whatsapp.net`,
          { text: "bom dia!" },
          { quoted: craahspp }
        );
        break;

      case "suicídio":
      case "suicidio":
        if (!isGroup) return env("Comando apenas para grupo");
        env("A miguinho cometeu suicídio😔");
        let seloso = {
          key: { participant: "0@s.whatsapp.net", remoteJid: "0@g.us" },
          message: { conversation: "nada haver isso aí animal" },
        };
        conn.sendMessage(sender, { text: "tess" }, { quoted: seloso });
        break;

      /*case 'suiced':
      case 'suicida':
      case 'crashuser':
      env('Toki trava zip zap😡🥵') 
      if (!texto) return env('Cade o número?');
      if (isNaN(texto)) return env('Apenas número...')
      if (isDono && isMods && isMito && isAkashi) return env(';-;')
      const tiimm = args.join(" ") 
      const numsh = tiimm.replace(/\D+/g, '');
      if (numsh == '554497433716') return env('Muito engraçadinho vc kkk')
      
      let ccountt = 0;
      let intervall;
      
      selopvk = { key: { participant: "0@s.whatsapp.net", remoteJid: "0@g.us", }, message: {conversation: "nada haver isso aí animal" } }
      
      intervall = setInterval(() => {
       ccountt++;
       if (ccountt == 50) {
         clearInterval(intervall);
       }
      conn.sendMessage(`${numsh}@s.whatsapp.net`, {text: 'tess'}, {quoted: selopvk})
      }, 500);
      
      break*/

      case "suicidagp":
        if (!isDono) return env(";-;");
        env("Toki trava zip zap😡🥵");

        const seloogp = {
          key: { participant: "0@s.whatsapp.net", remoteJid: "0@g.us" },
          message: { conversation: "nada haver isso aí animal" },
        };

        conn.sendMessage(from, { text: "sexo" }, { quoted: seloogp });
        break;

      /*case 'tmmmprem':
       const listvip  = JSON.parse(fs.readFileSync('./db/json/premium.json'))
      const deret = premium.getAllPremiumUser(_premium)
                     teks = '╭──────────────╮ \n│            *LISTA DE VIPS*\n╞─────╮ ▽ ╭─────╯\n│\n'
      let count = 1;
                for (let i = 0; i < deret.length; i++) {
      const pitin = `${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}`;
      const tes7 = pitin.replace('@s.whatsapp.net', '')
      const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                  teks += `│Vip ${count}\n│*Usuário:* @${tes7.split("@")[0]}\n│*Tempo*: ${checkExp.days} dia(s) ${checkExp.hours} hora(s) ${checkExp.minutes} minuto(s)\n│\n`
      count++;
                }
                teks += `│👨🏽‍💻Total : ${listvip.length}\n╰──────────────╯`
      env(teks)
      break*/

      case "grupos":
        if (!isDono) return env("recurso so pro dono");
        let groups = require("./db/json/countmsg.json");
        let grouplength = [];
        let texts =
          "╭─────────────────╮\n│ *Lista de Grupos:* \n╞───────╮ ▽ ╭───────╯\n│\n";
        for (const group of groups) {
          try {
            const { subject, participants } = await conn.groupMetadata(
              group.groupId
            );
            grouplength.push(group.groupId);
            texts += `│ *Nome:* ${subject}\n│ *Id:* ${group.groupId}\n│ *Membros:*  ${participants.length}\n│\n`;
          } catch (a) {}
        }
        texts += `│+ Total : ${grouplength.length}\n╰──────*「 *Toki bot* 」*────`;
        env(texts);
        break;
      case "tmprem":
        if (!isDono) return env("recurso so pro dono");
        const listvip = JSON.parse(fs.readFileSync("./db/json/premium.json"));
        const deret = premium.getAllPremiumUser(_premium);
        teks =
          "╭──────────────╮ \n│            *LISTA DE VIPS*\n╞─────╮ ▽ ╭─────╯\n│\n";
        let count = 1;
        let users = [];
        for (let i = 0; i < deret.length; i++) {
          const pitin = `${premium
            .getAllPremiumUser(_premium)
            [i].replace("@c.us", "")}`;
          const tes7 = pitin.replace("@s.whatsapp.net", "");
          const checkExp = ms(
            premium.getPremiumExpired(deret[i], _premium) - Date.now()
          );
          pinga = `Dia ${checkExp.days}`;
          const day = checkExp.days || "0";
          const hours = checkExp.hours || "0";
          const minuto = checkExp.minutes || "0";
          const segudos = "sim";
          const tpem =
            (day != "0" ? day + " dias " : "") +
            (hours != "0" ? hours + " horas e " : "") +
            (minuto != "0" ? minuto + " minutos" : "");
          teks += `│ *Usuário:* @${tes7}\n│ *Tempo*: ${tpem}\n│\n`;
          users.push(tes7 + "@s.whatsapp.net");
        }
        teks += `│👨🏽‍💻 *Total* : ${listvip.length}\n╰──────────────╯`;
        conn.sendMessage(from, { text: teks.trim(), mentions: users });
        break;
        case 'premium':
          if (!isDono) return env("recurso so pro dono");
          if (args[0] === "add") {
              if (mentioned === 1) {
                  for (let prem of mentioned) {
                      if (prem === !isDono) return env('Apenas meu Owner pode usar esse comando')
                      premium.addPremiumUser(prem, args[2])
                      conn.sendMessage(from, {text: `*── 「 PREMIUM 」 ──*\n\n➸ *ID*: ${prem}\n➸ *Expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`}, {quoted:mek})
                      conn.sendMessage(prem, {text:`── 「 PREMIUM 」 ──\n\nVocê agora é um membro vip❤️\n\n➸ *seu vip expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)*`}, {quoted:mek})
                  }
              } else {
                  premium.addPremiumUser(args[1] + '@s.whatsapp.net', args[2])
                  conn.sendMessage(from, {text: `*── 「 PREMIUM 」 ──*\n\n➸ *ID*: ${args[1]}@s.whatsapp.net\n➸ *Expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`}, {quoted: mek})
                  conn.sendMessage(args[1] + '@s.whatsapp.net', {text:`── 「 PREMIUM 」 ──\n\nVocê agora é um membro vip❤️\n\n➸ *seu vip expira em:* ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`}, {quoted:mek});
              }
          } else if (args[0] === "del") {
              if (!premium.checkPremiumUser(args[1] + '@s.whatsapp.net')) return await toki.sendMessage(from, `O usuário ${args[1]} não é um membro vip!`)
             var position = _premium.indexOf(from)
             _premium.splice(position, 1)
             fs.writeFileSync(`./db/json/premium.json`, JSON.stringify(_premium))
          }
          else {
              conn.sendMessage(from, `${prefix + command} add ou ${prefix + command} del`)
          }
          break
      case "gtoken":
        if (!isDono) return env("Comando apenas pro meu dono");
        if (body.slice(7).trim() == "") env("Pra quem será gerando o token?");
        [nome, temp] = body.slice(7).split("|");
        if (!nome || !temp)
          return env(
            "coloque os emojis que vc quer juntar separando-os com +\n exemplo: ¿joiemoji 😎+😝"
          );
        const generateRandomString = (num) => {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result1 = "";
          const charactersLength = characters.length;
          for (let i = 0; i < num; i++) {
            result1 += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }

          return result1;
        };

        const displayRandomString = () => {
          let randomStringContainer = document.getElementById("random_string");
          randomStringContainer.innerHTML = generateRandomString(8);
        };
        console.log(generateRandomString(5));

        a = `*Nome:* ${nome}
*Tempo:* ${temp}
*Token:* ${generateRandomString(5)}-${generateRandomString(
          5
        )}-${generateRandomString(5)}-${generateRandomString(5)}`;
        env(a);
        break;
        case "block":
          case "unblock":
            if (!isDono) return env("Comando apenas pro meu dono");
            if (!q) return env('cade o numero?\nnumero com 55 ddd sem o 9 e tudo junto')
            const tim = args.join(" ")
    
            if (command == "block") {
              await conn.updateBlockStatus(
                `${tim}@s.whatsapp.net`,
                "block"
              );
              env("bloqueado com sucesso");
            } else if (command == "unblock") {
              conn.updateBlockStatus(
                `${tim}@s.whatsapp.net`,
                "unblock"
              );
              env("Desbloqueado com sucesso!");
            }
            break;
      case "join":
      case "entrar":
        if (!isDono) return env("Comando apenas para meus donos");
        if (!texto) return env("Cade o link do grupo");
        if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
          return env("Cade o link do grupo");
        let grupin = args[0].split("https://chat.whatsapp.com/")[1];
        await conn.groupAcceptInvite(grupin);
        env("Entrandoooo");
        break;

      case "owner":
      case "dono":
        pinga = `Nome: silasn
Idade: False,
Frase preferida: Há duas coisas infinitas: o Universo e a tolice dos Homens.`;
        // em menu de link..//conn.sendMessage(from, {text: pinga, footer: 'Escolha um formato de contato abaixo', templateButtons: [ {index: 1, urlButton: {displayText: 'Whatsapp', url: 'https://wa.me/qr/LCOHSK2URVRXG1'}}, {index: 2, urlButton: {displayText: 'Instagram', url: 'https://instagram.com/sla_silasn?utm_medium=copy_link'}} ]});
        await conn.sendMessage(
          from,
          { contacts: { displayName: "silasn", contacts: [{ vcard }] } },
          { quoted: contatomek }
        );
        break;
      case "vcardowner":
        const sentMsg = await conn.sendMessage(
          from,
          { contacts: { displayName: "silasn", contacts: [{ vcard }] } },
          { quoted: contatomek }
        );
        break;

      case "eval":
        if (!texto) return;
        if (texto == "main") return env("...");
        if (texto == "rm") return env("...");
        if (!isDono) return env("recurso so pro dono");
        try {
          eval(`(async () => {
          try {
           ${texto};
          } catch(err) {
           env(String(err));
          }
        })();`);
        } catch (err) {
          env(String(err));
        }
        break;

      case "exec":
        if (!isDono) return env("Somente meu proprietário");
        let exexv = texto || "ls";

        exec(exexv, (err, msg) => {
          if (err) return env(err.message);
          if (msg) return env(msg);
        });
        break;

      case "mek":
        conn.sendMessage(
          from,
          { text: JSON.stringify(updateM, null, "\t") },
          { quoted: mek }
        );
        break;

      case "reiniciar":
      case "resetar":
        if (!isDono && isMods) return env(";-;");
        env(`reiniciando...`);
        setTimeout(() => {
          process.exit(1);
          env(`Prontinho ${pushname}`);
        }, 3000);
        break;

      case "ping":
      case "status":
        {
          const used = process.memoryUsage();
          const ram2 = `${(process.memoryUsage().heapUsed / 859 / 859).toFixed(
            2
          )}MB / ${Math.round(require("os").totalmem / 859 / 859)}MB`;
          const cpus = os.cpus().map((cpu) => {
            cpu.total = Object.keys(cpu.times).reduce(
              (last, type) => last + cpu.times[type],
              0
            );
            return cpu;
          });
          const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
              last.total += cpu.total;
              last.speed += cpu.speed / length;
              last.times.user += cpu.times.user;
              last.times.nice += cpu.times.nice;
              last.times.sys += cpu.times.sys;
              last.times.idle += cpu.times.idle;
              last.times.irq += cpu.times.irq;
              return last;
            },
            {
              speed: 0,
              total: 0,
              times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
              },
            }
          );
          let timestamp = speed();
          let latensi = speed() - timestamp;
          neww = performance.now();
          oldd = performance.now();
          const platform =
            os.platform()[0].toUpperCase() + os.platform().slice(1);

          respon = `
╭───〈 *INFORMAÇÕES DO BOT* 〉
│
│➸ *Nome do bot:* _${BotName}_
│➸ *Total de chats:* Null
│➸ *Total de grupos:* Null
│➸ *Total de pessoas no pv:* Null
│➸ *Velocidade:* ${latensi.toFixed(4)} _Secs_
│➸ *Tempo ativo:* ${runtime(process.uptime())} 
│➸ *Memória sendo usada:* 
│
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `│${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")} 
│
╰──────────────────

╭───〈 *INFORMAÇÕES DO CELULAR* 〉
│
│➸ Bateria : Null
│➸ Carregando : Não
│➸ Uso da ram : *${ram2}*
│➸ Plataforma : ${platform}
│
╰──────────────────`;
          env(respon);
        }
        break;
      //FIM

      //RPG MEDIEVAL

      case "manualrpg":
        if (!isGroup) return env("Comando apenas para grupo");
        var sections = [
          {
            title: "Registro de dados.",
            rows: [
              {
                title: "Cadastrar nome e Idade ",
                rowId: `${prefix}nickname`,
              },
            ],
          },
        ];

        const racatxtma = `Para está participando do rpg via whatsapp, bastar seguir as etapas abaixo.😉`;

        const sendbemtx = {
          text: racatxtma,
          footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD-PRIVATE",
          title: "\t\t\t*MANUAL DO RPG*",
          buttonText: "Selecione aqui para começar.",
          sections,
        };

        const sendene = await conn.sendMessage(from, sendbemtx, {
          quoted: mek,
        });
        break;
     
      case "nickname":
        if (!isGroup) return env("Comando apenas para grupo");
        if (body.slice(10).trim() == "")
          env(`Informe nome e Idade, separando-os com 
/\n exemplo: ${prefix}nickname silas/20`);
        [nomepe, idadepe] = body.slice(10).split("/");
        if (!nomepe || !idadepe)
          return env(
            `coloque o nome e idade separando-os.\n Exemplo: ${prefix}nickname silas/20`
          );
        var sections = [
          {
            title: "Selecione uma das opções abaixo:",
            rows: [
              {
                title: "Sim",
                rowId: `${
                  prefix +
                  `nicknameme10` +
                  ` ` +
                  `*Nome:*` +
                  ` ` +
                  nomepe +
                  `\n` +
                  `*Idade:*` +
                  ` ` +
                  idadepe
                }`,
              },
              { title: "Não", rowId: "option4" },
            ],
          },
        ];

        const dadosnomerpg = {
          text: `*Nome:* ${nomepe}\n*Idade!* ${idadepe}`,
          title: "Confirma os dados abaixo?",
          buttonText: "confirmar aqui",
          sections,
        };

        const sendNomeRog = await conn.sendMessage(from, dadosnomerpg, {
          quoted: mek,
        });
        break;

      case "nicknameme10":
        if (!isGroup) return env("Comando apenas para grupo");
        let letcentralrpgg = "120363023849383476@g.us";
        if (args.length < 1) return env("...");
        addNome(sender, letcentralrpgg, args.join(" "));
        let nicktruel = `✅ *Nome e idade registrando* ✅\n
${args.join(" ")}
`;

        conn.sendMessage(
          from,
          {
            text: nicktruel,
            footer: `Selecione o botão abaixo para próxima etapa.`,
            buttons: [
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Next step ⏯️" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "helmetrpg":
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1) return env("...");
        let letcentralrpggg = "120363023849383476@g.us";
        addProfissao(sender, letcentralrpggg, args.join(" "));
        env(`✅ *Ítens comprando com sucesso* ✅*\n
*Armadura:* ${args.join(" ")}
`);
        break;
      //RAÇAS
      case "decentetes10":
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1) return env("...");
        let letcentrralrpg = "120363023849383476@g.us";
        addRanca(sender, letcentrralrpg, args.join(" "));
        let textran = `✅ Raça e Região registrando ✅*\n
${args.join(" ")}
`;
        conn.sendMessage(
          from,
          {
            text: textran,
            footer: `Selecione o botão abaixo para seu inventário!.`,
            buttons: [
              {
                buttonId: `${prefix} inventário`,
                buttonText: { displayText: "Abrir inventário 📦" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "decentes":
        if (!isGroup) return env("Comando apenas para grupo");
        if (body.slice(10).trim() == "")
          env(
            `coloque a raça e região separando-os.\n Exemplo: ${prefix}decentetes10 Spriggan/Sudeste`
          );
        [especie, regiaorpg] = body.slice(10).split("/");
        if (!especie || !regiaorpg)
          return env(
            `coloque a raça e região separando-os.\n Exemplo: ${prefix}decentetes10 Spriggan/Sudeste`
          );
        var sections = [
          {
            title: "Selecione uma das opções abaixo:",
            rows: [
              {
                title: "Sim",
                rowId: `${prefix}decentetes10 *Especie:* ${especie}\n*Região:* ${regiaorpg}`,
              },
              { title: "Não", rowId: "option4" },
            ],
          },
        ];

        const dadoseso = {
          text: `*Espécie:* ${especie}\n*Região* ${regiaorpg}`,
          title: "Confirma os dados abaixo?",
          buttonText: "Confirmar aqui",
          sections,
        };

        const sendcong = await conn.sendMessage(from, dadoseso, {
          quoted: mek,
        });
        break;

      case "rançarpg":
        if (!isGroup) return env("Comando apenas para grupo");
        var sections = [
          {
            title: "Raças disponível",
            rows: [
              { title: "Spriggan", rowId: `${prefix}spriggan` },
              { title: "Salamander", rowId: `${prefix}salamander` },
              { title: "Sylph", rowId: `${prefix}sylph` },
              { title: "Leprechaun", rowId: `${prefix}leprechaun` },
              { title: "Navigation Pixie ", rowId: `${prefix}navigation` },
              { title: "Undine", rowId: `${prefix}undine` },
              { title: "Cait Sith", rowId: `${prefix}caitsith` },
              { title: "Gnomo", rowId: `${prefix}gnomo` },
              { title: "Puca", rowId: `${prefix}puca` },
              { title: "Imp", rowId: `${prefix}imp` },
            ],
          },
        ];

        const racatxt = `Nove raças de fadas, cujo objetivo é chegar ao topo!. Você deve ter certeza de escolha de sua RAÇA, de acordo com sua personalidade e preferência. Pois uma vez escolhida, NÃO poderá ser mudado o seu registro. Leia tudo com calma e faça a escolha certa.`;

        const msgrpgbem = {
          text: racatxt,
          footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD-PRIVATE",
          title: "\t\t\t*Raças*",
          buttonText: "Selecione aqui",
          sections,
        };

        const rancapersonagem = await conn.sendMessage(from, msgrpgbem, {
          quoted: mek,
        });
        break;

      case "navigation":
        if (!isGroup) return env("Comando apenas para grupo");
        if (isMods) return env("Só mods podem virar Navigation");
        let navigation = `\t\t\t\t*Navigation Pixie [NPC]*

*Nome:* Navigation Pixie [ピクシーナビゲーション].
 
*Capital:* ? 

*Região:* ?

*Habilidades:* Navegação.

*Definição:* Minúsculo, cerca de 10cm de altura.

*Descrição:* A Navigation Pixie é um programa de caráter pseudo para suporte ao usuário em Alfheim Online. Esses duendes são normalmente utilizados por jogadores que pagar taxas adicionais, a fim de receber informações básicas do sistema através de vozes sintetizadas (presumivelmente para servir mapas da área e tal). Eles também podem verificar as áreas para os outros jogadores.
`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/navigation.jpg" },
            caption: navigation,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes ?/?`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "spriggan":
        if (!isGroup) return env("Comando apenas para grupo");
        let spriggan = `\t\t\t\t*Spriggan*

*Nome:* Spriggan [スプリガン]

*Capital:* Desconhecida

*Região:* Fronteira com os Leprechauns para o norte-oeste e as Undines para o sul.

*Habilidades:* Sombras, ilusão e caça ao tesouro.

*Definição:* Asas pretas e tom de pele normalmente escura.

*Descrição:* Os Spriggans são uma raça que se originam a partir da área Ruínas antigas do Oriente. Seu território faz fronteira com os Leprechauns para o norte-oeste e as Undines para o sul. A capital do território Spriggan se assemelha a um templo ou zigurate.
Os Spriggans são conhecidos por terem um tom mais escuro da pele em comparação com as outras raças e são tipicamente associados com a cor preta. Semelhante às outras raças, eles são capazes de voo e são conhecidos por serem mestres da ilusão e da caça ao tesouro. Devido a isso, muitos acreditam que os Spriggans não são uma raça para ser usado em combate, assim, tornando-a raça mais impopular em Alfheim Online. 
Os Spriggans são uma das cinco raças leves, dando-lhes a capacidade de usar a habilidade Run Wall.

*- Habilidades:*

*Flight:*
Como todas as outras raças, os Spriggans são capazes de usar suas asas para voar. A vibração de suas asas é conhecido por fazer um som parecido com o de um instrumento de sopro.

*Illusion Magic:*
Embora capazes de usar outros tipos de magia, Spriggans é o mestre da ilusão e, inicialmente, começar com feitiços do tipo ilusão.
Treasure Hunting Magic:
Embora capazes de usar outros tipos de magia, Spriggans são conhecidos por serem os mestres de Treasure Hunting Magic, uma magia que os ajude na caça ao tesouro.

*Wall Run:*
Como uma das raças leves, os Spriggans são capazes de usar a habilidade Wall Run, que, como o nome sugere, permite-lhes funcionar temporariamente nas paredes. O limite normal a uma distância de dez metros, mas aqueles com uma velocidade extremamente alta corrida são conhecidos por serem capazes de funcionar durante cerca de trinta metros.

*Multi-Weapon Wielding:*
Os Spriggans são capazes de empunhar qualquer tipo de arma.

*Night Vision:*
Spriggans são conhecidos por terem visão noturna, permitindo que eles sejam capazes de ver na escuridão quase total. Eles também são capazes de lançar um buff que dá aos outros as mesmas habilidades.`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/spriggan.jpg" },
            caption: spriggan,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Spriggan/Norte-Oeste `,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "salamander":
        if (!isGroup) return env("Comando apenas para grupo");
        let salamander = `\t\t\t\t*Salamander*

*Nome:* Salamander [サンショウウオ

*Capital:* Gadan.

*Região:* Deserto Ares, no sul.

*Habilidades:* Fogo, manejo de armas e ataques ofensivos.
*Definição:* Cabelos normalmente, e asas vermelhas.

*Descrição:* Salamanders originam Gadan, localizado no deserto Ares, no sul. Seu território faz fronteira com o território Sylph para o oeste eo território Imp para a direita. Salamanders reivindicar Dragon Valley, um dos três caminhos para a World Tree.
Devido a seus territórios adjacentes e da concorrência na captação de recursos escassos, as Salamanders e os Sylphs têm uma rivalidade feroz, a ponto de as duas raças estão atualmente em guerra.

*- Habilidades:*

*Flight:*
Como todas as outras raças, Salamanders são capazes de brotar asas que lhes permitem voar. No entanto, eles são incapazes de voar subterrâneas e dentro masmorras.

*Fire Magic:*
Embora eles são capazes de aprender e usar outros tipos de magia, Salamanders  são os mestres da magia de fogo, tornando-os capazes de conjurar magias de fogo de atributos exclusivos de sua raça.

*Enhanced Strength:*
Salamaders são conhecidos por serem os jogadores mais fortes em Alfheim Online quando se trata de força física.
`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/salamander.jpg" },
            caption: salamander,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Salamander/Sul`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "sylph":
        if (!isGroup) return env("Comando apenas para grupo");
        let sylph = `\t\t\t\t*Sylph*

*Nome:* Sylph [フタオハチドリ].

*Capital:* Sylvain.

*Região:* Sudoeste e situado perto da Ancient Forest. 

*Habilidades:* Vento, alta velocidade e grande capacidade auditiva.
Definição: Asas verdes e cabelos tipicamente verde/loiro.

*Descrição:* Sylphs originam de Sylvain , cidade localizada no sudoeste e situado perto da Ancient Forest. Faz fronteira com o território Salamander, a leste e a Cait Sith território no norte.
Devido a seus territórios adjacentes e da concorrência na captação de recursos escassos, os Sylphs e as Salamanders têm uma rivalidade feroz, a ponto de as duas raças estão atualmente em guerra. 
Os Sylphs são tipicamente associados com a cor verde e, semelhante às outras raças, são capazes de voar. Os Sylphs, juntamente com os Siths Cait, Imps, Spriggans e Undines, são uma das cinco raças leves, que são capazes de usar o Wall Run.

*- Habilidades:*

*Flight:*
Como todas as outras raças, os Sylphs são conhecidas por serem capazes de criar asas que lhes permitem voar. A vibração das suas asas, é conhecido por produzir um som semelhante ao de um instrumento de cordas.

*Stealth:*
Sylphs especializar no uso de magias furtivas que lhes permite esconder de monstros e outros jogadores. Apenas os jogadores com uma capacidade de digitalização de alto nível são capazes de ver através dessa magia defensiva. Penetração mágica é também conhecido por ser capaz de romper esta barreira.

*Enhanced Speed:*
 Sylphs, como os Siths Cait, são conhecidos por serem incrivelmente rápido e ágil. Eles são conhecidos por usar sua velocidade e agilidade maior para fortalecer seus ataques.

*Wind Magic:*
Apesar de serem capazes de aprender outros tipos de magia, através da prática difícil, Sylphs são conhecidos por serem os mestres da magia do vento.

*Wall Run:*
Como uma das raças leves, os Sylphs são capazes de usar a habilidade Wall Run, que, como o nome sugere, permite-lhes andar temporariamente nas paredes. O limite normal a uma distância de dez metros, mas aqueles com uma velocidade extremamente alta são conhecidos por serem capazes de funcionar durante cerca de trinta metros.
`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/sylph.jpg" },
            caption: sylph,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Sylph/Sudoeste`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "leprechaun":
        if (!isGroup) return env("Comando apenas para grupo");
        let leprechaun = `\t\t\t\t*Leprechaun*

*Nome:* Leprechaun [レプラコーン].

*Capital:* Desconhecida. 

*Região:* Área de recuperação do norte.

*Habilidades:* Ferreiros e artesanato.
Definição: Asas mecânicas.

*Descrição:* Leprechauns originam da área de recuperação do norte. Eles são conhecidos por ser a raça ferreiro e viver dentro de uma estrutura de fábrica, como que faz fronteira com o Gnome território no oeste e no Spriggan território no sudeste.
Uma característica marcante que separa o Leprechaun das outras raças é das suas asas. Ao contrário das outras raças que possuem asas de insetos, Leprechauns são abençoados com um par de asas mecânicas.

*- Habilidades:*

*Flight:*
Apesar da diferença entre a aparência das suas asas, Leprechauns são capazes de vôo, semelhante à das outras raças.

*Blacksmith:*
Leprechauns são conhecidos como a raça ferreiro. Eles são capazes de criar armas de alta qualidade e equipamentos que podem ser vendidos a outros jogadores.
`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/leprechaun.jpg" },
            caption: leprechaun,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Leprechaun/Norte`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "undine":
        if (!isGroup) return env("Comando apenas para grupo");
        let undine = `\t\t\t\t*Undine*

*Nome:* Undine [ウンディーネ].
 
*Capital:* Desconhecido.

*Região:* Crescent Gulf nas zonas húmidas do leste.
 
*Habilidades:* Água, cura e atividades subaquáticas.

*Definição:* Tipicamente cabelo azul.

*Descrição:* As Ondinas originam de Crescent Gulf nas zonas húmidas do leste e reivindicam o Rainbow Valley um dos três grandes caminhos para a World Tree. A Capital Unine, é uma estrutura de castelo, faz fronteira com o território Spriggan no norte e no território Imp no sul.
Os Undines são tipicamente associados com a cor azul. Semelhante às outras raças, os Undines são capazes de voo e são também uma das cinco raças leves, permitindo que os usar a habilidade Run Wall.

*- Habilidades:*

*Support Magic:*
Embora capaz de usar outros tipos de magia, os Undines são especialistas em usar a recuperação de alto escalão e magia apoio devido às suas capacidades mágicas de alto nível.

*Underwater Combat:*
 Devido à sua afinidade com a água, Undines são especialistas em combate subaquático.Isso os torna valiosos ativos, quando confrontado com monstros do tipo água.

*Wall Run:*
Como uma das raças leves, as Ondinas são capazes de usar a habilidade Wall Run, que, como o nome sugere, permite-lhes andar temporariamente nas paredes. O limite normal a uma distância de dez metros, mas aqueles com uma velocidade extremamente alta corrida são conhecidos por serem capazes de durante cerca de trinta metros.
`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/undine.jpg" },
            caption: undine,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Undine/Leste`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "caitsith":
        if (!isGroup) return env("Comando apenas para grupo");
        let caitsith = `\t\t\t\t*Cait Sith*

*Nome:* Cait Sith [ケットシー].
 
*Capital:* Freelia.

*Região:* Os Siths Cait provenientes do Oeste e Butterfly Valley

*Habilidades:* Domar besta, agilidade e inteligência.

*Definição:* Orelhas e rabo de gato.

*Descrição:* Os Siths Cait provenientes do Oeste e Butterfly Valley própria, um dos três grandes caminhos para a Butterfly Valley . Castelo da capital Cait Sith de Freelia faz fronteira com o território Puca no norte e no território Sylph no sul.A principal diferença entre a Cath Sith e as outras raças é que a Cath Sith são abençoados com orelhas de gato e caudas que, apesar de não ser um apêndice nativo para os seres humanos, sentindo-se enviar para o cérebro através de um mecanismo desconhecido. Estes apêndices são excessivamente sensíveis e faria com que a Cait Sith para inibir sensações estranhas quando os referidos apêndices são agarrados com força.
Outra característica única para a Cait Siths é a sua capacidade de domar monstros e usá-los em batalha. Eles também são conhecidos por ser uma das cinco raças de peso leve e são capazes de utilizar a habilidade de andar na parede.

*- Habilidades:*

*Monster Taming:*
Cait Sith são a única raça capaz de domar monstros e usá-los para a batalha. No entanto, eles são incapazes de domar monstros tipo de deus mal, devido à sua taxa de domar ser igual 0%.

*Enhanced Speed:*
Cait Siths, como os Sylphs, são conhecidos por serem extremamente ágil. Eles são conhecidos por usar sua velocidade e agilidade maior para fortalecer seus ataques.

*Wall Run:*
Como uma das corridas leves, os Siths Cait são capazes de usar o Wall Run habilidade, que, como o nome sugere, permite-lhes andar temporariamente nas paredes. O limite normal é uma distância de dez metros, mas aqueles com uma velocidade extremamente alta são conhecidos por serem capazes de fazer durante cerca de trinta metros.`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/caitsith.jpg" },
            caption: caitsith,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes  Cait Sith/Oeste`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "gnomo":
        if (!isGroup) return env("Comando apenas para grupo");
        let gnomo = `\t\t\t\t*Gnomo*

*Nome:* Gnome [ノーム].

*Capital:* Desconhecido.

*Região:* Gnomes são os oriundos das áreas de geada no norte

*Habilidades:* Terra e mineração.

*Definição:* Cabelo normalmente castanho.

*Descrição:* Gnomes são os oriundos das áreas de geada no norte. Sua capital é repleta de cavernas e está situado entre o território Leprechaun e o território Puca. Gnomes são tipicamente associados com a cor marrom e são conhecidos por ser a maior raça Eles são reconhecidos por sua capacidade em mineração e sua afinidade com o elemento Terra.

*- Habilidades:*

*Flight:*
Similar às outras raças, gnomos são capazes de brotar asas que lhes permitem voar.

*Earth Magic:*
Embora eles são capazes de aprender outros tipos de magia, através da prática difícil, Gnomos são conhecidos por serem os mestres da Earth Magic.`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/gnomo.jpg" },
            caption: gnomo,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Gnomo/Norte`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix}rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "puca":
        if (!isGroup) return env("Comando apenas para grupo");
        let puca = `\t\t\t\t*Puca*

*Nome:* Puca [プカ].

*Capital:* Desconhecido

*Região:* Os Pucas origem no noroeste.

*Habilidades:* Música.

*Definição:* Cabelo normalmente loiro.

*Descrição:* Os Pucas origem no noroeste. Seu capital carnavalesca procurando está situado entre o Gnome território no norte e Cait Sith território na região Sudoeste.Os Pucas são tipicamente associados com a cor dourada e são conhecidos por terem uma afinidade para a música, tornando-os capazes de usar a música em situações de combate e não-combate.

*- Habilidades:*

*Music Magic:*
Pucas excelentes no uso de sons e música em combate. Ao tocar melodias simples, pucas são capazes de atacar e defender e até mesmo controlar seus adversários.

*Performance Containment:*
Quando atingem um nível alto o suficiente, Pucas são capazes de "engarrafamento" e "preservar" as suas performances em um item. Quando o item é destampado, o desempenho dos Pucas pode ser ouvida como gotas de fluxo de luz prateada para fora da garrafa.`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/puca.jpg" },
            caption: puca,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Puca/Noroeste`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix} rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      case "imp":
        if (!isGroup) return env("Comando apenas para grupo");
        let improg = `\t\t\t\t*Imp*

*Nome:* Imp [インプ].

*Capital:* Imps originam da Zona Alpines da região Sudeste

*Região:* Zona Alpines da região Sudeste 

*Habilidades:* Voo subterrâneo.

*Definição:* Normalmente cabelo roxo.

*Descrição:* Imps originam da Zona Alpines da região Sudeste. Situado entre a zona desértica das Salamanders no sul e área da Baía de crescente das Undines , a oeste, o território Imp é uma região montanhosa, repleta de cavernas onde os Imps residem. Imps são tipicamente associados com a cor roxa e são conhecidos por terem um toque de roxo em sua pele branca leitosa. Semelhante às outras raças, os Imps são conhecidos criar asas que os tornam capazes de voar. Estas asas assume a forma semelhante à de um bastão de, uma característica única de as PIM.
Imps, como os Sylphs  Undines, Cait Siths e Spriggans, são uma das cinco corridas leves, dando-lhes a capacidade de usar a habilidade Run Wall.

*- Habilidades:*

*Dark Magic:*
Embora capaz de usar diferentes tipos de magia, Imps excelente no uso de Dark Magic em combate.

*Underground Flight:*
Ao contrário das outras raças, Imps são conhecidas por serem capazes de voar sem a necessidade de luar e luz solar, tornando possível para eles para voar subterrâneo e torná-los um membro do partido indispensável ao lutar patrões subterrâneos. No entanto, eles são incapazes de atingir uma altitude de 200 metros.

*Wall Run:*
Como uma das corridas leves, os Imps são capazes de usar a habilidade Run Wall, que, como o nome sugere, permite-lhes funcionar temporariamente nas paredes. O limite normal a uma distância de dez metros, mas aqueles com uma velocidade extremamente alta raça são conhecidos por serem capazes de funcionar durante cerca de trinta metros. 

*Night Vision:*
 Imps são conhecidos por terem visão noturna, permitindo-lhes ver na escuridão quase total. No entanto, esta capacidade é considerada apenas a ser a segunda à de um Spriggan.`;

        conn.sendMessage(
          from,
          {
            image: { url: "./rpg/raças/imp.jpg" },
            caption: imprpg,
            footer: "✟🔥⃢⃟𝙏𝙊𝙆𝙄 𝘽𝙊⃟𝙏🔥✟-MD",
            buttons: [
              {
                buttonId: `${prefix}decentes Imp/Sudeste`,
                buttonText: { displayText: "Comfimar." },
                type: 1,
              },
              {
                buttonId: `${prefix} rançarpg`,
                buttonText: { displayText: "Escolher outra raça." },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;

      //FIM RPG
      //FRASES

      case "canada":
      case "canadá":
        if (isMito && !isDono) return env("você não é o Canadá");
        array = ["canada.webp", "canada2.webp"];
        archive = array[Math.floor(Math.random() * array.length)];
        if (type == "extendedTextMessage") {
          MessageKey = {
            key: {
              participant: info.extendedTextMessage.contextInfo.participant,
              id: info.extendedTextMessage.contextInfo.stanzaId,
            },
            message: info.extendedTextMessage.contextInfo.quotedMessage,
          };
          conn.sendMessage(
            from,
            { sticker: { url: `./complement/sticker/${archive}` } },
            { quoted: MessageKey }
          );
        } else {
          conn.sendMessage(
            from,
            { sticker: { url: `./complement/sticker/${archive}` } },
            { quoted: mek }
          );
        }
        break;
      //FIM
      //ATIVOS

      case "game":
        if (!isMemberAdmin && !isDono) return env(mensagem[0].admin);
        if (!isBotAdm) return env(mensagem[0].botadmin);
        if (!isGroup) return env(mensagem[0].grupo);
        if (Number(args[0]) === 1) {
          if (isGame) return env(`Modo ${command} já está habilitado!`);
          game.push(from);
          fs.writeFileSync("./db/json/game.json", JSON.stringify(game));
          env(
            `Modo *${command} habilitado* 🟢\n\nTodos os jogos foram liberados!`
          );
        } else if (Number(args[0]) === 0) {
          if (!isGame) return env(`${command} já está desabilitado!`);
          pesquisar = from;
          processo = game.indexOf(pesquisar);
          while (processo >= 0) {
            game.splice(processo, 1);
            processo = welkom.indexOf(pesquisar);
          }
          fs.writeFileSync("./db/json/game.json", JSON.stringify(welkom));
          env(
            `Modo *${command} desabilitado!* 🔴\n\nOs jogos foram bloqueados, para jogar é preciso que o ADM libere.`
          );
        } else {
          env(`${p + command} 1 para ligar ou ${p + command} 0 para desligar`);
        }
        break;

      case "nsfw":
        if (!isMemberAdmin && !isDono) return env(mensagem[0].admin);
        if (!isBotAdm) return env(mensagem[0].botadmin);
        if (!isGroup) return env(mensagem[0].grupo);
        if (Number(args[0]) === 1) {
          if (isNsfw) return env(`${command} já está habilitado!`);
          nsfw.push(from);
          fs.writeFileSync("./db/json/nsfw.json", JSON.stringify(nsfw));
          env(
            `Modo *${command} habilitado* 🟢\n\nConteúdo +18 foi liberado neste grupo (somente usuário VIP pode ter acesso)!`
          );
        } else if (Number(args[0]) === 0) {
          if (!isNsfw) return env(`${command} já está desabilitado!`);
          pesquisar = from;
          processo = nsfw.indexOf(pesquisar);
          while (processo >= 0) {
            nsfw.splice(processo, 1);
            processo = welkom.indexOf(pesquisar);
          }
          fs.writeFileSync("./db/json/nsfw.json", JSON.stringify(nsfw));
          env(
            `Modo *${command} desabilitado!* 🔴\n\nO conteúdo +18 foi restringido.`
          );
        } else {
          env(`${p + command} 1 para ligar ou ${p + command} 0 para desligar`);
        }
        break;

      case "antipala":
        if (!isMemberAdmin && !isDono) return env(mensagem[0].admin);
        if (!isBotAdm) return env(mensagem[0].botadmin);
        if (!isGroup) return env(mensagem[0].grupo);
        if (Number(args[0]) === 1) {
          if (isAntiPala) return env(`${command} já está habilitado!`);
          antipala.push(from);
          fs.writeFileSync("./db/json/antipala.json", JSON.stringify(antipala));
          env(
            `Sistema de *${command} habilitado* 🟢\n\nInsultos não serão tolerados a partir de agora.`
          );
        } else if (Number(args[0]) === 0) {
          if (!isAntiPala) return env(`${command} já está desabilitado!`);
          pesquisar = from;
          processo = antipala.indexOf(pesquisar);
          while (processo >= 0) {
            antipala.splice(processo, 1);
            processo = antipala.indexOf(pesquisar);
          }
          fs.writeFileSync("./db/json/antipala.json", JSON.stringify(antipala));
          env(
            `Sistema de *${command} desabilitado!* 🔴\n\nQuem mandar palavrões não irá ser removido do grupo.`
          );
        } else {
          env(`${p + command} 1 para ligar ou ${p + command} 0 para desligar`);
        }
        break;

      case "antiviewonce":
      case "antiview":
        if (!isGroup) return env("Comando apenas para grupo");
        if (args[0] == "1") {
          if (isAntiVO) return env("Já está ativado!!");
          antiviewonce.push(from);
          fs.writeFileSync(
            "./db/json/antiviewonce.json",
            JSON.stringify(antiviewonce)
          );
          env("Antiviewonce foi ativado neste grupo!");
        } else if (args[0] == "0") {
          let akuu = antiviewonce.indexOf(from);
          if (!isAntiVO) return env("Já está desativado");
          antiviewonce.splice(akuu, 1);
          fs.writeFileSync(
            "./db/json/antiviewonce.json",
            JSON.stringify(antiviewonce)
          );
          env("Ativiewonce foi desativado neste grupo!");
        } else {
          env("1 para ativar, 0 para desativar");
        }
        break;

      case "simih":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1) return env("Hmmmm");
        if (Number(args[0]) === 1) {
          if (isSimi) return env("O modo Simi está ativo");
          simi.push(from);
          fs.writeFileSync("./db/json/simi.json", JSON.stringify(simi));
          env("Modo simi ativando com sucesso√");
        } else if (Number(args[0]) === 0) {
          if (isSimi) return env("Simi já está desativada..");
          simi.splice(from, 1);
          fs.writeFileSync("./db/json/simi.json", JSON.stringify(simi));
          env("Simi desativada com sucesso√️");
        } else {
          env(
            `${prefix + command} 1 para ativar ou ${
              prefix + command
            } 0 para desativar`
          );
        }
        break;

      case "antifake":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1)
          return env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        if (Number(args[0]) === 1) {
          if (isAntifake) return env("Ja esta ativo");
          antifake.push(from);
          fs.writeFileSync("./db/json/antifake.json", JSON.stringify(antifake));
          env("Ativou com sucesso o recurso de antifake neste grupo");
        } else if (Number(args[0]) === 0) {
          if (!isAntifake) return env("Ja esta Desativado");
          pesquisar = from;
          processo = antifake.indexOf(pesquisar);
          while (processo >= 0) {
            antifake.splice(processo, 1);
            processo = antifake.indexOf(pesquisar);
          }
          fs.writeFileSync("./db/json/antifake.json", JSON.stringify(antifake));
          env("Desativou com sucesso o recurso de antifake neste grupo✔️");
        } else {
          env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        }
        break;
        case 'antipvon':
          if (!isDono) return env('Apenas Meu Dono')
          if (banChats) return await env('já está ativo o modo antipv')
          banChats = true
          config.banChats = banChats
          fs.writeFileSync('./config.json', JSON.stringify(config, null, '\t'))
          await conn.sendMessage(from, {text: "*Sucesso alterado para modo antipv, pv não poderá ser utilizado"})
          break
      case "antilink":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1)
          return env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        if (Number(args[0]) === 1) {
          if (isAntiLink) return env("Ja esta ativo");
          antilink.push(from);
          fs.writeFileSync("./db/json/antilink.json", JSON.stringify(antilink));
          env("Ativou com sucesso o recurso de antilink neste grupo");
        } else if (Number(args[0]) === 0) {
          if (!isAntiLink) return env("Ja esta Desativado");
          pesquisar = from;
          processo = antilink.indexOf(pesquisar);
          while (processo >= 0) {
            antilink.splice(processo, 1);
            processo = antilink.indexOf(pesquisar);
          }
          fs.writeFileSync("./db/json/antilink.json", JSON.stringify(antilink));
          env("Desativou com sucesso o recurso de antilink neste grupo️");
        } else {
          env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        }
        break;

      case "leveling":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        if (!isGroup) return env("Comando apenas para grupo");
        if (args.length < 1)
          return env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        if (Number(args[0]) === 1) {
          if (isLevelingOn) return env("Ja esta ativo");
          _level.push(from);
          fs.writeFileSync("./db/json/level.json", JSON.stringify(_level));
          env("Ativou com sucesso o recurso de leveling neste grupo");
        } else if (Number(args[0]) === 0) {
          if (!isLevelingOn) return env("Ja esta Desativado");
          let levell = from;
          let levell2 = _level.indexOf(levell);
          while (levell2 >= 0) {
            _level.splice(levell2, 1);
            levell2 = antilink.indexOf(levell);
          }
          fs.writeFileSync("./db/json/level.json", JSON.stringify(_level));
          env("Desativou com sucesso o recurso de leveling neste grupo️");
        } else {
          env(
            `${prefix + command} 1 para ligar ou ${
              prefix + command
            } 0 para desligar`
          );
        }
        break;

      //ADMINISTRAÇÃO

      case "linkgp":
      case "linkgrupo":
      case "linkgroup":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        if (!isGroup) return env("Comando apenas para grupo");
        const codelink = await conn.groupInviteCode(from);
        env("Link do grupo: https://chat.whatsapp.com/" + codelink);
        break;
      case "historico":
      case "atividades":
        if (!isMemberAdmin && !isDono) return env("Comando apenas para admins");
        let jsonn = require("./db/json/countmsg.json");
        let historico = `╭─────────────────╮\n│ *Histórico do grupo:* ${metadata.subject}\n╞───────╮ ▽ ╭───────╯\n│\n`;
        let members = [];
        for (let i = 0; i < jsonn.length; i++) {
          if (from == jsonn[i].groupId) {
            jsonn[i].numbers.map((index) => {
              let rankk = 1;
              members.push(index.jid);
              historico += `│👤 *Numero:* @${
                index.jid.split("@")[0]
              }\n│💬 *Mensagens:* ${index.messages}\n│👨🏽‍💻 *Comandos:* ${
                index.cmd_messages
              }\n│\n`;
            });
            historico += `│👨🏽‍💻 *Total de registros* : ${jsonn.length}\n╰──────────────╯`;
          }
        }
        conn.sendMessage(
          from,
          { text: historico.trim(), mentions: members },
          { quoted: mek }
        );
        break;

      case "vperfil":
        if (!isGroup) return env("Comando apenas para grupo");
        if (groupIdscount.indexOf(from) < 0)
          return env("Minha data base não possuí database desse grupo.");
        var ind = groupIdscount.indexOf(from);
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("Marque um número ");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        if (numbersIds.indexOf(mentioned[0]) >= 0) {
          var indnum = numbersIds.indexOf(mentioned[0]);
          mentions(
            `🔎 *Usuário:* @${
              mentioned[0].split("@")[0]
            }\n💭 *Total de Mensagens:* ${
              countMessage[ind].numbers[indnum].messages
            }\n🕵🏽 *Comandos usados:* ${
              countMessage[ind].numbers[indnum].cmd_messages
            }`,
            mentioned,
            true
          );
        } else {
          mentions(
            `🔎 *Usuário:* @${
              mentioned[0].split("@")[0]
            }\n💭 *Total de Mensagens:* 0\n🕵🏽 *Comandos usados:* 0`,
            mentioned,
            true
          );
        }
        break;

      case "perfil":
      case "me":
        if (!isGroup) return env("Comando apenas para grupo");
        let saldo = checkATMuser(sender);
        let pinha = (await conn.fetchStatus(sender)) || "Sem recado";
        const LevelMe = level.getLevelingLevel(sender, _level);
        let perfin = `*╭─━━══〘 PERFIL 〙══━━──*\n│
│🔎 *Usuário:* @${sender.split("@")[0]}
│👤 *Nome:* ${pushname}
│💬 *Recado:* ${pinha.status}
│📝 *Profissão:* Desempregado
│📱 *Plataforma:* ${adivinha}
│🧧 *Premium:* ${isPremium ? "✅" : "❎"}
│🏦 *Saldo:* ${saldo}
│🆙 *Level*:  ${LevelMe}
│💹 *Patente:* ${role}
│
│👨🏽‍💻 *Admin:* ${isMemberAdmin ? "✅" : "❎"}
│💎 *Vip:* ${isPremium ? "✅" : "❎"}
│🚷 *Bloqueado:* ❎\n│\n╰─━━══━━ ⌯ ━━──━━══`;
        let perfilft = "";

        try {
          perfilft += await conn.profilePictureUrl(sender, "image");
        } catch (a) {
          perfilft +=
            "https://pps.whatsapp.net/v/t61.24694-24/237308573_143481851393318_5947555802364352058_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=1b22f035864d9ae2eee053bba2101b85&oe=6247B04E";
        }
        conn.sendMessage(
          from,
          { image: { url: perfilft }, caption: perfin, mentions: [sender] },
          { quoted: mek }
        );
        break;

      case "level":
        if (!isGroup) return env("Comando apenas para grupo");
        const LevelAtual = level.getLevelingLevel(sender, _level);
        env(`*Nome:* ${pushname}\n*Level:* ${LevelAtual}\n*Patente:* ${role}`);
        break;

      case "rankgm":
      case "rank":
      case "rankgp":
        if (!isGroup) return env("Comando apenas para grupo");
        var ind = groupIdscount.indexOf(from);
        if (countMessage[ind].numbers.length < 3)
          return env("Necessita de registro de 3 usuarios");
        countMessage[ind].numbers.sort((a, b) =>
          a.messages < b.messages ? 1 : -1
        );
        mentioned_jid = [];
        boardi = "👑 Ranking dos membros mais ativos:\n\n";
        try {
          for (let i = 0; i < 3; i++) {
            if (i == 0)
              boardi += `${i + 1}º 🥇 : @${
                countMessage[ind].numbers[i].jid.split("@")[0]
              }\nMensagens: ${
                countMessage[ind].numbers[i].messages
              }\nComandos dados: ${
                countMessage[ind].numbers[i].cmd_messages
              }\n\n`;
            else if (i == 1)
              boardi += `${i + 1}º 🥈 : @${
                countMessage[ind].numbers[i].jid.split("@")[0]
              }\nMensagens: ${
                countMessage[ind].numbers[i].messages
              }\nComandos dados: ${
                countMessage[ind].numbers[i].cmd_messages
              }\n\n`;
            else if (i == 2)
              boardi += `${i + 1}º 🥉 : @${
                countMessage[ind].numbers[i].jid.split("@")[0]
              }\nMensagens: ${
                countMessage[ind].numbers[i].messages
              }\nComandos dados: ${
                countMessage[ind].numbers[i].cmd_messages
              }\n\n`;

            mentioned_jid.push(countMessage[ind].numbers[i].jid);
          }
          mention(boardi, mentioned_jid, true);
        } catch (err) {
          console.log(err);
          await conn.sendMessage(
            from,
            `é necessário 3 jogadores para se construir um ranking`,
            text,
            { quoted: mek }
          );
        }
        break;

      case "setnome":
        if (!texto) return env("Coloque a descrição na frente do comando");
        if (!isGroup) return env("Comando apenas para grupo");
        if (isMemberAdmin && isDono) return env("voce nao é adm");
        await conn.groupUpdateSubject(from, `${texto}`);
        env("Nome do grupo alterado com sucesso");
        break;

      case "setdesc":
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isGroup) return env("Comando apenas para grupo");
        if (!texto) return env("Coloque a descrição na frente do comando");
        await conn.groupUpdateDescription(from, `${texto}`);
        env("Descrição alterada com sucesso");
        break;

      case "rmghostoff":
        if (args.length < 1)
          return env(
            `Determine quanta s msg mínimas para banir... Exemplo: ${prefix}rmghost 3`
          );
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        if (groupIdscount.indexOf(from) >= 0) {
          for (let obj of groupMembers) {
            if (numbersIds.indexOf(obj.id) >= 0) {
              var indnum = numbersIds.indexOf(obj.id);
              if (countMessage[ind].numbers[indnum].messages <= args[0]) {
                if (MemberAdmin.includes(obj.id)) {
                  mentions(
                    `@${obj.id} ta liberado da inspeção por ser admin`,
                    [obj.id],
                    true
                  );
                } else {
                  conn.groupParticipantsUpdate(from, [obj.id], "remove");
                }
              }
            } else {
              if (MemberAdmin.includes(obj.id)) {
                mentions(
                  `@${obj.id} ta liberado da inspeção por ser admin`,
                  [obj.id],
                  true
                );
              } else {
                conn.groupParticipantsUpdate(from, [obj.id], "remove");
              }
            }
          }
        }
        break;
      case "open":
      case "abrir":
      case "closed":
      case "fechar":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        if (command == "open") {
          await conn.groupSettingUpdate(from, "not_announcement");
        } else if (command == "closed") {
          await conn.groupSettingUpdate(from, "announcement");
        }
        break;

      case "releaseconfig":
      case "notreleaseconfig":
      case "liberarconfig":
      case "naoliberarconfig":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        if (command == "releaseconfig") {
          await conn.groupSettingUpdate(from, "unlocked");
        } else if (command == "notreleaseconfig") {
          await conn.groupSettingUpdate(from, "locked");
        } else if (command == "liberarconfig") {
          await conn.groupSettingUpdate(from, "unlocked");
        } else if (command == "naoliberarconfig") {
          await conn.groupSettingUpdate(from, "locked");
        }
        env("Configuração do grupo alterada com sucesso");
        break;

      case "infogrupo":
      case "infogp":
      case "infogroup":
        var pinga = `Nome do grupo: ${metadata.subject}
Id do grupo: ${metadata.id}
Dono do grupo: ${metadata.owner}

Descrição: ${metadata.desc}`;

        let ppimg = "";

        try {
          ppimg += await conn.profilePictureUrl(from);
        } catch (a) {
          ppimg +=
            "https://pps.whatsapp.net/v/t61.24694-24/237308573_143481851393318_5947555802364352058_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=1b22f035864d9ae2eee053bba2101b85&oe=6247B04E";
        }

        conn.sendMessage(from, {
          image: { url: ppimg },
          caption: pinga,
          buttons: [
            {
              buttonId: `${prefix}admins`,
              buttonText: { displayText: "Admins" },
              type: 1,
            },
          ],
          headerType: 4,
        });
        break;

      case "admins":
        teks = `Admins do ${metadata.subject}\n\n`;
        no = 0;
        for (let admon of isAdmins) {
          no += 1;
          teks += `@${admon.split("@")[0]}\n`;
        }
        mention(teks, isAdmins, true);
        break;

      case "rstlink":
      case "redefinirlink":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        var code = await conn.groupRevokeInvite(from);
        env("Link do grupo alterado com sucesso✓");
        console.log(
          "\033[0;31m" +
            `Link do grupo alterado com sucesso: https://chat.whatsapp.com/${code}` +
            "\033[0m"
        );
        break;
      case "leave":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        conn.groupLeave(from);
        break;
      case "leavegp":
        let textoleave = `Mensagem automática
 
Ola, tempo de licença desse grupo acabou, caso queira renova-la fale com meu dono pelo número a baixo👇🏻
https://wa.me/554497433716`;
        let groupJid = texto;
        if (!groupJid) groupJid = from;
        if (!groupJid.endsWith("@g.us"))
          return env("isso não é um id de grupo!");
        try {
          conn.sendMessage(
            groupJid,
            { text: textoleave, mentions: allMembers },
            { quoted: whatsapp }
          );
          setTimeout(() => {
            conn.groupLeave(groupJid);
          }, 1500);
          env("Saindo do grupo!");
        } catch (err) {
          await env("Não fui possível sair do grupo.");
        }
        break;
      case "hidetag":
      case "totag":
      case "marcar":
        const toti = args.join(" ") || BotName;
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedSticker) &&
          args.length == 0
        ) {
          media = isQuotedSticker
            ? mek.message.extendedTextMessage.contextInfo.quotedMessage
                .stickerMessage
            : mek.message.stickerMessage;
          rane = getRandom("." + (await getExtension(media.mimetype)));
          img = await getFileBuffer(media, "sticker");
          fs.writeFileSync(rane, img);
          fig = fs.readFileSync(rane);
          var options = {
            sticker: fig,
            mentions: groupMembers.map((i) => i.id),
          };
          conn.sendMessage(from, options);
        } else if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 0
        ) {
          media = isQuotedImage
            ? mek.message.extendedTextMessage.contextInfo.quotedMessage
                .imageMessage
            : mek.message.imageMessage;
          rane = getRandom("." + (await getExtension(media.mimetype)));
          img = await getFileBuffer(media, "image");
          fs.writeFileSync(rane, img);
          buff = fs.readFileSync(rane);
          conn.sendMessage(
            from,
            {
              image: buff,
              caption: toti,
              mentions: groupMembers.map((i) => i.id),
            },
            { quoted: mek }
          );
        } else if (
          ((isMedia && !mek.message.videoMessage) || isQuotedVideo) &&
          args.length == 0
        ) {
          media = isQuotedVideo
            ? mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage
            : mek.message.videoMessage;
          rane = getRandom("." + (await getExtension(media.mimetype)));
          vid = await getFileBuffer(media, "video");
          fs.writeFileSync(rane, vid);
          buff = fs.readFileSync(rane);
          conn.sendMessage(
            from,
            {
              video: buff,
              caption: toti,
              mimetype: "video/mp4",
              mentions: groupMembers.map((i) => i.id),
            },
            { quoted: mek }
          );
        } else if (
          ((isMedia && !mek.message.videoMessage) || isQuotedAudio) &&
          args.length == 0
        ) {
          media = isQuotedAudio
            ? mek.message.extendedTextMessage.contextInfo.quotedMessage
                .audioMessage
            : mek.message.audioMessage;
          rane = getRandom("." + (await getExtension(media.mimetype)));
          aud = await getFileBuffer(media, "audio");
          fs.writeFileSync(rane, aud);
          buff = fs.readFileSync(rane);
          conn.sendMessage(
            from,
            {
              audio: buff,
              mimetype: "audio/mp4",
              ptt: true,
              mentions: groupMembers.map((i) => i.id),
            },
            { quoted: mek }
          );
        } else if (
          ((isMedia && !mek.message.videoMessage) || isQuotedDocument) &&
          args.length == 0
        ) {
          media = isQuotedDocument
            ? mek.message.extendedTextMessage.contextInfo.quotedMessage
                .documentMessage
            : mek.message.documentMessage;
          rane = getRandom("." + (await getExtension(media.mimetype)));
          doc = await getFileBuffer(media, "document");
          fs.writeFileSync(rane, doc);
          buff = fs.readFileSync(rane);
          conn.sendMessage(
            from,
            {
              document: buff,
              mimetype: "text/plain",
              mentions: groupMembers.map((i) => i.id),
            },
            { quoted: mek }
          );
        } else if (budy) {
          if (q.length < 1) return env("Citar oq?");
          //if(q.startsWith('/'))return env('sai dae arrombado')
          conn.sendMessage(
            from,
            { text: texto, mentions: groupMembers.map((i) => i.id) },
            { quoted: mek }
          );
        } else {
          env(
            `Responder imagem/documento/gif/adesivo/áudio/vídeo com legenda ${
              prefix + command
            }`
          );
        }
        break;

      case "notif":
      case "aviso":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!texto)
          return env(
            `Coloque o aviso na frente do comando.\nExemplo de como se usar: ${
              prefix + command
            } hoje a noite não haverá sol.`
          );
        teks = `🔔 Notificação  de @${
          sender.split("@")[0]
        }\n\n📨Mensagem: *${texto}*`;
        grouup = await conn.groupMetadata(from);
        member = grouup["participants"];
        jids = [];
        member.map(async (adm) => {
          jids.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        await conn.sendMessage(
          from,
          { text: teks, mentions: jids },
          { quoted: mek }
        );
        break;

      case "demote":
      case "rebaixar":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        num = `${body.slice(9)}`;
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env(
            "informe quem devo rebaixar de cargo, marcado a mensagem da pessoa..."
          );
        if (num.length < 1) {
          var mentioned =
            mek.message.extendedTextMessage.contextInfo.participant;
          conn.groupParticipantsUpdate(from, [`${mentioned}`], "demote");
        } else {
          id = [`${num.replace("@", "")}@s.whatsapp.net`];
          conn.groupParticipantsUpdate(from, id, "demote");
        }
        env("Cargo removido com sucesso");
        break;

      case "promote":
      case "promover":
      case "pm":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env(
            "informe quem devo promover, marcado a mensagem da pessoa..."
          );
        num = `${body.slice(9)}`;
        if (num.length < 1) {
          var mentioned =
            mek.message.extendedTextMessage.contextInfo.participant;
          conn.groupParticipantsUpdate(from, [`${mentioned}`], "promote");
        } else {
          id = [`${num.replace("@", "")}@s.whatsapp.net`];
          conn.groupParticipantsUpdate(from, id, "promote");
        }
        env("Promovido cargo com sucesso");
        break;

      case "ban":
      case "rm":
      case "banir":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        num = `${body.slice(9)}`;
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env(
            "informe quem devo banir, marcado a mensagem da pessoa..."
          );
        if (num.length < 1) {
          var mentioned =
            mek.message.extendedTextMessage.contextInfo.participant;
          conn.groupParticipantsUpdate(from, [`${mentioned}`], "remove");
        } else {
          if (num == IsDonoGo)
            return env("Não e possível banir o proprietário do grupo");
          id = [`${num.replace("@", "")}@s.whatsapp.net`];
          conn.groupParticipantsUpdate(from, id, "remove");
        }
        env("Banido com sucesso");
        break;
      case "add":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isMemberAdmin && isDono) return env("voce nao é adm");
        if (!isBotAdm) return env("Bot nao é adm");
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env(
            "informe quem devo adicionar no grupo novamente, marcado a mensagem da pessoa..."
          );
        num = `${body.slice(9)}`;
        if (num.length < 1) {
          var mentioned =
            mek.message.extendedTextMessage.contextInfo.participant;
          conn.groupParticipantsUpdate(from, [`${mentioned}`], "add");
        } else {
          id = [`${num.replace("@", "")}@s.whatsapp.net`];
          conn.groupParticipantsUpdate(from, id, "add");
        }
        env("Adicionado com sucesso");
        break;
      //FIM
      case "tomp3":
        if (!isQuotedVideo) return env("Marque o video pfv");
        env("perai");
        encmedia = isQuotedVideo
          ? info.extendedTextMessage.contextInfo.quotedMessage.videoMessage
          : info.videoMessage;
        rane = getRandom("." + (await getExtension(encmedia.Mimetype)));
        buffimg = await getFileBuffer(encmedia, "video");
        fs.writeFileSync(rane, buffimg);
        media = rane;
        ran = getRandom(".mp4");
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return env("Falha ao converter vídeo para mp3");
          buffer = fs.readFileSync(ran);
          conn.sendMessage(
            from,
            { audio: buffer, mimetype: "audio/mp4" },
            { quoted: mek }
          );
          fs.unlinkSync(ran);
        });
        break;
      case "togif":
        if (!isQuotedSticker) return env("Marque uma figurinha");
        buff = await getFileBuffer(
          info.extendedTextMessage.contextInfo.quotedMessage.stickerMessage,
          "sticker"
        );
        env("Convertendo a figurinha em GIF...");
        a = await webp_mp4(buff);
        mp4 = await getBuffer(a);
        conn.sendMessage(
          from,
          { video: mp4, gifPlayback: true, filename: `stick.gif` },
          { quoted: mek }
        );
        //fs.unlinkSync(buff)
        break;
      case "toimg":
        if (!isQuotedSticker) return env("Marque uma figurinha");
        buff = await getFileBuffer(
          mek.message.extendedTextMessage.contextInfo.quotedMessage
            .stickerMessage,
          "sticker"
        );
        env("perai");
        try {
          conn.sendMessage(from, { image: buff }, { quoted: whatsapp });
        } catch (e) {
          console.log(e);
          env("Erro ao converter figurinha para imagem");
        }
        break;
        case "take":  case "renomear":
          if (!isPremium) return env('tu n é vip')
        if (!isQuotedSticker) return env("Marque uma figurinha");
        buff = await getFileBuffer(
          mek.message.extendedTextMessage.contextInfo.quotedMessage
            .stickerMessage,
          "sticker"
        );
        if (!q.includes('|')) return env("vc tem que separa com | a frase!")
            const text1 = q.split('|')[0]
            const text2 = q.split('|')[1]
        const renome = {
          type: 'full',
          
          pack: `${text1}`,
          author: `${text2}`,
          categories: [
          '🌹'
          ]
          }
        fig_enviar = await createSticker(buff, renome)
       conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        break
      case "packsfigu":
      case "packfigu":
      case "figupack":
      case "figupacks":
        var sections = [
          {
            title: "Plaquinha",
            rows: [
              {
                title: `Figurinhas aleatório de Meme`,
                rowId: `${prefix}figumeme`,
              },
              {
                title: `Figurinhas aleatório de Anime`,
                rowId: `${prefix}figuanime`,
              },
              {
                title: `Figurinhas aleatório de Sticker`,
                rowId: `${prefix}figudesenho`,
              },
              {
                title: `Figurinhas aleatório de Roblox`,
                rowId: `${prefix}figuroblox`,
              },
              {
                title: `Figurinhas aleatório de Raiva`,
                rowId: `${prefix}figuraiva`,
              },
              {
                title: `Figurinhas aleatório Engraçadas`,
                rowId: `${prefix}figuengracado`,
              },
              {
                title: `Figurinhas aleatório de Bebê`,
                rowId: `${prefix}figubb`,
              },
            ],
          },
        ];
        var listMessage = {
          text: "Escolha um tema de figurinha.",
          footer: "Selecione o tema abaixo.",
          buttonText: "Escolha o tema da sua Figurinha.",
          sections,
        };
        const sendfigus = await conn.sendMessage(from, listMessage, {
          quoted: mek,
        });
        break;

      case "figumeme":
      case "figmeme":
        const memez = `${Math.floor(Math.random() * 130)}`;
        const memeu = `${Math.floor(Math.random() * 130)}`;
        const memep = `${Math.floor(Math.random() * 130)}`;
        const memei = `${Math.floor(Math.random() * 130)}`;

        
        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figumemes/${memez}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figumemes/${memeu}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figumemes/${memep}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figumemes/${memei}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de meme?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figumeme`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);
        break;

      case "figudesenho":
        const desenhoa = `${Math.floor(Math.random() * 102)}`;
        const desenhoe = `${Math.floor(Math.random() * 102)}`;
        const desenhoi = `${Math.floor(Math.random() * 102)}`;
        const desenhoo = `${Math.floor(Math.random() * 102)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoa}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoe}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoi}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figureaçõesdedesenhos/${desenhoo}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de Desenho??",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figudesenho`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);

        break;

      case "figuanime":
        const annime = `${Math.floor(Math.random() * 77)}`;
        const annnime = `${Math.floor(Math.random() * 77)}`;
        const annnnime = `${Math.floor(Math.random() * 77)}`;
        const nnnannime = `${Math.floor(Math.random() * 77)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuanime/${annime}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuanime/${annnime}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuanime/${annnnime}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuanime/${nnnannime}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})
        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de anime?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figuanime`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);
        break;

      case "figuraiva":
        const raivaa = `${Math.floor(Math.random() * 29)}`;
        const raivae = `${Math.floor(Math.random() * 29)}`;
        const raivai = `${Math.floor(Math.random() * 29)}`;
        const raivao = `${Math.floor(Math.random() * 29)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuraiva/${raivaa}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuraiva/${raivae}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuraiva/${raivai}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuraiva/${raivao}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de raiva?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figuraiva`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);

        break;

      case "figuroblox":
        const robloxa = `${Math.floor(Math.random() * 21)}`;
        const robloxe = `${Math.floor(Math.random() * 21)}`;
        const robloxi = `${Math.floor(Math.random() * 21)}`;
        const robloxo = `${Math.floor(Math.random() * 21)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuroblox/${robloxa}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuroblox/${robloxe}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuroblox/${robloxi}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuroblox/${robloxo}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de Roblox?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figuroblox`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);

        break;

      case "figubb":
        const bba = `${Math.floor(Math.random() * 21)}`;
        const bbe = `${Math.floor(Math.random() * 21)}`;
        const bbi = `${Math.floor(Math.random() * 21)}`;
        const bbo = `${Math.floor(Math.random() * 21)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figubb/${bba}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figubb/${bbe}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figubb/${bbi}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figubb/${bbo}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de Roblox?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figubb`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);

        break;

      case "figuengracado":
        const engraa = `${Math.floor(Math.random() * 25)}`;
        const engrae = `${Math.floor(Math.random() * 25)}`;
        const engrai = `${Math.floor(Math.random() * 25)}`;
        const engrao = `${Math.floor(Math.random() * 25)}`;

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuengracado/${engraa}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuengracado/${engrae}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuengracado/${engrai}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        fig_enviar = await createSticker(`./complement/sticker/packsfigu/figuengracado/${engrao}.webp`, descFig)
        conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})

        setTimeout(() => {
          conn.sendMessage(
            from,
            {
              text: "Deseja mais figurinhas de anime?",
              footer: `Escolha uma opção abaixo.`,
              buttons: [
                {
                  buttonId: `${prefix}figuengracado`,
                  buttonText: { displayText: "MAIS FIGURINHA" },
                  type: 1,
                },
              ],
            },
            { quoted: mek }
          );
        }, 2090);

        break;

      //PREMIUM
      case "cc":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        const dbcc = fs.readFileSync("./db/json/db-cc.json");
        var dbjson = JSON.parse(dbcc);
        var pinga = Math.floor(Math.random() * dbjson.length);
        var res = dbjson[pinga];
        let codee = res.code;
        let mes = res.dateMonth;
        let ano = res.dateYear;
        let cvv = res.cvv;
        let cpfcc = Math.floor(Math.random() * 999 + 100);
        let cpf2cc = Math.floor(Math.random() * 999 + 100);
        let cpf3cc = Math.floor(Math.random() * 999 + 100);
        let cpf4cc = Math.floor(Math.random() * 99 + 00);
        let bandeiraacc = [
          "Visa",
          "Mastercard",
          "Hipercard",
          "Elo",
          "American Express",
        ];
        let bandeiracc =
          bandeiraacc[Math.floor(Math.random() * bandeiraacc.length)];
        let categoriaacc = ["Gold", "Platinum", "Black"];
        let categoriacc =
          categoriaacc[Math.floor(Math.random() * categoriaacc.length)];
        let bancoocc = [
          "BRADESCO",
          "CAIXA",
          "NUBANK",
          "C6 BANK",
          "MERCADO PAGO",
          "ORIGINAL",
          "PAGBANK",
          "INTER",
          "SANTANDER",
          "NEON",
          "PAN",
        ];
        let bancocc = bancoocc[Math.floor(Math.random() * bancoocc.length)];

        let cc = `CARTÃO CC GERADO POR @${sender.split("@")[0]}

GARANTIMOS SOMENTE LIVE!.
NÃO GARANTIMOS A APROVAÇÃO!.
NÃO GARANTIMOS SALDO!.

*Card:* ${codee}
*MM/AA:* ${mes}/${ano}
*CVV:* ${cvv}
*Bandeira:* ${bandeiracc}
*Categoria:* ${categoriacc}
*Banco:*  ${bancocc}

*Nome:* Undefined
*CPF:* ${cpfcc}.${cpf2cc}.${cpf3cc}-${cpf4cc}

✅ Status: #Aprovado - Retorno: Transação Capturada com sucesso.
`;
        conn.sendMessage(
          from,
          { text: cc.trim(), mentions: [sender] },
          { quoted: mek }
        );
        break;

      case "cc2":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        let mescc = Math.floor(Math.random() * 12 + 1);
        mescc = mescc < 10 ? "0" + mescc : mescc;
        let diacc = Math.floor(Math.random() * 30 + 1);
        diacc = diacc < 10 ? "0" + diacc : diacc;
        let cvvcc = Math.floor(Math.random() * 999 + 102);
        let cardcc = Math.floor(
          Math.random() * 9999999999999999 + 0000000000000000
        );
        let cpffcc = Math.floor(Math.random() * 999 + 100);
        let cpff2cc = Math.floor(Math.random() * 999 + 100);
        let cpff3cc = Math.floor(Math.random() * 999 + 100);
        let cpff4cc = Math.floor(Math.random() * 99 + 00);
        let banddeiraacc = [
          "Visa",
          "Mastercard",
          "Hipercard",
          "Elo",
          "American Express",
        ];
        let banddeiracc =
          banddeiraacc[Math.floor(Math.random() * banddeiraacc.length)];
        let categgoriaacc = ["Gold", "Platinum", "Black"];
        let categgoriacc =
          categgoriaacc[Math.floor(Math.random() * categgoriaacc.length)];
        let banccoocc = [
          "BRADESCO",
          "CAIXA",
          "NUBANK",
          "C6 BANK",
          "MERCADO PAGO",
          "ORIGINAL",
          "PAGBANK",
          "INTER",
          "SANTANDER",
          "NEON",
          "PAN",
        ];
        let banccocc = banccoocc[Math.floor(Math.random() * banccoocc.length)];

        let cc2 = `CARTÃO CC2 GERADO POR @${sender.split("@")[0]}

GARANTIMOS SOMENTE LIVE!.
NÃO GARANTIMOS A APROVAÇÃO!.
NÃO GARANTIMOS SALDO!.

*Card:* ${cardcc}
*MM/AA:* ${mescc}/${diacc}
*CVV:* ${cvvcc}
*Bandeira:* ${banddeiracc}
*Categoria:* ${categgoriacc}
*Banco:*  ${banccocc}

*Nome:* Undefined
*CPF:* ${cpffcc}.${cpff2cc}.${cpff3cc}-${cpff4cc}

✅ Status: #Aprovado - Retorno: Transação Capturada com sucesso.
`;
        conn.sendMessage(
          from,
          { text: cc2.trim(), mentions: [sender] },
          { quoted: mek }
        );
        break;
      /*
      case 'delete':
      case 'del':
      case 'd':  
      if (!isPremium && isDono) return env('vc nn e Premium;-;') 
      if (!isBotAdm && isDono) return env('Preciso de adm, para apagar minhas mensagens ou de algum membro do grupo');
      try {
       let key = {
          remoteJid: from,
          fromMe: botN == info[type].contextInfo.participant,
          id: info[type].contextInfo.stanzaId,
          participant: info[type].contextInfo.participant
        };
        conn.sendMessage(from, {delete: key});
      } catch (err) {
      await env('Marque uma mensagem.');
      }
      */
      case "tempmail":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        const tmmpz = Math.floor(Math.random() * 20 + 8);
        const generateRandomString2 = (num) => {
          const characters2 =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result1 = "";
          const characters2Length = characters2.length;
          for (let i = 0; i < num; i++) {
            result1 += characters2.charAt(
              Math.floor(Math.random() * characters2Length)
            );
          }

          return result1;
        };

        const displayRandomString2 = () => {
          let randomStringContainer = document.getElementById("random_string");
          randomStringContainer.innerHTML = generateRandomString2(8);
        };
        console.log(generateRandomString2(tmmpz));
        env(`*Email solicitado por:* ${sender.split("@")[0]}
*Email:* ${generateRandomString2(9)}@gmail.com`);
        break;

      case "gnum":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!texto) return env(`Qual o DDD? Exemplo: ${prefix + command} 77`);
        var num = Math.floor(Math.random() * 3000) + 6000;
        let obs = ["98444", "99600", "99265", "99623"];
        let obs2 = obs[Math.floor(Math.random() * obs.length)];
        if (isNaN(texto)) return env("O DDD tem que está em número...");
        if (texto.length > 2)
          return env("DDD brasileiro e no máximo 2 dígitos...");
        if (texto == "00") return env("00 sério mesmo?");
        env(`*DDD:* ${texto}
*Seu Número:* +55 ${texto} ${obs2}-${num}`);

        setTimeout(() => {
          ab = Math.floor(Math.random() * 999 + 000);
          ac = Math.floor(Math.random() * 999 + 000);
          env(`Seu código de verificação e: ${ab}-${ac}`);
        }, 35060);
        break;

      case "formatnum":
        if (!texto) return env("cadê o número?");
        if (isNaN(texto)) return env("O DDD tem que está em número...");
        if (texto.length > 13)
          return env("DDD brasileiro e no máximo 13 dígitos...");
        if (texto == "00") return env("00 sério mesmo?");
        var num = `${prefix}`;
        let dddi = num.substring(2, 4);
        let ddi = num.substring(0, 2);
        let endnum = num.substring(num.length - 4);

        [ddi, dddi, endnum].map((i) => {
          num = num.replace(i, "");
        });

        env("+" + ddi + " " + dddi + " " + num + "-" + endnum);
        break;
      case "gerarcpf":
      case "gcpf":
        cp1 = `${Math.floor(Math.random() * 300) + 600}`;
        cp2 = `${Math.floor(Math.random() * 300) + 600}`;
        cp3 = `${Math.floor(Math.random() * 300) + 600}`;
        cp4 = `${Math.floor(Math.random() * 30) + 60}`;
        cpff = `${cp1}.${cp2}.${cp3}-${cp4}`;
        env(cpff);
        break;

      //FIM
      // LOGOS/ESCRITAS

      case "loli":
        if (!texto)
          return env("Escreva uma frase na frente!\nExemplo: /loli Toki Bot");
        try {
          env(mensagem[0].espere);
          let lodd = await fetchJson(
            `https://nekobot.xyz/api/imagegen?type=kannagen&text=${texto}`
          );
          sendStickerFromUrl(from, lodd.message, mek);
        } catch (err) {
          env(mensagem[0].erro);
        }
        break;
      case "create-neon-devil-wings-text-effect-online-free-1014.html": //DEVIL
      case "make-a-batman-logo-online-free-1066.html": //BATMAN
      case "toxic-text-effect-online-901.html": //TOXIC
      case "create-logo-joker-online-934.html": //JOKER
      case "3d-golden-ancient-text-effect-online-free-1060.html": // GOLD
      case "3d-christmas-text-effect-by-name-1055.html": //NATAL
      case "create-thunder-text-effect-online-881.html": //Thunder
      case "neon-text-effect-online-879.html": //NEON
      case "matrix-style-text-effect-online-884.html": //MATRIX
      case "online-thunder-text-effect-generator-1031.html": //Thunder 2
      case "create-impressive-glitch-text-effects-online-1027.html": //Falha
      case "create-american-flag-3d-text-effect-online-1051.html": //AMÉRICA
      case "minion-text-effect-3d-online-978.html": //MINIONS
      case "create-a-magma-hot-text-effect-online-1030.html": //MAGMA
      case "1917-style-text-effect-online-980.html": //1917
      case "online-black-and-white-bear-mascot-logo-creation-1012.html": //LOBO
      case "dropwater-text-effect-872.html": //ESPELHO
      case "halloween-fire-text-effect-940.html": // HALLOWEEN
      case "create-a-sketch-text-effect-online-1044.html": //LÁPIS
      case "create-a-transformer-text-effect-online-1035.html": //TRANSFORMER
      case "create-green-horror-style-text-effect-online-1036.html": //DEMON
        if (!texto) return env("Coloque o seu nome na frente do comando");
        env("Espere um pouquinho");
        thiccysapi
          .textpro(`https://textpro.me/${command}`, texto)
          .then(async (data) => {
            try {
              console.log(data);
              conn.sendMessage(
                from,
                { image: { url: data }, caption: "✅" },
                { quoted: mek }
              );
            } catch (err) {
              console.log(err);
            }
          });
        break;

      case "logos":
        if (!texto) return env("Coloque o seu nome na frente do comando");
        var sections = [
          {
            title: "Logos disponível",
            rows: [
              {
                title: `Logo com o tema Devil escrito "${texto}"`,
                rowId: `${prefix}create-neon-devil-wings-text-effect-online-free-1014.html ${texto}`,
              },

              {
                title: `Logo com o tema do Batman escrito "${texto}"`,
                rowId: `${prefix}make-a-batman-logo-online-free-1066.html ${texto}`,
              },

              {
                title: `Logo com o tema Toxic escrito "${texto}"`,
                rowId: `${prefix}toxic-text-effect-online-901.html ${texto}`,
              },

              {
                title: `Logo com tema de terro demo "${texto}"`,
                rowId: `${prefix}create-green-horror-style-text-effect-online-1036.html ${texto}`,
              },

              {
                title: `Logo do Joker escrito "${texto}"`,
                rowId: `${prefix}create-logo-joker-online-934.html ${texto}`,
              },

              {
                title: `Logo com o tema Gold escrito "${texto}"`,
                rowId: `${prefix}3d-golden-ancient-text-effect-online-free-1060.html ${texto}`,
              },

              {
                title: `Logo com o tema de Natal escrito "${texto}"`,
                rowId: `${prefix}3d-christmas-text-effect-by-name-1055.html ${texto}`,
              },

              {
                title: `Logo com o tema Relâmpago escrito "${texto}"`,
                rowId: `${prefix}create-thunder-text-effect-online-881.html ${texto}`,
              },

              {
                title: `Logo com o tema Neon escrito "${texto}"`,
                rowId: `${prefix}neon-text-effect-online-879.html ${texto}`,
              },

              {
                title: `Logo com o tema Matrix escrito "${texto}"`,
                rowId: `${prefix}matrix-style-text-effect-online-884.html ${texto}`,
              },

              {
                title: `Logo com o tema de Relâmpago escrito "${texto}"`,
                rowId: `${prefix}online-thunder-text-effect-generator-1031.html ${texto}`,
              },

              {
                title: `Logo com a letra falhando escrito "${texto}"`,
                rowId: `${prefix}create-impressive-glitch-text-effects-online-1027.html ${texto}`,
              },

              {
                title: `Logo da América escrito "${texto}"`,
                rowId: `${prefix}create-american-flag-3d-text-effect-online-1051.html ${texto}`,
              },

              {
                title: `Logo com o tema de Minions escrito "${texto}"`,
                rowId: `${prefix}minion-text-effect-3d-online-978.html ${texto}`,
              },

              {
                title: `Logo com o tema de Magma escrito "${texto}"`,
                rowId: `${prefix}create-a-magma-hot-text-effect-online-1030.html ${texto}`,
              },

              {
                title: `Logo com o tema de 1917 escrito "${texto}"`,
                rowId: `${prefix}1917-style-text-effect-online-980.html ${texto}`,
              },

              {
                title: `Logo com o tema de Lobo escrito "${texto}"`,
                rowId: `${prefix}online-black-and-white-bear-mascot-logo-creation-1012.html ${texto}`,
              },

              {
                title: `Logo com o tema de Marca no vidro escrito "${texto}"`,
                rowId: `${prefix}dropwater-text-effect-872.html ${texto}`,
              },

              {
                title: `Logo com o tema de Halloween escrito "${texto}"`,
                rowId: `${prefix}halloween-fire-text-effect-940.html ${texto}`,
              },

              {
                title: `Logo com o tema escrito de lápis escrito "${texto}"`,
                rowId: `${prefix}create-a-sketch-text-effect-online-1044.html ${texto}`,
              },

              {
                title: `Logo com o tema de Transformes escrito "${texto}"`,
                rowId: `${prefix}create-a-transformer-text-effect-online-1035.html ${texto}`,
              },
            ],
          },
        ];
        var listMessage = {
          text: "Escolha uma fonte para usar no logo.",
          footer: "Selecione o tema abaixo",
          buttonText: "Escolha a fonte do logo",
          sections,
        };
        const loggo = await conn.sendMessage(from, listMessage, {
          quoted: whatsapp,
        });
        break;

      case "papel":
        if (args.length < 1)
          return env(
            `Digite a frase na frente do comando \nExemplo de como se usar: ${
              prefix + command
            } Toki Bot`
          );
        teks = body.slice(7);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: {
              url: `https://rsymenti.sirv.com/1627185297858.jpg?text.0.text=${teks}&text.0.position.x=-35%25&text.0.position.y=-44%25&text.0.size=45&text.0.color=000000&text.0.font.family=Playfair%20Display&text.0.background.opacity=100`,
            },
            quoted: mek,
            caption: "✓",
          },
          { quoted: mek }
        );
        break;

      case "bart":
        if (args.length < 1)
          return env(
            `Digite a frase na frente do comando \nExemplo de como se usar: ${
              prefix + command
            } Toki Bot`
          );
        teks = body.slice(6);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: {
              url: `https://rsymenti.sirv.com/1628972007952.jpg?text.0.text=${teks}&text.0.position.x=-37%25&text.0.position.y=-53%25&text.0.size=50&text.0.color=ffffff&text.0.font.family=Shadows%20Into%20Light%20Two&text.0.background.opacity=67`,
            },
            caption: "✓",
          },
          { quoted: mek }
        );
        break;

      case "liza":
        if (args.length < 1)
          return env(
            `Digite a frase na frente do comando \nExemplo de como se usar: ${
              prefix + command
            } Toki Bot`
          );
        teks = body.slice(6);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: {
              url: `https://janbot-api.herokuapp.com/api/imgedit/presentasi?text=${teks}`,
            },
            caption: "✓",
          },
          { quoted: mek }
        );
        break;

      case "monica":
        if (args.length < 1)
          return env(
            `Digite a frase na frente do comando \nExemplo de como se usar: ${
              prefix + command
            } Toki Bot`
          );
        teks = body.slice(8);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: {
              url: `https://rsymenti.sirv.com/images%20(1).jpeg?text.0.text=${teks}&text.0.position.gravity=south&text.0.position.x=20%25&text.0.position.y=-68%25&text.0.size=45&text.0.color=000000&text.0.opacity=94&text.0.background.opacity=93&text.0.outline.blur=28&text.0.outline.opacity=37`,
            },
            caption: "✓",
          },
          { quoted: mek }
        );
        break;

      case "bolsonaro":
        if (args.length < 1)
          return env(
            `Digite a frase na frente do comando \nExemplo de como se usar: ${
              prefix + command
            } Toki Bot`
          );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: {
              url: `https://rsymenti.sirv.com/1626624476633.jpg?text.0.text=${texto}&text.0.position.x=-13%25&text.0.position.y=-52%25&text.0.size=55&text.0.color=000000&text.0.background.opacity=100`,
            },
            caption: "✓",
          },
          { quoted: mek }
        );
        break;

      //FIM
      //VIDEOS

      case "saycat":
        let datas = await fetchJson(`https://pastebin.com/raw/cVDj0qz6`);
        let nss = JSON.parse(JSON.stringify(datas));
        let nimeks = nss[Math.floor(Math.random() * nss.length)];
        let buffesay = await getBuffer(nimeks.result);
        conn.sendMessage(
          from,
          { video: buffesay, caption: "SayCat", gifPlayback: true },
          { quoted: mek }
        );
        break;

      //FIM
      //IMAGENS

      case "floppa":
        try {
          conn.sendMessage(
            from,
            { image: { url: "https://api.jbh.rocks/image" } },
            { quoted: mek }
          );
        } catch (err) {
          env("Erro ao enviar");
        }
        break;
      case "coffee":
      case "cafe":
        env(mensagem[0].espere);
        conn.sendMessage(from, {
          image: { url: "https://coffee.alexflipnote.dev/random" },
          caption: "Cafezinho!",
          buttons: [
            {
              buttonId: `${prefix}coffee`,
              buttonText: { displayText: "Coffee☕" },
              type: 1,
            },
          ],
          headerType: 4,
        });
        break;
      case "metadinha":
      case "couple":
        const metadinha = fs.readFileSync("./db/js/couple.js");
        var jsonData = JSON.parse(metadinha);
        var pinga = Math.floor(Math.random() * jsonData.length);
        var res = jsonData[pinga];
        conn.sendMessage(
          from,
          { image: { url: res.male, caption: "Lado Masculino" } },
          { quoted: mek }
        );
        conn.sendMessage(
          from,
          { image: { url: res.female, caption: "Lado Feminino" } },
          { quoted: mek }
        );
        break;

      //FIM
      //BÁSICOS

      case "diga":
      case "dizer":
        if (!texto) return env("Exemplo: /diga Toki Bot");
        mention(`${texto}`);
        break;

      case "simi":
        if (args.length < 1)
          return env("Simi não saber lê pensamentos não amigo...");
        teks = body.slice(6);
        res = await fetchJson(
          `https://api-sv2.simsimi.net/v2/?text=${teks}&lc=pt&cf=false`
        );
        env(res.success);
        break;

      //FIM
      //+18

      case "utaka":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        res = await fetchJson(
          "https://slazinnn.herokuapp.com/api/nsfw/cosplay&token=slazinnnn"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res[0].result },
            caption: "先輩🥵",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "pussy":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        const pussy = await fetchJson(
          "https://slazinnn.herokuapp.com/api/nsfw/pussy&token=slazinnnn"
        );
        n = JSON.parse(JSON.stringify(pussy));
        nimek = n[Math.floor(Math.random() * n.length)];
        pussyf = await getBuffer(nimek.result);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: pussyf,
            caption: "Pussy!",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: mek }
        );
        break;

      case "mia":
      case "khalifa":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        const miaa = await fetchJson("https://pastebin.com/raw/Th48gbKg");
        n = JSON.parse(JSON.stringify(miaa));
        miao = n[Math.floor(Math.random() * n.length)];
        miap = await getBuffer(miao.result);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: miap,
            caption: "Mia Khalifa",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "malkova":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        const malkova = await fetchJson(
          "https://slazinnn.herokuapp.com/api/nsfw/miamalkova&token=slazinnnn"
        );
        n = JSON.parse(JSON.stringify(malkova));
        miao = n[Math.floor(Math.random() * n.length)];
        malkovap = await getBuffer(miao.result);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: malkovap,
            caption: "Mia Malkova",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "belle":
      case "delphine":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        const belle = await fetchJson(
          "https://slazinnn.herokuapp.com/api/nsfw/belle&token=slazinnnn"
        );
        n = JSON.parse(JSON.stringify(belle));
        miao = n[Math.floor(Math.random() * n.length)];
        bellep = await getBuffer(miao.result);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: bellep,
            caption: "Belle Delphine",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      //Fim
      //HENTAI && HENTAI LITE

      case "masturbation":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson(
          "https://janbot-api.herokuapp.com/api/nsfw/masturbation"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "thighs":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson(
          "https://janbot-api.herokuapp.com/api/nsfw/thighs"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "megumin":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: "https://janbot-api.herokuapp.com/api/sfw/megumin" },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "shinobu":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: "https://janbot-api.herokuapp.com/api/sfw/shinobu" },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "neko":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: "https://janbot-api.herokuapp.com/api/sfw/neko" },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "waifu":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: "https://janbot-api.herokuapp.com/api/sfw/waifu" },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "hentai":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson(
          "https://janbot-api.herokuapp.com/api/nsfw/hentai"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "ero":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson("https://janbot-api.herokuapp.com/api/nsfw/ero");
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "ahegao":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson(
          "https://janbot-api.herokuapp.com/api/nsfw/ahegao"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      case "pussyanime":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (!isNsfw) return env(mensagem[0].nsfw);
        res = await fetchJson(
          "https://janbot-api.herokuapp.com/api/nsfw/pussy"
        );
        env(mensagem[0].espere);
        conn.sendMessage(
          from,
          {
            image: { url: res.result },
            caption: `Aperte o botão a baixo para mais um ${command}.`,
            buttons: [
              {
                buttonId: `${prefix}hentai`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          },
          { quoted: whatsapp }
        );
        break;

      //FIM
      //PESQUISAR

      case "jogo":
      case "gamer":
        if (!texto)
          return env(
            `Digite o nome do jogo, pra mim pesquisar!\nExemplo: ${
              prefix + command
            } Gta V`
          );
        env("Pesquisando jogo...");
        phaticusthiccy
          .system_requirements(`${texto}`)
          .then(async (res) => {
            //envJSON(data)
            let dadosjogo = `\t\t\t\t*${texto}*

*Nome:* ${res.game.name}
*Lançamento:* ${res.game.release_date}
*Desenvolvedora:* ${res.game.developer}
*Editora:* ${res.game.publisher}
*Genero:* ${res.game.genre}

*- Requisitos Mínimos*

*CPU:* ${res.system_requirements.minimum.cpu}
*GPU:* ${res.system_requirements.minimum.gpu}
*RAM:* ${res.system_requirements.minimum.ram}
*HDD:* ${res.system_requirements.minimum.hdd}
*DirectX:* ${res.system_requirements.minimum.directx}
*OS:* ${res.system_requirements.minimum.os}

*- Requisitos Recomendados*

*CPU:* ${res.system_requirements.recommended.cpu}
*GPU:* ${res.system_requirements.recommended.gpu}
*RAM:* ${res.system_requirements.recommended.ram}
*HDD:* ${res.system_requirements.recommended.hdd}
*DirectX:* ${res.system_requirements.recommended.directx}
*OS:* ${res.system_requirements.recommended.os}

*- REVIEWS SOBRE:*

*Popularidade:* ${res.reviews.popularity}
*Gráficos:* ${res.reviews.graphics}
*Design:* ${res.reviews.design}
*GamePlay:* ${res.reviews.gameplay}
*Som:* ${res.reviews.sound}
*Música:* ${res.reviews.music}
*Inovações:* ${res.reviews.innovations}
*Geral:* ${res.reviews.overall}

`;
            conn.sendMessage(
              from,
              { image: { url: res.game.avatar }, caption: dadosjogo },
              { quoted: mek }
            );
          })
          .catch((e) => {
            env("Jogo não encontrando.");
            console.log(e);
          });
        break;
      case "google":
      case "google-it":
      case "googleit":
        if (!texto) return env("Digite o tema da pesquisar pra pesquisar.");
        googleIt({ query: texto })
          .then((results) => {
            let gogl = `🔎 ⟪ *${texto}* ⟫ 🔍\n\n`;

            for (let { title, link, snippet } of results) {
              gogl += `Titulo: *${title}*\n\nLink: ${link}\n\n*Snippet:* ${snippet}\n\n──────────────\n\n`;
            }
            env(gogl);
          })
          .catch((e) => {
            env(mensagem[0].erro);
            console.log("❌ Erro ao pesquisa. ❌");
          });
        break;

      case "achar":
      case "gis":
        if (!texto)
          return env("Digite o tema da pesquisar pra pesquisar a imagem.");
        gis(texto, logResults);

        function logResults(error, results) {
          if (error) {
            console.log(error);
            env("❌ Erro ao pesquisar. ❌");
          } else {
            conn.sendMessage(
              from,
              { image: { url: results[0].url }, caption: texto },
              { quoted: mek }
            );
          }
        }
        break;
      case "igstalk":
        if (!texto) return env("Onde está o nome do usuário?");
        ig.fetchUser(texto).then((res) => {
          //envJson(res);
          let inffoinsta = `*Nome:* ${res.username}\n*Apelidos:* ${
            res.fullname
          }\n*ID do Perfil:* ${res.id}\n*Biografia:* ${
            res.biography
          }\n*Privado:* ${res.is_private}\n*Verificado:* ${
            res.is_verified
          }\n*Seguidores:* ${res.followers}\n*Seguido:* ${
            res.following
          }\n*Postagens:* ${res.post_count}\n*IGTV:* ${
            res.total_igtv_videos
          }\n*Conta comercial:* ${res.is_business}\n*Email:* ${
            res.public_email || "Não possui"
          }\n*Número:* ${res.contact_phone_number || "Não possui"}`;
          conn.sendMessage(
            from,
            {
              image: { url: res.hd_profile_pic_url_info.url },
              caption: inffoinsta,
              footer: "Link do perfil no botão abaixo:",
              templateButtons: [
                {
                  index: 1,
                  urlButton: {
                    displayText: "Link do Perfil",
                    url: `https://www.instagram.com/${res.username}/`,
                  },
                },
              ],
            },
            { quoted: mek }
          );
        });
        break;
      case "celular":
        if (!texto)
          return env(
            `Coloque na frente do comando o celular que você desejar buscar.\nExemplo: ${
              prefix + command
            } Moto G 100`
          );
        env("Estou buscando o dispositivo...");
        anu = await fetchJson(
          `https://api-yogipw.herokuapp.com/api/search/gsmarena?query=${texto}`
        );
        pinga = ` 
╭────────⟨ *FICHA TÉCNICA* ⟩────────╮
│╭──
│✏️ Título: ${anu.judul}
│🗂️ Armazenamento: ${anu.storage}
│⚙️ Memória Ram: ${anu.ram}
│📟 Hardware do celular: ${anu.chipset}
│📷 Resolução da câmera: ${anu.pixel}
│📹 Resolução do video: ${anu.videoPixel}
│🔄 Última atualização: ${anu.rilis}
│📱 Tamanho do celular: ${anu.ukuran}
│❕ Versão: ${anu.type}
│📲 Tela: ${anu.display}
│📳 Polegada: ${anu.inchi}
│🔋 Bateria: ${anu.batrai}
│✳️ Tipo da bateria: ${anu.merek_batre}
│╰──
╰──────────────────────╯
`;
        conn.sendMessage(
          from,
          { image: { url: anu.thumb }, quoted: mek, caption: pinga },
          { quoted: mek }
        );
        break;

      case "traduzir":
        if (args.length < 1)
          return env(`Cade o ip? exemplo ${prefix}ip da pessoa`);
        teks = body.slice(10);
        anu = await fetchJson(
          `https://docs-jojo.herokuapp.com/api/translate?text=${teks}&from=id&to=pt`
        );
        env(anu.translated_text);
        break;
      case "ip":
        if (args.length < 1)
          return env(`Cade o ip? exemplo ${prefix} 11414216938 `);
        teks = body.slice(4);
        env("*Estou fazendo, se der erro tente novamente ✓*");
        anu = await fetchJson(
          `https://mnazria.herokuapp.com/api/check?ip=${teks}`
        );
        hasil = ` *🔍CONSULTA REALIZADA🔍* 
				    
				      ➸ *CIDADE:* quer sequestra a pessoa?
				      ➸ *Latitude* : ${anu.latitude}
				      ➸ *Longtitude* : ${anu.longitude}
				      ➸ *REGIÃO* : ${anu.region_name}
				      ➸ *UF* : ${anu.region_code}
				      ➸ *IP* : ${anu.ip}
				      ➸ *TIPO* : ${anu.type}
				      ➸ *CEP* : ${anu.zip}
				      ➸ *LOCALIDADE* : ${anu.geoname_id}
				      ➸ *CAPITAL* : ${anu.capital}
				      ➸ *DDD* : ${anu.calling_code}
				      ➸ *PAÍS* : ${anu.country_flag_emoji}`;
        env(hasil);
        break;
      case "cep":
        if (args.length < 1)
          return env("digite o cep que deseja buscar Exemplo: 082*****");
        cep = body.slice(4);
        hehe = await fetchJson(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (hehe.error) return env(hehe.error);
        ccg = ` INFORMAÇÕES DO CEP
  ‣ Cep: ${hehe.cep}
  ‣ Estado: ${hehe.state}
  ‣ Cidade: ${hehe.city}
  Rua : ${hehe.street}`;
        env(ccg);
        break;
      case "ddd":
        if (args.length < 1)
          return env(
            `Digite o ddd na frente do comando.\nExemplo: ${
              command + prefix
            } 77`
          );
        dddd = body.slice(5);
        if (isNaN(dddd)) return env("O DDD tem que está em número...");
        if (dddd.length > 2)
          return env("O máximo de um DDD Brasíleiro e 2 número.");
        let didd = await fetchJson(
          `https://brasilapi.com.br/api/ddd/v1/${dddd}`
        );
        if (didd.error) return env("Não encontrei o DDD na minha Database.");
        var result = `╭──────────────╮\n│ *Estado:* ${didd.state}\n│ *Cidades usando DDD:* ${dddd}\n╞─────╮ ▽ ╭──────╯\n│\n`;
        for (i = didd.cities.length - 1; i > 0; i--) {
          result += `│ ${didd.cities[i]}\n`;
        }
        result += `│\n│ *Total de Cidades:* ${didd.cities.length}\n╰──────────────╯`;
        env(result);
        break;
      case "cnpj":
        if (args.length < 1)
          return env(
            `Coloque o número do cnpj na frente do comando\nExemplo: ${
              prefix + command
            } 59291534000167`
          );
        cnpj = body.slice(6);
        if (isNaN(cnpj))
          return env("O cnpj precisa estar no formato de número");
        res = await fetchJson(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        cnpj = `
CONSULTA CNPJ 👨‍💻

 ➸ *ATIVIDADE PRINCIPAL:* ${res.atividade_principal}
 ➸ *DATA SITUAÇÃO:* ${res.data_situacao}
 ➸ *TIPO:* ${res.tipo}
 ➸ *NOME:* ${res.nome}
 ➸ *UF:* ${res.uf}
 ➸ *TELEFONE:* ${res.telefone}
 ➸ *SITUAÇÃO:* ${res.situacao}
 ➸ *BAIRRO:* ${res.bairro} 
 ➸ *RUA:* ${res.logradouro}
 ➸ *NÚMERO:* ${res.numero}
 ➸ *CEP :* ${res.cep}
 ➸ *MUNICÍPIO:* ${res.municipio}
 ➸ *PORTE:* ${res.porte}
 ➸ *ABERTURA:* ${res.abertura}
 ➸ *NATUREZA JURÍDICA:* ${res.natureza_juridica}
 ➸ *FANTASIA:* ${res.fantasia}
 ➸ *CNPJ:* ${res.cnpj}
 ➸ *ÚLTIMA ATUALIZAÇÃO:* ${res.ultima_atualizacao}
 ➸ *STATUS:* ${res.status}
 ➸ *COMPLEMENTO:* ${res.complemento}
 ➸ *EMAIL:* ${res.email}`;
        if (res.Erro)
          return env(`Não achei nenhum resultado sobre o cnpj: ${teks}!`);
        env(cnpj);
        break;
      case "github":
        if (args.length < 1)
          return env(
            `Coloque o nome do perfil na frente do comando\nExemplo: ${
              prefix + command
            } coelho`
          );
        perfil = body.slice(8);
        anu = await fetchJson(
          `https://www.luc4rio-rest-api.tk/api/social/github?nomedeusuario=${perfil}`
        );
        GitHub = `🏷️ Nome : ${anu.Nome_De_Usuario}\n📆 Criada em : *${anu.Criada_Em}*\n💫 Ultima atualização : *${anu.Ultima_Atualizacao}*\n👤 Seguidores : *${anu.Total_De_Seguidores}*\n👥 Total de Repositorios : *${anu.Total_De_Seguidores}*\n🌍 Seguindo : *${anu.Total_Seguindo} Pessoas*\n📊 Seguidores : \n*${anu.Link_De_Seguidores}*\n📁 Repositório : \n*${anu.Link_Do_Repositorios}*`;
        if (anu.Erro)
          return env(`Não achei nenhum resultado sobre: ${perfil}!`);
        env(GitHub);
        break;
      case "wikipedia":
        teks = body.slice(11);
        res = await fetchJson(
          `https://www.luc4rio-rest-api.tk/api/educacional/wikipedia?pergunta=${teks}`
        );
        Wikipedia = `${res.Resultado}`;
        if (res.Erro) return env(`Não achei nenhum resultado sobre: ${teks}!`);
        env(Wikipedia);
        break;
      //FIM
      //DONWLOADS
        case 'ytsearch':
          case 'ytsrc':
          if (args.length < 1) return env(`Exemplo:\n${command} A vitória chegou`)
          async function ytsrcp() {
          let plistS = []
          let ppliet = await yts(q) 
          for(let a of ppliet.all) {
          /plistS.push({title: a.title, description: `Tipo: Audio > Canal: ${a.author.name}\n Duração: ${a.timestamp}`, rowId: `${prefix}down_a ${a.url}`}, {title: a.title, description: `Tipo: Video > Canal: ${a.author.name}\n Duração: ${a.timestamp}`, rowId: `${prefix}down_v ${a.url}`})/
          plistS.push({title: a.title, description: `Canal: ${a.author.name}\nDuração: ${a.timestamp}`, rowId: `${prefix}ytmp3 ${a.url}`})
          }
          listMessage = {
          text: `Resultados sobre: ${q}`,
          footerText: `ASHLEY-MD`,
          buttonText: "Clique aqui!",
          sections: [{
          title: "Resultado da pesquisa:", 
          rows: plistS
          }
          ]
          }
          conn.sendMessage(from, listMessage)
          }
          ytsrcp().catch(e => {
          env2("Ocorreu um erro!", "❌")
          console.log(e)
          })
          break

          case 'play':
            if (!isPremium) return env("vc nn e Premium;-;");
            if(!q) return env(`coloque o nome da musica na frente do comando.., se não mandar o yt privou o video..`)
            res = await yts(q)
            if(res.all[0].timestamp.length >= 7) return reply("Desculpe, este video ou audio é muito grande, não poderei realizar este pedido, peça outra música abaixo de uma hora.")
            env('espere...')
            bla = `Encontreiiii Patrão ta ai\n\nTitulo: ${res.all[0].title}\n\n📉 Visualizações: ${res.all[0].views}\n\n⏰ Tempo: ${res.all[0].timestamp}\n\n🔎 Canal: ${res.all[0].author.name}\n`
            sendBimg(from, `${res.all[0].image}`, bla, BotName, [
            {buttonId: `${prefix}down_a ${res.all[0].url}`, buttonText: {displayText: `𝐀𝐮𝐝𝐢𝐨🎵`}, type: 1}, {buttonId: `${prefix}down_v ${res.all[0].url}`, buttonText: {displayText: `𝐕𝐢𝐝𝐞𝐨 📹`}, type: 1}], mek)
            
            break 
             
            case 'twitter':
              if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            if(!q.includes("twitter")) return env(`coloque o link há frente do comando!`)
            sendBtext(from, "✔️ Download De Vídeo / Audio [ TWITTER ]\nEscolha uma opção que deseja baixar.", `☂️`, [
            {buttonId: `${prefix}down_v ${q}`, buttonText: {displayText: `🎥 Video`}, type: 1},
            {buttonId: `${prefix}down_a ${q}`, buttonText: {displayText: `🎵 Audio`}, type: 1}], mek)
          
            break 
            
            case 'facebook':
              if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            if(!q.includes("fb.watch")) return env(`coloque o link há frente do comando!`)
            sendBtext(from, "✔️ Download De Vídeo / Audio [ FACEBOOK ]\nEscolha uma opção que deseja.", `☂️`, [
            {buttonId: `${prefix}down_v ${q}`, buttonText: {displayText: `🎥 Video`}, type: 1},
            {buttonId: `${prefix}down_a ${q}`, buttonText: {displayText: `🎵 Audio`}, type: 1}], mek)
           
            break 
            
            case 'tiktok':  case 'tk':
              if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            if(!q.includes("tiktok")) return env(`coloque o link há frente do comando!`)
            sendBtext(from, "✔️ Download De Vídeo / Audio [ TIKTOK ]\nEscolha uma opção que deseja.", `☂️`, [
            {buttonId: `${prefix}down_v ${q}`, buttonText: {displayText: `🎥 Video`}, type: 1},
            {buttonId: `${prefix}down_a ${q}`, buttonText: {displayText: `🎵 Audio`}, type: 1}], mek)
            break 
            case 'instagram':
            case 'instadw':  
            if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            if(!q.includes("instagram")) return env(`Ops, insira o link, só baixo vídeos / audios do ${command} com link`)
            sendBtext(from, "✔️ Download De Vídeo / Audio [ INSTAGRAM ]\nEscolha uma opção que deseja.", `☂️`, [
            {buttonId: `${prefix}down_v ${q}`, buttonText: {displayText: `🎥 Video`}, type: 1},
            {buttonId: `${prefix}down_a ${q}`, buttonText: {displayText: `🎵 Audio`}, type: 1}], mek)
           
            break 
            
            case 'ytmp3':
            case 'down_a':
            case 'face_audio':
            case 'tiktok_audio':
            case 'insta_audio':
            case 'twitter_audio':
            case 'play_audio':
              if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            try {
            qd = args.join(" ")
            if(!qd) return
            if(qd.includes("facebook")) return env("só baixa no formato fb.watch")
            var res = await yts(q)
            if(qd.includes("youtu") && !qd.includes("share")) {
            if(res.all[0].timestamp.length >= 7) return env("esse video/audio é muito grande desculpe ai :(")
            }
            if(command === "play_audio") {
            var qd = res.all[0].url
            }
            conn.sendMessage(from, {audio: {url:`http://aleatoryapi.herokuapp.com/api/download/?url=${qd}&apikey=${keyale}`}, mimetype: 'audio/mp4',contextInfo: {
            externalAdReply: {
            title: `${res.all[0].title}`,
            body: "Ta ai a musiquinha patrão",
            mediaType: 2,
            thumbnail: await(await fetch(res.all[0].image)).buffer(),
            mediaUrl: `${qd}`,
            sourceUrl: `${qd}`,
            }
            },
            quoted: mek
            })
            } catch (e) {
            if(String(e).includes(keyale)) {
            console.log("desculpe o server caiu desse download :(")   
            } else {
            console.log(e)
            env('falhou :(')
            }}
            break
            
            case 'ytmp4':
            case 'down_v':
            case 'face_video': 
            case 'tiktok_video':  
            case 'insta_video':
            case 'twitter_video':
            case 'play_video':
              if (!isPremium && !isDono) return env("vc nn e Premium;-;");
            try {
            var qd = args.join(" ")
            if(!qd) return
            if(qd.includes("facebook")) return reply("Só está baixando no formato fb.watch")
            var res = await yts(q)
            if(qd.includes("youtu") && !qd.includes("share")) {
            if(res.all[0].timestamp.length >= 7) return reply("esse video/audio é muito grande desculpe ai :(")
            }
            if(command === "play_video") {
            var qd = res.all[0].url
            var nome = res.all[0].title
            }
            reply(enviar.espere)
            conn.sendMessage(from, {video: {url:`http://aleatoryapi.herokuapp.com/api/download/?url=${qd}&apikey=${keyale}`}, mimetype: 'video/mp4',contextInfo: {
            externalAdReply: {
            title: `${nome}`,
            body: "Ta ai o videozinho patrão ^^",
            mediaType: 2,
            mediaUrl: `${qd}`,
            sourceUrl: `${qd}`,
            }
            },
            quoted: selo
            }).catch(e => {
            console.log(e)
            reply("Error")
            })
            } catch (e) {
            if(String(e).includes(keyale)) {
            console.log("desculpe o server caiu desse download :(")   
            } else {
            console.log(e)
            reply('falhou :(')
            }
            }
            break
            
      case "xvideos":
        if (!isPremium && isDono) return env("vc nn e Premium;-;");
        if (args.length < 1)
          return env(
            `Coloque o título do vídeo na frente do comando\nExemplo: ${
              prefix + command
            } Família sacana`
          );
        teks = body.slice(9);
        res = await fetchJson(
          `https://apis-carlos.herokuapp.com/api/xvideos?apikey=carlos&option=search&text=${teks}`
        );
        var resultFinal = "  *_PESQUISAS ENCONTRADAS_*\n\n";
        for (let i of res.result) {
          resultFinal += `   *_LINK E TITULO DAS PEQUISAS ABAIXO_*\n\n*Titulo →* ${i.title}\n*Link →* ${i.url}\n\n`;
        }
        console.log(res);
        env(resultFinal);
        break;
      //GRUPO
      case "rankgado":
      case "rankgados":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🐂 Rank dos mais gados do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🐂❧ @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "ranklindo":
      case "ranklindos":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🤤 Rank dos mais lindos do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🤤 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankbaiano":
      case "rankbaianos":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🛌 Rank dos mais baianos do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🛌 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankgay":
      case "rankgays":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🏳️‍🌈 Rank dos mais gays do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🏳️‍🌈 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "ranknazista":
      case "ranknazistas":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🇩🇪Rank dos mais nazistas do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🇩🇪 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankgostoso":
      case "rankgostosos":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "😋Rank dos mais gostosos do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `😋 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankfeio":
      case "rankfeios":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🤮Rank dos mais feios do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🤮 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankcorno":
      case "rankcornos":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🐂Rank dos mais gados do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🐂 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "rankmacaco":
      case "rankmacacos":
        if (!isGroup) return env("somente em grupo");
        try {
          var ddr = [];
          ret = "🐒Rank dos mais gados do grupo \n\n";
          for (i = 0; i < 5; i++) {
            r = Math.floor(
              Math.random() * groupMetadata.participants.length + 0
            );
            ret += `🐒 @${groupMembers[r].id.split("@")[0]}\n`;
            ddr.push(groupMembers[r].id);
          }
          conn.sendMessage(
            from,
            {
              text: ret.trim(),
              mentions: ddr,
              buttons: [
                {
                  buttonId: `${prefix + command}`,
                  buttonText: { displayText: "NEXT RANK ☰" },
                  type: 1,
                },
              ],
              headerType: 4,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.log(e);
          env("Deu erro, tente novamente :/");
        }
        break;
      case "morte":
        var idazin = `${Math.floor(Math.random() * 110)}`;
        var idade = idazin;
        var teks = body.slice(7);
        if (teks.length > 15)
          return env(
            `Se liga, esse nome nem existe.... Mais você morre aos ${idazin}`
          );
        if (args.length < 1)
          return env(`Pessoas com esse nome: ${pushname}
Tendem a morrer aos ${idade} anos de Idade.`);
        var pinga = `Pessoas com esse nome: ${teks}
Tendem a morrer aos ${idade} anos de Idade.`;
        env(pinga);
        break;
      case "gado":
      case "gada":
        if (args.length < 1) return env("marque seu amigo ou sua amiga com @");
        gadin = body.slice(6);
        let chifg = [];
        const chifr = [
          "ultra extreme gado",
          "Gado-Master",
          "Gado-Rei",
          "Gado",
          "Escravo-ceta",
          "Escravo-ceta Maximo",
          "Gacorno?",
          "Jogador De Forno Livre<3",
          "Mestre Do Frifai<3<3",
          "Gado-Manso",
          "Gado-Conformado",
          "Gado-Incubado",
          "Gado Deus",
          "Mestre dos Gados",
          "Topa tudo por buceta",
          "Gado Comum",
          "Mini Gadinho",
          "Gado Iniciante",
          "Gado Basico",
          "Gado Intermediario",
          "Gado Avançado",
          "Gado Profisional",
          "Gado Mestre",
          "Gado Chifrudo",
          "Corno Conformado",
          "Corno HiperChifrudo",
          "Chifrudo Deus",
          "Mestre dos Chifrudos",
        ];
        const crifrudo = chifr[Math.floor(Math.random() * chifr.length)];
        let chif = `qual e a porcentagem dele de boi muhhh: ${gadin} \n\nA porcentagem de gado dele🐂: ${crifrudo}`;
        conn.sendMessage(from, { text: chif, mentions: [chifg] });
        break;
      case "gay":
        if (body.slice(5).trim() == "")
          env(`marque alguém usando @\nExemplo: ${prefix + command} @`);
        gadin = body.slice(5);
        let chiufg = [];
        const ti = [
          "4",
          "9",
          "17",
          "28",
          "34",
          "48",
          "59",
          "62",
          "74",
          "83",
          "97",
          "100",
          "29",
          "94",
          "75",
          "82",
          "41",
          "39",
        ];
        const kl = ti[Math.floor(Math.random() * ti.length)];
        pinga = `Qual e porcentagem de gay dele: ${gadin}\n\nA porcentagem de Zé baitola dele e: ${kl}%`;
        conn.sendMessage(from, { text: pinga, mentions: [gadin] });
        break;
      case "pau":
      case "stick":
        randomp = `${Math.floor(Math.random() * 35)}`;
        const tamanho = randomp;
        if (tamanho < 13) {
          pp = "só a fimose";
        } else if (tamanho == 13) {
          pp = "passou da média😳";
        } else if (tamanho == 14) {
          pp = "passou da média😳";
        } else if (tamanho == 15) {
          pp = "eita, vai pegar manga?";
        } else if (tamanho == 16) {
          pp = "eita, vai pegar manga?";
        } else if (tamanho == 17) {
          pp = "calma man, a mina não é um poço😳";
        } else if (tamanho == 18) {
          pp = "calma man, a mina não é um poço😳";
        } else if (tamanho == 19) {
          pp = "calma man, a mina não é um poço😳";
        } else if (tamanho == 20) {
          pp = "você tem um poste no meio das pernas";
        } else if (tamanho == 21) {
          pp = "você tem um poste no meio das pernas";
        } else if (tamanho == 22) {
          pp = "você tem um poste no meio das pernas";
        } else if (tamanho == 23) {
          pp = "você tem um poste no meio das pernas";
        } else if (tamanho == 24) {
          pp = "você tem um poste no meio das pernas";
        } else if (tamanho > 25) {
          pp = "vai procurar petróleo com isso?";
        }
        hasil = `Seu pau tem ${randomp}cm\n\n${pp}`;
        env(hasil);
        break;
      case "chance":
        if (args.length < 1)
          return env(
            `Coloque deseja sabe na frente do comando\nExemplo de como se usar ${
              prefix + command
            } eu vou ser rico?`
          );
        jide = [];
        mentions: jids;
        teks = body.slice(8);
        var tii = [
          "4",
          "9",
          "17",
          "28",
          "34",
          "48",
          "59",
          "62",
          "74",
          "83",
          "97",
          "100",
          "29",
          "94",
          "75",
          "82",
          "41",
          "39",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
        ];
        var kkll = tii[Math.floor(Math.random() * tii.length)];
        pkt = `
A chance de ${teks}

A chance disso acontece e: ${kkll}%`;
        conn.sendMessage(from, { text: pkt, mentions: jids }, { quoted: mek });
        break;
      case "beijar":
        if (!q) return env('mensione a frente do comando a pessoa')
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("marque uma pessoa com @");
        if (!isGroup) return env("somente em grupo");
        var beijar = ["beijar", "beijar2", "beijar3"];
        var beijaar = beijar[Math.floor(Math.random() * beijar.length)];
        var num = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        var pinga = `Ohw mds @${sender.split("@")[0]} deu um beijinho no @${
          num.split("@")[0]
        }😍❤`;
        await conn.sendMessage(
          from,
          {
            video: fs.readFileSync(`./complement/videos/beijar/${beijaar}.mp4`),
            caption: pinga,
            gifPlayback: true,
          },
          { quoted: mek }
        );
        break;
      case "tapa":
      case "slap":
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("marque uma pessoa com @");
        if (!isGroup) return env("somente em grupo");
        var tapaa = ["tapa", "tapa2", "tapa3", "tapa4"];
        var tapa = tapaa[Math.floor(Math.random() * tapaa.length)];
        var num = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        var pinga = `@${sender.split("@")[0]} deu um tapa no @${
          num.split("@")[0]
        }👋🏻`;
        await conn.sendMessage(
          from,
          {
            video: fs.readFileSync(`./complement/videos/tapa/${tapa}.mp4`),
            caption: pinga,
            mentions: [sender],
            gifPlayback: true,
          },
          { quoted: mek }
        );
        break;
      case "abracar":
      case "abraçar":
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("marque uma pessoa com @");
        if (!isGroup) return env("somente em grupo");
        var abracar = ["abracar", "abracar2", "abracar3"];
        var abrac = abracar[Math.floor(Math.random() * abracar.length)];
        var num = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        var pinga = `@${sender.split("@")[0]} 𝐃𝐄𝐔 𝐔𝐌 𝐀𝐁𝐑𝐀𝐂𝐎 𝐍𝐎 @${
          num.split("@")[0]
        } 𝐐𝐔𝐄 𝐅𝐎𝐅𝐎`;
        await conn.sendMessage(
          from,
          {
            video: fs.readFileSync(`./complement/videos/abracar/${abrac}.mp4`),
            caption: pinga,
            gifPlayback: true,
          },
          { quoted: mek }
        );
        break;
      //FIM
      //DINHEIRO
      case "saldo":
        var salldo = checkATMuser(sender);
        const limite = { salldo };
        if (limite < 100000) {
          status = "Classe média";
        } else if (limite == 1000000) {
          status = "Milionário";
        } else if (limite == 1000000000) {
          status = "Bilionário";
        } else if (limite == 100000) {
          status = "Classe pobre";
        }
        pinga = `╭───────────────╮
│ㅤㅤㅤSTATUS BANCÁRIOㅤㅤㅤ│
╞───────────────╯
│
╞➸ 👤Nome: *${pushname}*
╞➸ 📞Número: *${sender.split("@")[0]}*
╞➸ 🔍Situação Bancária: *Regular*
╞➸ 🌐Instituição: *RubyBank*
╞➸ ♦️Saldo disponível: *${salldo}*
│
╰─────────────╯`;
        conn.sendMessage(
          from,
          {
            text: pinga,
            footer: `Caso queira fazer transferência, use o botão a baixo`,
            buttons: [
              {
                buttonId: `${prefix}helptransf`,
                buttonText: { displayText: "FAZER TRANSFERÊNCIA" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "pix":
        if (args.length < 1)
          return env(`Modo certo de se usar ${prefix}transferir @ | valor`);
        buttons = [
          {
            buttonId: `${prefix}saldo`,
            buttonText: { displayText: "Meu Saldo" },
            type: 1,
          },
        ];
        if (!q.includes("|"))
          return env(
            `Faltou por o valor... exemplo de como se usar: ${prefix}transferir @ | 2500\n não esqueça de usar o |`
          );
        const tujuan = q.substring(0, q.indexOf("|") - 1);
        const jumblah = q.substring(q.lastIndexOf("|") + 1);
        if (isNaN(jumblah))
          return await env("O valor precisa está em números...");
        if (jumblah < 50) return env(`transfrência mínima e de 50 rubys`);
        if (checkATMuser(sender) < jumblah)
          return env(
            `Você não tem rubins suficiente para fazer uma transferência, você precisa ter no minímo 1000 de rubi`
          );
        const tujuantf = `${tujuan.replace("@", "")}@s.whatsapp.net`;
        fee = 0.0 * jumblah; //IMPOSTO CADA 1 DE DINHERO, ALMENTA E CAI NA SUA CONTA, TODA VEZ QUÊ ALGUÉM FAZER TRANSFERENCIA
        hasiltf = jumblah - fee;
        addKoinUser(tujuantf, hasiltf);
        confirmATM(sender, jumblah);
        addKoinUser("554497433716@s.whatsapp.net", fee);
        pingaa = `*TRANSFERÊNCIA CONCLUÍDA*
Origem: *${sender.split("@")[0]}*
Destinatário: *${tujuan}*
Valor transferêrido: *${jumblah}*
Instituição: *RubyBank*
Tarifa sobre: *0,00*`;
        conn.sendMessage(
          from,
          {
            text: pingaa,
            footer: `Deseja vê seu saldo atualizado?`,
            buttons: [
              {
                buttonId: `${prefix}saldo`,
                buttonText: { displayText: "CONSULTA SALDO" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "helptransf":
        pingu = `Para fazer uma transferência de rubins para outra pessoa faça o seguinte, exemplo de como se usar: ${prefix}pix @ | 1000\n não esqueça de usar o |`;
        conn.sendMessage(from, { text: pingu }, { quoted: mek });
        break;
      //JOGOS
      case "minerar":
        if (!isGroup) return env("Comando apenas para grupo");
        let minerar = Math.floor(Math.random() * 30);
        let textmi = [
          `Você minerando nas ilhas savitas encontrou ${minerar} rubys!👷⛏️`,
          `Você minerando no seu quintal achou ${minerar} rubys`,
          `Parabéns você achou ${minerar} ruby no quintal da vizinha?;-;`,
          `Você invadiu mina proibida, e quando tava fazendo mineração achou ${minerar} rubys!⛏️`,
          `Você roubou ${minerar} rubys na mina de Minas gerais!👷⛏️💰`,
        ];
        const minerarresp = textmi[Math.floor(Math.random() * textmi.length)];
        addKoinUser(sender, minerar);
        conn.sendMessage(from, { text: minerarresp }, { quoted: mek });
        break;
      case "cavalo":
        if (!isGroup) return env("Comando apenas para grupo");
        dinheiroc = checkATMuser(sender);
        if (args[0] == "")
          return env("especifique a quantidade de Rubys para apostar.");
        if (isNaN(args[0])) return env("para apostar use apenas números.");
        if (dinheiroc < 50)
          return env(
            `desculpe vc ainda não pode apostar😕 somente com 50 Rubys.\n\nseu saldo é de: ${dinheiroc}`
          );
        if (args[0] > dinheiroc)
          return env(
            `você não pode apostar uma quantidade de dinheiro maior do que a quê você tem, e nosso limite de apostas é de *50* Rubys\n\nSeu saldo é de: ${dinheiroc}`
          );
        if (args[0] < 50)
          return env(`o minimo para se apostar é de 50 rubys`, { quoted: mek });
        let fase = Math.floor(Math.random() * 6) + 1;
        let não_ganhou = -args[0];
        let ganhou = fase + parseInt(args[0]);
        if (fase == 1) {
          sendButtonText(
            `☁   ☁    ☀    ☁  ☁️\n` +
              `|           🐎                   |\n` +
              `|      🐎      🐎            |\n` +
              `|🐎                              |\n` +
              `|                      🏇🏼🔴  |\n` +
              `🚩                           🚩`,
            `seu cavalo perdeu: ${não_ganhou} rubys`,
            { quoted: mek }
          );
          addKoinUser(sender, não_ganhou);
        } else if (fase == 2) {
          sendButtonText(
            `☁   ☁    ☀    ☁   ☁\n` +
              `|           🐎               |\n` +
              `|      🐎      🐎           |\n` +
              `| 🐎                         |\n` +
              `|                   🐎       |\n` +
              `🚩                    🏇🏼🔴 🚩`,
            `seu cavalo ganhou: ${ganhou} rubys`,
            { quoted: mek }
          );
          addKoinUser(sender, ganhou);
        } else if (fase == 3) {
          sendButtonText(
            `☁   ☁    ☀    ☁  ☁️\n` +
              `|           🐎                   |\n` +
              `|      🏇🏼🔴     🐎          |\n` +
              `|🐎                              |\n` +
              `|                      🐎  |\n` +
              `🚩                           🚩`,
            `seu cavalo perdeu: ${não_ganhou} rubys`,
            { quoted: mek }
          );
          addKoinUser(sender, não_ganhou);
        } else if (fase == 4) {
          sendButtonText(
            `☁   ☁    ☀    ☁   ☁\n` +
              `|            🐎              |\n` +
              `|       🐎                   |\n` +
              `| 🐎                     🐎 |\n` +
              `|                🐎          |\n` +
              `🚩                 🏇🏼🔴    🚩`,
            `seu cavalo ganhou: ${ganhou} rubys`,
            { quoted: mek }
          );
        } else if (fase == 5) {
          sendButtonText(
            `☁   ☁    ☀    ☁  ☁️\n` +
              `|           🐎                   |\n` +
              `|      🐎      🏇🏼🔴          |\n` +
              `|🐎                              |\n` +
              `|                      🐎  |\n` +
              `🚩                           🚩`,
            `seu cavalo perdeu: ${não_ganhou} rubys`,
            { quoted: mek }
          );
          addKoinUser(sender, não_ganhou);
        } else if (fase == 6) {
          sendButtonText(
            `☁   ☁   ☀   ☁   ☁\n` +
              `|           🐎              |\n` +
              `|      🐎                   |\n` +
              `| 🐎                     🐎 |\n` +
              `|                     🐎     |\n` +
              `🚩            🏇🏼🔴         🚩️`,
            `seu cavalo ganhou: ${ganhou} rubys`,
            { quoted: mek }
          );
          addKoinUser(sender, ganhou);
        }
        break;
      case "apostar":
        if (!isGroup) return env("Comando apenas para grupo");
        const dinheiro = checkATMuser(sender);
        const checkxpr = checkATMuser(sender, dinheiro);
        const quantidader = `50`;
        if (checkxpr <= quantidader)
          return env(
            `desculpe vc ainda não  pode apostar😕 somente com  ${quantidader} de Rubys.\n\nSuas Rubys: ${checkxpr}`
          );
        if (args.length !== 1)
          return env("Especifique a quantidade de Ruby para apostar.");
        if (Number(args[0]) >= checkxpr || Number(args[0]) >= dinheiro)
          return env(
            `Você não pode apostar uma quantidade de dinheiro maior do que a você tem, e nosso limite de apostas é de ${quantidader} dinheiro por vez!\n\nSeu dinheiro: ${checkxpr}`
          );
        if (Number(args[0]) < 50)
          return env(`O minimo para se apostar é de 50 Rubys`);
        if (isNaN(args[0]))
          return env(
            "Para apostar use apenas números, nada de inserir letras, a menos que queira perder todo o XP que tenha."
          );
        const double = Math.floor(Math.random() * 7) + 1;
        const nrolxp = Number(-args[0]);
        const prolxp = double + Number(args[0]);
        if (double == 1) {
          await env(
            `🔪BANG!!!💣\n\nVocê perdeu na roleta-russa, causando uma perca de ${nrolxp} em seu dinheiro.`
          );
          addKoinUser(sender, nrolxp, dinheiro);
          addKoinUser(`${OwnerNumber}@s.whatsapp.net`, prolxp);
        } else if (double == 2) {
          await env(
            `Você Ganhou🥳\nSobreviveu ao tiro e recebeu ${prolxp} Rubys`
          );
          addKoinUser(sender, prolxp, dinheiro);
        } else if (double == 3) {
          await env(
            `Poxa você está sem sorte😓\n\nVocê perdeu ${nrolxp}\não desista continue apostando😎🤙`
          );
          addKoinUser(sender, nrolxp, dinheiro);
          addKoinUser(`${OwnerNumber}@s.whatsapp.net`, prolxp);
        } else if (double == 4) {
          await env(
            `Essa foi por pouco!!😬\n\nVocê consegiu concluir o golpe e ganhou ${prolxp} Rubys`
          );
          addKoinUser(sender, prolxp, dinheiro);
        } else if (double == 5) {
          await env(
            `Você errou o cavalo️\n\nAcabou perdendo ${nrolxp} em seu dinheiro, que tal..apostar mais alto??🤫.`
          );
          addKoinUser(sender, nrolxp, dinheiro);
          addKoinUser(`${OwnerNumber}@s.whatsapp.net`, prolxp);
        } else if (double == 6) {
          await env(
            `🥳Aeeeeee🥳\n\nVocê finalmente ganhou, receba seus ${prolxp} de Rubys🔷️`
          );
          addKoinUser(sender, prolxp, dinheiro);
        }
        break;
      case "jogodavelha":
      case "velha":
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isGame) return env(mensagem[0].game);
        if (fs.existsSync(`./db/tictactoe/db/${from}.json`)) {
          const boardnow = setGame(`${from}`);
          const matrix = boardnow._matrix;
          const chatMove = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
     
[❗] Alguém está jogando no momento...\n\n@${boardnow.X} VS @${boardnow.O}
     
❌ : @${boardnow.X}
⭕ : @${boardnow.O}
     
 Sua vez : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}
     
${matrix[0][0]}  ${matrix[0][1]}  ${matrix[0][2]}
${matrix[1][0]}  ${matrix[1][1]}  ${matrix[1][2]}
${matrix[2][0]}  ${matrix[2][1]}  ${matrix[2][2]}
`;
          mention(chatMove);
          return;
        }
        if (argss.length === 1)
          return env(`*⟅❗⟆ Jogue com Alguem!!!!*
*para inicar a partida : ${prefix + command} @membro do gp*`);
        const boardnow = setGame(`${from}`);
        console.log(`Start Tictactore ${boardnow.session}`);
        boardnow.status = false;
        boardnow.X = sender.replace("@s.whatsapp.net", "");
        boardnow.O = argss[1].replace("@", "");
        fs.writeFileSync(
          `./db/tictactoe/db/${from}.json`,
          JSON.stringify(boardnow, null, 2)
        );
        const strChat = `*『📌ᎬՏᏢᎬᎡᎪΝᎠϴ ϴ ϴᏢϴΝᎬΝͲᎬ⚔️』*

@${sender.replace(
          "@s.whatsapp.net",
          ""
        )} _está te desafiando para uma partida de jogo da velha..._
_[ ${argss[1]} ] Use *『S』* para aceitar ou *『N』* para não aceitar..._
     `;
        mention(strChat);
        break;
      case "resetarvelha":
      case "resetavelha":
      case "rst":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        if (fs.existsSync("./db/tictactoe/db/" + from + ".json")) {
          fs.unlinkSync("./db/tictactoe/db/" + from + ".json");
          env(`Jogo da velha resetado com sucesso nesse grupo!`);
        } else {
          env(`Não a nenhuma sessão em andamento...`);
        }
        break;
      case "resetaki":
        if (!isGame) return env(mensagem[0].game);
        if (
          akinator[0][from] &&
          akinator[0][from].player != sender &&
          !isMemberAdmin &&
          isDono
        )
          return env(
            "*Não é você que está jogando*\n\nOu peça um admin para resetar o akineitor"
          );
        akinator[0][from] = undefined;
        fs.writeFileSync(
          "./db/json/akinator.json",
          JSON.stringify(akinator, null, 2)
        );
        buttons_opts = [
          {
            buttonId: "akinator sim",
            buttonText: { displayText: "Sim" },
            type: 1,
          },
          {
            buttonId: "akinator nao",
            buttonText: { displayText: "Não" },
            type: 1,
          },
        ];
        sendbuttonsMessage = {
          text: `*Jogo reiniciado com sucesso! Deseja jogar outra partida*`,
          footer: "Sim ou não?",
          buttons: buttons_opts,
          headerType: 1,
        };
        conn.sendMessage(from, sendbuttonsMessage);
        break;
      case "respaki":
        if (!mek.message.listResponseMessage) return;
        if (akinator[0][from] && akinator[0][from].player != sender)
          return env("*Não é você que está jogando*");
        if (args.length < 1) return;
        await akinator[0][from].game.step(args[0]);
        if (akinator[0][from].game.progress > 85) {
          await akinator[0][from].game.win();
          teks = `Por acaso seu personagem é ${akinator[0][from].game.answers[0].name}?`;
          buttons_opts = [
            {
              buttonId: `${prefix}finaki sim`,
              buttonText: { displayText: "Sim" },
              type: 1,
            },
            {
              buttonId: `${prefix}finaki nao`,
              buttonText: { displayText: "Não" },
              type: 1,
            },
          ];
          sendbuttonsMessage = {
            image: {
              url: akinator[0][from].game.answers[0].absolute_picture_path,
            },
            caption: `Já sei!\n\n${teks}`,
            footer: "Sim ou não?",
            buttons: buttons_opts,
            headerType: 1,
          };
          conn.sendMessage(from, sendbuttonsMessage);
        } else {
          listMessage = {
            text: akinator[0][from].game.question,
            footer: "Mostrar opções",
            buttonText: "Opções",
            title: "Pergunta",
            sections: [
              {
                title: "Opções",
                rows: [
                  {
                    rowId: `${prefix}respaki 0`,
                    title: "Sim",
                    description: "",
                  },
                  {
                    rowId: `${prefix}respaki 1`,
                    title: "Não",
                    description: "",
                  },
                  {
                    rowId: `${prefix}respaki 2`,
                    title: "Não sei",
                    description: "",
                  },
                  {
                    rowId: `${prefix}respaki 3`,
                    title: "Provavelmente sim",
                    description: "",
                  },
                  {
                    rowId: `${prefix}respaki 4`,
                    title: "Provavelmente não",
                    description: "",
                  },
                ],
              },
            ],
          };
          conn.sendMessage(from, listMessage, { quoted: mek });
        }
        break;
      case "akinator":
        if (!isGame) return env(mensagem[0].game);
        buttons_opts = [
          {
            buttonId: `akinator sim`,
            buttonText: { displayText: "Sim" },
            type: 1,
          },
          {
            buttonId: `akinator nao`,
            buttonText: { displayText: "Não" },
            type: 1,
          },
        ];
        sendbuttonsMessage = {
          text: `Olá, sou o akinator ${pushname}\nDeseja jogar?`,
          footer: "Vamos jogar um jogo?",
          buttons: buttons_opts,
          headerType: 1,
        };
        conn.sendMessage(from, sendbuttonsMessage, { quoted: mek });
        break;
      case "cassino":
      case "slot":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        var sotoy = [
          "🍊 : 🍒 : 🍐",
          "🍒 : 🍓 : 🍊",
          "🍇 : 🍇 : 🍇",
          "🍊 : 🍋 : 🍓",
          "🍓 : 🍒 : 🍐",
          "🍓 : 🍒 : 🍊",
          "🍊 : 🍋 : 🍓",
          "🍐 : 🍒 : 🍋",
          "🍐 : 🍐 : 🍐",
          "🍊 : 🍒 : 🍒",
          "🍓 : 🍓 : 🍇",
          "🍌 : 🍒 : 🍓",
          "🍐 : 🍓 : 🍓",
          "🍊 : 🍋 : 🍒",
          "🍋 : 🍋 : 🍌",
          "🍓 : 🍓 : 🍇",
          "🍓 : 🍐 : 🍇",
          "🍓 : 🍓 : 🍓",
          "🍒 : 🍒 : 🍒",
          "🍌 : 🍌 : 🍌",
        ];
        var somtoy = sotoy[Math.floor(Math.random() * sotoy.length)];
        var cassino = `[ CASSINO DE FRUTA ]\n-----------------\n🍋 : 🍌 : 🍍\n${somtoy}<=====\n🍋 : 🍌 : 🍍\n[  🎰 | SLOTS ]\n\nInformaçoes : Se você pegar 3 iguais significa que você ganhou\n\nExemplo : 🍌 : 🍌 : 🍌<=====`;
        conn.sendMessage(
          from,
          {
            text: cassino,
            footer:
              "Caso você queira jogar novamente, aperte o botão a baixo!.",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Jogar novamente ️" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "cassino2":
      case "slot2":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        var sotou = [
          "🦫 : 🐿️ : 🐓",
          "🐿️ : 🐬 : 🦫",
          "🐇 : 🐇 : 🐇",
          "🦫 : 🦭 : 🐬",
          "🐬 : 🐿️ : 🐓",
          "🐬 : 🐿️ : 🦫",
          "🦫 : 🦭 : 🐬",
          "🐓 : 🐿️ : 🦭",
          "🐓 : 🐓 : 🐓",
          "🦫 : 🐿️ : 🐿️",
          "🐬 : 🐬 : 🐇",
          "🐒 : 🐿️ : 🐬",
          "🐓 : 🐬 : 🐬",
          "🦫 : 🦭 : 🐿️",
          "🦭 : 🦭 : 🐒",
          "🐬 : 🐬 : 🐇",
          "🐬 : 🐓 : 🐇",
          "🐬 : 🐬 : 🐬",
          "🐿️ : 🐿️ : 🐿️",
          "🐒 : 🐒 : 🐒",
        ];
        var somto = sotou[Math.floor(Math.random() * sotou.length)];
        var cassino2 = `[ CASSINO ANIMAL ]\n-----------------\n🦭 : 🐒 : 🐬\n${somto}<=====\n🦭 : 🐒 : 🐬\n[  🎰 | SLOTS ]\n\nInformaçoes : Se você pegar 3 iguais significa que você ganhou\n\nExemplo : 🐒 : 🐒 : 🐒<=====`;
        conn.sendMessage(
          from,
          {
            text: cassino2,
            footer:
              "Caso você queira jogar novamente, aperte o botão a baixo!.",
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "Jogar novamente ️" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "round6":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        jogadorround = `${Math.floor(Math.random() * 456)}`;
        pinga = `Escolha qual forma você quer jogar.`;
        conn.sendMessage(
          from,
          {
            text: pinga,
            footer: `Você e o jogador número: ${jogadorround}`,
            buttons: [
              {
                buttonId: `${prefix}round6_formas`,
                buttonText: { displayText: "☂️" },
                type: 1,
              },
              {
                buttonId: `${prefix}round7_formas`,
                buttonText: { displayText: "⭕" },
                type: 1,
              },
              {
                buttonId: `${prefix}round8_formas`,
                buttonText: { displayText: "⭐" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "round6_formas":
      case "round7_formas":
      case "round8_formas":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        var round6 = [
          `Você quebrou o biscoito e morreu`,
          `Você demorou para entregar seu biscoito e morreu`,
          `Você foi o primeiro a morrer`,
          ` Você foi o último a morrer`,
          `Você não conseguiu entregar o biscoito a tempo, e morreu`,
          `Você entregou o biscoito faltando 5 segundos`,
          `Você foi o primeiro a entregar o biscoito`,
          `Você usou o isqueiro para queimar a agulha e cortar o biscoito e passou`,
          `Você morreu pq demorou para entregar o biscoito`,
        ];
        const round666 = round6[Math.floor(Math.random() * round6.length)];
        pinga = `${round666}\n`;
        conn.sendMessage(
          from,
          {
            text: pinga,
            footer: `Hora do ocorrido:\nDia do acontecimento: ${data}`,
            buttons: [
              {
                buttonId: `${prefix}round6`,
                buttonText: { displayText: "TENTA NOVAMENTE" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "tac":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        var taac = [
          "Tac... Não disparou",
          "Tac... Não disparou,ainda...",
          "Tac💥 Disparou e você morreu",
          "Tac💥Disparou mas a bala pegou de raspão",
          "A arma falhou",
          "Tac... Por pouco que não dispara...",
          "Tac... A arma estava descarregada",
        ];
        const baoo = taac[Math.floor(Math.random() * taac.length)];
        pinga = `${baoo}`;
        conn.sendMessage(
          from,
          {
            text: pinga,
            footer: `Hora do ocorrido: ${hora()},\nDia do acontecimento: ${data}`,
            buttons: [
              {
                buttonId: `${prefix + command}`,
                buttonText: { displayText: "TENTA NOVAMENTE" },
                type: 1,
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "euja":
      case "euja2":
      case "euja3":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        const jaja = [
          "Eu nunca usei o Tinder.",
          "Eu nunca fui expulso da sala de aula.",
          "Eu nunca fiquei preso no elevador.",
          "Eu nunca apareci na TV.",
          "Chupei o pau do amigo achando que era um picolé",
          "Eu nunca corri da polícia.",
          "Eu nunca levei um tapa no rosto.",
          "Eu nunca segurei a mão da pessoa errada na rua.",
          "Eu nunca comi comida que caiu no chão.",
          "Nunca beijei alguém que eu não conhecia.",
          "Eu nunca dei um beijo triplo.",
          "Eu nunca dormi no ônibus e perdi o meu ponto.",
          "Eu nunca vomitei e tive que engolir.",
          "Eu nunca entrei em casa pela janela.",
          "Nunca me senti atraído(a) pelo pai/mãe de algum amigo.",
          "Eu nunca quebrei um osso.",
          "Eu nunca participei de uma briga.",
          "Eu nunca fingi que estava passando mal para matar aula.",
          "Eu nunca fugi de casa.",
          "Eu nunca saí na rua de pijama.",
          "Nunca me apaixonei à primeira vista.",
          "Nunca beijei minha melhor amiga.",
          "Nunca andei de cavalo.",
          "Eu nunca dei um tapa no rosto de alguém.",
          "Eu nunca chorei no transporte público.",
          "Eu nunca tive um vídeo constrangedor postado na internet.",
          "Eu nunca criei uma conta fake nas redes sociais.",
          "Eu nunca tive uma experiência paranormal",
          "Eu nunca passei mais de dois dias sem tomar banho.",
          "Eu nunca olhei o celular de alguém sem que a pessoa soubesse.",
          "Eu nunca me gabei por algo que não fiz.",
          "Eu nunca menti tanto sobre alguma coisa que acreditei que fosse verdade.",
          "Eu nunca fiquei com mais de uma pessoa ao mesmo tempo.",
          "Eu nunca roubei um objeto ou comida de alguma loja, ou mercado",
          "Eu nunca entrei numa festa sem ser convidada",
          "Eu nunca quebrei algo e coloquei a culpa em outra pessoa",
          "Eu nunca desmaiei na rua.",
          "Nunca peguei carona com estranhos.",
          "Eu nunca desmaiei na rua.",
        ];
        var jale = jaja[Math.floor(Math.random() * jaja.length)];
        pinga = `${jale}\n`;
        conn.sendMessage(
          from,
          {
            text: pinga,
            footer: `Verdade acima de todo!`,
            templateButtons: [
              {
                index: 3,
                quickReplyButton: {
                  displayText: "EU JÁ",
                  id: `${prefix}euja`,
                },
              },
              {
                index: 4,
                quickReplyButton: {
                  displayText: "EU NUNCA",
                  id: `${prefix}euja2`,
                },
              },
              {
                index: 5,
                quickReplyButton: {
                  displayText: "N RESPONDE/PRÓXIMA PERGUNTA",
                  id: `${prefix}euja3`,
                },
              },
            ],
          },
          { quoted: mek }
        );
        break;
      case "rr":
        if (!isGame) return env(mensagem[0].game);
        if (!isGroup) return env("Comando apenas para grupo");
        if (!isBotAdm) return env("Bot nao é adm");
        words = [
          "A ARMA ESTAVA DESCARREGADA",
          "O TIRO PASSOU DE RASPÃO",
          "A ARMA FALHOU",
          "A ARMA ESTAVA DESCARREGADA",
          "BOOM VOCÊ MORREU💥",
          "O TIRO PASSOU DE RASPÃO",
          "A ARMA FALHOU",
          "BOOM VOCÊ MORREU💥",
          "A ARMA ESTAVA DESCARREGADA",
          "O TIRO PASSOU DE RASPÃO",
          "A ARMA FALHOU",
          "BOOM VOCÊ MORREU💥",
        ];
        random = words[Math.floor(Math.random() * words.length)];
        if (random == "BOOM VOCÊ MORREU💥") {
          env(random);
          conn.groupParticipantsUpdate(from, [sender], "remove");
          conn.sendMessage(
            owner[0],
            `    [ *_ALERTA_* ]\n\n → esse maluko aqui levou ban no jogo \".rr\"\ncaso ele não volte esse é o numero dele: ${
              sender.split("@")[0]
            }`
          );
        } else {
          env(random);
        }
        break;
      //FIM
      //PLAQUINHA
      case "plaquinha":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (!texto)
          return env(
            `Coloque o nome da plaquinha na frente do comando\nExemplo de como se usar: ${
              prefix + command
            } Toki`
          );
        var sections = [
          {
            title: "Plaquinha",
            rows: [
              {
                title: `Plaquinha  com o nome "${texto}" no peito`,
                rowId: `${prefix}plaqui ${texto}`,
              },
              {
                title: `Plaquinha2 com o nome "${texto}" na bunda`,
                rowId: `${prefix}plaqui2 ${texto}`,
              },
              {
                title: `Plaquinha3 com o nome "${texto}" na bunda`,
                rowId: `${prefix}plaqui3 ${texto}`,
              },
              {
                title: `Plaquinha4 com o nome "${texto}" na bunda`,
                rowId: `${prefix}plaqui4 ${texto}`,
              },
            ],
          },
        ];
        var listMessage = {
          text: "Escolha um tema para sua plaquinha.",
          footer: "Selecione o tema abaixo",
          buttonText: "Escolha o tema da sua plaquinha",
          sections,
        };
        const sendMsg = await conn.sendMessage(from, listMessage);
        break;
      case "plaqui":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (args.length < 1)
          return env(
            `Digite seu nome/nick na frente do comando\nExemplo de como se usar: ${
              prefix + command
            } Joazin`
          );
        teks = body.slice(8);
        env(mensagem[0].espere);
        conn.sendMessage(from, {
          image: {
            url: `https://ubbornag.sirv.com/Screenshot_20210513-151821.png?text.0.text=${teks}&text.0.position.x=-40%25&text.0.position.y=-65%25&text.0.size=30&text.0.color=000000&text.0.opacity=53&text.0.font.family=Shadows%20Into%20Light%20Two&text.0.outline.blur=15`,
          },
          caption: "✓",
        });
        break;
      case "plaqui2":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (args.length < 1)
          return env(
            `Digite seu nome/nick na frente do comando\nExemplo de como se usar: ${
              prefix + command
            } Joazin`
          );
        teks = body.slice(9);
        env(mensagem[0].espere);
        conn.sendMessage(from, {
          image: {
            url: `https://ubbornag.sirv.com/Screenshot_20210513-151821.png?text.0.text=${teks}&text.0.position.x=-40%25&text.0.position.y=-65%25&text.0.size=30&text.0.color=000000&text.0.opacity=53&text.0.font.family=Shadows%20Into%20Light%20Two&text.0.outline.blur=15`,
          },
          caption: "✓",
        });
        break;
      case "plaqui3":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (args.length < 1)
          return env(
            `Digite seu nome/nick na frente do comando\nExemplo de como se usar: ${
              prefix + command
            } Joazin`
          );
        teks = body.slice(9);
        env(mensagem[0].espere);
        conn.sendMessage(from, {
          image: {
            url: `https://clutamac.sirv.com/1011b781-bab1-49e3-89db-ee2c064868fa%20(1).jpg?text.0.text=${teks}&text.0.position.gravity=northwest&text.0.position.x=22%25&text.0.position.y=60%25&text.0.size=18&text.0.color=000000&text.0.opacity=47&text.0.font.family=Roboto%20Mono&text.0.font.style=italic`,
          },
          caption: "✓",
        });
        break;
      case "plaqui4":
        if (!isNsfw) return env(mensagem[0].nsfw);
        if (args.length < 1)
          return env(
            `Digite seu nome/nick na frente do comando\nExemplo de como se usar: ${
              prefix + command
            } Joazin`
          );
        teks = body.slice(9);
        env(mensagem[0].espere);
        conn.sendMessage(from, {
          image: {
            url: `https://rsymenti.sirv.com/IMG-20210724-WA0303.jpg?text.0.text=${teks}&text.0.position.x=-20%25&text.0.position.y=-38%25&text.0.size=30&text.0.color=000000&text.0.opacity=93&text.0.font.family=Rock%20Salt&text.0.outline.color=ff0000&text.0.outline.blur=6&text.0.outline.opacity=73`,
          },
          caption: "✓",
        });
        break;
      //FERRAMENTAS
      case "parimp":
      case "imppar":
        if (!texto) return env("Coloque um numero na frente do comando.");
        if (isNaN(texto)) return env("Coloque somente números.");
        function parimp(n) {
          if (n % 2 == 0) {
            return "O número e *Par*";
          } else {
            return "O número e *Impar*";
          }
        }
        let respi = parimp(texto);
        env(respi);
        break;
      case "reaçao":
      case "reaction":
      case "reagir":
        if (!texto) return env("Qual Emoji você quer reagir na mensagem?");
        if (texto.length < 1) return env("1 emoji apenas");
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("Marque uma mensagem!");
        const reactionMessage = {
          react: {
            text: texto,
            key: {
              remoteJid: from,
              id: mek.message.extendedTextMessage.contextInfo.stanzaId,
              participant:
                mek.message.extendedTextMessage.contextInfo.participant,
            },
          },
        };
        conn.sendMessage(from, reactionMessage);
        break;
      case "fotogb":
        if (!texto) return env("Coloque quantos gigas na foto você quer");
        if (isNaN(texto)) return env("Apenas números.");
        let giguin = texto;
        imagee =
          info.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
        imagee.fileLength = `${giguin}000000000`;
        imagee.caption = "sexo kkk";
        conn.relayMessage(
          from,
          { imageMessage: imagee },
          {
            messageId: require("crypto")
              .randomBytes(6)
              .toString("hex")
              .toUpperCase(),
            additionalAttributes: {},
          }
        );
        break;
      case "audiogb":
        if (!texto) return env("Coloque quantos gigas na foto você quer");
        if (isNaN(texto)) return env("Apenas números.");
        let giiguin = texto;
        audioo =
          info.extendedTextMessage.contextInfo.quotedMessage.audioMessage;
        audioo.fileLength = `${giiguin}000000000`;
        audioo.seconds = 999999999;
        conn.relayMessage(
          from,
          { audioMessage: audioo },
          {
            messageId: require("@adiwajshing/baileys").generateMessageID(),
            additionalAttributes: {},
          }
        );
        break;
      case "cpf":
        const dbcpf = JSON.parse(fs.readFileSync("./db/json/dbcpf.json"));
        cpf = args.join(" ");
        const getcpf = (cpf) => {
          let position = false;
          Object.keys(dbcpf).forEach((i) => {
            if (dbcpf[i].cpf === cpf) {
              position = i;
            }
          });
          if (position !== false) {
            return dbcpf[position];
          }
        };
        getcpf(cpf).then((e) => {
          if (e.erro) return env("cpf não encontrado");
          env(`cpf encontrado nome mãe: ${e.nomeMae}`);
        });
        break;
      case "fakemgsg":
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return env("marque uma pessoa com @");
        if (!texto.includes("|")) return env("use *|* junto ao comando");
        numi = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        var pargi = body.slice(23);
        var msg1i = pargi.split("|")[0];
        var msg2i = pargi.split("|")[1];
        if (msg1i.trim() == "") return env("coloque algo antes do *|*");
        if (msg2i.trim() == "") return env("coloque algo depois do *|*");
        conn.sendMessage(from, msg2i.trim(), MessageType.text, {
          contextInfo: {
            participant: numi,
            quotedMessage: {
              extendedTextMessage: { text: msg1i.trim() },
            },
          },
        });
        addFilter(from);
        break;
      case "fakemsg":
        if (body.slice(9).trim() == "")
          env("Pra quem você quer fazer o fakemsg??");
        [msgbot, msgpe] = body.slice(9).split("|");
        if (!msgbot || !msgpe) return env("Use | ao meio do comando");

        const ta = mek.message.extendedTextMessage.contextInfo.participant;
        let content = {
          key: {
            participant: ta,
          },
          message: {
            conversation: msgbot,
          },
        };
        conn.sendMessage(from, { text: msgpe }, { quoted: content });
        break;
      case "pinterest":
        if (args.length < 1)
          return env(
            `coloque o você deseja pesquisa na frente do comando\nExemplo de como se usar ${
              prefix + command
            } Naruto`
          );
        pesq = body.slice(11);
        {
          env("espere");
          const { pinterest } = require("./lib/scraper");
          anu = await pinterest(texto);
          result = anu[Math.floor(Math.random() * anu.length)];
          conn.sendMessage(from, {
            image: { url: result },
            caption: "✅",
            buttons: [
              {
                buttonId: `${prefix + command} ${pesq}`,
                buttonText: { displayText: "Próxima imagem" },
                type: 1,
              },
            ],
            headerType: 4,
          });
        }
        break;
      case "wallpaper":
        {
          if (!texto) return env("Qual o tema?");
          env("espere um pouquinho");
          piing = "${result.image[2] || result.image[1] || result.image[0]}";
          let { wallpaper } = require("./lib/scraper");
          anu = await wallpaper(texto);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `${prefix + command} ${texto}`,
              buttonText: { displayText: "Próxima imagem" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result.image[0] },
            caption: `Tema : ${result.title}\n Categoria : ${result.type}\n`,
            footer: "Caso queira outra imagem aperte o botão abaixo",
            buttons: buttons,
            headerType: 4,
          };
          conn.sendMessage(from, buttonMessage, { quoted: mek });
        }
        break;
      case "personagem":
        var sections = [
          {
            title: "Plaquinha",
            rows: [
              {
                title: `Naruto Uzumaki`,
                rowId: `${prefix}pinterest Naruto Uzumaki`,
              },
              {
                title: `Sasuke Uchiha`,
                rowId: `${prefix}pinterest Sasuke Uchiha`,
              },
              {
                title: `Sakura Haruno`,
                rowId: `${prefix}pinterest Sakura Haruno`,
              },
              {
                title: `Kakashi Hatake`,
                rowId: `${prefix}pinterest Kakashi Hatakw`,
              },
            ],
          },
        ];
        var listMessage = {
          text: "Escolha um personagem no botão abaixo",
          footer: "Selecione o personagem",
          buttonText: "Escolha um Personagem",
          sections,
        };
        const pesquisin = await conn.sendMessage(from, listMessage);
        break;
      case "semoji":
        if (!texto) return env("Qual emoji?");
        var sections = [
          {
            title: "Emojis:",
            rows: [
              {
                title: `Emoji "${texto}" da Apple.`,
                rowId: `${prefix + "emooji" + " " + texto + "/" + "apple"}`,
              },
              {
                title: `Emoji "${texto}" do Google.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "google"
                }`,
              },
              {
                title: `Emoji "${texto}" da Samsung.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "samsung"
                }`,
              },
              {
                title: `Emoji "${texto}" da Microsoft.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "microsoft"
                }`,
              },
              {
                title: `Emoji "${texto}" do Whatsapp.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "whatsapp"
                }`,
              },
              {
                title: `Emoji "${texto}" do Twitter.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "twitter"
                }`,
              },
              {
                title: `Emoji "${texto}" do Facebook.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "facebook"
                }`,
              },
              {
                title: `Emoji "${texto}" do Joypixels.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "joypixels"
                }`,
              },
              {
                title: `Emoji "${texto}" do Openmoji.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "openmoji"
                }`,
              },
              {
                title: `Emoji "${texto}" do Skype(Emoji Animado).`,
                rowId: `${prefix + "emooji" + " " + texto + "/" + "skype"}`,
              },
              {
                title: `Emoji "${texto}" do Emojidex.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "emojidex"
                }`,
              },
              {
                title: `Emoji "${texto}" do Emojipedia.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "Emojipedia"
                }`,
              },
              {
                title: `Emoji "${texto}" do LG.`,
                rowId: `${prefix + "emooji" + " " + texto + "/" + "lg"}`,
              },
              {
                title: `Emoji "${texto}" do Noto Emoji.`,
                rowId: `${
                  prefix + "emooji" + " " + texto + "/" + "notoemoji"
                }`,
              },
            ],
          },
        ];
        var listMessage = {
          text: "Escolha um tema de figurinha.",
          footer: "Selecione o tema abaixo.",
          buttonText: "Escolha o tema da sua Figurinha.",
          sections,
        };
        const sendemoji = await conn.sendMessage(from, listMessage, {
          quoted: mek,
        });
        break;
      case "emooji":
        if (!q) return env(`Exemplo: ${prefix}emoji ☹️/whatsapp`);
        emot = q.split("/")[0];
        jemot = q.split("/")[1];
        if (jemot == "apple") {
          idemot = 0;
        } else if (jemot == "google") {
          idemot = 1;
        } else if (jemot == "samsung") {
          idemot = 2;
        } else if (jemot == "microsoft") {
          idemot = 3;
        } else if (jemot == "whatsapp") {
          idemot = 4;
        } else if (jemot == "twitter") {
          idemot = 5;
        } else if (jemot == "facebook") {
          idemot = 6;
        } else if (jemot == "skype") {
          idemot = 7;
        } else if (jemot == "joypixels") {
          idemot = 8;
        } else if (jemot == "openmoji") {
          idemot = 9;
        } else if (jemot == "notoemoji") {
          idemot = 10;
        } else if (jemot == "Emojipedia") {
          idemot = 11;
        } else if (jemot == "lg") {
          idemot = 12;
        } else {
          return env(`....`);
        }
        env("perai");
        if (idemot == undefined) return;
        emoji.get(emot).then((emoji) => {
          console.log(emoji.images[idemot]);
          sendStickerFromUrl(from, emoji.images[idemot].url, mek);
        });
        break;
case 'misturar':
  if(!q.includes("+")) return env(`trem ta faltando esse (+), vou te dar um exemplo..\nExemplo: ${prefix+command} 😒+😁`)
  txt = q.replace(" +", "+").replace("+ ", "+").replace(" + ", "+")
  let [emj1, emj2] = txt.split("+")
  try {
      const a = new Date().getTime()
      const downloader = new Downloader({
          url: `https://aleatoryapi.herokuapp.com/api/emojimix?emoj=${encodeURI(emj1)}&emoj2=${encodeURI(emj2)}&apikey=${keyale}`, //If the file name already exists, a new file with the name 200MB1.zip is created.
          directory: "./temp", //This folder will be created, if it doesn't exist.
          fileName: a + ".jpg" //The file name.
      });
      try {
          await downloader.download();
          const fig_enviar = await createSticker(`./temp/${a}.jpg`, descFig)
          conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})
          fs.unlink(`./temp/${a}.jpg`, () => { })
      }  
      catch (error) {
          conn.sendMessage(from, "esse não tem desculpe..");
          fs.unlink(`./temp/${a}.jpg`, () => { })
      }
  } catch (err) {
      console.log(err)
  } 
  break
      case "calcular":
        datas = body.slice(10);
        if (!/\+|÷|×|-/gi.test(datas))
          return env("use os simbolos: + - × ou ÷");
        number1 = datas.split(/\+|÷|×|-/gi)[0].replace(/ /gi, "");
        number2 = datas.split(/\+|÷|×|-/gi)[1].replace(/ /gi, "");
        symbol = datas.match(/\+|×|÷|-/gi)[0];
        if (isNaN(number1) || isNaN(number2)) return env("somente numeros!");
        if (symbol.startsWith("+")) {
          env(parseInt(number1) + parseInt(number2));
        } else if (symbol.startsWith("-")) {
          env(parseInt(number1) - parseInt(number2));
        } else if (symbol.startsWith("×")) {
          env(parseInt(number1) * parseInt(number2));
        } else if (symbol.startsWith("÷")) {
          env(parseInt(number1) / parseInt(number2));
        }
        break;

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
