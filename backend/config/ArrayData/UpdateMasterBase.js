module.exports = async function UpdateMasterBase( ) {

  

    let MasterEntry=[];
    let CodigoSizes=[];
    let CodigoProduct=[];
    let CodigoGender=[];
    let Response=[];
    
  
    const Entry = await strapi.db.query('api::masterbase.masterbase').findOne({        
      where: {   
               
            id_collection: upNreferencia,
            upmasterserver: { $null: true },     
                          
     },
      orderBy: { id: 'ASC' }, 
    });
    
    MasterEntry.push(Entry); 
  
     
    
  
  
      ArrayProduct?.map((dataRef, index) => {  
        if(MasterEntry[0].id_product==dataRef.id_product){
  
          const result = {
            "id": dataRef.id_product,
            "name_product":dataRef.name_product         
        }
  
        CodigoProduct.push(result); 
        }
  
        }); 
  
  console.log(CodigoProduct[0]);
  
  
  const axios = require('axios');
  let data = JSON.stringify({
  
    "data": {
      "productname": CodigoProduct[0] ? CodigoProduct[0].name_product : 'Dress'
    }
    
  
  
  });
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'https://devmaster.epkweb.com/api/masters/'+Entry.id,
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
            upmasterserver: 'send',
          },
        });
      }
  
  })
  .catch((error) => {
  console.log(error);
  });
  
  
  
  
  
  //console.log(MasterEntry);
  
   
  };
  