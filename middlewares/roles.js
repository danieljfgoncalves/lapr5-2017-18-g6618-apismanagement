/**
 * roles.js
 * 
 * Middleware to check for roles.
 */

exports.requireRoles = function (requiredRoles) {
    return function (req, res, next) {

        for(let i = 0; i < req.user["https://lapr5.isep.pt/roles"].length; i++) {
            let adquiredRole = req.user["https://lapr5.isep.pt/roles"][i];
            if (requiredRoles.indexOf(adquiredRole) > -1) {
                return next();
            }
        }
        
        return res.status(403).send({'Message':'Unauthorized User'});

    }
}