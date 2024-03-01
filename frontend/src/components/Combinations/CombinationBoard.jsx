import React, { useEffect, useState } from 'react';
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

const initialImages = [
  { id: '1', src: 'https://devmaster.epkweb.com/uploads/1151137_93c9a0b1b6.png' },
  { id: '2', src: 'https://devmaster.epkweb.com/uploads/1151177_406de3e71a.png' },
  { id: '3', src: 'https://devmaster.epkweb.com/uploads/1160060_a6eda7cc85.png' },
  { id: '4', src: 'https://devmaster.epkweb.com/uploads/1160778_46567fa29f.png' },
  { id: '5', src: 'https://devmaster.epkweb.com/uploads/1151132_371415a5d4.png' },
  { id: '6', src: 'https://devmaster.epkweb.com/uploads/1160147_c4a752f13b.png' },
  { id: '7', src: 'https://devmaster.epkweb.com/uploads/1160115_b57b07f9b8.png' },
  { id: '8', src: 'https://devmaster.epkweb.com/uploads/1160054_bb15dbe48f.png' },

];


  
  

export function CombinationBoard() {

  const {
    doDivideEnPartesIguales,    
   
  } = BasicTasks();  

  const [selectedImages, setSelectedImages] = useState([]);
  const [availableImages, setAvailableImages] = useState([]);
  const [state, setState] = useState([]);

//   console.log(availableImages)
  
//   console.log(selectedImages)

  useEffect(() => {          

    setAvailableImages(initialImages)
   
    const PartesIgualesArray = doDivideEnPartesIguales(selectedImages);

    setState(PartesIgualesArray)

  }, []);


  const handleDragEnd = (result) => {

    // console.log(result)
    if (!result.destination) return;

    const { source, destination } = result;

    let sourceList, destinationList;

    if (source.droppableId === 'selectedImages') {
      sourceList = selectedImages;
    } else if (source.droppableId === 'availableImages') {
      sourceList = availableImages;
    }

    if (destination.droppableId === 'selectedImages') {
      destinationList = selectedImages;
    } else if (destination.droppableId === 'availableImages') {
      destinationList = availableImages;
    }
 
    console.log(selectedImages)

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setAvailableImages([...availableImages]);
    setSelectedImages([...selectedImages]);
  };

  

  return (
    <div className="flex">
      <DragDropContext onDragEnd={handleDragEnd}>   
        {/* Lado izquierdo */}
         <div className="w-80 "> 
        
          <Droppable droppableId="selectedImages" >
            {(provided) => (                      
             <div  
                className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-1 gap-y-1 px-4 lg:max-w-8xl lg:grid-cols-3  border-2  h-[calc(60vh-4.5rem)] overflow-y-auto overflow-x-hidden py-2 pl-0.5"
                {...provided.droppableProps} 
                ref={provided.innerRef}
                >
                   {/* Marca de agua */}
                    <div className="absolute top-48 left-3 text-gray-400 font-bold text-4xl opacity-25 pointer-events-none z-10">
                    COMBINATION
                    </div>       
                {selectedImages.map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided) => (
                       <div  className=""                            
                         ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}                    
                       >                             
                          <img src={image.src} alt={`Available ${index + 1}`} style={{ width: 150 }} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
              
            )}
          </Droppable>
          </div>
          
        {/* Lado derecho */} 
          <div className="w-96 ml-n2">        
            <Droppable key={uuid() } droppableId={`availableImages`} >
                {(provided) => (
                <div 
                className="mx-auto grid max-w-2xl grid-cols-1  gap-x-1 gap-y-1 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-1 xl:px-12 border-0  h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-0 pl-0.5"
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                >
                    {availableImages.map((image, index) => (
                        <Draggable key={image.id} draggableId={image.id} index={index}>
                            {(provided, snapshot) => (
                            <div  className=""                          
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}                            
                            >                                                    
                                   <img src={image.src} alt={`Available ${index + 1}`} style={{ width: 150 }} />
                                                          
                            </div>
                            )}
                        </Draggable>
                    ))}                  
                    {provided.placeholder}     
                </div>
                )}
            </Droppable>     
          </div> 
      
      </DragDropContext>
    </div>
  );
}
