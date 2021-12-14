const http = require('http');
const { parseURL } = require('./utils/parse_url')

const endpoints = [];
let server;

function registerEndpoint(endp) {
  endpoints.push(endp);
}

function startServer(hostname, port) {
  server = http.createServer((req, res) => {
    let url = parseURL(req.url)

    let success = endpoints.some(endp => {
      if (url.error != undefined) { 
        errorData = url.error;
        return false;
      } else if (endp.endpoint.toLowerCase() == url.endpoint.toLowerCase()) {
        // Check if args are valid
        let keys = Object.keys(url.args).sort();
        let requiredArgs = endp.requiredArgs.sort();
        if (keys.length === requiredArgs.length && keys.every((key, index) => { return key === requiredArgs[index] })) {
          endp.run(req, url.args, res);
          return true;
        }
      }
    });
  
    if (success == false) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      if (url.error != undefined) res.end(JSON.stringify(url));
      else res.end('Invalid Request');
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

let percentEncodings = [
  ['%7B', '{'],
  ['%7D', '}'],
  ['%7C', '|'],
  ['%5C', '\\'],
  ['%5E', '^'],
  ['%7E', '~'],
  ['%5B', '['],
  ['%5D', ']'],
  ['%60', '`'],
  ['%20', ' ']
]

function processInput(input) {
  percentEncodings.forEach(mapping => {
    input = input.replace(mapping[0].toLowerCase(), mapping[1]);
    input = input.replace(mapping[0], mapping[1]);
  })
  return input;
}

module.exports = {
  registerEndpoint,
  startServer
}