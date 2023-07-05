import React, {useState} from 'react';
import {Layout, Menu, theme} from 'antd';
import {Outlet} from "react-router-dom";
import GetMenuItems from "./menu-item";
import './layout-menu.css'
import logo from '../../assets/Logo.png'
import {log} from "util";

const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;

const LayoutMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [headerString, setHeaderString] = useState("");
    const [menuItems, setMenuItems] = useState(GetMenuItems())


    return (
        <Layout className="layout">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                <div className="menu-logo">
                    <img src={logo} alt="logo"/>
                </div>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={menuItems}/>
            </Sider>
            <Layout>
                <Header className="layout-header">
                    <h1>{headerString}</h1>
                </Header>
                <Content className="content-container">
                    <div className="content">
                        <Outlet/>
                    </div>
                </Content>
                <Footer className="footer-text">EzCharge ©2023 Created with Ant Design</Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutMenu;