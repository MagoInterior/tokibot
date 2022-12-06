prefix = "/"
exports.espere = () => {
    return `por favor espere...`
}
exports.naoVip = () => {
    return `vc não é vip premium ainda.. para comprar o acesso fale com o dono!\nwa.me/5544997433716`
}
exports.soDono = () => {
    return `só dono`
}
exports.Limit = () => {
    return `Desculpe seu limite acabou por hj agora só amanha!\n\nse quiser fazer ilimitado mande /dono e compre o vip`
}
exports.erroFig = () => {
    return `erro ao fazer a fig mande a midia novamente!`
}
exports.erroFormato = () => {
    return `Formato incorreto!`
}
exports.semRg = () => {
    return `vc não foi registrado no bot ainda! mande o comando ${prefix}rg`
}
exports.tutoFig = () => {
    return `mande a image/video/gif que ele irá fazer automático!`
}
exports.mandarCap = () => {
    return `ai está meu(minha) Jovem!`
}
exports.marcarFt = () => {
    return `Marque a foto ou coloque comando na legenda`
}
exports.mndCerto = () => {
    return `exemplo ${prefix}${q}`
}
exports.prontDono = () => {
    return `Prontinho Papai ^^`
}
exports.cep = (cep, state, city, neighborhood, street) => {
    return `
*── 「 CEP 」 ──*

‣ Cep: ${cep === undefined ? '' : cep}
‣ Estado: ${state === undefined ? '' : state}
‣ Cidade: ${city === undefined ? '' : city}
‣ Bairro: ${neighborhood === undefined ? '' : neighborhood}
‣ Rua: ${street === undefined ? '' : street}


*═══〘 TOKI BOT 〙═══*
`
}
exports.registrar = (nomeUser, idadeUser, temp, idUser) => {
    return `
*── 「 REGISTRO 」 ──*
    
seus dados foram gerados pelo bot!
➸ *NOME*: ${nomeUser}
➸ *IDADE*: ${idadeUser}
➸ *tempo de registro*: ${temp}
➸ *ID*: ${idUser}
obg por se registrar ^^

mande o comando *${prefix}menu* para usar o bot!~
    `
}
exports.marcosPlay = (Play) => {
    return `
*── 「 YOUTUBE 」 ──*

➸ *Titulo*: ${Play[0].judul}
➸ *tamanho*: ${Play[0].size}
➸ *tipo*: ${Play[0].tipe}
➸ *output*: ${Play[0].output}
➸ *qualidade*: ${Play[0].quality}

A mídia está sendo enviada, por favor, aguarde ...
`}
exports.playLista = (pushname, q, TIPO = 'PLAY') => {
    return `*── 「 ${TIPO} 」 ──*
    
    *OIOI ${pushname} ^^*
    *Tema:* ${q}
    
    Escolha qual musica que vc quer que eu baixe..`
}
exports.akinator = (pushname) => {
    return `Olá ${pushname} eu sou o akinator!\nVamos jogar?`
}
exports.menup = (pushname) => {
    return `
Olá ${pushname}!, bem vindo ao menu extenso
do TokiBot-Md :)

╔══ ✧┇ NOVIDADES ┇✧ ══
❗melhores cursos de programação 
com desconto... mande a palavra (cursos)
╠➢ ${prefix}toimg
╠➢ ${prefix}google <texto>
╠➢ ${prefix}attp
╠➢ ${prefix}metadinha
╠➢ ${prefix}ping
╠➢ ${prefix}tomp3
╠➢ ${prefix}figupack
╠➢ ${prefix}akinator
╠➢ ${prefix}misturar
╠➢ ${prefix}ttp
╠➢ ttthelp (jogo da veia)
║
╠══ ❖┇ FIGURINHAS ┇❖ ══
║
╠➢ ${prefix}fig
╠➢ ${prefix}attp
╠➢ ${prefix}s2
╠➢ ${prefix}toimg
╠➢ ${prefix}puto
╠➢ ${prefix}semoji 
║
╠═ ❖┇ RANDOM FIG ┇❖ ══
╠➢ ${prefix}figupack
║
╠══ ✩┇ GRUPO ┇✩ ══
║
╠➢ ${prefix}antilink on|off
╠➢ ${prefix}redefinir
╠➢ ${prefix}marcar <oq vc quiser>
║
╠══ ✩┇ DONO ┇✩ ══
║
╠➢ ${prefix}premium add (numero
╠➢ ${prefix}listpremium
╠➢ ${prefix}limpar
║
╠══ ✩┇ JOGOS ┇✩ ══
║
╠➢ ttthelp (jogo da véia)
╠➢ ${prefix}akinator
║
╠═ 💫┇ PREMIUM ┇💫 ══
║
╠➢ ${prefix}play (mp3)
╠➢ ${prefix}play2 (lista)
╠➢ ${prefix}playv (mp4)
╠➢ ${prefix}playurl (link)
╠➢ ${prefix}playurlv (link)
╠➢ ${prefix}tk (link)
╠➢ ${prefix}take text1|text2
╠➢ ${prefix}ddd (query)
╠➢ ${prefix}cep (query)
╠➢ ${prefix}letra (query)
╠➢ ${prefix}encurtar (link)
║
╠═ ┃ LOGOS PREMIUM ┃ ══
║
╠➢ ${prefix}logos (nome)
`
}
exports.alugar = () => {
    return `╭──────────────╮
    │                PREÇOS 
    ╞─────╮ ▽ ╭─────╯
    │
    │➪ 💰Método de pagamento: PIX
    │
    │➪ 💵R$ 4,00 = VIP (por 7 dias)
    │
    │➪ 💵R$ 6,99 = VIP (por 15 dias)
    │
    │➪ 💵R$ 15,00 = VIP (por 30 dias)
    │
    │➪ 💵R$ 90,00 = VIP (vip anual)
    │
    │➪ 💵R$ 200,00 = VIP (Permanente)
    │
    ╞═⟪ │✅VANTAGENS│✅ ⟫════
    │
    │🔸️comandos de downloads de video e audio do tk sem marca
    │🔸️Acesso a mini games exclusivos.
    │🔸️Acesso a comandos/menus exclusivos.
    │🔸️Acesso ao pv do bot completo
    ╰──────────────`
}
exports.BemVindo = (pushname) => {
    return `_*Olá ${pushname}*_
*Prazer em conhecê-lo(a), me chamo Toki Bot.😊*
_Sou uma inteligência artificial 100% automatizado para ajudar em todo que for possível nessa plataforma._

*Estou a sua disposição o dia todo, 24h horas por dia para te ajudar!*
*APENAS MEMBROM PREMIUM - para ter acesso fale com o dono do bot* 
Tenho +300 funções disponiveis para você, dentre elas são:

✅️ Fazer figurinhas (automáticas)
✅️ Baixar músicas/videos
✅ Logos personalizadas
✅️ Gerenciamento de grupos
✅️ Edições e envio de fotos
✅ Mini jogos
✅ Pesquisas 

*✨❤️Espero que goste e aproveite bastante! ❤️✨*


A baixo segue o link do grupo oficial, onde você pode acompanhar as novidades, e dar as suas sugestões!
linktr.ee/tokibot
`
}
exports.VPN = () => {
    return `🔰🔰🔰 Tomioka  VPN /  🔰🔰🔰

    Olá, Tudo bem?
    Seja muito bem vindo-a melhor Internet VPN 

    🚀 INTERNET ILIMITADA ATRAVÉS DE APLICATIVO 🌐
    👉🏻 Disponível para Android 👈🏻
    📶 TODAS AS OPERADORAS ↙
    
    💜VIVO - ❤TIM  - 💛OI 
    
    ⚜PLANOS ANDROID
    
    RODANDO TUDO ✅
    🎮 ➲ Jogos Online
    🎥 ➲ Serviços de Streaming
    🌐 ➲ Redes Sociais
    🍿 ➲ Netflix
    📺 ➲ IPTV/P2P
    🎬 ➲ YOUTUBE HD 1080p60
    📹 ➲ WhatsApp
    ☎ ➲ Chamadas Voz - Video
    📈 ➲ Download Ilimitado✔
    
    • Contato: wa.me/554497433716
    • Revendedor:  wa.me/5522988175732`
}
exports.FigMenu = () => {
    return `
╭──────────────╮
│  MENU FIGURINHA
╞─────╮ ▽ ╭─────╯
│
╞➸ *${prefix}s2* [Converte foto em figurinha]
╞➸ *${prefix}toimg* [Converter figu em foto]
╞➸ *${prefix}figupack* [Figu de memes]
╞➸ *${prefix}attp* [Sua frase]
╞➸ *${prefix}ttp* [Sua frase]
╞➸ *${prefix}renomear* [Renomear figu]
│
╰──────────────╯`
}
exports.regras = () => {
    return `
╭──────────────╮
│           REGRAS           
╞─────╮ ▽ ╭─────╯
│
╞➸ Telefonar para o *TokiBot-MD*
╞➸ Telefonar para o dono
╞➸ Floodar comandos
╞➸ Enviar travas
│
╰──────────────╯`
}
exports.mandarPix = () => {
    return `com essa doação vou poder conseguir melhorar ainda mais meu bot, além de ajudar no servidor a que eu hospedo ele, vai me ajudar a querer fazer ainda mais comandos e coisas novas para vocês`
}