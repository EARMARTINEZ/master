'use strict';

/**
 * fabric controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fabric.fabric');
