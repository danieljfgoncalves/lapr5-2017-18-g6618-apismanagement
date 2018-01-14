/**
 * The connections configurations.
 */

module.exports = {

    medicinesManagementDB: {
        fullConnection: "mongodb://admin2:admin@ds159676.mlab.com:59676/medicines-management",
        host: "ds159676.mlab.com",
        port: "59676",
        dbname: "medicines-management",
        user: 'admin2',
        password: 'admin'
    },
    receiptsManagementDB: {
        fullConnection: "mongodb://admin2:admin@ds161316.mlab.com:61316/lapr5-6618-receipts-management",
        host: "ds161316.mlab.com",
        port: "61316",
        dbname: "lapr5-6618-receipts-management",
        user: 'admin2',
        password: 'admin'
    },
    pharmacyManagementDB: {
        fullConnection: "mongodb://admin2:admin@ds141796.mlab.com:41796/lapr5-6618-pharmacy-management",
        host: "ds141796.mlab.com",
        port: "41796",
        dbname: "lapr5-6618-pharmacy-management",
        user: 'admin2',
        password: 'admin'
    },
    ordersManagementDB: {
        fullConnection: "mongodb://admin2:admin@ds247027.mlab.com:47027/lapr5-6618-orders-management",
        host: "ds247027.mlab.com",
        port: "47027",
        dbname: "lapr5-6618-orders-management",
        user: 'admin2',
        password: 'admin'
    }
    
}