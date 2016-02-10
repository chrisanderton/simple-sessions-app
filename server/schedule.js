var db = require('./pghelper'),
    winston = require('winston');

/**
 * Add a new session to the user's schedule
 * @param req
 * @param res
 * @param next
 */
function addItem(req, res, next) {
    var userId = req.userId,
        sessionId = req.body.sessionId; // the id in the postgres table

    console.log(JSON.stringify(req.body));

    db.query('SELECT sessionId FROM schedule WHERE userId=$1 AND sessionId=$2', [userId, sessionId], true)
        .then(function(session) {
            if (session) {
                return res.send(400, 'This session is already in your schedule');
            }
            db.query('INSERT INTO schedule (userId, sessionId) VALUES ($1, $2)', [userId, sessionId], true)
                .then(function () {
                    return res.send('ok');
                })
                .fail(function(err) {
                    return next(err);
                });
        })
        .catch(next);
}

/**
 * Delete a session from the user's schedule
 * @param req
 * @param res
 * @param next
 */
function deleteItem(req, res, next) {
    var userId = req.userId,
        sessionId = req.params.id;
    db.query('DELETE FROM schedule WHERE userId=$1 AND sessionId=$2', [userId, sessionId], true)
        .then(function () {
            return res.send('OK');
        })
        .catch(next);
}


/**
 * Delete all the schedule items for the given user
 * @param userId
 */
function deleteItems(userId) {
    console.log('deleting schedule items for user ' + userId);
    return db.query('DELETE FROM schedule WHERE userId=$1', [userId], true);
}

/**
 * Get the user's schedule
 * @param req
 * @param res
 * @param next
 */
function getItems(req, res, next) {
    var userId = req.userId;
    db.query("SELECT s.id, s.name, s.description__c as description, s.level__c as level, s.session_date__c as date, h.name as venue , h.location__latitude__s as latitude, h.location__longitude__s as longitude FROM salesforce.session__c as s, salesforce.hotel__c as h, schedule as sch WHERE sch.userid = $1 AND s.id = sch.sessionId AND h.sfid = s.venue__c ORDER BY date DESC LIMIT $2",    
            [userId, 20])
        .then(function (sessions) {
            return res.send(JSON.stringify(sessions));
        })
        .catch(next);
}

exports.addItem = addItem;
exports.deleteItem = deleteItem;
exports.deleteItems = deleteItems;
exports.getItems = getItems;