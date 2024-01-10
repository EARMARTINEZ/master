
import {useEffect, useState} from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import {getStrapiURL} from "utils/api";
import { ReloadOutlined  } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { linstance } from "utils/axioapi";


const ButtonRecharge = ({}) => {   
    
    const {          
        IdCollection,
        dogetCollectionReference
       } = useTasks(); 

       const { 
        
        setReferenceMapStatus    
         } = BasicTasks(); 


       
       const [loadings, setLoadings] = useState([]);
       const enterLoading = (index) => {
         setLoadings((prevLoadings) => {
           const newLoadings = [...prevLoadings];
           newLoadings[index] = true;
           return newLoadings;
         });
         setTimeout(() => {
           setLoadings((prevLoadings) => {
             const newLoadings = [...prevLoadings];
             newLoadings[index] = false;
             return newLoadings;
           });
         }, 6000);
       };
   
  return (  
    
    <>      
   
        
   <div className="grid grid-cols-2 gap-1 m-1">                        
        <div className="col-span-6 sm:col-span-">         
       
      <Space direction="vertical">    

          <Space wrap>    

          <Button 
          onClick={() => {                             
            IdCollection ? dogetCollectionReference(IdCollection, 300) : dogetCollectionReference('29', 300); 
            enterLoading(2);
            setReferenceMapStatus(true);
            }} 
            loading={loadings[2]}
          icon={<ReloadOutlined />}></Button> 

          </Space>
      </Space>  
  
                  
      </div>             
  </div>        
      
    

            
    </>
   
  )
}

export default ButtonRecharge