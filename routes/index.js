const router = require('express').Router()

router.get('/', (req,res) => res.status(200))

router.use((req,res) => res.status(404))

module.exports = router
