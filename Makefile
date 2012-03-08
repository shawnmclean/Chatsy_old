all: server public

#server
server:
	coffee -c ./src/models/
	coffee -c ./src/services/
	coffee -c ./src/routes/

#public
PUBLICDIR = ./src/public/javascripts

public: chatEngine.min.js

chatEngine.min.js: chatEngine.js
	uglifyjs $(PUBLICDIR)/chatEngine.js > $(PUBLICDIR)/chatEngine.min.js
	
chatEngine.js: $(PUBLICDIR)/chatEngine.coffee
	coffee -c $(PUBLICDIR)/chatEngine.coffee