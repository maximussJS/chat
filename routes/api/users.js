const router = require('express').Router()
const pool = require('../../databases/postgres')
const authorized = require('../../middlewares/authorized')
const {successResponse, failureResponse} = require('../../utils/responses')
const {getAllUsers, getUserByLogin, deleteUserByLogin} = require('../../utils/queries')


router
    .get('/:login', authorized, async (req,res) => {
        try {
            const login = req.params.login.toString()
            if(!login) return res.status(400).json(failureResponse('Login param is required'))
            if(login.trim().length < 8) return res.status(400).json(failureResponse('Login minimal length is 8 symbols'))
            if(login.trim().length > 20) return res.status(400).json(failureResponse('Login maximal length is 20 symbols'))
            const {
                rows
            } = await pool.query(getUserByLogin(login))
            if(!rows) return res.status(400).json(`No such user with login : ${login}`)
            return res.status(200).json(successResponse('OK'), null, rows)
        }
        catch (e) {
            console.error(`GET USER ERROR : ${e}`)
            return res.status(500).json(failureResponse('Internal Server Error'))
        }
    })
    .get('/', authorized, async (req,res) => {
        try {
            const {rows} = await pool.query(getAllUsers())
            if(!rows) return res.status(200).json(failureResponse('No users'))
            return res.status(200).json(successResponse('OK', null, rows))
        }
        catch (e) {
            console.error(`GET USERS ERROR : ${e}`)
            return res.status(500).json(failureResponse('Internal Server Error'))
        }
    })
    .delete('/', authorized, async (req,res) => {
        try {
            const {login} = req.local.user
            if(!login) throw new Error('No login field in authorized user')
            const {
                rows : [user]
            } = await pool.query(deleteUserByLogin(login))
            if(!user) return res.status(400).json(failureResponse(`No user with login : ${login}`))
            req.local = null
            return res.status(200).json(successResponse('OK'))
        }
        catch (e) {
            console.error(`DELETE USER ERROR : ${e}`)
            return res.status(500).json(failureResponse('Internal Server Error'))
        }
    })


module.exports = router
