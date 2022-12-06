let prefix = '/';
const menu = [
    {
        title: 'Comandos novos!',
        id: `/menu novidade`

    },
    {
        title: 'makers de figurinhas',
        id: `/menu fig`
    },
    {
        title: 'menu para administrar grupo',
        id: `/menu grupo`
    },
    {
        title: 'menu do dono',
        id: `/menu dono`
    },
    {
        title: 'menu de efeitos',
        id: `/menu efeito`
    }

]
const menuPremium = [
    {
        title: 'comandos premium 🤩',
        id: `/menu premium`
    }
]
const play = (play, comando = '/playurl', emoji = '🎶') => [
    {

        title: `${emoji}: ${play.all[0].title}`,
        description: `⏱️Duração: ${play.all[0].seconds + play.all[0].duration}`,
        id: `${comando}  ${play.all[0].url}`,

    },
    {

        title: `${emoji}: ${play.all[1].title}`,
        description: `⏱️Duração: ${play.all[1].seconds + play.all[1].duration}`,
        id: `${comando}  ${play.all[1].url}`,

    },
    {

        title: `${emoji}: ${play.all[2].title}`,
        description: `⏱️Duração: ${play.all[1].seconds + play.all[1].duration}`,
        id: `${comando}  ${play.all[2].url}`,

    },
    {

        title: `${emoji}: ${play.all[3].title}`,
        description: `⏱️Duração: ${play.all[3].seconds + play.all[3].duration}`,
        id: `${comando}  ${play.all[3].url}`,

    },
    {

        title: `${emoji}: ${play.all[4].title}`,
        description: `⏱️Duração: ${play.all[4].seconds + play.all[4].duration}`,
        id: `${comando}  ${play.all[4].url}`,

    },
    {

        title: `${emoji}: ${play.all[5].title}`,
        description: `⏱️Duração: ${play.all[5].seconds + play.all[5].duration}`,
        id: `${comando}  ${play.all[5].url}`,

    },
    {

        title: `${emoji}: ${play.all[6].title}`,
        description: `⏱️Duração: ${play.all[6].seconds + play.all[6].duration}`,
        id: `${comando}  ${play.all[6].url}`,

    },
    {

        title: `${emoji}: ${play.all[7].title}`,
        description: `⏱️Duração: ${play.all[7].seconds + play.all[7].duration}`,
        id: `${comando}  ${play.all[7].url}`,

    },
    {

        title: `${emoji}: ${play.all[8].title}`,
        description: `⏱️Duração: ${play.all[8].seconds + play.all[8].duration}`,
        id: `${comando}  ${play.all[8].url}`,

    },
    {

        title: `${emoji}: ${play.all[9].title}`,
        description: `⏱️Duração: ${play.all[9].seconds + play.all[9].duration}`,
        id: `${comando}  ${play.all[9].url}`,

    },
    {

        title: `${emoji}: ${play.all[10].title}`,
        description: `⏱️Duração: ${play.all[10].seconds + play.all[10].duration}`,
        id: `${comando}  ${play.all[10].url}`,

    },
    {

        title: `${emoji}: ${play.all[11].title}`,
        description: `⏱️Duração: ${play.all[11].seconds + play.all[11].duration}`,
        id: `${comando}  ${play.all[11].url}`,

    },
    {

        title: `${emoji}: ${play.all[12].title}`,
        description: `⏱️Duração: ${play.all[12].seconds + play.all[12].duration}`,
        id: `${comando}  ${play.all[12].url}`,

    },
    {

        title: `${emoji}: ${play.all[13].title}`,
        description: `⏱️Duração: ${play.all[13].seconds + play.all[13].duration}`,
        id: `${comando}  ${play.all[13].url}`,

    },
    {

        title: `${emoji}: ${play.all[14].title}`,
        description: `⏱️Duração: ${play.all[14].seconds + play.all[14].duration}`,
        id: `${comando}  ${play.all[14].url}`,

    },
    {

        title: `${emoji}: ${play.all[15].title}`,
        description: `⏱️Duração: ${play.all[15].seconds + play.all[15].duration}`,
        id: `${comando}  ${play.all[15].url}`,

    }
]
    const akinator = [
        {
            title: 'Sim',
            id: `/respaki 0`,
            description: ''
        },
        {
            title: 'Não',
            id: `/respaki 1`,
            description: ''
        }, {
            title: 'Não sei',
            id: `/respaki 2`,
            description: ''
        }, {
            title: 'Provavelmente sim',
            id: `/respaki 3`,
            description: ''
        },
        {
            title: 'Provavelmente não',
            id: `/respaki 4`,
            description: ''
        }
    ]
    
    const akinator2 = [
        {
            id: '/akinator sim', body: 'Sim'
        },
        {
            id: '/akinator nao', body: 'Não'
        }
    ]
    const akinator3 = [
        {
            id: 'sim', body: 'Sim'
        },
        {
            id: 'nao', body: 'Não'
        }
    ]
    const packfig = [
            { title: `Figurinhas aleatórias de Meme`, id: `${prefix}figumeme` },
            { title: `Figurinhas aleatórias de Anime`, id: `${prefix}figuanime` },
            { title: `Figurinhas aleatórias de Sticker`, id: `${prefix}figudesenho` },
            { title: `Figurinhas aleatórias de Roblox`, id: `${prefix}figuroblox` },
            { title: `Figurinhas aleatórias de Raiva`, id: `${prefix}figuraiva` },
            { title: `Figurinhas aleatórias Engraçadas`, id: `${prefix}figuengracado` },
            { title: `Figurinhas aleatórias de Bebê`, id: `${prefix}figubb` }
        
      ]
      const emojii = (texto,prefix) => [
        { title: `Emoji "${texto}" da Apple.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'apple'}` },
        { title: `Emoji "${texto}" do Google.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'google'}` },
        { title: `Emoji "${texto}" da Samsung.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'samsung'}` },
        { title: `Emoji "${texto}" da Microsoft.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'microsoft'}` },
        { title: `Emoji "${texto}" do Whatsapp.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'whatsapp'}` },
        { title: `Emoji "${texto}" do Twitter.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'twitter'}` },
        { title: `Emoji "${texto}" do Facebook.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'facebook'}` },
        { title: `Emoji "${texto}" do Joypixels.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'joypixels'}` },
        { title: `Emoji "${texto}" do Openmoji.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'openmoji'}` },
        { title: `Emoji "${texto}" do Skype(Emoji Animado).`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'skype'}` },
        { title: `Emoji "${texto}" do Emojidex.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'emojidex'}` },
        { title: `Emoji "${texto}" do Emojipedia.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'Emojipedia'}` },
        { title: `Emoji "${texto}" do LG.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'lg'}` },
        { title: `Emoji "${texto}" do Noto Emoji.`, id: `${prefix + 'emooji' + ' ' + texto + '/' + 'notoemoji'}` } 
  ]
const logos = (textinho) => [
    { title: `Logo com o tema Devil escrito "${textinho}"`, id: `${prefix}create-neon-devil-wings-text-effect-online-free-1014.html ${textinho}` },
    { title: `Logo com o tema do Batman escrito "${textinho}"`, id: `${prefix}make-a-batman-logo-online-free-1066.html ${textinho}` },
    { title: `Logo com o tema Toxic escrito "${textinho}"`, id: `${prefix}toxic-text-effect-online-901.html ${textinho}` },
    { title: `Logo com tema de terro demo "${textinho}"`, id: `${prefix}create-green-horror-style-text-effect-online-1036.html ${textinho}` },
    { title: `Logo do Joker escrito "${textinho}"`, id: `${prefix}create-logo-joker-online-934.html ${textinho}` },
    { title: `Logo com o tema Gold escrito "${textinho}"`, id: `${prefix}3d-golden-ancient-text-effect-online-free-1060.html ${textinho}` },
    { title: `Logo com o tema de Natal escrito "${textinho}"`, id: `${prefix}3d-christmas-text-effect-by-name-1055.html ${textinho}` },
    { title: `Logo com o tema Relâmpago escrito "${textinho}"`, id: `${prefix}create-thunder-text-effect-online-881.html ${textinho}` },
    { title: `Logo com o tema Neon escrito "${textinho}"`, id: `${prefix}neon-text-effect-online-879.html ${textinho}` },
    { title: `Logo com o tema Matrix escrito "${textinho}"`, id: `${prefix}matrix-style-text-effect-online-884.html ${textinho}` },
    { title: `Logo com o tema de Relâmpago escrito "${textinho}"`, id: `${prefix}online-thunder-text-effect-generator-1031.html ${textinho}` },
    { title: `Logo com a letra falhando escrito "${textinho}"`, id: `${prefix}create-impressive-glitch-text-effects-online-1027.html ${textinho}` },
    { title: `Logo da América escrito "${textinho}"`, id: `${prefix}create-american-flag-3d-text-effect-online-1051.html ${textinho}` },
    { title: `Logo com o tema de Minions escrito "${textinho}"`, id: `${prefix}minion-text-effect-3d-online-978.html ${textinho}` },
    { title: `Logo com o tema de Magma escrito "${textinho}"`, id: `${prefix}create-a-magma-hot-text-effect-online-1030.html ${textinho}` },
    { title: `Logo com o tema de 1917 escrito "${textinho}"`, id: `${prefix}1917-style-text-effect-online-980.html ${textinho}` },
    { title: `Logo com o tema de Lobo escrito "${textinho}"`, id: `${prefix}online-black-and-white-bear-mascot-logo-creation-1012.html ${textinho}` },
    { title: `Logo com o tema de Marca no vidro escrito "${textinho}"`, id: `${prefix}dropwater-text-effect-872.html ${textinho}` },
    { title: `Logo com o tema de Halloween escrito "${textinho}"`, id: `${prefix}halloween-fire-text-effect-940.html ${textinho}` },
    { title: `Logo com o tema escrito de lápis escrito "${textinho}"`, id: `${prefix}create-a-sketch-text-effect-online-1044.html ${textinho}` },
    { title: `Logo com o tema de Transformes escrito "${textinho}"`, id: `${prefix}create-a-transformer-text-effect-online-1035.html ${textinho}` }
  ]

module.exports = {
    menu,
    menuPremium,
    play, 
    akinator,
    akinator2,
    akinator3, 
    packfig,
    emojii,
    logos
}