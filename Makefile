compress: node_modules
	./node_modules/.bin/cleancss -o stylesheets/stickify.min.css stylesheets/stickify.css

node_modules:
	npm install
