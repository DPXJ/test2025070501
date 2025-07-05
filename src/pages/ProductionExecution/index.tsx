import React, { useState } from 'react'
import { Tabs } from 'antd'
import {
  AppstoreOutlined,
  OrderedListOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import type { TabsProps } from 'antd'

const ProductionExecution: React.FC = () => {
  const [activeTab, setActiveTab] = useState('board')

  // Tabs内容定义
  const tabItems: TabsProps['items'] = [
    {
      key: 'board',
      label: (
        <span>
          <AppstoreOutlined />
          看板视图
        </span>
      ),
      children: '看板内容'
    },
    {
      key: 'list',
      label: (
        <span>
          <OrderedListOutlined />
          列表视图
        </span>
      ),
      children: '列表内容'
    },
    {
      key: 'gantt',
      label: (
        <span>
          <BarChartOutlined />
          甘特图
        </span>
      ),
      children: '甘特图内容'
    }
  ]

  return (
    <div className="production-execution">
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  )
}

export default ProductionExecution 