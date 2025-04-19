import { Card, Space, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const Api: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>API Documentation</Title>
        <Paragraph>
          Learn how to integrate with our platform using our REST API.
        </Paragraph>
        <Paragraph>
          This section will cover:
          <ul>
            <li>API authentication</li>
            <li>Available endpoints</li>
            <li>Request/response formats</li>
            <li>Rate limiting and best practices</li>
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
};

export default Api;