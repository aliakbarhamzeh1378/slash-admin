import { Card, Space, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const Webhooks: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Webhooks</Title>
        <Paragraph>
          Learn how to use webhooks to receive real-time updates from our platform.
        </Paragraph>
        <Paragraph>
          This section will cover:
          <ul>
            <li>Setting up webhooks</li>
            <li>Available webhook events</li>
            <li>Security and authentication</li>
            <li>Testing and debugging</li>
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
};

export default Webhooks;