'use strict';
/**
 * master router
 */
module.exports = {
    routes: [

          {
            "method": "POST",
            "path": "/stampcontrol/webhooksStamp/",
            "handler": "stampcontrol.webhooksStamp",
            
          },
         
    ]
  }