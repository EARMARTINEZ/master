import CombinationBoard from '@/components/Combinations/CombinationBoard'
import { Tabs } from 'antd'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const { TabPane } = Tabs;

export function CombinationView() {

    // const location = useLocation()
    // const searchParams = new URLSearchParams(location.search)
    // const ref = searchParams.get('ref') ? parseInt(searchParams.get('ref')) : null

    // useEffect(() => {
    //   if (ref) {
    //     console.log('CombinationView', ref)
    //   }
    // }, [ref])

  const ref = null

  return (
    <div className="">
      {/* <Router> */}
      <Tabs
        defaultActiveKey={ref ? '2' : '1'}
        tabBarStyle={{ color: '#8D949C' }}
        style={{ width: '100%' }}
      >
        <TabPane tab="Create" key="1">
          <CombinationBoard action={'crear'} />
        </TabPane>
        <TabPane tab="Edit" key="2">
          <CombinationBoard action={'editar'} refToEdit={ref} />
        </TabPane>
      </Tabs>
      {/* </Router> */}
    </div>
  )
}