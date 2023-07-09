import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, Form, Input, TimePicker, Select, InputNumber, Row, Col, Table, Tooltip} from 'antd';
import { fetchStation, updateStation, deleteStation } from "../../../services/stations.service";
import moment from 'moment';
import './viewStation.css';
import SlotsDisplay from "../slotsData/slotsData";
import {addSlot} from "../../../services/slots.service";

const { Option } = Select;



const StationView: React.FC = () => {
    const { id } = useParams();
    const [station, setStation] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchStationData = async () => {
        const data = await fetchStation(id);
        setStation(data);
    };

    useEffect(() => {
        if (id != undefined) {
            fetchStationData();
        }
    }, [id]);

    const handleUpdate = async (values: any) => {
        if (isEditing && id != undefined) {
            const updatedData = {
                ...values,
                location: {
                    type: "Point",
                    coordinates: [values.longitude, values.latitude],
                },
                operationTime: {
                    start: values.startTime.format('ha'),
                    end: values.endTime.format('ha'),
                },
            };
            await updateStation(id, updatedData);
        }
        setIsEditing(!isEditing);
    };

    const canDeleteStation = () => {
        if (!station || !station.slots) return true;
        return station.slots.every((slot: any) => !slot.reservations || slot.reservations.length === 0);
    };

    const handleDelete = async () => {
        if (id != undefined) {
            await deleteStation(id);
            navigate('/stations');
        }
    };

    const addSlotToStation = async () => {
        if (id != undefined) {
            await addSlot(id);
            fetchStationData();
        }
    }

    return (
        <div className="station-view-container">
            <h1>Station Details</h1>
            <Row gutter={16}>
                <Col span={12}>
                    {station && (
                        <Form
                            initialValues={{
                                ...station,
                                longitude: station.location.coordinates[0],
                                latitude: station.location.coordinates[1],
                                startTime: moment(station.operationTime.start, 'ha'),
                                endTime: moment(station.operationTime.end, 'ha'),
                            }}
                            onFinish={handleUpdate}
                        >
                            {/*
                            <Form.Item label="ID">
                                <span>{station._id}</span>
                            </Form.Item>
                            <Form.Item label="Owner">
                                <span>{station.owner}</span>
                            </Form.Item>
                            */}
                            <Form.Item label="Name" name="name">
                                <Input disabled={!isEditing} />
                            </Form.Item>
                            <Form.Item label="Address" name="address">
                                <Input disabled={!isEditing} />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Longitude" name="longitude">
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Latitude" name="latitude">
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="kWh Capacity" name="kwhCapacity">
                                <InputNumber disabled={!isEditing} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Plug Type" name="plugType">
                                <Select disabled={!isEditing} style={{ width: '100%' }}>
                                    <Option value="Type2">Type2</Option>
                                    <Option value="CCS2">CCS2</Option>
                                    <Option value="Tesla">Tesla</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Price per kWh" name="pricePerKw">
                                <InputNumber disabled={!isEditing} style={{ width: '100%' }} />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Operation Start Time" name="startTime">
                                        <TimePicker format="h:mm a" use12Hours disabled={!isEditing} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Operation End Time" name="endTime">
                                        <TimePicker format="h:mm a" use12Hours disabled={!isEditing} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="station-actions">
                                <Button
                                    type="primary"
                                    onClick={() => setIsEditing(!isEditing)}
                                    style={{ marginRight: '10px' }}
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </Button>
                                {isEditing && (
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                )}
                                <Tooltip title={canDeleteStation() ? "" : "Station cannot be deleted because it has slots with reservations."}>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={handleDelete}
                                        style={{ marginLeft: '10px' }}
                                        disabled={!canDeleteStation()}
                                    >
                                        Delete
                                    </Button>
                                </Tooltip>
                            </div>
                        </Form>
                    )}
                </Col>
                <Col span={12}>
                    {station && <SlotsDisplay slots={station.slots} stationId={station._id} addSlotTrigger={addSlotToStation} fetchData={fetchStationData} />}
                </Col>
            </Row>
        </div>
    );
};

export default StationView;
