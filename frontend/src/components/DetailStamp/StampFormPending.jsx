import  React, {useEffect, useState  } from "react"; 
import classNames from "classnames"
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Comment } from '@ant-design/compatible';
import { SmallDashOutlined, UserOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Drawer, Avatar, Button, Form, Input, List, Collapse, Badge, Modal, Card, Space, Row, Col, Divider    } from 'antd';
import moment from 'moment';
import { FormItemPendingType } from '@/components/Cards/DetailReference/FormItemCommentType'

const { TextArea } = Input;

const CommentList = ({ comments }) => ( 
  <Comment
    // actions={
    //   [<span key="comment-nested-reply-to">Reply to</span>]
    // }
    //author={ }
    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">     
        <List
          dataSource={comments}
          //header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={(props) => <Comment {...props} />}
        />     
      </article>
    }
  /> 
  
);


const Editor = ({ onChange, onSubmit, submitting, value, form, formRef }) => (
  <>

    <Form
          form={form}
          ref={formRef}
          name="form_Pending_type"
          onFinish={onSubmit}              
          autoComplete="off"
          size={'default'}        
        >

    <div className="grid grid-cols-1 gap-1"> 
        <div className="col-span-6 sm:col-span-1  ">                         
        <FormItemPendingType  />
        </div>
    </div>

    <Form.Item
      name="pendingcommenttext"
      label="Comment"
      rules={[
      {
          required: true,
          message: 'Missing Comment',
      },
      ]}
    >
      
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    
    <Form.Item>
      <Button htmlType="submit" loading={submitting} type="primary" className=" bg-blue-700 ">
        Add Pending
      </Button>
    </Form.Item>

    </Form>
  </>
);


const Comenta = () => {

  const {     
    formRef,      
  } = BasicTasks();

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

    const { RefePendingstamp, doUpdateStampPendingsComment } = useTasks(); 
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const { confirm } = Modal;

    const onFinish = (commentid, comment, user, typeid, status) => {
      confirm({        
        title: 'Do you want to change the status of the item?',
        icon: <ExclamationCircleFilled />,
        content: '',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {      
        
            console.log('OK', comment);
            doUpdateStampPendingsComment(
                  commentid, 
                  comment, 
                  user, 
                  { "Newcommenttype": undefined, "pendingtype":typeid  }, 
                  status === "Receive" ? "Pending" : "Receive"
              );
           
         
        },
        onCancel() {
          //console.log('Cancel', commentid, comment, user, { "pendingtype":typeid  });
        },
      });
    };

    let ComentaObj= [];
    RefePendingstamp?.map((Comments, index) => {    
     
     
          const Status = {         
            content: 
                <div className="text-left px-5">
                  
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{
                          display: 'flex',
                        }}
                      >            
                        
                          <Button type="dashed" 
                
                            onClick={() => { 
                              onFinish(Comments.id, Comments.comment,Comments.user, Comments.type.data.id, Comments.status  ) 
                            }} 
                            className={classNames(                              
                              "text-red-400 ",                     
                              {
                                "text-yellow-300": Comments.status == "Receive",
                              },)}                    
                          
                            >Status: {Comments.status}
                        </Button>
                       
                     
                      </Space><Divider /> 
                      
                </div>
          }
          const content = {
            
              text: Comments.type.data.attributes.name,
              author:  <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                              {Comments.user}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                          
                        </div> 
                      </footer>,
              avatar: <Avatar 
                        size="small" 
                        style={{
                            backgroundColor: 'rgb(45, 183, 245)',
                        }}
                        icon={<UserOutlined />} 
                    />,
            content: 
                        <div className="text-left">
                          <p className="   text-sky-500">Type: {Comments.type.data.attributes.name}</p>
                          <p className="">{Comments.comment}</p>                   
                        </div>,                  
            
            
            
            datetime: moment(Comments.date).format('MM/DD/YYYY, h:mm:ss a'),
            
            }        
              
            ComentaObj.push(content); 
            ComentaObj.push(Status);  
      
       
    });

    useEffect(() => {
        setComments(ComentaObj);
      }, [RefePendingstamp]);

    const handleSubmit = (values) => {
     

        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {

        doUpdateStampPendingsComment(undefined, value,'Showroom', values);
        onReset();
        setSubmitting(false);
        setValue('');      
        setComments([
            ...comments,
            {
            author:  <footer className="flex justify-between items-center mb-0">
                        <div className="flex items-center">
                        <p className="inline-flex items-center  text-sm text-gray-900 dark:text-white">Comment sent</p>          
                    </div> 
                    </footer>,
            avatar: <Avatar 
                        size="small" 
                        style={{
                        backgroundColor: 'rgb(45, 183, 245)',
                        }}
                        icon={<UserOutlined />} 
                    />,
            content: <p className=" text-left">{value}</p>,
            //datetime: moment('2023-08-10').fromNow(),
            },        
        ]);

        //console.log(comments)
        //setComments([]);
        }, 1000);


    };
    const handleChange = (e) => {
    setValue(e.target.value);
    };

  return (
      <>

        <div id='PendingsRef' className="grid grid-cols-12 gap-1">
         <div className="col-span-6 sm:col-span-12">            
            <div className=" mx-auto px-5">
                <div className="flex justify-between items-center mb-">
                    <h2 className="text-lg lg:text-2x8 font-bold text-gray-900 dark:text-white"></h2>
                </div>
                <Comment
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    value={value}
                    form={form}
                    formRef={formRef}
                    />
                }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
          </div> 
        </div>
    </>

  )
};

            
export function StampFormPending() { 

  const { Referencia, RefePendingstamp } = useTasks();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState([]);

  const [openFormDrawer, setopenFormDrawer] = useState(false);

  let Pendingslength=[]; 
  RefePendingstamp?.map((Pending, index) => {
    if(Pending.status=='Pending'){
          Pendingslength.push(Pending); 
    }     
    
  });

  const items = [
    {
      key: '1',
      label: <Badge 
                status="warning" 
                //text="Pendings" 
                count={show ? Pendingslength.length : 0} showZero 
                color= {Pendingslength.length >= 1 ? "#faad14" : "blue" }
             />,
      children: <Comenta />,
      accordion: true,
      destroyInactivePanel: true,
      
    },    
  ];

  useEffect(() => {
      setOpen(['1']) ;
  }, [Referencia]);


  // const onChange = (key) => {
  //   console.log(key);
  // };

return (
  <>
   
   <div className="grid grid-cols-6 gap-1 m-2 px-3">
     <div className="col-end-7 col-span-2 ">   
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          
            <Button 
                type="link" 
                onClick={() => {  
                  setopenFormDrawer(true);         
                }}          
            >
            
              <Badge 
                status="warning" 
                text="Pendings"                
                count={show ? Pendingslength.length : 0} showZero 
                color= {Pendingslength.length >= 1 ? "#faad14" : "blue" }
              />                        
            </Button>     
        
            <Drawer 
                    title="Close" 
                    placement="right"                
                    onClose={() => {
                      setopenFormDrawer(false);                       
                    }} 
                    open={openFormDrawer} 
                    size={'large'} 
                    width={640}
                    className="bg-gray-900"    
                    > 

                  <Collapse 
                    items={items} 
                    bordered={true}             
                    expandIcon={({ isActive }) => <SmallDashOutlined rotate={isActive ? 90 : 0} />} 
                    onChange={(key) => { setOpen(key) }  }          
                    activeKey={open}              
                    
                    />               
                </Drawer>
           
            
        </div>
      </div>  
    </div>        
               
  </>

)
        
  
 
  }
