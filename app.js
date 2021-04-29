const http = require('http');
const handler = require('./handlers')

const PORT = 9000;

let data = {
  myNumber: null,
};

const myRouter = (route) => {
  const routes = {
    '/myNumber': handler.showNumber,
    '/reset': handler.resetNumber,
    '/create': handler.createNumber,
  };

  if (routes[route]) {
    return routes[route];
  };
  return handler.notFound;
};

const server = http.createServer((req, res) => {
  const [url, query] = req.url.split('?');
  let sett = url.split('/')
  // console.log(sett);
  const route = myRouter(url);
  route(req, res, data);
  console.log(data);
  return;
});

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
