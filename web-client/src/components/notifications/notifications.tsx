import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createNotification } from "../../services/notificationService";

const Notifications: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: { title: string, body: string }) => {
        try {
            const response = await createNotification(values.title, values.body);
            console.log('Notification created:', response);
            form.resetFields();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Create Notification</h2>
            <Form
                form={form}
                name="create-notification"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of the notification!',
                        },
                    ]}
                >
                    <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                    name="body"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the body of the notification!',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Body" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Notifications;
