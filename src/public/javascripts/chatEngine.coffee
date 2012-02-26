$ ->
  #temporary stuff
  roomId = prompt "Enter Room", "Enter Room Here"
  name = prompt "Enter Your name", "Name here"
  server = 'http://localhost:14781/'
  #server = 'http://chatroomsnodejs.nodester.com/'
  
  socket = io.connect server
  
  #the input for sending messages
  textBox = $('#msg')
  
  $('#leave').click (e) ->
    socket.emit "leaveRoom"
      user:
        friendlyName: name
        userId: name
      roomId: roomId
    e.preventDefault()
    
  
  #sending the message to the server event on enter keypress
  $('#msg').keypress (e) ->
    if(e.keyCode==13)
      sendMsg $(this).val()
      e.preventDefault()
      $(this).val('')
    
  #function that accepts returned messages from server
  messageReturned = (data) ->
    $('#chatList').append("<li>#{data.created}: #{data.friendlyName}: #{data.message} </li>")
    
  userJoined = (user) ->
    $('#chatList').append("<li> #{user.friendlyName} joined </li>")

  userLeave = (user) ->
    $('#chatList').append("<li> #{user.friendlyName} left </li>")

  socket.emit "joinRoom",
    user:
      friendlyName: name
      userId: name
    roomId: roomId
      
  
  socket.on "userJoined", (data) ->
    userJoined data.message
  
  socket.on "userLeave", (data) ->
    userLeave data.message

  socket.on "prefill", (messages) ->
    for msg in messages.message
      messageReturned msg
      
  socket.on "message", (data) ->
    messageReturned data.message
  
  #function for sending message to the server
  sendMsg = (msg) ->
    socket.emit "message",
      roomId: roomId
      message: msg
      
      
