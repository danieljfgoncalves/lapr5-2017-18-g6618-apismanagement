/**
 * bootstrapController.js
 */

const medServ = require('../services/medicinesService');
const recServ = require('../services/receiptsService');
const phaServ = require('../services/pharmaciesService');
const autServ = require('../services/auth0Service');
const ordServ = require('../services/ordersService');
const dbcServ = require('../services/dbCleanService');

/**
 * POST /api/bootstrap/generate
 *
 * Generates bootstrap data for components.
 */
exports.generate = function(req, res) {

    let DTO = {};
    dbcServ.deleteAllDocuments().then(() => {
        return medServ.bootstrapMedicines(req.medicinesToken);
    })
    .then(medicines => {
        DTO.medicines = medicines;
        return medServ.bootstrapDrugs(req.medicinesToken, DTO.medicines);
    })
    .then(drugs => {
        DTO.drugs = drugs;
        return medServ.bootstrapPosologies(req.medicinesToken);
    })
    .then(posologies => {
        DTO.posologies = posologies;
        return medServ.bootstrapComments(req.medicinesToken);
    })
    .then(comments => {
        DTO.comments = comments;
        return medServ.bootstrapPresentations(req.medicinesToken, 
            DTO.drugs, DTO.posologies, DTO.comments);
    })
    .then(presentations => {
        DTO.presentations = presentations;
        return recServ.bootstrapReceipts(req.headers.authorization, DTO);
    })
    .then(receipts => {
        DTO.receipts = receipts;
        return phaServ.bootstrapPharmacies(req.headers.authorization);
    })
    .then(pharmacies => {
        DTO.pharmacies = pharmacies;
        return autServ.addPharmaciesIdToUsers(req.auth0Token, DTO.pharmacies);
    })
    .then(pharmacists => {
        DTO.pharmacists = pharmacists;
        return ordServ.bootstrapSupplier(req.headers.authorization);
    })
    .then(supplier => {
        DTO.supplier = supplier;
        return ordServ.bootstrapOrders(req.headers.authorization, DTO.supplier, DTO.pharmacies);
    })
    .then(orders => {
        DTO.orders = orders;

        let resultDTO = {
            report: {
                medicinesInserted: DTO.medicines.length,
                drugsInserted: DTO.drugs.length,
                posologiesInserted: DTO.posologies.length,
                commentsInserted: DTO.comments.length,
                presentationsInserted: DTO.presentations.length,
                receiptsInserted: DTO.receipts.length,
                pharmaciesInserted: DTO.pharmacies.length,
                updatedPharmacists: DTO.pharmacists.length,
                suppliersInserted: DTO.supplier ? 1 : 0,
                ordersInserted: DTO.orders.length
            },
            data: DTO
        }
        return res.status(200).json(resultDTO);
    });

}

exports.deleteDocuments = function(req, res) {
    dbcServ.deleteAllDocuments().then(()=> {
        return res.status(200).json({message:"Task executed."});
    }).catch(() => {
        return res.status(500).json({message:"Task failed to execute."});
    })
}