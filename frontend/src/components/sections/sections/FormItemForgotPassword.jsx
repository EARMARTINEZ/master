import { signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { LockOutlined, SendOutlined } from '@ant-design/icons';
import {ConfigProvider, Button, Checkbox, Alert, Form, Input, Select, Space, Radio, Card  } from 'antd';

export function FormItemForgotPassword() {  
    
    const { 
        checkUser,  
        forgotpassword,   
       } = BasicTasks();    
    
  const { data: session } = useSession();
  const router = useRouter();
  const [alert, setAlert] = useState(['', '']);

  const { TextArea } = Input;

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);

    console.log('session', session);
  }, [session]);


  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  
     
  const onFinish = async (values) => {    
    
    console.log('Success:', values);
    
    setAlert([ '', '' ]); 

    checkUser( values ? values.email : '').then( ResMap => {
        
        enterLoading(1);

        if(ResMap.length===0){      
            setAlert([ '', `Unregistered email address` ]);           
        }

        if(ResMap.length===1){ 
           
            forgotpassword(values).then( ResMap => {                            
             ResMap[0]==='OK' ? setAlert([ '',`Please check your email (${values.email}) and follow the instructions to reset your password` ]) : ''             
             return ResMap;
            });
        }  
    });    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; 
  
      
  return (
  <>
     
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{                       
                offset: 1,
                span: 20,
            }}                    
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                
            <Form.Item
                label=""
                name="email"
                rules={[
                {
                    required: true,
                    type: 'email',
                    message: 'Email is not a valid email!',
                },
                ]}
            >
                <Input prefix={<SendOutlined className="site-form-item-icon" />} placeholder=" you@email.com" />
            </Form.Item>                                     

            <Form.Item
                wrapperCol={{
                offset: 1,
                span: 16,
            }}
                
            >
                <Button
                    type="primary"
                    className="login-form-button bg-blue-700 "
                    loading={loadings[1]}
                    htmlType="submit"                            
                    >
                    Send
                </Button>
                
            </Form.Item>

            <p className="m-5 text-blue-500">{alert[1]}</p>
                
            
            

            </Form>
              
          

      
  </>

)
}