
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { VendorCategory } from '@/types/vendor';
import { Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface FilterOptions {
  categories: VendorCategory[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  hasAddOns: boolean;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const ALL_CATEGORIES: VendorCategory[] = [
  'Catering', 'Venue', 'Photography', 'Videography', 'Music', 'Decor', 
  'Flowers', 'Cake', 'Invitations', 'Transportation', 'Rentals', 'Hair & Makeup', 'Other'
];

const FilterSidebar = ({ filters, onChange, onReset }: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCategoryChange = (category: VendorCategory, checked: boolean) => {
    let newCategories: VendorCategory[];
    
    if (checked) {
      newCategories = [...filters.categories, category];
    } else {
      newCategories = filters.categories.filter(c => c !== category);
    }
    
    onChange({
      ...filters,
      categories: newCategories
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    onChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };
  
  const handleRatingChange = (value: number[]) => {
    onChange({
      ...filters,
      minRating: value[0]
    });
  };
  
  const handleAddOnsChange = (checked: boolean) => {
    onChange({
      ...filters,
      hasAddOns: checked
    });
  };
  
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="mb-4 block md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters {filters.categories.length > 0 && `(${filters.categories.length})`}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 rounded-lg border p-4">
            <FilterContent 
              filters={filters} 
              onChange={onChange}
              handleCategoryChange={handleCategoryChange}
              handlePriceChange={handlePriceChange}
              handleRatingChange={handleRatingChange}
              handleAddOnsChange={handleAddOnsChange}
              onReset={onReset}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="rounded-lg border p-6">
          <FilterContent 
            filters={filters} 
            onChange={onChange}
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}
            handleAddOnsChange={handleAddOnsChange}
            onReset={onReset}
          />
        </div>
      </div>
    </>
  );
};

interface FilterContentProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  handleCategoryChange: (category: VendorCategory, checked: boolean) => void;
  handlePriceChange: (value: number[]) => void;
  handleRatingChange: (value: number[]) => void;
  handleAddOnsChange: (checked: boolean) => void;
  onReset: () => void;
}

const FilterContent = ({ 
  filters, 
  handleCategoryChange,
  handlePriceChange,
  handleRatingChange,
  handleAddOnsChange,
  onReset
}: FilterContentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-medium">Categories</h3>
        <div className="space-y-2">
          {ALL_CATEGORIES.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    handleCategoryChange(category, checked);
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="cursor-pointer text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="mb-3 text-lg font-medium">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[filters.minPrice, filters.maxPrice]} 
            min={0} 
            max={5000} 
            step={100}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm">${filters.minPrice}</p>
            <p className="text-sm">${filters.maxPrice}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="mb-3 text-lg font-medium">Minimum Rating</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[filters.minRating]} 
            min={0} 
            max={5} 
            step={0.5}
            onValueChange={handleRatingChange}
            className="my-6"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm">0</p>
            <p className="text-sm">5 ⭐</p>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="has-addons" 
            checked={filters.hasAddOns}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                handleAddOnsChange(checked);
              }
            }}
          />
          <Label htmlFor="has-addons" className="cursor-pointer text-sm">
            Has Add-ons Available
          </Label>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
