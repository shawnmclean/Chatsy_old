all: server public

#server
server: shared
	coffee -c ./src/models/
	coffee -c ./src/services/
	coffee -c ./src/routes/

#public
PUBLICDIR = ./src/public/javascripts

public: Chatsy.min.js

Chatsy.min.js: Chatsy.js
	uglifyjs $(PUBLICDIR)/Chatsy.js > $(PUBLICDIR)/Chatsy.min.js
	
#combine the shared file and main files into Chatsy.js
Chatsy.js: $(PUBLICDIR)/Chatsy.coffee shared
	coffee -cj $(PUBLICDIR)/Chatsy.js ./src/shared/shared.coffee $(PUBLICDIR)/Chatsy.coffee 
	
shared: ./src/shared/shared.coffee
	coffee -c ./src/shared/shared.coffee