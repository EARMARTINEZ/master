import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect ,useState  } from "react"; 
import {getStrapiURL} from "utils/api";
import { Card  } from 'antd';

import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { Drawer } from 'antd';
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import FiltersTableStamps from '@/components/DetailStamp/FiltersTableStamps'
import useFetchCollection from '@/components/Cards/useFetchCollection'


export default function TableSearchStamp() {  
    
    const { data: session } = useSession();
    
    const {
        IdCollection, 
        NameCollection,             
        onClose,
        open,
        StampsOpen, 
        onCloseStamps,
        fetchData,
        dofindStamps, 
        MetaReferenceMap,
        dogetCollectionReference           
       } = useTasks();  
          
      
      const [controlFetchData, setControlfetchData] = useState(true);    

  useEffect(() => {
     if (controlFetchData){ 
        const Start= 1;  
        const PageSize= 10;  
        const Filters =`sort: "referencia:asc", 
                        filters: { 
                        collection: { id: { eq: $NCollection } },
                        stamp:{id: { ne: null }} 
                        }`        
        
        fetchData(Start, PageSize, Filters);
        dofindStamps();             
        setControlfetchData(false);
    }
    
  }, [IdCollection, fetchData, controlFetchData]);
      
     
       
  
    return (
    <>
       {/* Tabla COLLECTION REFERENCE  */}   
     
     
        <div className="grid grid-cols-1 gap-1 m-0">                
                <div className="col-span-6 sm:col-span-1"> 

                <header className="mb-9 space-y-1">
                    <h1 className="font-display text-xl tracking-tight text-slate-900 dark:text-white"> {NameCollection}/Stamps </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                </header> 

                </div>           
          </div>          
        
    
          <FiltersTableStamps />  
           
          <Drawer 
              title="Close" 
              placement="right" 
              onClose={() => onClose(true) } 
              open={open} 
              size={'large'} 
              width={2000}
              className="bg-gray-900"    
              > 
              <CardReference  />          
          </Drawer> 

            <Drawer 
                title="Close" 
                placement="right" 
                onClose={() => onCloseStamps( true) } 
                open={StampsOpen} 
                size={'large'} 
                width={2000}
                className="bg-gray-900"    
                > 
                <CardStamp  />            
            </Drawer>              
      
    
    </>
  
  )
    }   