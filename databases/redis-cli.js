const Redis = require('ioredis')

const cli = new Redis({
    port : process.env.REDIS_PORT,
    host : process.env.REDIS_HOST,
    password : '12345678'
})


cli.on('connect', () => console.log('Redis connected'))
   .on('error', err => {
       console.error('REDIS ERROR', err)
       process.exit(0)
   }).on('close', () => {
       console.log('Redis closed')
   })


module.exports = {
    set : async (login, online) => await cli.set(login, online),
    get : async login => await cli.get(login),
    getOnline :  async () => {
        const keys = await cli.keys('*')
        const result = []
        for (const key of keys) {
            let value = await cli.get(key)
            value === 'true' && result.push(key)
        }
        return result
    }
}
