module.exports = class {
    constructor(endpoint, requiredArgs) {
        this.endpoint = endpoint;
        this.requiredArgs = requiredArgs;
    }

    run(req, args, res) {
        let result = this.callback(req, args);

        // Check result
        if (result == undefined || result.statusCode == undefined || 
            (result.header == undefined || result.header.length != 2 ) || 
            result.message == undefined) {

            // Invalid result
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Sorry, something went wrong on our end, please try again later");
        } else {
            res.statusCode = result.statusCode;
            res.setHeader(result.header[0], result.header[1]);
            res.end(result.message);
        }
    }

    // Default callback method, does nothing and will cause 'something to go wrong on our end' if called
    callback() {}
}