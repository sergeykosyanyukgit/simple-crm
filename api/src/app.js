const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const dbService = require('./services/db-service')
const errorMiddleware = require('./middlewares/error-middleware')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

require('./routes')(app)
app.use(errorMiddleware)

try {
  app.listen(80)
  console.log(`http://localhost:${process.env.APP_SERVER_PORT}`)
}
catch(e) {
  console.log(e)
}
