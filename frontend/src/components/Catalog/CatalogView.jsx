import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect, useState } from "react"; 
import {getStrapiURL} from "utils/api";
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card, Drawer  } from 'antd';
import {  ExclamationCircleFilled, PrinterOutlined } from '@ant-design/icons'

import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import {CatalogDroppable} from '@/components/Catalog/CatalogDroppable'
import { PDFViewer } from '@react-pdf/renderer';

import ReporViewer from '@/components/Catalog/ReporViewer'
import ButtonRecharge from '@/components/Cards/DetailReference/buttonRecharge'
import {FormItemTheme,
        FormItemGender,
        FormItemProduct
       } from '@/components/Catalog/FormItemFilter'


export function FormItemStatus({CatalogSelec, SelectTheme, SelectProduct}) {   
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
                      initialValue={ 'Collection Catalog' }   
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
                      defaultValue={'Collection Catalog'}
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

export function CatalogView() {   
    
  const {
    IdCollection,
    StaticReferenceMap,
    NameCollection,          
    dogetCollectionReference,    
    onClose,
    open,
    StampsOpen, 
    onCloseStamps, 
    doReferenceMapFilters,          
   } = useTasks();  
      
   const {     
    PrintMode,   
    CaptureReport, 
    FilterCatalogSelect,   
   } = BasicTasks();


   const [ ItemSelectGender, setItemSelectGender] = useState();
   const [ ItemSelectTheme, setItemSelectTheme] = useState();
   const [ ItemSelectProduct, setItemSelectProduct] = useState();
   

   const [openCatalog, setOpenCatalog] = useState(false);
   

   const [ CatalogSelect, setCatalogSelect] = useState("Collection Catalog");

   let isCatalogSelec = CatalogSelect === 'Collection Catalog'
   let isProductCatalog = CatalogSelect === 'Gender / Product Catalog'

   let ItemFilterSelect = isCatalogSelec ? ['theme','genderName'] : 
                          isProductCatalog ? ['typeproduct','genderName'] : []
    


   const onCloseCatalag = () => {    
    setOpenCatalog(false);    
  };

//    useEffect(() => { 
//     doReferenceMapFilters(StaticReferenceMap);       

// }, [IdCollection]); 

// console.log(ItemSelectProduct);

   
  return (
    
  <>

<div className="overflow-hidden bg-white dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
  <div className="py-1 sm:px-2 lg:relative lg:px-0 lg:py-1">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-1 px-4 lg:max-w-8xl lg:grid-cols-1 lg:px-8 xl:gap-x-16 xl:px-12">

      

      <div className="grid grid-cols-2 gap-1"> 

          <div className="col-span-6 sm:col-span-1  "> 
          {<FormItemStatus 
            CatalogSelec={setCatalogSelect}
            SelectTheme={setItemSelectTheme}
            SelectProduct={setItemSelectProduct}
          
          />}
          </div>   

          <div className="col-span-6 sm:col-span-1  "> 
          {<ButtonRecharge />}
          </div>   

      </div> 
          
          
          <div className="grid grid-cols-2 gap-1"> 
               
              
              <div className="col-span-6 sm:col-span-1  "> 
              {<FormItemGender ItemFilter={ItemFilterSelect} SelectGender={setItemSelectGender}  />}    
              </div>
              
              {isCatalogSelec &&
                  <div className="col-span-6 sm:col-span-1  "> 
                  <FormItemTheme SelectTheme={setItemSelectTheme} />
                  </div>
              }        
              
              {isProductCatalog &&
                <div className="col-span-6 sm:col-span-1  "> 
                <FormItemProduct SelectProduct={setItemSelectProduct}  />
                </div>
              }

          </div> 

           <div className="grid grid-cols-1 gap-1">

            <div className="col-span-6 sm:col-span-1 py-5 "> 
               {PrintMode && <Button type="dashed" 
                  onClick={() => { setOpenCatalog( true)  }} 
                ><PrinterOutlined />Print Mode</Button>}
              </div> 

              <div className="col-span-6 sm:col-span-1  ">                        
                <CatalogDroppable />
              </div>
          </div>         
         
         
         </div>
      </div>
    </div>


          <Drawer 
              title="Close" 
              placement="right" 
              onClose={() => { doReferenceMapFilters(FilterCatalogSelect), 
                               onClose(true)
                              }} 
              open={open} 
              size={'large'} 
              width={2000}
              className="bg-gray-900"    
              > 
              <CardReference  />          
          </Drawer> 

          <Drawer 
              title="Close" 
              placement="right" 
              onClose={() => onCloseCatalag( ) } 
              open={openCatalog} 
              size={'large'} 
           
              className="bg-gray-900"    
              > 
                <PDFViewer height={600} width={600} >

                  <ReporViewer CaptureR={CaptureReport} 
                  NameCollection={NameCollection} 
                  ItemSelectTheme={ItemSelectTheme} 
                  ItemSelectGender={ItemSelectGender} 
                  ItemSelectProduct={ItemSelectProduct}
                  />

                </PDFViewer>   
                 
          </Drawer> 

          <Drawer 
                title="Close" 
                placement="right" 
                onClose={() => onCloseStamps( ) } 
                open={StampsOpen} 
                size={'large'} 
                width={2000}
                className="bg-gray-900"    
                > 
                <CardStamp  />            
            </Drawer>              
          
   
  </>

)
}



export function CatalogViewV1() {   
    
  const { Referencia, ReferenceMap, doupdateStatusStamp } = useTasks();

  const {    
    formRef,
    checkUser,    
  } = BasicTasks(); 
  
  
  

  const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    
  ];
  
  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      items: itemsFromBackend
    },
    [uuid()]: {
      name: "To do",
      items: []
    },
    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Done",
      items: []
    }
  };
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
 

  const [columns, setColumns] = useState(columnsFromBackend);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true);
  }, []);

    Object.entries(columns).map(([columnId, column], index) => {
        // console.log(columnId)
        console.log(column)
    })
  return (
    
  <>

<div style={{ display: "flex", justifyContent: "center", height: "100%" }}>

      {isMounted ?  <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId}  key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>  : null }
    </div>

   
   
  </>

)
}