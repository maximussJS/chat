const Redis = require('ioredis')
const cli = new Redis({
    port : process.env.REDIS_PORT,
    host : process.env.REDIS_HOST,
    password : process.env.REDIS_PASSWORD
})


cli.on('connect', () => console.log('Redis connected'))
   .on('error', err => {
       console.error('REDIS ERROR', err)
       process.exit(0)
   }).on('close', () => {
       console.log('Redis closed')
   }).on('end', () => console.log('Redis end'))


module.exports = cli

