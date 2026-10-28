import { Bell } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export default function AdminTopbar({ title, subtitle }) {
  const user = currentUser.admin;
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center gap-4 px-4 md:px-6 sticky top-0 z-20">
      <div className="min-w-0">
        <h1 className="text-lg font-bold text-slate-900 leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
      </div>

      <div className="flex-1" />

      <button className="relative text-slate-500 hover:text-slate-700">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
          {user.initials}
        </div>
        <div className="hidden md:block leading-tight">
          <div className="text-sm font-bold text-slate-800">{user.name}</div>
          <div className="text-[11px] text-slate-400">{user.role}</div>
        </div>
      </div>
    </header>
  );
}
