const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const config = require('./config/config')
const path = require('path')

const fs = require('fs')
const https = require('https')
if(process.env.NODE_ENV == undefined) process.env.NODE_ENV = 'production'
let NODE_ENV = process.env.NODE_ENV
const privateKey  = NODE_ENV == 'development' ? null : fs.readFileSync(config.production.privateKey, 'utf8')
const certificate = NODE_ENV == 'development' ? null : fs.readFileSync(config.production.certificate, 'utf8')
const credentials = {key: privateKey, cert: certificate}

const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({limit: '100mb'}))

app.use(express.static(path.join(__dirname, 'public')))
require('./routes')(app)

if(NODE_ENV == 'development')
{ 
  app.listen(config.development.port)
  console.log(`Development HTTP file server has been started on http://localhost:${config.development.port}`)
}
else if(NODE_ENV == 'production')
{
  let httpsServer = https.createServer(credentials, app)
  httpsServer.listen(config.production.port)
  console.log(`Production HTTPS file server has been started on https://localhost:${config.production.port}`)
}
else
{
  console.log(`File server not started!`)
}
