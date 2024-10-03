
import {useEffect, useState, useRef, useCallback} from "react";
import Highlighter from 'react-highlight-words';
import { useTasks } from "utils/ProviderContext";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table  } from 'antd';
// import { Button } from '@/components/Button'
import ButtonExport from '@/components/Cards/DetailReference/button-ExportXLSX'
import ButtonRecharge from '@/components/Cards/DetailReference/buttonRecharge'
import {ExportZipImg} from '@/components/ExporImg/ExportZipImg'
import SearchReference from '@/components/Cards/DetailReference/SearchReference'

import ImgReference from '@/components/Cards/DetailReference/ImgReference'


const FiltersTable = () => {

    const {
        setLoading,
        loading,
        dogetCollectionReference,
        dofetchReference,
        FiltersReferenceMap,
        filtersGenderMap,
        filtersProductMap,
        filtersSizeMap,
        filtersThemesMap,
        filtersStampsMap,
        IdCollection,
        SoloReferenceMap,
        ReferenceMap,
        MetaReferenceMap,
        dofindCollectionFilters,
        setFiltersReferenceMap,
        setMetaReferenceMap,
        doshowDrawer,
        dogetSystemColor,
        dogenerateFilters,
        } = useTasks();

        

        let ItemStatusMap = [];
        const [filtersStatusMap, setfiltersStatusMap] = useState([]);
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);
        const valueRef = useRef('');

        let datos = FiltersReferenceMap;

        const tableProps = {
            loading,
        };      

       let newStatusMap = [];

       useEffect(() => {
        ReferenceMap?.map((dataRef, index) => {
                const { referencia, genderName, Composition,  status, theme, stamp } = dataRef ? dataRef.attributes : '0';
                //Filtros columns Table
            if (!ItemStatusMap.find((type) => type.value ===  status) ){
                let FiltersTable = {
                    value: status,
                    text:  status
                };
                ItemStatusMap.push(FiltersTable,);
            }
        });
        setfiltersStatusMap([...ItemStatusMap])
        }, [ReferenceMap])

        const fetchData = useCallback(async (ValueREF) => {
            try {
              console.log("valueRef", ValueREF);
        
              function MapReference(MapValues) {
                let FilterRefMap = [];
                let ItemMap = [];
        
                MapValues.data?.forEach((dataRef) => {
                  const {
                    referencia,
                    description = '',
                    genderName,
                    status,
                    collection,
                    theme,
                    Composition,
                    sizes,
                    stamp,
                  } = dataRef.attributes || {};
        
                  const CodigoSizes = sizes.data?.map((size) => size.attributes?.name || 'null').join(' ');
        
                  const FiltersTableReferences = {
                    value: referencia,
                    text: referencia,
                  };
                  ItemMap.push(FiltersTableReferences);
        
                  const TableDataSource = {
                    key: dataRef.id || '0',
                    references: referencia,
                    reference: (
                      <Button
                        type="link"
                        onClick={() => {
                          doshowDrawer(dataRef.attributes.referencia);
                          dogetSystemColor();
                        }}
                      >
                        {referencia}
                      </Button>
                    ),
                    collection: collection.data.attributes.name,
                    gender: genderName,
                    typeproduct: Composition.typeproduct.data.attributes.name,
                    theme: theme.data?.attributes.name || '',
                    sizeref: CodigoSizes,
                    drawings: (
                      <div className="flex mb-5 -space-x-4">
                        {dataRef.attributes.drawings.data?.map((_ImgRef) =>
                          _ImgRef.attributes.name === `${referencia}.jpg` ? (
                            <ImgReference
                              key={_ImgRef.attributes.url}
                              url={_ImgRef.attributes.formats.thumbnail.url}
                              UrlId={_ImgRef.attributes.id}
                              compact
                            />
                          ) : null
                        )}
                      </div>
                    ),
                    status: status,
                    stamps: stamp.data ? stamp.data.attributes.name : '',
                    stamp: (
                      <Button
                        type="link"
                        onClick={() => {
                          doShowStampsDrawer(true, dataRef.attributes.referencia);
                        }}
                      >
                        {stamp.data ? stamp.data.attributes.name : ''}
                      </Button>
                    ),
                  };
        
                  FilterRefMap.push(TableDataSource);
                });
        
                setMetaReferenceMap(MapValues.meta);
                setFiltersReferenceMap([...FilterRefMap]);
              }
        
              try {
                const keys = await dofindCollectionFilters(ValueREF);
                if (keys.data.length >= 1) {
                  MapReference(keys);
                }
              } catch (error) {
                console.error('Error fetching collection filters:', error);
              }
            } catch (error) {
              console.error('Error al obtener datos de la colección:', error);
            }
          }, []);

        useEffect( () => {  
            if(valueRef.current){
                fetchData(valueRef.current);
            }              
           
            }, [valueRef.current]);

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

        if (dataIndex.includes('reference') ){
            dofetchReference(selectedKeys[0]);
            return;
          }
        };
        const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        };

        const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (

            <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
            >
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => {

                    clearFilters && handleReset(clearFilters);
                    handleSearch(selectedKeys, confirm, dataIndex)
                    confirm({
                    closeDropdown: false,
                    });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                }}
                className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{
                marginBottom: 8,
                display: 'block',
                }}
            />
            <Space>
                <Button
                type="primary"
                className="bg-indigo-500 text-white  active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => {
                    clearFilters && handleReset(clearFilters);
                    handleSearch(selectedKeys, confirm, dataIndex)
                    confirm({
                    closeDropdown: false,
                    });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                } }
                icon={<SearchOutlined />}
                size="small"
                style={{
                    width: 90,
                }}
                >
                Search
                </Button>
                <Button
                onClick={() => {
                    clearFilters && handleReset(clearFilters);
                    confirm({
                    closeDropdown: false,
                    });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                    if (dataIndex.includes('reference') ){
                        dogetCollectionReference(IdCollection);
                        return //console.log(dataIndex);
                      }

                }}
                size="small"
                style={{
                  width: 90,
                }}
                >
                Reset
                </Button>
                <Button
                type="link"
                size="small"
                onClick={() => {
                    confirm({
                    closeDropdown: false,
                    });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                }}
                >
                Filter
                </Button>
                <Button
                type="link"
                size="small"
                onClick={() => {
                    close();
                }}
                >
                close
                </Button>
            </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
            style={{
                color: filtered ? '#1677ff' : undefined,
            }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
                }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
            ) : (
            text
            ),
        });

        const handleFilterChange =  (columnKey, newFilteredValues) => {

                const newFilteredValueString = JSON.stringify(newFilteredValues);
                const prevFilteredValueString = JSON.stringify(newFilteredValues);

                    if (!newStatusMap[columnKey]) {
                        newStatusMap[newFilteredValues] = [...newFilteredValues]
                    }
                    if (newFilteredValueString === prevFilteredValueString) {

                        const newStatusArr = Object.values(newStatusMap).flat();
                        const FILTERS = dogenerateFilters(IdCollection, newStatusMap, columnKey);
                         //console.log('Filtered Values:', FILTERS);
                        valueRef.current = FILTERS
                        return newFilteredValues;
                    }
                return {
                  ...newFilteredValues,
                  [columnKey]: newFilteredValues,
                };
        };

        const onChange = (pagination, filters, sorter, extra) => {
            //console.log('params', pagination, filters, sorter, extra);
            //console.log( pagination);
            const current = pagination ? pagination.current : 1
            const pageSize = pagination ? pagination.pageSize : 10
            
            setLoading(true);
            IdCollection ?
            dogetCollectionReference(IdCollection,current, pageSize) :
            dogetCollectionReference('29', current);
        };

        const columns = [
            {
                title: 'REFS',
                align: 'center',
                dataIndex: 'reference',
                key: 'reference',
                width: '10%',
                filters:SoloReferenceMap,
                onFilter: (value, record) => record.references.startsWith(value),
                filterSearch: true,
                // ...getColumnSearchProps('reference'),
                sorter: (a, b) => a.references - b.references,
            },
            {
                title: 'DRAWING',
                align: 'center',
                dataIndex: 'drawings',
                key: 'drawings',
                width: '8%',
            },
            {
                title: 'COLLECTION',
                align: 'center',
                dataIndex: 'collection',
                key: 'collection',
                width: '15%',
            },
            {
                title: 'GENDER',
                align: 'center',
                dataIndex: 'gender',
                key: 'gender',
                width: '10%',
                filters: filtersGenderMap,
                onFilter: (value, record) => record.gender.startsWith(value),
                filterSearch: true,
            },
            {
                title: 'PRODUCT',
                align: 'center',
                dataIndex: 'typeproduct',
                key: 'typeproduct',
                width: '10%',
                filters: filtersProductMap,
                onFilter: (value, record) => record.typeproduct.startsWith(value),
                filterSearch: true,
            },
            {
                title: 'THEME',
                align: 'center',
                dataIndex: 'theme',
                key: 'theme',
                width: '10%',
                filters: filtersThemesMap,
                onFilter: (value, record) => record.theme.startsWith(value),
                filterSearch: true,
            },
            {
                title: 'STAMP',
                align: 'center',
                dataIndex: 'stamp',
                key: 'stamp',
                width: '10%',
                filters: filtersStampsMap,
                onFilter: (value, record) => record.stamps.startsWith(value),
                filterSearch: true,
            },
            {
                title: 'SIZE',
                align: 'center',
                dataIndex: 'sizeref',
                key: 'sizeref',
                width: '25%',
                filters: filtersSizeMap,
                onFilter: (value, record) => record.sizeref.includes(value),
                filterSearch: true,
            },
            {
                title: 'STATUS',
                align: 'center',
                dataIndex: 'status',
                key: 'status',
                filters: filtersStatusMap,
                onFilter: (value, record) => record.status.includes(value),
                filterSearch: true,
            },
            // {
            //     title: 'ACTION',
            //     align: 'center',
            //     dataIndex: 'Action',
            //     key: 'Action',
            //     fixed: 'right',
            //     width: 100,
            // },
            ];
  return (
    <>
    <Space
        align="center"
        style={{
          marginBottom: 20,
        }}
      >
         <ButtonExport  />

         <ExportZipImg />

         <SearchReference />

         <ButtonRecharge />

      </Space>
     {datos.length > 0 && (
        <Table
            {...tableProps}
            bordered
         
            loading={loading}
            columns={columns.map(column => ({
                ...column,
                onFilter: (value, record) => {
                  const result = column.onFilter(value, record);
                  handleFilterChange(column.key, result ? [value] : [value]);
                  return result;
                },
              }))}
            dataSource={datos}
            onChange={onChange}
            pagination={{
                pageSize:MetaReferenceMap ? MetaReferenceMap.pagination.pageSize : 0,
                total: MetaReferenceMap ? MetaReferenceMap.pagination.total : 0
            }}
            scroll={{
                x: 1000,
            }}
            footer={() => `Total records: ${MetaReferenceMap ? MetaReferenceMap.pagination.total: '0'}`} 
            className=" font-medium text-gray-900 whitespace-nowrap dark:text-white"
            />
         )}
    </>
  )
}

export default FiltersTable