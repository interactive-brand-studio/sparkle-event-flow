
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Edit, Star, Trash } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import EmptyState from '@/components/ui/EmptyState';

interface SavedPackage {
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date;
  vendorCount: number;
}

interface SavedPackagesProps {
  savedPackages: SavedPackage[];
}

const SavedPackages = ({ savedPackages }: SavedPackagesProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Saved Packages</h2>
      
      {savedPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPackages.map(pkg => (
            <Card key={pkg.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{pkg.name}</CardTitle>
                  <Badge variant="outline">
                    {pkg.vendorCount} vendors
                  </Badge>
                </div>
                <CardDescription>
                  Saved on {pkg.createdAt.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{formatCurrency(pkg.totalPrice)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="default" className="flex-1" asChild>
                    <Link to={`/package-builder?package=${pkg.id}`}>
                      Resume
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Star}
          title="No saved packages"
          description="You haven't saved any packages yet."
          actionLabel="Build a Package"
          actionLink="/package-builder"
        />
      )}
    </div>
  );
};

export default SavedPackages;
