const {
  default: makeWASocket,
  DisconnectReason,
  MessageType,
  Presence,
  MessageTypeProto,
  emitGroupParticipantsUpdate,
  MessageOptions,
  Mimetype,
  BufferJSON,
  downloadAndSaveMediaMessage,
  WA_DEFAULT_EPHEMERAL,
  proto,
  WAUrlInfo,
  MediaConnInfo,
  WAContextInfo,
  generateWAMessage,
  areJidsSameUser,
  getContentType,
  useSingleFileAuthState,
  prepareWAMessageMedia,
  delay,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
} = require("@adiwajshing/baileys");

//MÚDULOS
let limit = 50;
const { youtubedl, youtubedlv2, youtubedlv3, merdeka } = require("@bochilteam/scraper");
const fs = require("fs");
const config = require('./config.json')
const P = require("pino");
const fetch = require("node-fetch");
const chalk = require("chalk");
const mimetype = require("mime-types");
const speed = require("performance-now");
const ffmpeg = require("fluent-ffmpeg");
const base64 = require("base-64");
const moment = require("moment-timezone");
const { Aki } = require("aki-api");
const axios = require("axios");
const ms = require("parse-ms");
const request = require("request-promise");
const cheerio = require("cheerio");
const { color } = require('./lib/color');
const toMs = require("ms");
const thiccysapi = require("textmaker-thiccy");
const hx = require("hxz-api");
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
const store = makeInMemoryStore({
  logger: P().child({ level: "debug", stream: "store" }),
});
const { WSF, createSticker } = require("wa-sticker-formatter");
const { exec } = require('child_process')
const Downloader = require("nodejs-file-downloader");
// LIBS

const { validmove, setGame } = require("./db/tictactoe");
const level = require("./lib/level.js");
const webp_mp4 = require("./db/js/webp_mp4.js");
const { getRandom, runtime, formatp, getBuffer } = require("./lib/myfunc");
const { getAdmins, getMembers } = require("./lib/utils");
const { webp2gifFile } = require("./lib/gif22.js");
const ytmate = require('./lib/ytmate')
const tiktok = require("./lib/tiktok.js");
const { data, data2, data3, hora, hora2 } = require("./lib/functions.js");
const {
  addToken,
  removeToken,
  getAllTokens,
  getTokenByNumber,
} = require("./lib/fichas.js");
const { sendVideoAsSticker, sendImageAsSticker } = require('./lib/rename.js');
const { sendVideoAsSticker2, sendImageAsSticker2 } = require('./lib/rename2.js');

//ARQUIVOS JSON

const { state, saveState } = useSingleFileAuthState("auth-info-multi.json");
const bemvindo2 = JSON.parse(fs.readFileSync("./db/json/bemvindo2.json"));
const _level = JSON.parse(fs.readFileSync("./db/json/level.json"));
const simipv = JSON.parse(fs.readFileSync("./db/json/simipv.json"));
const countMessage = JSON.parse(fs.readFileSync("./db/json/countmsg.json"));
const _premium = JSON.parse(fs.readFileSync("./db/json/premium.json"));
const premium = require("./function/premium.js");
const mensagem = JSON.parse(fs.readFileSync("./db/json/menssagem.json"));
const dinheiro = JSON.parse(fs.readFileSync("./db/json/dinheiro.json")); //ONDE FICA ARMAZENADO OS DADOS
const antifake = JSON.parse(fs.readFileSync("./db/json/antifake.json"));
const bye_group = JSON.parse(fs.readFileSync("./db/json/byegp.json"));
const bye_group2 = JSON.parse(fs.readFileSync("./db/json/byegp2.json"));
const welcome_group2 = JSON.parse(fs.readFileSync("./db/json/welcomegp2.json"));
const welcome_group = JSON.parse(fs.readFileSync("./db/json/welcomegp.json"));
const termos = JSON.parse(fs.readFileSync("./db/json/termos.json"));
const welkom = JSON.parse(fs.readFileSync("./db/json/welkom.json"));
const welkom2 = JSON.parse(fs.readFileSync("./db/json/vacilo.json"));
const antilinkgp = JSON.parse(fs.readFileSync("./db/json/antilinkgp.json"));
const antilink = JSON.parse(fs.readFileSync("./db/json/antilink.json"));
// const profissao_group = JSON.parse(fs.readFileSync('./db/json/profissão.json'));
const simi = JSON.parse(fs.readFileSync("./db/json/simi.json"));
const ban = JSON.parse(fs.readFileSync("./db/json/banned.json"));
const akinator = JSON.parse(fs.readFileSync("./db/json/akinator.json"));
const adeuscara = JSON.parse(fs.readFileSync("./db/json/adeuscara.json"));
const antiviewonce = JSON.parse(fs.readFileSync("./db/json/antiviewonce.json"));
const game = JSON.parse(fs.readFileSync("./db/json/game.json"));
const nsfw = JSON.parse(fs.readFileSync("./db/json/nsfw.json"));
const antipala = JSON.parse(fs.readFileSync("./db/json/antipala.json"));

//FIM

//RPG

const nomerpg = JSON.parse(fs.readFileSync("./db/json/nomerpg.json"));
const profissao = JSON.parse(fs.readFileSync("./db/json/profissao.json"));
const rancarpg = JSON.parse(fs.readFileSync("./db/json/rancca.json"));

//PARTE JS

const { convertSticker } = require("./lib/swm.js");

blocked = [];
BotName = "Tomioka-MD";
prefix = ["#", "$", "/", "!", "&", "."];
prefixobot = ["/"];

global.blocked;

const vcard =
  "BEGIN:VCARD\n" + // Formato Vcard
  "VERSION:3.0\n" +
  "FN:Tio Tomioka\n" + // Nome
  "ORG:Criador do Tomioka bot hihi;\n" + // ORGANIZAÇÃO
  "TEL;type=CELL;type=VOICE;waid=554497433716:+55 99743 3716\n" + // NÚMERO
  "END:VCARD";

  const descFig = {
    type: 'full',
    
    pack: `⬔ ۪࣪ 🌼 ׄ₊𝕮𝖗𝖎𝖆𝖉𝖔𝖗:\n⤷   ꪶ͢͢͢𝐓𝐈͢𝚯 𝐓𝚯͢𝐌𝐈͢𝚯𝐊𝜟ꫂ\n\n꒺ ׄ₊👑̷ 𝙁𝙖𝙡𝙖𝙧 𝙘𝙤𝙢 𝙤 𝙩𝙤𝙢𝙞𝙤𝙠𝙖:\n⤷   (44) 99743-3716         `,
    author: `⬔ ۪࣪ ✨ 𝓼𝓲𝓽𝓮:\nlinktr.ee/Tokibot    ↲\n\n꒺ ׄ₊🤖̷ 𝘽𝙊𝙏:\n(44) 99822-0867    ↲`,
    categories: [
    '🌹'
    ]
    }

function connect() {
  const conn = makeWASocket({
    printQRInTerminal: true,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
    auth: state,
  });

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
    function env2(text, emoji){
  
      env(text);
     
      const sendReaction2 = {
         react: {
             text: null, 
             key: mek.key
         }
     }
     const sendReagir2 = conn.sendMessage(from, sendReaction2)
     
     setTimeout(() =>{  const sendReactionn2 = {
         react: {
             text: emoji, 
             key: mek.key
         }
     }
     const sendReagirr2 = conn.sendMessage(from, sendReactionn2) }, 1)
     }
     function env3(text, text3, emoji){
  
      sendButtonText(from, text, text3, {quoted: mek});
     
      const sendReaction3 = {
         react: {
             text: null, 
             key: mek.key
         }
     }
     const sendReagir3 = conn.sendMessage(from, sendReaction3)
     
     setTimeout(() =>{  const sendReactionn3 = {
         react: {
             text: emoji, 
             key: mek.key
         }
     }
     const sendReagirr3 = conn.sendMessage(from, sendReactionn3) }, 1)
     }
    const envJSON = (text) => {
      env(JSON.stringify(text, null, 2));
    };

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
    const owner = ["5544997433716@s.whatsapp.net"];
    const mods = ["554497433716@s.whatsapp.net"];
    const mito = "17144092135@s.whatsapp.net";
    const vini = ["5519983528567@s.whatsapp.net"];
    const akashi = "559291687728@s.whatsapp.net";

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
    const isMito = sender != mito;
    const isAkashi = sender != akashi;
    const isVini = sender != vini;
    const keyale = config.keyale
    const isOwner = owner.indexOf(sender) < 0;
    const isMods = mods.indexOf(sender) < 0;
    const isPremium = premium.checkPremiumUser(sender, _premium);
    const isSimiPv = simipv.includes(sender);
    const isAdmins = isGroup ? getAdmins(groupMembers) : "";
    const isMemberAdmin = isGroup ? isAdmins.indexOf(sender) > -1 : false;
    const isBotAdm = isGroup ? isAdmins.indexOf(botN) > -1 : false;
    const allMembers = isGroup ? getMembers(groupMembers) : [];
    const isWelkom = isGroup ? welkom.includes(from) : false;
    const isWelkom2 = isGroup ? welkom2.includes(from) : true;
    const isAntiPala = isGroup ? antipala.includes(from) : false;
    const isNsfw = isGroup ? nsfw.includes(from) : true;
    const isGame = isGroup ? game.includes(from) : false;
    const isAntifake = isGroup ? antifake.includes(from) : false;
    const isAntiVO = isGroup ? antiviewonce.includes(from) : false;
    const isSimi = isGroup ? simi.includes(from) : false;
    const isLevelingOn = isGroup ? _level.includes(from) : false;
    const isAntiLink = isGroup ? antilink.includes(from) : false;
    const isAntilinkgp = isGroup ? antilinkgp.includes(from) : false;
    const isBanned = ban.includes(sender);
    const isCmd = prefix.indexOf(body.slice(0, 1)) > -1;
    const senderfix = mek.key.fromMe ? tomioka.user.jid : isGroup ? mek.participant : mek.key.remoteJid
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? conn.sendMessage(from, { text: teks.trim(), mentions: memberr })
        : conn.sendMessage(from, { text: teks.trim(), mentions: memberr });
    };
    const createMessageByContent = (id, content) => {
      conn.relayMessage(id, content, {
        messageId: require("@adiwajshing/baileys").generateMessageID(),
        additionalAttributes: {},
      });
    };
    const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase();
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
      

 
  // ENVIAR BOTÃO COM TEXTO
  var sendBtext = async (id, text1, desc1, but = [], vr) => {
  buttonMessage = {
  text: text1,
  footer: desc1,
  buttons: but,
  headerType: 1
  }
  conn.sendMessage(id, buttonMessage, {quoted: vr})
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

    const getFileBuffer = async (mediakey, MediaType) => {
      const stream = await downloadContentFromMessage(mediakey, MediaType);

      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
    };

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

    //===============(APAGA MENSAGEM AUTOMÁTICO)=============\\

    /*if (mek.key.participant == '558183341993@s.whatsapp.net') {
        const key = {
          remoteJid: from,
          fromMe: conn.user.id.replace(/:[0-9]+/gi, '') == mek.key.participant,
          id: mek.key.id,
          participant: mek.key.participant
        };
        conn.sendMessage(from, {delete: key});
      }
    
    /*if (from == '120363043790271792@g.us ') {
        const key = {
          remoteJid: from,
          fromMe: conn.user.id.replace(/:[0-9]+/gi, '') == mek.key.participant,
          id: mek.key.id,
          participant: mek.key.participant
        };
        conn.sendMessage(from, {delete: key});
      }*/

    //===============(AUTO-BAN)=============\\
    const dbids = [];
    for (i = 0; i < adeuscara.length; ++i) {
      dbids.push(adeuscara[i].groupId);
    }
    const isAdeusCara = isGroup && dbids.indexOf(from) >= 0 ? true : false;

    //======================================\\
    letcentralrpg = "120363023849383476@g.us";

    //ARMADURA
    const addProfissaoId = (userId, chatId) => {
      const obj = {
        grupo: chatId,
        pessoa: userId,
        profissao: "Camisa simples",
      };
      profissao.push(obj);
      fs.writeFileSync("./db/json/profissao.json", JSON.stringify(profissao));
    };
    const addProfissao = (userId, chatId, quanto) => {
      let position = false;
      Object.keys(profissao).forEach((i) => {
        if (profissao[i].pessoa === userId && profissao[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        profissao[position].profissao = quanto;
        fs.writeFileSync("./db/json/profissao.json", JSON.stringify(profissao));
      }
    };
    const getProfissao = (userId, chatId) => {
      let position = false;
      Object.keys(profissao).forEach((i) => {
        if (profissao[i].pessoa === userId && profissao[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return profissao[position].profissao;
      }
    };
    const getProfissao2 = (userId, chatId) => {
      let position = false;
      Object.keys(profissao).forEach((i) => {
        if (profissao[i].pessoa === userId && profissao[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return profissao[position];
      }
    };

    if (isGroup && !mek.key.fromMe) {
      cg = getProfissao2(
        sender.includes(":")
          ? sender.split(":")[0] + "@s.whatsapp.net"
          : sender,
        letcentralrpg
      );
      if (cg == undefined)
        addProfissaoId(
          sender.includes(":")
            ? sender.split(":")[0] + "@s.whatsapp.net"
            : sender,
          letcentralrpg
        );
    }

    //NOME
    const addNomerpg = (userId, chatId) => {
      const obj = {
        grupo: chatId,
        pessoa: userId,
        nomerpg: "*Nome:* Desconhecido\n*Idade:* Desconhecida",
      };
      nomerpg.push(obj);
      fs.writeFileSync("./db/json/nomerpg.json", JSON.stringify(nomerpg));
    };
    const addNome = (userId, chatId, quanto) => {
      let position = false;
      Object.keys(nomerpg).forEach((i) => {
        if (nomerpg[i].pessoa === userId && nomerpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        nomerpg[position].nomerpg = quanto;
        fs.writeFileSync("./db/json/nomerpg.json", JSON.stringify(nomerpg));
      }
    };
    const getNome = (userId, chatId) => {
      let position = false;
      Object.keys(nomerpg).forEach((i) => {
        if (nomerpg[i].pessoa === userId && nomerpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return nomerpg[position].nomerpg;
      }
    };
    const getNome2 = (userId, chatId) => {
      let position = false;
      Object.keys(nomerpg).forEach((i) => {
        if (nomerpg[i].pessoa === userId && nomerpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return nomerpg[position];
      }
    };

    if (isGroup && !mek.key.fromMe) {
      cg = getNome2(
        sender.includes(":")
          ? sender.split(":")[0] + "@s.whatsapp.net"
          : sender,
        letcentralrpg
      );
      if (cg == undefined)
        addNomerpg(
          sender.includes(":")
            ? sender.split(":")[0] + "@s.whatsapp.net"
            : sender,
          letcentralrpg
        );
    }

    //RANÇA
    const addRancarpg = (userId, chatId) => {
      const obj = {
        grupo: chatId,
        pessoa: userId,
        rancarpg: "*Rança:* Desconhecido\n*Região:* Desconhecida",
      };
      rancarpg.push(obj);
      fs.writeFileSync("./db/json/rancca.json", JSON.stringify(rancarpg));
    };

    const addRanca = (userId, chatId, quanto) => {
      let position = false;
      Object.keys(rancarpg).forEach((i) => {
        if (rancarpg[i].pessoa === userId && rancarpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        rancarpg[position].rancarpg = quanto;
        fs.writeFileSync("./db/json/rancca.json", JSON.stringify(rancarpg));
      }
    };

    const getRanca = (userId, chatId) => {
      let position = false;
      Object.keys(rancarpg).forEach((i) => {
        if (rancarpg[i].pessoa === userId && rancarpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return rancarpg[position].rancarpg;
      }
    };

    const getRanca2 = (userId, chatId) => {
      let position = false;
      Object.keys(rancarpg).forEach((i) => {
        if (rancarpg[i].pessoa === userId && rancarpg[i].grupo === chatId) {
          position = i;
        }
      });
      if (position !== false) {
        return rancarpg[position];
      }
    };

    if (isGroup && !mek.key.fromMe) {
      cg = getRanca2(
        sender.includes(":")
          ? sender.split(":")[0] + "@s.whatsapp.net"
          : sender,
        letcentralrpg
      );
      if (cg == undefined)
        addRancarpg(
          sender.includes(":")
            ? sender.split(":")[0] + "@s.whatsapp.net"
            : sender,
          letcentralrpg
        );
    }

    //

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
        if (isMemberAdmin && isOwner) return;
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



    //VISU MSG
    //await conn.sendReadReceipt(from, mek.key.participant, [mek.key.id]);

    //=================================\\
    if (!isCmd && !isGroup && !bemvindo2.includes(sender)) {
      var menuzin = `oi... este bot esta offline no momento... por enquanto use esse link para ir no grupo lá eu aviso qual que esta online... :(\n\nlinktr.ee/tokibot`;
      conn.sendMessage(
        from,
        {text: menuzin},
        { quoted: mek }
      );

      bemvindo2.push(sender);
      fs.writeFileSync("./db/json/bemvindo2.json", JSON.stringify(bemvindo2));
    }

     //autofigu
 
     
        if(type === "imageMessage") {
          rane = getRandom('.'+'webp')
          buffimg = await getFileBuffer(mek.message.imageMessage, 'image')
        
  const fig_enviar = await createSticker(buffimg, descFig)
  conn.sendMessage(from, {sticker: fig_enviar}, {quoted: mek})
   
  
        } else if (type === "videoMessage") {
          var pack = `⬔ ۪࣪ 🌼 ׄ₊𝕮𝖗𝖎𝖆𝖉𝖔𝖗:\n⤷   ꪶ͢͢͢𝐓𝐈͢𝚯 𝐓𝚯͢𝐌𝐈͢𝚯𝐊𝜟ꫂ\n\n꒺ ׄ₊👑̷ 𝙁𝙖𝙡𝙖𝙧 𝙘𝙤𝙢 𝙤 𝙩𝙤𝙢𝙞𝙤𝙠𝙖:\n⤷   (44) 99743-3716         `
           var author2 = `⬔ ۪࣪ ✨ 𝓼𝓲𝓽𝓮:\nlinktr.ee/Tokibot    ↲\n\n꒺ ׄ₊🤖̷ 𝘽𝙊𝙏:\n(44) 99822-0867    ↲`
           boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
            owgi = await getFileBuffer(boij, 'video')
           await sendVideoAsSticker2(conn, from, owgi, mek, { packname:pack, author:author2})
          } 
    
    /*********** SIMI PV ***********/

    /*if (!isCmd && !isGroup && !isSimiPv && !simipv.includes(sender)) {
    
    let simii = args.join(" ") 
    let simihpv = await fetchJson(`https://api-sv2.simsimi.net/v2/?text=${simii}&lc=pt&cf=false`)
    env(simihpv.success);
    fs.writeFileSync('./db/json/simipv.json', JSON.stringify(simipv))
    
    if(type == 'imageMessage') return 
    if(type == 'audioMessage') return 
    if(type == 'stickerMessage') return   
    if(mek.key.fromMe) return 
    
    }

    if (from.endsWith('@s.whatsapp.net') && !isCmd) {
      try {
        const res = await fetchJson(`https://api-sv2.simsimi.net/v2/?text=${body}&lc=pt&cf=false`);
        env(res.success);
      } catch (a) {
        conn.sendMessage(owner, { text: `erro no simi ↓\n\n${a.stack}` });
      }
    }
    */

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
