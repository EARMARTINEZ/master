import  'flowbite'
import {useEffect, useState, useRef} from "react"; 
import Highlighter from 'react-highlight-words';
import { useTasks } from "utils/ProviderContext";
import { SearchOutlined } from '@ant-design/icons';
import {ConfigProvider,  Input, Space, Table, Button  } from 'antd';
import ImgReference from '@/components/Cards/DetailReference/ImgReference'

const FiltersTableStamps = () => {
    
    const { 
        dogetCollectionReference,
        dofetchReference,             
        IdCollection,      
        ReferenceMap, 
        doshowDrawer,
        doShowStampsDrawer,
        dogetSystemColor,  
            } = useTasks();

           
            let ItemMap = [];
            let ItemReferenceMap = [];
            let ItemStatusMap = [];
            let ItemStampNameMap = [];

            let FilterTableStampsMap = [];
            let StampReference=[]; 
            
            const [TableStampsMap, setTableStampsMap] = useState([]);
            const [filtersReferenceMap, setfiltersReferenceMap] = useState([]);
            const [filtersStampsNameMap, setfiltersStampsNameMap] = useState([]);
            const [filtersThemesMap, setfiltersThemesMap] = useState([]);
            const [filtersStatusMap, setfiltersStatusMap] = useState([]);
                      
            
            useEffect(() => {            
                ReferenceMap?.map((dataRef, index) => {  
                     const { referencia, theme, stamp } = dataRef ? dataRef.attributes : '0'; 
    
                     if (stamp.data){
                         let StampPicture = stamp.data.attributes.picture.data 

                         const { masters } = stamp.data.attributes

                        masters.data?.map((ref, index) => {      
                          const IdStampReference = ref.attributes ? ref.attributes.referencia : 'null'        
                          StampReference.push(IdStampReference);     
                        });

                            let stampsTableDataSource = {                   
                                
                                'key': dataRef ? dataRef.id : '0',
                                'references': referencia,
                                'reference':<Button type="link" 
                                                    onClick={() => { 
                                                    doshowDrawer( dataRef.attributes.referencia), 
                                                    dogetSystemColor() 
                                                    }}  
                                            >{referencia}</Button>,
                            
                                'theme': theme.data.attributes.name,
                                'stamps':stamp.data ? stamp.data.attributes.name :'',
                                'stampsStatus':stamp.data ? stamp.data.attributes.status :'',
                                'stampDrawings':<div className="flex mb-5 -space-x-4 text-center">  
                                    {StampPicture?.map((picture_url) => (          
                                        <ImgReference  key={ picture_url.attributes.url} url={picture_url.attributes.formats.thumbnail.url} UrlId={picture_url.id} compact={true} />                             
                                ))}
                                </div>,
                                'stamp':<Button type="link" 
                                                onClick={() => {                             
                                                doShowStampsDrawer(true, dataRef.attributes.referencia ) 
                                                }} 
                                        >{stamp.data ? stamp.data.attributes.name :''} 
                                        </Button>,
                                
                                
                            
                            };

                            //Agrupa Stamps
                            if (!FilterTableStampsMap.find((stamps) => stamps.stamps === stamp.data.attributes.name) ){                                                
                                 FilterTableStampsMap.push( stampsTableDataSource );
                            } 

                      //Filtros columns Table
                      if (!ItemReferenceMap.find((type) => type.value ===  referencia) ){
                        let FiltersTable = {
                            value: referencia,
                            text:  referencia
                        };             
                        ItemReferenceMap.push(FiltersTable,); 
                      }       

                      if (!ItemStampNameMap.find((type) => type.value ===  stamp.data.attributes.name) ){
                        let FiltersTable = {
                            value: stamp.data.attributes.name,
                            text:  stamp.data.attributes.name
                        };             
                        ItemStampNameMap.push(FiltersTable,); 
                      }                      
                      if (!ItemMap.find((type) => type.value === theme.data.attributes.name) ){
                            let FiltersTable = {
                                value: theme.data.attributes.name,
                                text: theme.data.attributes.name
                            };             
                            ItemMap.push(FiltersTable,); 
                        }
                        if (!ItemStatusMap.find((type) => type.value ===  stamp.data.attributes.status) ){
                            let FiltersTable = {
                                value: stamp.data.attributes.status,
                                text:  stamp.data.attributes.status
                            };             
                            ItemStatusMap.push(FiltersTable,); 
                        } 

                   
                    }
                     
                   
                }); 
               
                setfiltersReferenceMap([...ItemReferenceMap])
                setfiltersStampsNameMap([...ItemStampNameMap])
                setfiltersThemesMap([...ItemMap]);
                setfiltersStatusMap([...ItemStatusMap])                                
                setTableStampsMap([...FilterTableStampsMap]);

                }, [IdCollection]);
                
             
                
        const data = TableStampsMap;    
        
     
       
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);

        const [loading, setLoading] = useState(false); 
        const tableProps = {       
         loading,        
       };
      
      

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
                title: 'NAME',
                align: 'center',
                dataIndex: 'stamp',
                key: 'stamp', 
              
                filters: filtersStampsNameMap,            
                  onFilter: (value, record) => record.stamps.startsWith(value),
                  filterSearch: true,
            
            },
            {
                title: 'STAMP',
                align: 'center',
                dataIndex: 'stampDrawings',
                key: 'stampDrawings',
                width: '1%',
            
             },
            {
                title: 'THEME',
                align: 'center',
                dataIndex: 'theme',
                key: 'theme',  
                width: '30%',           
                filters: filtersThemesMap,            
                  onFilter: (value, record) => record.theme.startsWith(value),
                  filterSearch: true,
            
            },
            {
                title: 'STATUS',
                align: 'center',
                dataIndex: 'stampsStatus',
                key: 'stampsStatus', 
                width: '30%', 
                filters: filtersStatusMap,            
                  onFilter: (value, record) => record.stampsStatus.startsWith(value),
                  filterSearch: true,
            
            
            },    
            // {
            //     title: 'REFS',
            //     align: 'center',
            //     dataIndex: 'reference',
            //     key: 'reference',
            //     width: '30%', 
            //     //  filters:filtersReferenceMap,            
            //     //  onFilter: (value, record) => record.references.startsWith(value),
            //     //  filterSearch: true,            
            //     // ...getColumnSearchProps('reference'),
            //     sorter: (a, b) => a.references - b.references,
            // }, 
           
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
    <ConfigProvider

theme={{
    token: {      
       
    },
  }}
      
      >    

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
    </ConfigProvider>    

    </>
   
  )
}

export default FiltersTableStamps