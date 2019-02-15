const router = require('express').Router()
const {query} = require('../../database')
const {encryptPassword, generateToken} = require('../../utils/security')
const {successResponse, failureResponse} = require('../../utils/responses')
const {getUserByLogin, getUserByLoginAndPassword} = require('../../utils/queries')


router.get('/:login', async (req,res) => {
    try {
        const login = req.params.login.toString()
        if(!login) return res.status(400).json('Login param is required')
        const {
            rows : [user]
        } = await query(getUserByLogin(login))
        if(user) return res.status(400).json('This login is already taken')
        return res.status(200).json(successResponse('OK'))
    }
    catch (e) {
        console.error(`Is Login Unique Error ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


router.post('/', async (req,res) => {
    try {
        const {body} = req
        if(!body.login) return res.status(400).json(failureResponse('Login is required'))
        if(!body.password) return res.status(400).json(failureResponse('Password is required'))
        if(body.login.length < 8) return res.status(400).json(failureResponse('Login length is too small'))
        if(body.login.length > 20) return res.status(400).json(failureResponse('Login length is too big'))
        if(body.password.length < 8) return res.status(400).json(failureResponse('Password length is too small'))
        if(body.password.length > 20) return res.status(400).json(failureResponse('Password length is too big'))
        const {
            rows : [user]
        } = await query(getUserByLoginAndPassword(body.login,encryptPassword(body.password)))
        if(!user) return res.status(401).json(failureResponse('Invalid login or password'))
        const token = generateToken(user)
        return res.status(200).json(successResponse('OK',token))
    }
    catch (e) {
        console.error(`Login Error : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


module.exports = router
