import React, { useState } from 'react'
import { Card, Table, Button, Space, Input, DatePicker, Select, Tabs, Empty } from 'antd'
import {
  AppstoreOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  InboxOutlined,
  ShopOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  TeamOutlined,
  PlusOutlined,
  SyncOutlined,
  FileAddOutlined,
  DownloadOutlined,
  ImportOutlined,
  HistoryOutlined,
  ReloadOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { TabsProps } from 'antd'

const { RangePicker } = DatePicker
const { Option } = Select

interface DataType {
  key: number
  planName: string
  brand: string
  model: string
  functionParams: string
  bomQty: number
  quantity: number
  unit: string
  location: string
  purchasedQty: number
  receivedQty: number
  syncStatus: string
  purchaseStatus: string
  planEntryTime: string
  planDays: number
  purchaseProgress: string
  purchaseCycle: number
  arrivalProgress: string
  constructionProgress: string
  debugProgress: string
  isPurchase: string
  isConstruction: string
  isInstall: string
  children?: DataType[]
}

const ProductionExecution: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plan')
  const [selectedProject, setSelectedProject] = useState('1')

  // 新表头字段
  const columns: ColumnsType<DataType> = [
    {
      title: '计划名称',
      dataIndex: 'planName',
      key: 'planName',
      width: 160,
      fixed: 'left',
    },
    { title: '品牌', dataIndex: 'brand', key: 'brand', width: 100 },
    { title: '型号', dataIndex: 'model', key: 'model', width: 100 },
    { title: '功能参数', dataIndex: 'functionParams', key: 'functionParams', width: 120 },
    { 
      title: <span style={{ color: 'red' }}>BOM单数量</span>, 
      dataIndex: 'bomQty', 
      key: 'bomQty', 
      width: 100,
      render: (text) => <span style={{ color: 'red' }}>{text}</span>
    },
    { 
      title: <span style={{ color: 'red' }}>总数量</span>, 
      dataIndex: 'quantity', 
      key: 'quantity', 
      width: 100,
      render: (text) => <span style={{ color: 'red' }}>{text}</span>
    },
    { title: '单位', dataIndex: 'unit', key: 'unit', width: 80 },
    { title: '位置', dataIndex: 'location', key: 'location', width: 120 },
    { title: '已采数量', dataIndex: 'purchasedQty', key: 'purchasedQty', width: 100 },
    { title: '签收数量', dataIndex: 'receivedQty', key: 'receivedQty', width: 100 },
    { title: '同步状态', dataIndex: 'syncStatus', key: 'syncStatus', width: 100 },
    { title: '采购状态', dataIndex: 'purchaseStatus', key: 'purchaseStatus', width: 100 },
    { title: '计划进场时间', dataIndex: 'planEntryTime', key: 'planEntryTime', width: 140 },
    { title: '计划实施天数', dataIndex: 'planDays', key: 'planDays', width: 110 },
    { title: '采购进度', dataIndex: 'purchaseProgress', key: 'purchaseProgress', width: 100 },
    { title: '采购周期（天）', dataIndex: 'purchaseCycle', key: 'purchaseCycle', width: 110 },
    { title: '到货进度', dataIndex: 'arrivalProgress', key: 'arrivalProgress', width: 100 },
    { title: '施工进度（%）', dataIndex: 'constructionProgress', key: 'constructionProgress', width: 120 },
    { title: '调试进度', dataIndex: 'debugProgress', key: 'debugProgress', width: 100 },
    { title: '是否采购类', dataIndex: 'isPurchase', key: 'isPurchase', width: 100 },
    { title: '是否施工类', dataIndex: 'isConstruction', key: 'isConstruction', width: 100 },
    { title: '是否安装', dataIndex: 'isInstall', key: 'isInstall', width: 100 },
    {
      title: '操作',
      key: 'action',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link">查看</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
        </Space>
      ),
    },
  ]

  // 模拟数据（6条，父子结构）
  function getRandomBomQty() {
    return Math.floor(Math.random() * 15) + 1
  }
  const parentBomQty = getRandomBomQty()
  const data: DataType[] = [
    {
      key: 1,
      planName: '首部机器人淮滨项目（10套）',
      brand: '品牌A',
      model: '型号A',
      functionParams: '参数A',
      bomQty: parentBomQty,
      quantity: parentBomQty * 10,
      unit: '套',
      location: '淮滨首部',
      purchasedQty: 5,
      receivedQty: 3,
      syncStatus: '已同步',
      purchaseStatus: '部分采购',
      planEntryTime: '2024-07-10',
      planDays: 30,
      purchaseProgress: '50%',
      purchaseCycle: 20,
      arrivalProgress: '30%',
      constructionProgress: '10%',
      debugProgress: '0%',
      isPurchase: '是',
      isConstruction: '是',
      isInstall: '是',
      children: [
        (() => { const bomQty = getRandomBomQty(); return {
          key: 2,
          planName: '电磁阀',
          brand: '品牌B',
          model: '型号B',
          functionParams: '参数B',
          bomQty,
          quantity: bomQty * 10,
          unit: '个',
          location: '淮滨首部',
          purchasedQty: 2,
          receivedQty: 1,
          syncStatus: '未同步',
          purchaseStatus: '未采购',
          planEntryTime: '2024-07-12',
          planDays: 10,
          purchaseProgress: '20%',
          purchaseCycle: 5,
          arrivalProgress: '10%',
          constructionProgress: '0%',
          debugProgress: '0%',
          isPurchase: '是',
          isConstruction: '否',
          isInstall: '否',
        }})(),
        (() => { const bomQty = getRandomBomQty(); return {
          key: 3,
          planName: '电机',
          brand: '品牌C',
          model: '型号C',
          functionParams: '参数C',
          bomQty,
          quantity: bomQty * 10,
          unit: '台',
          location: '淮滨首部',
          purchasedQty: 3,
          receivedQty: 2,
          syncStatus: '已同步',
          purchaseStatus: '已采购',
          planEntryTime: '2024-07-13',
          planDays: 8,
          purchaseProgress: '100%',
          purchaseCycle: 8,
          arrivalProgress: '100%',
          constructionProgress: '50%',
          debugProgress: '10%',
          isPurchase: '是',
          isConstruction: '否',
          isInstall: '否',
        }})(),
      ],
    },
  ]

  const handleEdit = (record: DataType) => {
    console.log('编辑记录:', record)
  }

  const handleDelete = (key: number) => {
    console.log('删除记录:', key)
  }

  const handleAdd = () => {
    console.log('添加新记录')
  }

  const projectOptions = [
    { value: '1', label: '临颍县现代农业产业园农田生产项目' },
    { value: '2', label: '示例项目A' },
    { value: '3', label: '示例项目B' },
  ]

  // Tabs内容定义
  const tabItems: TabsProps['items'] = [
    {
      key: 'board',
      label: <span><AppstoreOutlined /> 生产看板</span>,
      children: (
        <Card>
          <Empty description="生产看板内容" />
        </Card>
      ),
    },
    {
      key: 'plan',
      label: <span><ProfileOutlined /> 生产计划</span>,
      children: (
        <>
          <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
                <span style={{ fontWeight: 500, marginRight: 8 }}>计划名称</span>
                <Input placeholder="请输入计划名称" style={{ width: 220 }} />
              </div>
              <Space size={8} wrap>
                <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                <Button icon={<ReloadOutlined />}>重置</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增</Button>
                <Button type="primary" icon={<PlusOutlined />}>批量新增</Button>
                <Button style={{ borderColor: '#52c41a', color: '#52c41a' }}>同步至任务</Button>
                <Button style={{ borderColor: '#52c41a', color: '#52c41a' }}>发起采购申请</Button>
                <Button style={{ borderColor: '#faad14', color: '#faad14' }}>同步变更</Button>
                <Button style={{ borderColor: '#faad14', color: '#faad14' }} icon={<HistoryOutlined />}>变更记录</Button>
                <Button style={{ borderColor: '#faad14', color: '#faad14' }} icon={<ImportOutlined />}>导入</Button>
                <Button style={{ borderColor: '#52c41a', color: '#52c41a' }} icon={<DownloadOutlined />}>导出</Button>
              </Space>
            </div>
          </Card>
          <Card>
            <Table
              columns={columns}
              dataSource={data}
              rowKey="key"
              pagination={{
                total: data.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
              scroll={{ x: 2400 }}
              className="small-table"
              expandable={{ defaultExpandAllRows: false }}
            />
          </Card>
        </>
      ),
    },
    {
      key: 'task',
      label: <span><OrderedListOutlined /> 任务</span>,
      children: (
        <Card>
          <Empty description="任务内容" />
        </Card>
      ),
    },
    {
      key: 'gantt',
      label: <span><BarChartOutlined /> 甘特图</span>,
      children: (
        <Card>
          <Empty description="甘特图内容" />
        </Card>
      ),
    },
    {
      key: 'receipt',
      label: <span><InboxOutlined /> 到货签收</span>,
      children: (
        <Card>
          <Empty description="到货签收内容" />
        </Card>
      ),
    },
    {
      key: 'warehouse',
      label: <span><ShopOutlined /> 生产仓库</span>,
      children: (
        <Card>
          <Empty description="生产仓库内容" />
        </Card>
      ),
    },
    {
      key: 'log',
      label: <span><FileTextOutlined /> 生产日志</span>,
      children: (
        <Card>
          <Empty description="生产日志内容" />
        </Card>
      ),
    },
    {
      key: 'docs',
      label: <span><FileDoneOutlined /> 文档</span>,
      children: (
        <Card>
          <Empty description="文档内容" />
        </Card>
      ),
    },
    {
      key: 'members',
      label: <span><TeamOutlined /> 成员</span>,
      children: (
        <Card>
          <Empty description="成员内容" />
        </Card>
      ),
    },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>生产执行</h1>
          <span style={{ color: '#8c8c8c', fontSize: 12, background: '#f7f7f7', borderRadius: 8, padding: '2px 16px', fontWeight: 400 }}>
            管理生产计划的执行情况，跟踪生产进度和质量
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 0, marginBottom: 0 }}>
          <Select
            value={selectedProject}
            onChange={setSelectedProject}
            options={projectOptions}
            style={{ width: 200, marginRight: 24 }}
            showSearch
            optionFilterProp="label"
          />
          <Tabs
            items={tabItems}
            activeKey={activeTab}
            onChange={setActiveTab}
            tabBarStyle={{ marginBottom: 0 }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductionExecution 