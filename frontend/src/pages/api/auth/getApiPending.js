import stream from 'stream';
import { promisify } from 'util';
import { getStrapiURL, fetchAPI } from "utils/api";


const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {   

    //console.log(req.query);
  try {
  
            if(req.query){
              const pageData = await fetchAPI(`/mastercontrol/PendingsTriggerXLSX/${req.query.value}`, {   
                  }).then( async resp => {
                    //console.log(resp);
                    if(resp){

                    const url = getStrapiURL(`/uploads/RecentPendings${resp[0].Identifier.substring(0, 3)}.xlsx` );
                
                   
                        const response = await fetch(url); // replace this with your API call & options
                        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
                      
                        res.setHeader('Content-Type', 'application/xlsx');
                        res.setHeader('Content-Disposition', `attachment; filename=RecentPendings${resp[0].collection}.xlsx` );
                        await pipeline(response.body, res);
                    }

                }); 
             }   
  

  } catch (error) {
     
  }
 
};

export default handler;