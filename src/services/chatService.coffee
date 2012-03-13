class exports.ChatService
  @db
  @Chat
  constructor: (@io) ->
    mongoose = require('mongoose/')
    @db = mongoose.connect("mongodb://localhost/chat")
    #@db = mongoose.connect("mongodb://shawnmclean:testuser@dbh76.mongolab.com:27767/nodejschat")
    @Chat = @db.model('Chat')
    
    chatInstance = @Chat
    
    @io.sockets.on "connection", (socket) ->
      socket.on "joinRoom", (data) ->        
        socket.get "user", (err, user) ->
          #check if user already in the system and add to room
          if(!user)
            user = data.user
            
          #if user is in no room, create the array else just add the room
          if(!user.rooms)
            user.rooms = new Array(data.roomId)
          else
            user.rooms.add(data.roomId)
          
          console.log "User joined: ", user
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
              message: user
      
      socket.on "leaveRoom", (data) ->
        socket.get "user", (err, user) ->
          #get the room the user is trying to leave and remove it
          if(user.rooms)
            roomIndex = user.rooms.indexOf data.roomId
            user.rooms.splice roomIndex, 1
          
          socket.set 'user', user, () ->            
            socket.leave data.roomId
            socket.broadcast.to(data.roomId).emit "userLeave",
                  message: user    
      
      socket.on "disconnect", () ->
        socket.get "user", (err,user) ->
          console.log "disconnected: ", user
      
      socket.on "message", (data) ->
        socket.get "user", (err, user) ->
          #make sure the user is in the room before anything happens.
          if(user.rooms)
            if(user.rooms.indexOf(data.roomId) > -1)
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

      socket.on "setUserStatus", (data) ->
        #announce to all rooms the user is in of the status change
        #if(user.rooms)
