import React from "react";
import Link from "next/link"
import {useState, useContext } from "react"; 
import { useForm } from "react-hook-form";  
import { UserContext } from "utils/user";
import NotificationBanner from "./notification-dash";
import Modal from "components/Modal/Modal";
// components
const FormCompraAcciones = ({ data }) => {

    const { setShowModal } = useContext(UserContext);  

    const { doOrden ,
      doCompraAcciones, 
      user, 
      email, 
      codsimb, 
      descsimb, 
      precio, 
      acciones,
      setacciones,
      MontoVes, 
      setMontoVes,
      defauldescsimb, 
      defaulcodsimb,     
      defaulprecio,
      setoperationtype,      
      verifydoc } = useContext(UserContext);

    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
       } = useForm();
   
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(["", ""]);

    const notificationBanner = {type: 'info', text: 'Solicitud enviada'}
    const [bannerIsShown, setBannerIsShown] = useState(false);    

    
  
    const onSubmit = async (values, e) => {
        setIsSubmitting(true);
    console.log("values",values)
    
        const ret = await doOrden(values);
    
        if (ret[0] === "alert") {
          setAlert(ret);
        } else {
         /*  setAlert(ret); */
         setShowModal(false);
         setBannerIsShown(true);
         window.setTimeout(()=>{setBannerIsShown(false)},3000);         
          
        }
        setMontoVes(0) 
        setacciones(0)  
        e.target.reset();
        setIsSubmitting(false);
        // limpiar campos
   
      };
     
  return (
    <>
    
      {/* COMPRA DE ACCIONES */}

      <div className="col-span-6 sm:col-span-3">
                     <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                          <div className="shadow overflow-hidden sm:rounded-md ">
                          <div className="px-4 py-5 bg-white sm:p-10">
                          <div className="grid grid-cols-6 gap-6 ">
                              {/*  */}

                             

                                  <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Tipo de Orden</label>
                                  <select id="ordertype" name="ordertype" autoComplete="country-name" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                  {...register("ordertype", { required: true })}>
                                      <option>mercado</option>
                                                        
                                  </select>
                                  </div>                             
                                  
                                 
                                  <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cant-Acciones</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">   
               
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">{codsimb ? codsimb : defaulcodsimb }</span>               
                                      <input                                    
                                          type="text" 
                                          name="Quantity" 
                                          id="Quantity" 
                                          placeholder={acciones}                                         
                                                                             
                                          onKeyUp={event => doCompraAcciones(2,precio ? precio : defaulprecio , event.target.value)}   
                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                          {...register("Quantity", {
                                            required: true, 
                                            pattern:/^[0-9+-]+$/,
                                             minLength: 1, 
                                             maxLength: 10,
                                             validate: value => value >=1,
                                             value: acciones ? acciones : setacciones(0) 
                                            })}                                 
                                          />
                                  </div>   
                                </div>

                                <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Precio</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">   
               
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> VES</span>               
                                      <input                                    
                                          type="text" name="" id="" placeholder= {precio ? precio : defaulprecio }   
                                          disabled="true"                       
                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                                  
                                          />
                                  </div>   
                                </div>

                                  <div className="col-span-6 sm:col-span-8">
                                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Total</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">   
               
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> VES</span>               
                                      <input                                    
                                          type="text" name="amount" id="amount" placeholder= {MontoVes}
                                           onKeyUp={event => doCompraAcciones(1, precio ? precio : defaulprecio , event.target.value)} 
                                           disabled="true"
                                           value={ MontoVes ? MontoVes : setMontoVes(0)}                                              
                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                          {...register("amount", {
                                            required: true, 
                                            pattern:/^[0-9+-]+$/,
                                             minLength: 1, 
                                             maxLength: 10,
                                             validate: value => value >=1,
                                             value: MontoVes ? MontoVes : setMontoVes(0)                                            
                                            })}                                 
                                          />
                                  </div>   
                                </div>
                                 
                                 
                              
           

                                
                                <input                                    
                                    type="hidden" 
                                    name="operationtype" 
                                    value="compra"
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

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">                     

                        {verifydoc && (
                       <>
                        <button type="button" 
                              className="px-6 py-1 block w-full  lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md bg-green-500 text-white border-green-600  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300"
                              disabled={isSubmitting}
                              onClick={() => {  
                                setShowModal(true); 
                                setoperationtype('compra');                                                                                
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
                            {!isSubmitting && "Comprar Acciones"}
                              </button>                             
                      </>
                        )}
                        {!verifydoc && (         
                            <>
                              <button type="submit" 
                              className="px-6 py-1 block w-full  lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md bg-gray-500 text-white"
                              disabled="true"                              
                              >
                              {!verifydoc && "Verificar Cuenta"}
                           
                              </button>      
                              
                            </>
                          )}        
                        </div>

                      

                        <Modal />

                        {notificationBanner && bannerIsShown && (
                          <NotificationBanner
                            data={notificationBanner}
                            closeSelf={() => setBannerIsShown(false)}
                          />
                        )}                  
                   
                    {alert[1]}
                    </form>        
                </div>


    </>
  );
}

export default FormCompraAcciones