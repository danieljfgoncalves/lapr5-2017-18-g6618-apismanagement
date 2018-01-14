/**
 * auth0Service.js
 */

const mockPhar = require('../mochups/pharmacies');
const mockUser = require('../mochups/users');
const hosts = require('../configs/hosts');
const self = require('../configs/self');
const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {

    /**
     * Bootstraps the pharmacies data.
     */
    addPharmaciesIdToUsers: function(auth0Token, pharmacies) {
        return new Promise((resolve, reject) => {

            let promises = [];
            for (let i = 0; i < pharmacies.length; i++) {
                let pharmacy = pharmacies[i];
                let pharmacist = mockUser.pharmacists[i];
                let options = {
                    url: hosts.auth0.url.concat("/api/v2/users/").concat(pharmacist),
                    method: "PATCH",
                    headers: {
                        "Authorization": auth0Token.token_type.concat(" ").concat(auth0Token.access_token)
                    },
                    body: {
                        "user_metadata": {
                            "pharmacy_id": pharmacy._id
                        }
                    },
                    json: true
                }
                promises.push(rp(options));
            }
            Promise.all(promises).then(pharmaciesRes => {
                return resolve(pharmaciesRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    }

}