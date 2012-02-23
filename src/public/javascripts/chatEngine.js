(function() {

  (function($) {
    return $.fn.chatWindow = function(options) {
      var settings;
      settings = $.extend({
        location: "top",
        "background-color": "blue"
      }, options);
      return this.each(function() {});
    };
  })(jQuery);

  $(function() {
    var messageReturned, name, roomId, sendMsg, server, socket, textBox, userJoined;
    roomId = prompt("Enter Room", "Enter Room Here");
    name = prompt("Enter Your name", "Name here");
    server = 'http://chatroomsnodejs.nodester.com/';
    socket = io.connect(server);
    textBox = $('#msg');
    $('#msg').keypress(function(e) {
      if (e.keyCode === 13) {
        sendMsg($(this).val());
        e.preventDefault();
        return $(this).val('');
      }
    });
    messageReturned = function(data) {
      return $('#chatList').append("<li>" + data.created + ": " + data.friendlyName + ": " + data.message + " </li>");
    };
    userJoined = function(user) {
      return $('#chatList').append("<li> " + user.friendlyName + " joined </li>");
    };
    socket.emit("joinRoom", {
      user: {
        friendlyName: name,
        userId: name
      },
      roomId: roomId
    });
    socket.on("userJoined", function(data) {
      return userJoined(data.message.user);
    });
    socket.on("prefill", function(messages) {
      var msg, _i, _len, _ref, _results;
      _ref = messages.message;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        msg = _ref[_i];
        _results.push(messageReturned(msg));
      }
      return _results;
    });
    socket.on("message", function(data) {
      return messageReturned(data.message);
    });
    return sendMsg = function(msg) {
      return socket.emit("message", {
        roomId: roomId,
        message: msg
      });
    };
  });

}).call(this);
