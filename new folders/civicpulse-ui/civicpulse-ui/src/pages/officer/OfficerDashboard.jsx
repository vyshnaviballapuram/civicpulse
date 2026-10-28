import { FileText, Hourglass, RotateCw, CheckCircle2 } from 'lucide-react';
import usePageMeta from '../../lib/usePageMeta';
import { StatCardHorizontal } from '../../components/shared/StatCard';
import Card, { CardHeader } from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import { complaints, statusCounts, currentUser } from '../../data/mockData';

export default function OfficerDashboard() {
  usePageMeta('Dashboard', `Welcome back, ${currentUser.officer.department} Department`);
  const counts = statusCounts(complaints);
  const recent = complaints.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardHorizontal label="Total Assigned" value={counts.total} icon={FileText} tone="blue" />
        <StatCardHorizontal label="Pending" value={counts.pending} icon={Hourglass} tone="amber" />
        <StatCardHorizontal label="In Progress" value={counts.inProgress} icon={RotateCw} tone="violet" />
        <StatCardHorizontal label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="green" />
      </div>

      <Card padding="p-0 pt-6">
        <div className="px-6">
          <CardHeader title="Recent Complaints" subtitle="Latest grievances assigned to you." />
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
