const http = require('http');
const handler = require('./handlers')

const PORT = 9000;

let data = {
  myNumber: null,
};

const myRouter = (route) => {
  const routes = {
    'myNumber': handler.showNumber,
    'reset': handler.resetNumber,
    'create': handler.createNumber,
  };

  if (routes[route]) {
    return routes[route];
  };
  return handler.notFound;
};

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/JSON');

  const [url, query] = req.url.split('?');
  let [, ...domain] = url.split('/');
  const route = myRouter(domain.join('/').replace(/\/$/, ""));

  route(req, res, data);
});

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
