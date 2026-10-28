import { Link } from 'react-router-dom';
import { RefreshCcw, FileText, Hourglass, RotateCw, CheckCircle2, Eye } from 'lucide-react';
import usePageMeta from '../../lib/usePageMeta';
import useComplaintFilters from '../../lib/useComplaintFilters';
import { StatCardHorizontal } from '../../components/shared/StatCard';
import Card, { CardHeader } from '../../components/shared/Card';
import FilterBar from '../../components/shared/FilterBar';
import Table, { Td } from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import { complaints, statusCounts } from '../../data/mockData';

export default function OfficerComplaints() {
  usePageMeta('Complaints', 'View and manage assigned civic grievances');
  const counts = statusCounts(complaints);
  const { filters, onChange, onReset, filtered } = useComplaintFilters(complaints);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="text-xs font-bold tracking-wider text-brand-600 uppercase mb-1">
            Grievance Management
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Assigned Complaints</h2>
          <p className="text-sm text-slate-500 mt-1">View, track and manage complaints assigned to you.</p>
        </div>
        <Button variant="secondary" icon={RefreshCcw} size="sm" className="self-start">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardHorizontal label="Total" value={counts.total} icon={FileText} tone="blue" />
        <StatCardHorizontal label="Pending" value={counts.pending} icon={Hourglass} tone="amber" />
        <StatCardHorizontal label="In Progress" value={counts.inProgress} icon={RotateCw} tone="violet" />
        <StatCardHorizontal label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="green" />
      </div>

      <Card>
        <CardHeader title="Find Complaints" subtitle="Search and filter your assigned grievances." />
        <FilterBar filters={filters} onChange={onChange} onReset={onReset} />
      </Card>

      <Card padding="p-0 pt-6">
        <div className="px-6">
          <CardHeader title="Complaint List" subtitle="Complaints currently assigned to you." />
        </div>
        <Table columns={['Complaint ID', 'Category', 'Location', 'Priority', 'Submitted', 'Status', 'Action']}>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
              <Td className="font-semibold text-brand-700">{c.id}</Td>
              <Td>{c.category}</Td>
              <Td className="capitalize">{c.location}</Td>
              <Td>
                <span className="text-xs font-bold text-slate-500">{c.priority}</span>
              </Td>
              <Td className="text-slate-500">
                {new Date(c.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </Td>
              <Td>
                <StatusBadge status={c.status} />
              </Td>
              <Td>
                <Link to={`/officer/complaints/${c.id}`} className="text-slate-400 hover:text-brand-600 inline-flex">
                  <Eye size={17} />
                </Link>
              </Td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <Td className="text-center text-slate-400 py-10" colSpan={7}>
                No complaints match your filters.
              </Td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
}
