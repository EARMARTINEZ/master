import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useTasks } from 'utils/ProviderContext'

import { Disclosure } from '@headlessui/react'

import { Listbox, Transition } from '@headlessui/react'
import { Button, Drawer, Spin, Tabs } from 'antd'
const { TabPane } = Tabs;

import { Space, Table, Tag } from 'antd';
import { CardReference } from '../Cards/DetailReference/CardReference'
import { CardStamp } from '../DetailStamp/CardStamp'


const filters = [
  { name: 'Gender' },
  { name: 'Theme' },
]

export function StatisticsView() {

  const {
    IdCollection,
    combinationsMap,
    dofetchReferenceForSilhouettes,
    dofindThemes,
    dofindGender,
    dofindParts,
    dofetchCombinationByCollection,
    open,
    StampsOpen,
    onClose,
    onCloseStamps,
  } = useTasks()

  const [typeFilter, setTypeFilter] = useState(filters[0].name);
  const [allReferences, setAllReferences] = useState([]);
  const [themes, setThemes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [parts, setParts] = useState([]);

  const [collectionsCount, setCollectionsCount] = useState(0);
  const [genderSecondaryFilter, setGenderSecondaryFilter] = useState('');
  const [themeSecondaryFilter, setThemeSecondaryFilter] = useState('');


  const [genderToShow, setGenderToShow] = useState([]);
  const [themeToShow, setThemeToShow] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (!IdCollection) {
        return;
      }

      const fetchSilhouettes = async () => {
        const response = await dofetchReferenceForSilhouettes(IdCollection);
        const references = response.map((item) => ({
          id: item.id,
          ref: item.ref,
          genderType: item.gender,
          themeType: item.theme,
          partType: item.part,
          status: item.status,
          typeproduct: item.typeproduct,
          productName: item.productname,
          color: item.color,
          fabric: item.fabric,
        }));

        const gendersArray = {};
        const themesArray = {};

        references.forEach(item => {
          if (!gendersArray[item.genderType]) {
            gendersArray[item.genderType] = [];
          }
          gendersArray[item.genderType].push(item);

          if (!themesArray[item.themeType]) {
            themesArray[item.themeType] = [];
          }
          themesArray[item.themeType].push(item);
        });
        setCollectionsCount(references.length);
        setThemeToShow(Object.entries(themesArray).map(([theme, items]) => ({ tittle: theme, items })));
        setGenderToShow(Object.entries(gendersArray).map(([gender, items]) => ({ tittle: gender, items })));
        setAllReferences(references);
        setLoading(true);
      }
      fetchSilhouettes();

    const fetchGenders = async () => {
        const { data } = await dofindGender();
        const gendersResponse = data.map((gender) => ({
            name: gender.attributes.name,
        }));
        setGenderSecondaryFilter(gendersResponse[0].name);
        setGenders(gendersResponse);
      }
      fetchGenders();

      const fetchThemes = async () => {
        let { themes }  = await dofindThemes(IdCollection);
        const themesResponse = themes.data.map((theme) => ({
            name: theme.attributes.name,
        }));
        setThemeSecondaryFilter(themesResponse[0].name);
        setThemes(themesResponse);
      }
      fetchThemes();

      const fetchParts = async () => {
        const { data } = await dofindParts();
        setParts(data);
      }
      fetchParts();
  }, []);


  return (
    <div className="mt-2 flex flex-col space-x-6">
      {/* Page Tittle */}
      <div className='flex flex-col justify-start items-start'>
        <h2 className="m-0">Master Statics - Per {typeFilter}</h2>
      </div>
      {/* Select Filter GENDER O THEME */}
      <section id='select-filter-type' className='flex flex-row space-x-2 '>
        <p>Select Statics type: </p>
        <RenderDropDown list={filters} state={typeFilter} setState={setTypeFilter} withD={'201px'}/>
      </section>

      {loading
        ? (
          <>
            {/* Info filter */}
            <section id='info-selected-by-filter' className='flex flex-row space-x-14 justify-start items-center'>
              <div className='flex flex-col justify-start items-start'>
                <h4 className="m-0">Items in this collection: {collectionsCount}</h4>
              </div>
              <section id='select-filter-type' className='flex flex-row space-x-2'>
                {typeFilter === 'Gender'
                  ? (
                    <>
                      <p>Select {typeFilter.toLowerCase()}: </p>
                      <RenderDropDown list={genders} state={genderSecondaryFilter} setState={setGenderSecondaryFilter} withD={'200px'}type={'gender'}/>
                    </>
                  )
                  : null
                }
                {typeFilter === 'Theme'
                  ? (
                    <>
                      <p>Select {typeFilter.toLowerCase()}: </p>
                      <RenderDropDown list={themes} state={themeSecondaryFilter} setState={setThemeSecondaryFilter} withD={'200px'} type={'theme'}/>
                    </>
                  )
                  : null
                }
              </section>
            </section>
            {/* List of results */}
            <section className="w-full px-4 pt-5">
                {
                  typeFilter === 'Gender'
                    ? (
                      <ListOfDisclosures list={genderToShow} infoToShow={genderSecondaryFilter}/>
                    )
                    : null
                }
                {
                  typeFilter === 'Theme'
                    ? (
                      <ListOfDisclosures list={themeToShow} infoToShow={themeSecondaryFilter}/>
                    )
                    : null
                }
            </section>
          </>
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
          <CardStamp />
        </Drawer>
    </div>
  )
}

const ListOfDisclosures = ({ list, infoToShow }) => {
  const [newListToShow, setNewListToShow] = useState([]);

  useEffect(() => {
    const newList = list.filter(item => item.tittle === infoToShow);
    setNewListToShow([]);
    setTimeout(() => {
      updateList(newList)
    }, 100);
  }, [infoToShow])

  function updateList(list){
    setNewListToShow([...list]);
  }

  return (
    <div className="w-full px-4  space-y-4 mb-10">
      <h3 className='m-0'>{infoToShow}</h3>
      {newListToShow.length > 0 ? (
        newListToShow.map((item, index) => (
          <DisclosureComponent key={index} tittle={item.tittle} count={item.items.length} objects={item.items}/>
        ))
      ) : (
        <p>Not items found</p>
      )}
    </div>
  )
}

const DisclosureComponent= ({ objects }) => {
  const [resultArray, setResultArray] = useState([]);
  useEffect(() => {
    // Función para agrupar objetos por partType
    const groupByPartType = (objects) => {
      return objects.reduce((acc, obj) => {
        const partType = obj.partType;
        if (!acc[partType]) {
          acc[partType] = [];
        }
        acc[partType].push(obj);
        return acc;
      }, {});
    };

    // Agrupar los objetos por partType
    const groupedData = groupByPartType(objects);

    // Convertir el objeto agrupado a un array de objetos
    const resultArray = Object.entries(groupedData).map(([partType, objects]) => ({
      title: partType,
      items: objects
    }));

    setResultArray(resultArray);
  }, [])

  return (
    <>
      {resultArray.map((item, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75" >
                <span>{item.title} ({item.items.length} items)</span>
                <div
                  className={`${
                    open ? 'rotate-90 transform' : ''
                  } h-5 w-5 text-blue-500`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Disclosure.Button>
              {/* Creo que se puede crear un componente , para manejar su propio estado */}
              <DisclosurePanelComponent objects={item.items}/>
            </>
          )}
        </Disclosure>
      ))}
    </>
  )
}

const DisclosurePanelComponent = ({ objects }) => {
  //Logica para el cambio de la tabs
  const [activeKey, setActiveKey] = useState("1");
  const [infoInChart, setInfoInChart] = useState([]);
  const [itemsArray, setItemsArray] = useState([])

  const handleChangeTab = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const itemsArray = groupByProductName(objects).reduce((acc, curr) => [...acc, ...curr.items], []);
    setItemsArray(itemsArray);
  }, [])

  return(
    <Disclosure.Panel className="px-4 text-sm text-gray-500">
      <Tabs
        activeKey={activeKey}
        onChange={handleChangeTab}
        defaultActiveKey="1"
        tabBarStyle={{ color: "#8D949C" }}
        style={{ width: "100%" }}
      >
        <TabPane
          tab="Chart"
          key="1"
        >
          <ChartsComponent objects={objects} changeTab={handleChangeTab} setInfoInChart={setInfoInChart} setItemsArray={setItemsArray}/>
        </TabPane>
        <TabPane tab="Table" key="2">
          <TableComponent items={infoInChart} itemsArray={itemsArray}/>
        </TabPane>
      </Tabs>
    </Disclosure.Panel>
  )
}

const TableComponent = ({ items, itemsArray }) => {
  const {
    dogetSystemColor,
    doshowDrawer,
  } = useTasks();

  const columns = [
    {
      title: 'Ref',
      dataIndex: 'ref',
      key: 'ref',
      render: (text) =>
        <Button type="link"
          onClick={() => {
          doshowDrawer(text),
          dogetSystemColor()
          }}
        >{text}</Button>
      ,
    },
    {
      title: 'Prod. Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Theme',
      dataIndex: 'theme',
      key: 'theme',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Fabric',
      dataIndex: 'fabric',
      key: 'fabric',
    },
  ];
  
  var newData = [];
  if(itemsArray.length !== 0){
    newData = itemsArray.map((item, index) => ({
      key: index,
      ref: item.ref,
      name: item.productName,
      theme: item.themeType,
      color: item.color,
      fabric: item.fabric,
    }));
  }else{
    newData = items.map((item, index) => ({
      key: index,
      ref: item.ref,
      name: item.productName,
      theme: item.themeType,
      color: item.color,
      fabric: item.fabric,
    }));
  }
  return (
    <Table columns={columns} dataSource={newData} />
  )
}

function groupByProductName(data) {
  var result = [];
  var tempProducts = {};
  var totalItems = 0;

  // Recorrer los elementos y agruparlos por productName
  data.forEach(function(item) {
      var productName = item.productName;
      if (!tempProducts[productName]) {
          tempProducts[productName] = [];
      }
      tempProducts[productName].push(item);
      totalItems++;
  });

  // Calcular el porcentaje y crear el array de objetos resultante
  Object.keys(tempProducts).forEach(function(productName) {
      var productItems = tempProducts[productName];
      var percentage = (productItems.length / totalItems) * 100;
      result.push({
          productName: productName,
          items: productItems,
          percentage: percentage.toFixed(2)
      });
  });

  return result;
}

const ChartsComponent = ({ objects, changeTab, setInfoInChart, setItemsArray}) => {
  const [statics, setStatics] = useState([]);

  useEffect(() => {
    var groupedData = groupByProductName(objects);
    setStatics(groupedData);
  }, [])

  return (
    <div className='flex flex-col justify-center items-center '>
      {statics.map((item, index) => (
        <RenderRow key={index} changeTab={changeTab} setInfoInChart={setInfoInChart} items={item.items} productName={item.productName} percentage={item.percentage} setItemsArray={setItemsArray}/>
      ))}
    </div>
  )
}

const RenderRow = ({changeTab, setInfoInChart, index, items, productName, percentage, setItemsArray}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (items) => {
    setItemsArray([]);
    setInfoInChart(items);
    changeTab("2");
  };
  return (
    <div
    key={index}
    className='relative flex flex-row justify-start items-center gap-5 w-[100%] mb-2 py-2 px-5 rounded-xl hover:border-2 group'
    onClick={() => handleClick(items)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className='m-0 w-[35%]' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{productName} ({items.length} items)</h4>
      <div className='w-[65%] flex flex-row justify-start items-center gap-5'>
        <h4 className='m-0'>{percentage % 1 === 0 ? parseInt(percentage) : percentage}%</h4>
        <ul className={`m-0 py-2 bg-blue-300 w-[${parseInt(percentage)}%] -z-10 mr-4`}></ul>
        <svg className={`absolute right-2 w-5 h-5" ${isHovered ? 'text-blue-900 flex text-xs' : 'hidden'}`}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      </div>
    </div>
  )
}

const RenderDropDown = ({ list, state, setState, withD, type}) => {
  return (
    <Listbox value={state} onChange={setState}>
      <div className="relative mt-4 z-50">
        <Listbox.Button className={`relative w-[${withD}] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}>
          <span className="block truncate">{state}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`absolute mt-1 max-h-60 w-[${withD}] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm overflow-scroll`}>
            {list.map((item, filterIdx) => (
              <article
                key={filterIdx}
                onClick={() => setState(item.name)}
                className={`relative py-2 px-9 hover:bg-blue-200 cursor-pointer flex flex-row items-center space-x-3 ${item.name === state ? 'bg-blue-100' : ''}`
                }>
                  {item.name === state
                    ? (
                      <span className={`absolute left-[10px]`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </span>
                    )
                    : null
                  }
                {item.name}
              </article>
            ))}
          </div>
        </Transition>
      </div>
    </Listbox>
  )
}