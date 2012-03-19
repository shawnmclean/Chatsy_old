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
      var room;
      room = this.unConfirmedRooms.filter(function(element, index, array) {
        return element.data.roomId === roomId;
      })[0];
      if (room) {
        this.rooms.push(room);
        return room.joinedConfirm();
      }
    };

    return ChatsyEngine;

  })();

  this.ChatsyRoom = (function() {

    ChatsyRoom.prototype.data = null;

    ChatsyRoom.prototype.users = null;

    ChatsyRoom.prototype.engine = null;

    ChatsyRoom.prototype.messageRecieved = null;

    ChatsyRoom.prototype.userJoined = null;

    ChatsyRoom.prototype.userLeave = null;

    function ChatsyRoom(engine, data, events) {
      this.engine = engine;
      this.data = data;
      if (!this.engine || !this.data) {
        throw new ReferenceError('All arguments should not be null.');
      }
      if (events) {
        this.messageRecieved = events.messageRecieved;
        this.userJoined = events.userJoined;
        this.userLeave = events.userLeave;
      }
      this.engine.joinRoom(this, this.user);
    }

    ChatsyRoom.prototype.joinedConfirm = function() {
      return console.log("Joined room: ", this.data);
    };

    ChatsyRoom.prototype.createMessage = function(msg) {};

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
