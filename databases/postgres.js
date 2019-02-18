const Pool = require('pg').Pool
const {createUserTable, deleteUserTable} = require('../utils/queries')


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
        console.log('Postgres connected')
        cli.release()
    })
    .catch(e => {
        console.error(`Postgres Connection Error : ${e}`)
        process.exit(1)
    })


const createTables = () => {
    pool.query(createUserTable())
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
}


const dropTable = () => {
    pool.query(deleteUserTable())
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
    query : text => new Promise( async (resolve,reject) => await pool.query(text).then(res => resolve(res))
                                                                                 .catch(err => reject(err)))
}
