const { fetchJson, fetchText } = require('../tools/fetcher')
const config = require('../config.json')
const lol = config.lol
const ale = config.keyale

exports.ytPlay = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/ytplay?apikey=${lol}&query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
exports.ytPlayLink = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/ytaudio?apikey=${lol}&url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
exports.ytPlayLinkVid = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/ytvideo?apikey=${lol}&url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
exports.dddBuscar = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://brasilapi.com.br/api/ddd/v1/${query}`)
        .then((state) => resolve(state))
        .then((cities) => resolve(cities))
        .catch((err) => reject(err))
})
exports.cep = (username) => new Promise((resolve, reject) => {
    fetchJson(`https://brasilapi.com.br/api/cep/v1/${username}`)
        .then((body) => resolve(body))
        .catch((err) => reject(err))
})
exports.Down = (query) => new Promise((resolve, reject) => {
    fetchJson(`http://aleatoryapi.herokuapp.com/api/download/?url=${query}&apikey=${ale}`)
        .then((body) => resolve(body))
        .catch((err) => reject(err))
})
exports.encurtar = (url) => new Promise((resolve, reject) => {
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})
exports.casal = () => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lol}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
exports.pinBusc = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${lol}&query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
exports.tikTok = (query) => new Promise((resolve, reject) => {
    fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${lol}&url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

