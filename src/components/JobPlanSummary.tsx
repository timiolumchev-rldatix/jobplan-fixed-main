
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobPlanSummaryProps {
  formData: any;
}

const JobPlanSummary = ({ formData }: JobPlanSummaryProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DCC': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SPA': return 'bg-green-100 text-green-800 border-green-200';
      case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Research': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Teaching': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryCounts = () => {
    const allActivities = [...(formData.activities || []), ...(formData.calendarActivities || [])];
    const counts = {
      DCC: 0,
      SPA: 0,
      Admin: 0,
      Research: 0,
      Teaching: 0,
      Other: 0
    };
    
    allActivities.forEach(activity => {
      if (activity.category && counts.hasOwnProperty(activity.category)) {
        counts[activity.category as keyof typeof counts]++;
      }
    });
    
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg font-semibold">Job Plan Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Title</p>
              <p className="font-medium text-sm sm:text-base">{formData.title || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Hospital/Trust</p>
              <p className="font-medium text-sm sm:text-base">{formData.hospital || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Sessions</p>
                <p className="font-medium text-sm sm:text-base">{formData.totalSessions || '0'}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">DCC Sessions</p>
                <p className="font-medium text-sm sm:text-base">{formData.dccSessions || '0'}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">SPA Sessions</p>
                <p className="font-medium text-sm sm:text-base">{formData.spaSessions || '0'}</p>
              </div>
            </div>
            {formData.description && (
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Description</p>
                <p className="text-xs sm:text-sm">{formData.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Objectives</p>
              <p className="font-medium text-sm sm:text-base">{formData.objectives?.length || 0}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Resources Required</p>
              <p className="font-medium text-sm sm:text-base">{formData.resources?.length || 0}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Activities</p>
              <p className="font-medium text-sm sm:text-base">{(formData.activities?.length || 0) + (formData.calendarActivities?.length || 0)}</p>
            </div>
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Activities by Category</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  count > 0 && (
                    <div key={category} className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full border text-xs ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {formData.objectives?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.objectives.map((objective: any, index: number) => (
                <div key={objective.id} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-sm sm:text-base">{index + 1}. {objective.title}</p>
                  {objective.description && (
                    <p className="text-xs sm:text-sm text-gray-600">{objective.description}</p>
                  )}
                  {objective.target && (
                    <p className="text-xs sm:text-sm text-blue-600">Target: {objective.target}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {formData.resources?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.resources.map((resource: any, index: number) => (
                <div key={resource.id} className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-sm sm:text-base">{index + 1}. {resource.name}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {resource.type && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                        {resource.type}
                      </span>
                    )}
                    {resource.quantity && (
                      <span className="text-xs sm:text-sm text-green-600">Allocation: {resource.quantity}</span>
                    )}
                  </div>
                  {resource.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{resource.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {((formData.activities?.length > 0) || (formData.calendarActivities?.length > 0)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">All Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...(formData.activities || []), ...(formData.calendarActivities || [])].map((activity: any, index: number) => (
              <div key={activity.id} className="border-l-4 border-purple-500 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <p className="font-medium text-sm sm:text-base">{index + 1}. {activity.title}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  {activity.duration && <span>Duration: {activity.duration}</span>}
                  {activity.frequency && <span>Frequency: {activity.frequency}</span>}
                  {activity.date && <span>Date: {activity.date.toLocaleDateString()}</span>}
                  {activity.time && <span>Time: {activity.time}</span>}
                </div>
                {activity.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{activity.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobPlanSummary;
