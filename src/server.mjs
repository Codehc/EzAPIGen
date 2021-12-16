import 'http';
import { parseURL } from './utils/parse_url.mjs';

export const HTTPRequest = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
}

const endpoints = [];
let server;

export function registerEndpoint(endpoint, requiredArgs, callback) {
  endpoints.push(endp);
}

export function listen(hostname, port) {
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