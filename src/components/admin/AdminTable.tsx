
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminTableProps {
  headers: string[];
  rows: (string | number | JSX.Element)[][];
  isLoading?: boolean;
}

const AdminTable = ({ headers, rows, isLoading = false }: AdminTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            {headers.map((_, i) => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
          
          {Array(5).fill(0).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 py-3 border-t">
              {headers.map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-28" />
              ))}
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className={index === headers.length - 1 ? 'text-right' : ''}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    className={cellIndex === row.length - 1 ? 'text-right' : ''}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AdminTable;
