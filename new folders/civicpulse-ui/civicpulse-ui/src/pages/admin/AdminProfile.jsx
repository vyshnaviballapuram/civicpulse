import usePageMeta from '../../lib/usePageMeta';
import Card from '../../components/shared/Card';
import { Field, Input } from '../../components/shared/FormControls';
import Button from '../../components/shared/Button';
import { currentUser } from '../../data/mockData';

export default function AdminProfile() {
  usePageMeta('Profile', 'Manage your admin account details');
  const user = currentUser.admin;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold">
            {user.initials}
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{user.name}</div>
            <div className="text-sm text-slate-500">{user.role}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name">
            <Input defaultValue={user.name} />
          </Field>
          <Field label="Role">
            <Input defaultValue={user.role} disabled />
          </Field>
          <Field label="Email">
            <Input defaultValue="admin@civicpulse.gov" type="email" />
          </Field>
          <Field label="Phone">
            <Input defaultValue="+91 90000 00000" />
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
