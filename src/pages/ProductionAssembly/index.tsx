import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, InputNumber, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface AssemblyProduct {
  key: number;
  projectName: string;
  quantity: number;
  creator: string;
  createTime: string;
}

interface BomDetail {
  key: number;
  planName: string;
  brand: string;
  model: string;
  functionParams: string;
  bomQty: number;
  quantity: number;
  unit: string;
  location: string;
}

const ProductionAssembly: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AssemblyProduct | null>(null);
  const [form] = Form.useForm();

  // 项目选项
  const projectOptions = [
    { value: '1', label: '临颍县现代农业产业园农田生产项目' },
    { value: '2', label: '首部机器人淮滨项目' },
    { value: '3', label: '示例项目C' },
  ];

  // 列表数据
  const data: AssemblyProduct[] = [
    {
      key: 1,
      projectName: '首部机器人淮滨项目',
      quantity: 5,
      creator: '张三',
      createTime: '2024-03-15 14:30:00',
    },
    {
      key: 2,
      projectName: '临颍县现代农业产业园农田生产项目',
      quantity: 3,
      creator: '李四',
      createTime: '2024-03-14 09:15:00',
    },
  ];

  // BOM详情数据
  const bomData: BomDetail[] = [
    {
      key: 1,
      planName: '电磁阀',
      brand: '品牌A',
      model: '型号A',
      functionParams: '参数A',
      bomQty: 2,
      quantity: 10,
      unit: '个',
      location: '仓库A区',
    },
    {
      key: 2,
      planName: '电机',
      brand: '品牌B',
      model: '型号B',
      functionParams: '参数B',
      bomQty: 1,
      quantity: 5,
      unit: '台',
      location: '仓库B区',
    },
  ];

  // 主列表列定义
  const columns: ColumnsType<AssemblyProduct> = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: '项目/产品名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 300,
    },
    {
      title: '新增成品数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>
          查看
        </Button>
      ),
    },
  ];

  // BOM详情列定义
  const detailColumns: ColumnsType<BomDetail> = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    { title: '名称', dataIndex: 'planName', key: 'planName', width: 150 },
    { title: '品牌', dataIndex: 'brand', key: 'brand', width: 100 },
    { title: '型号', dataIndex: 'model', key: 'model', width: 100 },
    { title: '功能参数', dataIndex: 'functionParams', key: 'functionParams', width: 120 },
    { title: 'BOM单数量', dataIndex: 'bomQty', key: 'bomQty', width: 100 },
    { title: '库存数量', dataIndex: 'quantity', key: 'quantity', width: 100 },
    { title: '单位', dataIndex: 'unit', key: 'unit', width: 80 },
    { title: '库位', dataIndex: 'location', key: 'location', width: 120 },
  ];

  // 处理新增成品
  const handleAdd = () => {
    setIsModalVisible(true);
  };

  // 处理查看详情
  const handleViewDetail = (record: AssemblyProduct) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  // 处理表单提交
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('提交的值:', values);
      message.success('新增成功');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>组装成品管理</h1>
        </div>
      </div>

      <Card
        style={{ marginBottom: 16 }}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增成品
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 新增成品弹窗 */}
      <Modal
        title="新增成品"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="项目名称"
            name="projectName"
            rules={[{ required: true, message: '请选择项目名称' }]}
          >
            <Select
              options={projectOptions}
              placeholder="请选择项目名称"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="成品数量"
            name="quantity"
            rules={[
              { required: true, message: '请输入成品数量' },
              { type: 'number', min: 1, message: '数量必须大于0' },
              { type: 'number', integer: true, message: '请输入整数' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="请输入成品数量" />
          </Form.Item>
          <div style={{ color: '#ff4d4f', marginBottom: 16 }}>
            提示：录入成品后，仓库库存按BOM标准单自动扣减
          </div>
        </Form>
      </Modal>

      {/* 查看详情弹窗 */}
      <Modal
        title={`BOM详情 - ${selectedRecord?.projectName}`}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={detailColumns}
          dataSource={bomData}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Modal>
    </div>
  );
};

export default ProductionAssembly; 