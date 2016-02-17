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
    configure(database) {
        database.define('user', require('./schema/user'));
    },

    createUser(database, data, callback) {
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

                user.save(done);
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
