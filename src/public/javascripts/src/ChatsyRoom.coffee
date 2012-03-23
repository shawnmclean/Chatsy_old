#ChatsyRoom class that will be required for all chat room instances
class @ChatsyRoom  
  #every room has unique id
  data: null
  #list of users in the room
  users: null
  
  #public events exposed
  messageRecieved: null
  userJoined: null
  userLeave: null
  roomJoined: null
  
  #events exposed to the engine
  onSendMessage: null
  
  constructor: (@data, events) ->
    if(!@data)
      throw new ReferenceError('All arguments should not be null.')
    
    if(events)
      @messageRecieved = events.messageRecieved
      @userJoined = events.userJoined
      @userLeave = events.userLeave
      @roomJoined = events.roomJoined
    
  joinedConfirm: ()->
    if(@roomJoined)
      @roomJoined()
    
  sendMessage: (msg) ->
    if(@onSendMessage)
      @onSendMessage(msg, @data.roomId)
    
      
  