/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
/*global before, describe, it */
'use strict';


// Variables
let db;
const _ = require('lodash'),
    async = require('async'),
    database = require('karmia-database'),
    expect = require('expect.js'),
    user = require('../'),
    config = {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'eq-user'
    };


// Before
// beforeEach
before(function (done) {
    db = database(config);
    async.series([
        // Connect to database
        function (done) {
            db.connect(done);
        },

        // Drop existing data
        function (done) {
            const connection = db.getConnection();
            connection.db.dropDatabase(done);
        },

        // Setup database
        function (done) {
            user.configure(db);

            db.setup(done);
        }
    ], done);
});

// Test
describe('EqUser', function () {
    describe('createUser', function () {
       it('Should create user', function (done) {
            user.createUser(db, function (error, result) {
                if (error) {
                    return done(error);
                }

                expect(result).to.have.property('user_id');

                done();
            });
       });
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
