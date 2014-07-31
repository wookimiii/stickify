BIN=./node_modules/.bin

compress: compress/js compress/css

compress/js: node_modules
	$(BIN)/uglifyjs --comments all javascripts/jquery.stickify.js > javascripts/jquery.stickify.min.js

compress/css: node_modules
	$(BIN)/cleancss -o stylesheets/stickify.min.css stylesheets/stickify.css

node_modules:
	npm install
