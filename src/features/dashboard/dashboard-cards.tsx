import StatCard from './stat-card';

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard title="Total blogs" value={0} />
      <StatCard title="Cummulative views" value={0} />
      <StatCard title="Unpublished blogs" value={0} />
      <StatCard title="Number of authors" value={0} />
    </div>
  );
}
