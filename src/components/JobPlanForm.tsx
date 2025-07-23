import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import JobPlanBasicInfo from './JobPlanBasicInfo';
import JobPlanObjectives from './JobPlanObjectives';
import JobPlanResources from './JobPlanResources';
import JobPlanActivities from './JobPlanActivities';
import JobPlanSummary from './JobPlanSummary';
import JobPlanFinish from './JobPlanFinish';

const JobPlanForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    hospital: '',
    totalSessions: '',
    dccSessions: '',
    spaSessions: '',
    description: '',
    // Employment fields
    contractVersion: '',
    employmentType: '',
    agreedPAs: '',
    usualPlaceOfWork: '',
    privatePractice: '',
    alternativeEmployer: '',
    alternativeEmployerName: '',
    medicalTitles: [],
    // Availability fields
    availableWeeks: '',
    availableDays: '',
    // Special interests fields
    specialty: '',
    specialInterests: [],
    // Other fields
    uploadedFile: null,
    // Other sections
    objectives: [],
    resources: [],
    activities: [],
    calendarActivities: [],
    comments: ''
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNext = () => {
    const tabs = ['basic', 'objectives', 'resources', 'activities', 'summary', 'finish'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ['basic', 'objectives', 'resources', 'activities', 'summary', 'finish'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleFinish = () => {
    console.log('Job plan created:', formData);
    navigate('/');
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="objectives">Objectives</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="finish">Finish</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6">
        <JobPlanBasicInfo 
          formData={formData} 
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="objectives" className="space-y-6">
        <JobPlanObjectives 
          objectives={formData.objectives} 
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="resources" className="space-y-6">
        <JobPlanResources 
          resources={formData.resources} 
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="activities" className="space-y-6">
        <JobPlanActivities 
          activities={formData.activities}
          calendarActivities={formData.calendarActivities}
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="summary" className="space-y-6">
        <JobPlanSummary formData={formData} />
      </TabsContent>

      <TabsContent value="finish" className="space-y-6">
        <JobPlanFinish 
          comments={formData.comments}
          updateFormData={updateFormData}
          onFinish={handleFinish}
        />
      </TabsContent>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={activeTab === 'basic'}
        >
          Previous
        </Button>
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          {activeTab !== 'finish' ? (
            <Button
              type="button"
              className="nhs-blue text-white hover:bg-blue-700"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              className="nhs-blue text-white hover:bg-blue-700"
              onClick={handleFinish}
            >
              Create Job Plan
            </Button>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default JobPlanForm;
