import React from "react";
import { useForm } from "react-hook-form";  
import { useTasks } from "utils/user";
import NotificationBanner from "./notification-dash";
import ModalTrack from "components/Modal/trackModal";
import ModalLoading from "components/Modal/loadingModal";


// components
const FormTrack = ({ data })  => { 
  
    const { 
      doPagos,  
      DNINumber,
      setDNINumber,
      REFNumber, 
      setREFNumber,     
      verifydoc,
      bannerIsShown,
      setBannerIsShown,
      isSubmitting,
     
     } = useTasks();

    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm();
   
    
    const notificationBanner = {type: 'info', text: 'Solicitud enviada'};


 const onSubmit = async (values, e) => { 
  e.preventDefault()

  const ret = doPagos(values);
  
  e.target.reset();    
    
  }; 


  

  return (
    <>
      {/*  */}

      <div className="col-span-6 sm:col-span-3 ">
                    <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                          <div className="shadow overflow-hidden sm:rounded-md ">
                          <div className="px-4 py-5 bg-white sm:p-10">
                          <div className="grid grid-cols-6 gap-6 ">
                              {/*  */}
                                            

                             
                                <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numero de Referencia</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">   
               
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">REF</span>               
                                      <input                                    
                                         type="text" 
                                         name="TransactionId"
                                          id="TransactionId" 
                                          placeholder={REFNumber}
                                                                  
                                       
                                        
                                        
                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                          {...register("TransactionId", {
                                            required: true, 
                                            pattern:/^[0-9+-.]+$/,
                                             minLength: 1, 
                                             maxLength:20,
                                             validate: value => value >=1,
                                             value: REFNumber ? REFNumber : setREFNumber(0)                                             
                                            })}                                                 
                                          />
                                  </div>   
                                </div>


                                <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numero de Cedula</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">   
               
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">C.I.</span>               
                                      <input                                    
                                          type="text" 
                                          name="IdNumber" 
                                          id="IdNumber" 
                                          placeholder={DNINumber}
                                                                       
                                       
                                          
                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                          {...register("IdNumber", {
                                            required: true, 
                                            pattern:/^[0-9+-]+$/,
                                             minLength: 1, 
                                             maxLength: 9,
                                             validate: value => value >=1,
                                             value: DNINumber ? DNINumber : setDNINumber(0) 
                                            })}                                 
                                          />
                                  </div>   
                                </div>  

                                  
                                 
                              {/*  */}  
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              
                        {verifydoc && (
                       <>     
                          <button  type="submit"                            
                              className="px-6 py-1 block w-full  lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md bg-blue-500 text-white border-blue-600  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300"
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
                              {isSubmitting && "Tracking..."}
                            {!isSubmitting && "Buscar "}
                            </button>  
                            </>
                        )}
                        {!verifydoc && (         
                            <>
                              <button type="submit" 
                              className="px-6 py-1 block w-full  lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md bg-gray-500 text-white"
                              disabled="true"                              
                              >
                              {!verifydoc && "Verificar Pago"}
                           
                              </button>      
                              
                            </>
                          )}                                     
                             
                        </div>
                    </form>
                </div>
                        <ModalLoading />
                        <ModalTrack data={data}/>

                        {notificationBanner && bannerIsShown && (
                          <NotificationBanner
                            data={notificationBanner}
                            closeSelf={() => setBannerIsShown(false)}
                          />
                      )}          


    </>
  );


}


export const PureChild  = React.memo(FormTrack);