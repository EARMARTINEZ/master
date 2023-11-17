'use strict';
/**
 * master router
 */
module.exports = {
    routes: [

      {
        "method": "GET",
        "path": "/mastercontrol/getcontrol/:Nreferencia",
        "handler": "mastercontrol.getcontrol",
        "config": {
          "policies": ['api::master.my-policy']
        }
      },
        {
            "method": "GET",
            "path": "/mastercontrol/getreferencia/:Nreferencia",
            "handler": "mastercontrol.getreferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/getImagensReferencia/:Nreferencia",
            "handler": "mastercontrol.getImagensReferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "POST",
            "path": "/mastercontrol/getcatalog/",
            "handler": "mastercontrol.getcatalog",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },

          {
            "method": "POST",
            "path": "/mastercontrol/createreferencia/",
            "handler": "mastercontrol.createreferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/updatereferencia/:Nreferencia",
            "handler": "mastercontrol.updatereferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/updateStatusReferencia/:IdMaster",
            "handler": "mastercontrol.updateStatusReferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },          
          {
            "method": "GET",
            "path": "/mastercontrol/TriggerXLSX/:Nreferencia",
            "handler": "mastercontrol.TriggerXLSX",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/PendingsTriggerXLSX/:Nreferencia",
            "handler": "mastercontrol.PendingsTriggerXLSX",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/CommentsTriggerXLSX/:Nreferencia",
            "handler": "mastercontrol.CommentsTriggerXLSX",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/UpdateComment/:IdMaster",
            "handler": "mastercontrol.UpdateComment",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/UpdatePendingsComment/:IdMaster",
            "handler": "mastercontrol.UpdatePendingsComment",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/UpdateStampComment/:IdStamp",
            "handler": "mastercontrol.UpdateStampComment",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/UpdateStampPendingsComment/:IdStamp",
            "handler": "mastercontrol.UpdateStampPendingsComment",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "PUT",
            "path": "/mastercontrol/updateStatusStamp/:IdStamp",
            "handler": "mastercontrol.updateStatusStamp",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "POST",
            "path": "/mastercontrol/webhooksreferencia/",
            "handler": "mastercontrol.webhooksreferencia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "POST",
            "path": "/mastercontrol/webhooksMedia/",
            "handler": "mastercontrol.webhooksMedia",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "POST",
            "path": "/mastercontrol/webhooksMediaV6/",
            "handler": "mastercontrol.webhooksMediaV6",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "POST",
            "path": "/mastercontrol/doUpdateSize/",
            "handler": "mastercontrol.doUpdateSize",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/getGenderReference/:Nreferencia",
            "handler": "mastercontrol.getGenderReference",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/getProducReference/:Nreferencia",
            "handler": "mastercontrol.getProducReference",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/getGroupSize/:Nreferencia",
            "handler": "mastercontrol.getGroupSize",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
          {
            "method": "GET",
            "path": "/mastercontrol/getNextSequence/:Nreferencia",
            "handler": "mastercontrol.getNextSequence",
            "config": {
              "policies": ['api::master.my-policy']
            }
          },
    ]
  }