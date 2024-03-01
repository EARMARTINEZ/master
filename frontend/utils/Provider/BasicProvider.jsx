import  'flowbite'
import React, { useState, createContext, useContext } from "react";
import {  getStrapiURL, 
          fetchAPI, 
          getThemesCollection, 
          getColorPantoneCollection, 
          getStampsCollection, 
          getSizesAll, 
          getSizesCollection, 
          getSizesActives, } from "utils/api"; 
import { Select  } from 'antd';


export const BasicContext = createContext({ isAuthenticated: false });
export const  BasicTasks = () => useContext(BasicContext);

const BasicProvider = ({ children }) => {  


  async function dogetNextSequence(values) {
    
    try {
      setStartSequence([]);

     const Nreferencia = values ? values : '1241' //Collection+Gender      
      const pageData = await fetchAPI("/mastercontrol/getNextSequence/"+Nreferencia, {
        
      }).then( keys => {                
          
         //console.log(keys);     
         setStartSequence(keys ? keys.next_sequence : '')
    
      return keys;
  });       
            
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }

  
  async function dofindGender() {
    try {     
      let ItemGenderMap = [];

      setfiltersGenderMap([]);

      const pageData = await fetchAPI("/genders", {       
      }).then( MapGender => {    
       
          MapGender.data?.map((dataRef, index) => {          
            let ItemGender = {
              value: dataRef.id ? dataRef.id: '',
              label:dataRef.attributes ? dataRef.attributes.name: ''
            };            
            ItemGenderMap.push(ItemGender,); 
        
         });       
          setfiltersGenderMap(ItemGenderMap);    
    
          return MapGender;
      }); 
          
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  
  async function dofindProducts() {
    try {     
      let ItemMap = [];
      setfiltersProductMap([]);

      const pageData = await fetchAPI("/products?pagination[limit]=-1", {       
      }).then( ResMap => {    
       
        ResMap.data?.map((dataRef, index) => {          
            let Item = {
              value: dataRef.id ? dataRef.id: '',
              label:dataRef.attributes ? dataRef.attributes.name: ''
            };            
            ItemMap.push(Item,); 
        
         });       
         setfiltersProductMap(ItemMap);    
    
          return ResMap;
      }); 
          
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
    
  async function dofindProviders() {
    try {     
      let ItemMap = [];
      setfiltersProvidersMap([]);

      const pageData = await fetchAPI("/providers?pagination[limit]=-1", {       
      }).then( ResMap => {    
       
        ResMap.data?.map((dataRef, index) => {          
            let Item = {
              value: dataRef.id ? dataRef.id: '',
              label:dataRef.attributes ? dataRef.attributes.name: ''
            };            
            ItemMap.push(Item,); 
        
         });       
         setfiltersProvidersMap(ItemMap);    
    
          return ResMap;
      }); 
          
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  
  async function dofindFabrics() {
    try {     
      let ItemMap = [];
      setfiltersFabricsMap([]);

      const pageData = await fetchAPI("/fabrics?pagination[limit]=-1", {       
      }).then( ResMap => {    
       
        ResMap.data?.map((dataRef, index) => {          
            let Item = {
              value: dataRef.id ? dataRef.id: '',
              label:dataRef.attributes ? dataRef.attributes.name: ''
            };            
            ItemMap.push(Item,); 
        
         });       
         setfiltersFabricsMap(ItemMap);    
    
          return ResMap;
      }); 
          
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  } 

  async function dofindThemes(values) {
    try {     
        let ItemMap = [];
        setfiltersThemesMap([]);

        const pageData = await  getThemesCollection({
          NCollection: values ? values :'0' , //28 29        
        }).then( ResMap => {        
          
            ResMap.themes.data?.map((dataRef, index) => {          
              let Item = {
                value: dataRef.id ? dataRef.id: '',
                label:dataRef.attributes ? dataRef.attributes.name: ''
              };            
              ItemMap.push(Item,); 
          
          });       
          setfiltersThemesMap(ItemMap);    
    
          return ResMap;
      }); 
      
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  
  async function dofindStamps(values) {
    try {     
        let ItemMap = [];
        setfiltersStampsMap([]);

        const pageData = await  getStampsCollection({
          NCollection: values ? values :"0" ,  
        }).then( ResMap => {        
          
            ResMap.stamps.data?.map((dataRef, index) => {          
              let Item = {
                value: dataRef.id ? dataRef.id: '',
                label:dataRef.attributes ? dataRef.attributes.name: ''
              };            
              ItemMap.push(Item,); 
          
          });       
          setfiltersStampsMap(ItemMap);    
    
          return ResMap;
      }); 
      
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  
  async function dofindColorPantone(values) {
    try {     
        let ItemMap = [];
        setfiltersColorPantoneMap([]);

        const pageData = await  getColorPantoneCollection({
          NCollection: values ? values :'0' , //28 29        
        }).then( ResMap => {        
          
            ResMap.mixcolors.data?.map((dataRef, index) => {          
              let Item = {
                value: dataRef.id ? dataRef.id: '',
                label:dataRef.attributes ? dataRef.attributes.name: ''
              };            
              ItemMap.push(Item,); 
          
          });       
          setfiltersColorPantoneMap(ItemMap);    
    
          return ResMap;
      }); 
      
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  //TypeComment
  async function dofindTypecomments() {
    try {     
      let ItemMap = [];
      let ItempendigMap = [];
      setfilterstypecomments([]);
      setfilterstypePending([]);

      const pageData = await fetchAPI("/typecomments?pagination[limit]=-1", {       
      }).then( ResMap => {    
       
        ResMap.data?.map((dataRef, index) => { 
          
          switch (dataRef.attributes.type) {
            case 'comment':
                let Item = {
                  value: dataRef.id ? dataRef.id: '',
                  label:dataRef.attributes ? dataRef.attributes.name: '',
                  type:dataRef.attributes ? dataRef.attributes.type: ''
                };            
                ItemMap.push(Item,); 
                setfilterstypecomments([...ItemMap]);   
              break;

              case 'pending':
                  let Itempending = {
                    value: dataRef.id ? dataRef.id: '',
                    label:dataRef.attributes ? dataRef.attributes.name: '',
                    type:dataRef.attributes ? dataRef.attributes.type: ''
                  };            
                  ItempendigMap.push(Itempending,); 
                  setfilterstypePending([...ItempendigMap]); 
                break;   
           
            default:
              console.log(`Sorry, we are out of ${dataRef.attributes.type}.`);
          }
          
         
        
         }); 
         
        
    
          return ResMap;
      }); 
          
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  } 

  // async function dofindColorPantone() {
  //   try {     
  //     let ItemMap = [];
  //     setfiltersColorPantoneMap([]);

  //     const pageData = await fetchAPI("/mixcolors?pagination[limit]=-1", {       
  //     }).then( ResMap => {    
       
  //       ResMap.data?.map((dataRef, index) => {          
  //           let Item = {
  //             value: dataRef.id ? dataRef.id: '',
  //             label:dataRef.attributes ? dataRef.attributes.name: ''
  //           };            
  //           ItemMap.push(Item,); 
        
  //        });       
  //        setfiltersColorPantoneMap(ItemMap);    
    
  //         return ResMap;
  //     }); 
          
            
  //         return pageData;
        
  //     } catch (error) {
  //         console.log("error", error)
          
  //       }          
  // }
  
  async function dofindSizes(Genders, Typeproducts) {
    try {     
        let ItemMap = [];
        let SizeArray = []; 
        setSizesSelecMap();   

        const handleChange = (value) => {
          console.log(`Provider Selected: ${value}`);    
        }; 
        // console.log(`Genders: ${Genders} Typeproducts: ${Typeproducts}`); 
        
           await  getSizesAll({              
        }).then( ResMap => { 
            ResMap.sizes.data?.map((dataRef, index) => {
                let Item = {
                  value:dataRef.attributes ? dataRef.attributes.name: '',
                  label:dataRef.attributes ? dataRef.attributes.name: ''
                };            
                ItemMap.push(Item,);              
              });    
          }); 
          //console.log(Genders, Typeproducts);

          const DataActives = await  getSizesActives({
            NGenders: Genders ? Genders :'0' ,
            NTypeproducts: Typeproducts ? Typeproducts :'0',            
          }).then( ResMap => { 

            //console.log(ResMap)

            let SizeActives = ResMap.sizeactives.data[0] ? ResMap.sizeactives.data[0].attributes.sizes.data : []
            let ActivateSearch = ResMap.sizeactives.data[0] ? ResMap.sizeactives.data[0].attributes.activateSearch : false

              if(ActivateSearch){
                 
                    
                    SizeActives?.map((dataRef, index) => {
                      let Item = {
                        value:dataRef.id ? dataRef.id: '',
                        label:dataRef.attributes ? dataRef.attributes.name: ''
                      };            
                      //ItemMap.push(Item,);
                      SizeArray.push(dataRef.attributes.name,);
                    });     
                    // console.log(SizeArray); 
                  setSizesSelecMap(     
                      <Select                 
                      name="selecsize"         
                      options={ItemMap} 
                      defaultValue={SizeArray}
                      //defaultActiveFirstOption={false}
                      value={ItemMap}
                      onChange={handleChange}
                      mode="multiple"              
                      //showSearch="single"                         
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())                    
                      }                  
                      />         
                    ) 
                
                  return ResMap;
            }
        }); 

              const pageData = await  getSizesCollection({
                NGenders: Genders ? Genders :'0' ,
                NTypeproducts: Typeproducts ? Typeproducts :'0',            
              }).then( ResMap => { 
                let Sizes = ResMap.sizes.data ? ResMap.sizes.data: []
                  //console.log(ResMap)
                  Sizes?.map((dataRef, index) => {
                    let Item = {
                      value:dataRef.id ? dataRef.id: '',
                      label:dataRef.attributes ? dataRef.attributes.name: ''
                    };            
                    //ItemMap.push(Item,);
                    SizeArray.push(dataRef.attributes.name,);
                  });     
                  // console.log(SizeArray); 
                setSizesSelecMap(     
                    <Select                 
                    name="selecsize"         
                    options={ItemMap} 
                    defaultValue={SizeArray}
                    //defaultActiveFirstOption={false}
                    value={ItemMap}
                    onChange={handleChange}
                    mode="multiple"              
                    //showSearch="single"                         
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())                    
                    }                  
                    />         
                  ) 
              
                return ResMap;
            });   

              
      
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }
  
  //Auth

  async function checkUser(email) {
    try {     
   
      const pageData = await fetchAPI("/users/?filters[email][$eq]="+email, {       
      }).then( ResMap => { return ResMap }); 
          
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  } 

  async function forgotpassword(values) {
    try {     
   
        let raw = JSON.stringify({            
          "email": values ? values.email : ''     
        });
        const options = {
        method: "POST",
        body: raw,     
        };
        const mergedOptions = {
            headers: {
            "Content-Type": "application/json",
            },
            ...options,
        };

        const resp = await fetch("/api/auth/reminder", mergedOptions,{
        }).then( keys => {  return keys });

      return ["OK", resp.message];
      
      } catch (error) {
          console.log("error", error)
          
        }          
  } 

  async function doResetpassword(values) {
    try {     
   
        let raw = JSON.stringify({            
          "code": values ? values.code : '',
          "password": values ? values.password : '',  
          "passwordConfirmation": values ? values.passwordConfirmation : ''       
        });
        const options = {
        method: "POST",
        body: raw,     
        };
        const mergedOptions = {
            headers: {
            "Content-Type": "application/json",
            },
            ...options,
        };

        const resp = await fetch("/api/auth/reset", mergedOptions,{
        }).then( keys => {  return keys });

      return ["OK", resp.message];
      
      } catch (error) {
          console.log("error", error)
          return ["alert", error.response.data.message]; 
        }          
  }
  

  async function doReportCapture() {
    try {     
      let ItemMap = [];
      setCaptureReport([]);

      const pageData = await fetchAPI("/reportcapture", {       
      }).then( MapGender => {          

          return MapGender;
      });           
            
          return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }

  function doDivideEnPartesIguales(array) {
    const longitudParte = Math.ceil(array.length / 3); 
    const partes = [];
    for (let i = 0; i < array.length; i += longitudParte) {
      partes.push(array.slice(i, i + longitudParte));
    }
    return partes;
  }
 

const [CaptureReport, setCaptureReport] = useState([]); 
const [PrintMode, setPrintMode] = useState(true);

const [StartSequence, setStartSequence] = useState([]);
const [filtersGenderMap, setfiltersGenderMap] = useState([]);
const [filtersProductMap, setfiltersProductMap] = useState([]);
const [filtersProvidersMap, setfiltersProvidersMap] = useState([]);
const [filtersFabricsMap, setfiltersFabricsMap] = useState([]);
const [filtersThemesMap, setfiltersThemesMap] = useState([]);
const [filtersStampsMap, setfiltersStampsMap] = useState([]);
const [filtersColorPantoneMap, setfiltersColorPantoneMap] = useState([]);
const [filtersSizesMap, setfiltersSizesMap] = useState([]);
const [SizesMap, setSizesMap] = useState([]);
const [SizesSelecMap, setSizesSelecMap] = useState();

const [filterstypecomments, setfilterstypecomments] = useState([]);
const [filterstypePending, setfilterstypePending] = useState([]);

const [StartSize, setStartSize] = useState(true);
const [ItemProduct, setItemProduct] = useState();
const [ItemGender, setItemGender] = useState();
const [ItemTheme, setItemTheme] = useState();

const [ReferenceMapStatus, setReferenceMapStatus] = useState(true); 
const [ FilterCatalogSelect, setFilterCatalogSelect] = useState([]);

const [itemsProducto, setitemsProducto] = useState([]);
const [itemsGenderPart, setitemsGenderPart] = useState([]);

const formRef = React.useRef(null);
const onformReset = () => {
  formRef.current?.resetFields();
};

const useract = {
  
  
  dogetNextSequence:dogetNextSequence,
  dofindGender:dofindGender,
  dofindProducts:dofindProducts,
  dofindProviders:dofindProviders,
  dofindFabrics:dofindFabrics,
  dofindThemes:dofindThemes,
  dofindColorPantone:dofindColorPantone,
  dofindStamps:dofindStamps,
  dofindSizes:dofindSizes,
  dofindTypecomments:dofindTypecomments,
  doDivideEnPartesIguales:doDivideEnPartesIguales,
  
 

  setCaptureReport:setCaptureReport,
  CaptureReport:CaptureReport,
  setPrintMode:setPrintMode,
  PrintMode:PrintMode,
  setfiltersGenderMap:setfiltersGenderMap,
  filtersGenderMap:filtersGenderMap,
  setfiltersProductMap:setfiltersProductMap,
  filtersProductMap:filtersProductMap,
  setfiltersProvidersMap:setfiltersProvidersMap,
  filtersProvidersMap,filtersProvidersMap,
  setfiltersFabricsMap:setfiltersFabricsMap,
  filtersFabricsMap:filtersFabricsMap,
  setfiltersThemesMap:setfiltersThemesMap,
  filtersThemesMap:filtersThemesMap,
  setfiltersColorPantoneMap:setfiltersColorPantoneMap,
  filtersColorPantoneMap:filtersColorPantoneMap,
  setfiltersStampsMap:setfiltersStampsMap,
  filtersStampsMap:filtersStampsMap,
  setStartSequence:setStartSequence,
  StartSequence:StartSequence,
  setfiltersSizesMap:setfiltersSizesMap,
  filtersSizesMap:filtersSizesMap,
  setSizesMap:setSizesMap,
  SizesMap:SizesMap,
  setSizesSelecMap:setSizesSelecMap,
  SizesSelecMap:SizesSelecMap,
  setStartSize:setStartSize,
  StartSize:StartSize,
  setItemProduct:setItemProduct,
  ItemProduct:ItemProduct,
  setItemGender:setItemGender,
  ItemGender:ItemGender,
  setItemTheme:setItemTheme,
  ItemTheme:ItemTheme,


  setReferenceMapStatus:setReferenceMapStatus,
  ReferenceMapStatus:ReferenceMapStatus,

  setfilterstypecomments:setfilterstypecomments,
  filterstypecomments:filterstypecomments,
  setfilterstypePendig:setfilterstypePending,
  filterstypePending:filterstypePending,


  formRef:formRef,
  onformReset:onformReset,

  checkUser:checkUser,
  forgotpassword:forgotpassword,
  doResetpassword:doResetpassword,
  doReportCapture:doReportCapture,

  setFilterCatalogSelect:setFilterCatalogSelect,
  FilterCatalogSelect:FilterCatalogSelect,

  setitemsGenderPart:setitemsGenderPart,
  itemsGenderPart:itemsGenderPart,
  setitemsProducto:setitemsProducto,
  itemsProducto:itemsProducto,


};

  return (
    <BasicContext.Provider value={useract}>{children}</BasicContext.Provider>
  );
};
  export default BasicProvider;