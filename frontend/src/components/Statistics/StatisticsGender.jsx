import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Collapse, Card, List, Form, Divider, Accordion  } from 'antd';


const Comenta = ({Producto, Part}) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <ul>
            {Part?.map((itemPart, index) => (
                <li key={index} className="mb-4 ">
                    <span className="subtitle text-xl">{itemPart.value}</span>                  

                    <div className="mt-2">
                        {Producto?.map((itemProduct, productIndex) => (
                            itemProduct.part === itemPart.value && (
                                <div key={productIndex} className="mb-4">
                                    <div
                                        className="border-b-2 border-gray-200 py-2 flex justify-between cursor-pointer"
                                        onClick={() => toggleAccordion(productIndex)}
                                    >
                                        <div>
                                            {`${itemProduct.productname}/${itemProduct.typeProductLength}/${itemProduct.totalLength}%`}
                                        </div>
                                        <div>
                                            {activeIndex === productIndex ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-gray-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 15l7-7 7 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-gray-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    {activeIndex === productIndex && (
                                        <div className="mt-2">
                                            {/* Aquí puedes renderizar el contenido que deseas mostrar */}
                                            {/* Por ejemplo, una lista de elementos */}
                                            <ul className="border border-gray-200">
                                                {itemProduct.ArryFilter?.map((itemReference, referenceIndex) => (
                                                    <li key={referenceIndex} className="py-2 px-4 border-b border-gray-200">
                                                        <div>
                                                            <strong className="font-semibold">Ref:</strong>{' '}
                                                            <a href={`#`} className="text-blue-500">{itemReference.attributes?.referencia}</a>
                                                        </div>
                                                        <div>
                                                            <strong className="font-semibold">Theme:</strong>{' '}
                                                            {itemReference.attributes?.theme?.data?.attributes?.name || null}
                                                        </div>
                                                        <div>
                                                            <strong className="font-semibold">Color:</strong>{' '}
                                                            {itemReference.attributes?.color_pantone?.data?.attributes?.name || null}
                                                        </div>
                                                        <div>
                                                            <strong className="font-semibold">Fabric:</strong>{' '}
                                                            {itemReference.attributes?.Composition?.fabric?.data?.attributes?.name || null}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
  };

export function StatisticsGender ({Producto, Part}) {
    // const items = [
    //     {
    //       key: '1',
    //       label: 'Comments',
    //       children: <Comenta Producto={Producto} Part={Part} />
    //     },
        
    //   ];
   
    return (
        <>
     {/* <Collapse items={items} defaultActiveKey={['1']}  />  */}

   <Comenta Producto={Producto} Part={Part} />
  
      </>
  
    )
  };

