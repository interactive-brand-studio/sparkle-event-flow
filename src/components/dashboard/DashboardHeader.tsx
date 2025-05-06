
import { User } from 'lucide-react';

interface DashboardHeaderProps {
  username: string;
  email: string;
}

const DashboardHeader = ({ username, email }: DashboardHeaderProps) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <p className="text-gray-600">Manage your bookings, saved packages, and account settings</p>
    </header>
  );
};

export default DashboardHeader;
