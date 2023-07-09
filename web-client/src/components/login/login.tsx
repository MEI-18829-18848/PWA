import React from 'react';
import 'antd/dist/reset.css';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/Logo.png';
import { useNavigate } from "react-router-dom";
import {login} from "../../services/auth.service";

interface InputFieldProps {
    name: string;
    rules: { required: boolean; message: string }[];
    prefix: JSX.Element;
    type: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, rules, prefix, type, placeholder }) => (
    <Form.Item name={name} rules={rules}>
        <Input prefix={prefix} type={type} placeholder={placeholder} />
    </Form.Item>
);

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        // Add your login logic here
        try {
            if (await login(values.username, values.password) != null)
                navigate('/dashboard')
        } catch (error) {
            console.error('Login error:', error);
            // Handle the error, e.g., show an error message to the user.
        }
    };

    const navigateToRegister = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate("/register");
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
            name: "password",
            rules: [{ required: true, message: 'Please input your Password!' }],
            prefix: <LockOutlined className="site-form-item-icon" />,
            type: "password",
            placeholder: "Password"
        }
    ];

    return (
        <div className="login-form-container">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <img src={logo} className="logo-image" alt="logo" />
                <div className="login-form-inputs">
                    {inputFields.map(field => (
                        <InputField key={field.name} {...field} />
                    ))}
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="" onClick={navigateToRegister}>register now!</a>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;