const {Server, OPEN} = require('ws')
const server = require('http').createServer()


const ws = new Server({
    server : server
})

server.on('request', require('./app'))

ws.on('open', () => console.log(`Web Socket Server started on PORT : ${process.env.PORT}`))
  .on('connection', socket => {
    socket.on('message', data => {
        ws.clients.forEach(cli => cli !== socket && cli.readyState === OPEN && cli.send(data))
    })
}).on('close', () => console.log(`Web Socket Server close`))

server.listen(process.env.PORT, () => console.log(`Server listening on port : ${process.env.PORT}`))
