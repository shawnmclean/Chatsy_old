all: server public

#server
server:
	coffee -c ./src/models/
	coffee -c ./src/services/
	coffee -c ./src/routes/

#public
pubDir = ./src/public/javascripts/
pubSrcDir = ./src/public/javascripts/src/

pubFiles = ${pubSrcDir}ChatsyEngine.coffee\
		  ${pubSrcDir}ChatsyRoom.coffee

sharedFiles = ./src/shared/shared.coffee

allPubFiles = ${pubFiles} ${sharedFiles}

public: Chatsy.min.js

Chatsy.min.js: Chatsy.js
	uglifyjs $(pubDir)/Chatsy.js > $(pubDir)/Chatsy.min.js
	
#combine the shared file and all other files into Chatsy.js
Chatsy.js: 
	coffee -cj $(pubDir)/Chatsy.js ${allPubFiles} 
	
