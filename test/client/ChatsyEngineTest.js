(function() {

  module("ChatsyEngine", {
    setup: function() {
      return this.routeSpy = sinon.spy();
    },
    teardown: function() {
      return window.location.hash = "";
    }
  });

  test('engine_throws_error_on_null_user', function() {
    var c;
    return c = new ChatsyEngine();
  });

  test('joinRoom_throws_error_on_non_ChatsyRoom_parameter', function() {
    var c;
    c = new ChatsyEngine('', 'user');
    return c.joinRoom('');
  });

}).call(this);
