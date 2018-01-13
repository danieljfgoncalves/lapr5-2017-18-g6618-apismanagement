/**
 * authentication.js
 */

const request = require('request');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const hosts = require('../configs/hosts');
const self = require('../configs/self');

/**
 * Authentication middleware. When used, the
 * access token must exist and be verified against
 * the Auth0 JSON Web Key Set.
 */ 
exports.handleToken = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: hosts.auth0.url.concat('/.well-known/jwks.json')
    }),

    // Validate the audience and the issuer.
    audience: 'https://receipts-backend-api/',
    issuer: hosts.auth0,
    algorithms: ['RS256']
});

/**
 * Gets auth0 api token.
 */
exports.getAuth0Token = (req, res, next) => {

    var options = {
        method: 'POST',
        url: hosts.auth0.url + '/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: {
            grant_type: 'client_credentials',
            client_id: self.auth0Client.id,
            client_secret: self.auth0Client.secret,
            audience: 'https://lapr5-3da.eu.auth0.com/api/v2/'
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        if (body.hasOwnProperty("error")) {
            return res.status(403).send({"Message":"Unauthorized API Client"});
        }

        req.auth0Token = body;
        return next();
    });
}; 

/**
 * Gets medicines management api token.
 */
exports.getMedicinesManagementToken = (req, res, next) => {

    var options = {
        method: 'POST',
        url: 'https://lapr5-3da.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: 
        {
            grant_type: 'client_credentials',
            client_id: self.auth0Client.id,
            client_secret: self.auth0Client.secret,
            audience:"https://medicines-backend-api/"
        },
        json:true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        if (body.hasOwnProperty("error")) {
            return res.status(403).send({"Message":"Unauthorized API Client"});
        }

        req.medicinesToken = body;
        return next();
    });
    
};