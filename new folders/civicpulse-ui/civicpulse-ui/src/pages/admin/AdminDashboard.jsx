import { FileText, Hourglass, RotateCw, CheckCircle2, XCircle, CalendarDays } from 'lucide-react';
import usePageMeta from '../../lib/usePageMeta';
import { StatCardVertical } from '../../components/shared/StatCard';
import Card, { CardHeader } from '../../components/shared/Card';
import { complaints, statusCounts } from '../../data/mockData';

const today = new Date('2026-08-12T00:00:00');
const todayLabel = today.toLocaleDateString('en-US', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const OVERVIEW = [
  { label: 'Pending', color: 'bg-amber-400' },
  { label: 'In Progress', color: 'bg-violet-500' },
  { label: 'Resolved', color: 'bg-emerald-500' },
  { label: 'Rejected', color: 'bg-red-500' },
];

export default function AdminDashboard() {
  usePageMeta('Admin Dashboard', 'CivicPulse Management Portal');
  const counts = statusCounts(complaints);
  const recent = [...complaints]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 4);

  const overviewData = {
    Pending: counts.pending,
    'In Progress': counts.inProgress,
    Resolved: counts.resolved,
    Rejected: counts.rejected,
  };
  const maxOverview = Math.max(1, ...Object.values(overviewData));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, Admin 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with CivicPulse today.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm self-start">
          <CalendarDays size={16} className="text-slate-400" />
          {todayLabel}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCardVertical label="Total Complaints" value={counts.total} caption="Live from database" icon={FileText} tone="blue" />
        <StatCardVertical label="Pending" value={counts.pending} caption="Awaiting officer action" icon={Hourglass} tone="amber" />
        <StatCardVertical label="In Progress" value={counts.inProgress} caption="Currently being handled" icon={RotateCw} tone="violet" />
        <StatCardVertical label="Resolved" value={counts.resolved} caption="Successfully resolved" icon={CheckCircle2} tone="green" />
        <StatCardVertical label="Rejected" value={counts.rejected} caption="Rejected complaints" icon={XCircle} tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Complaint Overview" action={<a href="#" className="text-sm font-semibold text-brand-600 hover:underline">View Details →</a>} />
          <div className="space-y-4">
            {OVERVIEW.map(({ label, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-800">{overviewData[label]}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${(overviewData[label] / maxOverview) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent Activity" action={<a href="#" className="text-sm font-semibold text-brand-600 hover:underline">View All</a>} />
          <div className="space-y-4">
            {recent.map((c, i) => (
              <div key={c.id} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Hourglass size={15} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800">
                    Complaint #{complaints.length - i} — {c.category}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {c.status.toUpperCase()} · {c.submittedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
