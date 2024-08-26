import { useEffect, useState } from 'react'
import { useTasks } from 'utils/ProviderContext'
import { BasicTasks } from 'utils/Provider/BasicProvider'
import { getStrapiURL } from 'utils/api'
import { ReloadOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { linstance } from 'utils/axioapi'

const ButtonRecharge = ({}) => {
  const { IdCollection, dogetCollectionReference, dofetchIDCollection } =
    useTasks()

  const { setReferenceMapStatus } = BasicTasks()

  const [loadings, setLoadings] = useState([])

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 6000)
  }

  return (
    <>
      <div className="m-1 grid grid-cols-2 gap-1">
        <div className="sm:col-span- col-span-6">
          <Space direction="vertical">
            <Space wrap>
              <Button
                onClick={() => {
                  // IdCollection
                  //   ? dogetCollectionReference(IdCollection)
                  //   : dogetCollectionReference('29')
                  IdCollection
                    ? dofetchIDCollection(IdCollection)
                    : dofetchIDCollection('29')
                  // enterLoading(2)
                  // setReferenceMapStatus(true)
                }}
                loading={loadings[2]}
                icon={<ReloadOutlined />}
              ></Button>
            </Space>
          </Space>
        </div>
      </div>
    </>
  )
}

export default ButtonRecharge