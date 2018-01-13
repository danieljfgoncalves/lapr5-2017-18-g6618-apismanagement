/**
 * bootstrapController.js
 */

const medServ = require('../services/medicinesService');
const recServ = require('../services/receiptsService');

/**
 * POST /api/bootstrap/generate
 *
 * Generates bootstrap data for components.
 */
exports.generate = function(req, res) {

    let DTO = {};
    medServ.bootstrapMedicines(req.medicinesToken)
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
        return res.status(200).json(DTO);
    })

}