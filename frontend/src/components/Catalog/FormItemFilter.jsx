import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api"; 
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import {FormfindSizesEdit} from '@/components/Cards/CardForm/FormEdit/FormItem/FormfindSizesEdit'


export function FormItemGender({ItemFilter, SelectGender }) {       
    
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

           


          let ItemStatusMap = [];
          const [filtersStatusMap, setfiltersStatusMap] = useState([]);          
          const [ClonReferenceMap, setClonReferenceMap] = useState([]);           
          
          useEffect(() => { 

             StaticReferenceMap?.map((dataRef, index) => {  
                   const {  genderName } = dataRef ? dataRef.attributes : '0';                                  
                   
                   //Filtros columns Table                     
                  if (!ItemStatusMap.find((type) => type.value ===  genderName) ){
                      let FiltersTable = {
                          value: genderName,
                          label:  genderName,                      
                      };             
                      ItemStatusMap.push(FiltersTable,); 
                  }               
                 
              });             
              setfiltersStatusMap([...ItemStatusMap])

              console.log(ReferenceMapStatus)
             
              }, [StaticReferenceMap]);   
                       
           
        const { Option } = Select;
        const genders = filtersStatusMap;

        const handleChange = (value, label) => {

          setItemGender(value)
          SelectGender(label.label)
          if(ItemTheme){
            
             
           let ArryFilterTheme = StaticReferenceMap.filter(type => type.attributes.theme.data.id === ItemTheme)      
           let ArryFilterGender = ArryFilterTheme.filter(type => type.attributes.genderName === value)

           console.log(ArryFilterGender);
           if(ArryFilterGender.length>=0){
         
            setReferenceMapStatus(false); 
            doReferenceMapFilters(ArryFilterGender); 
            setFilterCatalogSelect(ArryFilterGender);
        
          }
           // setReferenceMap(ArryFilterGender);
          }

          if(ItemProduct){

            let ArryFilter = StaticReferenceMap.filter(type => type.attributes.Composition.typeproduct.data.id === ItemProduct)      
            let ArryFilterGender = ArryFilter.filter(type => type.attributes.genderName === value)
 
            setReferenceMapStatus(false); 
            doReferenceMapFilters(ArryFilterGender); 
            setFilterCatalogSelect(ArryFilterGender);
           }
           
           
           
                
         
          // const FiltersItem = ` collection:{id:{eq: ${IdCollection}  }} 
          //                           ${ItemFilter[0]}:{id:{eq: ${ItemTheme} }}
          //                           genderName:{eq: "${value}"} `      

          // const Filters= `collection:{id:{eq: ${IdCollection} }}  genderName:{eq: "${value}" } `
 

          // const pageData = dofindCollectionFilters(ItemTheme ? FiltersItem : Filters)
        
        };
        
    
  return (
  <>
    
    <div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    
              
              <Form.Item
                  name="genders"
                  label="Gender"
                  //initialValue={ {id:ItemId, label:ItemName} }    
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

export function FormItemTheme({ItemFilter, SelectTheme}) {   
    
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
    
    
    let ItemStatusMap = [];        
    const [filtersStatusMap, setfiltersStatusMap] = useState([]);  
    const [ClonReferenceMap, setClonReferenceMap] = useState([]);                      
    
    useEffect(() => { 

      StaticReferenceMap?.map((dataRef, index) => {  
             const {  theme } = dataRef ? dataRef.attributes : '0';                    
             
             //Filtros columns Table                     
            if (!ItemStatusMap.find((type) => type.value ===  theme.data.id) ){
                let FiltersTable = {
                    value: theme.data.id,
                    label:  theme.data.attributes.name,                      
                };             
                ItemStatusMap.push(FiltersTable,); 
            }               
           
          });           
     
        setfiltersStatusMap([...ItemStatusMap])
      

        }, [StaticReferenceMap]);  
   
    const { TextArea } = Input;
    const { Option } = Select;
    const theme = filtersStatusMap;

    const [ItemOpen, setItemOpen] = useState(true);
    const [Themevalue, setThemevaluet] = useState();       
    
    let ItemId = Themes.id ? Themes.id : null;
    let ItemName = Themes.id ? Themes.attributes.name : '';
    
    const [form] = Form.useForm();    

    const handleChange = async (value, label) => {
        
      setItemTheme(value);
      SelectTheme(label.label);
      if(ItemGender){
               
        let ArryFilterTheme = StaticReferenceMap.filter(type => type.attributes.theme.data.id === value)      
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
                    
                    <Form.Item
                        name="theme"
                        label="Theme"
                        initialValue={ {id:ItemId, label:ItemName} }                        
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
       
       useEffect(() => { 
        
      
        StaticReferenceMap?.map((dataRef, index) => {  
                const {  Composition } = dataRef ? dataRef.attributes : '0';              
                const { typeproduct } = Composition;               
                
                //Filtros columns Table                     
               if (!ItemStatusMap.find((type) => type.value ===  typeproduct.data.id) ){
                   let FiltersTable = {
                       value: typeproduct.data.id,
                       label:  typeproduct.data.attributes.name,                      
                   };             
                   ItemStatusMap.push(FiltersTable,); 
               }               
              
           });           
        
           setfiltersStatusMap([...ItemStatusMap])
         

           }, [StaticReferenceMap]);   

      const { TextArea } = Input;  
      const { Option } = Select;
      const product = filtersStatusMap;   

      const [ItemOpen, setItemOpen] = useState(true);        
      const [form] = Form.useForm();

       const handleChange = (value, label) => {
  
             console.log(`selected ${value}`);  

             setItemProduct(value);
             SelectProduct(label.label);

             if(ItemGender){

              let ArryFilter = StaticReferenceMap.filter(type => type.attributes.Composition.typeproduct.data.id === value)      
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