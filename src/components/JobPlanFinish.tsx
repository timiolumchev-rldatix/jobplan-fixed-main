
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface JobPlanFinishProps {
  comments: string;
  updateFormData: (section: string, data: any) => void;
  onFinish: () => void;
}

const JobPlanFinish = ({ comments, updateFormData, onFinish }: JobPlanFinishProps) => {
  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData('comments', e.target.value);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-base sm:text-lg font-semibold">Almost Done!</h3>
        <p className="text-sm sm:text-base text-gray-600">Review your job plan and add any final comments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Final Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="finalComments" className="text-xs sm:text-sm">
                Additional Comments or Notes (Optional)
              </Label>
              <Textarea
                id="finalComments"
                value={comments}
                onChange={handleCommentsChange}
                rows={6}
                placeholder="Add any additional comments, special requirements, or notes about this job plan..."
                className="mt-2 text-xs sm:text-sm"
              />
            </div>
            
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">What happens next?</h4>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• Your job plan will be created and saved</li>
                <li>• You can review and edit it later if needed</li>
                <li>• The plan can be shared with relevant stakeholders</li>
                <li>• You'll be redirected to the main dashboard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onFinish}
          className="nhs-blue text-white hover:bg-blue-700 px-6 sm:px-8 py-2 text-xs sm:text-sm"
          size="lg"
        >
          Create Job Plan
        </Button>
      </div>
    </div>
  );
};

export default JobPlanFinish;
