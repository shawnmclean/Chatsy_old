(function() {
  var ChatService, app, chatService, express, io, routes, sio;

  express = require('express');

  routes = require('./routes');

  io = require('socket.io');

  require('./models');

  ChatService = require('./services/chatService').ChatService;

  app = module.exports = express.createServer();

  app.configure(function() {
    app.set('views', "" + __dirname + "/views");
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static("" + __dirname + "/public"));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  app.listen(14124);

  sio = io.listen(app);

  chatService = new ChatService(sio);

  console.log("Express server listening on port " + (app.address().port) + " in " + app.settings.env + " mode");

}).call(this);
