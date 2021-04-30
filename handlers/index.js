const notFound = (req, res) => {
  res.statusCode = 404;
  return res.end(JSON.stringify({
    message: 'Resource not found!'
  }));
}

const noNumber = (req, res) => {
  res.statusCode = 404;
  return res.end(JSON.stringify({
    message: 'myNumber does not exist!'
  }));
}

const notANumber = (req, res, variable) => {
  res.statusCode = 400;
  return res.end(JSON.stringify({
    message: `${variable} has to be a number!`
  }));
}

const showNumber = (req, res, data) => {
  if (req.method === 'GET') {
    
    // const [url, query] = req.url.split('?');
    // const multiplierReg = /^multiplier=\d+$/;
    if (data.myNumber === null) return noNumber(req, res);

    // if (multiplierReg.test(query)) {
    //   console.log(parseInt(query));
    //   if (isNaN(parseInt(query))) return notANumber(req, res, 'Query.multipler');
      
    //   res.statusCode = 200;
    //   return res.end(JSON.stringify({
    //     "result": data.myNumber * parseInt(query),
    //   }));
    // } else {
      res.statusCode = 200;
      return res.end(JSON.stringify(data));
    // }
  } else {
    notFound(req, res);
  };
}

const resetNumber = (req, res, data) => {
  if (req.method === 'DELETE') {
    if (data.myNumber === null) return noNumber(req, res);
    res.statusCode = 200;
    data.myNumber = null;
    return res.end(JSON.stringify({
      message: 'myNumber has been deleted!'
    }));
  } else {
    notFound(req, res);
  };
}

const createNumber = (req, res, data) => {

  if (req.method === 'PUT') {
    const rawData = [];

    req.on('data', (chunk) => {
      rawData.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(rawData).toString();
      const body = JSON.parse(buffer);
      if (isNaN(body.myNumber)) return notANumber(req, res, 'myNumber');

      data.myNumber = Number(body.myNumber);
      return res.end(JSON.stringify({
        message: 'myNumber has been updated!'
      }));
    })
  } else {
    notFound(req, res);
  };
}

module.exports = {
  showNumber,
  notFound,
  resetNumber,
  createNumber,
};
