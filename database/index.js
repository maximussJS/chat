const Pool = require('pg').Pool


const pool = new Pool({
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    host : process.env.PG_HOST || 'localhost',
    database : process.env.PG_NAME,
    port : parseInt(process.env.PG_PORT) || 5432
})

pool.on('end', () => console.log('Disconnected from Postgres!'))
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


const createTables = () => {
    const text =
        `CREATE TABLE IF EXISTS users(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        login VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(256) NOT NULL,
        image VARCHAR(256) NOT NULL,
        created TIMESTAMP );`
    pool.query(text)
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
}

const dropTable = tableName => {
    const text = 'DROP TABLE IF EXISTS users'
    pool.query(text)
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
}


module.exports = {
    query : (text, params) => new Promise( async (resolve,reject) => {
        await pool.query(text, params)
                  .then(res => resolve(res))
                  .catch(err => reject(err))
    })
}

