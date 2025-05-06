
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Edit, Trash } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import VendorLayout from '@/components/layout/VendorLayout';
import { formatCurrency } from '@/lib/utils';

// Mock data types
interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface VendorPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  addOns: AddOn[];
}

// Mock data
const initialPackages: VendorPackage[] = [
  {
    id: '1',
    name: 'Basic Catering Package',
    description: 'Includes setup, service, and cleanup for up to 50 guests.',
    price: 2500,
    addOns: [
      { id: '1a', name: 'Additional Guests', description: 'Per 10 guests', price: 300 },
      { id: '1b', name: 'Premium Bar Service', description: '4-hour open bar', price: 1200 }
    ]
  },
  {
    id: '2',
    name: 'Premium Catering Experience',
    description: 'Full-service catering with premium menu options, table settings, and dedicated staff.',
    price: 4800,
    addOns: [
      { id: '2a', name: 'Custom Menu Tasting', description: 'For up to 4 people', price: 350 },
      { id: '2b', name: 'Chef\'s Table Experience', description: 'Interactive chef station', price: 1500 }
    ]
  }
];

const VendorPackages = () => {
  const [packages, setPackages] = useState<VendorPackage[]>(initialPackages);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<VendorPackage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // For add-on management
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [currentAddOn, setCurrentAddOn] = useState<AddOn | null>(null);
  const [addOnDialogOpen, setAddOnDialogOpen] = useState(false);
  
  const handleAddPackage = () => {
    setIsEditing(false);
    setCurrentPackage({
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      addOns: []
    });
    setAddOns([]);
    setDialogOpen(true);
  };
  
  const handleEditPackage = (pkg: VendorPackage) => {
    setIsEditing(true);
    setCurrentPackage(pkg);
    setAddOns(pkg.addOns);
    setDialogOpen(true);
  };
  
  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast.success('Package deleted successfully');
  };
  
  const handleAddAddOn = () => {
    setCurrentAddOn({
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0
    });
    setAddOnDialogOpen(true);
  };
  
  const handleEditAddOn = (addOn: AddOn) => {
    setCurrentAddOn(addOn);
    setAddOnDialogOpen(true);
  };
  
  const handleDeleteAddOn = (id: string) => {
    setAddOns(addOns.filter(addon => addon.id !== id));
  };
  
  const handleSaveAddOn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentAddOn) return;
    
    if (addOns.some(addon => addon.id === currentAddOn.id)) {
      // Update existing add-on
      setAddOns(addOns.map(addon => 
        addon.id === currentAddOn.id ? currentAddOn : addon
      ));
    } else {
      // Add new add-on
      setAddOns([...addOns, currentAddOn]);
    }
    
    setAddOnDialogOpen(false);
  };
  
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPackage) return;
    
    // Add add-ons to the package
    const updatedPackage = {
      ...currentPackage,
      addOns
    };
    
    if (isEditing) {
      // Update existing package
      setPackages(packages.map(pkg => 
        pkg.id === updatedPackage.id ? updatedPackage : pkg
      ));
      toast.success('Package updated successfully');
    } else {
      // Add new package
      setPackages([...packages, updatedPackage]);
      toast.success('Package added successfully');
    }
    
    setDialogOpen(false);
  };
  
  return (
    <VendorLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Packages</h1>
          <Button onClick={handleAddPackage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        </div>
        
        {packages.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No packages yet</h3>
              <p className="text-gray-500 mb-4">Add your first package to attract more customers</p>
              <Button onClick={handleAddPackage}>Add Your First Package</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map(pkg => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{pkg.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPackage(pkg)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePackage(pkg.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Starting from {formatCurrency(pkg.price)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{pkg.description}</p>
                  
                  {pkg.addOns.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Add-ons Available:</h4>
                      <ul className="space-y-2">
                        {pkg.addOns.map(addon => (
                          <li key={addon.id} className="text-sm flex justify-between">
                            <div>
                              <span className="font-medium">{addon.name}</span>
                              <p className="text-gray-500 text-xs">{addon.description}</p>
                            </div>
                            <span>{formatCurrency(addon.price)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Package Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Package' : 'Add New Package'}</DialogTitle>
              <DialogDescription>
                Create or modify your service package details
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSavePackage} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Package Name</label>
                <Input
                  value={currentPackage?.name || ''}
                  onChange={(e) => setCurrentPackage(curr => curr ? {...curr, name: e.target.value} : null)}
                  placeholder="e.g., Basic Wedding Package"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={currentPackage?.description || ''}
                  onChange={(e) => setCurrentPackage(curr => curr ? {...curr, description: e.target.value} : null)}
                  placeholder="Describe what's included in this package..."
                  required
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Price ($)</label>
                <Input
                  type="number"
                  value={currentPackage?.price || 0}
                  onChange={(e) => setCurrentPackage(curr => curr ? {...curr, price: Number(e.target.value)} : null)}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Add-ons (Optional)</label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddAddOn}>
                    <Plus className="h-3 w-3 mr-1" /> Add Option
                  </Button>
                </div>
                
                {addOns.length === 0 ? (
                  <p className="text-sm text-gray-500">No add-ons added yet</p>
                ) : (
                  <div className="border rounded-md divide-y">
                    {addOns.map(addon => (
                      <div key={addon.id} className="p-3 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-sm">{addon.name}</h4>
                          <p className="text-xs text-gray-500">{addon.description}</p>
                          <p className="text-sm">{formatCurrency(addon.price)}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button type="button" variant="ghost" size="icon" onClick={() => handleEditAddOn(addon)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" onClick={() => handleDeleteAddOn(addon.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update Package' : 'Create Package'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Add-on Dialog */}
        <Dialog open={addOnDialogOpen} onOpenChange={setAddOnDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentAddOn && addOns.some(a => a.id === currentAddOn.id) ? 'Edit Add-on' : 'Add New Add-on'}</DialogTitle>
              <DialogDescription>
                Create optional add-ons for your package
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSaveAddOn} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Add-on Name</label>
                <Input
                  value={currentAddOn?.name || ''}
                  onChange={(e) => setCurrentAddOn(curr => curr ? {...curr, name: e.target.value} : null)}
                  placeholder="e.g., Additional Hour"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={currentAddOn?.description || ''}
                  onChange={(e) => setCurrentAddOn(curr => curr ? {...curr, description: e.target.value} : null)}
                  placeholder="Brief explanation of this add-on"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input
                  type="number"
                  value={currentAddOn?.price || 0}
                  onChange={(e) => setCurrentAddOn(curr => curr ? {...curr, price: Number(e.target.value)} : null)}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddOnDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Add-on
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </VendorLayout>
  );
};

export default VendorPackages;
