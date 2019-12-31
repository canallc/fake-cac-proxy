# fake-cac-proxy
This project is used to run a proxy server that creates a request header containing a certificate.

This is useful when developing an app that expects a certificate to be in the request header.

For example, if you had another web app running on localhost, port 4200, you could set the values in `.env` like this:
```
certName=Kennedy.John.Fitzgerald.1234567890.crt
target=http://localhost:4200
port=5050
requestHeaderName=HTTP_CLIENT_FULL
```
If you ran the project, you would visit http://localhost:5050, and the request would be proxied to http://localhost:4200.

The project contains some cert files in the `certs` directory.
You can generate additional cert files by following these [instructions](https://www.akadia.com/services/ssh_test_certificate.html).

## Getting started
Make a copy of `.env.example` and name it `.env`. You can edit the values in it to suit your needs.
