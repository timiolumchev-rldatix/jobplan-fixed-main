import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'timetabled' | 'flexible';
  activityType?: 'core' | 'apa' | 'atc';
  startTime?: string;
  endTime?: string;
  premiumHours?: number;
  entryMethod?: 'weekly' | 'annualised';
  weeks?: number[];
  deliveredActivities?: number;
  travelTimeLinked?: 'yes' | 'no';
  activityLocation?: string;
  fromLocation?: string;
  toLocation?: string;
  personalObjective?: string;
  employer?: string;
  comment?: string;
}

interface CalendarActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

interface JobPlanActivitiesProps {
  activities: Activity[];
  calendarActivities: CalendarActivity[];
  updateFormData: (section: string, data: any) => void;
}

const JobPlanActivities = ({ activities, calendarActivities, updateFormData }: JobPlanActivitiesProps) => {
  const [newActivity, setNewActivity] = useState<Activity>({
    id: '',
    type: 'timetabled'
  });
  const [showActivityForm, setShowActivityForm] = useState(false);

  const calculatePremiumHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;

    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    
    // Handle overnight activities
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    const premiumStart = new Date(`2000-01-01T19:00:00`);
    const premiumEnd = new Date(`2000-01-02T06:00:00`);

    let premiumTime = 0;

    // Check if activity overlaps with premium time (19:00 - 06:00)
    if (start < premiumEnd && end > premiumStart) {
      const overlapStart = new Date(Math.max(start.getTime(), premiumStart.getTime()));
      const overlapEnd = new Date(Math.min(end.getTime(), premiumEnd.getTime()));
      
      premiumTime = (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60);
    }

    return Math.round(premiumTime * 100) / 100;
  };

  const handleActivityChange = (field: string, value: any) => {
    const updatedActivity = { ...newActivity, [field]: value };
    
    // Calculate premium hours if start or end time changes
    if ((field === 'startTime' || field === 'endTime') && updatedActivity.startTime && updatedActivity.endTime) {
      updatedActivity.premiumHours = calculatePremiumHours(updatedActivity.startTime, updatedActivity.endTime);
    }

    setNewActivity(updatedActivity);
  };

  const handleWeekToggle = (week: number) => {
    const currentWeeks = newActivity.weeks || [];
    const updatedWeeks = currentWeeks.includes(week)
      ? currentWeeks.filter(w => w !== week)
      : [...currentWeeks, week];
    
    handleActivityChange('weeks', updatedWeeks);
  };

  const addActivity = () => {
    const activityWithId = {
      ...newActivity,
      id: Date.now().toString()
    };

    const updatedActivities = [...activities, activityWithId];
    updateFormData('activities', updatedActivities);

    setNewActivity({ id: '', type: 'timetabled' });
    setShowActivityForm(false);
  };

  const removeActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    updateFormData('activities', updatedActivities);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activities</h3>
        <p className="text-sm text-gray-600 mb-6">
          Define the activities that will be part of this job plan.
        </p>
      </div>

      {/* Existing Activities */}
      {activities.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Current Activities</h4>
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm capitalize">
                    {activity.type} Activity - {activity.activityType}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeActivity(activity.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {activity.startTime && (
                    <div>
                      <span className="font-medium">Time:</span> {activity.startTime} - {activity.endTime}
                    </div>
                  )}
                  {activity.premiumHours && activity.premiumHours > 0 && (
                    <div>
                      <span className="font-medium">Premium Hours:</span> {activity.premiumHours}
                    </div>
                  )}
                  {activity.entryMethod && (
                    <div>
                      <span className="font-medium">Entry Method:</span> {activity.entryMethod}
                    </div>
                  )}
                  {activity.comment && (
                    <div className="col-span-2">
                      <span className="font-medium">Comment:</span> {activity.comment}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Activity Button */}
      {!showActivityForm && (
        <Button onClick={() => setShowActivityForm(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Activity
        </Button>
      )}

      {/* Activity Form */}
      {showActivityForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activity Type Selection */}
            <div>
              <Label className="text-sm font-medium">Activity Type</Label>
              <RadioGroup
                value={newActivity.type}
                onValueChange={(value) => handleActivityChange('type', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="timetabled" id="timetabled" />
                  <Label htmlFor="timetabled">Timetabled</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible">Flexible</Label>
                </div>
              </RadioGroup>
            </div>

            {newActivity.type === 'timetabled' && (
              <>
                {/* Activity Category */}
                <div>
                  <Label className="text-sm font-medium">Activity Category</Label>
                  <RadioGroup
                    value={newActivity.activityType || ''}
                    onValueChange={(value) => handleActivityChange('activityType', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="core" id="core" />
                      <Label htmlFor="core">Core</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apa" id="apa" />
                      <Label htmlFor="apa">APA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="atc" id="atc" />
                      <Label htmlFor="atc">ATC</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Time Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime" className="text-sm font-medium">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newActivity.startTime || ''}
                      onChange={(e) => handleActivityChange('startTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-sm font-medium">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newActivity.endTime || ''}
                      onChange={(e) => handleActivityChange('endTime', e.target.value)}
                    />
                  </div>
                </div>

                {/* Premium Hours Display */}
                {newActivity.premiumHours && newActivity.premiumHours > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>Premium Time:</strong> {newActivity.premiumHours} hours
                      <br />
                      <span className="text-xs">This activity includes premium time (19:00 - 06:00)</span>
                    </p>
                  </div>
                )}

                {/* Entry Method */}
                <div>
                  <Label className="text-sm font-medium">Entry Method</Label>
                  <RadioGroup
                    value={newActivity.entryMethod || ''}
                    onValueChange={(value) => handleActivityChange('entryMethod', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly Timetabled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="annualised" id="annualised" />
                      <Label htmlFor="annualised">Annualised</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Weekly Timetabled Options */}
                {newActivity.entryMethod === 'weekly' && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select Weeks (1-26)</Label>
                    <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                      {Array.from({ length: 26 }, (_, i) => i + 1).map((week) => (
                        <div key={week} className="flex items-center space-x-2">
                          <Checkbox
                            id={`week-${week}`}
                            checked={(newActivity.weeks || []).includes(week)}
                            onCheckedChange={() => handleWeekToggle(week)}
                          />
                          <Label htmlFor={`week-${week}`} className="text-xs">
                            Week {week}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Annualised Options */}
                {newActivity.entryMethod === 'annualised' && (
                  <div>
                    <Label htmlFor="deliveredActivities" className="text-sm font-medium">
                      Number of Delivered Activities
                    </Label>
                    <Input
                      id="deliveredActivities"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newActivity.deliveredActivities || ''}
                      onChange={(e) => handleActivityChange('deliveredActivities', parseFloat(e.target.value))}
                      placeholder="e.g., 10.5"
                    />
                  </div>
                )}

                {/* Location Details */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Location Details</h4>
                  
                  <div>
                    <Label className="text-sm font-medium">Is travel time linked to this activity?</Label>
                    <RadioGroup
                      value={newActivity.travelTimeLinked || ''}
                      onValueChange={(value) => handleActivityChange('travelTimeLinked', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="travel-yes" />
                        <Label htmlFor="travel-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="travel-no" />
                        <Label htmlFor="travel-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {newActivity.travelTimeLinked === 'yes' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor="activityLocation" className="text-sm font-medium">Activity Location</Label>
                        <Input
                          id="activityLocation"
                          value={newActivity.activityLocation || ''}
                          onChange={(e) => handleActivityChange('activityLocation', e.target.value)}
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fromLocation" className="text-sm font-medium">From</Label>
                        <Input
                          id="fromLocation"
                          value={newActivity.fromLocation || ''}
                          onChange={(e) => handleActivityChange('fromLocation', e.target.value)}
                          placeholder="From location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="toLocation" className="text-sm font-medium">To</Label>
                        <Input
                          id="toLocation"
                          value={newActivity.toLocation || ''}
                          onChange={(e) => handleActivityChange('toLocation', e.target.value)}
                          placeholder="To location"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Options */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Other</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Personal Objective</Label>
                      <Select
                        value={newActivity.personalObjective || ''}
                        onValueChange={(value) => handleActivityChange('personalObjective', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an objective" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="objective1">Clinical Excellence</SelectItem>
                          <SelectItem value="objective2">Research & Innovation</SelectItem>
                          <SelectItem value="objective3">Teaching & Education</SelectItem>
                          <SelectItem value="objective4">Leadership & Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Employer</Label>
                      <Select
                        value={newActivity.employer || ''}
                        onValueChange={(value) => handleActivityChange('employer', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nhs-trust">NHS Trust</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="private-practice">Private Practice</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Comment Field */}
            <div>
              <Label htmlFor="comment" className="text-sm font-medium">Comment</Label>
              <Textarea
                id="comment"
                value={newActivity.comment || ''}
                onChange={(e) => handleActivityChange('comment', e.target.value)}
                placeholder="Add any additional comments about this activity..."
                rows={3}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowActivityForm(false);
                  setNewActivity({ id: '', type: 'timetabled' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={addActivity}>
                Add Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobPlanActivities;
