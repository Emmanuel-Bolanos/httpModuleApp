
const notFound = (req, res) => {
  console.log('not found');
  return res.end();
}

const showNumber = (req, res, data) => {
  return res.end(JSON.stringify(data));
}

const resetNumber = (req, res, data) => {
  console.log('reset called');  
  return res.end();
}

const createNumber = (req, res, data) => {
  data.myNumber++;
  console.log('updated number');
  return res.end();
}

module.exports = {
  showNumber,
  notFound,
  resetNumber,
  createNumber,
};
