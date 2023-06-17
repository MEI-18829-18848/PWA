import React, {useState} from 'react';
import {Layout, Menu, theme} from 'antd';
import {Outlet} from "react-router-dom";
import GetMenuItems from "./menu-item";

const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;

const SideMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [headerString, setHeaderString] = useState("");
    const [menuItems, setMenuItems] = useState(GetMenuItems())


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                <div className="demo-logo-vertical"/>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={menuItems}/>
            </Sider>
            <Layout >
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <h1>{headerString}</h1>
                </Header>
                <Content style={{margin: '0 16px'}}>

                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer, marginTop: 20}}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>EzCharge ©2023 Created with Ant Design</Footer>
            </Layout>
        </Layout>
    );
};

export default SideMenu;