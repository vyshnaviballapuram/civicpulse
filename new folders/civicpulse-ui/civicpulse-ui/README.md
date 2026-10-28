# CivicPulse UI

Fresh React + Vite + Tailwind CSS v4 frontend for the CivicPulse Smart Governance
Platform, redesigned to match the reference screenshots (Citizen / Officer / Admin
portals).

## Run it

```bash
npm install
npm run dev
```

Dev server runs on **http://localhost:8085** (matches the ports used in the
reference screenshots: `/citizen`, `/officer`, `/admin`).

Visit `/` for a role picker, or jump straight to:
- `/citizen/dashboard`
- `/officer/dashboard`
- `/admin/dashboard`

## Structure

```
src/
  components/
    shared/     StatusBadge, PriorityBadge, Card, StatCard, Button, FormControls, Table, FilterBar
    citizen/    CitizenSidebar, CitizenTopbar, ComplaintCard
    officer/    OfficerSidebar, OfficerTopbar
    admin/      AdminSidebar, AdminTopbar
  layouts/      CitizenLayout, OfficerLayout, AdminLayout
  pages/
    citizen/    Dashboard, RegisterComplaint, MyComplaints, TrackComplaint, Notifications, Profile
    officer/    Dashboard, Complaints, Notifications, Profile, ChangePassword, Help
    admin/      Dashboard, Complaints, Officers, Citizens, Reports, Settings, Profile
  data/
    mockData.js   All mock data — swap for real API calls once your Spring Boot
                  backend is live. Shapes match what the UI expects.
  lib/
    usePageMeta.js          sets Officer/Admin topbar title+subtitle from a page
    useComplaintFilters.js  shared search/status/priority/category filter logic
```

## Merging into your existing project

1. Copy `src/components`, `src/layouts`, `src/pages`, `src/data`, `src/lib` into
   your project, replacing the old `components`/`pages` folders.
2. Merge `src/index.css` theme tokens into your existing global CSS (or replace
   it — it only defines the `@theme` color tokens + a couple of base rules).
3. Merge `src/App.jsx` routes into your router — keep your existing auth guards,
   just swap in the new layouts/pages.
4. Install the two new deps if you don't already have them:
   `npm install react-router-dom lucide-react`
5. Replace the imports in `src/data/mockData.js` with your real
   `services/*.js` API calls (JWT interceptor layer) once the backend is
   connected — the object shapes (`complaints`, `officers`, `citizens`,
   `notifications`) are drop-in compatible with what the components expect.

## Design notes

- **Citizen portal**: white sidebar, navy top header bar — matches your
  `/citizen/complaints` reference.
- **Officer / Admin portals**: dark navy sidebar (`navy-950`), white content
  area, blue accent (`brand-500/600/700`) for active states and primary
  actions — matches your `/officer/complaints` and `/admin/dashboard`
  references.
- Status colors: Pending (amber), In Progress (violet), Resolved (green),
  Rejected (red) — consistent across all three portals.
