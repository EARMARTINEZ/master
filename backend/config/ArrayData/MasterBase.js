'use strict';

const ArrayMaster = require('./ArrayData/ArrayMaster.js');
const ArrayStatus = require('./ArrayData/ArrayStatus.js');
const ArrayProduct = require('./ArrayData/ArrayProduct.js');
const ArrayGenero = require('./ArrayData/ArrayGenero.js');


module.exports = async function MasterBase( ) {

    let MasterEntry=[];
    let CodigoSizes=[];
    let CodigoStatus=[];
    let CodigoGender=[];
    let CodigoProduct=[];
    let Response=[];

    const Entry = await strapi.db.query('api::masterbase.masterbase').findOne({
      where: {
            id_collection: Nreferencia,
            masterserver: { $null: true },
     },
      orderBy: { id: 'ASC' },
    });
    MasterEntry.push(Entry);
    let arrSizes = MasterEntry[0].sizelist ? Array.from(MasterEntry[0].sizelist.split(','),Number): [21];

        arrSizes?.map((dataRef, index) => {
          const result = {
                  "id": dataRef
              }
              CodigoSizes.push(result);
        });
        ArrayStatus?.map((dataRef, index) => {
        if(MasterEntry[0].id_status==dataRef.id_status){

          const result = {
            "id": dataRef.id_status,
            "name_status":dataRef.name_status
        }

        CodigoStatus.push(result);
        }
        });
        ArrayGenero?.map((dataRef, index) => {
          if(MasterEntry[0].id_gender==dataRef.id_gender){
            const result = {
              "id": dataRef.id_gender,
              "name_gender":dataRef.name_gender
          }
          CodigoGender.push(result);
          }
          });
              ArrayProduct?.map((dataRef, index) => {
                if(MasterEntry[0].id_product==dataRef.id_product){
                  const result = {
                    "id": dataRef.id_product,
                    "name_product":dataRef.name_product
                }
                CodigoProduct.push(result);
                }
                });

  const axios = require('axios');
  let data = JSON.stringify({
    "status": CodigoStatus[0] ? CodigoStatus[0].name_status : 'Pending',
    "referencia": MasterEntry[0].ref,
    "description":  MasterEntry[0].description,
    "similarRefs": MasterEntry[0].similar_ref,
    "genderName": CodigoGender[0] ? CodigoGender[0].name_gender : 'Girl',
    "productname": CodigoProduct[0] ? CodigoProduct[0].name_product : 'Dress',
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
  .then( async (response) => {
  console.log(JSON.stringify(response.data));
  Response.push(JSON.stringify(response.data));
      if (Response.length>0){
        const entry = await strapi.db.query('api::masterbase.masterbase').update({
          where: { id: Entry.id },
          data: {
            masterserver: 'send',
          },
        });
      }
  })
  .catch((error) => {
  console.log(error);
  });
  //console.log(MasterEntry);
  };