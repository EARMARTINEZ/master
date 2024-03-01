import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Collapse, Card, List, Divider   } from 'antd';
import {  ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons'


const Comenta = ({Producto, Part}) => {

    const { Panel } = Collapse;    
    
    
    const data = [
        {
          ref: '1230047',
          theme: 'Crochet',
          color: 'Denim same as 2220017 salesman sample',
          fabric: 'Denim',
        },
        {
            ref: '1230020',
            theme: 'Crochet',
            color: 'Denim same as 2220017 salesman sample',
            fabric: 'Denim',
          },
        ];

        console.log(Producto)
        console.log(Part)
    return (
        <>
  
     <ul>
     {Part?.map((itemPart, index) => (
        <li key={index}>
            <span className="subtitle">{` ${itemPart.value}`}</span>
            <span className="subtitleGrey"></span>
           
            <Collapse>
             {Producto?.map((itemProduct, index) => ( 
                itemProduct.part == itemPart.value && (
                <Panel header={`${itemProduct.productname}/
                                ${itemProduct.typeProductLength}/
                                ${itemProduct.totalLength}%`
                            } 
                key={index}>
                <Card>
                    <List
                    size="small"
                    dataSource={Producto}
                    renderItem={dataItem => (
                        dataItem.part == itemPart.value && dataItem.productname == itemProduct.productname && (
                            dataItem.ArryFilter?.map((itemReference, index) => ( 
                            <List.Item>
                            <div>
                                <div><strong>Ref:</strong> <a href={`#`}>{itemReference.attributes.referencia}</a></div>
                                <div><strong>Theme:</strong> {itemReference.attributes.theme.data ? itemReference.attributes.theme.data.attributes.name: null }</div>
                                <div><strong>Color:</strong> { itemReference.attributes.color_pantone.data ? itemReference.attributes.color_pantone.data.attributes.name : null}</div>
                                <div><strong>Fabric:</strong> {itemReference.attributes.Composition.fabric.data ? itemReference.attributes.Composition.fabric.data.attributes.name : null}</div>
                            </div>
                            </List.Item>
                            ))
                        )
                    )}
                    />
                </Card>
                </Panel>
               )
             ))}  
            </Collapse>
        </li>
        ))}
        </ul>  
  
      </>
  
    )
  };

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
             ItemGender,          
             ItemTheme,
             ItemProduct, 
             setItemGender,
             setItemTheme,
             setItemProduct,
             ReferenceMapStatus,
             setReferenceMapStatus,
                 
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
              
        const [items, setitems] = useState([]); 
        const [itemsProducto, setitemsProducto] = useState([]);
        const [itemsGenderPart, setitemsGenderPart] = useState([]);

        useEffect(() => {      
        
    
            const FILTERS = dogenerateFilters("29", ['Baby Girl'], 'gender');

            dofindCollectionFilters(FILTERS)
            .then(  keys => {
            
                if(keys.data.length>= 1){
                    doReferenceMapFilters(keys.data);

                        const responsePart = groupGenderPart(keys.data)                            
                        const response = groupGenderProducto(responsePart)
                    
                       // console.log(responsePart)  
                        
                     

                                 
                        setitemsProducto(response)
                        setitemsGenderPart(responsePart)
                   
                    
                }
            
            });
        
        
        }, []);  

        
       
        const onChange = (key) => {
            console.log(key);
        };
                
  return (
    
  <>
 
 <div  className="">  
        <header className="relative">
            <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white">Statistics</h1>
            <p className="font-display text-sm font-medium text-blue-500"></p>
        </header>   
      
        <Comenta Producto={itemsProducto} Part={itemsGenderPart} />
        
        {/* <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />   */}

          
 </div>
   
  </>

)
}