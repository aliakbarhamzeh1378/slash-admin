import { DownloadOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Progress, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type React from 'react';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ExportManagement: React.FC = () => {
  const [form] = Form.useForm();

  const exportHistory = [
    {
      key: '1',
      type: 'User Data',
      format: 'CSV',
      status: 'completed',
      size: '2.5 MB',
      date: '2024-03-15 14:30',
      progress: 100
    },
    {
      key: '2',
      type: 'Analytics',
      format: 'JSON',
      status: 'in_progress',
      size: '1.8 MB',
      date: '2024-03-15 14:25',
      progress: 65
    },
    {
      key: '3',
      type: 'System Logs',
      format: 'TXT',
      status: 'failed',
      size: '0 MB',
      date: '2024-03-15 14:20',
      progress: 0
    },
  ];

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Format', dataIndex: 'format', key: 'format' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          completed: 'green',
          in_progress: 'blue',
          failed: 'red'
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Export Management</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Export Configuration">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                dataType: 'user_data',
                format: 'csv',
                dateRange: null,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Data Type"
                    name="dataType"
                    rules={[{ required: true, message: 'Please select data type!' }]}
                  >
                    <Select>
                      <Option value="user_data">User Data</Option>
                      <Option value="analytics">Analytics</Option>
                      <Option value="system_logs">System Logs</Option>
                      <Option value="transactions">Transactions</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Export Format"
                    name="format"
                    rules={[{ required: true, message: 'Please select format!' }]}
                  >
                    <Select>
                      <Option value="csv">CSV</Option>
                      <Option value="json">JSON</Option>
                      <Option value="txt">TXT</Option>
                      <Option value="xlsx">Excel</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Date Range"
                name="dateRange"
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<DownloadOutlined />}>
                  Export Data
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Export Statistics">
            <p>Total Exports: 156</p>
            <p>Success Rate: 98%</p>
            <p>Total Data Exported: 1.2 GB</p>
            <p>Average Export Time: 45s</p>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <HistoryOutlined />
            Export History
          </Space>
        }
        style={{ marginTop: '16px' }}
      >
        <Table
          dataSource={exportHistory}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ExportManagement; 