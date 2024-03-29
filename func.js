const fs = require("fs");
const axios = require('axios');
exports.bemvindo2 = JSON.parse(fs.readFileSync("./db/json/bemvindo2.json"));
exports._level = JSON.parse(fs.readFileSync("./db/json/level.json"));
exports.simipv = JSON.parse(fs.readFileSync("./db/json/simipv.json"));
exports.countMessage = JSON.parse(fs.readFileSync("./db/json/countmsg.json"));
exports._premium = JSON.parse(fs.readFileSync("./db/json/premium.json"));
exports.premium = require("./function/premium.js");
exports.mensagem = JSON.parse(fs.readFileSync("./db/json/menssagem.json"));
exports.dinheiro = JSON.parse(fs.readFileSync("./db/json/dinheiro.json")); //ONDE FICA ARMAZENADO OS DADOS
exports.antifake = JSON.parse(fs.readFileSync("./db/json/antifake.json"));
exports.bye_group = JSON.parse(fs.readFileSync("./db/json/byegp.json"));
exports.bye_group2 = JSON.parse(fs.readFileSync("./db/json/byegp2.json"));
exports.welcome_group = JSON.parse(fs.readFileSync("./db/json/welcomegp.json"));
exports.termos = JSON.parse(fs.readFileSync("./db/json/termos.json"));
exports.welkom = JSON.parse(fs.readFileSync("./db/json/welkom.json"));
exports.welkom2 = JSON.parse(fs.readFileSync("./db/json/vacilo.json"));
exports.antilinkgp = JSON.parse(fs.readFileSync("./db/json/antilinkgp.json"));
exports.antilink = JSON.parse(fs.readFileSync("./db/json/antilink.json"));
exports.simi = JSON.parse(fs.readFileSync("./db/json/simi.json"));
exports.akinator = JSON.parse(fs.readFileSync("./db/json/akinator.json"));
exports.adeuscara = JSON.parse(fs.readFileSync("./db/json/adeuscara.json"));
exports.antiviewonce = JSON.parse(fs.readFileSync("./db/json/antiviewonce.json"));
exports.game = JSON.parse(fs.readFileSync("./db/json/game.json"));
exports.nsfw = JSON.parse(fs.readFileSync("./db/json/nsfw.json"));
exports.antipala = JSON.parse(fs.readFileSync("./db/json/antipala.json"));
exports.getBuffer = async (url, opcoes) => {
    try {
    opcoes ? opcoes : {}
    const post = await axios({
    method: "get",
    url,
    headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
    },
    ...opcoes,
    responseType: 'arraybuffer'
    })
    return post.data
    } catch (erro) {
    console.log(`Erro identificado: ${erro}`)
    }
}
