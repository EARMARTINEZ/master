import  'flowbite'

import {useEffect, useState } from "react"; 
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";

import ReporViewer from '@/components/Catalog/ReporViewer'
import { PDFViewer } from '@react-pdf/renderer';



const ReporCollectionPdf = () => {

  const { 
    NameCollection,   
   } = useTasks(); 
   
   const {    
    PrintMode,
    doReportCapture,
    setPrintMode,
   
    setCaptureReport,          
   } = BasicTasks();
   
   const [isMounted, setIsMounted] = useState([]);
   

// useEffect(() => {   
 
//   let RespReport = doReportCapture();  
//     RespReport.then( Resp => {    
//       const { CaptureReportState } = Resp.data.attributes; 
      
//       setIsMounted(CaptureReportState);

//       console.log(CaptureReportState);
      
//     });     
   


// }, []);

 return (  
    
  <>    
 {/* <PDFViewer height={600} width={600} >

   <ReporViewer CaptureR={isMounted} />
   
   
  </PDFViewer> */}

  </>
   
  )
}

export default ReporCollectionPdf
