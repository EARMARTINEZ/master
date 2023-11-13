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

const axios = require('axios');


async function MercadoRentaVariable(rentavariable,cotizacion ) {

  var host_url = "http://localhost:1337/";
  var response = await axios.post(host_url + "admin/login", {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
  });
  const data_jwt = response.data.data.token; 
  
  
     var data = JSON.stringify({
        "locale":"es",
        "metadata":{"metaTitle":"Mercado Renta Variable",
        "metaDescription":"Mercado Renta Variable titulos",
        "twitterCardType":"summary",
        "twitterUsername":null,
        "shareImage":null},
        "contentSections":[
            {"__component":"sections.mercado-renta-variable",
                    "rentavariable":
                        rentavariable

                    },


         {"__component":"sections.mercado",
        "cotizacion":

            cotizacion
             }    
    
    
        ],



        "localizations":[]});      

    var config = {
      method: 'put',
      url: 'http://localhost:1337/content-manager/collection-types/api::page.page/106',
      headers: { 
        Authorization: "Bearer " + data_jwt,
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      console.log('PUT-Mercado Renta Variable: ' + new Date());
    })
    .catch(function (error) {
      console.log(error);
    }); 

    /*  */

    var dashdata = JSON.stringify({
      "locale":"es",
      "metadata":{"metaTitle":"dashboard",
      "metaDescription":"dashboard",
      "twitterCardType":"summary",
      "twitterUsername":"dashboard",
      "shareImage":null},
      "contentSections":[
          {"__component":"sections.dashboard",
                  "rentavariable":
                      rentavariable,
                      cotizacion
                  },                  
  
  
      ], 


      "localizations":[]});   

    var dashconfig = {
      method: 'put',
      url: 'http://localhost:1337/content-manager/collection-types/api::page.page/112',
      headers: { 
        Authorization: "Bearer " + data_jwt,
        'Content-Type': 'application/json'
      },
      data : dashdata
    };
    
    axios(dashconfig)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      console.log('PUT-Mercado Renta Variable: ' + new Date());
    })
    .catch(function (error) {
      console.log(error);
    }); 

};

async function DetalleMercadoTitulos( ) {

    console.log('Tarea-Mercado Renta Variable: ' + new Date());

    var host_url = "https://www.bolsadecaracas.com/api/mercado/renta-variable/titulos";       

        var response =  await axios.get(
            host_url,
            {
              headers: {
                ContentType : 'application/json', 
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwibmFtZSI6IktvaSBJbnZlc3QiLCJlbWFpbCI6Im5pdXdlckBnbjNrLm1lIn0.MrC_Y27aXCJ54dDSYRqnFg1pZey_c_C34WOvhbNlbQA',
              },
            }
          );
          const data = response.data;

          //console.log(data);
    
    //console.log(Dmercado);
    return data
};

async function CotizacionesMercado( ) {

    console.log('Tarea-Cotizaciones Mercado: ' + new Date());

    var host_url = "https://www.bolsadecaracas.com/api/mercado/cotizaciones";       

        var response =  await axios.get(
            host_url,
            {
              headers: {
                ContentType : 'application/json', 
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwibmFtZSI6IktvaSBJbnZlc3QiLCJlbWFpbCI6Im5pdXdlckBnbjNrLm1lIn0.MrC_Y27aXCJ54dDSYRqnFg1pZey_c_C34WOvhbNlbQA',
              },
            }
          );
          const data = response.data;

          //console.log(data);
    
    //console.log(Dmercado);
    return data
};

module.exports = {

/************************************************* */
/************************************************* */      
taskMercados: {
    task: async ({ strapi }) => {          

       
          const rentavariable = await DetalleMercadoTitulos() ;
          const cotizacion = await CotizacionesMercado() ;

          console.log('Consulta Mercados');
          if (rentavariable != null | rentavariable != null ) {    

            MercadoRentaVariable(rentavariable.response, cotizacion.response )
        }
    },
        options: {
            rule: '*/2 * * * *',
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