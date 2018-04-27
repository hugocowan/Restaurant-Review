const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/restaurants';
const port = process.env.PORT || 3000;

module.exports = {databaseURI, port};

// This is the same as:
// module.exports = {
//   databaseURI: databaseURI,
//   port: port
// };
