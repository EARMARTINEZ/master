'use strict';
/**
 
 */


//const axios = require('axios');


async function CreateRegistroMaster(data) {

  try {

   let CreateRegistro = await strapi.entityService.create('api::marter.marter', {      
            data: data,
          });         


    console.log(CreateRegistro.id);

    const NumeroReferencia = await getCreateSequence(CreateRegistro.id);

    return NumeroReferencia;

  } catch (error) {
    console.log("error", error);
  }       
};


module.exports = {


  async createreferencia(ctx){  
   
      console.log('createreferencia:');  

       const CreateRegistro = await CreateRegistroMaster(ctx.request.body);
      
        return CreateRegistro;
  },

      
  async webhooksreferencia(ctx){  
   
    console.log('webhooksreferencia:');  

     console.log(ctx.request.body);     

     if (ctx.request.body.uid==='api::marter.marter'){
          const Identry = ctx.request.body.entry.id         
          await strapi.service('api::marter.marter').GenerateSequence(Identry);             
     }
    


    // const CreateRegistro = await CreateRegistroMaster(ctx.request.body);
    
      //return CreateRegistro;
  },
    
    
 
  async getcatalog(ctx){
   
    // Busca Referencias Creadas por id de Coleccion, Grupo y Genero-opcional     

    const idCollection = ctx.request.body.collectionid  ? ctx.request.body.collectionid : '0'
    const idTheme = ctx.request.body.themeid  ? ctx.request.body.themeid : '0'
    const idGender = ctx.request.body.genderid  ? ctx.request.body.genderid : '1'

    console.log('getcatalog:');
             
      console.log(idCollection ); 
     
    const Condicion = { 
          collection:{         
              id: idCollection 
          },
          theme:{         
            id: idTheme 
          },
          Composition: {                
            gender:{                 
                id: idGender,                               
            },
          },   
      }

    const Condicion2 = { 
        collection:{         
            id: idCollection 
        },
        theme:{         
          id: idTheme 
        },       
    }  

      const Entry = await strapi.db.query('api::marter.marter').findMany({
        select: ['id'], 
          where: ctx.request.body.genderid  ? Condicion : Condicion2, 
        
        populate: {
          collection: { 
            select: ['name'],   
          
          },      
          theme:{
            select: ['name'],
            
            },          
          Composition: {
            populate: {
          gender:{
            select: ['id','name'],           
            },               
          }
         },         
        },
           
      });

                      
   
  
    return Entry;
},
  

  async getreferencia(ctx){
      const { Nreferencia } = ctx.params;     
         
        console.log('getGeneraReferencia:');        
     
        
        const MasterEntry = await strapi.service('api::marter.marter').FinOneReferencia(Nreferencia);             
    
      return MasterEntry;
  },



  async getcontrol(ctx){
    const { Nreferencia } = ctx.params; 
    
    const uploadService = strapi.plugins.upload.services.upload;
    const folderService = strapi.plugins.upload.services.folder;

    
    
    
    // const upentry = await strapi.db.query('plugin::upload.file').update({
    //   where: { id: 90 },    
    //   data: {
    //     name:'1220001-os.jpg'  
    //  },      
    // });
  
    const Imgentry = await strapi.db.query('plugin::upload.file').findMany({   
      select: ['id'],
      where: {      
          name: {
            $contains: Nreferencia,
          },                 
               
      },
  }); 

  

  let Entry  = Object.values(Imgentry);
  let ObjetReference=[]; 
  Entry.map((data, index) => {      
      
    ObjetReference.push(data.id)
      
  });  
  
  console.log(ObjetReference.join(','));

  const data = {
                
    "slug": null,
    "referencia": "1101502",
    "description": "prueba de import",
    "status": "Pending",
    "genderName": "Unisex",
    "collection": 1,
    "Composition": 60,
    "drawings": [
      ObjetReference.join(',') ? ObjetReference.join(',') : 92
    ],
    "drawingsPDF": [
      91
    ],
    "comentarios": [
      112,
      113
    ],
    "sizes": [
      1,
      4
    ],
    "theme": 354
  }
  const Dataentry = await strapi.db.query('api::marter.marter').update({
    where: { id: 82 },    
    data: data
  });

  

  console.log(Dataentry );



    // const uentry = await strapi.entityService.update('api::marter.marter', 79, {
    //     data: {
    //       //   collection: {                   
    //       //       id: 2      
    //       //    },
    //       //    Composition: {                 
    //       //     gender:{
    //       //     id: 2,                            
    //       //   },
    //       //   sizes:{
    //       //     id: 2,                            
    //       //   }
    //       //  },
    //        imagen1:[
    //         { id: 90 },
    //         { id: 91 }
    //       ],

           
    //     },
    //   });         
    
    
    
    // const entry = await strapi.entityService.findOne('api::marter.marter', id, {
    //     fields: ['id','referencia'],
    //     populate: ['collection', 'imagen1'],
    //   });

      // const SeleccEntry = await strapi.entityService.findOne('api::marter.marter', id, {
      //   fields: ['id','referencia'],
      //   populate: {
      //   collection: {
      //     id: ['id'],              
      //   },           
      //   Composition: {
      //       populate: {
      //       gender:{
      //       id: ['id'],

      //       }               
      //     }
      //    }
      // },
      // });  
        
      // console.log(SeleccEntry.Composition.gender.id);

    
      // const knex = strapi.db.connection;
      // const Statusresult = await knex.select('url').from('files')
     
      
      // console.log(SeleccEntry);
     
        
      //const NumeroReferencia = await getCreateSequence(id); 
      
                      

      ctx.body = 'Hello World!:'  ;

   
  
    //return MasterEntry;
},


  


  };