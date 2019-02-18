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
    get : async login => await cli.get(login, (err, value) => {
        if(err) {
            console.error(`REDIS GET ERROR ${err}`)
            throw new Error('REDIS GET ERROR')
        }
        return value
    }),
    getOnline : async () => await cli.keys('*', async (err, keys) => {
        err && console.error(`REDIS GET ONLINE ERROR : ${err}`)
        console.log(keys)
    })
}
