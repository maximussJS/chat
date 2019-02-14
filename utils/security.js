const crypto = require('crypto')
const {sign,verify} = require('jsonwebtoken')
const {isJWT} = require('validator')


module.exports = {
    encryptPassword : password => {
        const hmac = crypto.createHmac('sha512', process.env.SERVER_SALT)
        hmac.update(password)
        return hmac.digest('hex')
    },
    generateToken : user => sign({
        id : parseInt(user.id),
        user : user
    }, process.env.JWT_SECRET),
    verifyToken : token => {
        if (!isJWT(token)) throw Error(`Token (${token}) is not valid JWT token!`)
        else {
            const payload = verify(token, process.env.JWT_SECRET)
            return {
                userID: parseInt(payload.user_id),
                login: payload.login,
                role: payload.role
            }
        }
    }
}
