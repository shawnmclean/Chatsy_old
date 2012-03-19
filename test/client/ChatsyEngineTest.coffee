module("ChatsyEngine", {
    setup: -> @routeSpy = sinon.spy()
    teardown: -> window.location.hash = ""
})

test 'engine_throws_error_on_null_user', ->
  c = new ChatsyEngine()
    
test 'joinRoom_throws_error_on_non_ChatsyRoom_parameter', ->
  c = new ChatsyEngine('', 'user')
  c.joinRoom('')
