const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./utils/logger')
const bodyParser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser')


const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(busboyBodyParser({
    limit : '50mb'
}))
app.use(morgan('combined', {
    stream: logger.stream
}))

app.use(require('routes'))


module.exports = app
