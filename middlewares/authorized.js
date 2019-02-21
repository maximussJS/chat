const {isJWT} = require('validator')
const {verifyToken} = require('../utils/security')
const {failure} = require('../utils/responses')


const getTokenFromHeaders = headers => new Promise( (resolve,reject) => {
    if(!headers.authorization) reject('Authorization header required')
    const token = headers.authorization
    if(!isJWT(token)) reject('Invalid token')
    resolve(token)
})


module.exports = async (req,res,next) => {
    try {
        const token = await getTokenFromHeaders(req.headers)
        req.local = verifyToken(token)
        next()
    }
    catch (e) {
        console.error(`Authorization header Error : ${e}`)
        return res.status(401).json(failure('Unauthorized'))
    }
}
