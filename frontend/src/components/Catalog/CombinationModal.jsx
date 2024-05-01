
import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Image from 'next/image';
import { getStrapiURL } from 'utils/api'

const CombinationModal = ({ title, isModalVisible, handleOk, handleCancel, url, referencia, id }) => {

    const [imageURL, setImageURL] = useState(getStrapiURL(url));

    return (
      <Modal
        title={title}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        // footer={null}
        okButtonProps={
          Button && {
            type: 'default',
          }
        }
      >
        <div className="text-center mb-4">
          { imageURL ? (
            <Image
                src={imageURL}
                alt={referencia}
                width={500}
                height={500}

            />
          ) : '' }
            <div className="mt-4">
                <Button type="link"
                // href={`/docs/combination-view/${id}`}
                href={`/docs/combination-view?ref=${referencia}`}
                >
                  {/* <Link to={`/docs/combination-view/${id}`}> */}
                    Edit Combination
                  {/* </Link> */}
                </Button>
            </div>
        </div>
      </Modal>
    )
};

export default CombinationModal;