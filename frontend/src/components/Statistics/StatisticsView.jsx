import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Collapse, Card, List, Form, Divider   } from 'antd';
import {  ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons'
import ButtonRecharge from '@/components/Cards/DetailReference/buttonRecharge'
import {StatisticsGender } from '@/components/Statistics/StatisticsGender'
import {FormItemTheme,
    FormItemGender,
    FormItemProduct,
    FormSelectCatalog
   } from '@/components/Statistics/FormItemFilter'


export function StatisticsView() {   
    
    const { 
        IdCollection,
        ReferenceMap,
        StaticReferenceMap,
        setReferenceMap,
        doReferenceMapFilters,
        dogetCollectionReference,
        dofetchIDCollection,
        dofindCollectionFilters,
        filtersGenderMap,
        dogenerateFilters,
        setStaticReferenceMap
        
         } = useTasks();      
          const { 
            setitemsGenderPart,
            itemsGenderPart,
            setitemsProducto,
            itemsProducto                 
              } = BasicTasks();      
    
                    
        
        const groupGenderPart = function(data){

        const newStatusMap = {};        
    
            data?.forEach((dataRef) => {
                const { Composition } = dataRef.attributes || {}; // Acceder a las propiedades de manera segura
                const { typeproduct } = Composition || {};
                
                if (!newStatusMap[typeproduct.data.attributes.id_part.data.attributes.name]) {
                    newStatusMap[typeproduct.data.attributes.id_part.data.attributes.name] = {
                    value: typeproduct.data.attributes.id_part.data.attributes.name,
                    label: typeproduct.data.attributes.id_part.data.attributes.name,
                    order: typeproduct.data.attributes.id_part.data.id || 0
                  
                };
                }
                
            });
            const newPartArr = Object.values(newStatusMap); 
          
        return newPartArr
    
        }

        const groupGenderProducto = function(newPartArr){
            let ItemStatusMap = [];
            let ItemMap = [];
            let ItemArryFilter = [];
            //const newPartArr = groupGenderPart(data);
        

            newPartArr?.forEach((dataPart) => {
    
            const newProductMap = {};                           

            const ArryFilterPart = ReferenceMap.filter(type => type.attributes.Composition.typeproduct.data.attributes.id_part.data.attributes.name == dataPart.label )
        
            ArryFilterPart?.forEach((dataRef) => {
                const { productname, genderName, Composition } = dataRef.attributes || {}; // Acceder a las propiedades de manera segura
                const { typeproduct } = Composition || {};

                if (!newProductMap[productname]) {
                    newProductMap[productname] = {
                    value:ArryFilterPart.length,
                    label: productname,
                    order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
                };
                }
                
            });
            const newProductArr = Object.values(newProductMap);
            
            newProductArr?.forEach((dataProduct) => {

                const ArryFilter = ArryFilterPart.filter(type => type.attributes.productname == dataProduct.label 
                    && type.attributes.Composition.typeproduct.data.attributes.id_part.data.attributes.name == dataPart.label)
                
                const idPartLength = ArryFilterPart.length;
                const typeProductLength = ArryFilter.length;
                const totalLength = (typeProductLength / idPartLength) * 100 

                
                const item = {
                    "part": dataPart.label,                   
                    "PartLength": idPartLength,
                    "typeProductLength": typeProductLength,
                    "totalLength": totalLength.toFixed(1), 
                    ArryFilter                 
                  };
               
                  ArryFilter.forEach(filter => {                   
                    item["id"] = filter.id;
                    item["referencia"] = filter.attributes.refencia;
                    item["productname"] = filter.attributes.productname,
                    item["theme"] =filter.attributes.theme.data ? filter.attributes.theme.data.attributes.name: {}, 
                    item["color_pantone"] = filter.attributes.color_pantone.data ? filter.attributes.color_pantone.data.attributes.name : {}              
                   
                  });

                ItemMap.push(item);
                }); 

                
                    
               
           
    
    
                ItemStatusMap.push({
                "part": dataPart.label,
                ArryFilterPart, 
                idPartNameLength: ArryFilterPart.length
                
                },);
    
    
        });

        

            return ItemMap

        }        
              
        const [ ItemSelectGender, setItemSelectGender] = useState();
        const [ ItemSelectTheme, setItemSelectTheme] = useState();
        const [ ItemSelectProduct, setItemSelectProduct] = useState();
        const [formCatalogView] = Form.useForm();
        
        
        const [ CatalogSelect, setCatalogSelect] = useState("Collection Catalog");

        let isCatalogSelec = CatalogSelect === 'Collection Catalog'
        let isProductCatalog = CatalogSelect === 'Gender / Product Catalog'

        let ItemFilterSelect = isCatalogSelec ? ['theme','genderName'] : 
                                isProductCatalog ? ['typeproduct','genderName'] : []
       


        useEffect(() => {            
            IdCollection ? dogetCollectionReference(IdCollection) : dogetCollectionReference('29');   
            IdCollection ? dofetchIDCollection(IdCollection) : dofetchIDCollection('29');
         }, []);

        // useEffect(() => {      
        
    
        //     const FILTERS = dogenerateFilters("29", ['Baby Girl'], 'gender');

        //     dofindCollectionFilters(FILTERS)
        //     .then(  keys => {
            
        //         if(keys.data.length>= 1){
        //             doReferenceMapFilters(keys.data);
        //                 const responsePart = groupGenderPart(keys.data)                            
        //                 const response = groupGenderProducto(responsePart)                       
        //                 setitemsProducto(response)
        //                 setitemsGenderPart(responsePart)
                   
                    
        //         }
            
        //     });
        
        
        // }, []);  

        
       
        const onChange = (key) => {
            console.log(key);
        };
                
  return (
    
  <>
 
 <div className="overflow-hidden bg-white dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
  <div className="py-1 sm:px-2 lg:relative lg:px-0 lg:py-1">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-1 px-4 lg:max-w-8xl lg:grid-cols-1 lg:px-8 xl:gap-x-16 xl:px-12">

      <header className="relative">
            <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white">Statistics</h1>
            <p className="font-display text-sm font-medium text-blue-500"></p>
        </header> 

      {/* <div className="grid grid-cols-2 gap-1"> 
      
          <div className="col-span-6 sm:col-span-1  "> 
          {<Form  >
            <FormSelectCatalog 
            CatalogSelec={setCatalogSelect}
            SelectTheme={setItemSelectTheme}
            SelectProduct={setItemSelectProduct}          
          />
          </Form>}
          </div>   

          <div className="col-span-6 sm:col-span-1  "> 
          {<ButtonRecharge />}
          </div>   

      </div>  */}
     
        <Form 
        form={formCatalogView}
        name="form_CatalogViewFilterSelect"
       
        >  
          <div className="grid grid-cols-2 gap-1"> 
               
         
              <div className="col-span-6 sm:col-span-1  "> 
              {
                <FormItemGender 
                  ItemFilter={ItemFilterSelect} 
                  SelectGender={setItemSelectGender}
                  form={formCatalogView}  
                  />
                  }    
              </div>
              
              {isCatalogSelec &&
                  <div className="col-span-6 sm:col-span-1  "> 
                
                    {/* <FormItemTheme 
                      SelectTheme={setItemSelectTheme} 
                      form={formCatalogView}
                   /> */}
                
                  </div>
              }        
              
              {isProductCatalog &&
                <div className="col-span-6 sm:col-span-1  "> 
              
                  <FormItemProduct 
                    SelectProduct={setItemSelectProduct}  
                  />
               
                </div>
              }
        
          </div> 
        </Form>
        

            {itemsProducto.length > 0 && ( 
            <StatisticsGender Producto={itemsProducto} Part={itemsGenderPart} />
        )}    
         
         
         </div>
      </div>
    </div>

 
   
  </>

)
}