const router = require('express').Router()
const pool = require('../../databases/postgres')
const {encryptPassword, generateToken} = require('../../utils/security')
const {success, failure, serverError} = require('../../utils/responses')
const {getUserByLogin, getUserByLoginAndPassword} = require('../../utils/queries')


router
    .get('/:login', async (req,res) => {
        try {
            const login = req.params.login.toString()
            if(!login) return res.status(400).json('Login param is required')
            const {
                rows : [user]
            } = await pool.query(getUserByLogin(login))
            if(user) return res.status(400).json('This login is already taken')
            return res.status(200).json(success('OK'))
        }
        catch (e) {
            console.error(`Is Login Unique Error ${e}`)
            return res.status(500).json(serverError())
        }
    })
    .post('/', async (req,res) => {
        try {
            const {body} = req
            console.log(body)
            if(!body.login) return res.status(400).json(failure('Login is required'))
            if(!body.password) return res.status(400).json(failure('Password is required'))

            const {login, password} = body
            if(login.length < 8) return res.status(400).json(failure('Login length is too small'))
            if(login.length > 20) return res.status(400).json(failure('Login length is too big'))
            if(password.length < 8) return res.status(400).json(failure('Password length is too small'))
            if(password.length > 20) return res.status(400).json(failure('Password length is too big'))

            const {
                rows : [user]
            } = await pool.query(getUserByLoginAndPassword(login,encryptPassword(password)))
            if(!user) return res.status(401).json(failure('Invalid login or password'))
            const token = generateToken(user)
            return res.status(200).json(success('OK',token))
        }
        catch (e) {
            console.error(`Login Error : ${e}`)
            return res.status(500).json(serverError())
        }
    })


module.exports = router
