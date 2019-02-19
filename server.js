const {Server, OPEN} = require('ws')
const server = require('http').createServer()
const {getOnline,get,set} = require('./databases/redis-cli')


const ws = new Server({
    server : server
})

server.on('request', require('./app'))

ws.on('open', () => console.log(`Web Socket Server started on PORT : ${process.env.PORT}`))
  .on('connection', socket => {
      socket.on('message', async data => {
          let msg = JSON.parse(data)
          switch (msg.type) {
              case 'message':
                  ws.clients.forEach(cli => cli !== socket && cli.readyState === OPEN && cli.send(data))
                  break
              case 'online':
                  await set(msg.login, true)
                  break
              case 'offline':
                  await set(msg.login, false)
                  break
              case 'all':
                  const online = await getOnline()
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
