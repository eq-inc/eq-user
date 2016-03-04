/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
/*global before, describe, it */
'use strict';



// Variables
let db;
const async = require('neo-async'),
    database = require('karmia-database'),
    expect = require('expect.js'),
    user = require('../'),
    config = {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'eq-user'
    };


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
            user.setup(db);
            db.setup(done);
        }
    ], done);
});


describe('eq-user', function () {
    it('Should create user', function (done) {
        const table = db.table('user');

        async.waterfall([
            // Create user
            function (done) {
                user.create(db, done);
            },

            // Get created user data
            function (result, done) {
                table.get({user_id: result.user_id}, done);
            },

            // Expect result
            function (result, done) {
                expect(result.user_id).to.match(/[0-9]+?/);

                done();
            }
        ], done);
    });

    it('Should create user context', function (done) {
        let user_id;
        const table = db.table('user');

        async.waterfall([
            // Create user
            function (done) {
                user.create(db, done);
            },

            // Create user context
            function (result, done) {
                db.suite('user').add(['user']);
                user.createContext(db, {}, result.user_id, function (error, user_context) {
                    if (error) {
                        return done(error);
                    }

                    done(null, result.user_id, user_context);
                });
            },

            // Expect result
            function (user_id, user_context, done) {
                expect(user_context.user_id).to.be(user_id);
                expect(user_context).to.have.property('session');
                expect(user_context).to.have.property('now');

                done();
            }
        ], done);
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
