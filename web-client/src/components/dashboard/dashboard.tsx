import { Card, Col, Divider, List, Progress, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Dashboard: React.FC = () => {
    const [totalSales, setTotalSales] = useState<string>();
    const [reservations, setReservations] = useState<string>();
    const [transactions, setTransactions] = useState<string>();
    const [operationalSlots, setOperationalSlots] = useState<string>();
    const [topStations, setTopStations] = useState<any>();

    useEffect(() => {
        setTotalSales('1000')
        setReservations('10000')
        setTransactions('1000')
        setOperationalSlots('90')
    }, [totalSales]);
    
    return (
        <div className='dashboard-container'>
            <Row className='dashboard-header' gutter={16}>
                <Col span={6}>
                    <Card title="Total Sales"
                    size='small' headStyle={{ textAlign: 'start' }}
                    className='dashboard-card' bordered={false} style={{ width: 300 }}>
                        <h3 className='card-content'>$ {totalSales}</h3>
                        <br/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Reservations"
                        size='small' headStyle={{ textAlign: 'start' }}
                        className='.dashboard-card' bordered={false} style={{ width: 300 }}>
                            <h3>{reservations}</h3>
                            <br/>
                        </Card>
                </Col>
                <Col span={6}>
                    <Card title="Transactions"
                        size='small' headStyle={{ textAlign: 'start' }}
                        className='.dashboard-card' bordered={false} style={{ width: 300 }}>
                            <h3>{transactions}</h3>
                            <br/>
                        </Card>
                </Col>
                <Col span={6}>
                    <Card title="Operational Slots"
                        size='small' headStyle={{ textAlign: 'start' }}
                        className='.dashboard-card' bordered={false} style={{ width: 300 }}>
                            <h3>{operationalSlots}%</h3>
                            <Progress percent={Number.parseInt(operationalSlots!)} showInfo={false} />
                        </Card>
                </Col>
            </Row>
            <br/>
            <div className='dashboard-graph'>
                <Row className='dashboard-header' gutter={16}>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                <div className='dashboard-graph-bars'></div>
                    <Col span={6}></Col>
                    <Col span={6}>
                        <List style={{ width: 300 }}
                        size="small"
                        header={<div>Sales Ranking</div>}
                        bordered
                        dataSource={topStations}
                        renderItem={(item: any) => <List.Item>{item}</List.Item>}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
