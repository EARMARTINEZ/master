import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect, useState } from "react";
import {getStrapiURL} from "utils/api";
import { Button, Form, Drawer, Spin  } from 'antd';
import { PrinterOutlined } from '@ant-design/icons'

import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import {CatalogDroppable} from '@/components/Catalog/CatalogDroppable'
import { PDFViewer } from '@react-pdf/renderer';

import ReporViewer from '@/components/Catalog/ReporViewer'
import ButtonRechargeCatalog from '@/components/Cards/DetailReference/buttonRechargeCatalog'
import {FormItemTheme,
        FormItemGender,
        FormItemProduct,
        FormSelectCatalog
       } from '@/components/Catalog/FormItemFilter'


export function CatalogView() {

  const {
    IdCollection,
    setIdCollection,
    ReferenceMap,
    StaticReferenceMap,
    NameCollection,
    dogetCollectionReference,
    dofetchIDCollection,
    onClose,
    open,
    StampsOpen,
    onCloseStamps,
    doReferenceMapFilters,
    ItemGender,
    dofetchCombinationByCollection,
    combinationsMap,
    fetchData,
    filtersGenderMap,
    loading
  } = useTasks()

   const {
    PrintMode,
    CaptureReport,
    FilterCatalogSelect,
    formRef,
   } = BasicTasks();

   const [ ItemSelectGender, setItemSelectGender] = useState();
   const [ ItemSelectTheme, setItemSelectTheme] = useState();
   const [ ItemSelectProduct, setItemSelectProduct] = useState();
   const [formCatalogView] = Form.useForm();
  //  const [loading, setLoading] = useState(true);

   const [openCatalog, setOpenCatalog] = useState(false);

   const [ CatalogSelect, setCatalogSelect] = useState("Collection Catalog");

   let isCatalogSelec = CatalogSelect === 'Collection Catalog'
   let isProductCatalog = CatalogSelect === 'Gender / Product Catalog'
   let isCombinationCatalog = CatalogSelect === 'Combination Catalog'

   let catalogType = isCatalogSelec ? 'reference' :
                    isProductCatalog ? 'reference' :
                    isCombinationCatalog ? 'combination' : ''

   let ItemFilterSelect = isCatalogSelec ? ['theme','genderName'] :
                          isProductCatalog ? ['typeproduct','genderName'] :
                          isCombinationCatalog ? ['theme','genderName'] : []

   const onCloseCatalag = () => {
    setOpenCatalog(false);
  };

// Mejoramos el rendimiento gracias a la modificacion de este UseEffect
  useEffect(() => {
      IdCollection
        ? dofetchIDCollection(IdCollection)
        : dofetchIDCollection('29')
  // }, [IdCollection]);
  }, []);

  return (
    <>
      <div className="overflow-hidden bg-white dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
        <div className="py-1 sm:px-2 lg:relative lg:px-0 lg:py-1">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-1 px-4 lg:max-w-8xl lg:grid-cols-1 lg:px-8 xl:gap-x-16 xl:px-12">
            <div className="grid grid-cols-2 gap-1">
              <div className="col-span-6 sm:col-span-1  ">
                {
                  <Form>
                    <FormSelectCatalog
                      CatalogSelec={setCatalogSelect}
                      SelectTheme={setItemSelectTheme}
                      SelectProduct={setItemSelectProduct}
                    />
                  </Form>
                }
              </div>
              <div className="col-span-6 sm:col-span-1  ">
                {<ButtonRechargeCatalog />}
              </div>
            </div>
            <Form form={formCatalogView} name="form_CatalogViewFilterSelect">
              <div className="grid grid-cols-2 gap-1">
                <div className="col-span-6 sm:col-span-1  ">
                  {
                    <FormItemGender
                      ItemFilter={ItemFilterSelect}
                      SelectGender={setItemSelectGender}
                      form={formCatalogView}
                      catalogType={catalogType}
                    />
                  }
                </div>
                {(isCatalogSelec || isCombinationCatalog) && (
                  <div className="col-span-6 sm:col-span-1  ">
                    <FormItemTheme
                      SelectTheme={setItemSelectTheme}
                      form={formCatalogView}
                      catalogType={catalogType}
                    />
                  </div>
                )}
                {isProductCatalog && (
                  <div className="col-span-6 sm:col-span-1  ">
                    <FormItemProduct SelectProduct={setItemSelectProduct} />
                  </div>
                )}
              </div>
            </Form>
            <div className="grid grid-cols-1 gap-1">
              <div className="col-span-6 py-5 sm:col-span-1 ">
                {PrintMode && (
                  <Button
                    type="dashed"
                    onClick={() => {
                      setOpenCatalog(true)
                    }}
                  >
                    <PrinterOutlined />
                    Print Mode
                  </Button>
                )}
              </div>
              {loading

              ? (            
                <div className='mt-32 flex flex-col justify-center items-center'>
                  <Spin size="large" className='scale-200'/>
                </div>
              ): ( 
                <div className="col-span-6 sm:col-span-1  ">
                <CatalogDroppable catalogType={catalogType} />
                </div>
              ) }
             
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="Close"
        placement="right"
        onClose={() => {
          // doReferenceMapFilters(FilterCatalogSelect),
          onClose(true)
        }}
        open={open}
        size={'large'}
        width={2000}
        className="bg-gray-900"
      >
        <CardReference />
      </Drawer>

      <Drawer
        title="Close"
        placement="right"
        onClose={() => onCloseCatalag()}
        open={openCatalog}
        size={'large'}
        className="bg-gray-900"
      >
        <PDFViewer height={600} width={600}>
          <ReporViewer
            CaptureR={CaptureReport}
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
        onClose={() => onCloseStamps()}
        open={StampsOpen}
        size={'large'}
        width={2000}
        className="bg-gray-900"
      >
        <CardStamp />
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