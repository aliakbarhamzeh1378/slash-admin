import { GlobalOutlined, LockOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Switch, Typography } from 'antd';
import type React from 'react';

const { Title } = Typography;
const { Option } = Select;

const WebsiteSetup: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Website Setup</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          maintenanceMode: false,
          defaultLanguage: 'en',
          timezone: 'UTC',
        }}
      >
        <Card title="General Settings" style={{ marginBottom: '24px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Website Name"
                name="websiteName"
                rules={[{ required: true, message: 'Please input website name!' }]}
              >
                <Input prefix={<GlobalOutlined />} placeholder="Enter website name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Contact Email"
                name="contactEmail"
                rules={[
                  { required: true, message: 'Please input contact email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter contact email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Default Language" name="defaultLanguage">
                <Select>
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Timezone" name="timezone">
                <Select>
                  <Option value="UTC">UTC</Option>
                  <Option value="EST">EST</Option>
                  <Option value="PST">PST</Option>
                  <Option value="GMT">GMT</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Security Settings" style={{ marginBottom: '24px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="API Key"
                name="apiKey"
                rules={[{ required: true, message: 'Please input API key!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter API key" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Advanced Settings">
          <Form.Item label="Custom CSS" name="customCSS">
            <Input.TextArea rows={4} placeholder="Enter custom CSS" />
          </Form.Item>

          <Form.Item label="Custom JavaScript" name="customJS">
            <Input.TextArea rows={4} placeholder="Enter custom JavaScript" />
          </Form.Item>
        </Card>

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WebsiteSetup; 