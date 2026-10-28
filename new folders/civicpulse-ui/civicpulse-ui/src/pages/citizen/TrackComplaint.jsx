import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../../components/shared/Card';
import { Input } from '../../components/shared/FormControls';
import Button from '../../components/shared/Button';
import ComplaintCard from '../../components/citizen/ComplaintCard';
import { complaints } from '../../data/mockData';

export default function TrackComplaint() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    setResult(complaints.find((c) => c.id.toLowerCase() === query.trim().toLowerCase()) || null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <Search className="text-brand-700" size={26} />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Track Complaint</h2>
          <p className="text-sm text-slate-500 mt-0.5">Enter a complaint number to check its status.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              icon={Search}
              placeholder="e.g. CP-20260812-6AA1B4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Track</Button>
        </form>
      </Card>

      {searched && (result ? (
        <ComplaintCard complaint={result} />
      ) : (
        <Card className="text-center text-slate-500 text-sm">
          No complaint found with that number. Double-check the ID and try again.
        </Card>
      ))}
    </div>
  );
}
