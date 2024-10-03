import  'flowbite'
import React,{ useEffect, useState} from "react";
import { Button, message, Upload, Form, Modal } from 'antd';
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api";
import LoadingModal from '@/components/Modal/loadingModal';

const  UploadIMG = () => {   
    const {        
        IdMaster,
        Referencia,
        dofetchReference, 
        setShowModalLoading,
        Drawings,
        setfileListIMG,
        fileListIMG,
        setSendUploadIMG,
        SendUploadIMG,            
       
       } = useTasks(); 
       

    const [fileList, setFileList] = useState([]);
    
    
        
  
     const onChangeIMG = ({ fileListIMG: newFileList }) => {
      setfileListIMG(newFileList);
      setSendUploadIMG(true);
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
//Modal Info de formato
      const [open, setOpen] = useState(false);
      const showModal = () => {
        setOpen(true);
      };
      const hideModal = () => {
        setOpen(false);
      };
 
  return (  
    
    <>   
        
        {Drawings.length<4 ? (

                       
            <div className="grid grid-cols-4 gap-1 m-0"> 
                <div className="col-span-6 sm:col-span-4 "> 
       
                <Form onFinish={async (values)=>{
                
                    try {                         
                       
                        const IdRegistro = IdMaster ? IdMaster : '0'

                        if(fileListIMG && fileListIMG[0].type != 'image/jpeg' ){  
                       
                            showModal();               
                            setSendUploadIMG(true);
                            setfileListIMG([]);
                            setShowModalLoading(false)
                            dofetchReference(Referencia ? Referencia : '0');
                            return ;                    
                        }

                        setShowModalLoading(true);

                        // console.log(IdRegistro);
                        // console.log(Referencia);

                        const formData = new FormData();
                        formData.append("files.drawings", fileListIMG[0]);     
                        formData.append("data", "{\"referencia\":\" "+  Referencia +" \"}");        
                        
                        const response = await fetch(`${getStrapiURL('/api/masters/')}${IdRegistro}`, {
                            method: "PUT",
                            body: formData,
                        }).then( async res => {                   
                
                            // console.log(await res.json()); 
                            
                            setSendUploadIMG(true);
                            setfileListIMG([]);                           
                            dofetchReference(Referencia ? Referencia : '0');
                           
                        });
                        
                        
                    
                    } catch (error) {
                    console.log("error", error)                
                    }     
                    

                }}
                >   
                <Form.Item 
                
                    name={"profilePicture"}     
                    rules={[
                        {
                        required:true,
                        message:"please upload"
                        },
                        // {
                        //     validator(_,fileList){

                        //         return new Promise((resolve, reject)=>{
                        //             if(fileList && fileList[0].size > 90000000){    
                        //                 reject('File size Exite');                            
                        //             }else{
                        //                 resolve("Success");    
                        //             }
                        //         });

                        //     }
                        // }
                    ]}
                    >
                        <div className="grid grid-cols-3 gap-1 m-6"> 
                        
                        <div className="col-span-6 sm:col-span-1 "> 
                        <Upload
                            
                            listType="picture-card"
                            fileList={fileListIMG}
                            onChange={onChangeIMG}
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
                                        setSendUploadIMG(true);

                                    }
                                });
                            }}

                            customRequest={(info)=>{                        
                                setfileListIMG([info.file])
                                setSendUploadIMG(false);
                            }}
                        >
                            {fileList.length <= 1 && 'IMG Upload'}
                        </Upload> 
                       
                        
                       
                        <Button disabled={SendUploadIMG} type="primary" htmlType='submit' block className=" bg-blue-700 ">Send</Button>
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

export default UploadIMG