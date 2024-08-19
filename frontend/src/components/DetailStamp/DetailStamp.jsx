import  'flowbite'
import { useTasks } from "utils/ProviderContext";
import CardDescript from '@/components/Cards/DetailReference/CardDescript'
import { FormItemStampStatus } from '@/components/DetailStamp/FormItemStampStatus'
import { Button, Select } from 'antd';

const DetailStamp = ({ data, Composition, Size, Themes, Provider, ColorPantone, SimilarRef, Stamp, RefStampMap }) => {

    const { 
        dofetchReference,
        setStampsOpen,
        doshowDrawer,         
       } = useTasks();    

  const {gender, color, fabric, typeproduct} = Composition
 
  let Gender = gender?.data ? gender.data.attributes.name : 'null';
  let Color = color?.data ? color.data.attributes.codigo : 'null';
  let Fabric = fabric?.data ? fabric.data.attributes.name : 'null';
  let TypeProduct = typeproduct?.data ? typeproduct.data.attributes.name : 'null';  
  let Provide = Provider.data ? Provider.data.attributes.name : 'null';
  let COlorPantone = ColorPantone.data ? ColorPantone.data.attributes.name : 'null';
  let SimilarRefs = SimilarRef ? SimilarRef : 'null';
  let Theme = Themes ? Themes.attributes.name : 'null';
  let stamp = Stamp.data ? Stamp.data.attributes.name : 'null';
  
  let StampRef=[];

   
    RefStampMap.map((Stamp, index) => {    
        const RefStamp = Stamp.value== stamp ? Stamp: 'null'  
                
        RefStamp.reference?.map((Reference, index) => {  
        const StampReference = Reference ? Reference : undefined
        StampRef.push(StampReference);      
        });          
    });

  // console.log(StampRef)

  return (  
    
    <>   
      
    {/* Refencia */}
        <div className="grid grid-cols-4 gap-1">                        
                <div className="col-span-6 sm:col-span-4">                

                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0  px-2 rounded">
                        <div className="rounded-t mb-0 px-1 py-1 border-0">
                            <div className="flex flex-wrap items-center">                                
                                <div className="relative w-full px-1 max-w-full flex-grow flex-1 text-left ">
                                    <label 
                                        className=" text-blue-700 active:bg-white text-xl font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        >{stamp}
                                    </label >
                                    <label
                                        className="text-blue-700 active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        >Theme : {Theme}
                                    </label>
                                   
                                    
                                    <label
                                        className="text-blue-700  active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr- mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        > <FormItemStampStatus  /> 
                                    </label>
                                                            
                                </div>                   

                            </div>                        
                        </div>

                        <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                            <table className="items-center w-full bg-transparent border-collapse">

                                <thead className="thead-light">
                                <tr>                             
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Reference included
                                    </th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>                                   
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        
                                        {StampRef?.map((_datos) => ( 
                                            <Button type="link" 
                                            onClick={() => { dofetchReference( _datos ? _datos : '0'), 
                                                            doshowDrawer(  _datos ? _datos : '0'), 
                                                            setStampsOpen(true);  }} 
                                            >{_datos ? _datos :''} </Button> 
                                       
                                        ))} 
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        {/* <CardDescript /> */}
                    </div>

                </div>             
            </div> 
        
     
            
    </>
   
  )
}

export default DetailStamp