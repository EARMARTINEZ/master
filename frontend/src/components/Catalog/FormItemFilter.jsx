import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';



export function FormItemGender({form, ItemFilter, SelectGender }) {       
    
  const { 
    IdCollection,
    ReferenceMap,
    StaticReferenceMap,
    setReferenceMap,
    doReferenceMapFilters,
    dogetCollectionReference
    
     } = useTasks();      
      const { 
         ItemGender,          
         ItemTheme,
         ItemProduct, 
         setItemGender,
         setItemTheme,
         setItemProduct,
         ReferenceMapStatus,
         setReferenceMapStatus,
         setFilterCatalogSelect    
          } = BasicTasks();       


          
    const [filtersStatusMap, setfiltersStatusMap] = useState([]);          
    const [ClonReferenceMap, setClonReferenceMap] = useState([]);  
    const [initialValue, setInitialValue] = useState();  
    
  
    const groupGender = function(){

      const newStatusMap = {}; 
      let ItemStatusMap = [];

        StaticReferenceMap?.forEach((dataRef) => {
          const { genderName, Composition } = dataRef.attributes || {}; // Acceder a las propiedades de manera segura
          
          // Verificar si el género ya existe en el mapa
          if (!newStatusMap[genderName]) {
              newStatusMap[genderName] = {
              value: genderName,
              label: genderName,
              order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
            };
          }
        });

        // Convertir el objeto en un arreglo de valores
        const newStatusArr = Object.values(newStatusMap);
        // Ordenar el arreglo por el campo order_show de manera ascendente
        newStatusArr.sort((a, b) => a.order_show - b.order_show);
        // Establecer el valor inicial
        if (newStatusArr.length > 0) {
          setInitialValue(newStatusArr[0].value);
          setItemGender(newStatusArr[0].value)
        }

        // Actualizar ItemStatusMap
        ItemStatusMap = newStatusArr;
        setfiltersStatusMap([...ItemStatusMap])
    }
          
    useEffect(() => {       
      groupGender();                
    }, [StaticReferenceMap]);     
      
    const genders = filtersStatusMap; 
         

    const handleChange = (value, label) => {

      setItemGender(value)
      SelectGender(label.label)
      form.setFieldsValue({theme: 'Search to Select'}); 
      form.setFieldsValue({product: 'Search to Select'});           
   
      if(ItemGender){   
        let ArryFilterGender = StaticReferenceMap.filter(type => type.attributes.genderName === value)
        //console.log(ArryFilterGender);
        if(ArryFilterGender.length>=1){
      
        setReferenceMapStatus(false); 
        doReferenceMapFilters(ArryFilterGender); 
        setFilterCatalogSelect(ArryFilterGender);    
      }      
        // setReferenceMap(ArryFilterGender);
      }

      
  
    
    };
        
    
  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
          {genders.length > 0 && (  
              <Form.Item
                  name="genders"
                  label="Gender" 
                  initialValue={initialValue}       
                         
                  rules={[
                  {
                      required: false,
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
                  // filterSort={(optionA, optionB) =>
                  //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    
                  // }
                  
                  />
              </Form.Item>    

            )}
          </div> 
    
  </div> 
  </>

)
}

export function FormItemTheme({form, ItemFilter, SelectTheme}) {   
    
    const { Themes, IdCollection, doReferenceMapFilters, ReferenceMap, StaticReferenceMap} = useTasks();

    const { 
         ItemGender,          
         ItemTheme,
         ItemProduct, 
         setIemtGender,
         setItemTheme,
         setItemProduct, 
         ReferenceMapStatus,         
         setReferenceMapStatus,
         setFilterCatalogSelect  
    } = BasicTasks();   
    
    
    
    const [filtersStatusMap, setfiltersStatusMap] = useState([]);  
    const [ClonReferenceMap, setClonReferenceMap] = useState([]);
    const [ItemOpen, setItemOpen] = useState(true);
    const [Themevalue, setThemevaluet] = useState();  
    const [initialValue, setInitialValue] = useState();                        
   
    
    const groupTheme = function(){

      const newStatusMap = {}; 
      let ItemStatusMap = [];
     
    
      const ArryFilterGender = ItemGender ?      
            StaticReferenceMap.filter(type => type.attributes.genderName == ItemGender )
            :StaticReferenceMap.filter(type => type.attributes.genderName == 'Baby Girl' )
      
          ArryFilterGender?.forEach((dataRef) => {
            const {  theme, Composition } = dataRef.attributes || {};  
            const {  attributes } =  theme.data || {};    
          
             // Verificar si el theme ya existe en el mapa
            if (!newStatusMap[attributes.name]) {
                newStatusMap[attributes.name] = {
                value: attributes.name,
                label: attributes.name,
                order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
              };
            }
        });

        // Convertir el objeto en un arreglo de valores
        const newStatusArr = Object.values(newStatusMap);
        // Ordenar el arreglo por el campo order_show de manera ascendente
        newStatusArr.sort((a, b) => a.order_show - b.order_show);
        // Establecer el valor inicial
        
        if (newStatusArr.length > 0) {
          setInitialValue(newStatusArr[0].value);
          setItemTheme(newStatusArr[0].value);
         
         
        }

        // Actualizar ItemStatusMap
        ItemStatusMap = newStatusArr;
        setfiltersStatusMap([...ItemStatusMap])
       
    }
   
    
    useEffect(() => {   
      groupTheme();
    
    }, [ReferenceMap]);  
   
    
    const theme = filtersStatusMap;

         
    
    
    
  

    const handleChange = async (value, label) => {
        
      setItemTheme(value);
      SelectTheme(label.label);
      if(ItemGender){
               
        let ArryFilterTheme = StaticReferenceMap.filter(type => type.attributes.theme.data.attributes.name === value)      
        let ArryFilterGender = ArryFilterTheme.filter(type => type.attributes.genderName === ItemGender)      
        
        
        setReferenceMapStatus(false); 
        doReferenceMapFilters(ArryFilterGender); 
        setFilterCatalogSelect(ArryFilterGender);
        
       }
          

    };    

  return (
  <>
   
   <div className="grid grid-cols-1 gap-1 m-0">
        <div className="grid grid-cols-2 gap-1 m-0">         

                {ItemOpen ? (         
                  <div className="col-start-1 col-span-4">
                    {theme.length > 0 && (   
                     
                        <Form.Item
                            name="theme"
                            label="Theme"
                            //initialValue={initialValue}                        
                            rules={[
                            {
                                required: false,
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
                          
                     )}
                  </div> 
                ) : null} 

                

        </div>  
    </div>          
    
  
  </>

)
}

export function FormItemProduct({ItemFilter, SelectProduct}) {   

    const { IdCollection, filtersProductMap, doReferenceMapFilters, ReferenceMap, StaticReferenceMap, } = useTasks();

    const { 
      ItemGender,          
      ItemTheme,
      ItemProduct, 
      setItemGender,
      setItemTheme,
      setItemProduct, 
      ReferenceMapStatus,
      setReferenceMapStatus,
      setFilterCatalogSelect       
       } = BasicTasks(); 
     
      
       let ItemStatusMap = [];        
       const [filtersStatusMap, setfiltersStatusMap] = useState([]); 
       const [ClonReferenceMap, setClonReferenceMap] = useState([]);                           
       const [initialValue, setInitialValue] = useState();  
       
       const groupProduct = function(){

        const newStatusMap = {}; 
        let ItemStatusMap = [];
       
      
        const ArryFilterGender = ItemGender ?      
              StaticReferenceMap.filter(type => type.attributes.genderName == ItemGender )
              :StaticReferenceMap.filter(type => type.attributes.genderName == 'Baby Girl' )
        
            ArryFilterGender?.forEach((dataRef) => {
              const { Composition } = dataRef.attributes || {};  
              const { typeproduct } = Composition; 
              const { attributes } =  typeproduct.data || {};    
            
               // Verificar si el theme ya existe en el mapa
              if (!newStatusMap[attributes.name]) {
                  newStatusMap[attributes.name] = {
                  value: attributes.name,
                  label: attributes.name,
                  order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
                };
              }
          });
  
          // Convertir el objeto en un arreglo de valores
          const newStatusArr = Object.values(newStatusMap);
          // Ordenar el arreglo por el campo order_show de manera ascendente
          newStatusArr.sort((a, b) => a.order_show - b.order_show);
          // Establecer el valor inicial
          
          if (newStatusArr.length > 0) {
            setInitialValue(newStatusArr[0].value);
            setItemProduct(newStatusArr[0].value);
           
           
          }
  
          // Actualizar ItemStatusMap
          ItemStatusMap = newStatusArr;
          setfiltersStatusMap([...ItemStatusMap])
         
      }
       
       
       useEffect(() => {       
          groupProduct();
           }, [ReferenceMap]);   

   
      const product = filtersStatusMap;   

      const [ItemOpen, setItemOpen] = useState(true);        
   

       const handleChange = (value, label) => {
  
             console.log(`selected ${value}`);  

             setItemProduct(value);
             SelectProduct(label.label);

             if(ItemGender){

              let ArryFilter = StaticReferenceMap.filter(type => type.attributes.Composition.typeproduct.data.attributes.name === value)      
              let ArryFilterGender = ArryFilter.filter(type => type.attributes.genderName === ItemGender)
   
              setReferenceMapStatus(false); 
              doReferenceMapFilters(ArryFilterGender); 
              setFilterCatalogSelect(ArryFilterGender);
             }
      
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
                            required: false,
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
  
  
        
         </div> 
  
  
          
       
    </div> 
    </>
  
  )
}  



export function FormSelectCatalog({CatalogSelec, SelectTheme, SelectProduct}) {   
  const {
    IdCollection,         
    doReferenceMapFilters, 
    StaticReferenceMap,
            
   } = useTasks();  
      
   const { 
        setReferenceMapStatus,   
   } = BasicTasks();

        const { Option } = Select;
        const Status = [
          {
            label: 'Collection Catalog',
            value: 'Collection Catalog',
          },
          {
            label: 'Gender / Product Catalog',
            value: 'Gender / Product Catalog',
          },
         
        ];
    
       
        const handleChange = (value) => {          
          console.log(value);
          CatalogSelec(value);
          SelectTheme();
          SelectProduct();

          setReferenceMapStatus(true);
          doReferenceMapFilters(StaticReferenceMap);   
        };
      return (
      <>
       
        <div className="grid grid-cols-1 gap-1 m-0">      
              <div className="col-span-6 sm:col-span-1  ">    
                  
                  <Form.Item
                      name="status"
                      label="Select Catalog type"   
                      initialValue="Collection Catalog"                  
                      rules={[
                      {
                          required: false,
                          message: '',
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