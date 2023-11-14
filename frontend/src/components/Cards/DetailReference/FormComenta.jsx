import  React, {useEffect, useState  } from "react"; 
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Comment } from '@ant-design/compatible';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Collapse, Space, Divider } from 'antd';
import moment from 'moment';
import { FormItemCommentType } from '@/components/Cards/DetailReference/FormItemCommentType'


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
          name="form_Create_Reference"
          onFinish={onSubmit}              
          autoComplete="off"
          size={'default'}        
        >
              <div className="grid grid-cols-5 gap-1"> 
                  <div className="col-span-6 sm:col-span-1  ">                         
                      <FormItemCommentType  />
                  </div>
              </div>
              <Form.Item
                  name="commenttext"
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
                <Button htmlType="submit" loading={submitting}  type="primary" className=" bg-blue-700 ">
                  Add Comment
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

   const { RefeComments, doUpdateComment } = useTasks(); 
   
   const [comments, setComments] = useState([]);
   const [submitting, setSubmitting] = useState(false);
   const [value, setValue] = useState('');
   const f = new Date();
   const Commentfecha = `${f.getFullYear()}-${f.getMonth() +1}-${f.getDate()}`;


   let ComentaObj= [];
   RefeComments?.map((Comments, index) => {    

       
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
                        <Space
                        direction="vertical"
                        size="middle"
                        style={{
                          display: 'flex',
                        }}
                      >          
                            <p className=" text-left text-sky-500">Type: {Comments.type.data.attributes.name}</p>        
                            <p className=" text-left">{Comments.comment}</p>                   
                      
                        </Space><Divider /> 
                      
                      </div>,
                      
                  
          
          
          
          datetime: moment(Comments.date).format('MM/DD/YYYY, h:mm:ss a'),
          
          }

      ComentaObj.push(content); 
      
    });    

    useEffect(() => {
      setComments(ComentaObj);
    }, [RefeComments]);
 
    const handleSubmit = (values) => {     

      //console.log(values)

        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
              doUpdateComment(value,'Showroom', values);
              onReset();
              setSubmitting(false);
              setValue('');      
              setComments([
              ...comments,
              {
              author:  <footer className="flex justify-between items-center mb-0">
                      <div className="flex items-center">
                      <p className="inline-flex items-center  text-sm text-gray-900 dark:text-white">Comment sent </p>
                    
                  </div> 
                </footer>,
              avatar: <Avatar 
              size="small" 
              style={{
                backgroundColor: 'rgb(45, 183, 245)',
              }}
              icon={<UserOutlined />} 
              />,
              content: <p>{value}</p>,
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

        <div id='CommentRef' className="grid grid-cols-12 gap-1">
        <div className="col-span-6 sm:col-span-12">            
            <div className=" mx-auto px-5">
                <div className="flex justify-between items-center mb-">
                    <h2 className="text-lg lg:text-2x8 font-bold text-gray-900 dark:text-white">Post Comment</h2>
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

            
export function FormComenta() { 

  const items = [
    {
      key: '1',
      label: 'Comments',
      children: <Comenta />,
    },
    
  ];

  const onChange = (key) => {
   // console.log(key);
  };

return (
  <>
  
   <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} /> 
  
  </>

)
        
  
 
  }
