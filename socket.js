const {Server, OPEN} = require('ws')


const ws = new Server({
    port : process.env.PORT
}).on('open', () => console.log(`Web Socket Server started on PORT : ${process.env.PORT}`))
  .on('connection', socket => {
    socket.on('message', data => ws.clients.forEach(cli => cli !== socket && cli.readyState === OPEN && cli.send(data)))
}).on('close', () => console.log(`Web Socket Server close`))


module.exports = ws
