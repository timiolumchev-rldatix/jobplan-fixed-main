
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobPlanForm from '@/components/JobPlanForm';

const CreateJobPlan = () => {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Job Plan</h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below to create a new job plan.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Job Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <JobPlanForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateJobPlan;
