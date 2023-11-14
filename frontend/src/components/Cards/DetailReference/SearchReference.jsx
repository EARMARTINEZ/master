import { useSession } from 'next-auth/react';

import  'flowbite'
import { useEffect, useState } from 'react'
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useForm } from "react-hook-form"; 
import LoadingModal from '@/components/Modal/loadingModal';




const SearchReference = ({data}) => {
    
    const { 
        dofetchReference,
        isSubmitting,
        setShowModalLoading,          
       } = useTasks();

       const { 
        checkUser,      
       } = BasicTasks(); 

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm(); 
  
    const onSubmit = async (values, e) => { 
        e.preventDefault();        
        setShowModalLoading(true);  
        const NumerReference = values.NumerReference;
        dofetchReference(NumerReference ? NumerReference : '1240001');          
        e.target.reset();      
      };    

      

  return (  
    
    <>
        <div className="">  

              <form  
                  onSubmit={handleSubmit(onSubmit)}
                  >   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                  </div>
                  
                  <input                                    
                      type="text" 
                      name="NumerReference"
                      id="NumerReference" 
                      placeholder='Reference'   
                  
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("NumerReference", {
                      required: true, 
                      pattern:/^[0-9+-.]+$/,
                          minLength: 1, 
                          maxLength:7,
                          validate: value => value >=1,
                                                          
                      })}                                                 
                      />
                  
                  <button  type="submit"
                        className="bg-blue-700 text-white absolute right-1.5 bottom-1.5 active:bg-blue-400 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"                            
                        
                      
                        disabled={isSubmitting}
                        onClick={() => {
                        
                          reset({
                            
                          }, {
                            keepErrors: true, 
                            keepDirty: true,
                            keepIsSubmitted: false,
                            keepTouched: false,
                            keepIsValid: false,
                            keepSubmitCount: false,
                          });
                        }}
                      
                        >
                        {isSubmitting && "Search..."}
                      {!isSubmitting && "Search "}
                      </button>  

                      
                  
                  </div>
              </form>                    
        </div>        
  
            
      <LoadingModal />

            
    </>
   
  )
}

export default SearchReference