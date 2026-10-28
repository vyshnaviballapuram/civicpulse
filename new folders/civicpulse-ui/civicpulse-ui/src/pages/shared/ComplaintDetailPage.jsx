import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Hash,
  CalendarDays,
  MapPin,
  Building2,
  User,
  Loader2,
  AlertTriangle,
  RefreshCcw,
} from 'lucide-react';
import Card, { CardHeader } from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import PriorityBadge from '../../components/shared/PriorityBadge';
import Button from '../../components/shared/Button';
import { Field, Select } from '../../components/shared/FormControls';
import { getComplaintById, updateComplaintStatus } from '../../lib/api';

/**
 * @param {'citizen'|'officer'|'admin'} role - controls whether status can be edited
 *   and where the "Back" link points.
 */
export default function ComplaintDetailPage({ role = 'citizen' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [saving, setSaving] = useState(false);

  const backTo = {
    citizen: '/citizen/my-complaints',
    officer: '/officer/complaints',
    admin: '/admin/complaints',
  }[role];

  const listLabel = {
    citizen: 'My Complaints',
    officer: 'Assigned Complaints',
    admin: 'All Complaints',
  }[role];

  const load = async () => {
    setLoading(true);
    const { data, source, notFound: nf } = await getComplaintById(id);
    setComplaint(data);
    setNotFound(!!nf);
    setUsingFallback(source === 'mock');
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (e) => {
    const newLabel = e.target.value;
    const statusKeyMap = {
      Pending: 'PENDING',
      'In Progress': 'IN_PROGRESS',
      Resolved: 'RESOLVED',
      Rejected: 'REJECTED',
    };
    setSaving(true);
    try {
      const updated = await updateComplaintStatus(id, statusKeyMap[newLabel]);
      setComplaint((c) => ({ ...c, status: updated.status || newLabel }));
    } catch (err) {
      // Backend not reachable yet — reflect the change locally so the UI stays usable.
      setComplaint((c) => ({ ...c, status: newLabel }));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-24 flex flex-col items-center gap-3 text-slate-400">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-sm">Loading complaint…</span>
      </div>
    );
  }

  if (notFound || !complaint) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Complaint not found</h2>
        <p className="text-sm text-slate-500 mt-2">
          We couldn't find a complaint with ID <span className="font-semibold">{id}</span>.
        </p>
        <Link to={backTo} className="inline-block mt-6">
          <Button variant="secondary" icon={ArrowLeft}>Back to {listLabel}</Button>
        </Link>
      </div>
    );
  }

  const c = complaint;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={16} />
          Back to {listLabel}
        </button>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          <RefreshCcw size={14} />
          Refresh
        </button>
      </div>

      {usingFallback && (
        <div className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-4 py-2.5">
          Showing local data — backend at <code>localhost:8080</code> isn't reachable, so this complaint
          is coming from mock data instead of the live API.
        </div>
      )}

      <Card>
        <div className="flex items-start justify-between mb-1 gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-brand-700 font-bold text-sm">
            <Hash size={14} />
            {c.id}
          </div>
          {role === 'citizen' ? (
            <StatusBadge status={c.status} />
          ) : (
            <div className="flex items-center gap-2">
              {saving && <Loader2 className="animate-spin text-slate-400" size={14} />}
              <Select value={c.status} onChange={handleStatusChange} className="!py-1.5 !text-xs w-auto">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </Select>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-5">{c.title}</h1>
        <div className="h-px bg-slate-100 mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm mb-6">
          <div className="flex items-start gap-2.5">
            <Building2 size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-slate-400 text-xs">Category / Department</div>
              <div className="font-semibold text-slate-800 mt-0.5">{c.category} — {c.department}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-slate-400 text-xs">Location</div>
              <div className="font-semibold text-slate-800 mt-0.5 capitalize">{c.location}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-slate-400 text-xs mb-1">Priority</div>
              <PriorityBadge priority={c.priority} />
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <User size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-slate-400 text-xs">Submitted By</div>
              <div className="font-semibold text-slate-800 mt-0.5">{c.submittedBy}</div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-slate-400 text-xs mb-1.5">Description</div>
          <p className="text-sm text-slate-700 leading-relaxed">{c.description}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-4 border-t border-slate-100">
          <CalendarDays size={13} />
          Submitted:{' '}
          {new Date(c.submittedAt).toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
      </Card>

      {role !== 'citizen' && (
        <Card>
          <CardHeader title="Officer Notes" subtitle="Internal notes, not visible to the citizen." />
          <textarea
            rows={3}
            placeholder="Add a note about this complaint..."
            className="w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
          />
          <div className="flex justify-end mt-3">
            <Button size="sm">Save Note</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
