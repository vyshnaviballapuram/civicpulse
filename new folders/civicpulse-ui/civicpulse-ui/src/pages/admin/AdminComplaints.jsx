import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import usePageMeta from '../../lib/usePageMeta';
import useComplaintFilters from '../../lib/useComplaintFilters';
import Card, { CardHeader } from '../../components/shared/Card';
import FilterBar from '../../components/shared/FilterBar';
import Table, { Td } from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import PriorityBadge from '../../components/shared/PriorityBadge';
import { complaints } from '../../data/mockData';

export default function AdminComplaints() {
  usePageMeta('Complaints', 'All civic grievances across departments');
  const { filters, onChange, onReset, filtered } = useComplaintFilters(complaints);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader title="Find Complaints" subtitle="Search and filter all complaints across the platform." />
        <FilterBar filters={filters} onChange={onChange} onReset={onReset} />
      </Card>

      <Card padding="p-0 pt-6">
        <div className="px-6">
          <CardHeader title="All Complaints" subtitle={`${filtered.length} complaint(s) found.`} />
        </div>
        <Table columns={['Complaint ID', 'Citizen', 'Category', 'Department', 'Priority', 'Submitted', 'Status', 'Action']}>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
              <Td className="font-semibold text-brand-700">{c.id}</Td>
              <Td>{c.submittedBy}</Td>
              <Td>{c.category}</Td>
              <Td className="capitalize">{c.department.toLowerCase()}</Td>
              <Td>
                <PriorityBadge priority={c.priority} />
              </Td>
              <Td className="text-slate-500">
                {new Date(c.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </Td>
              <Td>
                <StatusBadge status={c.status} />
              </Td>
              <Td>
                <Link to={`/admin/complaints/${c.id}`} className="text-slate-400 hover:text-brand-600 inline-flex">
                  <Eye size={17} />
                </Link>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
