const express = require('express')
const http = require('http')
const { resolve } = require('path')
const ejs = require('ejs')

require('dotenv/config')

const app = express()
const server = http.createServer(app)

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const io = require('socket.io')(server)

let messages = []

io.on('connection', socket => {
  socket.on('sendMessage', data => {
    messages.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })

  socket.emit('previousMessages', messages)

  console.log(`User Connected in Chat, Socket id: ${socket.id}`)
})

app.use(express.static(resolve(__dirname, '..', 'public')))

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (_, res) => {
  return res.render('chat')
})

app.use((_, res) => {
  return res.render('404')
})

server.listen(port, () => {
  console.log(`Server started at http://${host}:${port}/`)
})
