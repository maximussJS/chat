const router = require('express').Router()
const pool = require('../../databases/postgres')
const authorize = require('../../middlewares/authorized')
const {success, failure, serverError} = require('../../utils/responses')
const {getAllMessages, getUserByLogin, insertNewMessage} = require('../../utils/queries')


router
    .get('/', authorize, async (req,res) => {
        try {
            const {
               rows
            } = await pool.query(getAllMessages())
            if(!rows) return res.status(200).json(success('No messages'))
            return res.status(200).json(success('OK', null, rows))
        }
        catch (e) {
            console.error(`GET MESSAGES ERROR : ${e}`)
            return res.status(500).json(serverError())
        }
    })
    .post('/', authorize, async (req,res) => {
        try {
            const {body} = req
            if(!body.text) return res.status(400).json(failure('Text param is required'))
            if(body.text.trim().length === 0) return res.status(400).json(failure('Invalid text'))
            if(!body.login) return res.status(400).json(failure('Login param is required'))
            if(req.local.user.login !== body.login) return res.status(401).json('Not your login')

            const {login,text} = body
            const {
                rows : [user]
            } = await pool.query(getUserByLogin(login))
            if(!user) return res.status(401).json(`No such user with login : ${login}`)

            const {
                rows : [newMessage]
            } = await pool.query(insertNewMessage(text,login,user.image))
            if(!newMessage) {
                console.error('Postgres Insert New Message Error')
                return res.status(500).json('Server Error')
            }
            return res.status(201).json(success('OK'))
        }
        catch (e) {
            console.error(`POST MESSAGE ERROR : ${e}`)
            return res.status(500).json(serverError())
        }
    })


module.exports = router
