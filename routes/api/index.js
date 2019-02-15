const router = require('express').Router()


router.use('/login', require('./login'))
router.use('/register', require('./register'))
router.use('/users', require('./users'))


module.exports = router
