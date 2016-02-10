var db = require('./pghelper'),
winston = require('winston');

/**
 * Get user profile
 * @param req
 * @param res
 * @param next
 */
function getProfile(req, res, next) {
    var userId = req.userId,
        externalUserId = req.externalUserId;

    db.query(
            'SELECT id, firstName, lastName, email, mobilePhone, createddate FROM salesforce.contact WHERE id=$1',
            [userId], true)
        .then(function (user) {
            res.send(JSON.stringify(user));
        })
        .catch(next);

}

/**
 * Update user profile
 * @param req
 * @param res
 * @param next
 */
function updateProfile(req, res, next) {

    var user = req.body,
        userId = req.userId;

    console.log('updating: ' + JSON.stringify(user));

    db.query('update salesforce.contact SET firstName=$1, lastName=$2, mobilePhone=$3 WHERE id=$4',
            [user.firstname, user.lastname, user.mobilephone, userId])
        .then(function () {
            res.send(user);
        })
        .catch(next);
};

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;