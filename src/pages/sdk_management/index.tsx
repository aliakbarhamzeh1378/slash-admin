import sdkWizardService from "@/api/services/sdkWizardService";
import Card from "@/components/card";
import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface SdkStats {
  totalIntegrations: number;
  activeIntegrations: number;
  pendingUpdates: number;
  healthScore: number;
}

export default function IndexPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sdkStats, setSdkStats] = useState<SdkStats>({
    totalIntegrations: 0,
    activeIntegrations: 0,
    pendingUpdates: 0,
    healthScore: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await sdkWizardService.getDashboard();
        setSdkStats(data.stats);
        setRecentActivities(data.recent_activities);
      } catch (error) {
        console.error("Failed to fetch SDK dashboard data:", error);
        // Keep the default values in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'updates':
        navigate('/sdk_management/setup');
        break;
      case 'docs':
        window.open('https://docs.example.com/sdk', '_blank');
        break;
      case 'settings':
        navigate('/sdk_management/setup');
        break;
      case 'analytics':
        navigate('/sdk_management/analytics');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoading />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">SDK Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your SDK integrations</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
          onClick={() => navigate('/sdk_management/setup')}
        >
          <Iconify icon="mdi:plus" className="mr-2" />
          New Integration
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Iconify icon="mdi:cube-outline" className="text-blue-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Integrations</p>
              <h3 className="text-2xl font-semibold">{sdkStats.totalIntegrations}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Iconify icon="mdi:check-circle-outline" className="text-green-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Integrations</p>
              <h3 className="text-2xl font-semibold">{sdkStats.activeIntegrations}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Iconify icon="mdi:update" className="text-yellow-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Updates</p>
              <h3 className="text-2xl font-semibold">{sdkStats.pendingUpdates}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Iconify icon="mdi:heart-pulse" className="text-purple-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Health Score</p>
              <h3 className="text-2xl font-semibold">{sdkStats.healthScore}%</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${activity.type === 'update' ? 'bg-blue-100' :
                      activity.type === 'integration' ? 'bg-green-100' :
                        'bg-red-100'
                      }`}>
                      <Iconify
                        icon={
                          activity.type === 'update' ? 'mdi:update' :
                            activity.type === 'integration' ? 'mdi:plus-circle' :
                              'mdi:alert'
                        }
                        className={
                          activity.type === 'update' ? 'text-blue-600' :
                            activity.type === 'integration' ? 'text-green-600' :
                              'text-red-600'
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No recent activities found
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => handleQuickAction('updates')}
              >
                <Iconify icon="mdi:update" className="mr-2" />
                Check for Updates
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => handleQuickAction('docs')}
              >
                <Iconify icon="mdi:file-document-outline" className="mr-2" />
                View Documentation
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => handleQuickAction('settings')}
              >
                <Iconify icon="mdi:cog" className="mr-2" />
                Configure Settings
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => handleQuickAction('analytics')}
              >
                <Iconify icon="mdi:chart-line" className="mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}