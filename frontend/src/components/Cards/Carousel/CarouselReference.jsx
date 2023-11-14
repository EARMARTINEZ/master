import  'flowbite'
import {useEffect } from "react"; 
import { useTasks } from "utils/ProviderContext";
import {Row, Col, Carousel ,Button, Input, Space, Table, Modal, Icon  } from 'antd';
import {  RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { getStrapiURL } from "utils/api";  
import ImgReference from '@/components/Cards/DetailReference/ImgReference'


const CarouselReference = () => {   
    
    const {        
        doMapDrawings,
        showModal,
        setIsModalOpen,
        isModalOpen,          
       
       } = useTasks();

       let UrlDrawings= doMapDrawings();
   
      
//modal 
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };
//end

    const contentStyle = {
        margin: 0,
        height: '40px',
        color: '#1a2656',
        lineHeight: '1.5715',
        textAlign: 'center',
       
    };

  
    const SampleNextArrow = props => {
      const { className, style, onClick } = props
      return (
        <div
        className={className}
        style={{
          ...style,
          color: 'white',
          fontSize: '20px',
          lineHeight: '1.5715'
        }}
        onClick={onClick}
      >
        
        <RightCircleOutlined style={contentStyle}/>
      </div>
      )
    }

    const SamplePrevArrow = props => {
      const { className, style, onClick } = props
      return (
         <div
      className={className}
      
      style={{
        ...style,
        color: 'white',
        fontSize: '20px',
        lineHeight: '1.5715'
        
      }}
      onClick={onClick}
    >
      <LeftCircleOutlined style={contentStyle}/>
    </div>
      )
    }

    const settings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }

    const onChange = (currentSlide) => {
    console.log(currentSlide);
    };
    
  return (  
    
    <>      
     
        
            <div className="grid grid-cols-1 gap-1 m-0">        
                  <div className="col-span-6 sm:col-span-1 ">  

                  {/* <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button> */}

                <Modal title="" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>                          
                          
                          <Carousel afterChange={onChange} arrows {...settings} draggable={true} >              
                            
                            {UrlDrawings.map((_datos) => (                              
                              <div  >
                                <h3 ><ImgReference onActiveCarousel={true} key={ _datos.id } url={_datos.url} UrlId={_datos.id} /></h3>  
                                
                              </div>
                            
                              ))}                     

                          </Carousel>
                </Modal>

                
            
                      
                              
                  </div>       
            </div>          
      
            
    </>
   
  )
}

export default CarouselReference