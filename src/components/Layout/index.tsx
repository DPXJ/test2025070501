import React, { useState } from 'react'
import { Layout, Menu, Typography, Avatar } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  SettingOutlined, 
  CheckCircleOutlined, 
  PlayCircleOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title } = Typography

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuProps['items'] = [
    {
      key: 'production',
      icon: <SettingOutlined />,
      label: '生产管理',
      children: [
        {
          key: '/production/execution',
          icon: <PlayCircleOutlined />,
          label: '生产执行',
        },
        {
          key: '/production/acceptance',
          icon: <CheckCircleOutlined />,
          label: '生产验收',
        },
      ],
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const getSelectedKeys = () => {
    return [location.pathname]
  }

  const getOpenKeys = () => {
    if (location.pathname.includes('/production/')) {
      return ['production']
    }
    return []
  }

  return (
    <Layout className="layout-container">
      <Header className="layout-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: '16px', marginRight: '16px', cursor: 'pointer' }
            })}
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              生产管理系统
            </Title>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <span style={{ marginLeft: '8px' }}>管理员</span>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          className="layout-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          theme="light"
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Content className="layout-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout 