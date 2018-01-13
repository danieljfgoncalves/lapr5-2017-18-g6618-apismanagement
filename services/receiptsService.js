/**
 * medicinesService.js
 */

const hosts = require('../configs/hosts');
const self = require('../configs/self');
const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {

    /**
     * Bootstraps the receipts data.
     */
    bootstrapReceipts: function(userToken, medicinesDTO) {
        return new Promise((resolve, reject) => {

            let receipts = this.createReceipts(medicinesDTO);

            let receiptsPromises = [];
            for (let i = 0; i < receipts.length; i++) {
                let receipt = receipts[i];
                let options = {
                    url: hosts.receiptsManagement.url.concat("/api/medicalReceipts"),
                    method: "POST",
                    headers: {
                        "Authorization": userToken,
                        "client_id": self.auth0Client.id,
                        "client_secret": self.auth0Client.secret
                    },
                    body: receipt,
                    json: true
                }
                receiptsPromises.push(rp(options));
            }
            Promise.all(receiptsPromises).then(receiptsRes => {
                return resolve(receiptsRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    },

    /**
     * Creates the receipts mock data.
     * (with relations from given medicinesDTO)
     */
    createReceipts: function(medicinesDTO) {
        return [
            {
                "physician": "auth0|5a59f56620ca020c265c77bf", // Daryl
                "patient": "auth0|5a59f2be558f0a0c2b1d5500", // Maggie
                "prescriptions": [
                   {
                       "expirationDate": "2019-01-25",
                       "quantity": 30,
                       "medicine": medicinesDTO.medicines[0].id,
                       "presentation": medicinesDTO.presentations[0].id,
                       "posology": medicinesDTO.posologies[0].id
                   }
                ]
            },
            {
                "physician": "auth0|5a59f56620ca020c265c77bf", // Daryl
                "patient": "auth0|5a59f2d4558f0a0c2b1d5503", // Glenn
                "prescriptions": [
                   {
                       "expirationDate": "2018-10-11",
                       "quantity": 60,
                       "medicine": medicinesDTO.medicines[1].id,
                       "presentation": medicinesDTO.presentations[1].id,
                       "posology": medicinesDTO.posologies[2].id
                   }
                ]
            },
            
            {
                "physician": "auth0|5a59f53d20ca020c265c77b5", // Rick
                "patient": "auth0|5a59f2a520ca020c265c7786", // Judith
                "prescriptions": [
                   {
                       "expirationDate": "2021-01-16",
                       "quantity": 50,
                       "medicine": medicinesDTO.medicines[3].id,
                       "presentation": medicinesDTO.presentations[2].id,
                       "posology": medicinesDTO.posologies[4].id
                   }
                ]
            },
            {
                "physician": "auth0|5a59f53d20ca020c265c77b5", // Rick
                "patient": "auth0|5a59f2d4558f0a0c2b1d5503", // Glenn
                "prescriptions": [
                   {
                       "expirationDate": "2018-05-15",
                       "quantity": 100,
                       "medicine": medicinesDTO.medicines[4].id,
                       "presentation": medicinesDTO.presentations[3].id,
                       "posology": medicinesDTO.posologies[6].id
                   }
                ]
            },
            
            {
                "physician": "auth0|5a59f55220ca020c265c77ba", // Michonne
                "patient": "auth0|5a59f2a520ca020c265c7786", // Judith
                "prescriptions": [
                   {
                       "expirationDate": "2023-03-10",
                       "quantity": 22,
                       "medicine": medicinesDTO.medicines[5].id,
                       "presentation": medicinesDTO.presentations[4].id,
                       "posology": medicinesDTO.posologies[8].id
                   }
                ]
            },
            {
                "physician": "auth0|5a59f55220ca020c265c77ba", // Michonne
                "patient": "auth0|5a59f2be558f0a0c2b1d5500", // Maggie
                "prescriptions": [
                   {
                       "expirationDate": "2018-02-22",
                       "quantity": 46,
                       "medicine": medicinesDTO.medicines[6].id,
                       "presentation": medicinesDTO.presentations[5].id,
                       "posology": medicinesDTO.posologies[10].id
                   }
                ]
            }
        ];
    }

}