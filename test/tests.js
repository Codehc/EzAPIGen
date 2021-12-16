import { registerEndpoint, listen } from '../src/server.mjs'
const endpoint = require('../src/endpoint');

class repeat extends endpoint {
    constructor() {
        /* 
         * The first argument is a string which is
         * how you will access your endpoint through https.
         *
         * The second argument takes a list of arguments which will
         * be accessible through the args parameter in our callback method.
         *  - The server will ensure that all args are given by the user
         *    before calling the callback.
         */
        super("repeat", ['text'])
    }

    /*
     * The callback method is the code that
     * will run when this endpoint is accessed
     * 
     * req is information about the request the client sends
     *  - So far I haven't used it much but if you need it, it's there
     * 
     * args is an object of arguments, you access each argument through standard
     * object notation
     *  - Again, the server will ensure that all args are given by the user
     *    and will put them int this object before calling the callback
     * 
     * The callback method must return an object with a
     *  - statusCode: the HTTP status code to return
     *  - header: the header of the response
     *  - message: the actual response, the type must match
     *             the type of response promised in the header
    */
    callback(req, args) {
        return {
            statusCode: 200,
            header: ['Content-Type', 'text/plain'],
            message: args.text
        }
    }
}

// Register new endpoint
const repeatEndpoint = new repeat();
registerEndpoint(repeatEndpoint);

// Start the server
listen('127.0.0.1', 8080);