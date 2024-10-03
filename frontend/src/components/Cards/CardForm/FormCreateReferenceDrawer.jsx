import  'flowbite'
import  React, {useEffect, useState } from "react";
import { BasicTasks } from "utils/Provider/BasicProvider"; 
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api"; 
import { Drawer, Button } from 'antd';
import {FormReference} from '@/components/Cards/CardForm/FormReference'


 

export function FormCreateReferenceDrawer() { 
    
    const { 
        dofindGender,
        dofindProducts,
        dofindProviders,
        dofindFabrics,
        dofindThemes,
        dofindColorPantone,
        dofindStamps,
        dogetSystemColor,
        setStartSequence, 
        setSizesSelecMap,
        onformReset, 
       
       
       } = BasicTasks(); 
    
    const { 
        onCloseFormDrawer,        
        openFormDrawer,
        doshowFormDrawer,
        setIdCollection,
        IdCollection,
        IdPrefixCollection     
       } = useTasks();      
          
     

   
  
    return (
    <>
  
 
   
       
        <div className="block w-full overflow-x-auto my-0">
            <Button 
                type="link" 
                onClick={() => {  
                    onformReset();              
                    doshowFormDrawer(),
                    dofindGender(),
                    dofindProducts(),
                    dofindProviders(),
                    dofindFabrics(),
                    dofindThemes(IdCollection), 
                    dofindColorPantone(IdCollection), 
                    // dofindStamps(IdPrefixCollection),
                    //dogetSystemColor();
                    setStartSequence([]);                               
                }} 
                    
                    
                className="m-2 text-sm  text-blue-700  bg-white" 
                
            >Create Reference
                        
            </Button>     
                
                <Drawer 
                    title="Close" 
                    placement="right" 
                    onClose={() => {
                       onCloseFormDrawer();
                       onformReset();                      
                       setSizesSelecMap();
                       
                    }} 
                    open={openFormDrawer} 
                    size={'large'} 
                    width={1600}
                    className="bg-gray-900"    
                    > 

                    <FormReference   />
                
                </Drawer>
            </div>
          
      
    
    </>
  
  )
    }