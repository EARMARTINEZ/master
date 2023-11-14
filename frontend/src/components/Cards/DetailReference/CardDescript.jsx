import  'flowbite'
import React,{ useState} from "react";
import { Card, Space, Row   } from 'antd';
import { useTasks } from "utils/ProviderContext";

const  CardDescript = () => {   
    const {        
          Description,         
       } = useTasks(); 

  return (  
    
    <>   
        
   <div className="grid grid-cols-1 gap-1 m-0"> 
     <div className="col-span-6 sm:col-span-1 p-5 ">        
        
        <Row gutter={16}>
          <Space direction="vertical" bordered={false} size={16}>
            <Card
                title="Description"
                bordered={false}
                style={{                   
                    color: '#1a2656',               
                    fontSize: '16px',
                }}
            >
            <p>{Description}</p>
        
            </Card>
          </Space>
        </Row>    
                    
      </div>       
   </div>          
           

    </>
   
  )
}

export default CardDescript