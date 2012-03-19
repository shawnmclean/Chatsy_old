#ChatsyRoom class that will be required for all chat room instances
class @ChatsyRoom  
  #every room has unique id
  data: null
  #list of users in the room
  users: null
  #the chat engine to use (all events and streams are hooked into this for efficiency)
  engine: null
  
  #events exposed
  messageRecieved: null
  userJoined: null
  userLeave: null
  
  constructor: (@engine, @data, events) ->
    if(!@engine || !@data)
      throw new ReferenceError('All arguments should not be null.')
    
    if(events)
      @messageRecieved = events.messageRecieved
      @userJoined = events.userJoined
      @userLeave = events.userLeave
    
    @engine.joinRoom(this, @user)
  
  joinedConfirm: ()->
    console.log "Joined room: ", @data
    
  createMessage: (msg) ->
    
    
      
  