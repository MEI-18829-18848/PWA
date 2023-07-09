import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Modal, TimePicker, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { deleteReservation, fetchSlot, updateReservation } from "../../services/slots.service";
import './slotView.css';

const SlotView: React.FC = () => {
    const { stationId, id } = useParams<{ stationId: string, id: string }>();
    const [slot, setSlot] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingReservation, setEditingReservation] = useState<any>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    useEffect(() => {
        const fetchSlotData = async () => {
            const data = await fetchSlot(stationId, id);
            setSlot(data);
        };
        fetchSlotData();
    }, [stationId, id]);

    const handleEdit = (reservation: any) => {
        setEditingReservation(reservation);
        setStartTime(dayjs(reservation.startTime));
        setEndTime(dayjs(reservation.endTime));
        setIsModalVisible(true);
    };

    const handleDelete = async (reservationId: string) => {
        try {
            await deleteReservation(stationId, id, reservationId);
            const data = await fetchSlot(stationId, id);
            setSlot(data);
        } catch (error) {
            message.error('Error deleting reservation.');
        }
    };

    const handleOk = async () => {
        if (startTime && endTime && editingReservation) {
            const durationMinutes = editingReservation.duration;
            const timeDifference = endTime.diff(startTime, 'minute');

            if (timeDifference !== durationMinutes) {
                message.error('The time interval must be the same as the duration.');
                return;
            }

            try {
                const updatedData = {
                    ...editingReservation,
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                };
                await updateReservation(stationId, id, editingReservation._id, updatedData);
                const data = await fetchSlot(stationId, id);
                setSlot(data);
                setIsModalVisible(false);
            } catch (error) {
                message.error('Error updating reservation.');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Duration (minutes)',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Total KW',
            dataIndex: 'totalKW',
            key: 'totalKW',
        },
        {
            title: 'Price per kWh',
            dataIndex: 'pricePerKw',
            key: 'pricePerKw',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: any) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} style={{ marginLeft: '10px' }} />
                </span>
            ),
        },
    ];

    return (
        <div className="slot-view-container">
            <h1>Slot Reservations</h1>
            {slot && (
                <Table
                    dataSource={slot.reservations}
                    columns={columns}
                    rowKey="_id"
                    pagination={false}
                />
            )}

            <Modal title="Edit Reservation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <TimePicker
                    value={startTime}
                    format="HH:mm"
                    style={{ marginRight: '10px' }}
                    onChange={(time) => setStartTime(time)}
                />
                <TimePicker
                    value={endTime}
                    format="HH:mm"
                    onChange={(time) => setEndTime(time)}
                />
            </Modal>
        </div>
    );
};

export default SlotView;
