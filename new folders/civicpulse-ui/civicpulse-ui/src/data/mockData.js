// Central mock data source.
// Replace each export with a real API call (see src/lib/api.js) once the
// Spring Boot backend is live — the shape of the objects below is what the
// UI expects, so keep it consistent when you swap in real data.

export const currentUser = {
  citizen: { name: 'Vyshnavi', role: 'Citizen', initials: 'V' },
  officer: { name: 'User', role: 'Officer', department: 'Electricity', initials: 'U' },
  admin: { name: 'Administrator', role: 'System Admin', initials: 'A' },
};

export const complaints = [
  {
    id: 'CP-20260812-6AA1B4',
    title: 'test1',
    category: 'Street Light',
    department: 'ELECTRICITY',
    priority: 'MEDIUM',
    location: 'chennai',
    description: 'test1',
    status: 'Pending',
    submittedBy: 'Radha',
    submittedAt: '2026-08-12T19:34:00',
  },
  {
    id: 'CP-20260812-45DA6D',
    title: 'test',
    category: 'Water Supply',
    department: 'WATER',
    priority: 'HIGH',
    location: 'chennai',
    description: 'No water supply since morning',
    status: 'Pending',
    submittedBy: 'Radha',
    submittedAt: '2026-08-12T18:10:00',
  },
  {
    id: 'CP-20260810-3F2C11',
    title: 'Garbage not collected',
    category: 'Sanitation',
    department: 'SANITATION',
    priority: 'LOW',
    location: 'chennai',
    description: 'Garbage bins overflowing for 3 days',
    status: 'In Progress',
    submittedBy: 'Revanth',
    submittedAt: '2026-08-10T09:22:00',
  },
  {
    id: 'CP-20260808-9B7A20',
    title: 'Pothole on main road',
    category: 'Roads',
    department: 'PWD',
    priority: 'HIGH',
    location: 'chennai',
    description: 'Large pothole causing accidents',
    status: 'Resolved',
    submittedBy: 'Varun',
    submittedAt: '2026-08-08T14:05:00',
  },
  {
    id: 'CP-20260805-11A0F2',
    title: 'Illegal construction',
    category: 'Building',
    department: 'PLANNING',
    priority: 'MEDIUM',
    location: 'chennai',
    description: 'Unauthorized construction near park',
    status: 'Rejected',
    submittedBy: 'Varun',
    submittedAt: '2026-08-05T11:40:00',
  },
  {
    id: 'CP-20260804-77CDE1',
    title: 'Broken street light',
    category: 'Street Light',
    department: 'ELECTRICITY',
    priority: 'MEDIUM',
    location: 'chennai',
    description: 'Street light not working for a week',
    status: 'Pending',
    submittedBy: 'Varun',
    submittedAt: '2026-08-04T20:15:00',
  },
  {
    id: 'CP-20260801-2E9911',
    title: 'Water leakage',
    category: 'Water Supply',
    department: 'WATER',
    priority: 'HIGH',
    location: 'chennai',
    description: 'Pipeline leakage flooding the street',
    status: 'In Progress',
    submittedBy: 'Sanjana',
    submittedAt: '2026-08-01T08:30:00',
  },
];

export const officers = [
  { id: 'OFF-101', name: 'Kumar', department: 'Electricity', email: 'kumar@civicpulse.gov', status: 'Active', assigned: 4 },
  { id: 'OFF-102', name: 'Rao Rajesh', department: 'Water Supply', email: 'rajesh@civicpulse.gov', status: 'Active', assigned: 2 },
  { id: 'OFF-103', name: 'Vijaya', department: 'Sanitation', email: 'vijaya@civicpulse.gov', status: 'Inactive', assigned: 0 },
  { id: 'OFF-104', name: 'Lakshmi', department: 'Roads (PWD)', email: 'lakshmi@civicpulse.gov', status: 'Active', assigned: 3 },
];

export const citizens = [
  { id: 'CIT-201', name: 'Radha', email: 'radha@example.com', complaints: 2, joined: '2026-05-12', status: 'Active' },
  { id: 'CIT-202', name: 'Revanth', email: 'revanth@example.com', complaints: 1, joined: '2026-06-02', status: 'Active' },
  { id: 'CIT-203', name: 'Varun', email: 'varun@example.com', complaints: 3, joined: '2026-03-21', status: 'Active' },
  { id: 'CIT-204', name: 'Sanjana', email: 'sanjana@example.com', complaints: 1, joined: '2026-07-08', status: 'Suspended' },
];

export const notifications = [
  { id: 1, title: 'Complaint #8 assigned to Electricity dept.', time: '2 hours ago', read: false },
  { id: 2, title: 'Complaint #6 marked as Resolved', time: '1 day ago', read: false },
  { id: 3, title: 'New officer added to Water Supply dept.', time: '2 days ago', read: true },
  { id: 4, title: 'Complaint #3 status changed to In Progress', time: '3 days ago', read: true },
];

export const statusCounts = (list = complaints) => ({
  total: list.length,
  pending: list.filter((c) => c.status === 'Pending').length,
  inProgress: list.filter((c) => c.status === 'In Progress').length,
  resolved: list.filter((c) => c.status === 'Resolved').length,
  rejected: list.filter((c) => c.status === 'Rejected').length,
});

export const departments = ['Electricity', 'Water Supply', 'Sanitation', 'Roads (PWD)', 'Planning'];
export const categories = ['Street Light', 'Water Supply', 'Sanitation', 'Roads', 'Building', 'Other'];
export const priorities = ['LOW', 'MEDIUM', 'HIGH'];
