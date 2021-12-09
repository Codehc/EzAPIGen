const http = require('http');

let endpoints = [];
let server;

function registerEndpoint(endp) {
  endpoints.push(endp);
}

function startServer(hostname, port) {
  server = http.createServer((req, res) => {
    let success = endpoints.some(endp => {
      let url = req.url.replace('/', '');
      let splitURL = url.split('?');
  
      if (endp.endpoint == splitURL[0]) {
        let args = {};
        if (splitURL.length >= 2) {
          let argsRaw = splitURL[1].split("&");
          argsRaw.forEach(arg => {
            let splitArg = arg.split("=");
            if (splitArg.length == 2 && splitArg[1] != '') args[splitArg[0]] = splitArg[1];
          });
        }
        
        // Check if args are valid
        let keys = Object.keys(args).sort();
        let requiredArgs = endp.requiredArgs.sort();
        if (keys.length === requiredArgs.length && keys.every((key, index) => { return key === requiredArgs[index] })) {
          endp.run(req, args, res);
          return true;
        }
      }
    });
  
    if (success == false) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Invalid Request');
    }
  });

  if (server != undefined) {
    server.listen(port, hostname, () => {
      return true;
    });
  } else {
    return false;
  }
}

module.exports = {
  registerEndpoint,
  startServer
}