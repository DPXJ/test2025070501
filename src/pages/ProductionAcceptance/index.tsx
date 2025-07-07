import React from 'react'
import { Card, Table, Button, Space, Tag, Input, Progress, Statistic, DatePicker, Select } from 'antd'
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { RangePicker } = DatePicker
const { Option } = Select

interface AcceptanceRecord {
  id: string
  productName: string
  batchNumber: string
  totalQuantity: number
  acceptedQuantity: number
  rejectedQuantity: number
  acceptanceDate: string
  inspector: string
  status: string
  qualityRate: number
  remarks: string
}

const ProductionAcceptance: React.FC = () => {
  // 如果 loading 状态未使用，可以暂时注释掉
  // const [loading, setLoading] = React.useState(false)

  // 模拟数据
  const data: AcceptanceRecord[] = [
    {
      id: '1',
      productName: '产品A',
      batchNumber: 'BATCH001',
      totalQuantity: 950,
      acceptedQuantity: 920,
      rejectedQuantity: 30,
      acceptanceDate: '2024-01-15 18:00:00',
      inspector: '质检员A',
      status: 'passed',
      qualityRate: 96.84,
      remarks: '整体质量良好'
    },
    {
      id: '2',
      productName: '产品B',
      batchNumber: 'BATCH002',
      totalQuantity: 800,
      acceptedQuantity: 0,
      rejectedQuantity: 0,
      acceptanceDate: '',
      inspector: '质检员B',
      status: 'pending',
      qualityRate: 0,
      remarks: ''
    },
    {
      id: '3',
      productName: '产品C',
      batchNumber: 'BATCH003',
      totalQuantity: 1200,
      acceptedQuantity: 1100,
      rejectedQuantity: 100,
      acceptanceDate: '2024-01-16 19:30:00',
      inspector: '质检员C',
      status: 'rejected',
      qualityRate: 91.67,
      remarks: '部分产品存在质量问题'
    }
  ]

  const columns: ColumnsType<AcceptanceRecord> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 120,
    },
    {
      title: '批次号',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      width: 120,
    },
    {
      title: '总数量',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 100,
      render: (value) => `${value}件`,
    },
    {
      title: '合格数量',
      dataIndex: 'acceptedQuantity',
      key: 'acceptedQuantity',
      width: 100,
      render: (value) => `${value}件`,
    },
    {
      title: '不合格数量',
      dataIndex: 'rejectedQuantity',
      key: 'rejectedQuantity',
      width: 100,
      render: (value) => `${value}件`,
    },
    {
      title: '质量合格率',
      dataIndex: 'qualityRate',
      key: 'qualityRate',
      width: 150,
      render: (rate) => {
        const color = rate >= 95 ? 'success' : rate >= 90 ? 'normal' : 'exception'
        return <Progress percent={rate} size="small" status={color} />
      },
    },
    {
      title: '验收时间',
      dataIndex: 'acceptanceDate',
      key: 'acceptanceDate',
      width: 150,
      render: (value) => value || '-',
    },
    {
      title: '检验员',
      dataIndex: 'inspector',
      key: 'inspector',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          pending: { color: 'orange', text: '待验收', icon: <ExclamationCircleOutlined /> },
          passed: { color: 'green', text: '已通过', icon: <CheckCircleOutlined /> },
          rejected: { color: 'red', text: '已拒绝', icon: <CloseCircleOutlined /> },
        }
        const config = statusMap[status as keyof typeof statusMap]
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 200,
      render: (value) => value || '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Button
                type="link"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAccept(record.id)}
              >
                通过
              </Button>
              <Button
                type="link"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleReject(record.id)}
              >
                拒绝
              </Button>
            </>
          )}
          <Button
            type="link"
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ]

  const handleAccept = (id: string) => {
    console.log('通过验收:', id)
  }

  const handleReject = (id: string) => {
    console.log('拒绝验收:', id)
  }

  const handleViewDetail = (record: AcceptanceRecord) => {
    console.log('查看详情:', record)
  }

  // 统计数据
  const totalRecords = data.length
  const pendingCount = data.filter(item => item.status === 'pending').length
  const passedCount = data.filter(item => item.status === 'passed').length
  const rejectedCount = data.filter(item => item.status === 'rejected').length
  const averageQualityRate = data.reduce((sum, item) => sum + item.qualityRate, 0) / totalRecords

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">生产验收</h1>
        <p className="page-description">对已完成的生产任务进行质量验收，确保产品质量符合标准</p>
      </div>

      {/* 统计卡片 */}
      <div style={{ marginBottom: 16 }}>
        <Space size="large">
          <Card>
            <Statistic title="总验收批次" value={totalRecords} />
          </Card>
          <Card>
            <Statistic title="待验收" value={pendingCount} valueStyle={{ color: '#faad14' }} />
          </Card>
          <Card>
            <Statistic title="已通过" value={passedCount} valueStyle={{ color: '#52c41a' }} />
          </Card>
          <Card>
            <Statistic title="已拒绝" value={rejectedCount} valueStyle={{ color: '#f5222d' }} />
          </Card>
          <Card>
            <Statistic 
              title="平均合格率" 
              value={averageQualityRate.toFixed(2)} 
              suffix="%" 
              valueStyle={{ color: averageQualityRate >= 95 ? '#52c41a' : '#faad14' }}
            />
          </Card>
        </Space>
      </div>

      {/* 搜索栏 */}
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
            <Option value="pending">待验收</Option>
            <Option value="passed">已通过</Option>
            <Option value="rejected">已拒绝</Option>
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

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          // loading={loading} // 如果 loading 状态未使用，可以暂时注释掉
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}

export default ProductionAcceptance 