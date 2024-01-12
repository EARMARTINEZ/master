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



export function CatalogDroppable() {   
    
  const { Referencia, 
          IdCollection,
          dogetSystemColor, 
          ReferenceMap, 
          StaticReferenceMap,
          doshowDrawer, 
          NameCollection } = useTasks();

  const {    
    PrintMode,
    setCaptureReport    
  } = BasicTasks();  

  const [state, setState] = useState([]);
  const [StopState, setStopState] = useState(true);  
 
  let ItemMap = [];
  let ItemBaseMap = [];
  let ItemRandomMap = [];
  let ItemRestMap = [];
  
  useEffect(() => {   
    if(StopState){

      let ArryFilter = ReferenceMap.filter(type => type.attributes.genderName === ItemGender ? ItemGender : 'Baby Girl')

      ArryFilter?.map((dataRef, index) => {
            const { referencia, drawings } = dataRef ? dataRef.attributes : '0';               
            
                drawings.data?.map((comments, index) => { 
                
                if(comments.attributes.name===referencia+'.jpg'){

                    ItemBaseMap.push({...comments, "reference": referencia}, );
                } 
            });  

            }); 
                
              // console.log(ItemBaseMap );   
            
            //ItemRandomMap
            ItemBaseMap?.map((comments, index) => {             
                const valor = Math.trunc (Object.keys(ItemBaseMap).length / 3 )
                
                if(index < valor) {

                        let FiltersTableReferences = {
                            id: comments.id,
                            content: comments.attributes.name,
                            url: comments.attributes.url,
                            reference:comments.reference,
                        
                        };     
                        ItemRandomMap.push(FiltersTableReferences);              
                }             
            }); 

                //ItemMap
                ItemBaseMap?.map((comments, index) => {   
                    
                    const valor = Math.trunc (Object.keys(ItemBaseMap).length / 1 )
                
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
        
            console.log([ItemMap, ItemRandomMap,  ItemRestMap ])
    }   
            setState([ItemMap, ItemRandomMap, ItemRestMap])
            setCaptureReport([ItemMap, ItemRandomMap, ItemRestMap])

    }, [ReferenceMap]);

    useEffect(() => {          

        setState(state)
        setCaptureReport(state)
  
      }, [state]);
  


  //console.log(state)
  
//   state.map((dataRef, index) => {
//     console.log(dataRef)

//   });  
 


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

        <Row justify="start" >
              <Col className="gutter-row" >
        <div className="grid grid-cols-1 gap-1 ">                
                <div className="col-span-6 sm:col-span-1 ">                  
                    <header className="relative">
                        <h1 className="font-display  text-xl tracking-tight text-slate-900 dark:text-white"> {NameCollection}</h1>
                        <p className="font-display text-sm font-medium text-blue-500"></p>
                    </header>                  
                </div>           
          </div>  
          </Col>                          
        </Row>
    <div style={{ display: "flex", justifyContent: "start", height: "100%" }}>

      {isMounted ? <div>
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
    <Row justify="start" gutter={[16, 24]} >
      <Col className="gutter-row" span={18}>
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            
            {state.map((el, ind) => (
              <Droppable key={uuid() } droppableId={`${ind}`} >
                {(provided, snapshot) => (
                  <div
                  className="overflow-hidden dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]"
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  
                  >
                    {el.map((item, index) => (
                      
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        
                      >
                        {(provided, snapshot) => (
                          
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                              {PrintMode && <Button className='bg-white'  type="text" shape="circle" 
                                    onClick={() => {
                                          const newState = [...state];
                                          newState[ind].splice(index, 1);
                                          setState( newState.filter(group => group.length) );                          
                                      }}                          
                            ><DeleteTwoTone twoToneColor='#eb2f96' /></Button>}
                            
                          
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around"
                              }}
                            >
                                {/* {item.url} */}
                                {item.url  && <ImgReference  key={item.url} url={item.url} UrlId={item.id} compact={true} />}                           
                            </div>

                          
                          
                        

                            {PrintMode && <Button type="link" 
                                        onClick={() => { doshowDrawer( item.reference), dogetSystemColor();   }} 
                                >{item.reference} 
                                </Button>}
                            
                          </div>
                        
                        )}
                      </Draggable>
                    
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
            
          </DragDropContext>
        </div>
      </Col>                          
       </Row> 
    </div> : null }
    </div>   
   
  </>

)
}