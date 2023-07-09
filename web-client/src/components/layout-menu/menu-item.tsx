import React from "react";
import { DesktopOutlined, PieChartOutlined, BellOutlined } from "@ant-design/icons";

type MenuItem = {
    key: React.Key;
    icon?: React.ReactNode;
    label: React.ReactNode;
};

const items: MenuItem[] = [
    { key: '/dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
    { key: '/stations', icon: <DesktopOutlined />, label: 'Stations' },
    { key: '/notifications', icon: <BellOutlined />, label: 'Notifications' },
];

const GetMenuItems = () => {
    return items;
};

export default GetMenuItems;
