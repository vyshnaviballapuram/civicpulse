import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus2 } from 'lucide-react';
import Card from '../../components/shared/Card';
import { Field, Input, Select, Textarea } from '../../components/shared/FormControls';
import Button from '../../components/shared/Button';
import { categories, priorities, currentUser } from '../../data/mockData';
import { createComplaint } from '../../lib/api';

export default function RegisterComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    priority: 'MEDIUM',
    location: '',
    description: '',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const created = await createComplaint({
        title: form.title,
        category: form.category,
        department: form.category.toUpperCase().replace(/\s+/g, '_'),
        priority: form.priority,
        location: form.location,
        description: form.description,
        submittedBy: currentUser.citizen.name,
      });
      navigate('/citizen/my-complaints', { state: { newComplaintId: created.id } });
    } catch (err) {
      // Backend not reachable yet — fall back to a locally generated ID so the
      // flow still works end-to-end during frontend-only development.
      const id = `CP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()}`;
      navigate('/citizen/my-complaints', { state: { newComplaintId: id } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <FilePlus2 className="text-brand-700" size={26} />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Register Complaint</h2>
          <p className="text-sm text-slate-500 mt-0.5">Report a civic issue to the concerned department.</p>
        </div>
      </div>

      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Field label="Complaint Title">
            <Input
              required
              placeholder="e.g. Street light not working"
              value={form.title}
              onChange={update('title')}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Category">
              <Select value={form.category} onChange={update('category')}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Priority">
              <Select value={form.priority} onChange={update('priority')}>
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Location">
            <Input required placeholder="e.g. Chennai" value={form.location} onChange={update('location')} />
          </Field>

          <Field label="Description">
            <Textarea
              required
              rows={5}
              placeholder="Describe the issue in detail..."
              value={form.description}
              onChange={update('description')}
            />
          </Field>

          <div className="flex justify-end pt-1">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
