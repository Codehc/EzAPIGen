function parseURL(url) {
    let parsedURL = {
        structure: undefined,
        endpoint: undefined,
        args: {}
    }
    let splitURL = url.split('/');
    splitURL = splitURL.slice(1, splitURL.length);

    if (splitURL.includes('')) return {error: 'too many /'};

    if (splitURL.length == 0) return {error: 'no endpoint'};
    else if (splitURL.length > 1) parsedURL.structure = splitURL.slice(0, -1);

    const endpointArgs = splitURL[splitURL.length - 1].split('?');
    parsedURL.endpoint = endpointArgs[0];
    if (endpointArgs.length == 2) {
        // Add args
        const args = endpointArgs[1].split('&');
        args.forEach(arg => {
            arg = arg.split('=');
            if (arg.length != 2) return {error: 'too many equals in arg'};
            if (arg[0] == '' || arg[1] == '') return {error: 'invalid arg'};
            parsedURL.args[arg[0]] = processInput(arg[1]);
        });
    }

    console.log(parsedURL);

    return parsedURL;
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
    parseURL
}