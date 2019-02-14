const router = require('express').Router()
const {encryptPassword, generateToken} = require('../../../utils/security')
const {successResponse, failureResponse} = require('../../../utils/responses')
const {getUserByLoginAndPassword} = require('../../../utils/queries')
const {query} = require('../../../database')


router.post('/', async (req,res) => {
    try {
        console.log(req.body)
        const {login, password} = req.body
        if(!login) return res.status(400).json(failureResponse('Login is required'))
        if(!password) return res.status(400).json(failureResponse('Password is required'))
        if(login.length < 8) return res.status(400).json(failureResponse('Login length is too small'))
        if(login.length > 20) return res.status(400).json(failureResponse('Login length is too big'))
        if(password.length < 8) return res.status(400).json(failureResponse('Password length is too small'))
        if(password.length > 20) return res.status(400).json(failureResponse('Password length is too big'))
        const {rows : [user]} = await query(getUserByLoginAndPassword(login,encryptPassword(password)))
        if(!user) return res.status(401).json(failureResponse('Invalid login or password'))
        const token = generateToken(user)
        return res.status(200).json(successResponse('OK',token))
    }
    catch (e) {
        console.error(`Login Error ${e}`)
        return res.status(500).json(failureResponse(e.detail))
    }
})


module.exports = router
