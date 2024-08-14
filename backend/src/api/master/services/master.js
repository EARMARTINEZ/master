'use strict';

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
/**
 * master service
 */
        async function getGeneraCodigosReferencia(idMaster) {
        
            let Status ='Pending';
        //Genera los Codigos que indentifican la Referencia  
            try {
        
            const SeleccEntry = await strapi.db.query('api::master.master').findOne({
                select: ['id', 'referencia', 'status'],
                where: { id: idMaster },
                populate: {
                collection: {         
                    populate: {
                    collection_type:{
                        fields: ['id'],  
                        },
                    },             
                },
                theme:{
                    fields: ['id'],  
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
                sizes: {
                    fields: ['id'],
                },
                },
            }); 
        
            //Composition-Referencia
            let CollectionId = SeleccEntry.collection ? SeleccEntry.collection.id :'0';
            let ComponentsReference  = Object.values(SeleccEntry.Composition);    
            const AttributesReference = Object.keys(SeleccEntry.Composition);
            const ObjetSizes = Object.values(SeleccEntry.sizes) 
                
            let HuellaReference=[];
            let GenderName=[];
            let ProductName=[];
            let CodigoComposition=[];
            let CodigoSizes=[];
            let StartSequence=[];
        
            const PrefixCollectiontype=SeleccEntry.collection ? SeleccEntry.collection.collection_type.prefix_id : 'P';
            const PrefixCollection=SeleccEntry.collection ? SeleccEntry.collection.prefix_id :'CM';
            const ReferencePrefix = `${PrefixCollectiontype}${PrefixCollection}`;     
            HuellaReference.push(CollectionId, ReferencePrefix);
            
        
            //console.log(AttributesReference);
        
        
            ComponentsReference?.map((Composition, index) => { 
        
                const IdReference = Composition ? Composition.id : AttributesReference[index]
                const NameGender = Composition ? Composition.name : AttributesReference[index]
                const NameProduct = Composition ? Composition.name : AttributesReference[index]
                const Startseq = Composition ? Composition.startSequence : AttributesReference[index]
                //console.log(IdReference + ': ' + AttributesReference[index]); 
                CodigoComposition.push(AttributesReference[index]!='id' ? IdReference : '')
        
                HuellaReference.push(AttributesReference[index]==='gender' ? IdReference : '')
                
                ProductName.push(AttributesReference[index]==='typeproduct' ? NameProduct : '')

                GenderName.push(AttributesReference[index]==='gender' ? NameGender : '')
        
                StartSequence.push(AttributesReference[index]==='gender' ? Startseq : '')
            });
        
        
            ObjetSizes?.map((Sizes, index) => {      
                const IdSizes = Sizes.id ? Sizes.id : '0'        
                CodigoSizes.push(IdSizes );     
            });
                
            let NumeroReferencia = [{
                "IdMastar": idMaster,
                "CollectionId": CollectionId,
                "CodigoPrefix":ReferencePrefix,
                "CodigoComposition":CodigoComposition.join(''), //[ 'gender', 'fabric', 'color', 'typeproduct' ]
                "HuellaReference": HuellaReference.join(''), // CollectionId+CodigoPrefix+CodigoGender
                "GenderName":GenderName.join(''),
                "ProductName":ProductName.join(''),
                "CodigoSizes": CodigoSizes.join(''),
                "StartSequence": StartSequence.join(''),
            },];

            //console.log(NumeroReferencia)
            
            return NumeroReferencia
        
        
            } catch (error) {
            console.log("error", error);
            }       
        };
  
    async function getSequence(ObjetReference) {
    
    //Determina el Correlativo de la Referencia
    try {

          const [IdMasterEntry, IDMasterCount] = await strapi.db.query('api::variation.variation').findWithCount({
                select: ['IdMastar', 'CountSequence'],    
                where: { 
                    $and: [
                    { HuellaReference: ObjetReference.HuellaReference },
                    {IdMastar: ObjetReference.IdMastar },
                    ],
                    
                },
                orderBy: { CountSequence: 'DESC' }, 
          });
    
            if (IDMasterCount){             

                  console.log('IDMasterCount: '+ IdMasterEntry )
                  console.log( IdMasterEntry )
                  let Sequence = Number(IdMasterEntry[0].CountSequence.substr(3,6)); 
                  //console.log(Sequence)
                  return Sequence;
                  
               
            } 
        
        const [entry, Huellacount] = await strapi.db.query('api::variation.variation').findWithCount({
        select: ['IdMastar'],
        where: { HuellaReference: ObjetReference.HuellaReference },
        orderBy: { CountSequence: 'DESC' },     
        });
    
            if (Huellacount){
                console.log('Huellacount: '+ Huellacount)
                let Sequence = Number(ObjetReference.StartSequence) + Huellacount
                return Sequence;
            }
        
        return ObjetReference.StartSequence;  
    
    } catch (error) {
        console.log("error", error);
    }    
    
    }
  
async function getCreateSequence(idMaster) {
     
    let Status ='Pending';
    let ObjetReference;
  
    try {
  
      const CodigosReferencia = await getGeneraCodigosReferencia(idMaster); 
            CodigosReferencia.map((Codigos, index) => {      
              ObjetReference = Codigos  
            });
  
  
        const [Mastarentry, Mastarcount] = await strapi.db.query('api::variation.variation').findWithCount({
        select: ['IdMastar'],
        where: { IdMastar: idMaster },     
        });
  
              if (Mastarcount){        
  
                  let Sequence =  await getSequence(ObjetReference);            
                
                    await strapi.db.query('api::master.master').update({
                    where: { id: idMaster },  
                    data: {
                      referencia:`${ObjetReference.CodigoPrefix}${Sequence.toString().padStart(4, '0')}`,
                      genderName: ObjetReference.GenderName,    
                      productname:ObjetReference.ProductName,             
                    },
                  });
  
                  const CodigoReference = await strapi.db.query('api::variation.variation').update({
                    where: { IdMastar: idMaster },  
                    data: {
                      CountSequence:`${ObjetReference.CodigoPrefix}${Sequence.toString().padStart(4, '0')}`,
                      CollectionId: ObjetReference.CollectionId,
                      CodigoPrefix: ObjetReference.CodigoPrefix,
                      CodigoComposition:ObjetReference.CodigoComposition,
                      HuellaReference: ObjetReference.HuellaReference,
                      CodigoSizes:ObjetReference.CodigoSizes
                     
                    },
                  });
                  //console.log(CodigoReference)
                return CodigoReference;
              }
           
           let Sequence =  await getSequence(ObjetReference);    
       
            //Create
            await strapi.db.query('api::variation.variation').create({
            data: ObjetReference,
         });console.log('CreateVariation:')
  
        
         //Genero
           await strapi.db.query('api::master.master').update({
              where: { id: idMaster },  
              data: {
                referencia:`${ObjetReference.CodigoPrefix}${Sequence.toString().padStart(4, '0')}`,
                genderName: ObjetReference.GenderName,
                productname:ObjetReference.ProductName,
              },
            });
  
          const CodigoReference = await strapi.db.query('api::variation.variation').update({
              where: { IdMastar: idMaster },  
              data: {
                CountSequence:`${ObjetReference.CodigoPrefix}${Sequence.toString().padStart(4, '0')}`,
              },
            });
            
  
            //console.log(ObjetReference);
  
            return CodigoReference;    
  
  
  
    } catch (error) {
      console.log("error", error);
    }       
  };


const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::master.master', ({ strapi }) =>  ({

  async FinOneIDMaster(ID) {

    try { 

      const MasterEntry = await strapi.db.query('api::master.master').findOne({
          select: ['id','referencia', 'genderName', 'status'],    
          where: { 
            $and: [
              { id: Number(ID) },             
            ],          
          },
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
          },
            
        }); 

      return MasterEntry

      } catch (error) {
        console.log("error", error);
    }
},

  async FinOneReferencia(Nreferencia) {

   // const NReferencia = Nreferencia.substring(0, 7);

    

      try { 

        const MasterEntry = await strapi.db.query('api::master.master').findOne({
            select: ['id','referencia', 'genderName', 'status'],    
            where: { 
              $and: [
                { referencia: Nreferencia },             
              ],          
            },
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
            },
              
          }); 

        return MasterEntry

        } catch (error) {
          console.log("error", error);
      }
  },

    async GenerateSequence(Identry) {
    
        const MasterEntry =  await getCreateSequence(Identry);

    return MasterEntry
    }, 
    
    async FinOneImagesReferencia(Nreferencia) {
      try {
        // Crear un patrón que coincida con cualquier archivo que comience con el número de referencia y tenga la extensión .jpg
        const pattern = `${Nreferencia}.*\\.jpg`;
    
        // Buscar imágenes que coincidan exactamente con el patrón
        const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({
          where: {
            name: { $eq: pattern },  // Utilizar expresión regular para la coincidencia
          },
          orderBy: { id: 'DESC' },
        });
    
        // Verificar si hay imágenes encontradas
        if (ImgentryCount > 0) {
          console.log(Imgentry)
          // Buscar la entrada en la colección 'master' que coincida con la referencia
          const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);
          
          // Actualizar la entrada con las imágenes encontradas
          MasterEntry.drawings = Imgentry || [];
    
          // Actualizar la entrada en la base de datos
          const Dataentry = await strapi.db.query('api::master.master').update({
            where: { referencia: Nreferencia },
            data: MasterEntry,
          });
    
          return Dataentry;
        }
    
        return null;
      } catch (error) {
        console.error("Error:", error);
        return null; // Devolver null en caso de error
      }
    },
          

        async FinOnePDFReferencia(Nreferencia) {       

          try { 
                
                  const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
                          where: {      
                            name: {
                              $contains: Nreferencia,
                            },
                            ext: {
                              $contains: '.pdf',
                            },      
                        },
                        orderBy: { id: 'DESC' }, 
                    }); 

              if (ImgentryCount){
                    const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);             
                    
                          MasterEntry.drawingsPDF = Imgentry ? Imgentry : []
                    
                    const Dataentry = await strapi.db.query('api::master.master').update({
                      where: { referencia: Nreferencia },    
                      data: MasterEntry
                    });

                return Dataentry;
                } 

                return null;

            } catch (error) {
              console.log("error", error);
          }

        },

        
        async FinOneImagesSilhouetteReferencia(Nreferencia) {       

          try { 
                
                  const [Imgentry, ImgentryCount] = await strapi.db.query('plugin::upload.file').findWithCount({        
                          where: {      
                            name: {
                              $contains: Nreferencia,
                            },
                            ext: {
                              $contains: '.png',
                            },      
                        },
                        orderBy: { id: 'DESC' }, 
                    }); 
  
                    console.log(Imgentry);  
  
              if (ImgentryCount){
                    const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);             
                    
                          MasterEntry.silhouette = Imgentry ? Imgentry : []
                    
                    //const NReferencia = Nreferencia.substring(0, 7);       
                    const Dataentry = await strapi.db.query('api::master.master').update({
                      where: { referencia: Nreferencia },    
                      data: MasterEntry
                    });
  
                return Dataentry;
                } 
  
                return null;
  
            } catch (error) {
              console.log("error", error);
          }
  
        }, 

        

  async FinOneSizeReferencia(event,Nreferencia) {       

    try { 
      let DataSizes=[]; 
      let MasterEntry;
      
          //setTimeout(async () => {
              
               MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);  
                        
                MasterEntry.sizes?.map((Sizes, index) => {      
                const dataSize = Sizes.name ? Sizes.name : ''        
                DataSizes.push(dataSize);     
              });     
                
              
              if(DataSizes.length > 1){
                  console.log('FindExamineSizes');
                  const DataEntrySize = await strapi.service('api::master.master').FindExamineSizes(Nreferencia, DataSizes, MasterEntry);      
                return DataEntrySize;
              }
          
        
          if(DataSizes.length === 0){
              console.log('ApplySuggestedSizes');
              const DataEntrySize = await strapi.service('api::master.master').ApplySuggestedSizes(Nreferencia, MasterEntry);       
            return DataEntrySize;
          } 

     // }, 5000)      
    
      } catch (error) {
        console.log("error", error);
    }

  },

  async FindExamineSizes(Nreferencia, dataSize) {  

      try {          
            const [SizeEntry, SizeEntryCount] = await strapi.db.query('api::size.size').findWithCount({
              where: {      
                name: {
                  $in:  dataSize,
                    },             
                },
                orderBy: { id: 'DESC' }, 
            }); 

            if (SizeEntryCount){
              const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);
              MasterEntry.sizes = SizeEntry ? SizeEntry : []

              const Dataentry = await strapi.db.query('api::master.master').update({
                where: { referencia: Nreferencia },    
                data: MasterEntry
              });

              return Dataentry; 
            }   
      
      } catch (error) {
        console.log("error", error);
      }  

  },

  async ApplySuggestedSizes(Nreferencia, MasterEntry) {  

    try {  
      
      //const MasterEntry = await strapi.service('api::master.master').FinOneReferencia(Nreferencia);

      const MaterGener = MasterEntry.Composition.gender ? MasterEntry.Composition.gender.id : '1'
      const MaterTypeProduct = MasterEntry.Composition.typeproduct ? MasterEntry.Composition.typeproduct.id : '1'
      
     
      let [SizeEntryActives, SizeActivesCount] = await strapi.db.query('api::sizeactive.sizeactive').findWithCount({   
          select: ['id'], 
          where: {
      
            activateSearch: true,
      
            $and: [
              {   
              gender:{        
              id: MaterGener  
            },
          },
            {
              typeproduct:{
                id: MaterTypeProduct,  
              },  
            },
            
        ],  
          
          },
          populate: {
            sizes: {
              fields: ['id'],
          },
      
          },
      
            orderBy: { id: 'ASC' },      
      });
      console.log('SizeEntryActives: '+SizeEntryActives.length)

      if (SizeEntryActives.length == 0){
        const [SizeEntry, SizeEntryCount] = await strapi.db.query('api::size.size').findWithCount({   
          select: ['id'], 
          where: {      
            $and: [
                    {   
                    genders:{        
                    id: MaterGener  
                  },
                },
                  {
                    typeproducts:{
                      id: MaterTypeProduct,  
                    },  
                  },
                  
              ],        
            
            },
            orderBy: { id: 'ASC' },      
      }); 
              
            MasterEntry.sizes = SizeEntry ? SizeEntry : [] 
            
            const Dataentry = await strapi.db.query('api::master.master').update({
              where: { referencia: Nreferencia },    
              data: MasterEntry
            });

            console.log('Dataentry: '+Dataentry)

          return Dataentry;
      }     
      
      
      if (SizeEntryActives.length >= 1){

                const SizesIDArray = SizeEntryActives[0] ? SizeEntryActives[0].sizes :[]
                let ArraySizes=[];
                SizesIDArray?.map((Sizes, index) => {             
                  const sizesid={
                    "id": Sizes.id,
                  }              
                  ArraySizes.push(sizesid);
                });



                MasterEntry.sizes = SizeEntryActives ? ArraySizes : [] 
                      
                const Dataentry = await strapi.db.query('api::master.master').update({
                  where: { referencia: Nreferencia },    
                  data: MasterEntry
                });

              return Dataentry;
            
          }

        
              
    
    } catch (error) {
      console.log("error", error);
    }  

},


async FindIDMasterExamineSizes(IDMaster, dataSize) {  

  try {          
        const [SizeEntry, SizeEntryCount] = await strapi.db.query('api::size.size').findWithCount({
          where: {      
            name: {
              $in:  dataSize,
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

          return Dataentry; 
        }   
  
  } catch (error) {
    console.log("error", error);
  }  

},


async webhooksSendEmail(idMaster, Event) {  

  try {          
     
    const entries = await strapi.entityService.findMany('api::master.master', {
      filters: { id: idMaster },     
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
              fields: ['id', 'name'],  
              },
              color:{
                fields: ['id', 'name'],  
                },                 
                  typeproduct:{
                    fields: ['id', 'name'],  
                    },                           
          },
        },
        drawings:{
          fields: ['id', 'name'],
        },
        drawingsPDF:{
          fields: ['id', 'name'],
        },
        provider:{
          fields: ['id', 'name'],  
          },  
        stamp:{
          fields: ['id', 'name'],  
          },    
        theme:{
          fields: ['id', 'name'],  
          },    
        sizes: {
          fields: ['id', 'name'],
        },
        color_pantone: {
          fields: ['id', 'name'],
        },       
        comments: {       
          populate: {
            type:{
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

        if(entries){
            const Entries = entries[0]   
        
            const Entry = {
                  event: Event,
                  entry: Entries                   
                }      

           await strapi.service('api::master.master').SendEmailSISOC(Entry.entry.referencia , Entry);     
            //console.log(Entry.entry.sizes);
        }

  } catch (error) {
    console.log("error", error);
  }  

},


async SendEmailComments(reference, user, message) {  

  try {          
     
    const entries = await strapi.entityService.findMany('api::settingsglobal.settingsglobal', {     
      populate: '*',
    });

        if(entries.EnableMailingComments.sendEmail){
          
        const { to, from, subject} = entries.EnableMailingComments
            //******Email********* */ 
              const MasterEntry = await strapi.plugin('email').service('email').send({
                to: to ? to : '',
                from: from ? from : 'master@epkweb.net',
                subject: subject ? subject+ reference : 'NEW COMMENT IN MASTER REFERENCE: '+reference,
                text: '',
                html: `<h3>Reference: ${reference}</h3> 
                      <h4>User ${user} (Says):</h4> 
                      <p>${message}</p> 
                      <p >&nbsp;</p>
                      <p ><em>
                      <span style="font-size:13px;">
                          Dear User, This is an non monitored e-mail account, please do not answer or forward messages to this account. 
                          This message and its attachments may contain privileged or confidential information and are for the exclusive use of the person or entity of destination. 
                          If you are not the indicated recipient, you are notified of reading, using, disclosing and / or copying without authorization may be prohibited under current legislation. 
                          If you have received this message by mistake, please inform us immediately and proceed to its destruction.&nbsp;</span>
                      </em></p>`,
              });
              
             
        }
   



  } catch (error) {
    console.log("error", error);
  }  

},

async SendEmailCommentsMaker(reference, user, message) {  

  try {          
     
    const entries = await strapi.entityService.findMany('api::settingsglobal.settingsglobal', {     
      populate: '*',
    });

        if(entries.EnableMailingComments.sendEmail){
        
        const { toMaker} = entries  
        const { from, subject} = entries.EnableMailingComments
        
            //******Email********* */ 
              const MasterEntry = await strapi.plugin('email').service('email').send({
                to: toMaker ? toMaker : '',
                from: from ? from : 'master@epkweb.net',
                subject: subject ? subject+ reference : 'NEW COMMENT IN MASTER REFERENCE: '+reference,
                text: '',
                html: `<h3>Reference: ${reference}</h3> 
                      <h4>User ${user} (Says):</h4> 
                      <p>${message}</p> 
                      <p >&nbsp;</p>
                      <p ><em>
                      <span style="font-size:13px;">
                          Dear User, This is an non monitored e-mail account, please do not answer or forward messages to this account. 
                          This message and its attachments may contain privileged or confidential information and are for the exclusive use of the person or entity of destination. 
                          If you are not the indicated recipient, you are notified of reading, using, disclosing and / or copying without authorization may be prohibited under current legislation. 
                          If you have received this message by mistake, please inform us immediately and proceed to its destruction.&nbsp;</span>
                      </em></p>`,
              });
              
             
        }
   



  } catch (error) {
    console.log("error", error);
  }  

},

async SendEmailSISOC(reference, message) {  

  try { 
    
    let CodigoSizes=[];
    let CodigoDrawings=[];
    let CodigoDrawingsPDF=[];
     
    const entries = await strapi.entityService.findMany('api::settingsglobal.settingsglobal', {
      populate: '*',
    });   
     
    let Entry = message.entry

      Entry.sizes?.map((Sizes, index) => {      
        const IdSizes = Sizes ? Sizes.name : 'null'        
        CodigoSizes.push(IdSizes);     
     }); 
     
     Entry.drawings?.map((Drawings, index) => {      
      const IDDrawings = Drawings ? Drawings.name : ''

      IDDrawings===reference+'.jpg' ? CodigoDrawings.push(`<p ><strong>Product Drawing Main: </strong>${IDDrawings}</p>`) : ''
      IDDrawings.includes('page-2.') ? CodigoDrawings.push(`<p ><strong>Product Drawing Detail: </strong>${IDDrawings}</p>`) : ''     
      IDDrawings.includes('-os.jpg') ? CodigoDrawings.push(`<p ><strong>Product Drawing Original Samples: </strong>${IDDrawings}</p>`) : ''
      IDDrawings.includes('-os-back.jpg.') ? CodigoDrawings.push(`<p ><strong>Product Drawing Original Samples Back: </strong>${IDDrawings}</p>`) : ''
     
      });
   
      Entry.drawingsPDF?.map((Drawings, index) => {      
          const IDDrawings = Drawings ? Drawings.name : 'null' 
          
          IDDrawings.includes('-aw.pdf') ? CodigoDrawingsPDF.push(`<p ><strong>Product Drawing AW: </strong>${IDDrawings}</p>`) : ''
          IDDrawings.includes('-graphic.pdf') ? CodigoDrawingsPDF.push(`<p ><strong>Product Drawing Graphic: </strong>${IDDrawings}</p>`) : ''        
        });  

     let dateformat=  `${convertToFrenchDate(Entry.updatedAt)}-${convertToFrenchHour(Entry.updatedAt)}`;

    const Messages = `<p ><strong>Event:</strong>&nbsp; ${message.event}</p>
                      <p ><strong>Date Time:</strong> ${dateformat}</p>
                      <p ><strong>Collection:&nbsp;</strong>${Entry.collection ? Entry.collection.name : ''}</p>
                      <p ><strong>Reference:</strong> ${reference}</p>
                      <p ><strong>Gender:&nbsp;</strong>${Entry.genderName ? Entry.genderName : ''}</p>
                      <p ><strong>Product:&nbsp;</strong>${Entry.productname ? Entry.productname : ''}</p>
                      <p ><strong>Provider:&nbsp;</strong>${Entry.provider ? Entry.provider.name : ''}</p>
                      <p ><strong>Theme:&nbsp;</strong>${Entry.theme ? Entry.theme.name : ''}</p>
                      <p ><strong>Status:&nbsp;</strong>${Entry.status ? Entry.status : ''}</p>
                      <p ><strong>Size:</strong> ${CodigoSizes.join('-')}</p>
                      <p ><strong>Fabric:&nbsp;</strong>${Entry.Composition ? Entry.Composition.fabric.name : ''}</p>
                      <p ><strong>Color:&nbsp;</strong>${Entry.color_pantone ? Entry.color_pantone.name : ''}</p>
                      <p ><strong>Stamp:&nbsp;</strong>${Entry.stamp ? Entry.stamp.name : ''}</p>
                      <p ><strong>SystemColor:&nbsp;</strong>${Entry.Composition ? Entry.Composition.color.name: ''}</p>
                      <p ><strong>Part:&nbsp;</strong>${''}</p>
                      <p ><strong>Description:</strong> ${Entry.description ? Entry.description : ''}</p>
                      <p ><strong>Similar_ref:</strong>${Entry.similarRefs ? Entry.similarRefs: ''}</p>
                      ${CodigoDrawings.join('')}  
                      ${CodigoDrawingsPDF.join('')}                  
                     
                      <p >&nbsp;</p>
                      <p ><em>
                      <span style="font-size:13px;">
                          Dear User, This is an non monitored e-mail account, please do not answer or forward messages to this account. 
                          This message and its attachments may contain privileged or confidential information and are for the exclusive use of the person or entity of destination. 
                          If you are not the indicated recipient, you are notified of reading, using, disclosing and / or copying without authorization may be prohibited under current legislation. 
                          If you have received this message by mistake, please inform us immediately and proceed to its destruction.&nbsp;</span>
                      </em></p>`
      
        if(entries.EnableMailingSISOC.sendEmail){

            const { to, from, subject} = entries.EnableMailingSISOC
            //******Email********* */ 
              const MasterEntry = await strapi.plugin('email').service('email').send({
                to: to ? to : '',
                from: from ? from : 'master@epkweb.net',
                subject: subject ? subject+ reference : `Reference: ${reference} Event: ${message.event} `,
                text: '',
                html: Messages, //JSON.stringify(message),
              });  
        }



  } catch (error) {
    console.log("error", error);
  }  

},  

}));