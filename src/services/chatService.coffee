class exports.ChatService
  @db
  @Chat
  constructor: (@io) ->
    mongoose = require('mongoose/')
    @db = mongoose.connect("mongodb://localhost/chat")
    @Chat = @db.model('Chat')
    
    chatInstance = @Chat
    
    @io.sockets.on "connection", (socket) ->
      socket.on "joinRoom", (data) ->        
        socket.get "user", (err, user) ->
          #check if user already in the system and add to room
          if(user)
            #if user is in no room, create the array else just add the room
            if(!user.rooms)
              user.rooms = new Array(data.roomId)
            else
              user.rooms.add(data.roomId)
          else
            user = data.user
          
          #save the user to the system again    
          socket.set 'user', user, () ->
            #join the socket room         
            socket.join data.roomId
            
            #get the last 20 message in this room.
            query = chatInstance.find()
            query.limit(20)
            query.where("roomId", data.roomId)

            query.exec (err, data) ->
              if(err)
                console.log "Error: ", err
              else
                #send these messages to the user
                socket.emit "prefill",
                  message: data
            socket.broadcast.to(data.roomId).emit "userJoined",
              message: data
      
      socket.on "disconnect", () ->
        
      
      socket.on "message", (data) ->
        socket.get "user", (err, user) ->
          chat = new chatInstance(
                  message: data.message
                  userId: user.userId
                  friendlyName: user.friendlyName
                  roomId: data.roomId
                )
          #log message to database asynchronously
          chat.save (err) ->
            if(err)
              console.log "Error: ", err
            else
              console.log "Message Saved"         
            io.sockets.in(data.roomId).emit "message",
              message: chat
