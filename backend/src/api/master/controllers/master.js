'use strict';

/**
 * master controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::master.master' , ({ strapi }) =>  ({ 
    async find(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { results, pagination } = await strapi.service('api::master.master').findOne(sanitizedQueryParams);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);
        return this.transformResponse(sanitizedResults, { pagination });
      },
}));
