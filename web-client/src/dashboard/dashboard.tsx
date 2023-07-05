import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    BellOutlined,
} from '@ant-design/icons';
import './dashboard.css';

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
    { key: '1', icon: <PieChartOutlined />, text: 'Dashboard' },
    { key: '2', icon: <DesktopOutlined />, text: 'Stations' },
    { key: '3', icon: <BellOutlined />, text: 'Notifications' },
];

const Dashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible className="light-sider">
                <div className="logo" />
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.text}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {/* Content goes here */}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
