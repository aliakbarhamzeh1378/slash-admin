import { Iconify } from '@/components/icon';
import { Card, Steps, Typography } from 'antd';
import type React from 'react';

const { Title, Paragraph } = Typography;

const GuideAccountSetup: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2}>Account Setup Guide</Title>

      <Card className="mb-6">
        <Title level={3}>Setting Up Your Account</Title>
        <Paragraph>
          Follow this step-by-step guide to set up your account and get started with our platform.
        </Paragraph>
      </Card>

      <Card className="mb-6">
        <Steps
          direction="vertical"
          current={-1}
          items={[
            {
              title: 'Create Your Account',
              description: (
                <div>
                  <Paragraph>
                    1. Click the "Sign Up" button in the top right corner
                  </Paragraph>
                  <Paragraph>
                    2. Enter your email address and create a secure password
                  </Paragraph>
                  <Paragraph>
                    3. Verify your email address by clicking the link in the confirmation email
                  </Paragraph>
                </div>
              ),
              icon: <Iconify icon="mdi:account-plus" />
            },
            {
              title: 'Complete Your Profile',
              description: (
                <div>
                  <Paragraph>
                    1. Add your full name and profile picture
                  </Paragraph>
                  <Paragraph>
                    2. Set your time zone and preferred language
                  </Paragraph>
                  <Paragraph>
                    3. Add any additional contact information
                  </Paragraph>
                </div>
              ),
              icon: <Iconify icon="mdi:account-edit" />
            },
            {
              title: 'Configure Account Settings',
              description: (
                <div>
                  <Paragraph>
                    1. Set up two-factor authentication for enhanced security
                  </Paragraph>
                  <Paragraph>
                    2. Configure notification preferences
                  </Paragraph>
                  <Paragraph>
                    3. Review and accept our terms of service
                  </Paragraph>
                </div>
              ),
              icon: <Iconify icon="mdi:cog" />
            },
            {
              title: 'Set Up Your Workspace',
              description: (
                <div>
                  <Paragraph>
                    1. Create your organization profile
                  </Paragraph>
                  <Paragraph>
                    2. Customize your workspace settings
                  </Paragraph>
                  <Paragraph>
                    3. Invite team members to collaborate
                  </Paragraph>
                </div>
              ),
              icon: <Iconify icon="mdi:office-building" />
            }
          ]}
        />
      </Card>

      <Card>
        <Title level={3}>Need Help?</Title>
        <Paragraph>
          If you encounter any issues during the account setup process, our support team is here to help.
          You can:
        </Paragraph>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact our support team through the help center</li>
          <li>Check our FAQ section for common issues</li>
          <li>Join our community forum for peer support</li>
        </ul>
      </Card>
    </div>
  );
};

export default GuideAccountSetup; 