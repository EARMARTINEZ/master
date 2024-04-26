import CombinationBoard from '@/components/Combinations/CombinationBoard'
import { Tabs } from 'antd'
const { TabPane } = Tabs;

export function CombinationView() {
  return (
    <div className=''>
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ color: "#8D949C" }}
        style={{ width: "100%" }}
      >
        <TabPane
          tab="Create"
          key="1"
        >
          <CombinationBoard action={'crear'} />
        </TabPane>
        <TabPane tab="Edit" key="2">
          <CombinationBoard action={'editar'} />
        </TabPane>
      </Tabs>
    </div>
)
}