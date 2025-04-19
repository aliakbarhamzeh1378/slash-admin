import { Iconify } from '@/components/icon';
import { Button, Card, Col, Row, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

const GuideFirstProject: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Title level={2}>Creating Your First Project</Title>

      <Card className="mb-6">
        <Title level={3}>Getting Started with Projects</Title>
        <Paragraph>
          Projects are the foundation of our platform. They help you organize work, collaborate with team members,
          and track progress effectively. This guide will walk you through creating and setting up your first project.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Step 1: Create a New Project</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">1</span>
                </div>
                <div>
                  <Title level={4}>Click "New Project"</Title>
                  <Paragraph>
                    From your dashboard, click the "New Project" button in the top right corner.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div>
                  <Title level={4}>Enter Project Details</Title>
                  <Paragraph>
                    Fill in the project name, description, and select a template if applicable.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div>
                  <Title level={4}>Configure Settings</Title>
                  <Paragraph>
                    Set up project visibility, access controls, and other project-specific settings.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <Title level={3}>Step 2: Set Up Your Project Structure</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">1</span>
                </div>
                <div>
                  <Title level={4}>Create Task Lists</Title>
                  <Paragraph>
                    Organize your work by creating task lists or categories.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div>
                  <Title level={4}>Add Team Members</Title>
                  <Paragraph>
                    Invite team members and assign them appropriate roles.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div>
                  <Title level={4}>Set Up Workflows</Title>
                  <Paragraph>
                    Configure project workflows and automation rules.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="flex flex-col gap-4">
              <Button
                type="primary"
                icon={<Iconify icon="mdi:plus" />}
                onClick={() => navigate('/projects/new')}
              >
                Create New Project
              </Button>
              <Button
                icon={<Iconify icon="mdi:book-open" />}
                onClick={() => navigate('/support/guide')}
              >
                View More Guides
              </Button>
              <Button
                icon={<Iconify icon="mdi:account-group" />}
                onClick={() => navigate('/team')}
              >
                Manage Team
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideFirstProject; 