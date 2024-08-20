'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

const ArrayMaster = require('./ArrayData/ArrayMaster.js');
const ArrayUser = require('./ArrayData/ArrayUser.js');
const ArrayTypeComent = require('./ArrayData/ArrayTypeComent.js');
const ArrayCity = require('./ArrayData/ArrayCity.js');
const ArrayComment = require('./ArrayData/ArrayComment.js');

const ArrayPending = require('./ArrayData/ArrayPending.js');
const ArrayTypePending = require('./ArrayData/ArrayTypePending.js');


const ArrayStamp = require('./ArrayData/ArrayStamp.js');
const ArrayTheme = require('./ArrayData/ArrayTheme.js');



async function MasterStamp(Entry) {

  let MasterEntry=[];
  let Mastertheme=[];
  let CodigoData=[];
  let CodigoCity=[];
  let CodigoUser=[];
  let Response=[];
  let ThemeData=[];  
  
  MasterEntry.push(Entry); 

 let ArrayMasterData = ArrayMaster.find((element) => element.ref == MasterEntry[0].referencia );

 

    if(ArrayMasterData){
      

        let StampObjet = ArrayStamp.find((element) => element.id_collection == ArrayMasterData.id_collection )



        const EntryMaster = await strapi.db.query('api::master.master').findOne({        
          where: { 
                referencia: ArrayMasterData.ref,
        },
        populate: {        
          stamp:{
            fields: ['name'],  
            },       
        },
          orderBy: { id: 'ASC' }, 
        });

            Mastertheme.push(EntryMaster); 


            console.log('Mastertheme');
            console.log(Mastertheme);


        const EntryStamp = await strapi.db.query('api::stamp.stamp').findOne({ 
              
          where: { 
            name: StampObjet.name_stamp,
        },
        
        populate: {
            masters:{
            fields: ['referencia'],  
            },   
        },
          orderBy: { id: 'ASC' }, 
        });

        // console.log('EntryStamp');
        // console.log(EntryStamp);


        if(EntryStamp){

            //   EntryStamp.masters?.map((Sizes, index) => {      
            //     const IdSizes = Sizes.id ? Sizes.id : '0'        
            //     Response.push(IdSizes );     
            // });
  
            //    Response.push(Mastertheme[0].id );  
            //   console.log(Response);


              // if(StampObjet){         
             
        
              //         const result = {
              //           "id": StampObjet.id_theme,
              //           "name": StampObjet.name_theme,
              //           "collection": StampObjet.id_collection,
              //           "masters": Response,
              //         }
        
              //         ThemeData.push(result);         
        
        
              //       let UpdateRegistro = await strapi.entityService.update('api::theme.theme', StampObjet.id_theme, {      
              //         data: result,
              //       });  

              //       const entry = await strapi.db.query('api::master.master').update({
              //         where: { referencia: Mastertheme[0].referencia },
                      
              //         data: {
              //           slug: 'send',
              //         },
              //       });
                
              // }
        }

        
       
      
      
     

    }


  

      
};

module.exports = {

/************************************************* */
/************************************************* */      
 taskMaster: {
      task: async ({ strapi }) => {    

        

        const entries = await strapi.entityService.findMany('api::settingsglobal.settingsglobal', {
          populate: '*',
        });  
               
  
        const Entry = await strapi.db.query('api::master.master').findOne({        
          where: {   
                
           // referencia: '2240001',
           // id_collection: 30,

                slug: { $ne: 'send' },
                slug: { $null: true },  
                
                       
                  collection: {         
                     id: 29,
                  },
                              
         },
         populate: {
          collection: {         
            fields: ['id'],    
          },
        },
          orderBy: { id: 'ASC' }, 
        });

        
  
        if (Entry){ 

          console.log('taskMaster: ' + new Date());
  
          if(entries.EnableMailingSISOC.sendEmail){
            
              await MasterStamp(Entry);
  
          }
  
        }
        
           
      },
          options: {
              rule: '*/10 * * * * *',
              VE: 'America/Caracas',
          },
      },
  
    
/************************************************* */
/************************************************* */  
    task: {
        task: ({ strapi }) => {               
            
            //console.log('Tarea-Mercado: ' + new Date());
        
        },
            options: {
                rule: '*/2 10 10 10 10',
                VE: 'America/Caracas',
            },
        },


     
  };