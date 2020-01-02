# fake-cac-proxy
This project is used to run a proxy server that creates a request header containing a certificate.

This is useful when developing an app that expects a certificate to be in the request header.

## Getting started
1. Make a copy of `.env.example` and name it `.env`. You can edit the values to suit your needs.
2. Install the packages:
```
npm install
```

## Configuration
The settings are stored in `.env`. The available settings are:
- targetHost
- targetPort
- port
- secure
- certName
- requestHeaderName

For example, if you wanted to proxy to a web app running at http://localhost:4200, you could set the values in `.env` like this:
```
targetHost=localhost
targetPort=4200
port=5050
secure=false
certName=Kennedy.John.Fitzgerald.1234567890.crt
requestHeaderName=HTTP_CLIENT_FULL
```
If you ran the project, you would visit http://localhost:5050, and the request would be proxied to http://localhost:4200.

To use, https, set `secure=true` in `.env`.

## Certs
The project contains some cert files in the `certs` directory.
You can generate additional cert files by following these [instructions](https://www.akadia.com/services/ssh_test_certificate.html).

## Run the server
To start the proxy server, run:
```
npm start
```
