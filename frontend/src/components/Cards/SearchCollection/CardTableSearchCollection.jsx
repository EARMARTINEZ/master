import  'flowbite'
import { useTasks } from "utils/ProviderContext";

export function CardTableSearchCollection({onClose}) {
   
    
    const {
        dogetCollectionReference,
        dofetchIDCollection,         
        CollectionMap,       
        setIdCollection,
        setIdPrefixCollection,
        setNameCollection,

       } = useTasks();      
  
    return (
    <>
  <div className="grid grid-cols-4 gap-1">                        
    <div className="col-span-6 sm:col-span-4">  
     
     
     {/* Tabla COLLECTION REFERENCE  */}
     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0  rounded">
        <div className="rounded-t mb-0 px-4 py-1 border-0"> 
                 
        </div>
            <div className="block w-full overflow-x-auto my-10">
                <table className="items-center w-full bg-transparent border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    
                    <th scope="col" className="px-6 py-3">
                    COLLECTION
                    </th>
                   
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody>
                {CollectionMap.map((_datos) => (
                
                    <tr key={_datos.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">        
                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {_datos.attributes.name}
                    </th>
                   
                  
                  
                    <th className="px-6 py-1">
                       
                        <button 
                        type="primary" 
                        onClick={() => {   
                          
                          //setIdCollection(_datos.id),
                          dogetCollectionReference(_datos.id),
                          dofetchIDCollection(_datos.id),                        
                          setIdPrefixCollection( `${_datos.attributes.collection_type.data.attributes.prefix_id}${_datos.attributes.prefix_id}`),
                          setNameCollection(_datos.attributes.name),
                          onClose();
                        }}  
                        
                        className=" text-blue-600 ">{_datos.attributes.collection_type.data.attributes.prefix_id}{_datos.attributes.prefix_id}
                            
                        </button>
                      </th>            
                    </tr>

                ))}
                </tbody>
                </table>             
                
             

            </div>
       </div>     
      
      
      </div>             
    </div> 
    </>
  
  )
    }