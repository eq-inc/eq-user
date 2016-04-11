/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = {
    key: ['user_id'],
    properties: {
        user_id: {
            type: 'varchar',
            required: true,
            unique: true
        },
        name: {
            type: 'varchar',
            default: ''
        },
        public_key: {
            type: 'varchar',
            default: ''
        },
        now: {
            type: 'datetime'
        }
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
