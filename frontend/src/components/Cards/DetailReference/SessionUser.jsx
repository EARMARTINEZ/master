import { signOut, useSession } from 'next-auth/react';

import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { Button, Checkbox, Form, Dropdown, message, Input, Select, Space, Radio, Card  } from 'antd';
import { UserOutlined, AppstoreOutlined, CloseCircleOutlined, HomeOutlined  } from '@ant-design/icons';


export function SessionUser() {   

    const { 
      filterstypePending
      
        } = BasicTasks(); 
      
    const { data: session } = useSession();  

    const handleButtonClick = (e) => {
        // message.info('Click on left button.');
        // console.log('click left button', e);
      };
      const handleMenuClick = (e) => {
       
        // console.log('click', e.key);

        e.key ==2 ? signOut() : message.info('Click on menu item.');
      };
  
  
      const items = [
        {
          label: session.user.email,
          key: '1',
          icon: <UserOutlined />,
        },
        
        {
          label: 'Sign out',
          key: '2',
          icon: <CloseCircleOutlined />,
          danger: true,
        },
       
      ];
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
  
    return (
    <>

        {session ? (
        
        <div className="grid grid-cols-2 gap-1 m-1 py-2 ">                        
        <div className="col-span-6 sm:col-span-6 ">
              
            
                 <Dropdown.Button menu={menuProps} href="/" placement="bottomLeft" icon={<AppstoreOutlined />}>
                 <HomeOutlined />
                </Dropdown.Button>
             
                </div>
                 </div>
          
        ) : null  }


   
    </>
  
  )
  }  