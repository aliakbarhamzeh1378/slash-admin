import { Iconify } from '@/components/icon';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Select, Typography, Upload, message } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const supportCategories = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'account', label: 'Account Management' },
  { value: 'security', label: 'Security Concern' },
  { value: 'other', label: 'Other' }
] as const;

const priorityLevels = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
] as const;

interface SupportTicket {
  category: typeof supportCategories[number]['value'];
  priority: typeof priorityLevels[number]['value'];
  subject: string;
  description: string;
  attachments?: any[];
}

const ContactSupport: React.FC = () => {
  const [form] = Form.useForm<SupportTicket>();
  const navigate = useNavigate();

  const onFinish = (values: SupportTicket) => {
    console.log('Form values:', values);
    message.success('Support ticket submitted successfully!');
    form.resetFields();
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="p-6">
      <Title level={2}>Contact Support</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Submit a Support Ticket">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select a category">
                  {supportCategories.map(category => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: 'Please select a priority level' }]}
              >
                <Select placeholder="Select priority level">
                  {priorityLevels.map(level => (
                    <Option key={level.value} value={level.value}>
                      {level.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="Brief description of your issue" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please provide a description' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Please provide detailed information about your issue"
                />
              </Form.Item>

              <Form.Item
                name="attachments"
                label="Attachments"
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag files to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Submit Ticket
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Other Support Options">
            <div className="space-y-4">
              <div>
                <Title level={5}>
                  <Iconify icon="mdi:email" className="mr-2" />
                  Email Support
                </Title>
                <Text>support@example.com</Text>
              </div>

              <div>
                <Title level={5}>
                  <Iconify icon="mdi:phone" className="mr-2" />
                  Phone Support
                </Title>
                <Text>+1 (555) 123-4567</Text>
                <Paragraph type="secondary">
                  Available Monday-Friday, 9 AM - 5 PM EST
                </Paragraph>
              </div>

              <div>
                <Title level={5}>
                  <Iconify icon="mdi:book-open-page-variant" className="mr-2" />
                  Documentation
                </Title>
                <Button
                  type="link"
                  onClick={() => navigate('/support/guide')}
                  block
                >
                  View Documentation
                </Button>
              </div>

              <div>
                <Title level={5}>
                  <Iconify icon="mdi:frequently-asked-questions" className="mr-2" />
                  FAQs
                </Title>
                <Button
                  type="link"
                  onClick={() => navigate('/support/faq')}
                  block
                >
                  Browse FAQs
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactSupport; 