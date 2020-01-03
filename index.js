var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    path = require('path');

// Load environment variables
require('dotenv').config();

if (!process.env.requestHeaderName) { throw new Error('You must set an environment variable for requestHeaderName.'); }
if (!process.env.certName) { throw new Error('You must set an environment variable for certName.'); }
if (!process.env.targetHost) { throw new Error('You must set an environment variable for target host.'); }
if (!process.env.targetPort) { throw new Error('You must set an environment variable for target port.'); }
if (!process.env.port) { throw new Error('You must set an environment variable for port.'); }

var options = {
  target: {
    host: process.env.targetHost,
    port: process.env.targetPort
  }
};

if (process.env.secure == 'true') {
  options.ssl = {
    key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'localhost-crt.pem'), 'utf8')
  }
}

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer(options);

var certMap = {};

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  const certName = process.env.certName;

  if (!certName) {
    throw new Error('You must specify a certificate name in the .env file. Look at .env.example for an example.');
  }

  if (!certMap[certName]) {
    // Get the text from the certificate file, removing new lines
    certMap[certName] = fs.readFileSync(path.join(__dirname, 'certs', certName), 'utf8').replace(/\n/g, '');
  }

  const pemString = certMap[certName];

  proxyReq.setHeader(process.env.requestHeaderName, pemString);
});

proxy.listen(process.env.port, () => {
  console.log("listening on port " + process.env.port);
});
