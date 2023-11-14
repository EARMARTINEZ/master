import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import {FormfindSizesEdit} from '@/components/Cards/CardForm/FormEdit/FormItem/FormfindSizesEdit'

export function FormItemStatus() {   
   

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

   
    const handleChange = (value) => {          
    //  console.log(value);
    };
  return (
  <>
   
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="status"
                  label="Status"
                  // initialValue={ ValueStatus }   
                  rules={[
                  {
                      required: true,
                      message: 'Missing status',
                  },
                  ]}
              >
                  <Select 
                  options={Status}                
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
    
      const { Themes,} = useTasks();
  
      const { filtersThemesMap, } = BasicTasks();          
     
      const { TextArea } = Input;
      const { Option } = Select;
      const theme = filtersThemesMap;

      const [ItemOpen, setItemOpen] = useState(true);     
      
      let ItemId = Themes.id ? Themes.id : null;
      let ItemName = Themes.id ? Themes.attributes.name : '';
      
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
                          initialValue={ {id:ItemId, label:ItemName} }                        
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
      Composition,
      setSizesEditMap, 
     } = useTasks(); 
      const { 
        dofindSizes,       
        filtersProductMap,
        StartSize,
        setStartSize,
        setSizesSelecMap,
        setItemProduct,
        setItemGender,
        ItemGender,       
        } = BasicTasks(); 
   
     const {gender, typeproduct} = Composition
     let ItemId = typeproduct.data ? typeproduct.data.id : null;
     let ItemName = typeproduct.data ? typeproduct.data.attributes.name : '';
     let genderId = gender.data ? gender.data.id : null;
     
    const { TextArea } = Input;
    const { Option } = Select;
    const product = filtersProductMap;
     
    const [ItemOpen, setItemOpen] = useState(true);
    const [form] = Form.useForm();     

    const handleChange = (value) => {

          !StartSize ? setStartSize(true) : setStartSize(false);
          const IdGender= ItemGender ? ItemGender : parseInt(genderId)
          setItemGender(parseInt(IdGender));
          setItemProduct(value);             
          dofindSizes(IdGender, value);
          setSizesSelecMap();
          setSizesEditMap();

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
                      initialValue={ {id:ItemId, label:ItemName} }    
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
    
  const { Provider } = useTasks();

  const { filtersProvidersMap } = BasicTasks();        
  
  let ItemId = Provider.data ? Provider.data.id : null;
  let ItemName = Provider.data ? Provider.data.attributes.name : '';
  
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
                    initialValue={ {id:ItemId, label:ItemName} } 
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
    
 
    
export function FormItemGender() {       
    
  const { 
    IdPrefixCollection, 
    Composition,
    setSizesEditMap, 
     } = useTasks();      
      const {        
         dogetNextSequence,
         dofindSizes,
         filtersGenderMap,         
         setSizesSelecMap,
         StartSize,
         setStartSize,
         ItemProduct,         
         setItemGender,
         setItemProduct,
          } = BasicTasks(); 
         

        const { Option } = Select;
        const genders = filtersGenderMap;

        const {gender, typeproduct} = Composition
        let ItemId = gender.data ? gender.data.id : null;
        let ItemName = gender.data ? gender.data.attributes.name : '';
        let typeproductId = typeproduct.data ? typeproduct.data.id : null;
        
        

        const handleChange = (value) => {
          
          const next_sequence = `${IdPrefixCollection}${value}`
          dogetNextSequence(next_sequence);
          !StartSize ? setStartSize(true) : setStartSize(false);
          const IdProduct= ItemProduct ? ItemProduct : parseInt(typeproductId)
          setItemProduct(parseInt(IdProduct));
          setItemGender(value)         
          dofindSizes(value, IdProduct);
          setSizesSelecMap();
          setSizesEditMap();
        };
        
    
  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="genders"
                  label="Gender"
                  initialValue={ {id:ItemId, label:ItemName} }    
                  rules={[
                  {
                      required: true,
                      message: 'Missing gender',
                  },
                  ]}
              >
                  <Select 
                  options={genders}                
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


export function FormItemSizeEdit() {   
  
  const { SizesEditMap } = useTasks();  
  const { SizesSelecMap, StartSize, ItemProduct, ItemGender    } = BasicTasks(); 
  const { Option } = Select;

  return (
  <>
    
    <div className="grid grid-cols-2 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">               
              
              {StartSize ? (  
                   <FormfindSizesEdit children={JSON.stringify(SizesSelecMap) ? SizesSelecMap:  SizesEditMap} />
                ) : null} 

              {!StartSize ? (                   
                  <FormfindSizesEdit children={JSON.stringify(SizesSelecMap) ? SizesSelecMap:  SizesEditMap }  />
              ) : null}    

                   
          </div> 
    
  </div> 
  </>

)
}
  
  
export function FormItemFabric() {   
  
      const { Composition } = useTasks();     
      const { filtersFabricsMap } = BasicTasks();   
     
      const {fabric} = Composition
      let ItemId = fabric.data ? fabric.data.id : null;
      let ItemName = fabric.data ? fabric.data.attributes.name : '';

      const { TextArea } = Input;
      const { Option } = Select;
      const fabrics = filtersFabricsMap;

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
                          name="fabrics"
                          label="Fabric"
                          initialValue={ {id:ItemId, label:ItemName} }  
                          rules={[
                          {
                              required: true,
                              message: 'Missing fabric',
                          },
                          ]}
                      >
                          <Select 
                        
                          options={fabrics} 
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
    
      const {Color_pantone}=useTasks();  
      const { filtersColorPantoneMap } = BasicTasks();      
         
         let ColorPantoneId = Color_pantone.data ? Color_pantone.data.id : null;
         let ColorPantoneName = Color_pantone.data ? Color_pantone.data.attributes.name : null;
       
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
                            initialValue={ {id:ColorPantoneId, label:ColorPantoneName} }  
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
    
      const{ Stamp }= useTasks();        
      const { filtersStampsMap } = BasicTasks();  
      
      let ItemId = Stamp.data ? Stamp.data.id : null;
      let ItemName = Stamp.data ? Stamp.data.attributes.name : '';
         
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
                              initialValue={ {id:ItemId, label:ItemName} } 
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

  const { SystemColor, 
          SystemColorValue,
          setSystemColorValue } = useTasks();
 
          
     
      const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setSystemColorValue(e.target.value);
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
                  initialValue={SystemColorValue}                          
                  rules={[
                  {
                      required: false,
                      message: 'Missing SystemColor',
                  },
                  ]}
              >
                
                      
                <Card
                    title="SystemColor"
                    bordered={false}                    
                    className="bg-gray-100 text-xs"
                  >
            
                  <Radio.Group  onChange={onChange} value={SystemColorValue}  >

                  {SystemColor?.map((_datos, index) => ( 

                    <Radio key={ `${_datos.id}${_datos.codigo}`} value={parseInt(_datos.id)}  className="text-xl text-gray-900">            
                      
                        
                        <Card.Grid  hoverable={false} className="bg-gray-100">
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
    
    const { Description } = useTasks();          
     
    const { TextArea } = Input;
  
    return (
    <>
     
      <div className="grid grid-cols-1 gap-1 m-0">      
            <div className="col-span-6 sm:col-span-1  ">    
                
                <Form.Item
                    name="description"
                    label="Description"
                    initialValue={Description} 
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
    
      const { SimilarRefs } = useTasks();          
       
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
                      initialValue={SimilarRefs}
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