const cli = require('redis').createClient({
    port : process.env.REDIS_PORT,
    host : process.env.REDIS_HOST,
    no_auth_check : true,
    auth_pass : '12345678'
})


cli.on('connect', () => console.log('Redis connected'))
   .on('error', err => {
       console.error('REDIS ERROR', err)
       cli.end()
       process.exit(0)
   }).on('close', () => {
       cli.end()
       console.log('Redis closed')
   })


module.exports = {
    set : async (login, online) => await cli.set(login, online),
    get : async login => await cli.get(login),
    getOnline :  async () => {
        const keys = await cli.keys('*', (err, keys) => keys)
        console.log(keys)
    }
}
