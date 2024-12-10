import { Button, Card, Form, Input, Typography, notification } from 'antd';
import axiosInstance from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
}

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post<LoginResponse>('user/login', {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token || '');
        notification.success({
          message: 'Login Successful',
          description: 'Redirecting to the home page.',
        });

        window.location.href = '/home';
      } else {
        notification.error({
          message: 'Login Failed',
          description: response.data.message,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error({
          message: 'Login Failed',
          description:
            err?.response?.data?.message || 'An error occurred during login.',
        });
      } else {
        notification.error({
          message: 'Login Error',
          description: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{ width: '50%', padding: '24px' }} title="Login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Typography.Link onClick={() => navigate('/register')}>
            Don't have an account? Register here
          </Typography.Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
