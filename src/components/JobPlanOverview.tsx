
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobPlanOverview = () => {
  const jobPlans = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Current Job Plans
        </CardTitle>
        <Link to="/create-job-plan">
          <Button className="nhs-blue text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Job Plan
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobPlans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-gray-900">{plan.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Hospital</p>
                  <p className="font-medium">{plan.hospital}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Sessions</p>
                  <p className="font-medium">{plan.sessions}</p>
                </div>
                <div>
                  <p className="text-gray-500">DCC Sessions</p>
                  <p className="font-medium">{plan.dccSessions}</p>
                </div>
                <div>
                  <p className="text-gray-500">SPA Sessions</p>
                  <p className="font-medium">{plan.spaSessions}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(plan.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPlanOverview;
