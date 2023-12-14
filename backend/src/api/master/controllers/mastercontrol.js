'use strict';
/**
 
 */

const reader = require("xlsx");
//const axios = require('axios');

function convertToFrenchDate(date) {
  const dateSubString = date.substring(0, 10) // "2023-09-19"
const splitDate = dateSubString.split("-") // ["2023", "09", "19"]
const finalDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}` // "19-09-2023"
  
  return finalDate
}
function convertToFrenchHour(date) {
  const hourSubString = date.substring(11, 19)
  const splitHour = hourSubString.split(':')
  const finalHour = `${splitHour[0]}:${splitHour[1]}:${splitHour[2]}`
  return finalHour
}


async function CreateRegistroMaster(data) {

  try {

   
   let CreateRegistro = await strapi.entityService.create('api::master.master', {      
            data: data,
          });         

            
    //const NumeroReferencia = await strapi.service('api::master.master').GenerateSequence(CreateRegistro.id);
    //console.log(data);
   
    return CreateRegistro;

  } catch (error) {
    console.log("error", error);
  }       
};

async function UpdateRegistroMaster(IdMaster, data) {

  try {
   
    const AttributesStamp = Object.keys(data.stamp.id);
    data.stamp= AttributesStamp[1]==='label' ? null : data.stamp
    

   let UpdateRegistro = await strapi.entityService.update('api::master.master', IdMaster, {      
            data: data,
          });  
          
        
   let NumeroReferencia = {
            "id": UpdateRegistro.id,
            "GenderName":UpdateRegistro.genderName,
            "ProductName":UpdateRegistro.productname,
            "CountSequence": UpdateRegistro.referencia           
        };  

         console.log(IdMaster, data);
   
     return NumeroReferencia;

  } catch (error) {
    console.log("error", error);
  }       
};

async function UpdateStatusReference(IdMaster, data) {

  try {
   
   
   let UpdateRegistro = await strapi.entityService.update('api::master.master', IdMaster, {      
            data: data,
          });  
          
        
   let NumeroReferencia = {
            "id": UpdateRegistro.id,
            "GenderName":UpdateRegistro.genderName,
            "ProductName":UpdateRegistro.productname,
            "CountSequence": UpdateRegistro.referencia           
        };  

         //console.log(IdMaster, data);
   
     return NumeroReferencia;

  } catch (error) {
    console.log("error", error);
  }       
};

function formatColumn(worksheet, col, fmt) {
  const range = reader.utils.decode_range(worksheet['!ref'])
  // note: range.s.r + 1 skips the header row
  for (let row = range.s.r + 1; row <= range.e.r; ++row) {
    const ref = reader.utils.encode_cell({ r: row, c: col })
    if (worksheet[ref] && worksheet[ref].t === 'n') {
      worksheet[ref].z = fmt
    }
  }
};

async function ExporXLSX(data, FileName){

  try {    
      const workbook = reader.utils.book_new();
      let date = new Date(); 
      let dia = date.getDate();
      let mes = date.getMonth() + 1;
      
      const filename =`${FileName}${data[0].Identifier.substring(0, 3)}.xlsx`;
      const url = process.env.URL_EXPORT_XLSX+filename
      
      const ws = reader.utils.json_to_sheet(data);
      reader.utils.book_append_sheet(workbook, ws, filename);
      
      const currency = '0.00'
      for (let col of [1, 2, 3, 4, 5, 6]) {
        formatColumn(ws, col, currency)
      }       
      
      const max_width = data.reduce((w, r) => Math.max(w, r.collection.length), 10);
      ws["!cols"] = [ { wch: 10 },
                      { wch: 20 },  
                      { wch: max_width },
                      { wch: 35 }, //size
                      { wch: max_width },
                      { wch: 15 },
                      { wch: 15 },
                      { wch: max_width},
                      { wch: 10 },
                      { wch: max_width },
                      { wch: 15 },
                      { wch: 10 },
                      { wch: 10 },
                      
                  ],                         

      reader.writeFile(workbook,  url, { compression: true }); 

  } catch (error) {
    console.log("error", error);
  }    

}


module.exports = {


  async webhooksreferencia(ctx){  
   
    console.log('webhooksreferencia:');  
  try {
      

      if (ctx.request.body.uid==='api::master.master'){
         console.log(ctx.request.body);     

            const Identry = ctx.request.body.entry.id           
            const Nreferencia = await strapi.service('api::master.master').GenerateSequence(Identry);

            const ReferenciaSequence = Nreferencia.CountSequence ? Nreferencia.CountSequence : null

            if (ReferenciaSequence){
                
              await strapi.service('api::master.master').FinOneImagesReferencia(ReferenciaSequence); 
              await strapi.service('api::master.master').FinOnePDFReferencia(ReferenciaSequence);
              await strapi.service('api::master.master').FinOneSizeReferencia(ctx.request.body.event, ReferenciaSequence); 
          }         

          setTimeout(async () => {
            await strapi.service('api::master.master').webhooksSendEmail(ctx.request.body.entry.id, ctx.request.body.event);
          },10000);  
         

         return ctx.request.body.uid;          
      }
    
    
    } catch (error) {
      console.log("error", error);
    }  

  
  },
    
    async webhooksMedia(ctx){  
    
      console.log('webhooksMedia:');  
      try {      
      

            const Nmedia = ctx.request.body.media.name.substring(0, 7)
            const Nreferencia = Nmedia.toString().padEnd(7, '0');
            const Stampmedia = ctx.request.body.media.name.substring(0, 8) 
            const StampReferencia = Stampmedia.toString().padEnd(8, '0');        
          
            const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
              where: {      
                name: {
                  $contains: Nreferencia,
                },             
            },
            orderBy: { id: 'DESC' }, 
        }); 

       

              if (ImgentryCount >= 1 ){ 

                console.log(Nreferencia);     
                console.log(ctx.request.body);     
              
                if (StampReferencia.includes('S') ){                
                  await strapi.service('api::stamp.stamp').FinOneImagesStamps(StampReferencia);
                  return StampReferencia
                }  
                await strapi.service('api::master.master').FinOneImagesReferencia(Nreferencia);
                await strapi.service('api::master.master').FinOnePDFReferencia(Nreferencia);
                
            } 
                    
      
      
      } catch (error) {
        console.log("error", error);
      }    
      
        //return CreateRegistro;
    },
    
      async webhooksMediaV6(ctx){  
      
        console.log('webhooksMedia:');  
        try {      
        

              const Nmedia = ctx.request.body.media.name.substring(0, 6)
              const Nreferencia = Nmedia.toString().padEnd(6, '0');
              const Stampmedia = ctx.request.body.media.name.substring(0, 6) 
              const StampReferencia = Stampmedia.toString().padEnd(6, '0');        
            
              const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
                where: {      
                  name: {
                    $contains: Nreferencia,
                  },             
              },
              orderBy: { id: 'DESC' }, 
          }); 

        

                if (ImgentryCount >= 1 ){ 

                  console.log(Nreferencia);     
                  console.log(ctx.request.body);     
                
                  if (StampReferencia.includes('S') ){                
                    await strapi.service('api::stamp.stamp').FinOneImagesStamps(StampReferencia);
                    return StampReferencia
                  }  
                  await strapi.service('api::master.master').FinOneImagesReferencia(Nreferencia);
                  await strapi.service('api::master.master').FinOnePDFReferencia(Nreferencia);
                  
              } 
                      
        
        
        } catch (error) {
          console.log("error", error);
        }    
        
          //return CreateRegistro;
      },
 

  async createreferencia(ctx){  
   
      console.log('createreferencia:');  

       const CreateRegistro = await CreateRegistroMaster(ctx.request.body);
      
        return CreateRegistro;
  },
  
  async updatereferencia(ctx){  
   
    const { Nreferencia } = ctx.params; 
    console.log('updatereferencia:');  

     const UpdateRegistro = await UpdateRegistroMaster( Nreferencia, ctx.request.body);
    
      return UpdateRegistro;
},

async updateStatusReferencia(ctx){  
   
  const { IdMaster } = ctx.params; 
  console.log('updateStatus:');  

   const UpdateRegistro = await UpdateStatusReference( IdMaster, ctx.request.body);
  
    return UpdateRegistro;
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

      const Entry = await strapi.db.query('api::master.master').findMany({
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
     
        
        const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);             
    
      return MasterEntry;
  },

  async getImagensReferencia(ctx){
    const { Nreferencia } = ctx.params;     
       
      console.log('getImagensReferencia:');        
   
      
      const MasterEntry = await strapi.service('api::master.master').FinOneImagesReferencia(Nreferencia); 
                          await strapi.service('api::master.master').FinOnePDFReferencia(Nreferencia);             
  
    return MasterEntry;
  },

/*knex */
  async getGenderReference(ctx){
    const { Nreferencia } = ctx.params; 
        
    
  
      const PrefixColection = Nreferencia.substring(0, 3) ? Nreferencia.substring(0, 3) : '124'

       const knex = strapi.db.connection;
       //const Statusresult = await knex.select('url').from('files')

       const loteCant = await knex
       .select(
        knex.raw("genders.id, gender_name,  genders.start_sequence  ")
        ).from("masters")
        .innerJoin('genders', ' masters.gender_name ', ' genders.name ')             
        .whereLike('referencia', '%' + PrefixColection +'%')       
        .groupBy("gender_name", "genders.id", "start_sequence" )


      //  .select(
      //      knex.raw(' gender_name ')
      //      ).from("masters")           
      //      .whereLike('referencia', '%' + PrefixColection +'%')
      //      .groupBy("gender_name" )
     
      // console.log(loteCant); 

   
  
    return loteCant;
},

/*knex */
  async getProducReference(ctx){
    const { Nreferencia } = ctx.params; 
        
    

      const PrefixColection = Nreferencia.substring(0, 3) ? Nreferencia.substring(0, 3) : '124'

      const knex = strapi.db.connection;
      //const Statusresult = await knex.select('url').from('files')

      const loteCant = await knex
      .select(
          knex.raw(' productname ')
          ).from("masters")           
          .whereLike('referencia', '%' + PrefixColection +'%')
          .groupBy("productname" )
    
      // console.log(loteCant); 

  

    return loteCant;
  },

/*knex */
  async getGroupSize(ctx){
    const { Nreferencia } = ctx.params; 
        
    

      const IDColection = Nreferencia ? Nreferencia : '29'

      const knex = strapi.db.connection;
      //const Statusresult = await knex.select('url').from('files')

      const loteCant = await knex
      .select(
        knex.raw( 'sizes.name ')
        ).from("masters")
        .innerJoin('masters_collection_links', ' masters_collection_links.master_id ', ' masters.id ')  
        .innerJoin('masters_sizes_links', ' masters_sizes_links.master_id ', 'masters.id')
        .innerJoin('sizes', ' sizes.id ', 'masters_sizes_links.size_id') 
        .where("masters_collection_links.collection_id", "=", IDColection)      
        .groupBy(' sizes.name ' )
    
      // console.log(loteCant); 

  

    return loteCant;
  },

  /*knex */
  async getNextSequence(ctx){
    const { Nreferencia } = ctx.params; 
        
    try {      
        const Ncollection = Nreferencia.substring(0, 3); 
        const Ngender = Nreferencia.substring(3, 4);

        const _ = require("lodash");
        const knex = strapi.db.connection;
        //const Statusresult = await knex.select('url').from('files')

     const sqloteCant = await knex
     .select(
         knex.raw("genders.id, genders.name, genders.start_sequence as next_sequence ")
         ).from("genders")    
         .where('genders.id', "=",  Ngender )    
     
          const loteCant = await knex
          .select(
              knex.raw("genders.id, gender_name, count(referencia) as cant_reference,  genders.start_sequence, '' as next_sequence  ")
              ).from("masters")
              .innerJoin('genders', ' masters.gender_name ', ' genders.name ')             
              .whereLike('referencia', '%' + Ncollection +'%')          
              .where('genders.id', "=",  Ngender )
              .groupBy("gender_name", "genders.id", "start_sequence" )

        

              const Resp = loteCant.forEach(loteCant => {      
            
                const start_sequence = Number(loteCant['start_sequence'] )+ Number(loteCant['cant_reference'])
                const Value_sequence = start_sequence.toString().padStart(4, '0');
                
                
                loteCant['next_sequence'] =  Value_sequence ;
          });
      
      console.log(Resp);

      return loteCant.length >= 1 ? loteCant[0] : sqloteCant[0] ;
      
    } catch (error) {
      console.log("error", error);

    }    
  }, 

  async doUpdateSize(ctx){  
   
    console.log('doUpdateSize:');  
  try {
      console.log(ctx.request.body);  

      const ObjetSizes = ctx.request.body;
      const DataSizes =ObjetSizes.size.size;
      const IDMaster= Number(ObjetSizes.reference)

          const [SizeEntry, SizeEntryCount] = await strapi.db.query('api::size.size').findWithCount({
            where: {      
              name: {
                $in:  ObjetSizes.size.size,
                  },             
              },
              orderBy: { id: 'DESC' }, 
          }); 

          if (SizeEntryCount){
            const MasterEntry = await strapi.service('api::master.master').FinOneIDMaster(IDMaster);
            MasterEntry.sizes = SizeEntry ? SizeEntry : []

            const Dataentry = await strapi.db.query('api::master.master').update({
              where: { id: IDMaster },    
              data: MasterEntry
            });

            console.log('doUpdateSize-FindIDMasterExamineSizes');
            await strapi.service('api::master.master').FindIDMasterExamineSizes(IDMaster, DataSizes);   
            
            return Dataentry;          
            
           }      
    
    } catch (error) {
      console.log("error", error);
    }  

  
  },


  async UpdateComment(ctx){  
   
    const { IdMaster } = ctx.params; 
    let Comment=[];
  
    console.log('UpdateComment:');  

    //console.log(...ctx.request.body.comments)
  
    try {


      const [MasterEntry, EntryCount] = await strapi.db.query('api::master.master').findWithCount({
        select: ['id', 'referencia', 'status'],
        where: { id: IdMaster },
        populate: {
          collection: {         
            populate: {
              collection_type:{
                fields: ['id'],  
                },
            },             
          }, 
          theme:{
            fields: ['name'],  
            },          
          Composition: {
              populate: {
            gender:{
              fields: ['id', 'startSequence'],  
              },
              fabric:{
                fields: ['id'],  
                },
                color:{
                  fields: ['id'],  
                  },                 
                    typeproduct:{
                      fields: ['id'],  
                      }                           
            }
          },
          drawings:[{
            fields: ['id'],
          }],
          sizes: {
            fields: ['id'],
          },
          comments: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendings: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 
  
        if (EntryCount){

          const message = ctx.request.body.comments[0].comment
          const user = ctx.request.body.comments[0].user
          const toMaker = ctx.request.body.toMaker ? ctx.request.body.toMaker : false
          const city = ctx.request.body.comments[0].city

          Comment.push(...MasterEntry[0].comments, ...ctx.request.body.comments)
          
          MasterEntry[0].comments = MasterEntry ? Comment : []

          let UpdateRegistro = await strapi.entityService.update('api::master.master', IdMaster, {      
            data: MasterEntry[0],
          }); 
          
          if(toMaker){
            await strapi.service('api::master.master').SendEmailCommentsMaker(UpdateRegistro.referencia, user, message);
          }else{ 
            await strapi.service('api::master.master').SendEmailComments(UpdateRegistro.referencia, user, message);
          }
          

          let NumeroReferencia = {
            "IdMastar": UpdateRegistro.id,
            "GenderName":UpdateRegistro.genderName,
            "ProductName":UpdateRegistro.productname,
            "CountSequence": UpdateRegistro.referencia           
        };               
                    
          return NumeroReferencia;         
          
        }
  
      } catch (error) {
        console.log("error", error);
      }       
  
  }, 
  
    async UpdatePendingsComment(ctx){  
      
      const { IdMaster } = ctx.params; 
      let Comment=[];
    
      console.log('UpdatePendingsComment:');  
      //console.log(...ctx.request.body.pendings)
    try {

      const [MasterEntry, EntryCount] = await strapi.db.query('api::master.master').findWithCount({
        select: ['id', 'referencia', 'status'],
        where: { id: IdMaster },
        populate: {
          collection: {         
            populate: {
              collection_type:{
                fields: ['id'],  
                },
            },             
          }, 
          theme:{
            fields: ['name'],  
            },          
          Composition: {
              populate: {
            gender:{
              fields: ['id', 'startSequence'],  
              },
              fabric:{
                fields: ['id'],  
                },
                color:{
                  fields: ['id'],  
                  },                 
                    typeproduct:{
                      fields: ['id'],  
                      }                           
            }
          },
          drawings:[{
            fields: ['id'],
          }],
          sizes: {
            fields: ['id'],
          },
          comments: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendings: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 
    
          if (EntryCount){
    
            Comment.push(...MasterEntry[0].pendings, ...ctx.request.body.pendings)
            
            MasterEntry[0].pendings = MasterEntry ? Comment : []
    
            let UpdateRegistro = await strapi.entityService.update('api::master.master', IdMaster, {      
              data: MasterEntry[0],
            });  
    
            let NumeroReferencia = {
              "IdMastar": UpdateRegistro.id,
              "GenderName":UpdateRegistro.genderName,
              "ProductName":UpdateRegistro.productname,
              "CountSequence": UpdateRegistro.referencia           
          };       
          
                    
          return NumeroReferencia;         
            
          }  
    
        } catch (error) {
          console.log("error", error);
        }       
    
    },


  async UpdateStampComment(ctx){  
     
    const { IdStamp } = ctx.params; 
    let Comment=[];
  
    console.log('UpdateStampComment:');  
    //console.log(...ctx.request.body.commentstamp)
   try {

    const [MasterEntry, EntryCount] = await strapi.db.query('api::stamp.stamp').findWithCount({
      select: ['id', 'name'],  
      where: { id: IdStamp },
      populate: { 
        
        masters:{
          fields: ['id'],  
          },  
       
        commentstamp: [
          {
            fields: ['id', 'comment'],                   
          }
        ],
        pendingstamp: [
          {
            fields: ['id', 'comment'],                   
          }
        ],
      },
  }); 
  
        if (EntryCount){

         // console.log(MasterEntry)
  
          Comment.push(...MasterEntry[0].commentstamp, ...ctx.request.body.commentstamp)
          
          MasterEntry[0].commentstamp = MasterEntry ? Comment : []
  
          let UpdateRegistro = await strapi.entityService.update('api::stamp.stamp', IdStamp, {   
             
            data: MasterEntry[0],
          }); 
          
          //console.log(MasterEntry[0].masters[0].id)
  
          let NumeroReferencia = {
            "IdMastar": MasterEntry[0].masters[0].id,
            "StampName":UpdateRegistro.name,
                  
        };       
        
                   
         return NumeroReferencia;         
          
        }  
  
      } catch (error) {
        console.log("error", error);
      }       
  
  }, 
  
    async UpdateStampPendingsComment(ctx){  
      
      const { IdStamp } = ctx.params; 
      let Comment=[];
    
      console.log('UpdateStampPendingsComment:');  
      //console.log(...ctx.request.body.pendingstamp)
    try {

      const [MasterEntry, EntryCount] = await strapi.db.query('api::stamp.stamp').findWithCount({
        select: ['id', 'name'],  
        where: { id: IdStamp },
        populate: { 
          
          masters:{
            fields: ['id'],  
            },  
        
          commentstamp: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendingstamp: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 
    
          if (EntryCount){

          // console.log(MasterEntry)
    
            Comment.push(...MasterEntry[0].pendingstamp, ...ctx.request.body.pendingstamp)
            
            MasterEntry[0].pendingstamp = MasterEntry ? Comment : []
    
            let UpdateRegistro = await strapi.entityService.update('api::stamp.stamp', IdStamp, {   
              
              data: MasterEntry[0],
            }); 
            
            //console.log(MasterEntry[0].masters[0].id)
    
            let NumeroReferencia = {
              "IdMastar": MasterEntry[0].masters[0].id,
              "StampName":UpdateRegistro.name,
                    
          };       
          
                    
          return NumeroReferencia;         
            
          }  
    
        } catch (error) {
          console.log("error", error);
        }       
    
    },

      async updateStatusStamp(ctx){  
        
        const { IdStamp } = ctx.params; 
        let Comment=[];
      
        console.log('updateStatusStamp:');  
        try {
   
   
          const [MasterEntry, EntryCount] = await strapi.db.query('api::stamp.stamp').findWithCount({
            select: ['id', 'name'],  
            where: { id: IdStamp },
            populate: { 
              
              masters:{
                fields: ['id'],  
                },  
            
              commentstamp: [
                {
                  fields: ['id', 'comment'],                   
                }
              ],
              pendingstamp: [
                {
                  fields: ['id', 'comment'],                   
                }
              ],
            },
        }); 
          
        if (EntryCount){
          
            let UpdateRegistro = await strapi.entityService.update('api::stamp.stamp', IdStamp, {      
                    data: ctx.request.body,
                  });  
                  
                
                  let NumeroReferencia = {
                    "IdMastar": MasterEntry[0].masters[0].id,
                    "StampName":UpdateRegistro.name,
                          
                };               
            
              return NumeroReferencia;
          }


         } catch (error) {
           console.log("error", error);
         }       
      },
  
  


  async TriggerXLSX(ctx){


   const { Nreferencia } = ctx.params;    
   const ReferencePrefix = Nreferencia.substring(0, 3)

   let Prefix = Nreferencia.length === 3 ? `${ReferencePrefix}`  : Nreferencia;

   try {  

      const [MasterEntry, EntryCount] = await strapi.db.query('api::master.master').findWithCount({
        select: ['id', 'referencia', 'description', 'status', 'similarRefs'],
        where: {      
          referencia: {
            $contains: Prefix,
          },             
      },
        populate: {
          collection: {         
            populate: {
              collection_type:{
                fields: ['id'],  
                },
            },             
          },           
          Composition: {
              populate: {
            gender:{
              fields: ['id', 'startSequence'],  
              },
              fabric:{
                fields: ['id'],  
                },
                color:{
                  fields: ['id'],  
                  },                 
                    typeproduct:{
                      fields: ['id'],  
                      }                           
            }
          },
          drawings:[{
            fields: ['id'],
          }],
          theme:{
            fields: ['name'],  
            },     
          sizes: {
            fields: ['id'],
          },
          color_pantone: {
            fields: ['id'],
          },
          comments: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendings: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 

    let ArrayReference=[];
    let CodigoSizes=[];
    let PendingComment=[];

if(EntryCount){
    MasterEntry?.map((data, index) => {      
        
      
      data.sizes.map((Sizes, index) => {      
        const IdSizes = Sizes ? Sizes.name : 'null'        
        CodigoSizes.push(IdSizes);     
    });

    data.pendings?.map((Comments, index) => {     
      const Commenta = Comments ? Comments.comment : 'null'
      PendingComment.push(Commenta);
    });


      let masterlist = {
        
        "Identifier": data.referencia,
        "collection": data.collection.name,
        "color": data.color_pantone.name,
        "SystemColor": data.Composition.color.name,
        "Size":CodigoSizes.join(' '),
        "Theme": data.theme.name,
        "Gender": data.Composition.gender.name,
        "Product": data.Composition.typeproduct.name,
        "Fabric": data.Composition.fabric.name,
        "Status": data.status,
        "Description": data.description,
        "Pending": PendingComment.join(' '),
        "SimilarRef": data.similarRefs,
      }

      CodigoSizes=[''];
      PendingComment=[''];
      ArrayReference.push(masterlist)
        
    });  

    //console.log(ArrayReference);
    await ExporXLSX(ArrayReference, 'MasterList');
  
    //ctx.body = 'OK';
  return ArrayReference

}
  } catch (error) {
    console.log("error", error);
   
  }

},

  async PendingsTriggerXLSX(ctx){


    const { Nreferencia } = ctx.params;    
    const ReferencePrefix = Nreferencia.substring(0, 3)

    let Prefix = Nreferencia.length === 3 ? `${ReferencePrefix}`  : Nreferencia;

    try {   

    const MasterEntry = await strapi.entityService.findMany('api::master.master', {
      publicationState: 'preview',     
      filters: { 
        referencia: {
        $contains: Prefix,
        }, 
      },  
      populate: {     
    
      collection: {         
        populate: {
          collection_type:{
            fields: ['id', 'name'],  
            },
        },             
      }, 
      pendings: {       
        populate: {
          type:{
          fields: ['id', 'name'],  
          },
        },
      },

    },
       
     
    });  
 
    let ArrayReference=[];
    let CodigoSizes=[];
    let PendingComment=[];
 
    
     if(MasterEntry){
          MasterEntry?.map((data, index) => {   

            data.pendings?.map((Comments, index) => {              

              let dateformat=  `${convertToFrenchDate(Comments.date)}-${convertToFrenchHour(Comments.date)}`;          
            
              let masterlist = {
                
                "Identifier": data.referencia,
                "collection": data.collection.name, 
                "date": Comments.date ? dateformat  : '',
                "typePendings": Comments.type ? Comments.type.name : '',
                "pending": Comments ? Comments.comment : '',
                "statusPending": Comments.status,
                "statusRef": data.status,     
              
              }
              ArrayReference.push(masterlist)
            });       
              
          });  

          const StampEntry = await strapi.entityService.findMany('api::stamp.stamp', {
            publicationState: 'preview',     
            filters: { 
              masters: {     
              referencia: {
              $contains: Prefix,
              }, 
            }, 
            },      
            populate: {     
          
              masters: {         
                populate: {
                  collection: {         
                    populate: {
                      collection_type:{
                        fields: ['id', 'name'],  
                        },
                    },             
                  }, 
                },             
              }, 
              pendingstamp: {       
                populate: {
                  type:{
                  fields: ['id', 'name'],  
                  },
                },
              },
      
          },
             
           
          });    
          if(StampEntry){
            StampEntry?.map((data, index) => { 
              data.pendingstamp?.map((stampPendings, index) => {
                
                let dateformat=  `${convertToFrenchDate(stampPendings.date)}-${convertToFrenchHour(stampPendings.date)}`;
      
                let stamplist = {              
                  "Identifier": data.name,
                  "collection": data.masters[0].collection.name, 
                  "date": stampPendings.date ? dateformat  : '',
                  "typePendings": stampPendings.type ? stampPendings.type.name : '',
                  "pending": stampPendings ? stampPendings.comment : '',
                  "statusPending": stampPendings.status,
                  
              
              }
              ArrayReference.push(stamplist)
              });  
      
          
            }); 
          }

          //console.log(ArrayReference);
          await ExporXLSX(ArrayReference, 'RecentPendings');
        
          //ctx.body = 'OK';
          return ArrayReference

      }

  } catch (error) {
    console.log("error", error);
    
  }

  },

  async CommentsTriggerXLSX(ctx){


    const { Nreferencia } = ctx.params;    
    const ReferencePrefix = Nreferencia.substring(0, 3)

    let Prefix = Nreferencia.length === 3 ? `${ReferencePrefix}`  : Nreferencia;

    try {   

    const MasterEntry = await strapi.entityService.findMany('api::master.master', {
      
        publicationState: 'preview',     
        filters: { 
          referencia: {
          $contains: Prefix,
          }, 
        },  
      populate: {      
    
      collection: {         
        populate: {
          collection_type:{
            fields: ['id', 'name'],  
            },
        },             
      }, 
      comments: {       
        populate: {
          type:{
          fields: ['id', 'name'],  
          },
        },
      },

    },
       
     
    });  
 
    let ArrayReference=[];
    let CodigoSizes=[];
    let PendingComment=[];

      if(MasterEntry){
          MasterEntry?.map((data, index) => {             

          data.comments?.map((Comments, index) => { 
             let dateformat=  `${convertToFrenchDate(Comments.date)}-${convertToFrenchHour(Comments.date)}`;          
           
            let masterlist = {              
               "Identifier": data.referencia,
               "collection": data.collection.name, 
               "date": Comments.date ? dateformat  : '',
               "typeComments": Comments.type ? Comments.type.name : '',
               "comments": Comments ? Comments.comment : '',
               "statusComments": Comments.status,
               "statusRef": data.status,    
            
            }

             ArrayReference.push(masterlist)
          });     

            
              
          });
          
          
          const StampEntry = await strapi.entityService.findMany('api::stamp.stamp', {
            publicationState: 'preview',     
            filters: { 
              masters: {     
              referencia: {
              $contains: Prefix,
              }, 
            }, 
            },      
            populate: {     
          
              masters: {         
                populate: {
                  collection: {         
                    populate: {
                      collection_type:{
                        fields: ['id', 'name'],  
                        },
                    },             
                  }, 
                },             
              }, 
              commentstamp: {       
                populate: {
                  type:{
                  fields: ['id', 'name'],  
                  },
                },
              },
      
          },
             
           
          });    
          if(StampEntry){
            StampEntry?.map((data, index) => { 
              data.commentstamp?.map((stampPendings, index) => {
                
                let dateformat=  `${convertToFrenchDate(stampPendings.date)}-${convertToFrenchHour(stampPendings.date)}`;
      
                let stamplist = {              
                  "Identifier": data.name,
                  "collection": data.masters[0].collection.name, 
                  "date": stampPendings.date ? dateformat  : '',
                  "typeComments": stampPendings.type ? stampPendings.type.name : '',
                  "comments": stampPendings ? stampPendings.comment : '',
                  "statusComments": stampPendings.status,
                  
              
              }
              ArrayReference.push(stamplist)
              });  
      
          
            }); 
          }

          //console.log(ArrayReference);
          await ExporXLSX(ArrayReference, 'RecentComments');
        
          //ctx.body = 'OK';
          return ArrayReference

      }
  } catch (error) {
    console.log("error", error);
    
  }

  },



  async getUpdateComment(ctx){  
   
    const { IdMaster } = ctx.params; 
    let Comment=[];
  
    console.log('UpdateComment:');  

    //console.log(ctx)

    //console.log(...ctx.request.body.comments)
  
    try {


      const [MasterEntry, EntryCount] = await strapi.db.query('api::master.master').findWithCount({
        select: ['id', 'referencia', 'status'],
        where: { referencia: IdMaster },
        populate: {
          collection: {         
            populate: {
              collection_type:{
                fields: ['id'],  
                },
            },             
          }, 
          theme:{
            fields: ['name'],  
            },          
          Composition: {
              populate: {
            gender:{
              fields: ['id', 'startSequence'],  
              },
              fabric:{
                fields: ['id'],  
                },
                color:{
                  fields: ['id'],  
                  },                 
                    typeproduct:{
                      fields: ['id'],  
                      }                           
            }
          },
          drawings:[{
            fields: ['id'],
          }],
          sizes: {
            fields: ['id'],
          },
          comments: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendings: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 
  
        if (EntryCount){         

          const message = ctx.request.body.comments[0].comment
          const user = ctx.request.body.comments[0].user
          const toMaker = ctx.request.body.toMaker ? ctx.request.body.toMaker : false
          const city = ctx.request.body.comments[0].city

          Comment.push(...MasterEntry[0].comments, ...ctx.request.body.comments)
          
          MasterEntry[0].comments = MasterEntry ? Comment : []

          let UpdateRegistro = await strapi.entityService.update('api::master.master', MasterEntry[0].id, {      
            data: MasterEntry[0],
          }); 
          
          if(toMaker){
            await strapi.service('api::master.master').SendEmailCommentsMaker(UpdateRegistro.referencia, user, message);
          }else{ 
            await strapi.service('api::master.master').SendEmailComments(UpdateRegistro.referencia, user, message);
          }
          

          let NumeroReferencia = {
            "IdMastar": UpdateRegistro.id,
            "GenderName":UpdateRegistro.genderName,
            "ProductName":UpdateRegistro.productname,
            "CountSequence": UpdateRegistro.referencia           
        };               
                    
          return NumeroReferencia;         
          
        }

        return 'ok!:'
  
      } catch (error) {
        console.log("error", error);
      }   
      
      //ctx.body = 'Hello World!:'  ;
  
  },

  async getUpdatePendings(ctx){  
   
    const { IdMaster } = ctx.params; 
    let Comment=[];
  
    console.log('UpdateComment:');  

    //console.log(ctx)

    //console.log(...ctx.request.body.comments)
  
    try {


      const [MasterEntry, EntryCount] = await strapi.db.query('api::master.master').findWithCount({
        select: ['id', 'referencia', 'status'],
        where: { referencia: IdMaster },
        populate: {
          collection: {         
            populate: {
              collection_type:{
                fields: ['id'],  
                },
            },             
          }, 
          theme:{
            fields: ['name'],  
            },          
          Composition: {
              populate: {
            gender:{
              fields: ['id', 'startSequence'],  
              },
              fabric:{
                fields: ['id'],  
                },
                color:{
                  fields: ['id'],  
                  },                 
                    typeproduct:{
                      fields: ['id'],  
                      }                           
            }
          },
          drawings:[{
            fields: ['id'],
          }],
          sizes: {
            fields: ['id'],
          },
          comments: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
          pendings: [
            {
              fields: ['id', 'comment'],                   
            }
          ],
        },
    }); 
  
        if (EntryCount){
        
          Comment.push(...MasterEntry[0].pendings, ...ctx.request.body.pendings)
          
          MasterEntry[0].pendings = MasterEntry ? Comment : []

          let UpdateRegistro = await strapi.entityService.update('api::master.master', MasterEntry[0].id, {
            data: MasterEntry[0],
          }); 
         

          let NumeroReferencia = {
            "IdMastar": UpdateRegistro.id,
            "GenderName":UpdateRegistro.genderName,
            "ProductName":UpdateRegistro.productname,
            "CountSequence": UpdateRegistro.referencia
        };
        
                  
        return NumeroReferencia;
          
        }
        return 'ok!:'
  
      } catch (error) {
        console.log("error", error);
      }   
      
      //ctx.body = 'Hello World!:'  ;
  
  },


  async getcontrol(ctx){
    const { Nreferencia } = ctx.params; 

    console.log(Nreferencia);

 let MasterEntry=[];
 let CodigoSizes=[];
 let CodigoStatus=[];

    const Entry = await strapi.db.query('api::masterbase.masterbase').findOne({        
      where: {   
               
            id_collection: Nreferencia,
            masterserver: { $null: true },     
                          
     },
      orderBy: { id: 'ASC' }, 
    });

    if (Entry){      

        const entry = await strapi.db.query('api::masterbase.masterbase').update({
          where: { id: Entry.id },
          data: {
            masterserver: 'send',
          },
        });
  }

  MasterEntry.push(Entry); 

    let arrSizes = Array.from(MasterEntry[0].sizelist.split(','),Number);

    arrSizes?.map((dataRef, index) => {  
      const result = {
              "id": dataRef         
          }
          CodigoSizes.push(result); 
    }); 


const ArrayData = [
  {
    "id_status": 1,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "1"
  },
  {
    "id_status": 2,
    "name_status": "Pending",
    "class": "textOk",
    "deprecated": "1"
  },
  {
    "id_status": 3,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 4,
    "name_status": "Pending",
    "class": "textOk",
    "deprecated": "0"
  },
  {
    "id_status": 5,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 6,
    "name_status": "Approved",
    "class": "textOk",
    "deprecated": "0"
  },
  {
    "id_status": 7,
    "name_status": "Cancelled",
    "class": "textCancelled",
    "deprecated": "0"
  },
  {
    "id_status": 8,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 0,
    "name_status": "Pending",
    "class": "textCancelled",
    "deprecated": "1"
  },
  {
    "id_status": 10,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 11,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 12,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  },
  {
    "id_status": 13,
    "name_status": "Pending",
    "class": "textPending",
    "deprecated": "0"
  }
]

ArrayData?.map((dataRef, index) => {  
  if(MasterEntry[0].id_status==dataRef.id_status){

    const result = {
      "id": dataRef.id_status,
      "name_status":dataRef.name_status         
  }

  CodigoStatus.push(result); 
  }
 
}); 



  const axios = require('axios');
  let data = JSON.stringify({
    "status": CodigoStatus[0] ? CodigoStatus[0].name_status : 'Pending',
    "referencia": "",
    "description":  MasterEntry[0].description,
    "similarRefs": MasterEntry[0].similar_ref,
    "collection": {
      "id": MasterEntry[0].id_collection 
    },
    "Composition": {
      "gender": {
        "id": MasterEntry[0].id_gender    
      },
      "fabric": {
        "id": MasterEntry[0].id_fabric
      },
      "color": {
        "id": MasterEntry[0].id_colorsifa     
      },           
      "typeproduct": {
        "id": MasterEntry[0].id_product      
      }
    },
    "color_pantone": {
      "id": MasterEntry[0].id_color ? MasterEntry[0].id_color : 4756
    },

    "sizes": CodigoSizes, 

    "provider": {
      "id": Number(MasterEntry[0].id_provider)
    },
    // "stamp": {
    //   "id": stamp ? stamp : ''
    // },
    "theme": {
      "id": MasterEntry[0].id_theme ? MasterEntry[0].id_theme : 396  
    }


  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://devmaster.epkweb.com/api/mastercontrol/createreferencia/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});



console.log(MasterEntry);

// console.log(CodigoStatus);



    
    // const MasterEntry = await strapi.service('api::master.master').FinOneIDMaster(Nreferencia); 

    // MasterEntry.status = MasterEntry ? 'Approved' : null

    // let UpdateRegistro = await strapi.entityService.update('api::master.master', Nreferencia, {      
    //   data: MasterEntry,
    // });
    
    // const entries = await strapi.entityService.findMany('api::settingsglobal.settingsglobal', {     
    //   populate: '*',
    // });


    // const Messages = `<p ><strong>Asunto:</strong> Reference: 1250403 Event: &nbsp;Create&nbsp;</p>
    //                   <p >&nbsp;</p>
    //                   <p ><strong>Event:</strong>&nbsp; Create</p>
    //                   <p ><strong>Date Time:</strong> (09/10/2023 02:53 pm)</p>
    //                   <p ><strong>Collection:&nbsp;</strong>Spring-Summer 2024</p>
    //                   <p ><strong>Reference:</strong> 1240012</p>
    //                   <p ><strong>Gender:&nbsp;</strong>Baby Girl</p>
    //                   <p ><strong>Product:&nbsp;</strong>Blouse S/M</p>
    //                   <p ><strong>Provider:&nbsp;</strong>Knit</p>
    //                   <p ><strong>Theme:&nbsp;</strong>Grupo10</p>
    //                   <p ><strong>Status:&nbsp;</strong>Pending</p>
    //                   <p ><strong>Size:</strong> 6M-12M-18M-23M</p>
    //                   <p ><strong>Fabric:&nbsp;</strong>Cotton Drill</p>
    //                   <p ><strong>Color:&nbsp;</strong>Beige</p>
    //                   <p ><strong>Stamp:&nbsp;</strong>S038_124</p>
    //                   <p ><strong>SystemColor:&nbsp;</strong>Orange</p>
    //                   <p ><strong>Part:&nbsp;</strong>Top</p>
    //                   <p ><strong>Description:</strong> We think you can develop style without an original sample. We want bucket hat. Do utter part S035_223 and inside in bright white. The bucket hat is meant to get wet. Please provide samples. Do stitches dtm. Can it be reversible?</p>
    //                   <p ><strong>Similar_ref:</strong></p>
    //                   <p ><strong>Product Drawing Main:</strong> 2231602.jpg</p>
    //                   <p ><strong>Product Drawing Detail:</strong> 2231602 page-2.jpg</p>
    //                   <p ><strong>Product Drawing AW:</strong> 2231602-aw.pdf</p>
    //                   <p ><strong>Product Drawing Graphic:</strong> 2231602-graphic.pdf</p>
    //                   <p ><strong>Product Drawing Original Samples:</strong> 2231602-os.jpg</p>
    //                   <p ><strong>Product Drawing Original Samples Back:</strong> 2231602-os-back.jpg</p>
    //                   <p >&nbsp;</p>
    //                   <p ><em>
    //                   <span style="font-size:13px;">
    //                       Dear User, This is an non monitored e-mail account, please do not answer or forward messages to this account. 
    //                       This message and its attachments may contain privileged or confidential information and are for the exclusive use of the person or entity of destination. 
    //                       If you are not the indicated recipient, you are notified of reading, using, disclosing and / or copying without authorization may be prohibited under current legislation. 
    //                       If you have received this message by mistake, please inform us immediately and proceed to its destruction.&nbsp;</span>
    //                   </em></p>`
      
        // if(entries.EnableMailingSISOC.sendEmail){

        //     const { to, from, subject} = entries.EnableMailingSISOC
        //     //******Email********* */ 
        //       const MasterEntry = await strapi.plugin('email').service('email').send({
        //         to: 'earmartinez@gmail.com',
        //         cc: 'earmartinez@gmail.com',
        //         from: 'master@epkweb.net',
        //         subject: '',
        //         text: '',
        //         html: Messages, //JSON.stringify(message),
        //       });  
        // }

    
    //     await strapi.service('api::master.master').webhooksSendEmail(Nreferencia, 'entry.update');

    // const IDColection = Nreferencia ? Nreferencia : '29'

    // const knex = strapi.db.connection;
    // //const Statusresult = await knex.select('url').from('files')

    // const loteCant = await knex
    // .select(
    //   knex.raw( 'stamps.name, masters.referencia')
    //   ).from("masters")
    //   .innerJoin('masters_collection_links', ' masters_collection_links.master_id ', ' masters.id ')  
    //   .innerJoin('masters_stamp_links', ' masters_stamp_links.master_id ', 'masters.id')
    //   .innerJoin('stamps', ' stamps.id ', 'masters_stamp_links.stamp_id') 
    //   .where("masters_collection_links.collection_id", "=", IDColection)      
    //   .groupBy(' stamps.name ', 'masters.referencia' )

      
    
//     const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
//       where: {      
//         name: {
//           $contains: Nreferencia,
//         },             
//     },
//     orderBy: { id: 'DESC' }, 
// }); 

 //  const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);             
   


  

// let Entry  = Object.values(Imgentry);
// let ArrayReference=[];
// let ObjetReference={};  
// Entry.map((data, index) => {      
    
//   ArrayReference.push(data.id)
    
// });  
  
  //console.log(ArrayReference.join(',')); 

  
  //const knex = strapi.db.connection;
  //const Statusresult = await knex.select('url').from('files')

  // const loteCant = await knex
  // .select(
  //     knex.raw(' id, name ')
  //     ).from("sizes")         
      
  //     .groupBy("id","name" )

     

    

  // const Resp =Rfern.forEach(function(loteCant, index)  {   

  //   loteCant = Imgentry[index];

  //   //console.log(loteCant);
  //  }); 
   
//    Rfern1.map((Composition, index) => {         
   
//     console.log(Composition);
  
// });

 


  // const data = {
                
  //   "slug": null,
  //   "referencia": "1101502",
  //   "description": "prueba de import",
  //   "status": "Pending",
  //   "genderName": "Unisex",
  //   "collection": 1,
  //   "Composition": 60,
  //   "drawings": [
  //     ArrayReference.join(',') ? ArrayReference.join(',') : 92
  //   ],
  //   "drawingsPDF": [
  //     91
  //   ],
  //   "comentarios": [
  //     112,
  //     113
  //   ],
  //   "sizes": [
  //     1,
  //     4
  //   ],
  //   "theme": 354
  // }


  // const Dataentry = await strapi.db.query('api::master.master').update({
  //   where: { referencia: Nreferencia },    
  //   data: MasterEntry
  // });

  

  //console.log(Dataentry );



    // const uentry = await strapi.entityService.update('api::master.master', 79, {
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
    
    
    
    // const entry = await strapi.entityService.findOne('api::master.master', id, {
    //     fields: ['id','referencia'],
    //     populate: ['collection', 'imagen1'],
    //   });

      // const SeleccEntry = await strapi.entityService.findOne('api::master.master', id, {
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
      
      
     
      

  
       
     
        
      //const NumeroReferencia = await getCreateSequence(id); 
      
                      

      ctx.body = 'Hello World!:'  ;

   
       
    
},
  


  };