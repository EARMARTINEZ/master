import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';



export function FormItemCommentType() {   

    const { 
      filterstypecomments
     
       } = BasicTasks(); 
     
      
        const { TextArea } = Input;
  
      const { Option } = Select;
      const commenttype = filterstypecomments;

//console.log(commenttype)

      // const commenttype = [
      //   {
      //     label: 'Pending',
      //     value: 'Pending',
      //   },
      //   {
      //     label: 'Approved',
      //     value: 'Approved',
      //   },
      //   {
      //     label: 'Cancelled',
      //     value: 'Cancelled',
      //   },      
      // ];
       
      const [ItemOpen, setItemOpen] = useState(true);
    
      
      const [form] = Form.useForm();    
       const handleChange = (value) => {
        //setItemProduct(value)
  
            // console.log(`selected ${value}`);
        
            //!StartSize ? setStartSize(true) : setStartSize(false);
            //dofindSizes(ItemGender, value);
           // setSizesSelecMap();
  
        form.setFieldsValue({
          Newcommenttype: [],
        });
      };
      
  
    return (
    <>
      
      <div className="grid grid-cols-1 gap-1 m-0">
        <div className="grid grid-cols-2 gap-1 m-0">
             
              {ItemOpen ? (  
                <div className="col-start-1 col-span-4">   
                 
                    <Form.Item
                        name="commenttype"
                        label="Type"
                        rules={[
                        {
                            required: true,
                            message: 'Missing Comment Type',
                        },
                        ]}
                    >
                        <Select 
                        options={commenttype} 
                        onChange={handleChange} 
                        showSearch         
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => option?.label.toString().toLowerCase().includes(input.toLowerCase())}
                        //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                          
                        }
                        
                        />
                    </Form.Item>       
                </div>
              ) : null}   
  
  
            <div className="col-end-7 col-span-2  ">
              <Form.List name="Newcommenttype">
                {(fields, { add, remove }) => (
                <>
                    {fields.length<1 ? setItemOpen(true) : setItemOpen(false)}                  
                    {fields?.map((field) => (
                      
                    <Space 
                    key={field.key} 
                    align="baseline"
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    >
  
                        <Form.Item
                        {...field}
                        label="Type"
                        name={[field.name, 'newcommenttype']}
                        rules={[
                            {
                            required: true,
                            message: 'Missing Comment Type',
                            },
                        ]}
                        >
                       <TextArea placeholder="" 
                                      autoSize={{
                                        minRows: 1,
                                        maxRows: 6,
                                      }} 
                                  />
                                  
                        </Form.Item>
  
                        <MinusCircleOutlined onClick={() =>{
                          remove(field.name),
                          setItemOpen(true)
                        
  
                        } } />
                    </Space>
                    ))}
  
                  {ItemOpen ? ( 
                    
                    <Space               
                    align="baseline"
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    >
                      <PlusCircleTwoTone onClick={() => { 
                        add(),
                        setItemOpen(false) 
                        
                        } } />
                      </Space>
                      ) : null} 
                </>
                )}
              </Form.List>  
  
              </div> 
         </div> 
  
  
          
       
    </div> 
    </>
  
  )
  }


export function FormItemPendingType() {   

  const { 
    filterstypePending
    
      } = BasicTasks(); 
    
    
      const { TextArea } = Input;

    const { Option } = Select;
    const pendingtype = filterstypePending;

// console.log(pendingtype)

    // const pendingtype = [
    //   {
    //     label: 'Pending',
    //     value: 'Pending',
    //   },
    //   {
    //     label: 'Approved',
    //     value: 'Approved',
    //   },
    //   {
    //     label: 'Cancelled',
    //     value: 'Cancelled',
    //   },      
    // ];
      
    const [ItemOpen, setItemOpen] = useState(true);
  
    
    const [form] = Form.useForm();    
      const handleChange = (value) => {
      //setItemProduct(value)

          // console.log(`selected ${value}`);
      
          //!StartSize ? setStartSize(true) : setStartSize(false);
          //dofindSizes(ItemGender, value);
          // setSizesSelecMap();

      form.setFieldsValue({
        Newcommenttype: [],
      });
    };
    

  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">
      <div className="grid grid-cols-2 gap-1 m-0">
            
            {ItemOpen ? (  
              <div className="col-start-1 col-span-2">   
                
                  <Form.Item
                      name="pendingtype"
                      label="Type"
                      rules={[
                      {
                          required: true,
                          message: 'Missing Comment Type',
                      },
                      ]}
                  >
                      <Select 
                      className="text-left"
                      options={pendingtype} 
                      onChange={handleChange} 
                      showSearch         
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.label.toString().toLowerCase().includes(input.toLowerCase())}
                      //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        
                      }
                      
                      />
                  </Form.Item>       
              </div>
            ) : null}   


          <div className="col-end-7 col-span-2  ">
            <Form.List name="Newcommenttype">
              {(fields, { add, remove }) => (
              <>
                  {fields.length<1 ? setItemOpen(true) : setItemOpen(false)}                  
                  {fields?.map((field) => (
                    
                  <Space 
                  key={field.key} 
                  align="baseline"
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  >

                      <Form.Item
                      {...field}
                      label="Type"
                      name={[field.name, 'newcommenttype']}
                      rules={[
                          {
                          required: true,
                          message: 'Missing Comment Type',
                          },
                      ]}
                      >
                      <TextArea placeholder="" 
                                    autoSize={{
                                      minRows: 1,
                                      maxRows: 6,
                                    }} 
                                />
                                
                      </Form.Item>

                      <MinusCircleOutlined onClick={() =>{
                        remove(field.name),
                        setItemOpen(true)
                      

                      } } />
                  </Space>
                  ))}

                {ItemOpen ? ( 
                  
                  <Space               
                  align="baseline"
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  >
                    <PlusCircleTwoTone onClick={() => { 
                      add(),
                      setItemOpen(false) 
                      
                      } } />
                    </Space>
                    ) : null} 
              </>
              )}
            </Form.List>  

            </div> 
        </div> 


        
      
  </div> 
  </>

)
}  