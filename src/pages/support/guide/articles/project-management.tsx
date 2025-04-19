import { Iconify } from '@/components/icon';
import { Button, Card, Col, Row, Steps, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

const GuideProjectManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <Title level={2}>Project Management Guide</Title>

      <Card className="mb-6">
        <Title level={3}>Effective Project Management</Title>
        <Paragraph>
          Learn how to create, organize, and manage projects effectively using our platform's powerful project management tools.
          This guide will walk you through the essential features and best practices.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Project Lifecycle</Title>
            <Steps
              direction="vertical"
              current={-1}
              className="md:max-w-3xl"
              items={[
                {
                  title: 'Project Planning',
                  description: 'Define project goals, scope, and timeline. Create a project structure and assign initial resources.',
                  icon: <Iconify icon="mdi:clipboard-check" />
                },
                {
                  title: 'Team Setup',
                  description: 'Invite team members, assign roles, and set up communication channels.',
                  icon: <Iconify icon="mdi:account-group" />
                },
                {
                  title: 'Task Management',
                  description: 'Create tasks, set deadlines, and track progress. Use task dependencies and milestones.',
                  icon: <Iconify icon="mdi:format-list-checks" />
                },
                {
                  title: 'Monitoring & Reporting',
                  description: 'Track project progress, generate reports, and manage risks.',
                  icon: <Iconify icon="mdi:chart-line" />
                },
                {
                  title: 'Project Completion',
                  description: 'Review project outcomes, document lessons learned, and archive project data.',
                  icon: <Iconify icon="mdi:flag-checkered" />
                }
              ]}
            />
          </Card>

          <Card className="mb-6">
            <Title level={3}>Key Features</Title>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:view-kanban" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Kanban Board</Title>
                  <Paragraph>
                    Visualize your workflow with customizable Kanban boards. Drag and drop tasks between columns to update their status.
                    Create custom columns to match your team's workflow.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:calendar-multiple" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Timeline View</Title>
                  <Paragraph>
                    View your project schedule in a Gantt chart format. Identify dependencies, track milestones, and manage resources
                    effectively with our timeline visualization.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:comment-multiple" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Collaboration Tools</Title>
                  <Paragraph>
                    Keep your team connected with built-in commenting, file sharing, and real-time updates. @mention team members
                    and get instant notifications.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:chart-box" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Analytics & Reporting</Title>
                  <Paragraph>
                    Generate comprehensive reports on project progress, team performance, and resource utilization.
                    Use insights to make data-driven decisions.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <Title level={3}>Best Practices</Title>
            <div className="space-y-4">
              <div>
                <Title level={4}>Clear Project Structure</Title>
                <Paragraph>
                  Organize your project with clear hierarchies. Use folders, tags, and custom fields to categorize tasks and
                  make information easily accessible.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Regular Updates</Title>
                <Paragraph>
                  Keep project information current. Regular updates help team members stay informed and make better decisions.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Resource Management</Title>
                <Paragraph>
                  Monitor team workload and resource allocation. Avoid overallocation and ensure balanced distribution of tasks.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Risk Management</Title>
                <Paragraph>
                  Identify potential risks early and create mitigation plans. Regular risk assessments help prevent project delays.
                </Paragraph>
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
                icon={<Iconify icon="mdi:view-kanban" />}
                onClick={() => navigate('/projects/board')}
              >
                View Kanban Board
              </Button>
              <Button
                icon={<Iconify icon="mdi:calendar" />}
                onClick={() => navigate('/projects/timeline')}
              >
                Open Timeline
              </Button>
              <Button
                icon={<Iconify icon="mdi:file-document" />}
                onClick={() => navigate('/projects/reports')}
              >
                Generate Reports
              </Button>
            </div>
          </Card>

          <Card title="Project Templates" className="mt-6">
            <div className="space-y-4">
              <div>
                <Title level={4}>Agile Development</Title>
                <Paragraph>
                  Template for software development projects using Agile methodology.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Marketing Campaign</Title>
                <Paragraph>
                  Template for planning and executing marketing campaigns.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Event Planning</Title>
                <Paragraph>
                  Template for organizing events and conferences.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Research Project</Title>
                <Paragraph>
                  Template for managing research and development projects.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideProjectManagement; 