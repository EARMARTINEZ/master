import  'flowbite'
import {useEffect, useState } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import DetailStamp from '@/components/DetailStamp/DetailStamp'
import ImgReference from '@/components/Cards/DetailReference/ImgReference'
import SearchReference from '@/components/Cards/DetailReference/SearchReference'
import CarouselStamp from '@/components/Cards/Carousel/CarouselStamp'
import UploadIMG from '@/components/Cards/UploadRerence/UploadIMG'
import UploadPDF from '@/components/Cards/UploadRerence/UploadPDF'
import PDFviewer from '@/components/Cards/CardPDF/PDFviewer'
import {FormComenta} from '@/components/Cards/DetailReference/FormComenta'
import {StampFormPending} from '@/components/DetailStamp/StampFormPending'
import {StampFormComenta} from '@/components/DetailStamp/StampFormComenta'
import NextPageStamp from '@/components/DetailStamp/NextPageStamp'
import { LoadingOutlined } from '@ant-design/icons';
import {Spin  } from 'antd';


export  function CardStamp({ data }) {   
     
    
    const { 
        IdCollection,
        Referencia,   
        Size,  
        Themes,     
        Composition,
        Provider,
        Color_pantone,
        SimilarRefs,
        Stamp,
        filtersStampsMap,
        dofindStamps,        
       } = useTasks();   

       const { 
        dofindTypecomments       
         } = BasicTasks();   

    const [StampPicture, setStampPicture] = useState([]);

    
    useEffect(() => {
        dofindTypecomments(); 
    }, []);    
       
        useEffect(() => { 
            dofindStamps();            
        }, [Referencia]); 

        useEffect(() => {   
            setStampPicture(Stamp.data ? Stamp.data.attributes.picture.data: null);
            }, [Stamp]); 

 return (

        <>
       <div className="grid grid-cols-3 gap-1 m-0">  
            <div className="col-span-6 sm:col-span-1">  
                <NextPageStamp />  
            </div>
        </div> 


        {/* Pending  */}
        <StampFormPending />                 
        
        {filtersStampsMap.length >= 1
          ? (
        <DetailStamp 
            data={Referencia} 
            Composition={Composition} 
            Size={Size}
            Themes={Themes}
            Provider={Provider}
            ColorPantone={Color_pantone}
            SimilarRef={SimilarRefs}
            Stamp={Stamp} 
            RefStampMap={filtersStampsMap}       
        />

    ): (
        <div className='mt-32 flex flex-col justify-center items-center'>
        <Spin indicator={<LoadingOutlined spin />} size="large" className='scale-200'/>
        </div>
    ) }   

        {/* IMG Ref*/}
        <div id='ImgStampPicture' className="grid grid-cols-4 gap-1">

        <div className="col-span-6 sm:col-span-1">  
                { StampPicture?.map((picture_url) => (          
                <ImgReference  key={ picture_url.attributes.url} url={picture_url.attributes.url} UrlId={picture_url.id} />                             
                 ))} 

                {/* <UploadIMG />        */}
            </div>
        
           

            <div className="col-span-6  sm:col-span-3 m-12">  
                 {/* Post Comment*/}
                    <StampFormComenta />
            </div>
        </div>      

       

        {/* */}
        <CarouselStamp  StampPicture={StampPicture} />

        
        </>
  
  )
    }