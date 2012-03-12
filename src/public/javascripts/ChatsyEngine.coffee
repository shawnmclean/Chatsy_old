class ChatsyEngine
  #keep a list of ChatsyRoom objects the engine is managing
  rooms: null
  #the user client that is using the engine
  user: null
  
  socket: null
  
  constructor: (url, @user) ->
    if(!@user)
      throw new ReferenceError('User cannot be null.')
    @socket = io.connect server
    
  #accepts a ChatsyRoom object
  joinRoom: (room) ->
    socket.emit "joinRoom"
      roomId: room.roomId
      user: @user
      
