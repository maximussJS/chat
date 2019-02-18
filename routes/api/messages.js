const router = require('express').Router()
const {query} = require('../../databases/postgres')
const authorize = require('../../middlewares/authorized')
const {successResponse, failureResponse} = require('../../utils/responses')
const {getAllMessages, getUserByLogin, insertNewMessage} = require('../../utils/queries')


router.get('/', authorize, async (req,res) => {
    try {
        const {
           rows
        } = await query(getAllMessages())
        if(!rows) return res.status(200).json(successResponse('No messages'))
        return res.status(200).json(successResponse('OK', null, rows))
    }
    catch (e) {
        console.error(`GET MESSAGES ERROR : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


router.post('/', authorize, async (req,res) => {
    try {
        const {body} = req
        if(!body.text) return res.status(400).json(failureResponse('Text param is required'))
        if(body.text.trim().length === 0) return res.status(400).json(failureResponse('Invalid text'))
        if(!body.author) return res.status(400).json(failureResponse('Author param is required'))
        const {login} = body.author
        if(!login) return res.status(400).json(failureResponse('Login param is required'))
        if(req.local.user.login !== login) return res.status(401).json('Not your login')
        const {
            rows : [user]
        } = await query(getUserByLogin(login))
        if(!user) return res.status(401).json(`No such user with login : ${login}`)
        const {
            rows : [newMessage]
        } = await query(insertNewMessage(body.text,login,user.image))
        if(!newMessage) {
            console.error('Postgres Insert New Message Error')
            return res.status(500).json('Server Error')
        }
        return res.status(201).json(successResponse('OK'))
    }
    catch (e) {
        console.error(`POST MESSAGE ERROR : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


module.exports = router
