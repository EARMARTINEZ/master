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
          FormItemSize,
          FormItemFabric,
          FormItemColor,
          FormItemStamp,
          FormItemSystemColor, 
          FormItemDescription,
          FormItemSimilarRefs,
          FormItemRefenceSequence, } from '@/components/Cards/CardForm/FormItem/FormItem'
import { BasicTasks } from "utils/Provider/BasicProvider";


export function FormReference() {   
    
  const { 
      IdPrefixCollection, 
      doSaveReference,
      setShowModalLoading,
      IdCollection,
      ItemGenderName, 
      ItemProductName    
     } = useTasks();    
     const { 
        StartSequence,
        formRef,
        onformReset,
        setSizesSelecMap,      
      } = BasicTasks(); 
         
      
       
      
      const [form] = Form.useForm();

      form.setFieldsValue({
        RefenceSequence:`${IdPrefixCollection}${StartSequence ? StartSequence : ''}`  
      });

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
        
            console.log('OK', ItemGenderName, ItemProductName);
            setShowModalLoading(true);
            doSaveReference(values, IdCollection);
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
              title="Product Details"
              bordered={false}
              style={{                   
                  color: '#1a2656',               
                  fontSize: '16px',
              }}
          >


              <Form
                form={form}
                ref={formRef}
                name="form_Create_Reference"
                onFinish={onFinish}              
                autoComplete="off"
                size={'default'}
               
              >
                 {/*  */}
                 <div className="grid grid-cols-3 gap-1"> 
                      <div className="col-span-6 sm:col-span-1  ">                           
                        <label 
                            className=" text-blue-700 active:bg-white text-xl font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            >Ref : {IdPrefixCollection}{StartSequence ? StartSequence : ''}
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
                      <FormItemSize  />
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
                    <div className="col-span-6 sm:col-span-1  "> 
                        <FormItemRefenceSequence  />                        
                        </div>   
                </div>             

                  
                    <Form.Item>
                    <Card>
                      
                      <Button  htmlType="submit">Save</Button>
                      
                      </Card>
                  </Form.Item>
                  
                  
              </Form>        
      
          </Card>
      
       


          <LoadingModal />      
          
      
                  
    

    
    </>
  
  )
    }