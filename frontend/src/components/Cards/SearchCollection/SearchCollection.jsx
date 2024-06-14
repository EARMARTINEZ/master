import  'flowbite'
import {useState } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { Button, Drawer, Spin } from 'antd';
import {CardTableSearchCollection} from '@/components/Cards/SearchCollection/CardTableSearchCollection'


const SearchCollection = ({data}) => {

  const [loading, setLoading] = useState(false);
    
    const { dofetchCollection, CollectionMap } = useTasks();
    const [open, setOpen] = useState(false);

        const showDrawer = () => {           
              dofetchCollection();
              setOpen(true);
              setLoading(true);
        };
     
       const onClose = () => {
         setOpen(false);
       
       };


  return (  
    
    <>      
   
        
   <div className="grid grid-cols-2 gap-1 m-1">                        
        <div className="col-span-6 sm:col-span-">         
       

           <Button 
                type="primary" 
                onClick={() => showDrawer( ) }  
                className="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
            >Collection search
                        
            </Button>      
                
                
                <Drawer 
                    title="Close" 
                    placement="left" 
                    onClose={() => onClose( ) } 
                    open={open} 
                    size={'large'} 
                    width={500}
                    className="bg-gray-900"                     
                    
                    > 
                     {loading &&  CollectionMap.length > 1 ? (

                        <CardTableSearchCollection onClose={() => onClose() } />
                  ): (
                    <div className='mt-32 flex flex-col justify-center items-center'>
                      <Spin size="large" className='scale-200'/>
                    </div>
                  ) }

                </Drawer>                 
                  
                </div>             
            </div>        
      
    

            
    </>
   
  )
}

export default SearchCollection