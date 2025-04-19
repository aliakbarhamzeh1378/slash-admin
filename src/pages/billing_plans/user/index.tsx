import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Progress, Row, Statistic, Typography } from 'antd';
import type React from 'react';

const { Title, Text } = Typography;

const BillingPlansIndex: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const currentPlan = {
    name: 'Pro Plan',
    price: '$29.99/month',
    status: 'Active',
    nextBillingDate: '2024-05-01',
    features: ['Unlimited Projects', 'Team Collaboration', 'Advanced Analytics', 'Priority Support'],
  };

  const usageStats = {
    apiCalls: {
      used: 75000,
      total: 100000,
      percentage: 75,
    },
    storage: {
      used: 45,
      total: 100,
      percentage: 45,
    },
    teamMembers: {
      used: 8,
      total: 10,
      percentage: 80,
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Current Plan: {currentPlan.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Monthly Cost"
                  value={currentPlan.price}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Status"
                  value={currentPlan.status}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Next Billing Date"
                  value={currentPlan.nextBillingDate}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Plan Features">
            <Row gutter={[16, 16]}>
              {currentPlan.features.map((feature, index) => (
                <Col span={6} key={index}>
                  <Text>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> {feature}
                  </Text>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Usage Statistics">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Text>API Calls</Text>
                  <Progress
                    percent={usageStats.apiCalls.percentage}
                    format={() => `${usageStats.apiCalls.used.toLocaleString()} / ${usageStats.apiCalls.total.toLocaleString()}`}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Text>Storage Usage</Text>
                  <Progress
                    percent={usageStats.storage.percentage}
                    format={() => `${usageStats.storage.used}GB / ${usageStats.storage.total}GB`}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Text>Team Members</Text>
                  <Progress
                    percent={usageStats.teamMembers.percentage}
                    format={() => `${usageStats.teamMembers.used} / ${usageStats.teamMembers.total}`}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Row gutter={16} justify="end">
              <Col>
                <Button type="primary" href="/billing_plans/upgrade">
                  Upgrade Plan
                </Button>
              </Col>
              <Col>
                <Button href="/billing_plans/history">View Billing History</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BillingPlansIndex; 