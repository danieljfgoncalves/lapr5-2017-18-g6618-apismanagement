/**
 * auth0Service.js
 */

const connections = require('../configs/connections');
const MongoClient = require('mongodb').MongoClient;

module.exports = {

    /**
     * Deletes all documents from mongo dbs.
     */
    deleteAllDocuments: function() {
        return this.deleteDocuments(
            connections.medicinesManagementDB.fullConnection,
            connections.medicinesManagementDB.dbname,
            [
                "comment", 
                "drug", 
                "medicine", 
                "posology", 
                "presentation"
            ]
        ).then(() => {
            return this.deleteDocuments(
                connections.receiptsManagementDB.fullConnection,
                connections.receiptsManagementDB.dbname,
                [
                    "medicalreceipts", 
                    "users"
                ]
            )
        }).then(() => {
            return this.deleteDocuments(
                connections.pharmacyManagementDB.fullConnection,
                connections.pharmacyManagementDB.dbname,
                [
                    "pharmacies",
                    "log"
                ]
            )
        }).then(() => {
            return this.deleteDocuments(
                connections.ordersManagementDB.fullConnection,
                connections.ordersManagementDB.dbname,
                [
                    "deliveryplan", 
                    "deliveryplan_nonvisitedpharmacies__pharmacy_nonvisitedpharmacies_pharmacy",
                    "deliveryplan_visitedpharmacies__pharmacy_visitedpharmacies_pharmacy",
                    "pharmacy",
                    "pharmacy_orderedwaypoints__waypoint_orderedwaypoints_waypoint",
                    "order", 
                    "provider",
                    "waypoint"
                ]
            )
        });
    },

    /**
     * Deletes all specified documents from
     * the given connection and database.
     */
    deleteDocuments: function(connection, database, documents) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connection, function(err, client) {
                if (err) {
                    return reject(err);
                }
                let db = client.db(database);
                for (let i = 0; i < documents.length; i++) {
                    db.collection(documents[i]).remove({});
                }
                return resolve();
            });
        });
    }

}