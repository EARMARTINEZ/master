import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect } from "react"; 
import {getStrapiURL} from "utils/api";
import { Card  } from 'antd';

import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { Drawer } from 'antd';
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import RecentComments from '@/components/RecentComment/RecentComments'
import RecentStampComments from '@/components/RecentComment/RecentStampComments'



export default function TableSearchComments() {  
    
    const { data: session } = useSession();
    
    const {
        IdCollection, 
        NameCollection,        
        dogetCollectionReference, 
        dofetchIDCollection,
        dogetSystemColor,       
        onClose,
        open,
        StampsOpen, 
        onCloseStamps,           
       } = useTasks();  
          
       const { 
        dofindGender,     
       } = BasicTasks();        
      
          
      useEffect(() => {            
            IdCollection ? dogetCollectionReference(IdCollection) : dogetCollectionReference('31');          
      }, [IdCollection]); 
      
     
       
  
    return (
    <>
       {/* Tabla COLLECTION REFERENCE  */}   
     
     
        <div className="grid grid-cols-1 gap-1 m-0">                
                <div className="col-span-6 sm:col-span-1"> 

                <header className="mb-9 space-y-1">
                    <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white"> {NameCollection}/Recent Comments </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                </header> 

                </div>           
          </div>          
        
    
          <RecentComments /> 

            <div className="grid grid-cols-1 gap-1 m-0">                
                <div className="col-span-6 sm:col-span-1"> 

                <header className="mb-9 space-y-1">
                    <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white">Stamp Comments </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                </header> 

                </div>           
          </div>          

          <RecentStampComments />   
           
          <Drawer 
              title="Close" 
              placement="right" 
              onClose={() => onClose( ) } 
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
                onClose={() => onCloseStamps( ) } 
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