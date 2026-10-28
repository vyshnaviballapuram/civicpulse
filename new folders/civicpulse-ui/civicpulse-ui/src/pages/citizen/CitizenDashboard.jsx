import { Link } from 'react-router-dom';
import { FileText, Hourglass, CheckCircle2, Plus } from 'lucide-react';
import { StatCardHorizontal } from '../../components/shared/StatCard';
import Card, { CardHeader } from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import { complaints, statusCounts, currentUser } from '../../data/mockData';

export default function CitizenDashboard() {
  const counts = statusCounts(complaints);
  const recent = complaints.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, {currentUser.citizen.name} 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Here's an overview of your civic complaints.</p>
        </div>
        <Link to="/citizen/register-complaint">
          <Button icon={Plus}>New Complaint</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCardHorizontal label="Total Complaints" value={counts.total} icon={FileText} tone="blue" />
        <StatCardHorizontal label="Pending" value={counts.pending + counts.inProgress} icon={Hourglass} tone="amber" />
        <StatCardHorizontal label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="green" />
      </div>

      <Card padding="p-0 pt-6">
        <div className="px-6">
          <CardHeader title="Recent Complaints" subtitle="Your latest submissions." />
        </div>
        <div className="divide-y divide-slate-100">
          {recent.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-6 py-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800">{c.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{c.id} · {c.category}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
