import  'flowbite'
import  React, {useEffect, useState } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { getStrapiURL, fetchAPI, getCollectionNavigation } from "utils/api"; 
import { DownloadOutlined  } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import JSZip from "jszip";
import {saveAs} from "file-saver";

export function ExportZipImg() {   

  const {IdCollection, Referencia, ReferenceMap, doUpdateStatusReference } = useTasks();

  
    
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [RefNavigation, setRefNavigation] = useState([]);
    let ReferenceNavigation = [];

    const [loadings, setLoadings] = useState([]);
    const [disabled, setdisabled] = useState(true);
    const enterLoading = (index) => {

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });

      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;          
        
         
          return newLoadings;
        });
      }, 6000);
    };

    const getFiles = async () => {
      const res = await fetch("/api/files");
      const files = await res.json();
  
      setFiles(files);
    };

    useEffect( () => {

      getCollectionNavigation({
        NCollection: IdCollection ? IdCollection : '0' , //28 29          
      }).then( keys => {                 
        
            keys.masters.data?.map((dataRef, index) => { 
             
                dataRef.attributes.drawings.data?.map((_ImgRef) =>  {                                
                                  
                      const dataObj = {
                        name: _ImgRef.attributes.name,
                        url:  getStrapiURL(_ImgRef.attributes.url),
                        type: "jpg",
                    }  
                    ReferenceNavigation.push(dataObj );
                }) 

                dataRef.attributes.drawingsPDF.data?.map((_ImgRef) =>  {                                
                                  
                  const dataObj = {
                    name: _ImgRef.attributes.name,
                    url:  getStrapiURL(_ImgRef.attributes.url),
                    type: "pdf",
                }  
                ReferenceNavigation.push(dataObj );
            })                       
                    
            });  
                 
     
            setRefNavigation([...ReferenceNavigation]); 
    }); 

  }, [IdCollection]); 

  //console.log(RefNavigation)
  
  useEffect(() => {
    RefNavigation.length>1 ? setdisabled(false) : setdisabled(true);
}, [RefNavigation]);
  

    const downloadResourcesOnClick = async () => {
        setLoading(true);
        try {
          const zip = new JSZip();
          const remoteZips = RefNavigation.map(async (file) => {
            const response = await fetch(file.url);
            const data = await response.blob();
            zip.file(`${file.name}.${file.type}`, data);
    
            return data;
          });
    
          Promise.all(remoteZips)
            .then(() => {
              zip.generateAsync({ type: "blob" }).then((content) => {
                // give the zip file a name
                saveAs(content, "zip-download.zip");
              });
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
    
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      
  return (
  <>

<div className="grid grid-cols-1 gap-1 m-0">      
          <div className="col-span-6 sm:col-span-1  ">    

          <Space direction="vertical">    

          <Space wrap>    
              <Button
              type="link"
              icon={<DownloadOutlined  />}
              loading={loadings[1]}
              disabled={disabled}
              className="rounded bg-sky-100 py-0 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
              onClick={ () => {
                  enterLoading(1);
                  downloadResourcesOnClick()
                
                  }}
              >
            Export to Drawing
              </Button>
          </Space>
          </Space>  
        
       

        </div>     
    </div> 
  </>

)
}