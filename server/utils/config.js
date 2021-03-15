let PORT = process.env.PORT || 3001

let MONGODB_URI = 'mongodb://localhost:27017/dev_db'

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = 'mongodb://localhost:27017/test_db'
}

if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = 'mongodb://kierratysavustin_db:27017/prod_db'
}

module.exports = {
  MONGODB_URI,
  PORT
}