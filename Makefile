sharedFiles = ./src/shared/shared.coffee
pubDir = ./src/public/javascripts/
pubTestDir = ./test/client/
pubSrcDir = ./src/public/javascripts/src/
pubFiles = ${pubSrcDir}ChatsyEngine.coffee\
		  ${pubSrcDir}ChatsyRoom.coffee
allPubFiles = ${pubFiles} ${sharedFiles}

all: server public tests

tests: server public
	coffee -c $(pubTestDir)

#server
server:
	coffee -c ./src/models/
	coffee -c ./src/services/
	coffee -c ./src/routes/

#public


public: Chatsy.min.js

Chatsy.min.js: Chatsy.js
	uglifyjs $(pubDir)/Chatsy.js > $(pubDir)/Chatsy.min.js
	
#combine the shared file and all other files into Chatsy.js
Chatsy.js: 
	coffee -cj $(pubDir)/Chatsy.js ${allPubFiles} 
	
