import  React, {useEffect, useState } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api"; 
import { Button, Form, Card, Space, Row, Modal   } from 'antd';
import {  ExclamationCircleFilled } from '@ant-design/icons'
import LoadingModal from '@/components/Modal/loadingModal';

import {  FormItemTheme, 
          FormItemStatus, 
          FormItemProduct, 
          FormItemProvider, 
          FormItemGender,
          FormItemSizeEdit,
          FormItemFabric,
          FormItemColor,
          FormItemStamp,
          FormItemSystemColor, 
          FormItemDescription,
          FormItemSimilarRefs, } from '@/components/Cards/CardForm/FormEdit/FormItem/FormItemEdit'
import { BasicTasks } from "utils/Provider/BasicProvider";


export function FormReferenceEdit() {   
    
  const {
    IdPrefixCollection,       
    Referencia,
    doUpdateReference,
    setShowModalLoading,  
    IdCollection,
    ReferenceMap,  
     } = useTasks(); 
           
    const { 
      StartSequence,
      formRef,
      onformReset,
      setSizesSelecMap,       
      } = BasicTasks(); 
      
    let ValueStatus;

     ReferenceMap?.map((Status, index) => {      
     ValueStatus = Status.attributes ? Status.attributes.status : 'null'
   
  });  
            
      const [form] = Form.useForm();

      const onReset = () => {
        form.resetFields();
      };

      useEffect(() => {      
        onReset()       
        form.setFieldsValue({status: ValueStatus});      
     }, [Referencia]);
     
     useEffect(() => {      
       onReset()       
       form.setFieldsValue({ status: ValueStatus });      
    }, [ValueStatus]);      

      const { confirm } = Modal;

    const onFinish = (values) => {
      confirm({        
        title: 'Do you want to save these items?',
        icon: <ExclamationCircleFilled />,
        content: '',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {    
        
            console.log('OK-Edit', values);
            setShowModalLoading(true);
            doUpdateReference(values, IdCollection);
            onformReset();
            setSizesSelecMap();       
        
         
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
 
     
    return (
    <>
      
       
          <Card
              title="Edit Product Details"
              bordered={false}
              style={{                   
                  color: '#1a2656',               
                  fontSize: '16px',
              }}
          >


              <Form
                form={form}
                ref={formRef}
                name="form_Edit_Reference"
                onFinish={onFinish}              
                autoComplete="off"
                size={'default'}
               
              >
                 {/*  */}
                 <div className="grid grid-cols-3 gap-1 m-1"> 
                       
                        <div className="col-span-6 sm:col-span-1  ">                                          
                        <label 
                            className=" text-blue-700 active:bg-white text-xl font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            >Ref : {IdPrefixCollection}
                        </label >
                        <label 
                            className=" text-red-700 active:bg-white text-xl font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            >{StartSequence!='' ? StartSequence : Referencia.substring(3, 7)}
                          </label >  
                              
                        </div>
                  </div> 


                {/*  */}
                <div className="grid grid-cols-5 gap-1"> 

                      <div className="col-span-6 sm:col-span-1  "> 
                      <FormItemGender  />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-1  ">  
                      <FormItemProduct  />
                      </div>

                      <div className="col-span-6 sm:col-span-1  "> 
                        <FormItemProvider  />
                      </div>    

                      <div className="col-span-6 sm:col-span-1 ">  
                      <FormItemTheme  />
                      </div>                                       

                      <div className="col-span-6 sm:col-span-1  "> 
                      <FormItemStatus  />
                      </div>           

                  </div> 

             
                  
                {/*  */}
                <div className="grid grid-cols-1 gap-1 m-0 px-3">
                      <div className="col-span-6 sm:col-span-1  "> 
                      <FormItemSizeEdit  />
                      </div> 

                </div>

                 {/*  */}
                <div className="grid grid-cols-3 gap-1"> 
                      <div className="col-span-6 sm:col-span-1  "> 
                        <FormItemFabric  />
                        </div> 

                        <div className="col-span-6 sm:col-span-1 ">  
                        <FormItemColor  />
                        </div> 

                        <div className="col-span-6 sm:col-span-1  ">  
                        <FormItemStamp  />
                        </div> 

                  </div>

                 {/*  */}
                <div className="grid grid-cols-1 gap-1 m-0">
                      <div className="col-span-6 sm:col-span-1  "> 
                      <FormItemSystemColor  />
                      </div> 

                </div>
                 {/*  */}
                 <div className="grid grid-cols-1 gap-1 m-0">
                      <div className="col-span-6 sm:col-span-1  ">   
                      <FormItemDescription  />                 
                      
                    </div> 
                </div> 
                 {/*  */}
                 <div className="grid grid-cols-2 gap-1 m-0">
                      <div className="col-span-6 sm:col-span-1  ">   
                      <FormItemSimilarRefs  />                 
                      
                    </div> 
                </div>             

                  
                    <Form.Item>
                    <Card>
                      
                      <Button  htmlType="submit">Update</Button>
                      
                      </Card>
                  </Form.Item>
                  
                  
              </Form>        
      
          </Card>
      
       


          <LoadingModal />      
          
      
                  
    

    
    </>
  
  )
    }