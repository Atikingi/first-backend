const http = require("http");
const getUsers = require('../src/modules/get-users.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1';

const server = http.createServer((request, response) => {
    const url = new URL(request.url, ORIGIN);
    const params = url.searchParams;
    const allowedRequests = ['users', 'hello'];
    const iterator = params.entries();

    for (const [entries] of iterator) {
        if (!allowedRequests.includes(entries)) {
            response.statusCode = 500;
            response.statusMessage = 'Internal Server Error';
            response.header = "Content-type: text/plain";

            response.end();
            return;
        }
    }

    if (url.href === 'http://127.0.0.1' || url.href === 'http://127.0.0.1/') {
        console.log(params)
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.header = "Content-type: text/plain"

        response.write('Hello, world');

        response.end();
        return;
    }

    if (params.get('hello')) {
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.header = "Content-type: text/plain"

        response.write(`Hello, ${params.get('hello')}`);
        response.end();
        return;
    } else if (params.has('hello') && !params.get('hello')) {
        response.statusCode = 400;
        response.statusMessage = "Bad Request";
        response.header = "Content-type: text/plain";

        response.write("Say your name");

        response.end();
        return;
    }

    if (params.has('users')) {
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.header = "Content-type: application/json"

        response.write(getUsers());

        response.end();
        return;
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${ORIGIN}:${PORT}`);
});