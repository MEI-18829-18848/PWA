import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GetMenuItems from "./menu-item";
import './layout-menu.css';
import logo from '../../assets/Logo.png';

const { Content, Footer, Sider } = Layout;

const LayoutMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const menuItems = GetMenuItems();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuClick = (path: string) => {
        navigate(path);
    };

    const breadcrumbItems = location.pathname.split('/').filter(item => item).map((item, index, arr) => (
        <Breadcrumb.Item key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</Breadcrumb.Item>
    ));

    return (
        <Layout className="layout">
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
                <div className="menu-logo">
                    <img src={logo} alt="EzCharge Logo" />
                </div>
                <Menu theme="light" selectedKeys={[location.pathname]} mode="inline">
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key as string)}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Content className="content-container">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div className="content">
                        <Outlet />
                    </div>
                </Content>
                <Footer className="footer-text">EzCharge ©2023 Created with Ant Design</Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutMenu;
