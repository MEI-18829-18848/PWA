import React from 'react';
import { Form, Input, Button, TimePicker, Select, InputNumber, Row, Col } from 'antd';
import './addStation.css';
import { addStation } from "../../../services/stations.service";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddStation: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const { name, owner, longitude, latitude, address, startTime, endTime, kwhCapacity, plugType, pricePerKw } = values;
        const requestBody = {
            name,
            owner,
            location: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
            address,
            operationTime: {
                start: startTime.format('ha'),
                end: endTime.format('ha'),
            },
            kwhCapacity,
            plugType,
            pricePerKw
        };
        console.log('Received values of form: ', requestBody);
        // Call the service to add a new station
        if (await addStation(requestBody) != null)
            navigate('/stations')
    };

    return (
        <div className="add-station-container">
            <Form
                name="add_station"
                onFinish={onFinish}
                className="add-station-form"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input the station name!' }]}
                >
                    <Input placeholder="Station Name" />
                </Form.Item>

                <Form.Item
                    name="owner"
                    rules={[{ required: true, message: 'Please input the owner ID!' }]}
                >
                    <Input placeholder="Owner ID" />
                </Form.Item>

                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="longitude"
                            rules={[{ required: true, message: 'Please input the longitude!' }]}
                        >
                            <Input placeholder="Longitude" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="latitude"
                            rules={[{ required: true, message: 'Please input the latitude!' }]}
                        >
                            <Input placeholder="Latitude" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="address"
                    rules={[{ required: true, message: 'Please input the address!' }]}
                >
                    <Input placeholder="Address" />
                </Form.Item>

                <Form.Item
                    name="kwhCapacity"
                    rules={[{ required: true, message: 'Please input the kWh capacity!' }]}
                >
                    <InputNumber placeholder="kWh Capacity" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="pricePerKw"
                    rules={[{ required: true, message: 'Please input the price per kWh!' }]}
                >
                    <InputNumber placeholder="Price per kWh" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="plugType"
                    rules={[{ required: true, message: 'Please select the plug type!' }]}
                >
                    <Select placeholder="Select Plug Type" style={{ width: '100%' }}>
                        <Option value="Type2">Type2</Option>
                        <Option value="CCS2">CCS2</Option>
                        <Option value="Tesla">Tesla</Option>
                    </Select>
                </Form.Item>

                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="startTime"
                            rules={[{ required: true, message: 'Please select the start time!' }]}
                        >
                            <TimePicker format="h:mm a" placeholder="Start Time" use12Hours style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="endTime"
                            rules={[{ required: true, message: 'Please select the end time!' }]}
                        >
                            <TimePicker format="h:mm a" placeholder="End Time" use12Hours style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Add Station
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddStation;
