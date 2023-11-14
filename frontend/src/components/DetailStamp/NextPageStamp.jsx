import  'flowbite'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react"; 
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import {getStrapiURL, getCollectionStamps} from "utils/api";
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { linstance } from "utils/axioapi";


const NextPageStamp = () => {   
    
    const { 
        Referencia,
        dofetchReference,
        IdCollection,
        FiltersReferenceMap,
        isSubmitting,
        setShowModalLoading,
       } = useTasks();

      // console.log(FiltersReferenceMap);
       let ReferenceNavigation = [];
       const [loadings, setLoadings] = useState(Referencia);
       const [RefNavigation, setRefNavigation] = useState([]);

         useEffect(() => {
              setLoadings(Referencia);
            }, [Referencia]);

         useEffect( () => {

          getCollectionStamps({
                    NCollection: IdCollection ? IdCollection : '0' , //28 29        
                  }).then( keys => {                 
                    
                        keys.stamps.data?.map((dataRef, index) => {    
                            const dataObj = {
                                title: dataRef.attributes.name,
                                href: dataRef.attributes.masters.data[0].attributes.referencia,
                            }
                            ReferenceNavigation.push(dataObj );
                        });
                 
                        setRefNavigation([...ReferenceNavigation]); 
                }); 

              }, [IdCollection]);  
              
              

        const navigation = [{ links:RefNavigation, },]


        let router = useRouter()
        let allLinks = navigation.flatMap((section) => section.links)
        let linkIndex = allLinks.findIndex((link) => link.href === loadings)
        let previousPage = allLinks[linkIndex - 1]
        let nextPage = allLinks[linkIndex + 1]
        let section = navigation.find((section) =>
            section.links.find((link) => link.href === router.pathname)
        )
   
   
  return (  
    
    <>      
   
        
   <div className="grid grid-cols-4 gap-1 m-1">        
   
     
            { previousPage && (
              <div className="col-span-6 sm:col-span-1"> 
              
              
                <Button 
                type="dashed" 
                icon= {<CaretLeftFilled />}
                    onClick={() => { 
                        dofetchReference(previousPage.href ? previousPage.href : '1240001');
                        setLoadings(previousPage.href)    
                    }}  
                    className="text-blue-700">{previousPage.title}</Button>

                 
                
              </div>
            )}

            { nextPage && (
               <div className="col-span-6 sm:col-span-1">                
                 
                  <Button 
                  type="dashed" 
                  //icon= {<CaretRightFilled />}
                    onClick={() => { 
                        dofetchReference(nextPage.href ? nextPage.href : '1240001');
                        setLoadings(nextPage.href)        
                    }}  
                    className="text-blue-700">{nextPage.title}<CaretRightFilled /></Button>
                
              </div>
            )}
      
  
                  
               
  </div>        
      
    

            
    </>
   
  )
}

export default NextPageStamp