import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface JobPlanBasicInfoProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
}

const JobPlanBasicInfo = ({ formData, updateFormData }: JobPlanBasicInfoProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleRadioChange = (name: string, value: string) => {
    updateFormData(name, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    updateFormData(name, value);
  };

  const handleCheckboxChange = (title: string, checked: boolean) => {
    const currentTitles = formData.medicalTitles || [];
    let updatedTitles;
    
    if (checked) {
      updatedTitles = [...currentTitles, title];
    } else {
      updatedTitles = currentTitles.filter((t: string) => t !== title);
    }
    
    updateFormData('medicalTitles', updatedTitles);
  };

  const handleSpecialInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = formData.specialInterests || [];
    let updatedInterests;
    
    if (checked) {
      updatedInterests = [...currentInterests, interest];
    } else {
      updatedInterests = currentInterests.filter((i: string) => i !== interest);
    }
    
    updateFormData('specialInterests', updatedInterests);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData('uploadedFile', file);
  };

  const getSpecialInterestsBySpecialty = (specialty: string) => {
    const specialtyInterests: { [key: string]: string[] } = {
      'cardiology': ['Interventional Cardiology', 'Heart Failure', 'Arrhythmias', 'Cardiac Imaging'],
      'oncology': ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Haematology'],
      'neurology': ['Stroke Medicine', 'Epilepsy', 'Movement Disorders', 'Neuro-Oncology'],
      'surgery': ['General Surgery', 'Orthopaedic Surgery', 'Plastic Surgery', 'Vascular Surgery'],
      'psychiatry': ['Child Psychiatry', 'Forensic Psychiatry', 'Addiction Medicine', 'Psychotherapy'],
      'emergency': ['Emergency Medicine', 'Trauma', 'Critical Care', 'Toxicology']
    };
    
    return specialtyInterests[specialty] || [];
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Basic Job Information */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Job Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="title" className="text-xs sm:text-sm">Job Plan Title *</Label>
            <Input
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Main Consultant Post"
              className="text-xs sm:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="hospital" className="text-xs sm:text-sm">Hospital/Trust *</Label>
            <Input
              id="hospital"
              name="hospital"
              required
              value={formData.hospital}
              onChange={handleInputChange}
              placeholder="e.g., Royal London Hospital"
              className="text-xs sm:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="totalSessions" className="text-xs sm:text-sm">Total Sessions per Week *</Label>
            <Input
              type="number"
              id="totalSessions"
              name="totalSessions"
              required
              min="1"
              max="20"
              value={formData.totalSessions}
              onChange={handleInputChange}
              placeholder="10"
              className="text-xs sm:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="dccSessions" className="text-xs sm:text-sm">DCC Sessions *</Label>
            <Input
              type="number"
              id="dccSessions"
              name="dccSessions"
              required
              min="0"
              step="0.5"
              value={formData.dccSessions}
              onChange={handleInputChange}
              placeholder="7.5"
              className="text-xs sm:text-sm"
            />
          </div>

          <div className="md:col-span-1">
            <Label htmlFor="spaSessions" className="text-xs sm:text-sm">SPA Sessions *</Label>
            <Input
              type="number"
              id="spaSessions"
              name="spaSessions"
              required
              min="0"
              step="0.5"
              value={formData.spaSessions}
              onChange={handleInputChange}
              placeholder="2.5"
              className="text-xs sm:text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-xs sm:text-sm">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the main responsibilities and duties for this job plan..."
            className="text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Employment Section */}
      <div className="space-y-4 sm:space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">Employment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contract Version */}
          <div className="space-y-3">
            <Label className="text-xs sm:text-sm">Contract Version *</Label>
            <RadioGroup
              value={formData.contractVersion || ''}
              onValueChange={(value) => handleRadioChange('contractVersion', value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2003" id="contract-2003" />
                <Label htmlFor="contract-2003" className="text-xs sm:text-sm">2003 Contract</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2023" id="contract-2023" />
                <Label htmlFor="contract-2023" className="text-xs sm:text-sm">2023 Contract</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Employment Type */}
          <div className="space-y-3">
            <Label className="text-xs sm:text-sm">Employment Type *</Label>
            <RadioGroup
              value={formData.employmentType || ''}
              onValueChange={(value) => handleRadioChange('employmentType', value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time" className="text-xs sm:text-sm">Full time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time" className="text-xs sm:text-sm">Part time</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Agreed PAs per week - Only show for part-time */}
          {formData.employmentType === 'part-time' && (
            <div>
              <Label htmlFor="agreedPAs" className="text-xs sm:text-sm">Agreed PAs per week</Label>
              <Input
                type="number"
                id="agreedPAs"
                name="agreedPAs"
                min="0"
                step="0.1"
                value={formData.agreedPAs || ''}
                onChange={handleInputChange}
                placeholder="e.g., 5.5"
                className="text-xs sm:text-sm"
              />
            </div>
          )}

          {/* Usual Place of Work */}
          <div>
            <Label className="text-xs sm:text-sm">Usual Place of Work</Label>
            <Select
              value={formData.usualPlaceOfWork || ''}
              onValueChange={(value) => handleSelectChange('usualPlaceOfWork', value)}
            >
              <SelectTrigger className="text-xs sm:text-sm">
                <SelectValue placeholder="Select workplace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="royal-london">Royal London Hospital</SelectItem>
                <SelectItem value="barts-heart">Barts Heart Centre</SelectItem>
                <SelectItem value="st-bartholomews">St Bartholomew's Hospital</SelectItem>
                <SelectItem value="mile-end">Mile End Hospital</SelectItem>
                <SelectItem value="newham">Newham University Hospital</SelectItem>
                <SelectItem value="whipps-cross">Whipps Cross University Hospital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Private Practice */}
          <div className="space-y-3">
            <Label className="text-xs sm:text-sm">Private Practice *</Label>
            <RadioGroup
              value={formData.privatePractice || ''}
              onValueChange={(value) => handleRadioChange('privatePractice', value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="private-yes" />
                <Label htmlFor="private-yes" className="text-xs sm:text-sm">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="private-no" />
                <Label htmlFor="private-no" className="text-xs sm:text-sm">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Alternative Employer */}
          <div className="space-y-3">
            <Label className="text-xs sm:text-sm">Alternative Employer *</Label>
            <RadioGroup
              value={formData.alternativeEmployer || ''}
              onValueChange={(value) => handleRadioChange('alternativeEmployer', value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="alt-employer-yes" />
                <Label htmlFor="alt-employer-yes" className="text-xs sm:text-sm">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="alt-employer-no" />
                <Label htmlFor="alt-employer-no" className="text-xs sm:text-sm">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Alternative Employer Name - Only show if Yes is selected */}
          {formData.alternativeEmployer === 'yes' && (
            <div>
              <Label htmlFor="alternativeEmployerName" className="text-xs sm:text-sm">Alternative Employer Name</Label>
              <Input
                id="alternativeEmployerName"
                name="alternativeEmployerName"
                value={formData.alternativeEmployerName || ''}
                onChange={handleInputChange}
                placeholder="Enter employer name"
                className="text-xs sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Medical Titles */}
        <div className="space-y-3">
          <Label className="text-xs sm:text-sm">Medical Titles</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Clinical Academic',
              'Honorary Doctor',
              'Locum Doctor',
              'Military Doctor'
            ].map((title) => (
              <div key={title} className="flex items-center space-x-2">
                <Checkbox
                  id={`title-${title.toLowerCase().replace(' ', '-')}`}
                  checked={(formData.medicalTitles || []).includes(title)}
                  onCheckedChange={(checked) => handleCheckboxChange(title, checked as boolean)}
                />
                <Label 
                  htmlFor={`title-${title.toLowerCase().replace(' ', '-')}`}
                  className="text-xs sm:text-sm"
                >
                  {title}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-4 sm:space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">Availability</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs sm:text-sm font-medium">Number of weeks available for work *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="availableWeeks" className="text-xs sm:text-sm text-gray-600">Weeks</Label>
                <Input
                  type="number"
                  id="availableWeeks"
                  name="availableWeeks"
                  min="0"
                  max="52"
                  required
                  value={formData.availableWeeks || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 48"
                  className="text-xs sm:text-sm"
                />
              </div>
              <div>
                <Label htmlFor="availableDays" className="text-xs sm:text-sm text-gray-600">Days</Label>
                <Input
                  type="number"
                  id="availableDays"
                  name="availableDays"
                  min="0"
                  max="6"
                  required
                  value={formData.availableDays || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs sm:text-sm text-blue-800">
              The number of weeks and days available to work excluding known leave entitlements. 
              This value is used to calculate the occurrence of activities in the job plan.
            </p>
          </div>
        </div>
      </div>

      {/* Special Interests Section */}
      <div className="space-y-4 sm:space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">Special Interests</h3>
        
        <div className="space-y-4">
          {/* Specialty */}
          <div>
            <Label className="text-xs sm:text-sm">Specialty</Label>
            <Select
              value={formData.specialty || ''}
              onValueChange={(value) => {
                handleSelectChange('specialty', value);
                // Reset special interests when specialty changes
                updateFormData('specialInterests', []);
              }}
            >
              <SelectTrigger className="text-xs sm:text-sm">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="psychiatry">Psychiatry</SelectItem>
                <SelectItem value="emergency">Emergency Medicine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Special Interests - Multiselect Dropdown */}
          {formData.specialty && (
            <div className="space-y-3">
              <Label className="text-xs sm:text-sm">Special Interests</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-xs sm:text-sm h-10"
                  >
                    {(formData.specialInterests || []).length > 0
                      ? `${(formData.specialInterests || []).length} selected`
                      : "Select special interests"
                    }
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[300px]" align="start">
                  <DropdownMenuLabel className="text-xs sm:text-sm">Special Interests</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {getSpecialInterestsBySpecialty(formData.specialty).map((interest) => (
                    <DropdownMenuCheckboxItem
                      key={interest}
                      checked={(formData.specialInterests || []).includes(interest)}
                      onCheckedChange={(checked) => handleSpecialInterestChange(interest, checked)}
                      className="text-xs sm:text-sm"
                    >
                      {interest}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {(formData.specialInterests || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(formData.specialInterests || []).map((interest) => (
                    <div 
                      key={interest}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Other Section */}
      <div className="space-y-4 sm:space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">Other</h3>
        
        <div>
          <Label htmlFor="fileUpload" className="text-xs sm:text-sm">Upload File</Label>
          <Input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
            className="text-xs sm:text-sm mt-2"
            accept=".pdf,.doc,.docx,.txt"
          />
          {formData.uploadedFile && (
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Selected: {formData.uploadedFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPlanBasicInfo;
