import usePageMeta from '../../lib/usePageMeta';
import Card, { CardHeader } from '../../components/shared/Card';
import { Field, Input } from '../../components/shared/FormControls';
import Button from '../../components/shared/Button';
import { currentUser } from '../../data/mockData';

export default function OfficerProfile() {
  usePageMeta('My Profile', 'Manage your officer account details');
  const user = currentUser.officer;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold">
            {user.initials}
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{user.name}</div>
            <div className="text-sm text-slate-500">{user.department} Department · Officer</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name">
            <Input defaultValue={user.name} />
          </Field>
          <Field label="Department">
            <Input defaultValue={user.department} disabled />
          </Field>
          <Field label="Email">
            <Input defaultValue="officer@civicpulse.gov" type="email" />
          </Field>
          <Field label="Phone">
            <Input defaultValue="+91 98765 43210" />
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
