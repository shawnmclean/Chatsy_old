class @ChatsyEngine
  #keep a list of ChatsyRoom objects the engine is managing
  rooms: new Array()
  #the user client that is using the engine
  user: null
  
  socket: null
  
  constructor: (url, @user) ->
    if(!@user)
      throw new ReferenceError('User cannot be null.')
    @socket = io.connect server
    
  #accepts a ChatsyRoom object
  joinRoom: (room) ->
    #check to see if room is of type ChatsyRoom
    if(get_type room != "ChatsyRoom")
      throw new Exception('parameter must be of type "ChatsyRoom"')
    #check to see if the room is already added
    if(@rooms.indexOf room >= 0)
      return
    @socket.emit "joinRoom"
      roomId: room.roomId
      user: @user
      
