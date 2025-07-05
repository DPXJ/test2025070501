import React, { useState } from 'react'
import { Card, Table, Button, Space, Tag, Input, DatePicker, Select, Tabs, Empty } from 'antd'
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
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('board')
  const [selectedProject, setSelectedProject] = useState('1')

  // 新表头字段
  const columns: ColumnsType<any> = [
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
          <a style={{ color: '#1677ff' }}>编辑</a>
          <a style={{ color: '#1677ff' }}>查看</a>
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </Space>
      ),
    },
  ]

  // 模拟数据（6条，父子结构）
  // 随机生成BOM单数量和总数量
  function getRandomBomQty() {
    return Math.floor(Math.random() * 15) + 1
  }
  const parentBomQty = getRandomBomQty()
  const data = [
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
        (() => { const bomQty = getRandomBomQty(); return {
          key: 4,
          planName: '主板',
          brand: '品牌A',
          model: '型号D',
          functionParams: '参数D',
          bomQty,
          quantity: bomQty * 10,
          unit: '块',
          location: '淮滨首部',
          purchasedQty: 0,
          receivedQty: 0,
          syncStatus: '未同步',
          purchaseStatus: '未采购',
          planEntryTime: '2024-07-14',
          planDays: 6,
          purchaseProgress: '0%',
          purchaseCycle: 6,
          arrivalProgress: '0%',
          constructionProgress: '0%',
          debugProgress: '0%',
          isPurchase: '否',
          isConstruction: '是',
          isInstall: '否',
        }})(),
        (() => { const bomQty = getRandomBomQty(); return {
          key: 5,
          planName: '开关锁',
          brand: '品牌B',
          model: '型号E',
          functionParams: '参数E',
          bomQty,
          quantity: bomQty * 10,
          unit: '把',
          location: '淮滨首部',
          purchasedQty: 0,
          receivedQty: 0,
          syncStatus: '未同步',
          purchaseStatus: '未采购',
          planEntryTime: '2024-07-15',
          planDays: 7,
          purchaseProgress: '0%',
          purchaseCycle: 7,
          arrivalProgress: '0%',
          constructionProgress: '0%',
          debugProgress: '0%',
          isPurchase: '否',
          isConstruction: '否',
          isInstall: '是',
        }})(),
        (() => { const bomQty = getRandomBomQty(); return {
          key: 6,
          planName: '机箱',
          brand: '品牌C',
          model: '型号F',
          functionParams: '参数F',
          bomQty,
          quantity: bomQty * 10,
          unit: '个',
          location: '淮滨首部',
          purchasedQty: 0,
          receivedQty: 0,
          syncStatus: '未同步',
          purchaseStatus: '未采购',
          planEntryTime: '2024-07-16',
          planDays: 5,
          purchaseProgress: '0%',
          purchaseCycle: 5,
          arrivalProgress: '0%',
          constructionProgress: '0%',
          debugProgress: '0%',
          isPurchase: '否',
          isConstruction: '否',
          isInstall: '否',
        }})(),
      ],
    },
  ]

  const handleEdit = (record: ProductionRecord) => {
    console.log('编辑记录:', record)
  }

  const handleDelete = (id: string) => {
    console.log('删除记录:', id)
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
      children: null,
    },
    {
      key: 'plan',
      label: <span><ProfileOutlined /> 生产计划</span>,
      children: null,
    },
    {
      key: 'task',
      label: <span><OrderedListOutlined /> 任务</span>,
      children: null,
    },
    {
      key: 'gantt',
      label: <span><BarChartOutlined /> 甘特图</span>,
      children: null,
    },
    {
      key: 'receipt',
      label: <span><InboxOutlined /> 到货签收</span>,
      children: null,
    },
    {
      key: 'warehouse',
      label: <span><ShopOutlined /> 生产仓库</span>,
      children: null,
    },
    {
      key: 'log',
      label: <span><FileTextOutlined /> 生产日志</span>,
      children: null,
    },
    {
      key: 'docs',
      label: <span><FileDoneOutlined /> 文档</span>,
      children: null,
    },
    {
      key: 'members',
      label: <span><TeamOutlined /> 成员</span>,
      children: null,
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
      {/* 仅在“生产计划”Tab下显示原有内容 */}
      {activeTab === 'plan' && <>
        {/* 操作区域优化，按钮顺序和风格与截图1一致 */}
        <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            {/* 左侧输入框 */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
              <span style={{ fontWeight: 500, marginRight: 8 }}>计划名称</span>
              <Input placeholder="请输入计划名称" style={{ width: 220 }} />
            </div>
            {/* 按钮组 */}
            <Space size={8} wrap>
              <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
              <Button icon={<ReloadOutlined />}>重置</Button>
              <Button type="primary" icon={<PlusOutlined />}>新增</Button>
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
        {/* 搜索栏（可隐藏或合并到上方） */}
        {/*
        <Card style={{ marginBottom: 16 }}>
          <Space size="middle" wrap>
            <Input
              placeholder="搜索产品名称"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Input
              placeholder="搜索批次号"
              style={{ width: 200 }}
            />
            <Select
              placeholder="选择状态"
              style={{ width: 150 }}
              allowClear
            >
              <Option value="pending">待开始</Option>
              <Option value="in_progress">进行中</Option>
              <Option value="completed">已完成</Option>
              <Option value="cancelled">已取消</Option>
            </Select>
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              style={{ width: 240 }}
            />
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
            <Button>重置</Button>
          </Space>
        </Card>
        */}
        {/* 操作栏 */}
        {/* 数据表格 */}
        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            loading={loading}
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
      </>}
      {/* 生产看板Tab下增加提示文字 */}
      {activeTab === 'board' && (
        <div style={{ marginTop: 24 }}>
          <Card>
            <Empty description="逻辑、内容与原有系统功能保持一致" />
          </Card>
        </div>
      )}
      {/* 其他Tab占位 */}
      {activeTab !== 'plan' && activeTab !== 'board' && (
        <Card style={{ marginTop: 24 }}>
          <Empty description="逻辑、内容与原有系统功能保持一致" />
        </Card>
      )}
    </div>
  )
}

export default ProductionExecution 