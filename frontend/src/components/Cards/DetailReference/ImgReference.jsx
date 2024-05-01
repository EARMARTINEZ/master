import  'flowbite'
import Image from "next/image"
import { getStrapiMedia } from "utils/media"
import classNames from "classnames"
import React,{ useState} from "react";
import { useTasks } from "utils/ProviderContext";
import { Card, Space, Row, Button, Modal   } from 'antd';
import {  ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons'
import LoadingModal from '@/components/Modal/loadingModal';
import { getStrapiURL } from "utils/api";

const ImgReference = ({url, UrlId, compact, onActiveCarousel}) => {

  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

    const {
      showModal,
      showModalStamp,
      setShowModalLoading,
      Drawings,
      doDeleteImgReference,
      Referencia,
      dofetchReference,
    } = useTasks();

    const { confirm } = Modal;

    const showConfirm = (IdIMG) => {
      confirm({
        title: 'Do you want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: '',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
          setShowModalLoading(true);
          doDeleteImgReference(IdIMG);
          console.log('OK' + IdIMG);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

  return (

    <>
    {Drawings ? (
                <div  className="" >
                  {compact ? (
                        <div   id={UrlId} className="relative lg:static xl:pl-30">
                          <Image
                          loader={loader}
                          quality={10}
                          src={getStrapiURL(url)}
                          blurDataURL={getStrapiURL(url)}
                          alt='compactImg'
                          width={50}
                          height={50}
                           className={classNames(
                          "bg-indigo-500 block w-full lg:w-auto m-1 text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
                          // Img Apiladas
                          {
                            " w-10 h-30 border-2  border-white rounded-full dark:border-gray-800": compact === true,
                          },)}
                          />
                          </div>
                        // <img src={url}
                        // alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                        // className={classNames(
                        //   "bg-indigo-500 block w-full lg:w-auto m-1 text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
                        //   // Img Apiladas
                        //   {
                        //     " w-10 h-10 border-2 border-white rounded-full dark:border-gray-800": compact === true,
                        //   },)}
                        // />

                      ) : null}
                  {!compact ? (
                    <div   id={UrlId} className="col-span-6 sm:col-span-1 mb-10">
                      <Row gutter={16}>
                       <Space direction="vertical" bordered={false} size={16}>
                        <Card
                            title=''
                            bordered={false}
                        >
                            {onActiveCarousel ? (
                              <Button className='bg-white'  type="text" shape="circle" onClick={() => showConfirm( UrlId) } ><DeleteTwoTone twoToneColor='#eb2f96' /></Button>
                            ) : null}
                            <Image
                              onClick={onActiveCarousel==true ? showModal : showModalStamp}
                              quality={10}
                              loader={loader}
                              src={getStrapiURL(url)}
                              blurDataURL={getStrapiURL(url)}
                              alt='Img'
                              width={100}
                              height={100}
                              className={classNames(
                                // Common classes
                                " block w-full lg:w-screen text-center uppercase tracking-wide font-semibold text-base md:text-sm  rounded-md",
                                // Img Apiladas
                                {
                                  "w-5 h-20 border-2 border-white rounded-full dark:border-gray-800": compact === true,
                                },)}

                          />
                            {/* <img  onClick={showModal}  src={url}
                            alt=""
                            className={classNames(
                              // Common classes
                              " block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm  rounded-md",
                              // Img Apiladas
                              {
                                "w-5 h-20 border-2 border-white rounded-full dark:border-gray-800": compact === true,
                              },)}
                            />          */}
                        </Card>
                      </Space>
                      </Row>
                  </div>
                      ) : null}
            </div>
         ) : null}
      <LoadingModal />
    </>

  )
}

export default ImgReference