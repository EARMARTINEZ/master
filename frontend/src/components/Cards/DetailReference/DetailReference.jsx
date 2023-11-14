import  'flowbite'
import { useTasks } from "utils/ProviderContext";
import CardDescript from '@/components/Cards/DetailReference/CardDescript'
import {  FormItemStatus } from '@/components/Cards/DetailReference/FormItemStatus'
import {ExportZipDrawind} from '@/components/ExporImg/ExportZipDrawind'
import { Button } from 'antd';

const DetailReference = ({ data, Composition, Size, Themes, Provider, ColorPantone, SimilarRef, Stamp }) => {
   
    const { 
        doShowStampsDrawer, 
        setOpen,        
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

  let CodigoSizes=[];

    Size.map((Sizes, index) => {      
        const IdSizes = Sizes.attributes ? Sizes.attributes.name : 'null'        
        CodigoSizes.push(IdSizes);     
    });

    //console.log(Provider);

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
                                        >Ref : {data}
                                    </label >
                                    <label
                                        className="text-blue-700 active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        >Product : {TypeProduct}
                                    </label>
                                    <label
                                        className="text-blue-700 active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        >Gender : {Gender}
                                    </label>  
                                    
                                    <label
                                        className="text-blue-700  active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr- mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        > <FormItemStatus  /> 
                                    </label>

                                    <label
                                        className="text-blue-700  active:bg-white text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr- mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        >  <ExportZipDrawind />    
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
                                        Provider
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Fabric
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Color
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Sizes
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Theme
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        System Color
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Similar Ref
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Stamp
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {Provide}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {Fabric}
                                        </td>                                
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">                                    
                                            {COlorPantone}                             
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {CodigoSizes.join('-')}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {Theme}
                                        </td>   
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                            <div 
                                                className="h-5 w-5 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full" 
                                                style={{backgroundColor: Color}} />

                                                {/* <div className="h-2.5 w-2.5 rounded-full bg-pink-300 mr-2"></div> Pink 5 */}
                                            </div>
                                        </td>                               
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {SimilarRefs}
                                        </td>  
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <Button type="link" 
                                            onClick={() => {  
                                                setOpen(false),
                                                doShowStampsDrawer(false, data) }} 
                                            >{stamp ? stamp :''} </Button>
                                        </td>                                     
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        <CardDescript />
                    </div>

                </div>             
            </div> 
        
     
            
    </>
   
  )
}

export default DetailReference
