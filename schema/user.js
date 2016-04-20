/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true */
'use strict';



// Export module
module.exports = {
    type: 'object',
    key: ['user_id'],
    properties: {
        user_id: {
            type: 'string',
            required: true,
            unique: true
        },
        name: {
            type: 'string',
            default: ''
        },
        public_key: {
            type: 'string',
            default: ''
        },
        now: {
            type: 'string',
            pattern: '(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+\-]\d{2}:\d{2}))?',
            default: ''
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
