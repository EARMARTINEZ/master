import  'flowbite'
import { useState, createContext, useContext } from "react";
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import {  getSizesCollection } from "utils/api"; 
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card   } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';

export function FormfindSizesEdit({children}) {

    const { 
             StartSize
            } = BasicTasks(); 
            
            // console.log(StartSize)
    return (
        <>        
            <Form.Item
                  name="size"
                  label="Size"
                  preserve={false}
                  shouldUpdate={true}                  
                  //hasFeedback={true}
                //  hidden={true}                 
                  rules={[
                  {
                      required: false,
                      message: 'Missing size',
                  },
                  ]}
              >
                {children}

            </Form.Item>
      </>
    )
  }   