import { useSession } from 'next-auth/react';

import  'flowbite'
import {useEffect } from "react";
import {getStrapiURL} from "utils/api";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { Drawer, Card } from 'antd';
import SearchReference from '@/components/Cards/DetailReference/SearchReference'
import {CardReference} from '@/components/Cards/DetailReference/CardReference'
import {CardStamp} from '@/components/DetailStamp/CardStamp'
import FiltersTable from '@/components/Cards/DetailReference/FiltersTable'
import {SessionUser} from '@/components/Cards/DetailReference/SessionUser'


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
      dogetCollectionReference,
      dofetchIDCollection,
      dogetSystemColor,
      onClose,
      open,
      StampsOpen,
      onCloseStamps,
      checkUser,
      SessionUser,
      doGetLastCollection,
    } = useTasks()

    const {
    dofindGender,
    } = BasicTasks();


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

  useEffect(() => {
    const fetchData = async () => {
      let idCollectionInLocalStorage = localStorage.getItem('IdCollection')
      if (idCollectionInLocalStorage === null) {
        const lastCol = await doGetLastCollection()
        if (lastCol === null) {
          dogetCollectionReference('29')
        } else if (lastCol.length > 0) {
          dogetCollectionReference(lastCol[0].id)
        } else {
          dogetCollectionReference('29')
        }
      } else {
        dogetCollectionReference(idCollectionInLocalStorage)
      }
    }

    fetchData()
  }, [IdCollection])


    useEffect(() => {
      dogetSystemColor();
    }, []);

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
          <FiltersTable />
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