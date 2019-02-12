require('dotenv').load()
require('./database')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(require('./routes'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(busboyBodyParser({
    limit : '50mb'
}))


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
