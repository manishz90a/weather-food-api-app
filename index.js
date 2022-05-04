const server = require('./server.js');

exports.handler =  function(event, context) {
    server.createAndRunServer();
}