import { UserCircle2 } from 'lucide-react';
import Card from '../../components/shared/Card';
import { Field, Input } from '../../components/shared/FormControls';
import Button from '../../components/shared/Button';
import { currentUser } from '../../data/mockData';

export default function CitizenProfile() {
  const user = currentUser.citizen;
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <UserCircle2 className="text-brand-700" size={26} />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage your account details.</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-700 text-white flex items-center justify-center text-xl font-bold">
            {user.initials}
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{user.name}</div>
            <div className="text-sm text-slate-500">Citizen</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name">
            <Input defaultValue={user.name} />
          </Field>
          <Field label="Email">
            <Input defaultValue="tarun@example.com" type="email" />
          </Field>
          <Field label="Phone">
            <Input defaultValue="+91 98765 43210" />
          </Field>
          <Field label="City">
            <Input defaultValue="Chennai" />
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
