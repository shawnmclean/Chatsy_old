(function() {

  $(function() {
    var messageReturned, sendMsg, server, socket, textBox;
    server = 'http://localhost:14124/';
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
      return $('#chatList').append("<li> " + data.message.user.username + ": " + data.message.message + " </li>");
    };
    socket.emit("joinRoom", {
      user: {
        friendlyName: 'Shawn',
        userId: 1
      },
      roomId: 1
    });
    socket.on("userJoined", function(data) {
      return console.log(data);
    });
    socket.on("message", function(data) {
      return messageReturned(data);
    });
    return sendMsg = function(msg) {
      return socket.emit("message", {
        user: {
          friendlyName: 'Shawn',
          userId: 1
        },
        roomId: 1,
        message: msg
      });
    };
  });

}).call(this);
