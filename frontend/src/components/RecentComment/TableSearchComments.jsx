import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect, useCallback, useState } from "react"; 
import {getStrapiURL} from "utils/api";
import { Card  } from 'antd';

import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { Drawer } from 'antd';
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import RecentComments from '@/components/RecentComment/RecentComments'
import RecentStampComments from '@/components/RecentComment/RecentStampComments'
import useFetchCollection from '@/components/Cards/useFetchCollection'


export default function TableSearchComments() {  
    
    const { data: session } = useSession();
    
    const {
        IdCollection, 
        ReferenceMap,
        NameCollection,        
        dogetCollectionReference, 
        dofetchIDCollection,
        dogetSystemColor,       
        onClose,
        open,
        StampsOpen, 
        onCloseStamps, 
        fetchData,
        setLoading,          
       } = useTasks();  
          
       const { 
        dofindGender,     
       } = BasicTasks();        

       const [controlFetchData, setControlfetchData] = useState(true);

       const dofetchData = useCallback(async () => {
        
        try {            
                const Start= 1;  
                const PageSize= 50;  
                const Filters =`sort: "updatedAt:desc", 
                             filters: { 
                             collection: { id: { eq: $NCollection } }                         
                             }`                
                setLoading(true)
                fetchData(Start, PageSize,Filters);
                setControlfetchData(false);                
           
          
        } catch (error) {
          console.error('Error al obtener datos de la colección:', error);
        }
      }, []);
      
          
    //   useEffect(() => {            
    //         IdCollection ? dogetCollectionReference(IdCollection) : dogetCollectionReference('31');          
    //   }, [IdCollection]); 
      
    //   useFetchCollection(IdCollection);

      useEffect(() => {
        if (controlFetchData){ 
            dofetchData();
        }
    }, [ReferenceMap, controlFetchData]);
  
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
              onClose={() => {onClose(true), dofetchData()} } 
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