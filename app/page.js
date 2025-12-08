
'use client';

import { useState, useEffect } from 'react';
import CameraCapture from './components/CameraCapture';
import StreakCalendar from './components/StreakCalendar';
import StatsDisplay from './components/StatsDisplay';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/entries');
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Failed to load entries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleUploadSuccess = (newEntry) => {
    setEntries(prev => [...prev, newEntry]);
  };

  return (
    <main className="container">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #38bdf8, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          HabitSnap
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Daily visual proof of your progress</p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      ) : (
        <>
          <StatsDisplay entries={entries} />

          <CameraCapture onUploadSuccess={handleUploadSuccess} />

          <StreakCalendar entries={entries} />

          <footer style={{ marginTop: '3rem', textAlign: 'center', paddingBottom: '2rem' }}>
            <a href={`/api/export?t=${Date.now()}`} download="habitsnap_data.zip" className="btn-text" style={{ color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: '0.9rem' }}>
              Export Data
            </a>
          </footer>
        </>
      )}
    </main>
  );
}
