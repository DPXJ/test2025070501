import React, { useState } from 'react'
import { Card, Table, Button, Space, Input, DatePicker, Select, Tabs, Empty } from 'antd'
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  HistoryOutlined,
  ImportOutlined,
  DownloadOutlined,
  ReloadOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  InboxOutlined,
  ShopOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  TeamOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { TabsProps } from 'antd'

interface ProductionRecord {
  id: string
  productName: string
  batchNumber: string
  planQuantity: number
  actualQuantity: number
  startTime: string
  endTime: string
  status: string
  operator: string
}

const ProductionExecution: React.FC = () => {
  const [activeTab, setActiveTab] = useState('board')
  const [selectedProject, setSelectedProject] = useState('1')

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
      {/* 其他内容 */}
    </div>
  )
}

export default ProductionExecution 