import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Progress, Row, Statistic, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getCurrentPlan } from '@/services/billing';
import type { CurrentPlan } from '@/services/billing';

const { Title, Text } = Typography;

const BillingPlansIndex = () => {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        setLoading(true);
        const data = await getCurrentPlan();
        setCurrentPlan(data);
      } catch (error) {
        message.error('Failed to fetch current plan');
        console.error('Error fetching current plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPlan();
  }, []);

  if (loading || !currentPlan) {
    return <div>Loading...</div>;
  }

  const { plan, subscription, usage_stats } = currentPlan;

  const usageStats = {
    apiCalls: {
      used: usage_stats.api_calls_used,
      total: usage_stats.api_calls_limit,
      percentage: Math.round((usage_stats.api_calls_used / usage_stats.api_calls_limit) * 100),
    },
    storage: {
      used: usage_stats.storage_used,
      total: usage_stats.storage_limit,
      percentage: Math.round((usage_stats.storage_used / usage_stats.storage_limit) * 100),
    },
    teamMembers: {
      used: usage_stats.team_members_used,
      total: usage_stats.team_members_limit,
      percentage: Math.round((usage_stats.team_members_used / usage_stats.team_members_limit) * 100),
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Current Plan: {plan.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Monthly Cost"
                  value={plan.price}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Status"
                  value={subscription.status}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Next Billing Date"
                  value={subscription.end_date}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Plan Features">
            <Row gutter={[16, 16]}>
              {plan.features.map((feature: string) => (
                <Col span={6} key={feature}>
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
                    format={() => `${usageStats.storage.used}MB / ${usageStats.storage.total}MB`}
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
          <Button type="primary" size="large" onClick={() => navigate('/billing_plans/upgrade')}>
            Upgrade Plan
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BillingPlansIndex; 