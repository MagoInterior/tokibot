let prefix = "/"
const menup = (pushname, nomeDono, limitCount, limite) => {
    
    return `
╔═════════════════❍
║-Olá ${pushname}!!
║▬▭▬▭▬▭▬▭▬▭
║╾Criador: ${nomeDono}
║╾Status: Público
║╾Versão: 3.1
║╾para ter acesso a recursos premium
╠➢ mande a palavra "premium"
╠➢ melhores cursos "cursos"
║ linktr.ee/tokibot
║ para ver o menu completo
║ ${prefix}menu2
║ limite diário (${limitCount}):
║ ${limite}
`
}
const menuNov = () => {
    return `
╔══  ✧ ┇ NOVIDADES ┇✧  ══
╠➢ ${prefix}toimg
╠➢ ${prefix}google <texto>
╠➢ ${prefix}attp
╠➢ ${prefix}ping
╠➢ ${prefix}tomp3
╠➢ ${prefix}semoji
╠➢ ${prefix}figupack
╠➢ ${prefix}akinator
╠➢ ${prefix}misturar
╠➢ ${prefix}ttp
╠➢ ${prefix}pin
╠➢ ${prefix}play (lista)
╠➢ ${prefix}play2 (nome)
╠➢ ${prefix}playv (mp4)
╠➢ ${prefix}playurl (link)
╠➢ ${prefix}playurlv (link)
╠➢ novo menu de efeitos!
╠➢ figurinhas randomicas
`
}
const menufigdow = () => {
    return `
╔══ ❖ ┇ FIGURINHAS ┇ ❖ ══
║
╠➢ ${prefix}attp
╠➢ ${prefix}s2
╠➢ ${prefix}toimg
╠➢ ${prefix}puto
╠➢ ${prefix}semoji
║
╠══ ❖ ┇ RANDOM DE FIG ┇ ❖ ══
║
╠➢ ${prefix}patrick
╠➢ ${prefix}dado
╠➢ ${prefix}among
╠➢ ${prefix}gura
╠➢ ${prefix}among
╠➢ ${prefix}doge
╠➢ ${prefix}fofo
╠═══ ❖ ┇ RAMDOM ADULTO ┇ ❖ ══
║
╠➢ ${prefix}neko
╠➢ ${prefix}neko18
╠➢ ${prefix}loli18
╠➢ ${prefix}waifu
╠➢ ${prefix}trap
╠═══ ❖ ┇ RANDOM DE IMG ┇ ❖ ══
║
╠➢ ${prefix}loli
╠➢ ${prefix}shota
║
`
}
const menuprem = () => {
    return `
╔══  ⭐💫 ┇ PREMIUM ┇💫⭐  ══
╠➢ ${prefix}tk (link)
╠➢ ${prefix}insta (link)
╠➢ ${prefix}face (link)
╠➢ ${prefix}twitter (link)
╠➢ ${prefix}take text1|text2
╠➢ ${prefix}ddd (query)
╠➢ ${prefix}cep (query)
╠➢ ${prefix}encurtar (link)
╠➢ ${prefix}logos (nome)

`
}
const menuDono = () => {
    return `
╔══  ✩ ┇ DONO ┇ ✩  ══
║
╠➢ ${prefix}limpar
`
}
const menuGrupo = () => {
    return `
╔══  ✩ ┇ GRUPO ┇ ✩  ══
║
╠➢ ${prefix}antilink on|off
╠➢ ${prefix}redefinir
╠➢ ${prefix}marcar <oq vc quiser>
║`
}
const menuEfeito = () => {
    return `
╔══  ✩ ┇ EFEITOS ┇ ✩  ══
║
╠➢ ${prefix}invertido
╠➢ ${prefix}lapis
╠➢ ${prefix}wasted
╠➢ ${prefix}puto
╠➢ ${prefix}puto2
╠➢ ${prefix}peixe
╠➢ ${prefix}mask
╠➢ ${prefix}deep
╠➢ ${prefix}flip
╠➢ ${prefix}gray
╠➢ ${prefix}round
╠➢ ${prefix}affect
╠➢ ${prefix}saturacao
║`
}

module.exports = {
    menup,
    menuNov,
    menufigdow,
    menuprem,
    menuGrupo,
    menuDono,
    menuEfeito
}


