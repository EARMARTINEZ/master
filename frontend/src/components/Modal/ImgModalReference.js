import { getStrapiURL } from "utils/api";  
import { useTasks } from "utils/ProviderContext";
import  'flowbite'

const ImgModalReference =({ data }) => {
  
  const { showImgModalReference, setShowImgModalReference, showUrlImg} = useTasks();
   
 
  return (
    <>
   
     
      {showImgModalReference ? (
        <>         
    
        {/* Main modal */}
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center " style={{background: 'rgba(0, 0, 0, 0.3)'}}>
          <div className="bg-white border py-2 px-10 rounded-lg flex items-center flex-col">
          <div className="grid grid-cols-4 gap-1"> 

                <div className="col-span-1 sm:col-span-4 ">
                    
                    <div className="max-w-xl ">
                    
                            <img onClick={() => setShowImgModalReference(false) } src={showUrlImg} 
                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." 
                            className="scale-75 hover:scale-110 ease-in duration-500" />
                                        
                    </div>
                </div> 

            </div>                 
          </div>
        </div> 
        
      
          
        </>
      ) : null}
    </>
  );
};

export default ImgModalReference;