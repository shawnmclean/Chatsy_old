(($) ->
  $.fn.chatWindow = (options) ->
    settings = $.extend(
      location: "top"
      "background-color": "blue"
    , options)
    @each ->
) jQuery
$ ->
  #temporary stuff
  roomId = prompt "Enter Room", "Enter Room Here"
  name = prompt "Enter Your name", "Name here"
  
  server = 'http://chatroomsnodejs.nodester.com/'
  
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
    $('#chatList').append("<li>#{data.created}: #{data.friendlyName}: #{data.message} </li>")
    
  userJoined = (user) ->
    $('#chatList').append("<li> #{user.friendlyName} joined </li>")
    
  socket.emit "joinRoom",
    user:
      friendlyName: name
      userId: name
    roomId: roomId
      
  
  socket.on "userJoined", (data) ->
    userJoined data.message.user

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
      
      
