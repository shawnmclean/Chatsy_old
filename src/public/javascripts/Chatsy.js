(function() {

  this.ChatsyEngine = (function() {

    ChatsyEngine.prototype.rooms = new Array();

    ChatsyEngine.prototype.unConfirmedRooms = new Array();

    ChatsyEngine.prototype.user = null;

    ChatsyEngine.prototype.socket = null;

    function ChatsyEngine(url, user) {
      var engine;
      this.user = user;
      if (!this.user) throw new ReferenceError('User cannot be null.');
      this.socket = io.connect(url);
      engine = this;
      this.socket.on('joinedConfirm', function(message) {
        return engine.joinRoomConfirmed(message.roomId);
      });
      this.socket.on('message', function(message) {
        return console.log("test");
      });
    }

    ChatsyEngine.prototype.joinRoom = function(room) {
      if (!room instanceof ChatsyRoom) {
        throw new Exception('parameter must be of type "ChatsyRoom"');
      }
      this.socket.emit("joinRoom", {
        room: room.data,
        user: this.user
      });
      if (this.unConfirmedRooms.indexOf(room) >= 0) {} else {
        return this.unConfirmedRooms.push(room);
      }
    };

    ChatsyEngine.prototype.joinRoomConfirmed = function(roomId) {
      var engine, room;
      engine = this;
      room = this.unConfirmedRooms.filter(function(element, index, array) {
        return element.data.roomId === roomId;
      })[0];
      if (room) {
        this.rooms.push(room);
        room.joinedConfirm();
        return room.onSendMessage = function(message, roomId) {
          return engine.sendMessage(message, roomId);
        };
      }
    };

    ChatsyEngine.prototype.sendMessage = function(message, roomId) {
      return this.socket.emit("message", {
        roomId: roomId,
        message: message
      });
    };

    return ChatsyEngine;

  })();

  this.ChatsyRoom = (function() {

    ChatsyRoom.prototype.data = null;

    ChatsyRoom.prototype.users = null;

    ChatsyRoom.prototype.messageRecieved = null;

    ChatsyRoom.prototype.userJoined = null;

    ChatsyRoom.prototype.userLeave = null;

    ChatsyRoom.prototype.roomJoined = null;

    ChatsyRoom.prototype.onSendMessage = null;

    function ChatsyRoom(data, events) {
      this.data = data;
      if (!this.data) {
        throw new ReferenceError('All arguments should not be null.');
      }
      if (events) {
        this.messageRecieved = events.messageRecieved;
        this.userJoined = events.userJoined;
        this.userLeave = events.userLeave;
        this.roomJoined = events.roomJoined;
      }
    }

    ChatsyRoom.prototype.joinedConfirm = function() {
      if (this.roomJoined) return this.roomJoined();
    };

    ChatsyRoom.prototype.sendMessage = function(msg) {
      if (this.onSendMessage) return this.onSendMessage(msg, this.data.roomId);
    };

    return ChatsyRoom;

  })();

  (function(exports) {
    var UserStatus;
    return UserStatus = {
      Away: 0,
      Back: 1,
      Visible: 2,
      Hidden: 3
    };
  })((typeof exports === "undefined" ? this["Chatsy"] = {} : exports));

}).call(this);
