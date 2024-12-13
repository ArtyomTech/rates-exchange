import { Button, Card, Form, Input, notification, Typography } from 'antd';
import axiosInstance from '../axios/axiosInstance';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegisterResponse {
  message: string;
  success: boolean;
  username?: string;
}

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        'user/register',
        {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      );

      const { message, username } = response.data;
      notification.success({
        message: `${message}`,
        description: `You have successfully registered as ${username}. Redirecting to login page.`,
        placement: 'topRight',
      });

      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        notification.error({
          message: 'Request Failed',
          description:
            error.response?.data.message || 'An unknown error occurred',
        });
      } else {
        notification.error({
          message: 'Request Failed',
          description: 'An unknown error occurred',
          duration: 3,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <Card style={{ width: '50%', padding: '24px' }} title="Register">
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
            <Typography.Link onClick={() => navigate('/')}>
              Already have an account? Login here
            </Typography.Link>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
