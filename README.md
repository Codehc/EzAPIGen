# EzAPIGen

EzAPIGen is a simple npm package intended to make it easy to make simple REST APIs (that only support GET requests for now :P)

I made this in one AP CSA class period (and its my first npm package) so its not the best code so please give me feedback if you have any!

Github: [Codehc/EzAPIGen] (https://github.com/Codehc/EzAPIGen)
NPM: [ezapigen] (https://www.npmjs.com/package/ezapigen)

By Codehc#7786 on discord

## Installation

Use the node package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install.

```bash
npm install ezapigen
```

## Usage

First, require EzAPIGen and the endpoint class:

```javascript
const ezapigen = require('ezapigen');
const endpoint = require('ezapigen/endpoint');
```
Once you have it imported, create a new class which `extends` the `endpoint` class and follows this format:
```javascript
// Generate api endpoint class
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
```
Next, you register the endpoint and start the server:
```javascript
// Register new endpoint
const repeatEndpoint = new repeat();
ezapigen.registerEndpoint(repeatEndpoint);

// Start the server
ezapigen.startServer('127.0.0.1', 8080);
```
You can now access your api by going to `http://127.0.0.1:8080/repeat?text=anytext`. Spaces in raw text are not yet supported and you can replace repeat and the arguments with whatever endpoint you made.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)