import CombinationBoard from '@/components/Combinations/CombinationBoard'
import { Tabs } from 'antd'
import { useSearchParams } from 'next/navigation'

const { TabPane } = Tabs;

export function CombinationView() {

  const searchParams = useSearchParams()
  const search = searchParams.get('ref')
  const ref = search ? parseInt(search) : null

  // const ref = null

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