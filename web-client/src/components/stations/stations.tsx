import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchStations as getStations } from "../../services/stations.service";
import './stations.css';

const Stations: React.FC = () => {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = async () => {
            const data = await getStations();
            setStations(data);
        };
        fetchStations();
    }, []);

    const columns = [
        {
            title: 'Station Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '15%',
        },
        {
            title: 'Coordinates',
            dataIndex: 'location',
            key: 'coordinates',
            render: (location: any) => location.coordinates.join(', '),
        },
        {
            title: 'Operation Time',
            dataIndex: 'operationTime',
            key: 'operationTime',
            render: (operationTime: any) => `${operationTime.start} - ${operationTime.end}`,
        },
        {
            title: 'kWh Capacity',
            dataIndex: 'kwhCapacity',
            key: 'kwhCapacity',
        },
        {
            title: 'Plug Type',
            dataIndex: 'plugType',
            key: 'plugType',
        },
        {
            title: 'Price per kWh',
            dataIndex: 'pricePerKw',
            key: 'pricePerKw',
        },
        {
            title: '',
            key: 'actions',
            render: (text: any, record: any) => (
                <Tooltip title="View">
                    <Button type="link" icon={<EyeOutlined />} onClick={() => navigate(`/stations/${record._id}`)} />
                </Tooltip>
            ),
            width: '5%'
        },
    ];

    return (
        <div className="stations-container">
            <div className="stations-header">
                <h2>Stations</h2>
                <Button type="primary" onClick={() => navigate('/stations/new')}>
                    Add Station
                </Button>
            </div>
            <Table
                dataSource={stations}
                columns={columns}
                rowKey="_id"
                pagination={false}
                scroll={{ y: 'calc(65vh)', }}
            />
        </div>
    );
};

export default Stations;
