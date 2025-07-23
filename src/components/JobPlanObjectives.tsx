
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Objective {
  id: string;
  title: string;
  description: string;
  target: string;
}

interface JobPlanObjectivesProps {
  objectives: Objective[];
  updateFormData: (section: string, data: any) => void;
}

const JobPlanObjectives = ({ objectives, updateFormData }: JobPlanObjectivesProps) => {
  const [newObjective, setNewObjective] = useState({
    title: '',
    description: '',
    target: ''
  });

  const addObjective = () => {
    if (newObjective.title.trim()) {
      const objective = {
        id: Date.now().toString(),
        ...newObjective
      };
      updateFormData('objectives', [...objectives, objective]);
      setNewObjective({ title: '', description: '', target: '' });
    }
  };

  const removeObjective = (id: string) => {
    updateFormData('objectives', objectives.filter(obj => obj.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Job Plan Objectives</h3>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Add New Objective</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="objTitle" className="text-xs sm:text-sm">Objective Title *</Label>
              <Input
                id="objTitle"
                value={newObjective.title}
                onChange={(e) => setNewObjective(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Improve patient satisfaction scores"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="objDescription" className="text-xs sm:text-sm">Description</Label>
              <Textarea
                id="objDescription"
                value={newObjective.description}
                onChange={(e) => setNewObjective(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the objective"
                rows={3}
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="objTarget" className="text-xs sm:text-sm">Target/Measure</Label>
              <Input
                id="objTarget"
                value={newObjective.target}
                onChange={(e) => setNewObjective(prev => ({ ...prev, target: e.target.value }))}
                placeholder="e.g., Achieve 95% satisfaction rate"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <Button onClick={addObjective} className="w-full text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Add Objective
            </Button>
          </CardContent>
        </Card>
      </div>

      {objectives.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 text-sm sm:text-base">Current Objectives ({objectives.length})</h4>
          <div className="space-y-3">
            {objectives.map((objective) => (
              <Card key={objective.id}>
                <CardContent className="pt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm sm:text-base">{objective.title}</h5>
                      {objective.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{objective.description}</p>
                      )}
                      {objective.target && (
                        <p className="text-xs sm:text-sm text-blue-600 mt-1">Target: {objective.target}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeObjective(objective.id)}
                      className="text-xs sm:text-sm"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPlanObjectives;
