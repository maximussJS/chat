const router = require('express').Router()
const {query} = require('../../database')
const {successResponse, failureResponse} = require('../../utils/responses')
const {getAllUsers, getUserByLogin, deleteUserByLogin} = require('../../utils/queries')


router.get('/:login', async (req,res) => {
    try {
        const login = req.params.login.toString()
        if(!login) return res.status(400).json(failureResponse('Login param is required'))
        if(login.trim().length < 8) return res.status(400).json(failureResponse('Login minimal length is 8 symbols'))
        if(login.trim().length > 20) return res.status(400).json(failureResponse('Login maximal length is 20 symbols'))
        const {
            rows : [user]
        } = await query(getUserByLogin(login))
        if(!user) return res.status(400).json(`No such user with login : ${login}`)
        return res.status(200).json(successResponse('OK'), null, user)
    }
    catch (e) {
        console.error(`GET USER ERROR : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})

router.get('/', async (req,res) => {
    try {
        const {
            rows : [users]
        } = await query(getAllUsers())
        if(!users) return res.status(400).json(failureResponse('No users'))
        return res.status(200).json(successResponse('OK', null, users))
    }
    catch (e) {
        console.error(`GET USERS ERROR : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})

router.put('/', async (req,res) => {

})

router.delete('/', async (req,res) => {
    try {

    }
    catch (e) {
        console.error(`DELETE USER ERROR : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})

module.exports = router
