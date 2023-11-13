'use strict';


module.exports = {
 
  
        
    async webhooksStamp(ctx){  
     
      console.log('webhooksStamp:');  
    try {
           
  
        if (ctx.request.body.uid==='api::stamp.stamp'){
            console.log(ctx.request.body); 

            const StampReferencia = ctx.request.body ? ctx.request.body.entry.name : null
            
            if (StampReferencia){

                await strapi.service('api::stamp.stamp').FinOneImagesStamps(StampReferencia); 
            }   
        
       return ctx.request.body.uid;           
    }
      
      } catch (error) {
        console.log("error", error);
      }   
  
    
    },

        
  
  
    };