const router = require('express').Router()
const pool = require('../../databases/postgres')
const authorize = require('../../middlewares/authorized')
const {success, failure, serverError} = require('../../utils/responses')
const {getChatByName, insertNewChat} = require('../../utils/queries')


router
    .get('/:name', authorize , async (req,res) => {
        try {
            const name = req.params.name.toString()
            if(!name) return res.status(400).json(failure('Name url param is required'))
            if(name.trim().length < 8) return res.status(400).json(failure('Name minimal length is 8 symbols'))
            if(name.trim().length > 20) return res.status(400).json(failure('Name maximal length is 20 symbols'))
            const {
                rows : [chat]
            } = await pool.query(getChatByName(name))
            if(!chat) return res.status(400).json(`No such chat : ${name}`)
            return res.status(200).json(success('OK'), null, chat)
        }
        catch (e) {
            console.error(`GET CHAT ERROR : ${e}`)
            return res.status(500).json(serverError())
        }
    })
    .post('/', authorize , async (req, res) => {
        try {
            const {name, creator} = req.body
            if(!name) return res.status(400).json(failure('Chat name is required'))
            if(!creator) return res.status(400).json(failure('Creator is required'))
            if(name.length < 20) return res.status(400).json(failure('Name maximum length is 20 symbols'))
            if(req.local.user.login !== creator) return res.status(401).json('Unauthorized')
            const {
                rows : [chat]
            } = await pool.query(insertNewChat(name,creator))
            if(!chat) return res.status(500).json(serverError())
            return res.status(201).json(success('OK'))
        }
        catch (e) {
            console.error(`POST CHAT ERROR : ${e}`)
            return res.status(500).json(serverError())
        }
    })


module.exports = router
