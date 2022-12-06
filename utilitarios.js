const sharp = require("sharp");
const fs = require("fs-extra");
//FUNCTIONS
const adminsGroup = (userNumber, participants) => {
    const user = participants.find((participant) => participant.id._serialized == userNumber)

    if (user ===  undefined) return false
    return user.isAdmin
}
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const addLevelingXp = (userId, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
    if (_level[i].jid === userId) {
    position = i
    }
    })
    if (position !== false) {
    _level[position].xp += amount
    fs.writeFileSync('./database/user/xp.json', JSON.stringify(_level))
    }
    }

    const logoBot = async (local = './assets/logoBot.webp') => {
        const buffer = Buffer.from(fs.readFileSync(local))
        let base64 = [];
        await sharp(buffer)
            .resize({ width: 150 })
            .toBuffer()
            .then(async data => {
                base64.push(data.toString('base64')) 
            })
            .catch(err => {
               return console.log(err)

            })
            return base64[0]
        }
      
module.exports = {
    adminsGroup,
    getRandom,
    addLevelingXp,
    logoBot
}