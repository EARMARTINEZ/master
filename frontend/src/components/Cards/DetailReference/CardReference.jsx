import { useSession } from 'next-auth/react';

import  'flowbite'
import { useEffect, useState } from 'react'
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";

import { Card  } from 'antd';

import DetailReference from '@/components/Cards/DetailReference/DetailReference'
import ImgReference from '@/components/Cards/DetailReference/ImgReference'

import SearchReference from '@/components/Cards/DetailReference/SearchReference'
import {FormEditDrawer} from '@/components/Cards/CardForm/FormEdit/FormEditDrawer'
import NextPageReference from '@/components/Cards/DetailReference/NextPageReference'
import {FormPending} from '@/components/Cards/DetailReference/FormPending'

import CarouselReference from '@/components/Cards/Carousel/CarouselReference'
import UploadIMG from '@/components/Cards/UploadRerence/UploadIMG'
import UploadPDF from '@/components/Cards/UploadRerence/UploadPDF'
import PDFviewer from '@/components/Cards/CardPDF/PDFviewer'
import {FormComenta} from '@/components/Cards/DetailReference/FormComenta'


export function CardReferences({ children }) {
    return (
      <div className="">
        {children}
      </div>
    )
  }
  

export  function CardReference({ data }) {   
     
    
    const { 
        Referencia,      
        doMapDrawings,
        doMapDrawingsPDF,       
        Size,  
        Themes,     
        Composition,
        Provider,
        Color_pantone,
        SimilarRefs,
        Stamp,
        setSessionUser,
        setSessiontoMaker,
        setSessionUserCity,
       } = useTasks();   

       const { 
        dofindTypecomments,
        checkUser,      
         } = BasicTasks();
         
         const { data: session } = useSession();   
         const [TypeUser, setTypeUser] = useState("Reader");  
   
         useEffect(() => {      
          checkUser(  session ? session.user.email : '').then( ResMap => {    
              if(ResMap.length===1){     
                ResMap[0].Type ? setTypeUser( ResMap[0].Type) :setTypeUser("Reader")
                ResMap[0].username ? setSessionUser( ResMap[0].username) : setSessionUser( ResMap[0].username)
                ResMap[0].toMaker ? setSessiontoMaker( ResMap[0].toMaker) : setSessiontoMaker( ResMap[0].toMaker)
                ResMap[0].city ? setSessionUserCity( ResMap[0].city) : setSessionUserCity( ResMap[0].city)
              }  
            });        
            }, [session]);
      
        let isTypeUser = TypeUser === 'Editor'      

    let UrlDrawings= doMapDrawings();
    let UrlDrawingsPDF=doMapDrawingsPDF(); 
   
    useEffect(() => {            
        dofindTypecomments();        
  }, []); 

 return (

        <>
       <Card >  
        <div className="grid grid-cols-4 gap-1 m-0">                
                <div className="col-span-6 sm:col-span-1">  
                      {isTypeUser && <FormEditDrawer />   } 
                </div>             

                <div className="col-span-6 sm:col-span-1">  
                
                  <SearchReference />  
                                          
                </div> 

                <div className="col-span-6 sm:col-span-1">  
                    <NextPageReference  />
                </div>

                <div className="col-span-6 sm:col-span-1">  
                    <FormPending  />
                </div>
          </div>          
        </Card > 
             
        
        <DetailReference 
            data={Referencia} 
            Composition={Composition} 
            Size={Size}
            Themes={Themes}
            Provider={Provider}
            ColorPantone={Color_pantone}
            SimilarRef={SimilarRefs}
            Stamp={Stamp}        
        />

        
        
        {/* IMG Ref*/}
        <div id='ImgRef' className="grid grid-cols-4 gap-1">
        
            {UrlDrawings?.map((_datos) => (               
                <ImgReference  key={ _datos.id } url={_datos.url} UrlId={_datos.id} onActiveCarousel={true}/>                
            ))} 

           {isTypeUser && <UploadIMG />}       
        </div>

        {/*PDF*/}
        <div id='PDFRef' className="grid grid-cols-4 gap-1">     
            
            {UrlDrawingsPDF?.map((_datos) => ( 
                <PDFviewer key={ _datos.id } url={_datos.url} UrlId={_datos.id} />           
            ))}                  
                
            {isTypeUser && <UploadPDF />}
        </div>

        {/* Post Comment*/}
        <FormComenta />

        {/* */}
        <CarouselReference  />

        
        </>
  
  )
    }