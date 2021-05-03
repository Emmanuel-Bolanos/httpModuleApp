const notFound = (req, res) => {
  res.statusCode = 404;
  return res.end(JSON.stringify({
    message: 'Resource not found!'
  }));
};

const noNumber = (req, res) => {
  res.statusCode = 404;
  return res.end(JSON.stringify({
    message: 'myNumber does not exist!'
  }));
};

const notANumber = (req, res, variable) => {
  res.statusCode = 400;
  return res.end(JSON.stringify({
    message: `${variable} has to be a number!`
  }));
};

const invalidQuery = (req, res) => {
  res.statusCode = 400;
  return res.end(JSON.stringify({
    message: `Invalid query request!`
  }));
};

const showNumber = (req, res, data) => {
  // only GET requests allowed
  if (req.method !== 'GET') return notFound(req, res);
  // there must be a number
  if (data.myNumber === null) return noNumber(req, res);
    
  const [, query] = req.url.split('?');

  if (!query) {
    // Just show the number if there is no query
    res.statusCode = 200;
    return res.end(JSON.stringify(data));
  }
  
  // Validate query
  const multiplierRegExp = /^multiplier=\d+$/;
  if (multiplierRegExp.test(query)) {
    const multiplier = query.match(/\d+/)[0];
    if (isNaN(multiplier)) return notANumber(req, res, 'Query.multipler');
    // Return result, do not save it
    res.statusCode = 200;
    return res.end(JSON.stringify({
      "result": data.myNumber * multiplier,
    }));
  } else {
    return invalidQuery(req, res);
  };
};

const resetNumber = (req, res, data) => {
  // only DELETE requests allowed
  if (req.method !== 'DELETE') return notFound(req, res);
  // no queries allowed
  const [, query] = req.url.split('?');
  if (query) return invalidQuery(req, res);
  // there must be a number
  if (data.myNumber === null) return noNumber(req, res);
  // delete number and notify client
  res.statusCode = 200;
  data.myNumber = null;
  return res.end(JSON.stringify({
    message: 'myNumber has been deleted!'
  }));
};

const createNumber = (req, res, data) => {
  // only PUT requests allowed
  if (req.method !== 'PUT') return notFound(req, res);
  // no queries allowed
  const [, query] = req.url.split('?');
  if (query) return invalidQuery(req, res);
  // read data
  const rawData = [];
  req.on('data', (chunk) => {
    rawData.push(chunk);
  });
  // create response
  req.on('end', () => {
    const buffer = Buffer.concat(rawData).toString();
    const body = JSON.parse(buffer);
    // validate that myNumber is a number
    if (isNaN(body.myNumber)) return notANumber(req, res, 'myNumber');
    // update value
    data.myNumber = Number(body.myNumber);
    return res.end(JSON.stringify({
      message: 'myNumber has been updated!'
    }));
  });
};

module.exports = {
  showNumber,
  notFound,
  resetNumber,
  createNumber,
};
