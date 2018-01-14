/**
 * ordersService.js
 */

const mock = require('../mochups/supplier');
const hosts = require('../configs/hosts');
const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {

    /**
     * Bootstraps the supplier data.
     */
    bootstrapSupplier: function(userToken) {
        return new Promise((resolve, reject) => {
            let options = {
                url: hosts.ordersManagement.url.concat("/api/providers"),
                method: "POST",
                headers: {
                    "Authorization": userToken
                },
                body: mock.supplier,
                json: true
            }
            return rp(options).then(supplierRes => {
                return resolve(supplierRes);
            }).catch(err => {
                return resolve(err);
            });
        });
    },

    /**
     * Bootstraps the orders data.
     */
    bootstrapOrders: function(userToken, supplier, pharmacies) {
        return new Promise((resolve, reject) => {

            let orders = [];
            let today = new Date();

            for (let i = 0; i < pharmacies.length; i++) {
                let pharmacy = pharmacies[i];
                let ord = mock.orders[i % mock.orders.length];
                for (let j = 0; j < 3; j++) {
                    let newOrderDate = new Date();
                    newOrderDate.setDate( today.getDate() + (j-1) );
                    let newRequestDate = new Date();
                    newRequestDate.setDate( today.getDate() - 2 );
                    let newOrder = {
                        orderDate: newOrderDate.toJSON(),
                        requestDate: newRequestDate.toJSON(),
                        itemName: ord.itemName,
                        form: ord.form,
                        quantity: ord.quantity,
                        provider: supplier.id,
                        pharmacy: pharmacy.name,
                        latitude: pharmacy.location.latitude,
                        longitude: pharmacy.location.longitude,
                        timeRestriction: pharmacy.timeRestriction
                    };
                    orders.push(newOrder);
                }
            }

            let ordersPromises = [];
            for (let i = 0; i < orders.length; i++) {
                let order = orders[i];
                let options = {
                    url: hosts.ordersManagement.url.concat("/api/orders"),
                    method: "POST",
                    headers: {
                        "Authorization": userToken
                    },
                    body: order,
                    json: true
                }
                ordersPromises.push(rp(options));
            }
            Promise.all(ordersPromises).then(ordersRes => {
                return resolve(ordersRes);
            }).catch(err => {
                return resolve(err);
            });

        });
    }

}