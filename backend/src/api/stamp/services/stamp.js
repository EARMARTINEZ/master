'use strict';

/**
 * stamp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stamp.stamp', ({ strapi }) =>  ({

    async FinOneStamps(StampReferencia) {

        try { 

          const StampsEntry = await strapi.db.query('api::stamp.stamp').findOne({
               
              where: { 
                $and: [
                  { name: StampReferencia },             
                ],          
              },
              populate: {  
              
                picture:[{
                  fields: ['id'],
                }],
               
              },
                
            }); 

          return StampsEntry

          } catch (error) {
            console.log("error", error);
        }
    },   
   
        async FinOneImagesStamps(StampReferencia) {       

            try { 
                
                    const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
                            where: {      
                            name: {
                                $contains: StampReferencia,
                            },
                            ext: {
                                $contains: '.jpg',
                            },      
                        },
                        orderBy: { id: 'DESC' }, 
                    }); 
    
                if (ImgentryCount){
                    const StampsEntry = await strapi.service('api::stamp.stamp').FinOneStamps(StampReferencia);             
                    
                            StampsEntry.picture = Imgentry 
                    
                    const Dataentry = await strapi.db.query('api::stamp.stamp').update({
                        where: { name: StampReferencia },    
                        data: StampsEntry
                    });
    
                return Dataentry;
                } 
    
                return null;
    
            } catch (error) {
                console.log("error", error);
            }
    
        },


}));
