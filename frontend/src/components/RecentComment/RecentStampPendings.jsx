import  'flowbite'
import {useEffect, useState, useRef} from "react"; 
import Highlighter from 'react-highlight-words';
import { useTasks } from "utils/ProviderContext";
import { SearchOutlined } from '@ant-design/icons';
import {  Input, Space, Table  } from 'antd';
import { Button } from 'antd';
import moment from 'moment';

const RecentStampPendings = () => {
    
    const { 
        ReferenceMap,
        dogetCollectionReference,
        dofetchReference, 
        SoloReferenceMap,       
        IdCollection,
        doshowDrawer, 
        doShowStampsDrawer       
            } = useTasks();

        let FilterTableStampsMap = [];
        let ItemMap = [];
        let ItemStatusMap = [];
        let ItemUserMap = [];
        let ItemStampNameMap = [];
        
        const [PendingsMap, setPendingsMap] = useState([]);
        const [TypePendingsMap, setTypePendingsMap] = useState([]);
        const [StatusMap, setStatusMap] = useState([]);
        const [UserMap, setUserMap] = useState([]);
        const [filtersStampsNameMap, setfiltersStampsNameMap] = useState([]);     
        
        useEffect(() => {            
            ReferenceMap?.map((dataRef, index) => {  
                const { referencia, pendings, stamp } = dataRef ? dataRef.attributes : '0'; 

                const { pendingstamp } = stamp.data ?  stamp.data.attributes : '';

               

                pendingstamp?.map((comments, index) => {                    
                    let PendingsComments= {
                      "references": dataRef.attributes.referencia,
                      'stamp':<Button type="link" 
                                                onClick={() => {                             
                                                doShowStampsDrawer(true, dataRef.attributes.referencia ) 
                                                }} 
                                        >{stamp.data ? stamp.data.attributes.name :''} 
                                        </Button>,
                     'stamps':stamp.data ? stamp.data.attributes.name :'',  
                     'Idcomments': comments.id ? comments.id : '',           
                      "user": comments.user ? comments.user : 'null',           
                      "date": comments.date ?  moment(comments.date ).format('MM/DD/YYYY, h:mm:ss a') : 'null',
                      "status": comments.status ? comments.status : 'null',
                      "comment": comments.comment ? comments.comment : 'null',
                      "typependings": comments.type.data.attributes ? comments.type.data.attributes.name : 'null'
                    }

                     //Agrupa Stamps
                     if (stamp.data){
                        if (!FilterTableStampsMap.find((stamps) => stamps.Idcomments === comments.id ) ){                                                
                            FilterTableStampsMap.push(PendingsComments); 
                        } 
                   
                     //Filtro referencia en FiltersTable

                     if (!ItemStampNameMap.find((type) => type.value ===  stamp.data.attributes.name) ){
                        let FiltersTable = {
                            value: stamp.data.attributes.name,
                            text:  stamp.data.attributes.name
                        };             
                        ItemStampNameMap.push(FiltersTable,); 
                      } 
                     
                     if (!ItemMap.find((type) => type.value === comments.type.data.attributes.name) ){
                        let FiltersTableReferences = {
                            value: comments.type.data.attributes.name,
                            text: comments.type.data.attributes.name
                        };             
                        ItemMap.push(FiltersTableReferences,); 
                      }
                        if (!ItemStatusMap.find((type) => type.value ===  comments.status) ){
                            let FiltersTableReferences = {
                                value: comments.status,
                                text:  comments.status
                            };             
                            ItemStatusMap.push(FiltersTableReferences,); 
                        } 
                            if (!ItemUserMap.find((type) => type.value ===  comments.user) ){
                                let FiltersTableReferences = {
                                    value: comments.user,
                                    text:  comments.user
                                };             
                                ItemUserMap.push(FiltersTableReferences,); 
                            }   
                           
                        }   

                                
                 });
                 setPendingsMap([...FilterTableStampsMap]);
                 setTypePendingsMap([...ItemMap]);
                 setStatusMap([...ItemStatusMap]);
                 setUserMap([...ItemUserMap]);
                 setfiltersStampsNameMap([...ItemStampNameMap])
            });          
            }, [IdCollection]);

         

        const data = PendingsMap;     
        
        
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
            title: 'REQUESTED BY',
            align: 'center',
            dataIndex: 'user',
            key: 'user',
            width: '20%', 
            
            filters: UserMap,            
              onFilter: (value, record) => record.user.startsWith(value),
              filterSearch: true,
        
        },        
        {
            title: 'TYPE',
            align: 'center',
            dataIndex: 'typependings',
            key: 'typependings',
            width: '20%', 
            
            filters: TypePendingsMap,            
              onFilter: (value, record) => record.typependings.startsWith(value),
              filterSearch: true,
        
        },
        {
            title: 'DATE',
            align: 'center',
            dataIndex: 'date',
            key: 'date',           
            // filters: filtersProductMap,            
            //   onFilter: (value, record) => record.typeproduct.startsWith(value),
            //   filterSearch: true,
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend'],
        
        },
        {
            title: 'COMMENT EXTRACT',
            align: 'center',
            dataIndex: 'comment',
            key: 'comment',  
            ellipsis: true, 
            ...getColumnSearchProps('comment'),
        },    
       
        {
            title: 'STATUS',
            align: 'center',
            dataIndex: 'status',
            key: 'status',          
            width: '20%',   
            filters: StatusMap,            
              onFilter: (value, record) => record.theme.startsWith(value),
              filterSearch: true,
        },        
        
        
        ];

        const onChange = (pagination, filters, sorter, extra) => {
            //console.log('params', pagination, filters, sorter, extra);
          };

     
  return (  
    
    <>  
    <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
      
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

export default RecentStampPendings