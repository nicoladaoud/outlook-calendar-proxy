
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");
const parser = require('body-parser');
const fetch = require('node-fetch');
//const cors = require('cors');
const express = require('express');

var clientId = process.env.CLIENT_ID;
var seceret = process.env.SECERET;
var teanant = process.env.TEANANT;

var app = express();

app.use(parser.json());


(async () => {
    var authData = null, client = null;

    var authenticate = async function () {
        authData = await (await fetch(`https://login.microsoftonline.com/${teanant}/oauth2/v2.0/token`, { 
            method: 'POST', 
            body: `client_id=${clientId}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&grant_type=client_credentials&client_secret=${seceret}`, 
            headers: {"Content-Type":"application/x-www-form-urlencoded"} 
        })).json()

        client = MicrosoftGraph.Client.init({
            debugLogging: true,
            authProvider: (done) => {
                done(null, authData.access_token); //first parameter takes an error if you can't get an access token
            }
        });
    }
    await authenticate();
    setInterval(authenticate, (authData.expires_in - 60) * 1000); //renew access_token 1 minute before expiration
    

    app.get('/calendar/:email', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        client.api(`/users/${req.params.email}/events`).get((err, msres) => {
            console.log(err);
            res.send(msres);
        });
    });
    

    app.listen(8081)
})()

