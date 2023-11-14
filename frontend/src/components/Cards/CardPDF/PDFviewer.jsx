import  'flowbite'
import React,{ useState, useEffect, useRef } from "react";
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api";
import { Viewer, Worker, handleDocumentLoad, SpecialZoomLevel  } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Button, Modal, Card, Space, Row  } from 'antd';
import {  ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons'
import LoadingModal from '@/components/Modal/loadingModal';

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'


const  PDFviewer =  ({url, UrlId}) => {   
    
    const {   
        DrawingsPDF,
        setShowModalLoading, 
        doDeleteImgReference,
        Referencia,
        dofetchReference,       
       
       } = useTasks(); 

   
       const defaultLayoutPluginInstance = defaultLayoutPlugin();
       
       const { confirm } = Modal;

       const showConfirm = (IdIMG) => {
         confirm({        
           title: 'Do you want to delete these items?',
           icon: <ExclamationCircleFilled />,
           content: '',
           okText: 'Yes',
           okType: 'danger',
           cancelText: 'No',
   
           onOk() {
             setShowModalLoading(true);
             
             doDeleteImgReference(IdIMG);            
          
             console.log('OK' + IdIMG);
           },
           onCancel() {
             console.log('Cancel');
           },
         });
       };
 
    return (  
    
    <>     
    {DrawingsPDF ? (          
      
        <div   id={UrlId} className="col-span-6 sm:col-span-2">
            <div  className="relative h-100 w-full overflow-hidden  bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-100">
                    
                <Row gutter={16}>
                <Space direction="vertical" bordered={false} size={16}>
                    <Card
                        title=""
                        bordered={false}
                        style={{                   
                            color: '#1a2656',               
                            fontSize: '16px',
                        }}
                    >
                         <Button className='bg-white'  type="text" shape="circle" onClick={() => showConfirm( UrlId) } ><DeleteTwoTone twoToneColor='#eb2f96' /></Button>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js">
                            <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '500px',
                                width:'450px',
                            }}
                            >
                            <Viewer 
                                theme='dark' 
                                defaultScale={SpecialZoomLevel.PageFit}
                                fileUrl={url} 
                                plugins={[defaultLayoutPluginInstance]}
                                onDocumentLoad = { handleDocumentLoad }                 
                                />
                            </div>
                        </Worker>
                
                    </Card>
                </Space>
                </Row>    
                
                
                {/* <div >
                    <object >
                        <br />
                        <a target="_blank" href="https://backend.emmanuelruiz.website/uploads/124_PANTONES_6ccbaef45d.pdf" id="enlaceDescargarPdf"
                        download="ReactJS.pdf"
                        >Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo</a>
                    </object>
                </div> */}
        </div>
        </div>
     
   
     ) : null} 

    <LoadingModal />             
 
    </>
   
  )
};

export default PDFviewer