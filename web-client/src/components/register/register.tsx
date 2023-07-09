import React from 'react';
import 'antd/dist/reset.css';
import './register.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../../assets/Logo.png';
import { useNavigate } from "react-router-dom";
import { register} from "../../services/auth.service";

interface InputFieldProps {
    name: string;
    rules: { required: boolean; message: string; validator?: (rule: any, value: any) => Promise<void> }[];
    prefix: JSX.Element;
    type: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, rules, prefix, type, placeholder }) => (
    <Form.Item name={name} rules={rules}>
        <Input prefix={prefix} type={type} placeholder={placeholder} />
    </Form.Item>
);

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);

        try {
            var x = await register(values.username, values.password, values.email)
            console.log(x)
            if( x != null )
                navigate('/login')
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    const emailValidator = (rule: any, value: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('Please enter a valid email!');
    };

    const navigateToLogin = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate("/login");
    };

    const inputFields = [
        {
            name: "username",
            rules: [{ required: true, message: 'Please input your Username!' }],
            prefix: <UserOutlined className="site-form-item-icon" />,
            type: "text",
            placeholder: "Username"
        },
        {
            name: "email",
            rules: [{ required: true, message: 'Please input your Email!', validator: emailValidator }],
            prefix: <MailOutlined className="site-form-item-icon" />,
            type: "email",
            placeholder: "Email"
        },
        {
            name: "password",
            rules: [{ required: true, message: 'Please input your Password!' }],
            prefix: <LockOutlined className="site-form-item-icon" />,
            type: "password",
            placeholder: "Password"
        }
    ];

    return (
        <div className="register-form-container">
            <Form
                name="normal_register"
                className="register-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <img src={logo} className="logo-image" alt="logo" />
                <div className="register-form-inputs">
                    {inputFields.map(field => (
                        <InputField key={field.name} {...field} />
                    ))}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Register
                        </Button>
                        Or <a href="" onClick={navigateToLogin}>login now!</a>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;
