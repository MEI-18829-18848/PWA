import React, { RefAttributes, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, Form, Input, TimePicker, Select, InputNumber, Row, Col, 
    Table, Tooltip, Upload, UploadProps, message, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchStation, updateStation, deleteStation, uploadStationImage, downloadStationImage } from "../../../services/stations.service";
import moment from 'moment';
import './viewStation.css';
import SlotsDisplay from "../slotsData/slotsData";
import {addSlot} from "../../../services/slots.service";
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { UploadRef } from 'antd/es/upload/Upload';
import axios, { HttpStatusCode } from 'axios';
import { error } from 'console';

const { Option } = Select;

const StationView: React.FC = () => {
    const { id } = useParams();
    const [station, setStation] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<RcFile>();
    const [imageUrl, setImageUrl] = useState<string>();
    const navigate = useNavigate();

    const fetchStationData = async () => {
        const data = await fetchStation(id);
        setStation(data);
    };
    
    const fetchStationImage = async () => {
        setImageUrl(`http://localhost:3000/charging-stations/image/${id}`);
    }
    
    useEffect(() => {
        if (id != undefined) {
            fetchStationData();
            fetchStationImage();
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
    
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info.file.status)
        switch(info.file.status){
            case 'uploading':
                setLoading(true);
                return;
            case 'done':
                setLoading(false);
                fetchStationImage();
                break;
            case 'error':
                setLoading(false);
                console.log(info.file)
                break;
        }
    };
    
    const handleCustomRequest = async (options: any) => {
        const { file, onSuccess, onError, onProgress } = options;
        try {
            console.log(file)
            let res = await uploadStationImage(file, id!);
            message.success("Image uploaded successfully!")
            onSuccess(res);
        } catch (error) {
            // Handle upload error
            message.error("An error ocurred while uploading image")
            onError(error);
        }
    };

    const beforeImageUpload = (file: RcFile) => {
        let isSupportedType = false;
        const isLt2M = file.size / 1024 / 1024 < 2;
        switch (file.type) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/svg+xml':
            case 'image/webp':
                isSupportedType = true;
                if (!isLt2M) {
                    message.error('Max file size is 2MB.');
                    break;
                }
                setImage(file)
                break;
            default:
                setImage(undefined)
                console.log(file)
                message.error('Unsupported file type: must be jpg, png, svg, webp.');
                break;
        }
        console.log(isSupportedType && isLt2M)
        return isSupportedType && isLt2M;
    };

    const uploadButton = (
    <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    );

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
                            <Form.Item
                                name="stationImage"
                            >
                                <Upload name='avatar' className='station-image'
                                    listType="picture-card" showUploadList={false}
                                    customRequest={handleCustomRequest}
                                    beforeUpload={beforeImageUpload} onChange={handleChange} >
                                        {imageUrl ? 
                                            <img src={imageUrl} 
                                            alt='image' style={{ width: '100%' }} /> 
                                            : uploadButton}
                                </Upload>
                            </Form.Item>
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
