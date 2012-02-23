(($) ->
  $.fn.chatWindow = (options) ->
    settings = $.extend(
      location: "top"
      "background-color": "blue"
    , options)
    @each ->
) jQuery
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
    $('#chatList').append("<li> #{data.friendlyName}: #{data.message} </li>")
    
  userJoined = (user) ->
    $('#chatList').append("<li> #{user.friendlyName}: #{user.userId} </li>")
    
  socket.emit "joinRoom",
    user:
      friendlyName: 'Shawn'
      userId: 1
    roomId: 1
      
  
  socket.on "userJoined", (data) ->
    console.log data.message.user

  socket.on "prefill", (messages) ->
    for msg in messages.message
      messageReturned msg
  socket.on "message", (data) ->
    messageReturned data.message
  
  #function for sending message to the server
  sendMsg = (msg) ->
    socket.emit "message",
      roomId: 1
      message: msg
      
      
