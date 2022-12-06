const { Location, List, Buttons, LocalAuth, Client, ClientInfo, contactId } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { color } = require('./tools');
const fs = require('fs-extra');
const CFonts = require('cfonts');
let package = require('./package.json')
let {bugs, version} = require('./package.json')
const msgHandler = require('./main');
const { truncateSync } = require('fs');
const cron = require('node-cron')
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
//BANNER PRO BOT

CFonts.say('Toki Bot\nMulti-device ', {
    font: 'tiny',
    align: 'center',
    gradient: ['blue', 'magenta']
  })
  CFonts.say(`'${package.name}' Por @${package.author.name || package.author}`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  //console.log(color('=> Bot carregado com sucesso! Database:', 'yellow'), color(loader.getAllDirFiles('./database').length), color('Livrarias:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Functions:', 'yellow'), color(loader.getAllDirFiles('./function').length))
  //console.log(color('=> Versão do código:', 'yellow'), color(version))
  //console.log(color('=> Bug? ou alguma duvida?:', 'yellow'), color(bugs.url))
  //console.log(color('[DEV]', 'cyan'), color('Bem vindo de volta meu Rei!!', 'magenta'))

const toki = new Client({

    authStrategy: new LocalAuth({
        clientId: 'TokiBot',
    }),
    puppeteer: {
        headless: true,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        args: ["--lang=pt-BR,pt",'--disable-dev-shm-usage']
    }
}
);

toki.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
});

toki.on('authenticated', () => {
    
    console.log(color('[CONEXÃO]'), color('BOT CONECTADO MEU NOBRE', 'blue'))
});

toki.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

toki.on('ready', () => {
    cron.schedule('0 0 * * *', () => {
        const reset = []
        _limit = reset
        console.log('Os limites foram resetados.. hj é um novo dia :)')
        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
    }, {
        scheduled: true,
        timezone: 'America/Sao_Paulo'
    })
});

toki.on('message', async message => {
    msgHandler(toki, message)
})
/*
toki.on('group_join', (notification) => {
    // User has joined or been added to the group.
    console.log('join', notification);
    notification.reply('Um usuário entrou no grupo, bem vindo! ^^');
});

toki.on('group_leave', (notification) => {
    notification.reply('o usuário saiu.. tchau.. :(');
});

*/
toki.on('change_state', state => {
    console.log('CHANGE STATE', state);
});

toki.on('disconnected', (reason) => {
    console.log('toki was logged out', reason);
});


toki.initialize();