/**
 * medicinesService.js
 */

const hosts = require('../configs/hosts');
const mock = require('../mochups/medicines');
const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {

    /**
     * Bootstraps the medicines data.
     */
    bootstrapMedicines: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let medicinesPromises = [];
            for (let i = 0; i < mock.medicines.length; i++) {
                let medicine = mock.medicines[i];
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/medicines"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: medicine,
                    json: true
                }
                medicinesPromises.push(rp(options));
            }
            Promise.all(medicinesPromises).then(medicinesRes => {
                return resolve(medicinesRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    },

    /**
     * Bootstraps the drugs data.
     */
    bootstrapDrugs: function(medicinesToken, medicines) {
        return new Promise((resolve, reject) => {
            
            // create relations
            mock.drugs[0].medicines = [
                medicines[0], medicines[1], medicines[2]
            ];
            mock.drugs[1].medicines = [
                medicines[3], medicines[4]
            ];
            mock.drugs[2].medicines = [
                medicines[5], medicines[6]
            ];

            let drugsPromises = [];
            for (let i = 0; i < mock.drugs.length; i++) {
                let drug = mock.drugs[i];
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/drugs"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: drug,
                    json: true
                }
                drugsPromises.push(rp(options));
            }
            Promise.all(drugsPromises).then(drugsRes => {
                return resolve(drugsRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    },

    /**
     * Bootstraps the posologies data.
     */
    bootstrapPosologies: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let posologiesPromises = [];
            for (let i = 0; i < mock.posologies.length; i++) {
                let posology = mock.posologies[i];
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/posologies"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: posology,
                    json: true
                }
                posologiesPromises.push(rp(options));
            }
            Promise.all(posologiesPromises).then(posologiesRes => {
                return resolve(posologiesRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    },

    /**
     * Bootstraps the comments data.
     */
    bootstrapComments: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let commentsPromises = [];
            for (let i = 0; i < mock.comments.length; i++) {
                let comment = mock.comments[i];
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/comments"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: comment,
                    json: true
                }
                commentsPromises.push(rp(options));
            }
            Promise.all(commentsPromises).then(commentsRes => {
                return resolve(commentsRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    },

    /**
     * Bootstraps the presentations data.
     */
    bootstrapPresentations: function(medicinesToken, drugs, posologies, comments) {
        
        return new Promise((resolve, reject) => {
            
            // create relations
            mock.presentations[0].drug = drugs[0];
            mock.presentations[0].posologies = [
                posologies[0], posologies[1]
            ];
            mock.presentations[0].comments = [
                comments[0]
            ];
            mock.presentations[1].drug = drugs[0];
            mock.presentations[1].posologies = [
                posologies[2], posologies[3]
            ];
            mock.presentations[1].comments = [
                comments[1]
            ];

            
            mock.presentations[2].drug = drugs[1];
            mock.presentations[2].posologies = [
                posologies[4], posologies[5]
            ];
            mock.presentations[2].comments = [
                comments[2]
            ];
            mock.presentations[3].drug = drugs[1];
            mock.presentations[3].posologies = [
                posologies[6], posologies[7]
            ];
            mock.presentations[3].comments = [
                comments[3]
            ];
            
            mock.presentations[4].drug = drugs[2];
            mock.presentations[4].posologies = [
                posologies[8], posologies[9]
            ];
            mock.presentations[4].comments = [
                comments[4]
            ];
            mock.presentations[5].drug = drugs[2];
            mock.presentations[5].posologies = [
                posologies[10], posologies[11]
            ];
            mock.presentations[5].comments = [
                comments[5]
            ];

            let presentationsPromises = [];
            for (let i = 0; i < mock.presentations.length; i++) {
                let presentation = mock.presentations[i];
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/presentations"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: presentation,
                    json: true
                }
                presentationsPromises.push(rp(options));
            }
            Promise.all(presentationsPromises).then(presentationsRes => {
                return resolve(presentationsRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    }

}