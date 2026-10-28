import { complaints as mockComplaints } from '../data/mockData';

// Point this at your Spring Boot backend. Override with a .env value
// (VITE_API_BASE_URL) if you deploy the backend somewhere other than
// localhost:8080.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Fetch a single complaint by ID from the backend.
 * Falls back to local mock data if the backend is unreachable, so the UI
 * keeps working while you're wiring things up — remove the fallback once
 * the backend is your source of truth.
 */
export async function getComplaintById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/complaints/${id}`);
    if (res.status === 404) {
      return { data: null, source: 'api', notFound: true };
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    return { data: normalizeComplaint(data), source: 'api', notFound: false };
  } catch (err) {
    const fallback = mockComplaints.find((c) => c.id === id) || null;
    return { data: fallback, source: 'mock', notFound: !fallback, error: err.message };
  }
}

export async function getAllComplaints(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/complaints${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    return { data: data.map(normalizeComplaint), source: 'api' };
  } catch (err) {
    return { data: mockComplaints, source: 'mock', error: err.message };
  }
}

export async function createComplaint(payload) {
  const res = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return normalizeComplaint(await res.json());
}

export async function updateComplaintStatus(id, status) {
  const res = await fetch(`${API_BASE_URL}/complaints/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return normalizeComplaint(await res.json());
}

// Backend returns status as "Pending" / "In Progress" / etc. (matches mock already).
// This just guards against any casing drift so components never have to know
// whether data came from the API or the mock fallback.
function normalizeComplaint(c) {
  if (!c) return c;
  return { ...c, submittedAt: c.submittedAt || c.submitted_at };
}
