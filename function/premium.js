const fs = require('fs-extra')
const toMs = require('ms')
const _dir = JSON.parse(fs.readFileSync('./db/json/premium.json'))

/**
 * Add premium user.
 * @param {string} userId 
 * @param {string} expired 
 * @param {object} _dir 
 */
const addPremiumUser = (userId, expired) => {
    const obj = { id: userId, expired: Date.now() + toMs(expired) }
    _dir.push(obj)
    fs.writeFileSync('./db/json/premium.json', JSON.stringify(_dir))
}

/**
 * Get premium user index position.
 * @param {string} userId 
 * @param {object} _dir 
 * @returns {Number}
 */
 const getPremiumPosition = (userId) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir.splice(position, 1)
        fs.writeFileSync('./db/json/premium.json', JSON.stringify(_dir))
    }
}



/**
 * Get premium user expired.
 * @param {string} userId 
 * @param {object} _dir 
 * @returns {Number}
 */
const getPremiumExpired = (userId) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Check if is user premium.
 * @param {string} userId 
 * @param {object} _dir 
 * @returns {boolean}
 */
const checkPremiumUser = (userId) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

/**
 * Constantly checking premium.
 * @param {object} _dir 
 */
const expiredCheck = () => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Premium user expired: ${_dir[position].id}`)
            _dir.splice(position, 1)
            fs.writeFileSync('./db/json/premium.json', JSON.stringify(_dir))
        }
    }, 1000)
}
/**
 * Get all premium user ID.
 * @param {object} _dir 
 * @returns {string[]}
 */
const getAllPremiumUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

module.exports = {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser
}
