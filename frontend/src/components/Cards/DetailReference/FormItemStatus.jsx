import { useSession } from 'next-auth/react';

import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import {ConfigProvider, Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';


export function FormItemStatus() {   
    
  const { Referencia, ReferenceMap, doUpdateStatusReference } = useTasks();

  const {    
    formRef,
    checkUser,  
  } = BasicTasks(); 
  
  
  let status;

  ReferenceMap?.map((Status, index) => {      
     status = Status.attributes ? Status.attributes.status : 'null'
   
});
    
    const [disabled, setdisabled] = useState(true);
   
    const { Option } = Select;
    const Status = [
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Approved',
        value: 'Approved',
      },
      {
        label: 'Cancelled',
        value: 'Cancelled',
      },      
    ];

   const [form] = Form.useForm()

    const onReset = () => {
      form.resetFields();
    };

    useEffect(() => {      
       onReset()       
       form.setFieldsValue({ StatusReference: status });      
    }, [Referencia]);    

    useEffect(() => {      
      onReset()       
      form.setFieldsValue({ StatusReference: status });      
   }, [status]); 
   
      const { data: session } = useSession();   
      const [TypeUser, setTypeUser] = useState("Reader");  

          useEffect(() => {      
              checkUser(  session ? session.user.email : '').then( ResMap => {  

                  if(ResMap.length===1){     
                    ResMap[0].Type ? setTypeUser( ResMap[0].Type) : setTypeUser("Reader")
                    ResMap[0].Type==="Reader" ? setdisabled(true) : setdisabled(false);
                  }  
              });          
            
            }, [session]);
   
     

    const handleChange = (value) => {
            
        doUpdateStatusReference({ "status":value });  
        
    };
  
  
      
  return (
  <>
      <ConfigProvider
        theme={{
          token: {      
            colorText: status=='Pending' ? 'orange' : status=='Approved' ?  "green" :  "red "      
          },
        }}
      >    
              <Space direction="vertical">   
                <Space wrap>   
                    <Form               
                          form={form}
                          ref={formRef}
                          name="Statusform"     
                        
                        >
                        
                        <Form.Item
                            name="StatusReference"
                            label={ <label style={
                                  status=='Pending' ? { color: "orange " } 
                                : status=='Approved' ? { color: "green" } 
                                : { color: "red" }}>status</label> 
                              }
                            initialValue={status}
                                          
                            rules={[
                            {
                                required: false,
                                message: 'Missing status',
                            },
                          
                            ]}
                        >
                            <Select 
                            color={"green"}
                            options={Status}
                            disabled={disabled}    
                            showSearch                        
                            onChange={handleChange}       
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              
                            }
                            
                            />
                        </Form.Item> 

                        </Form>    
                </Space>   
              </Space>   

      </ConfigProvider>     
  </>

)
}
