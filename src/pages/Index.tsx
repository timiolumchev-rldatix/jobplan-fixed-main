

import { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import JobPlanOverview from '@/components/JobPlanOverview';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import ComplianceTracker from '@/components/ComplianceTracker';


const initialJobPlans = [
  {
    id: 1,
    title: 'Main Consultant Post',
    hospital: 'Royal London Hospital',
    sessions: 10,
    dccSessions: 7.5,
    spaSessions: 2.5,
    status: 'Active',
    lastUpdated: '2024-01-15',
  },
  {
    id: 1,
    title: 'Main Consultant Post',
    hospital: 'Royal London Hospital',
    sessions: 11,
    dccSessions: 8.5,
    spaSessions: 3.5,
    status: 'Active',
    lastUpdated: '2024-01-15',
  },
  {
    id: 2,
    title: 'Private Practice',
    hospital: 'London Bridge Hospital',
    sessions: 2,
    dccSessions: 0,
    spaSessions: 2,
    status: 'Active',
    lastUpdated: '2024-01-10',
  },
  {
    id: 3,
    title: 'Research Fellowship',
    hospital: 'Imperial College',
    sessions: 1,
    dccSessions: 0,
    spaSessions: 1,
    status: 'Draft',
    lastUpdated: '2024-01-08',
  },
];

const Index = () => {
  const [jobPlans, setJobPlans] = useState(initialJobPlans);
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
          <DashboardStats setJobPlans={setJobPlans} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <JobPlanOverview jobPlans={jobPlans} />
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
