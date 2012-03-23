class @ChatsyEngine
  #keep a list of ChatsyRoom objects the user is currently in
  rooms: new Array()
  #rooms awaiting confirmation from the server
  unConfirmedRooms: new Array()
  
  #the user client that is using the engine
  user: null
  
  socket: null
  
  constructor: (url, @user) ->
    if(!@user)
      throw new ReferenceError('User cannot be null.')
    @socket = io.connect url
    engine = this
    #set up event for when the user has a join room confirmation
    @socket.on 'joinedConfirm', (message) ->
      engine.joinRoomConfirmed(message.roomId)
    
    @socket.on 'message', (message) ->
      console.log "test"
    
  #accepts a ChatsyRoom object
  joinRoom: (room) ->
    #check to see if room is of type ChatsyRoom
    if(!room instanceof ChatsyRoom)
      throw new Exception('parameter must be of type "ChatsyRoom"')
    
    @socket.emit "joinRoom"
      room: room.data
      user: @user
    #add to unconfirmed rooms
    #check to see if the room is already added
    if(@unConfirmedRooms.indexOf(room) >= 0)
      return
    else
      @unConfirmedRooms.push room
            
  joinRoomConfirmed: (roomId)->
    engine = this
    #get the room from unconfirmed list
    room = @unConfirmedRooms.filter((element, index, array) ->
      element.data.roomId == roomId
    )[0]
    #if it exist in unconfirmed room, then remove it and add it to active rooms
    if(room)      
      #remove from unconfirmed
      
      #add to active
      @rooms.push room
      room.joinedConfirm()
      
      #setup events
      room.onSendMessage = (message, roomId) ->
        engine.sendMessage(message, roomId)
      
  sendMessage: (message, roomId) ->
    @socket.emit "message",
      roomId: roomId
      message: message
      