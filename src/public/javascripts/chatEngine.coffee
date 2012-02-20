$ ->
  server = 'http://localhost:14124/'
  
  socket = io.connect server
  
  #the input for sending messages
  textBox = $('#msg')
  
  #sending the message to the server event on enter keypress
  $('#msg').keypress (e) ->
    if(e.keyCode==13)
      sendMsg $(this).val()
      e.preventDefault()
      $(this).val('')
    
  #function that accepts returned messages from server
  messageReturned = (data) ->
    $('#chatList').append("<li> #{data.message.user.username}: #{data.message.message} </li>")
    
  socket.emit "joinRoom",
    user:
      friendlyName: 'Shawn'
      userId: 1
    roomId: 1
      
  
  socket.on "userJoined", (data) ->
    console.log data

  socket.on "message", (data) ->
    messageReturned data
  
  #function for sending message to the server
  sendMsg = (msg) ->
    socket.emit "message",
      user:
        friendlyName: 'Shawn'
        userId: 1
      roomId: 1
      message: msg
      
      
