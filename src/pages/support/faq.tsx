import { Iconify } from '@/components/icon';
import { Card, Col, Collapse, Input, Row, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

const faqCategories = [
  {
    title: 'Getting Started',
    icon: 'mdi:rocket-launch',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'To create an account, click the "Sign Up" button in the top right corner. You\'ll need to provide your email address, create a password, and verify your email. Once verified, you can start using the platform.'
      },
      {
        q: 'What are the system requirements?',
        a: 'Our platform is web-based and works on all modern browsers. We recommend using Chrome, Firefox, Safari, or Edge in their latest versions. No additional software installation is required.'
      },
      {
        q: 'How do I set up my first project?',
        a: 'After logging in, click on "New Project" in the dashboard. Follow the step-by-step wizard to configure your project settings, invite team members, and set up initial configurations.'
      }
    ]
  },
  {
    title: 'Billing & Subscription',
    icon: 'mdi:credit-card',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For enterprise customers, we also offer invoice-based billing.'
      },
      {
        q: 'How does the free trial work?',
        a: 'Our free trial lasts 14 days and includes access to all premium features. No credit card is required to start the trial. You can upgrade to a paid plan at any time during or after the trial.'
      },
      {
        q: 'Can I change my subscription plan?',
        a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. For immediate upgrades, you\'ll be charged a prorated amount for the remainder of your billing period.'
      }
    ]
  },
  {
    title: 'Security & Privacy',
    icon: 'mdi:shield-check',
    questions: [
      {
        q: 'How is my data protected?',
        a: 'We use industry-standard encryption (SSL/TLS) for all data in transit and at rest. Our infrastructure is hosted in secure, SOC 2 compliant data centers with regular security audits.'
      },
      {
        q: 'Do you offer two-factor authentication?',
        a: 'Yes, we support 2FA using authenticator apps like Google Authenticator or Authy. You can enable this in your account settings for additional security.'
      },
      {
        q: 'What is your data retention policy?',
        a: 'We retain your data for as long as your account is active. Upon account deletion, we permanently delete all associated data within 30 days, except where required by law to retain it.'
      }
    ]
  },
  {
    title: 'Technical Support',
    icon: 'mdi:tools',
    questions: [
      {
        q: 'How do I report a bug?',
        a: 'You can report bugs through our support portal, by emailing support@example.com, or by using the "Report Issue" button in the application. Please include steps to reproduce and any error messages.'
      },
      {
        q: 'What are your support hours?',
        a: 'We offer 24/7 email support for all customers. Premium support with live chat and phone support is available for Business and Enterprise plans during business hours (9 AM - 5 PM EST).'
      },
      {
        q: 'Do you offer API documentation?',
        a: 'Yes, we provide comprehensive API documentation at api.example.com. It includes detailed endpoints, authentication methods, and code examples in multiple programming languages.'
      }
    ]
  }
];

const FAQ: React.FC = () => {
  const [searchText, setSearchText] = React.useState('');

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchText.toLowerCase()) ||
      q.a.toLowerCase().includes(searchText.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="p-6">
      <Title level={2}>Frequently Asked Questions</Title>

      <Card className="mb-6">
        <Search
          placeholder="Search FAQs..."
          allowClear
          enterButton="Search"
          size="large"
          onChange={e => setSearchText(e.target.value)}
          className="max-w-xl mx-auto"
        />
      </Card>

      <Row gutter={[16, 16]}>
        {filteredCategories.map((category) => (
          <Col xs={24} key={`${category.title}`}>
            <Card
              title={
                <span className="flex items-center gap-2">
                  <Iconify icon={category.icon} />
                  {category.title}
                </span>
              }
            >
              <Collapse defaultActiveKey={['0']}>
                {category.questions.map((item, qIndex) => (
                  <Panel
                    header={item.q}
                    key={`${category.title}-${item.q}`}
                  >
                    <Text>{item.a}</Text>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FAQ; 