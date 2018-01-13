/**
 * medicinesService.js
 */

const hosts = require('../configs/hosts');
const mock = require('../mochups/medicines');
const rp = require('request-promise');
const async = require('async');

module.exports = {

    /**
     * Bootstraps the medicines data.
     */
    bootstrapMedicines: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let medicinesRes = [];
            async.map(mock.medicines, (medicine, callback) => {
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/medicines"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: medicine,
                    json: true
                }
                rp(options).then(medicineRes => {
                    medicinesRes.push(medicineRes);
                    return callback();
                }).catch(err => {
                    return callback();
                });
            }, err => {
                return resolve(medicinesRes);
            });

        });
    },

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

            let drugsRes = [];
            async.map(mock.drugs, (drug, callback) => {
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/drugs"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: drug,
                    json: true
                }
                rp(options).then(drugRes => {
                    drugsRes.push(drugRes);
                    return callback();
                }).catch(err => {
                    return callback();
                });
            }, err => {
                return resolve(drugsRes);
            });

        });
    },

    bootstrapPosologies: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let posologiesRes = [];
            async.map(mock.posologies, (posology, callback) => {
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/posologies"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: posology,
                    json: true
                }
                rp(options).then(posologyRes => {
                    posologiesRes.push(posologyRes);
                    return callback();
                }).catch(err => {
                    return callback();
                });
            }, err => {
                return resolve(posologiesRes);
            });

        });
    },

    bootstrapComments: function(medicinesToken) {
        return new Promise((resolve, reject) => {

            let commentsRes = [];
            async.map(mock.comments, (comment, callback) => {
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/comments"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: comment,
                    json: true
                }
                rp(options).then(commentRes => {
                    commentsRes.push(commentRes);
                    return callback();
                }).catch(err => {
                    return callback();
                });
            }, err => {
                return resolve(commentsRes);
            });

        });
    },

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

            let presentationsRes = [];
            async.map(mock.presentations, (presentation, callback) => {
                let options = {
                    url: hosts.medicinesManagement.url.concat("/api/presentations"),
                    method: "POST",
                    headers: {
                        "Authorization": medicinesToken.token_type.concat(" ").concat(medicinesToken.access_token)
                    },
                    body: presentation,
                    json: true
                }
                rp(options).then(presentationRes => {
                    presentationsRes.push(presentationRes);
                    return callback();
                }).catch(err => {
                    return callback();
                });
            }, err => {
                return resolve(presentationsRes);
            });

        });
    }

}