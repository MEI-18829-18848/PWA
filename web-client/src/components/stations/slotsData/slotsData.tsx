import React from "react";
import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {deleteSlot} from "../../../services/slots.service";
import {useNavigate} from "react-router-dom";

const SlotsDisplay: React.FC<{ slots: any[], stationId: string, addSlotTrigger: () => void; fetchData: () => void; }> = ({ slots, stationId, addSlotTrigger, fetchData }) => {

    const navigate = useNavigate()
    const deleteSlotHandler = async (id: string) => {
        await deleteSlot(stationId, id)
        fetchData()
    }
    const seeSlotHandler = async (id: string) => {
        navigate(`/stations/${stationId}/slots/${id}`)
    }


    const columns = [
        {
            title: 'Slot ID',
            dataIndex: '_id',
            key: 'slotId',
        },
        {
            title: 'Total Reservations',
            dataIndex: 'reservations',
            key: 'reservations',
            render: (reservations: any[]) => reservations?.length,
        },
        {
            title: 'Total Price',
            dataIndex: 'reservations',
            key: 'totalPrice',
            render: (reservations: any[]) => reservations?.reduce((sum, res) => sum + res.totalPrice, 0),
        },
        {
            title: 'Total KW',
            dataIndex: 'reservations',
            key: 'totalKW',
            render: (reservations: any[]) => reservations?.reduce((sum, res) => sum + res.totalKW, 0),
        },
        {
            title: '',
            key: 'actions',
            render: (text: any, record: any) => (
                <span>
                    <Tooltip title="View">
                        <Button type="link" icon={<EyeOutlined />} onClick={() => seeSlotHandler(record._id)} />
                    </Tooltip>
                    <Tooltip title={record.reservations && record.reservations.length > 0 ? "Cannot delete slot with reservations." : "Delete"}>
                        <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteSlotHandler(record._id)} disabled={record.reservations && record.reservations.length > 0} />
                    </Tooltip>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ marginBottom: '10px' }} onClick={addSlotTrigger}>
                Add Slot
            </Button>
            <Table
                dataSource={slots}
                columns={columns}
                rowKey="_id"
            />
        </div>
    );
};

export default SlotsDisplay;
