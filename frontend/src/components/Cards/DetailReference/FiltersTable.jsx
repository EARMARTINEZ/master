import  'flowbite'
import {useEffect, useState, useRef} from "react"; 
import Highlighter from 'react-highlight-words';
import { useTasks } from "utils/ProviderContext";
import { SearchOutlined } from '@ant-design/icons';
import {  Input, Space, Table  } from 'antd';
import { Button } from '@/components/Button'
import ButtonExport from '@/components/Cards/DetailReference/button-ExportXLSX'
import ButtonRecharge from '@/components/Cards/DetailReference/buttonRecharge'
import {ExportZipImg} from '@/components/ExporImg/ExportZipImg'
import SearchReference from '@/components/Cards/DetailReference/SearchReference'

const FiltersTable = () => {
    
    const { 
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
        ReferenceMap   
            } = useTasks();

          
            let ItemStatusMap = [];  
          
          
            const [filtersStatusMap, setfiltersStatusMap] = useState([]);                      
            
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
              

                }, [ReferenceMap]);  

        const data = FiltersReferenceMap;     
        
        
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);

        const [loading, setLoading] = useState(false); 
        const tableProps = {       
         loading,        
       };
      // console.log(filtersStampsMap)

            // useEffect(() => {
            //     data ? setLoading(true) : setLoading(false);
            // }, [data]);

            // useEffect(() => {
            //     if(data.length>1) setLoading(false);
            // }, [data]);
            
            // useEffect(() => {
            //     setTimeout(() => {
            //         if(data.length===0) setLoading(false);
            //     },50000);
            // }, [data, IdCollection]);

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

        const onChange = (pagination, filters, sorter, extra) => {
            //console.log('params', pagination, filters, sorter, extra);
          };

     
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

     <Table 
        {...tableProps}
        bordered
        columns={columns} 
        dataSource={data}
        onChange={onChange}
        pagination={{
            pageSize: 10,
          }}
        scroll={{
            x: 1000,
            
          }}
          className=" font-medium text-gray-900 whitespace-nowrap dark:text-white"
        
         />         
            
    </>
   
  )
}

export default FiltersTable