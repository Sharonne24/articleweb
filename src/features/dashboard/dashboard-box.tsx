import DashboardCards from './dashboard-cards';

export default function Dashboardbox() {
  return (
    <div className="space-y-4">
      <h1 className="text-base md:text-2xl font-bold">Welcome back, User</h1>
      <DashboardCards />
    </div>
  );
}
