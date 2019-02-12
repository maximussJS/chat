const Pool = require('pg').Pool

const pool = new Pool({
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    host : process.env.PG_HOST || 'localhost',
    database : process.env.PG_NAME,
    port : parseInt(process.env.PG_PORT) || 5432
})

pool.on('end', () => console.warn('Disconnected from Postgres!'))
pool.on('error', err => console.error(`Postgres Error : ${err}`))

pool.connect()
    .then(cli => {
        console.log('Connected to Postgres')
        cli.release()
    })
    .catch(e => {
        console.error(`Postgres Connection Error : ${e}`)
        process.exit(1)
    })
    .then(() => pool.end())

module.exports = pool
