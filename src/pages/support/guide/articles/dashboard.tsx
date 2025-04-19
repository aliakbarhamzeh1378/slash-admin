import { Iconify } from '@/components/icon';
import { Button, Card, Col, Row, Typography } from 'antd';
import type React from 'react';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

const GuideDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Title level={2}>Dashboard Overview</Title>

      <Card className="mb-6">
        <Title level={3}>Your Command Center</Title>
        <Paragraph>
          The dashboard is your command center for monitoring projects, tracking progress, and managing your workspace.
          This guide will help you understand the key components and how to make the most of your dashboard.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="mb-6">
            <Title level={3}>Dashboard Components</Title>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:chart-box" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Overview Statistics</Title>
                  <Paragraph>
                    The top section displays key metrics such as active projects, completed tasks, team activity, and upcoming deadlines.
                    These statistics provide a quick snapshot of your workspace's current state.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:calendar-clock" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Timeline and Calendar</Title>
                  <Paragraph>
                    The timeline section shows upcoming deadlines, milestones, and scheduled events. You can view this information
                    in different formats: daily, weekly, or monthly. This helps you plan and allocate resources effectively.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:clipboard-list" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Recent Activity</Title>
                  <Paragraph>
                    The activity feed shows recent updates, comments, and changes across your projects. This keeps you informed
                    about what's happening without having to check each project individually.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:chart-line" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Performance Metrics</Title>
                  <Paragraph>
                    Charts and graphs display performance metrics such as project completion rates, team productivity, and resource utilization.
                    These visualizations help you identify trends and make data-driven decisions.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Iconify icon="mdi:format-list-checks" className="text-xl text-primary" />
                </div>
                <div>
                  <Title level={4}>Task Management</Title>
                  <Paragraph>
                    The task section shows your assigned tasks, their status, and upcoming deadlines. You can quickly update task status,
                    add comments, or reassign tasks directly from the dashboard.
                  </Paragraph>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <Title level={3}>Customizing Your Dashboard</Title>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:view-dashboard-edit" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Widget Configuration</Title>
                  <Paragraph>
                    You can customize which widgets appear on your dashboard and their arrangement. Click the "Customize Dashboard"
                    button to add, remove, or rearrange widgets according to your preferences.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:filter-variant" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Filtering Options</Title>
                  <Paragraph>
                    Use the filter options to focus on specific projects, teams, or time periods. This helps you concentrate on
                    the information that's most relevant to you.
                  </Paragraph>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Iconify icon="mdi:export" className="text-xl" />
                </div>
                <div>
                  <Title level={4}>Exporting Data</Title>
                  <Paragraph>
                    You can export dashboard data in various formats (PDF, CSV, Excel) for reporting or offline analysis.
                    This is useful for creating reports or sharing information with stakeholders.
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
                icon={<Iconify icon="mdi:account-plus" />}
                onClick={() => navigate('/team')}
              >
                Invite Team Members
              </Button>
              <Button
                icon={<Iconify icon="mdi:file-document-edit" />}
                onClick={() => navigate('/reports')}
              >
                Generate Reports
              </Button>
              <Button
                icon={<Iconify icon="mdi:cog" />}
                onClick={() => navigate('/settings')}
              >
                Dashboard Settings
              </Button>
            </div>
          </Card>

          <Card title="Dashboard Tips" className="mt-6">
            <div className="space-y-4">
              <div>
                <Title level={4}>Set Default View</Title>
                <Paragraph>
                  Configure your preferred default view (daily, weekly, monthly) to save time when accessing the dashboard.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Use Keyboard Shortcuts</Title>
                <Paragraph>
                  Learn keyboard shortcuts for common dashboard actions to navigate more efficiently.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Create Dashboard Presets</Title>
                <Paragraph>
                  Save different dashboard configurations as presets for different purposes or team members.
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Schedule Reports</Title>
                <Paragraph>
                  Set up automated reports to be delivered to your inbox at regular intervals.
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GuideDashboard; 