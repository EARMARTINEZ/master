import  React, {useEffect, useState, useCallback  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Collapse, Card, List, Form, Divider   } from 'antd';


export function StatisticsGender ({Producto, Part}) {

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
                    key={index}
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

