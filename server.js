require('dotenv').load({
    path: require('path').join(__dirname, '.env')
})

const {Server, OPEN} = require('ws')
const server = require('http').createServer()
const pool = require('./databases/postgres')
const cli = require('./databases/redis-cli')


const ws = new Server({
    server : server
})


server.on('request', require('./app'))


ws.on('open', () => console.log(`Web Socket Server started on PORT : ${process.env.PORT}`))
  .on('connection', socket => {
      socket.on('message', async data => {
          let msg = JSON.parse(data)
          console.log(data)
          switch (msg.type) {
              case 'message':
                  ws.clients.forEach(cli => cli !== socket && cli.readyState === OPEN && cli.send(data))
                  break
              case 'online':
                  await cli.set(msg.login, true)
                  break
              case 'offline':
                  await cli.set(msg.login, false)
                  break
              case 'all':
                  const keys = await cli.keys('*')
                  const online = []
                  for (const key of keys) {
                      let value = await cli.get(key)
                      value === 'true' && online.push(key)
                  }
                  ws.clients.forEach(cli => cli.readyState === OPEN && cli.send(JSON.stringify({
                      type : 'all',
                      data : online.length
                  })))
                  break
              default:
                  break
          }
      })
}).on('close', () => console.log(`Web Socket Server close`))


server.listen(process.env.PORT, () => console.log(`Server listening on port : ${process.env.PORT}`))


process.on('SIGINT', async () => {
    await pool.end()
    await cli.disconnect()
    setTimeout(() => process.exit(0), 1000)
})
