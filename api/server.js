const express = require('express');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const {baseURL, clientId, secret, myBaseURL} = require('./keys')

const app = express();
app.use(cors());

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: myBaseURL,
    clientID: clientId,
    issuerBaseURL: baseURL,
    secret: secret
}

app.use(auth(config))

app.get('/', (req,res) => {
    res.send('Hello from index route');
});

app.get('/protected', async (req,res) => {

    res.send('Hello from protected route');

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