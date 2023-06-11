const express = require('express');
const cors = require('cors');
// const jwt = require('express-jwt')
// const jwks = require('jwks')
const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer');
const {baseURL} = require('./keys')
const {audience_id} = require('./keys')

const app = express();
app.use(cors());

const jwtCheck = auth({
    audience: audience_id,
    issuerBaseURL: baseURL,
    tokenSigningAlg: 'RS256'
  })
  console.log("baseURL", "audience_id", baseURL, audience_id)
  // enforce on all endpoints
  app.use(jwtCheck);

app.get('/', (req,res) => {
    res.send('Hello from index route');
});

app.get('/protected', (req,res) => {
    res.send(req.user);
});

app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "internal server error"
    res.status(status).send(message)
})

app.listen('4000', () => console.log('Server on port 4000'));