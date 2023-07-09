import React from "react";
import { DesktopOutlined, PieChartOutlined, BellOutlined, PoweroffOutlined, ThunderboltOutlined } from "@ant-design/icons";

type MenuItem = {
    key: React.Key;
    icon?: React.ReactNode;
    label: React.ReactNode;
};

const items: MenuItem[] = [
    { key: '/dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
    { key: '/stations', icon: <ThunderboltOutlined />, label: 'Stations' },
    { key: '/notifications', icon: <BellOutlined />, label: 'Notifications' },
    { key: '/logout', icon: <PoweroffOutlined />, label: 'Logout' },
];

const GetMenuItems = () => {
    return items;
};

export default GetMenuItems;
