
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingSchedule = () => {
  const sessions = [
    {
      id: 1,
      title: 'Outpatient Clinic',
      type: 'DCC',
      date: '2024-06-05',
      time: '09:00 - 17:00',
      location: 'Clinic Room 3A',
      patients: 16,
    },
    {
      id: 2,
      title: 'Theatre List',
      type: 'DCC',
      date: '2024-06-06',
      time: '08:00 - 14:00',
      location: 'Theatre 2',
      patients: 8,
    },
    {
      id: 3,
      title: 'Research Meeting',
      type: 'SPA',
      date: '2024-06-06',
      time: '15:00 - 17:00',
      location: 'Conference Room B',
      patients: null,
    },
    {
      id: 4,
      title: 'MDT Meeting',
      type: 'DCC',
      date: '2024-06-07',
      time: '08:00 - 09:00',
      location: 'Meeting Room 1',
      patients: null,
    },
    {
      id: 5,
      title: 'Teaching Session',
      type: 'SPA',
      date: '2024-06-07',
      time: '14:00 - 16:00',
      location: 'Lecture Theatre A',
      patients: null,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DCC':
        return 'bg-blue-100 text-blue-800';
      case 'SPA':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Upcoming Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-gray-900">{session.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(session.date).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {session.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {session.location}
                </div>
                {session.patients && (
                  <div className="text-gray-600">
                    <span className="font-medium">{session.patients}</span> patients
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedule;
