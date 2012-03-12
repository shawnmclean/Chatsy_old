#shared code between the client and the server
((exports) ->
  UserStatus =
    Away: 0
    Back: 1
    Visible: 2
    Hidden: 3
    
  
) (if typeof exports is "undefined" then this["Chatsy"] = {} else exports)
