var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('SELECT s.id, s.name, s.description__c as description, s.level__c as level, s.session_date__c as date, h.name as venue , h.location__latitude__s as latitude, h.location__longitude__s as longitude FROM salesforce.session__c as s, salesforce.hotel__c as h WHERE h.sfid = s.venue__c ORDER BY date DESC LIMIT $1', [limit]);
};

function findById(id) {
    return db.query('SELECT s.id, s.name, s.description__c as description, s.level__c as level, s.session_date__c as date, h.name as venue, h.location__latitude__s as latitude, h.location__longitude__s as longitude FROM salesforce.session__c as s, salesforce.hotel__c as h WHERE h.sfid = s.venue__c and s.id=$1', [id], true);
};

function getAll(req, res, next) {
    findAll(20)
        .then(function (products) {
            return res.send(JSON.stringify(products));
        })
        .catch(next);
};

function getById(req, res, next) {
    var id = req.params.id;
    findById(id)
        .then(function (product) {
            return res.send(JSON.stringify(product));
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.getAll = getAll;
exports.getById = getById;