'use strict';

module.exports = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          enum : [400, 401, 403, 404, 500],
        },
        name: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};
