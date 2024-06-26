import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect, useState  } from "react";
import {getStrapiURL} from "utils/api";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { Drawer, Card, Spin } from 'antd';
import SearchReference from '@/components/Cards/DetailReference/SearchReference'
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import FiltersTable from '@/components/Cards/DetailReference/FiltersTable'
import {SessionUser} from '@/components/Cards/DetailReference/SessionUser'
import useFetchCollection from '@/components/Cards/useFetchCollection'

export function CardTableSearchReferences({ children }) {
    return (
      <div className="">
        {children}
      </div>
    )
  }


export default function CardTableSearchReference() {

    const { data: session } = useSession();

    const {
      IdCollection,
      NameCollection,     
      setOpen,
      open,
      StampsOpen,
      onCloseStamps, 
      FiltersReferenceMap, 
      fetchData,    
    } = useTasks()

    const {
    dofindGender,
    } = BasicTasks();

    const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //   //OBTENEMOS EL ID DE LA COLLECION QUE SE ENCUENTRA EN EL LOCALSTORAGE
  //   let idCollectionInLocalStorage = localStorage.getItem("IdCollection");
  //   if(idCollectionInLocalStorage === null){
  //     const lastCol = await dofetchIDCollection();
  //     dogetCollectionReference('29');
  //   }else{
  //     dogetCollectionReference(idCollectionInLocalStorage);
  //   }
  // }, [IdCollection]);

    useFetchCollection(IdCollection);
   
   
    useEffect(() => {
      if (FiltersReferenceMap.length > 0) {
        setLoading(true);
      }
    }, [FiltersReferenceMap]);

    const onClose = () => {
      setLoading(true);
        fetchData();
      setOpen(false);
    };

    return (

     
    <>
       {/* Tabla COLLECTION REFERENCE  */}
        <div className="grid grid-cols-4 gap-1 m-0">
                <div className="col-span-6 sm:col-span-1">
                <header className="mb-9 space-y-1">
                    <h1 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white"> {NameCollection} </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                </header>

                </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-1 m-5">
                <div className="col-span-6 sm:col-span-1">

                <SearchReference />

                </div>
          </div>                     */}
           {loading && FiltersReferenceMap.length > 1
          ? (
            
            <FiltersTable />
          ): (
            <div className='mt-32 flex flex-col justify-center items-center'>
              <Spin size="large" className='scale-200'/>
            </div>
          ) }
          <Drawer
              title="Close"
              placement="right"
              onClose={() => onClose( ) }
              open={open}
              size={'large'}
              width={2000}
              className="bg-gray-900"
              >
              <CardReference  />
          </Drawer>
            <Drawer
                title="Close"
                placement="right"
                onClose={() => onCloseStamps( ) }
                open={StampsOpen}
                size={'large'}
                width={2000}
                className="bg-gray-900"
                >
                <CardStamp  />
            </Drawer>
    </>

  )
}