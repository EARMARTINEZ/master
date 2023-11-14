import  'flowbite'
import {useEffect, useState} from "react"; 
import { useTasks } from "utils/ProviderContext";
import {getStrapiURL} from "utils/api";
import { DownloadOutlined  } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { linstance } from "utils/axioapi";


const ButtonExport = ({}) => {   
    
    const {          
          IdPrefixCollection,
          FiltersReferenceMap
       } = useTasks();     
    
    const [loadings, setLoadings] = useState([]);
    const [disabled, setdisabled] = useState(true);

    const data = FiltersReferenceMap; 

    useEffect(() => {
      data.length>1 ? setdisabled(false) : setdisabled(true);
  }, [data]);
    
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
              type="link"
              icon={<DownloadOutlined  />}
              loading={loadings[1]}
              disabled={disabled}
              className="rounded bg-sky-100 py-0 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
              href={ `/api/auth/getAPI?value=${IdPrefixCollection}` }
              onClick={ () => {
                  enterLoading(1);
                 
                  }}
              >
            Export to Excel
              </Button>
          </Space>
      </Space>  
  
                  
      </div>             
  </div>        
      
    

            
    </>
   
  )
}

export default ButtonExport