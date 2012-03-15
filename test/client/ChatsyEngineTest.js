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

}).call(this);
