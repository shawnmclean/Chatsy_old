(function() {
  var ChatsyEngine, ChatsyRoom;

  ChatsyEngine = (function() {

    ChatsyEngine.prototype.rooms = new Array();

    ChatsyEngine.prototype.user = null;

    ChatsyEngine.prototype.socket = null;

    function ChatsyEngine(url, user) {
      this.user = user;
      if (!this.user) throw new ReferenceError('User cannot be null.');
      this.socket = io.connect(server);
    }

    ChatsyEngine.prototype.joinRoom = function(room) {
      return this.socket.emit("joinRoom", {
        roomId: room.roomId,
        user: this.user
      });
    };

    return ChatsyEngine;

  })();

  ChatsyRoom = (function() {

    ChatsyRoom.prototype.roomId = null;

    ChatsyRoom.prototype.users = null;

    ChatsyRoom.prototype.engine = null;

    ChatsyRoom.prototype.messageRecieved = null;

    ChatsyRoom.prototype.userJoined = null;

    ChatsyRoom.prototype.userLeave = null;

    function ChatsyRoom(engine, roomId, events) {
      this.engine = engine;
      this.roomId = roomId;
      if (!this.engine || !this.roomId) {
        throw new ReferenceError('All arguments should not be null.');
      }
      if (events) {
        this.messageRecieved = events.messageRecieved;
        this.userJoined = events.userJoined;
        this.userLeave = events.userLeave;
      }
      this.engine.joinRoom(this, this.user);
    }

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
