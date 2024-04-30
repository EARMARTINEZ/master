import { useSession } from 'next-auth/react';

import  'flowbite'
import  React, {useEffect, useState, useCallback  } from "react";
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI } from "utils/api";
import {ConfigProvider, Button, Checkbox, Form, Input, Select, Space, Radio, Card, Row, Col } from 'antd';
import {  ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons'
import ImgReference from '@/components/Cards/DetailReference/ImgReference'

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

 // fake data generator
 const getItems = (count, offset = 0) =>

 Array.from({ length: count }, (v, k) => k).map(k => ({
   id: `item-${uuid()}`,
   content: `item ${k + offset}`,
   type: `item ${k + offset}`,
}));

const reorder = (list, startIndex, endIndex) => {
const result = Array.from(list);
const [removed] = result.splice(startIndex, 1);
result.splice(endIndex, 0, removed);

return result;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
const sourceClone = Array.from(source);
const destClone = Array.from(destination);
const [removed] = sourceClone.splice(droppableSource.index, 1);

destClone.splice(droppableDestination.index, 0, removed);

const result = {};
result[droppableSource.droppableId] = sourceClone;
result[droppableDestination.droppableId] = destClone;

return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
// some basic styles to make the items look a bit nicer
userSelect: "none",
padding: grid * 2,
margin: `0 0 ${grid}px 0`,

// change background colour if dragging
background: isDragging ? "lightgrey" : "white",

// styles we need to apply on draggables
...draggableStyle
});
const getListStyle = isDraggingOver => ({
background: isDraggingOver ? "white" : "white",
padding: grid,
width: 350
});

export function CatalogDroppable({ catalogType="reference" }) {

  const {
    Referencia,
    IdCollection,
    dogetSystemColor,
    ReferenceMap,
    setReferenceMap,
    StaticReferenceMap,
    combinationsMap,
    doshowDrawer,
    NameCollection,
  } = useTasks();

  const {
    doDivideEnPartesIguales,
    PrintMode,
    setCaptureReport,
    ItemGender,
    ItemTheme
  } = BasicTasks();

  const [state, setState] = useState([]);
  const [StopState, setStopState] = useState(true);

  let ItemMap = [];
  let newDataDrawings = [];
  let ItemRandomMap = [];
  let ItemRestMap = [];
  let ItemBaseMap = [];

  let ItemRMap = [];

  useEffect(() => {
    if(StopState){

      let ArryFilter;
      if (catalogType == "reference") {
        ArryFilter = ItemGender ?
             ReferenceMap.filter(type => type.attributes.genderName == ItemGender )
            :ReferenceMap.filter(type => type.attributes.genderName == 'Baby Girl' )

        console.log('ItemGender')
        console.log(ItemGender)

        ArryFilter?.map((dataRef, index) => {
          const { referencia, drawings, Composition, status } = dataRef
            ? dataRef.attributes
            : '0'
          const { id_part } = Composition
            ? Composition.typeproduct.data.attributes
            : '0'

          drawings.data?.map((dataDrawings, index) => {
            const isCatalogSelec = status != 'Cancelled'
            const isImgReferencia =
              dataDrawings.attributes.name === referencia + '.jpg'

            if (isCatalogSelec) {
              if (isImgReferencia) {
                newDataDrawings.push({
                  ...dataDrawings,
                  reference: referencia,
                  order_Part: id_part ? id_part.data.id : null,
                  orderShowProduct:
                    Composition.typeproduct.data.attributes.order_show,
                  orderShowGender:
                    Composition.gender.data.attributes.order_show,
                })
                newDataDrawings.sort((a, b) => a.order_Part - b.order_Part)
              }
            }
          })
        })

        //ItemRandomMap
        newDataDrawings?.map((dataDrawings, index) => {
          // const valor = Math.trunc (Object.keys(ItemBaseMap).length / 3 )
          let FiltersTableReferences = {
            id: dataDrawings.id,
            content: dataDrawings.attributes.name,
            url: dataDrawings.attributes.url,
            reference: dataDrawings.reference,
            order_Part: dataDrawings.order_Part,
            orderShowProduct: dataDrawings.orderShowProduct,
            orderShowGender: dataDrawings.orderShowGender,
          }
          ItemRandomMap.push(FiltersTableReferences)
          ItemRandomMap.sort((a, b) => a.orderShowProduct - b.orderShowProduct)
        })

        //ItemMap
        ItemBaseMap?.map((comments, index) => {
          // const valor = Math.trunc (Object.keys(ItemBaseMap).length / 3 )
          const valor = ItemBaseMap.length / 2
          if (index <= valor) {
            const random = Math.floor(Math.random() * ItemBaseMap.length)
            if (!ItemRandomMap.find((id) => id.id === ItemBaseMap[random].id)) {
              if (!ItemMap.find((id) => id.id === ItemBaseMap[random].id)) {
                let FiltersTableReferences = {
                  id: ItemBaseMap[random].id,
                  content: ItemBaseMap[random].attributes.name,
                  url: ItemBaseMap[random].attributes.url,
                  reference: ItemBaseMap[random].reference,
                }
                ItemMap.push(FiltersTableReferences)
              }
            }
          }
        })

        //ItemRestMap
        ItemBaseMap?.map((comments, index) => {
          const random = Math.floor(Math.random() * ItemBaseMap.length)
          if (!ItemRandomMap.find((id) => id.id === ItemBaseMap[index].id)) {
            if (!ItemMap.find((id) => id.id === ItemBaseMap[index].id)) {
              if (!ItemRestMap.find((id) => id.id === ItemBaseMap[index].id)) {
                let FiltersTableReferences = {
                  id: ItemBaseMap[index].id,
                  content: ItemBaseMap[index].attributes.name,
                  url: ItemBaseMap[index].attributes.url,
                  reference: ItemBaseMap[index].reference,
                }

                ItemRestMap.push(FiltersTableReferences)
              }
            }
          }
        })

      } else if (catalogType == "combination") {
        console.log(combinationsMap)
        // {
        //   "id": "42",
        //   "refId": 1,
        //   "type": "mannequin",
        //   "collection": {
        //       "id": "35",
        //       "name": "Spring-Summer-Test"
        //   },
        //   "gender": "Girl",
        //   "theme": "cool",
        //   "image": "http://localhost:1381/uploads/blob_ea92280181.png",
        //   "references": [
        //       {
        //           "id": "23242",
        //           "typeproduct": "Body Shirt M/C",
        //           "ref": "222",
        //           "silhouette": {
        //               "url": "http://localhost:1381/uploads/1151177_15711c370c.png",
        //               "name": "1151177.png"
        //           }
        //       },
        //   ]
        // }

        ArryFilter = ItemGender ?
             combinationsMap.filter(type => type.gender == ItemGender )
            :combinationsMap.filter(type => type.gender == 'Baby Girl' )

        console.log("ItemGender");
        console.log(ItemGender);

        ArryFilter?.map((dataRef, index) => {
              const { id, refId, type, gender, g_order_show, theme, image, references } = dataRef ? dataRef : '0';
              dataRef.theme = {data: {attributes : {name: theme}}};
              dataRef.genderName = gender;
              // const {id_part } = Composition ? Composition.typeproduct.data.attributes  : '0';
              // drawings.data?.map((dataDrawings, index) => {
                  // const isCatalogSelec = status != 'Cancelled'
                  // const isImgReferencia = dataDrawings.attributes.name===referencia+'.jpg'
                  // if(isCatalogSelec){
                    // if(isImgReferencia){
                        newDataDrawings.push({
                          ...dataRef,
                          "reference": refId,
                          order_Part: null,
                          orderShowProduct: null,
                          orderShowGender: parseInt(g_order_show),
                          },);
                          newDataDrawings.sort((a, b) => a.orderShowGender - b.orderShowGender);
                    // }
                  // }
              // });
          });

              //ItemRandomMap
              newDataDrawings?.map((dataDrawings, index) => {
                  // const valor = Math.trunc (Object.keys(ItemBaseMap).length / 3 )
                  console.log(dataDrawings)
                          let FiltersTableReferences = {
                              id: dataDrawings.id,
                              content: dataDrawings.references.map((reference) => reference.id).join(', '),
                              url: new URL(dataDrawings.image).pathname,
                              reference:dataDrawings.reference,
                              order_Part:null,
                              orderShowProduct:null,
                              orderShowGender: dataDrawings.orderShowGender,
                              theme: dataDrawings.theme,
                          };
                          ItemRandomMap.push(FiltersTableReferences);
                          ItemRandomMap.sort((a, b) => a.orderShowGender - b.orderShowGender);
              });

                  //ItemMap
                  ItemBaseMap?.map((comments, index) => {
                      // const valor = Math.trunc (Object.keys(ItemBaseMap).length / 3 )
                      const valor = (ItemBaseMap.length / 2 )
                      if(index <= valor) {
                          const random = Math.floor(Math.random() * ItemBaseMap.length);
                          if (!ItemRandomMap.find( id => id.id === ItemBaseMap[random].id) ){
                              if (!ItemMap.find( id => id.id === ItemBaseMap[random].id) ){
                                  let FiltersTableReferences = {
                                      id: ItemBaseMap[random].id,
                                      content: ItemBaseMap[random].attributes.name,
                                      url: ItemBaseMap[random].attributes.url,
                                      reference: ItemBaseMap[random].reference,
                                  };
                                  ItemMap.push(FiltersTableReferences);
                              }
                          }
                      }
                  });

                  //ItemRestMap
                  ItemBaseMap?.map((comments, index) => {
                          const random = Math.floor(Math.random() * ItemBaseMap.length);
                            if (!ItemRandomMap.find( id => id.id === ItemBaseMap[index].id) ){
                                if (!ItemMap.find( id => id.id === ItemBaseMap[index].id) ){
                                    if (!ItemRestMap.find( id => id.id === ItemBaseMap[index].id) ){
                                    let FiltersTableReferences = {
                                        id: ItemBaseMap[index].id,
                                        content: ItemBaseMap[index].attributes.name,
                                        url: ItemBaseMap[index].attributes.url,
                                        reference: ItemBaseMap[index].reference,
                                        };
                                        ItemRestMap.push(FiltersTableReferences);
                                    }
                                }
                            }
                    });
      }
          console.log([ItemMap, ItemRandomMap,  ItemRestMap ])
    }

        //const flattenedArray = [].concat(...ItemRandomMap, ...ItemMap,  ...ItemRestMap);
        // setState([flattenedArray])
        // setCaptureReport([flattenedArray])
        const PartesIgualesArray = doDivideEnPartesIguales(ItemRandomMap);
        //console.log([ItemRandomMap, ItemMap,  ItemRestMap])
        //console.log(PartesIgualesArray )

        setState(PartesIgualesArray)
        setCaptureReport(PartesIgualesArray)

    }, [ReferenceMap, combinationsMap]);

    useEffect(() => {
      console.log("state")
      console.log(state)
        setState(state)
        setCaptureReport(state)
      }, [state]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState.filter(group => group.length));
    }
  }

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
      setIsMounted(true);
  }, []);

  return (
    <>
      <Row justify="start">
        <Col className="gutter-row">
          <div className="grid grid-cols-1 gap-1 ">
            <div className="col-span-6 sm:col-span-1 ">
              <header className="relative">
                <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white">
                  {' '}
                  {NameCollection}
                </h1>
                <p className="font-display text-sm font-medium text-blue-500"></p>
              </header>
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'start', height: '100%' }}>
        {isMounted ? (
          <div>
            {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>*/}
            {/* <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>  */}
            <Row justify="start" gutter={[16, 24]}>
              <Col className="gutter-row" span={18}>
                <div style={{ display: 'flex' }}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    {state.length == 0 ? (
                      <div style={{width: 'max-content'}} >No data found</div>
                    ) : (
                      state.map((el, ind) => (
                        <Droppable key={uuid()} droppableId={`${ind}`}>
                          {(provided, snapshot) => (
                            <div
                              className="overflow-hidden dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]"
                              ref={provided.innerRef}
                              // style={getListStyle(snapshot.isDraggingOver)}
                              {...provided.droppableProps}
                            >
                              {el.map((item, index) => (
                                <div
                                  key={item.id}
                                  className="flex items-center"
                                >
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      //  <div className="col-span-6 sm:col-span-1  ">
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        {PrintMode && (
                                          <Button
                                            className="bg-white"
                                            type="text"
                                            shape="circle"
                                            onClick={() => {
                                              const newState = [...state]
                                              newState[ind].splice(index, 1)
                                              setState(
                                                newState.filter(
                                                  (group) => group.length
                                                )
                                              )
                                            }}
                                          >
                                            <DeleteTwoTone twoToneColor="#eb2f96" />
                                          </Button>
                                        )}
                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                          }}
                                        >
                                          {/* {item.url} */}
                                          {item.url && (
                                            <ImgReference
                                              key={item.url}
                                              url={item.url}
                                              UrlId={item.id}
                                              compact={true}
                                            />
                                          )}
                                        </div>

                                        {(PrintMode && catalogType === 'reference') && (
                                          <Button
                                            type="link"
                                            onClick={() => {
                                              doshowDrawer(item.reference),
                                                dogetSystemColor()
                                            }}
                                          >
                                            {item.reference}
                                          </Button>
                                        )}
                                        {(PrintMode && catalogType === 'combination') && (
                                          <div>
                                            {item.reference}
                                          </div>
                                        )}
                                      </div>
                                      // </div>
                                    )}
                                  </Draggable>
                                </div>
                              ))}

                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      ))
                    )}
                  </DragDropContext>
                </div>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    </>
  )
}