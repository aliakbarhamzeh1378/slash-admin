import { Iconify } from '@/components/icon';
import { Button, Card, Col, Row, Steps, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

const GuideInvitingUsers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Title level={2}>Inviting Users to Your Team</Title>

      <Card className="mb-6">
        <Title level={3}>Team Collaboration</Title>
        <Paragraph>
          Inviting team members is a crucial step in setting up your workspace for collaboration.
          This guide will walk you through the process of inviting users and managing their access.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Invitation Process</Title>
            <Steps
              direction="vertical"
              current={-1}
              items={[
                {
                  title: 'Access Team Management',
                  description: (
                    <div>
                      <Paragraph>
                        Navigate to the Team Management section from your dashboard or settings menu.
                      </Paragraph>
                      <Button
                        type="link"
                        icon={<Iconify icon="mdi:account-group" />}
                        onClick={() => navigate('/team')}
                      >
                        Go to Team Management
                      </Button>
                    </div>
                  ),
                  icon: <Iconify icon="mdi:account-group" />
                },
                {
                  title: 'Initiate Invitation',
                  description: (
                    <div>
                      <Paragraph>
                        Click the "Invite Members" button and enter the email addresses of the users you want to invite.
                      </Paragraph>
                      <Paragraph>
                        You can invite multiple users at once by separating their email addresses with commas.
                      </Paragraph>
                    </div>
                  ),
                  icon: <Iconify icon="mdi:email-plus" />
                },
                {
                  title: 'Assign Roles',
                  description: (
                    <div>
                      <Paragraph>
                        For each invited user, select an appropriate role based on their responsibilities.
                      </Paragraph>
                      <Paragraph>
                        Different roles have different permission levels. Choose carefully to follow the principle of least privilege.
                      </Paragraph>
                    </div>
                  ),
                  icon: <Iconify icon="mdi:shield-account" />
                },
                {
                  title: 'Send Invitations',
                  description: (
                    <div>
                      <Paragraph>
                        Review the invitation details and click "Send Invitations".
                      </Paragraph>
                      <Paragraph>
                        Invited users will receive an email with a link to join your workspace.
                      </Paragraph>
                    </div>
                  ),
                  icon: <Iconify icon="mdi:send" />
                },
                {
                  title: 'Track Invitations',
                  description: (
                    <div>
                      <Paragraph>
                        Monitor the status of your invitations in the Team Management section.
                      </Paragraph>
                      <Paragraph>
                        You can resend invitations or cancel them if needed.
                      </Paragraph>
                    </div>
                  ),
                  icon: <Iconify icon="mdi:clipboard-list" />
                }
              ]}
            />
          </Card>

          <Card className="mb-6">
            <Title level={3}>Managing Invitations</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:email-refresh" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Resending Invitations</Title>
                  <Paragraph>
                    If an invitation expires or is lost, you can resend it from the Team Management section.
                    This will generate a new invitation link for the user.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:email-remove" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Canceling Invitations</Title>
                  <Paragraph>
                    You can cancel pending invitations if they were sent by mistake or if the user no longer needs access.
                    This will invalidate the invitation link.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:account-edit" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Updating Roles</Title>
                  <Paragraph>
                    After a user accepts an invitation, you can change their role at any time through the Team Management section.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Tips for Effective Team Management">
            <div className="space-y-4">
              <div>
                <Title level={4}>Use Email Domains</Title>
                <Paragraph>
                  For larger organizations, consider using email domain restrictions to automatically approve users from your company domain.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Group Invitations</Title>
                <Paragraph>
                  When inviting multiple users with the same role, use the bulk invitation feature to save time.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Welcome Message</Title>
                <Paragraph>
                  Add a personalized welcome message to your invitations to help new team members feel welcomed.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Onboarding</Title>
                <Paragraph>
                  Consider creating an onboarding process to help new team members get familiar with the platform.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideInvitingUsers; 