import  'flowbite'
import  React, {useEffect, useState } from "react";
import { BasicTasks } from "utils/Provider/BasicProvider"; 
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api"; 
import { Drawer, Button } from 'antd';
import {FormReferenceEdit} from '@/components/Cards/CardForm/FormEdit/FormReferenceEdit'


 

export function FormEditDrawer() { 
    const { 
        Referencia,
        onCloseFormDrawerEdit,        
        openFormDrawerEdit,
        doshowFormDrawerEdit,
        setIdCollection,
        IdCollection,
        IdPrefixCollection,
        dogetSystemColor,
        doSystemColorValue,
        doLoadSizeEdit,             
       } = useTasks();   
       const { 
            dofindGender,
            dofindProducts,
            dofindProviders,
            dofindFabrics,
            dofindThemes,
            dofindColorPantone,
            dofindStamps,
            setStartSequence, 
            setSizesSelecMap,        
            onformReset,} = BasicTasks();         
     

    
  
    return (
    <>
  
       
        <div className="block w-full overflow-x-auto my-0">
            <Button 
                type="primary" 
                onClick={() => { 
                    onformReset();
                    doshowFormDrawerEdit(),
                    doLoadSizeEdit();
                    dofindGender(),
                    dofindProducts(),
                    dofindProviders(),
                    dofindFabrics(),
                    dofindThemes(IdCollection), 
                    dofindColorPantone(IdCollection), 
                    dofindStamps(IdPrefixCollection),
                    //dogetSystemColor();  
                    doSystemColorValue();        
                    
                    setStartSequence([]); 
                    setIdCollection(IdCollection);              
                }} 
                    
                    
                className="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                
            >Edit Reference
                        
            </Button>     
                
                <Drawer 
                    title="Close" 
                    placement="right" 
                    onClose={() => {                       
                       onCloseFormDrawerEdit();
                       onformReset();                       
                       setSizesSelecMap();
                       
                    }} 
                    open={openFormDrawerEdit} 
                    size={'large'} 
                    width={1600}
                    className="bg-gray-900"    
                    > 

                    <FormReferenceEdit   />
                
                </Drawer>
            </div>
          
        
    
    </>
  
  )
    }