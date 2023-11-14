import React from "react";
import { useTasks } from "utils/user";
import { useForm } from "react-hook-form";  
import NextImage from "../elements/image"

const TrackModal =({ data }) => {
  
  const {    
    DNINumber,
    setDNINumber,
    REFNumber, 
    setREFNumber,
    operationtype,
    firstName,
    StatusPaid,
    setShowModalv,
    showModalv } = useTasks();   

    const {     
      reset,
      formState: { errors },
    } = useForm();

   
  
  return (
    <>
     
      {showModalv ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
              {/* Modal header */}
                <div className="flex justify-between items-start p-2 rounded-t border-b dark:border-gray-600">
                
             
                  
                  <button onClick={() => setShowModalv(false)} type="button" className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
               {/* Modal body */}
                  <div className="p-6 space-y-6">                 
                    
                    <p className="text-base leading-relaxed text-blue-800 dark:text-blue-800">
                      Esta Orden fue procesada bajo los términos y condiciones de Moneygram.
                    </p>
                  
                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-4 text-gray-500 md:text-lg dark:text-gray-400"> Tansacción ID: {operationtype}</dt>
                        <dd className="text-lg font-semibold"></dd>
                      </div>
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Numero de Referencia</dt>
                        <dd className="text-lg font-semibold">{REFNumber}</dd>
                      </div>
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Recibe</dt>
                        <dd className="text-lg font-semibold">{firstName}</dd>
                      </div>
                      <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Cedula de Identidad</dt>
                        <dd className="text-lg font-semibold">{DNINumber}</dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Estatus</dt>
                        <dd className="text-lg font-semibold">{StatusPaid} </dd>
                      </div>
                     
                      
                    </dl>
                  </div> 

                {/* Formulario */}
              
                
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          setShowModalv(false);  
                          setDNINumber(0); 
                          setREFNumber(0);
                         
                        }}
                        
                      >
                        Cerrar
                      </button>

                     

                    </div>
              </div>
            </div>
          </div>
          
        </>
      ) : null}
    </>
  );
};

export default TrackModal;