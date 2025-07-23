
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import JobPlanOverview from '@/components/JobPlanOverview';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import ComplianceTracker from '@/components/ComplianceTracker';

const Index = () => {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, Dr. Smith. Here's your NHS job planning overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <JobPlanOverview />
            <ComplianceTracker />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <UpcomingSchedule />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
