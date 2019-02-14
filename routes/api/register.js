const router = require('express').Router()
const moment = require('moment')
const upload = require('../../utils/upload')
const {query} = require('../../database')
const {encryptPassword} = require('../../utils/security')
const {getUserByLogin, insertNewUser} = require('../../utils/queries')
const {successResponse, failureResponse} = require('../../utils/responses')


router.post('/', async (req,res) => {
    try {
        const {body} = req
        if(!body.name) return res.status(400).json(failureResponse('Name is required'))
        if(!body.login) return res.status(400).json(failureResponse('Login is required'))
        if(!body.password) return res.status(400).json(failureResponse('Password is required'))
        if(!body.image) return res.status(400).json(failureResponse('Image is required'))
        const {name,login,password,image} = body
        if(name.trim().length < 8) return res.status(400).json(failureResponse('Name minimal length is 8 symbols'))
        if(name.trim().length > 20) return res.status(400).json(failureResponse('Name maximal length is 20 symbols'))
        if(login.trim().length < 8) return res.status(400).json(failureResponse('Login minimal length is 8 symbols'))
        if(login.trim().length > 20) return res.status(400).json(failureResponse('Login maximal length is 20 symbols'))
        if(password.trim().length < 8) return res.status(400).json(failureResponse('Password minimal length is 8 symbols'))
        if(password.trim().length < 8) return res.status(400).json(failureResponse('Password maximal length is 20 symbols'))
        if(!image.name) return res.status(400).json(failureResponse('Invalid image file'))
        const {
            rows : [user]
        } = await query(getUserByLogin(login))
        if(user) return res.status(400).json(failureResponse(`User with login ${login} already exists`))
        const image_url = await upload(image)
        if(!image_url) return res.status(400).json(failureResponse('Error to upload image file'))
        await query(insertNewUser(name,login,password,image_url,moment(new Date())))
        return res.status(201).json(successResponse(`User ${name} with login ${login} was created!`))
    }
    catch (e) {
        console.error(`Registration Error : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


module.exports = router
