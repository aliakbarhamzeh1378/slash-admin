import { Button, Card, Col, Row, Typography } from 'antd';
import type React from 'react';

const { Title, Text } = Typography;

const UpgradePlans: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Upgrade Your Plan</Title>
      <Text>Choose a plan that best suits your needs</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="Basic Plan">
            <Text>Perfect for individuals</Text>
            <Button type="primary" block style={{ marginTop: 16 }}>
              Select Plan
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pro Plan">
            <Text>Best for small teams</Text>
            <Button type="primary" block style={{ marginTop: 16 }}>
              Select Plan
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Enterprise Plan">
            <Text>For large organizations</Text>
            <Button type="primary" block style={{ marginTop: 16 }}>
              Select Plan
            </Button>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default UpgradePlans; 