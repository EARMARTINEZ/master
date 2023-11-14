import  'flowbite'
import React,{ useState} from "react";
import { Button, Modal, Upload, Form  } from 'antd';
import {  ExclamationCircleTwoTone } from '@ant-design/icons'
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api";
import LoadingModal from '@/components/Modal/loadingModal';

const  UploadPDF = () => {   
    const {
        IdMaster,
        Referencia,
        dofetchReference, 
        setShowModalLoading,
        DrawingsPDF, 
        setFileListPDF,
        fileListPDF,
        setSendUploadPDF,
        SendUploadPDF,
       
       } = useTasks(); 
       

    const [fileList, setFileList] = useState([]);
   
   
    
  
     const onChangePDF = ({ fileListPDF: newFileList }) => {
             setFileListPDF(newFileList);
             setSendUploadPDF(true);
        };   
      
      const onPreview = async (file) => {
        let src = file.url;
        
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
            
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
        
      };


      const [open, setOpen] = useState(false);
      const showModal = () => {
        setOpen(true);
      };
      const hideModal = () => {
        setOpen(false);
      };
 
  return (  
    
    <>          
     

    {DrawingsPDF.length<2 ? (

        <div className="grid grid-cols-1 gap-1 m-0"> 
            <div className="col-span-6 sm:col-span-1 "> 
            
            <Form onFinish={async (values)=>{

                try {

                   
                    const IdRegistro = IdMaster ? IdMaster : '0'              

                     if(fileListPDF && fileListPDF[0].type != 'application/pdf' ){  
                       
                        showModal();               
                        setSendUploadPDF(true);
                        setFileListPDF([]);
                        setShowModalLoading(false)
                        dofetchReference(Referencia ? Referencia : '0');
                        return ;                    
                    }

                    setShowModalLoading(true); 

                    //console.log(fileListPDF[0].type);                 
                    //console.log(Referencia);

                    const formData = new FormData();
                    formData.append("files.drawingsPDF", fileListPDF[0]);     
                    formData.append("data", "{\"referencia\":\" "+  Referencia +" \"}");        
                    
                    const response = await fetch(`${getStrapiURL('/api/masters/')}${IdRegistro}`, {
                        method: "PUT",
                        body: formData,
                    }).then( async res => {                   
            
                        console.log(await res.json());   
                        
                        setSendUploadPDF(true);
                        setFileListPDF([]);
                        dofetchReference(Referencia ? Referencia : '0');
                    });
                    
                    
                
                } catch (error) {
                console.log("error", error)                
                }     
                

            }}
            >   
            <Form.Item 
            
                name={"uploadPDF"}     
                rules={[
                    {
                    required:true,
                    message:"please upload"
                    },
                    {
                        validator(_,fileListPDF){

                            return new Promise((resolve, reject)=>{
                                if(fileListPDF && fileListPDF[0].type === 'application/pdf' ){    
                                    reject('File size Exite');                            
                                }else{
                                    resolve("Success");    
                                }
                            });

                        }
                    }
                ]}
                >
                    <div className="grid grid-cols-3 gap-1 m-6"> 
                    
                    <div className="text-blue-700 col-span-6 sm:col-span-1 "> 
                    <Upload
                        
                        listType="picture-card"
                        fileList={fileListPDF}
                        onChange={onChangePDF}
                        onPreview={onPreview}
                        showUploadList={{showPreviewIcon:false, showRemoveIcon:true}}
                        maxCount={1}
                        className="text-blue-700 text-sm font-bold"

                        beforeUpload={(file)=>{
                            return new Promise((resolve, reject)=>{
                                if(file.size>90000000){
                                    reject('File size Exite');
                                    message.error(`${info.file.name} file upload failed.`);
                                }else{
                                    resolve("Success");
                                    setSendUploadPDF(true);

                                }
                            });
                        }}

                        customRequest={(info)=>{                        
                            setFileListPDF([info.file])
                            setSendUploadPDF(false);
                        }}
                    >
                        {fileList.length <= 1 && 'PDF Upload'}
                    </Upload> 
                    
                    
                  
                    <Button disabled={SendUploadPDF} type="primary" htmlType='submit' block className=" bg-blue-700 ">Send</Button>
                    </div>  
                    
                    </div>    
            </Form.Item>
            

            </Form> 

            </div>       
        </div>


    ) : null}   
   
  
           
   <LoadingModal /> 


    <Modal
        title="Info: invalid format"
        open={open}
        onOk={hideModal}
        onCancel={hideModal} 
        footer={null}     
     
      >       
        <p className='text-amber-500'>The file you are trying to upload is not a valid format.</p>
       
      </Modal> 
    </>
   
  )
}

export default UploadPDF