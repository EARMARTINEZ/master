import  'flowbite'
import React, {useEffect, useState, use} from "react"; 
import { UploadOutlined, InboxOutlined  } from '@ant-design/icons';
import { Button, message, Upload, Form, Input } from 'antd';
import { useTasks } from "utils/ProviderContext";
import { fetchAPI } from "utils/api";  


const  UploadRerence = () => {   
    const {        
        Drawings,
        showModal,
        setIsModalOpen,
        isModalOpen,          
       
       } = useTasks();

       const [fileList, setfileList] = useState([]);

       const { Dragger } = Upload;
       const props = {
       
        onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };
      
 
  return (  
    
    <>      
   
        
   <div className="grid grid-cols-4 gap-1 m-0">        
        <div className="col-span-6 sm:col-span-4 ">  

       
        
        <Form onFinish={async (values)=>{
           console.log(values);

            const Nreferencia = '25'

            const formData = new FormData();
            formData.append("files.pantones", fileList[0]);     
            formData.append("data", "{\"name\":\"Spring-Summer 2022\"}");        
            const res = await fetch("https://devmaster.epkweb.com/api/collections/"+Nreferencia, {
                method: "PUT",
                body: formData,
            }).then((res) =>  console.log(res.json()));           
          }}
         >   
        <Form.Item 
           
            name={"profilePicture"} 
            valuePropName='fileList'
            getValueFromEvent={(event)=>{
                return event?.fileList;
            }}
        rules={[
            {
            required:true,
            message:"please upload"
            },
            {
                validator(_,fileList){

                    return new Promise((resolve, reject)=>{
                        if(fileList && fileList[0].size > 9000000){    
                            reject('File size Exite');                            
                        }else{
                            resolve("Success");    
                        }
                    });

                }
            }
        ]}
        >      


            {/* <Upload 
             {...props}
            maxCount={1}
            beforeUpload={(file)=>{

                return new Promise((resolve, reject)=>{
                    if(file.size>9000000){
                        reject('File size Exite');
                        message.error(`${info.file.name} file upload failed.`);
                    }else{
                        resolve("Success");

                    }
                });
            }}
            
            customRequest={(info)=>{ 
                setfileList([info.file])
             }}
            showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              {fileList[0]?.name}
            </Upload> */}

            <Dragger 
                {...props}
                
                maxCount={1}
                beforeUpload={(file)=>{

                    return new Promise((resolve, reject)=>{
                        if(file.size>9000000){
                            reject('File size Exite');
                            message.error(`${info.file.name} file upload failed.`);
                        }else{
                            resolve("Success");

                        }
                    });
                }}

                customRequest={(info)=>{ 
                    setfileList([info.file])
                }}
                showUploadList={false}
            >
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                {fileList[0]?.name}
                </p>
            </Dragger>
         
         </Form.Item>
         
         <Button type="primary" htmlType='submit' block>Submit</Button> 
        </Form>  


                    
         </div>       
   </div>          
           
            
    </>
   
  )
}

export default UploadRerence