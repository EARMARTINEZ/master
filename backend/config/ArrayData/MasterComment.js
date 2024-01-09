
'use strict';


const ArrayMaster = require('ArrayMaster.js');
const ArrayUser = require('ArrayUser.js');
const ArrayTypeComent = require('ArrayTypeComent.js');
const ArrayCity = require('ArrayCity.js');
const ArrayComment = require('ArrayComment.js');

module.exports = async (Entry) => {

  

    let MasterEntry=[];
    let CodigoTypeComent=[];
    let CodigoData=[];
    let CodigoCity=[];
    let CodigoUser=[];
    let Response=[];
    let Comments=[];
    
  
    // const Entry = await strapi.db.query('api::masterbase.masterbase').findOne({
    //   where: {   
               
    //         id_collection: Nreferencia,
    //         masterserver: { $null: true },
                          
    //  },
    //   orderBy: { id: 'ASC' }, 
    // });
    
    MasterEntry.push(Entry); 
  
   let CommentData = ArrayMaster.find((element) => element.ref == MasterEntry[0].ref );
  
      if(CommentData){
  
          let CommentArray = ArrayComment.find((element) => element.id_master == CommentData.id_master )
  
          console.log(CommentArray);
  
        if(CommentArray){
  
          ArrayComment?.map((dataRef, index) => { 
  
            if(CommentData.id_master==dataRef.id_master ){
  
                let userid = ArrayUser.find((element) => element.id_user == dataRef.id_user )
  
                let typecommentid = ArrayTypeComent.find((element) => element.id_typecomment == dataRef.id_typecomment )
  
                let cityid = ArrayCity.find((element) => element.id_city == dataRef.id_city )
  
                //console.log(typecommentid);
  
                const result = {
                  "id": MasterEntry[0].ref,
                  "comment": dataRef.comment,
                  "date": dataRef.date_comment,
                  "name_user": userid ? userid.name_user : 'admin@epkweb.net',
                  "id_typecomment": typecommentid ? typecommentid.id_typecomment : 1,
                  "name_city": cityid ? cityid.name_city : 'caracas',
                }      
  
                  CodigoData.push(result); 
            }
  
          }) 
        }
  
      }
  
      
  
       
   
  
      // ArrayCity?.map((dataRef, index) => {  
      //   if(CodigoData[0].id_city==dataRef.id_city){
  
      //     const result = {
      //       "id_city": dataRef ? dataRef.id_city :'1',
      //       "name_city": dataRef ? dataRef.name_city :'caracas',
            
      //     }
      //     CodigoCity.push(result); 
      //   }
  
      //   }); 
  
  
  
    CodigoData?.map((dataRef, index) => {  
      
    
        const result =  {
          "comment": dataRef ? dataRef.comment : '', 
          "date": dataRef ? dataRef.date : new Date(),
          "user": dataRef ? dataRef.name_user : 'admin@epkweb.net',
          "type": dataRef ? dataRef.id_typecomment : '1',   
          "city": dataRef ? dataRef.name_city : 'Caracas',           
        }
        Comments.push(result); 
      
    
      }); 
  
  const axios = require('axios');
  let data = JSON.stringify({
   
    "comments": Comments,
    "toMaker": false,
  
  
  });
  
  console.log(CodigoData);
      if(CodigoData.length>0){
  
            let config = {
              method: 'put',
              maxBodyLength: Infinity,
              url: 'https://devmaster.epkweb.com/api/mastercontrol/getUpdateComment/'+CodigoData[0].id,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
  
      //console.log(config.data);
  
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
            //console.log(error);
            });
  
          }; 
  
          if (CodigoData.length==0){      
  
            const entry = await strapi.db.query('api::masterbase.masterbase').update({
              where: { id: Entry.id },
              data: {
                masterserver: 'does not apply',
              },
            });
          }
  };


