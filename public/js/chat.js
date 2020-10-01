const $ = sel => document.querySelector(sel)

const socket = io('http://localhost:3000')

const messagesElement = $('.messages')

const renderMessages = message => {
  messagesElement.innerHTML += `
    <div class='message'>
      <strong>
        ${message.username}
      </strong>
      <p>
        ${message.message}
      </p>
    </div>
  `
}

const handleSubmit = e => {
  e.preventDefault()

  const username = $('#username').value
  const message = $('#message').value

  if (username && message) {
    const messageObject = {
      username,
      message,
    }

    renderMessages(messageObject)
    socket.emit('sendMessage', messageObject)
  }
}


socket.on('receivedMessage', message => {
  renderMessages(message)
})

socket.on('previousMessages', messages => {
  messages.map(renderMessages)
})

$('form').onsubmit = handleSubmit