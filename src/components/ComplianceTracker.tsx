
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Clock, Award } from 'lucide-react';

const ComplianceTracker = () => {
  const complianceItems = [
    {
      title: 'Annual Appraisal',
      status: 'Complete',
      dueDate: '2024-03-15',
      completedDate: '2024-02-28',
      progress: 100,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'CPD Requirements',
      status: 'In Progress',
      dueDate: '2024-12-31',
      completedDate: null,
      progress: 65,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Revalidation',
      status: 'Upcoming',
      dueDate: '2025-06-30',
      completedDate: null,
      progress: 25,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Mandatory Training',
      status: 'Overdue',
      dueDate: '2024-01-31',
      completedDate: null,
      progress: 80,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Upcoming':
        return 'bg-purple-100 text-purple-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Upcoming':
        return 'bg-purple-500';
      case 'Overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Compliance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {complianceItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
              
              {item.completedDate && (
                <p className="text-xs text-gray-500 mt-2">
                  Completed: {new Date(item.completedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceTracker;
