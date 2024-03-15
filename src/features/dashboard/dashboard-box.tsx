import { useUser } from '../auth/use-user';
import DashboardCards from './dashboard-cards';

export default function Dashboardbox() {
  const { user } = useUser();

  if (!user) return null;
  return (
    <div className="space-y-4">
      <h1 className="text-base md:text-2xl font-bold">Welcome back</h1>
      <DashboardCards />
    </div>
  );
}
