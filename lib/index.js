/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Variables
const _ = require('lodash'),
    async = require('neo-async');


// Export module
module.exports = {

    /**
     * Configure database
     *
     * @param database
     */
    setup: function (database) {
        database.define('user', require('../schema/user'));
    },

    /**
     * Create new user
     *
     * @param {KarmiaDatabase} database
     * @param {Object} data
     * @param {Function} callback
     */
    create: function (database, data, callback) {
        data = data || {};
        if (_.isFunction(data)) {
            callback = data;
            data = {};
        }

        const sequence = database.sequence('user_id'),
            table = database.table('user');

        async.waterfall([
            function (done) {
                if (data.user_id) {
                    done(null, data.user_id);
                } else {
                    sequence.get(done);
                }
            },

            function (user_id, done) {
                data.user_id = user_id;
                const user = new table.model(data);

                user.save(function (error, result) {
                    done(error, result);
                });
            }
        ], callback);
    },


    /**
     * Create user context
     *
     * @param {KarmiaDatabase} database
     * @param {EqSession} session
     * @param {string} user_id
     * @param {Function} callback
     */
    createContext: function (database, session, user_id, callback) {
        const user = database.suite('user').create(user_id);

        async.waterfall([
            // Get user data
            user.get.bind(user),

            // Merge user data
            function (result, done) {
                result = result || {};
                user.name = result.name;
                user.public_key = result.public_key;
                user.now = result.now;
                user.session = session;

                done(null, user);
            }
        ], callback);
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
