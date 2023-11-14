import React, { useState } from "react";
import { useContext } from "react"; 
import { UserContext } from "utils/user";
import { useForm } from "react-hook-form";  

const vModal =({ data }) => {
  
  const { setShowModalv, showModalv } = useContext(UserContext);

  const { doOrden ,
    doCompraAcciones, 
    user, 
    email, 
    codsimb, 
    descsimb, 
    precio,
    accionesVentas,
    VentaMontoVes,
    defauldescsimb, 
    defaulcodsimb,
    operationtype,     
    defaulprecio, verifydoc} = useContext(UserContext);

    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const onSubmit = async (values) => {
      setIsSubmitting(true);
      console.log("values",values)
  
      const ret = await doOrden(values);
  
      if (ret[0] === "alert") {
        setAlert(ret);
      } else {
       /*  setAlert(ret); */      
       setBannerIsShown(true);
       window.setTimeout(()=>{setBannerIsShown(false)},2000);         
        reset();
      }
      setIsSubmitting(false);
      // limpiar campos
 
    };
  
  return (
    <>
     
      {showModalv ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
              {/* Modal header */}
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Ejecutar Orden de {operationtype} 
                  </h3>
                  <button onClick={() => setShowModalv(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
               {/* Modal body */}
                  <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-pink-500 dark:text-pink-400">
                      Esta Orden se procesa bajo los términos y condiciones de KOI, el usuario acepta el procesamiento de datos y Monedas dentro de este contrato.
                      Los pedidos con éxito se actualizan en el historial de ordenes.
                    </p>
                  
                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Monto de Inversión Bs</dt>
                        <dd className="text-lg font-semibold">{VentaMontoVes}</dd>
                      </div>
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Comisión</dt>
                        <dd className="text-lg font-semibold">0.50%</dd>
                      </div>
                      <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Cantidad de Acciones a Obtener</dt>
                        <dd className="text-lg font-semibold">{accionesVentas}</dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Acciones de Empresa {codsimb ? codsimb : defaulcodsimb }</dt>
                        <dd className="text-lg font-semibold">{descsimb ? descsimb : defauldescsimb } </dd>
                      </div>
                      <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Precio</dt>
                        <dd className="text-lg font-semibold">{precio ? precio : defaulprecio }</dd>
                      </div>
                      
                    </dl>
                  </div> 

                {/* Formulario */}
                  <div className="col-span-6 sm:col-span-3">
                     <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                          <div className="">
                          <div className="">
                          <div className="">
                              {/*  */}

                             

                                 {/* Tipo de Orden */}                    
                                  <input                                    
                                    type="hidden" 
                                    name="ordertype" 
                                    value="mercado"
                                    id="ordertype"                                   
                                    {...register("ordertype", {
                                        required: false, 
                                      })}                                 
                                    />                                   

                                  <div className="col-span-6 sm:col-span-8">                                 
                                    <div className="mt-1 flex rounded-md shadow-sm"> 
                                    {/* Monto */}                                     
                                      <input                                    
                                          type="hidden" 
                                          name="amount" 
                                          id="amount"                                                                        
                                          value={VentaMontoVes}
                                          {...register("amount", {
                                            required: true, 
                                            pattern:/^[0-9+-]+$/,
                                             minLength: 1, 
                                             maxLength: 10,
                                             validate: value => value >=1                                         
                                            })}                                 
                                          />
                                  </div>   
                                </div>                                 
                                 
                                  <div className="col-span-6 sm:col-span-8">                                 
                                    <div className="mt-1 flex rounded-md shadow-sm">               
                                     {/* Acciones */}
                                      <input                                    
                                          type="hidden" 
                                          name="Quantity" 
                                          id="Quantity"                                            
                                          value={accionesVentas}                                         
                                          {...register("Quantity", {
                                              required: "Please choose a empresa",
                                            })}                                 
                                          />
                                  </div>   
                                </div>    

                                
                                <input                                    
                                    type="hidden" 
                                    name="operationtype" 
                                    value={operationtype} 
                                    id="operationtype"                                   
                                    {...register("operationtype", {
                                        required: false, 
                                      })}                                 
                                    />   
                                <input                                    
                                    type="hidden" 
                                    name="markettype" 
                                    value="Acciones"
                                    id="markettype"                                   
                                    {...register("markettype", {
                                        required: false, 
                                      })}                                 
                                    />      
                                  <input                                    
                                      type="hidden" 
                                      name="cod_simb" 
                                      id="cod_simb"
                                      value={codsimb ? codsimb : defaulcodsimb }                                     
                                      {...register("cod_simb", {
                                        required: false, 
                                        })}                                 
                                      />      
                                  <input                                    
                                      type="hidden" 
                                      name="empresa" 
                                      id="empresa"
                                      value={descsimb ? descsimb : defauldescsimb }                                    
                                      {...register("empresa", {
                                        required: false, 
                                        })}                                 
                                      />
                                  <input                                    
                                      type="hidden" 
                                      name="price" 
                                      id="price"
                                      value={precio ? precio : defaulprecio }                                      
                                      {...register("price", {
                                        required: true,
                                        })}                                 
                                      />
                                    {/*   {errors.price && <p>{errors.price.message}</p>}      */}     
                                  <input
                                      type="hidden"
                                      value={user}                                    
                                      {...register("username", {
                                        required: false, 
                                        })}                                 
                                      />
                                  <input
                                      type="hidden"
                                      value={email}                                     
                                      {...register("email", {
                                        required: true, 
                                        })}                                 
                                      />
                                  <input
                                      type="hidden"
                                      value="koi"                                     
                                      {...register("agent", {
                                        required: false, 
                                        })}                                 
                                      />
                                  <input
                                      type="hidden"
                                      value="VEF"                                     
                                      {...register("CurrencyCode", {
                                        required: false, 
                                        })}                                 
                                      /> 
                                  <input                                    
                                      type="hidden" 
                                      name="phone" 
                                      id="phone"  
                                      placeholder="123-45-678"                                     
                                      {...register("phone", {
                                          required: false, 
                                          minLength: 6,
                                          maxLength: 12
                                        })}                                 
                                      />               
                              {/*  */}  
                            </div>
                          </div>
                        </div>                   

                      

                       
                    </form>        
                </div>    
                
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModalv(false)}
                      >
                        Cacelar
                      </button>

                      <button
                        className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
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
                        {isSubmitting && "Registering..."}
                      {!isSubmitting && " Acepto"}                      
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

export default vModal;