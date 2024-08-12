import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import {FormfindSizes} from '@/components/Cards/CardForm/FormItem/FormfindSizes'

export function FormItemStatus() {   
    
  const { 
    StatusReference,  
     } = useTasks();          
   
   

    const { Option } = Select;
    const status = [
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

    const handleChange = (value) => {
          
      // console.log(value);
     };

  return (
  <>
   
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="status"
                  label="Status"
                  initialValue={'Pending'}
                  rules={[
                  {
                      required: true,
                      message: 'Missing status',
                  },
                  ]}
              >
                  <Select 
                  options={status}                
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
          </div> 
    
  </div> 
  </>

)
}


export function FormItemTheme() {   
    
    const {
       Themes,
        } = useTasks();
  
    const { 
      filtersThemesMap,
    
       } = BasicTasks();          
     
      const { TextArea } = Input;
      const { Option } = Select;
      const theme = filtersThemesMap;

      const [ItemOpen, setItemOpen] = useState(true);
     
          
      
      
      
      const [form] = Form.useForm();    
      const handleChange = () => {
        form.setFieldsValue({
          Newtheme: [],
        });
      };

     
   
     
  
    return (
    <>
     
      <div className="grid grid-cols-1 gap-1 m-0">
          <div className="grid grid-cols-4 gap-1 m-0 ">

                  {ItemOpen ? (         
                    <div className="col-start-1 col-span-4">
                      
                      <Form.Item
                          name="theme"
                          label="Theme"
                          rules={[
                          {
                              required: true,
                              message: 'Missing theme',
                          },
                          ]}
                      >
                          <Select 
                        
                          options={theme} 
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
                      <Form.List name="Newtheme">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.length<1 ? setItemOpen(true) : setItemOpen(false)} 
                            {fields.map((field) => (
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
                                label="Theme"
                                name={[field.name, 'newtheme']}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Missing theme',
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


export function FormItemProduct() {   

  const { 
    dofindSizes,       
    filtersProductMap,
    StartSize,
    setStartSize,
    setSizesSelecMap,
    ItemProduct,
    setItemProduct,
    ItemGender,
    setItemGender,    
   
     } = BasicTasks(); 
   
     const { setItemProductName } = useTasks();
     
      const { TextArea } = Input;

    const { Option } = Select;
    const product = filtersProductMap;
     
    const [ItemOpen, setItemOpen] = useState(true);
  
    
    const [form] = Form.useForm();    
     const handleChange = (value, label) => {
      setItemProduct(value)

          // console.log(`selected ${value}`);
      
          !StartSize ? setStartSize(true) : setStartSize(false);
          dofindSizes(ItemGender, value);
          setSizesSelecMap();
          setItemProductName(label.label);

      form.setFieldsValue({
        Newproduct: [],
      });
    };
    

  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">
      <div className="grid grid-cols-2 gap-1 m-0">
           
            {ItemOpen ? (  
              <div className="col-start-1 col-span-4">   
               
                  <Form.Item
                      name="product"
                      label="Product"
                      rules={[
                      {
                          required: true,
                          message: 'Missing Product',
                      },
                      ]}
                  >
                      <Select 
                      options={product} 
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
            <Form.List name="Newproduct">
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
                      label="Product"
                      name={[field.name, 'newproduct']}
                      rules={[
                          {
                          required: true,
                          message: 'Missing product',
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
  
  
export function FormItemProvider() {   
    
  const {        
    filtersProvidersMap,   
     } = BasicTasks();        
     
  
      const { Option } = Select;
      const provider = filtersProvidersMap;

      const handleChange = (value) => {
        console.log(`selected ${value}`);
   
  };

    return (
    <>
     
      <div className="grid grid-cols-1 gap-1 m-0">      
            <div className="col-span-6 sm:col-span-1  ">    
                
                <Form.Item
                    name="provider"
                    label="Provider"
                    rules={[
                    {
                        required: true,
                        message: 'Missing provider',
                    },
                    ]}
                >
                    <Select 
                    options={provider}                
                    showSearch
                    onChange={handleChange}         
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
      
    </div> 
    </>
  
  )
}
    
 
    
export function FormItemGender() {       
    
      const {        
         dogetNextSequence,
         dofindSizes,
         filtersGenderMap,         
         setSizesSelecMap,
         StartSize,
         setStartSize,
         ItemProduct,
         setItemGender,
          } = BasicTasks(); 

        const { IdPrefixCollection, setItemGenderName  } = useTasks();      

        const { Option } = Select;
        const gender = filtersGenderMap;      

        const handleChange = (value, label) => {

          // console.log('OK', label.label);
          const next_sequence = `${IdPrefixCollection}${value}`
          dogetNextSequence(next_sequence);
          setItemGender(value)
          setItemGenderName(label.label)
               
          !StartSize ? setStartSize(true) : setStartSize(false);
          dofindSizes(value, ItemProduct);
          setSizesSelecMap();
        };
        
    
  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                  {
                      required: true,
                      message: 'Missing gender',
                  },
                  ]}
              >
                  <Select 
                  options={gender}                
                  showSearch  
                  onChange={handleChange}        
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
    
  </div> 
  </>

)
}



export function FormItemSize() {   

  const {    
    SizesSelecMap,   
    StartSize
        } = BasicTasks();  
     
    const { Option } = Select;   

  return (
  <>
    
    <div className="grid grid-cols-2 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              {StartSize ? (   

                    <FormfindSizes children={SizesSelecMap} />
                ) : null} 

              {!StartSize ? (   
                  
                  <FormfindSizes children={SizesSelecMap}  />
              ) : null}    

                   
          </div> 
    
  </div> 
  </>

)
}
  
  
export function FormItemFabric() {   
    
  const {        
    filtersFabricsMap,   
     } = BasicTasks();         
     
       const { TextArea } = Input;

      const { Option } = Select;
      const fabric = filtersFabricsMap;

      const [ItemOpen, setItemOpen] = useState(true);
      
      const [form] = Form.useForm();    
      const handleChange = (value) => {
        console.log(`Selected: ${value}`);
        form.setFieldsValue({
          Newfabric: [],
        });
      };
   
  
    return (
    <>
     
      <div className="grid grid-cols-1 gap-1 m-0">
          <div className="grid grid-cols-2 gap-1 m-0 ">                

                  {ItemOpen ? (         
                    <div className="col-span-1 sm:col-span-1  ">
                      <Form.Item
                          name="fabric"
                          label="Fabric"
                          rules={[
                          {
                              required: true,
                              message: 'Missing fabric',
                          },
                          ]}
                      >
                          <Select 
                        
                          options={fabric} 
                          onChange={handleChange} 
                          showSearch         
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) => option?.label.toString().toLowerCase().includes(input.toLowerCase())}
                          //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                          
                          // filterSort={(optionA, optionB) =>
                          //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())                            
                          // }
                          
                          />
                      </Form.Item> 
                    </div> 
                  ) : null} 

                    <div className="col-span-1 sm:col-span-1  ">
                      <Form.List name="Newfabric">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.length<1 ? setItemOpen(true) : setItemOpen(false)} 
                            {fields.map((field) => (
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
                                label="Fabric"
                                name={[field.name, 'newfabric']}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Missing fabric',
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
    

export function FormItemColor() {   
    
      const { 
        filtersColorPantoneMap,  
         } = BasicTasks();          
       
         const { TextArea } = Input;
  
        const { Option } = Select;
        const color = filtersColorPantoneMap;
  
        const [ItemOpen, setItemOpen] = useState(true);
        
        const [form] = Form.useForm();    
        const handleChange = (value) => {
          console.log(`Selected: ${value}`);
          form.setFieldsValue({
            Newcolor: [],
          });
        };
     
    
      return (
      <>
       
        <div className="grid grid-cols-1 gap-1 m-0">
            <div className="grid grid-cols-2 gap-1 m-0 ">                
  
                    {ItemOpen ? (         
                      <div className="col-span-1 sm:col-span-1  ">
                        <Form.Item
                            name="color"
                            label="Color"
                            rules={[
                            {
                                required: true,
                                message: 'Missing color',
                            },
                            ]}
                        >
                            <Select 
                          
                            options={color} 
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
  
                      <div className="col-span-1 sm:col-span-1  ">
                        <Form.List name="Newcolor">
                          {(fields, { add, remove }) => (
                          <>
                              {fields.length<1 ? setItemOpen(true) : setItemOpen(false)} 
                              {fields.map((field) => (
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
                                  label="Color"
                                  name={[field.name, 'newcolor']}
                                  rules={[
                                      {
                                      required: true,
                                      message: 'Missing color',
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


export function FormItemStamp() {   
    
        const { 
          filtersStampsMap,  
           } = BasicTasks();          
         
           const { TextArea } = Input;
    
          const { Option } = Select;
          const stamp =filtersStampsMap;
    
          const [ItemOpen, setItemOpen] = useState(true);
          
          const [form] = Form.useForm();    
          const handleChange = () => {
            form.setFieldsValue({
              NewStamp: [],
            });
          };
       
      
        return (
        <>
         
          <div className="grid grid-cols-1 gap-1 m-0">
              <div className="grid grid-cols-2 gap-1 m-0 ">                
    
                      {ItemOpen ? (         
                        <div className="col-span-1 sm:col-span-1  ">
                          <Form.Item
                              name="stamp"
                              label="Stamp"
                            
                          >
                              <Select 
                            
                              options={stamp} 
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
    
                        <div className="col-span-1 sm:col-span-1  ">
                          <Form.List name="NewStamp">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.length<1 ? setItemOpen(true) : setItemOpen(false)} 
                                {fields.map((field) => (
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
                                    label="Stamp"
                                    name={[field.name, 'newStamp']}
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Missing stamp',
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



export function FormItemSystemColor() {   

  const { 
    SystemColor,  
      } = useTasks(); 
      
      
      const [value, setValue] = useState(1);

      const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

      const gridStyle = {
        width: '25%',
        textAlign: 'center',
      };
  return (
  <>
    
    <div className="grid grid-cols-2 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-2  ">    
              
              <Form.Item
                  name="systemColor"
                  label=""
                  rules={[
                  {
                      required: true,
                      message: 'Missing SystemColor',
                  },
                  ]}
              >
                
                      
                <Card
                    title="SystemColor"
                    bordered={false}
                    className="bg-gray-100 text-xs"
                  >
            
                  <Radio.Group onChange={onChange} value={value} >

                  {SystemColor?.map((_datos) => ( 

                    <Radio key={ `${_datos.id}${_datos.codigo}`} value={_datos.id} className="text-xl text-gray-900">            
                        
                        
                        <Card.Grid hoverable={false}  className="bg-gray-100">
                          <div className="flex items-center h-5 w-20">
                          <div className="h-5 w-5 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full" 
                            style={{backgroundColor: _datos.codigo}} />                                                
                          </div>
                        </Card.Grid>
                        {_datos.name}
                    
                    </Radio>
                    
                   ))} 

                  </Radio.Group>    
                  </Card>
           

                


              </Form.Item>       
          </div> 
    
  </div> 
  </>

)
}
  
  
export function FormItemDescription() {   
    
    const { 
      StatusReference,  
       } = useTasks();          
     
       const { TextArea } = Input;
  
    return (
    <>
     
      <div className="grid grid-cols-1 gap-1 m-0">      
            <div className="col-span-6 sm:col-span-1  ">    
                
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                    {
                        required: false,
                        message: 'Missing description',
                    },
                    ]}
                >
                   <TextArea rows={6} placeholder="Description"  />

                </Form.Item>       
            </div> 
      
    </div> 
    </>
  
  )
}


export function FormItemSimilarRefs() {   
    
      const { 
        StatusReference,  
         } = useTasks();          
       
         const { TextArea } = Input;

         const onChange = (e) => {
          console.log('Change:', e.target.value);
        };
    
      return (
      <>
       
        <div className="grid grid-cols-1 gap-1 m-0">      
              <div className="col-span-6 sm:col-span-1  ">    
                  
                  <Form.Item
                      name="similarRefs"
                      label="Similar Refs"
                      rules={[
                      {
                          required: false,
                          message: 'Missing similarRefs',
                      },
                      ]}
                  >
                    <Input showCount maxLength={7} onChange={onChange} />
  
                  </Form.Item>       
              </div> 
        
      </div> 
      </>
    
    )
}


export function FormItemRefenceSequence() {   
    
  const { 
    StatusReference,  
     } = useTasks();     
    
     const { TextArea } = Input;

    

  return (
  <>
   
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="RefenceSequence"
                  label=""
                  
              >
                <Input hidden showCount maxLength={7}    />

              </Form.Item>       
          </div> 
    
  </div> 
  </>

)
}  