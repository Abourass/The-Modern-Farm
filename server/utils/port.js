function normalizePort(portNumber) { // ========================================| Normalize a port into a number, string, or false
  const port = parseInt(portNumber, 10);
  if (typeof port !== 'number') { return portNumber; }
  if (port >= 0) { return port; }
  return false;
}

const port = normalizePort(process.env.PORT || '2777'); // Get port from environment
const mongo = {uri: process.env.mongoURI.toString(), config: {useNewUrlParser: true,  useUnifiedTopology: true}};
module.exports = {port, mongo};

