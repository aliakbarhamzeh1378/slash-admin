import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getBillingPlans, subscribeToPlan } from '@/services/billing';
import type { BillingPlan } from '@/services/billing';

const { Title, Text, Paragraph } = Typography;

const UpgradePlans: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await getBillingPlans();
        setPlans(data);
      } catch (error) {
        message.error('Failed to fetch billing plans');
        console.error('Error fetching billing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: number) => {
    try {
      setSubscribing(true);
      const plan = plans.find(plan => plan.id === planId);

      if (!plan) {
        message.error('Selected plan not found');
        return;
      }

      // Show confirmation message
      message.loading(`Subscribing to ${plan.name} plan...`);

      // Call the API to subscribe
      await subscribeToPlan(planId);

      // Show success message
      message.success(`Successfully subscribed to the ${plan.name} plan`);

      // Navigate back to the billing plans page
      navigate('/billing_plans/index');
    } catch (error: any) {
      // Show error message
      message.error(`Failed to subscribe: ${error.message || 'Unknown error'}`);
      console.error('Error subscribing to plan:', error);
    } finally {
      setSubscribing(false);
    }
  };

  const showSubscribeConfirmation = (plan: BillingPlan) => {
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  const handleConfirmSubscribe = () => {
    if (selectedPlan) {
      handleSubscribe(selectedPlan.id);
    }
    setIsModalVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={2}>Your Plan Options</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Choose the perfect plan for your needs
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {plans.map((plan) => (
          <Col key={plan.id} xs={24} sm={24} md={8}>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                boxShadow: plan.name === 'Pro' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                border: plan.name === 'Pro' ? '2px solid #1890ff' : '1px solid #f0f0f0',
              }}
              bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {plan.name === 'Pro' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1890ff',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                  }}
                >
                  RECOMMENDED
                </div>
              )}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={3} style={{ margin: 0 }}>
                  {plan.name}
                </Title>
                <div style={{ marginTop: '8px' }}>
                  <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>${plan.price}</Text>
                  <Text style={{ color: '#666' }}>/month</Text>
                </div>
              </div>
              <Paragraph style={{ textAlign: 'center', marginBottom: '24px' }}>
                {plan.description}
              </Paragraph>
              <div style={{ flex: 1 }}>
                {plan.features.map((feature, index) => (
                  <div
                    key={`${plan.id}-feature-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <Text>{feature}</Text>
                  </div>
                ))}
              </div>
              <Button
                type={plan.name === 'Pro' ? 'primary' : 'default'}
                size="large"
                onClick={() => showSubscribeConfirmation(plan)}
                loading={subscribing}
                block
                style={{ marginTop: '24px' }}
              >
                {plan.name === 'Pro' ? 'Get Started' : 'Select Plan'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Subscription"
        open={isModalVisible}
        onOk={handleConfirmSubscribe}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={subscribing}
      >
        {selectedPlan && (
          <div>
            <p>Are you sure you want to subscribe to the <strong>{selectedPlan.name}</strong> plan?</p>
            <p>This will cost <strong>${selectedPlan.price}/month</strong>.</p>
            <p>Your current subscription will be canceled and replaced with this new plan.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UpgradePlans; 