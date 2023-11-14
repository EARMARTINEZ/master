import { signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {ConfigProvider, Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';

export function FormItemLogin() {   
    
  const { data: session } = useSession();
  const router = useRouter();
  const [alert, setAlert] = useState(['', '']);

  const { TextArea } = Input;

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);

    console.log('session', session);
  }, [session]);
  
     
  const onFinish = async (values) => {
    console.log('Success:', values);
    console.log('session', session);
    setAlert([ '', '' ]); 
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result.ok) {
      router.replace('/');
      return;
    }

    if (!result.ok) {
       setAlert([ '', `Invalid password` ]);
      return;
    }
    // alert('Credential is not valid');
    onFinishFailed(result);
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
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

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

                    <Form.Item>
                     

                      <a className="login-form-forgot" href={'/auth/forgotpassword'}>
                        Forgot password
                      </a>
                    </Form.Item>

                    <Form.Item
                     wrapperCol={{
                      offset: 1,
                      span: 16,
                    }}
                     
                    >
                      <Button type="primary" htmlType="submit"  className="login-form-button bg-blue-700 ">
                        Login
                      </Button>
                    </Form.Item>

                   <p className="m-5 text-blue-500">{alert[1]}</p>
        
                  </Form>
              
          

      
  </>

)
}

