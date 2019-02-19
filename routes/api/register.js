const router = require('express').Router()
const upload = require('../../utils/upload')
const pool = require('../../databases/postgres')
const {encryptPassword} = require('../../utils/security')
const {getUserByLogin, insertNewUser} = require('../../utils/queries')
const {successResponse, failureResponse} = require('../../utils/responses')


router.post('/', async (req,res) => {
    try {
        const {body} = req
        const image = req.files['image']
        if(!body.name) return res.status(400).json(failureResponse('Name is required'))
        if(!body.login) return res.status(400).json(failureResponse('Login is required'))
        if(!body.password) return res.status(400).json(failureResponse('Password is required'))
        if(!image) return res.status(400).json(failureResponse('Image is required'))
        const {name,login,password} = body
        if(name.trim().length < 8) return res.status(400).json(failureResponse('Name minimal length is 8 symbols'))
        if(name.trim().length > 20) return res.status(400).json(failureResponse('Name maximal length is 20 symbols'))
        if(login.trim().length < 8) return res.status(400).json(failureResponse('Login minimal length is 8 symbols'))
        if(login.trim().length > 20) return res.status(400).json(failureResponse('Login maximal length is 20 symbols'))
        if(password.trim().length < 8) return res.status(400).json(failureResponse('Password minimal length is 8 symbols'))
        if(password.trim().length < 8) return res.status(400).json(failureResponse('Password maximal length is 20 symbols'))
        if(!image.name) return res.status(400).json(failureResponse('Invalid image file'))
        const {
            rows : [user]
        } = await pool.query(getUserByLogin(login))
        if(user) return res.status(400).json(failureResponse(`User with login ${login} already exists`))
        const image_url = await upload(image)
        if(!image_url) return res.status(400).json(failureResponse('Error to upload image file'))
        const {
            rows : [newUser]
        } = await pool.query(insertNewUser(name,login,encryptPassword(password),image_url))
        if(!newUser) {
            console.error('Postgres Insert New User Error')
            return res.status(500).json('Server Error')
        }
        return res.status(201).json(successResponse(`User ${name} with login ${login} was created!`))
    }
    catch (e) {
        console.error(`Registration Error : ${e}`)
        return res.status(500).json(failureResponse('Internal Server Error'))
    }
})


module.exports = router
