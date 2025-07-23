
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: string;
}

interface JobPlanResourcesProps {
  resources: Resource[];
  updateFormData: (section: string, data: any) => void;
}

const JobPlanResources = ({ resources, updateFormData }: JobPlanResourcesProps) => {
  const [newResource, setNewResource] = useState({
    name: '',
    type: '',
    description: '',
    quantity: ''
  });

  const addResource = () => {
    if (newResource.name.trim()) {
      const resource = {
        id: Date.now().toString(),
        ...newResource
      };
      updateFormData('resources', [...resources, resource]);
      setNewResource({ name: '', type: '', description: '', quantity: '' });
    }
  };

  const removeResource = (id: string) => {
    updateFormData('resources', resources.filter(res => res.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Required Resources</h3>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Resource</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="resName">Resource Name *</Label>
                <Input
                  id="resName"
                  value={newResource.name}
                  onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Clinic room, Equipment"
                />
              </div>
              
              <div>
                <Label htmlFor="resType">Type</Label>
                <Input
                  id="resType"
                  value={newResource.type}
                  onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="e.g., Physical space, Equipment, Staff"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="resDescription">Description</Label>
              <Textarea
                id="resDescription"
                value={newResource.description}
                onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the resource requirements"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="resQuantity">Quantity/Allocation</Label>
              <Input
                id="resQuantity"
                value={newResource.quantity}
                onChange={(e) => setNewResource(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="e.g., 1 room, 2 hours per week"
              />
            </div>
            
            <Button onClick={addResource} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </CardContent>
        </Card>
      </div>

      {resources.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Required Resources ({resources.length})</h4>
          <div className="space-y-3">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium">{resource.name}</h5>
                        {resource.type && (
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded">{resource.type}</span>
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      )}
                      {resource.quantity && (
                        <p className="text-sm text-blue-600 mt-1">Allocation: {resource.quantity}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeResource(resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
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

export default JobPlanResources;
