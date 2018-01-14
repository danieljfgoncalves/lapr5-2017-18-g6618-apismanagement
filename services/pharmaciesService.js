/**
 * pharmaciesService.js
 */

const mock = require('../mochups/pharmacies');
const hosts = require('../configs/hosts');
const self = require('../configs/self');
const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {

    /**
     * Bootstraps the pharmacies data.
     */
    bootstrapPharmacies: function(userToken) {
        return new Promise((resolve, reject) => {

            let pharmaciesPromises = [];
            for (let i = 0; i < mock.pharmacies.length; i++) {
                let pharmacy = mock.pharmacies[i];
                let options = {
                    url: hosts.pharmacyManagement.url.concat("/api/pharmacy"),
                    method: "POST",
                    headers: {
                        "Authorization": userToken,
                        "client_id": self.auth0Client.id,
                        "client_secret": self.auth0Client.secret
                    },
                    body: pharmacy,
                    json: true
                }
                pharmaciesPromises.push(rp(options));
            }
            Promise.all(pharmaciesPromises).then(pharmaciesRes => {
                return resolve(pharmaciesRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    }

}