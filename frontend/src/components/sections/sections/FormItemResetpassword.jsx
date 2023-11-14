import { signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { LockOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Checkbox, Alert, Form, Input, Select, Space, Radio, Card  } from 'antd';

export function FormItemResetpassword() {  
    
    const { 
         doResetpassword,   
       } = BasicTasks();    
    
  const { data: session } = useSession();
  const router = useRouter();
  const [alert, setAlert] = useState(['', '']);
  const { push, query } = useRouter();

  const { TextArea } = Input;
  

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
    values.code = query.code;

    console.log('Success:', values);       
           
            doResetpassword(values).then( ResMap => {  
                
                if (ResMap[0] === 'alert') {
                    setAlert(ResMap);
                  } else {
                    setAlert([ '', `Your password has been changed, you will be redirect to login` ]);
                    setTimeout(() => {
                      push('/');
                    }, 3000);                   
                  }
                        
             return ResMap;
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
                    name="password"
                    
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>   

                <Form.Item
                    label=""
                    name="passwordConfirmation"
                    dependencies={['password']}
                    rules={[
                    {
                        required: true,
                    },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
                ]}
      >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                    />
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