const router = require('express').Router()


router.use('/api', require('./api'))

router.use((req,res) => res.status(404))


module.exports = router
