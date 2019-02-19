const router = require('express').Router()
const pool = require('../../databases/postgres')
const authorize = require('../../middlewares/authorized')
const {successResponse, failureResponse} = require('../../utils/responses')
const {getChatByName} = require('../../utils/queries')


router
    .get('/:name', authorize , async (req,res) => {
        try {
            const name = req.params.name.toString()
            if(!name) return res.status(400).json(failureResponse('Name url param is required'))
            if(name.trim().length < 8) return res.status(400).json(failureResponse('Name minimal length is 8 symbols'))
            if(name.trim().length > 20) return res.status(400).json(failureResponse('Name maximal length is 20 symbols'))
            const {
                rows : [chat]
            } = await pool.query(getChatByName(name))
            if(!chat) return res.status(400).json(`No such chat : ${name}`)
            return res.status(200).json(successResponse('OK'), null, chat)
        }
        catch (e) {
            console.error(`GET CHAT ERROR : ${e}`)
            return res.status(500).json(failureResponse('Internal Server Error'))
        }
    })


module.exports = router
