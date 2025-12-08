
'use client';

export default function StatsDisplay({ entries = [] }) {
    // Simple streak calculation logic
    // Sort entries by date desc
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

    const calculateStreak = () => {
        if (sorted.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if latest entry is today or yesterday to continue streak
        const latest = new Date(sorted[0].date);
        latest.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - latest);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) return 0; // Streak broken if no entry yesterday or today

        streak = 1;
        // Iterate backwards
        for (let i = 0; i < sorted.length - 1; i++) {
            const curr = new Date(sorted[i].date);
            const next = new Date(sorted[i + 1].date);
            curr.setHours(0, 0, 0, 0);
            next.setHours(0, 0, 0, 0);

            const diff = (curr - next) / (1000 * 60 * 60 * 24);
            if (diff === 1) streak++;
            else if (diff === 0) continue; // Same day multiple entries
            else break;
        }
        return streak;
    };

    const currentStreak = calculateStreak();
    const totalSnaps = entries.length;

    return (
        <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
            <div className="glass-panel" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{currentStreak}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Streak 🔥</div>
            </div>
            <div className="glass-panel" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{totalSnaps}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Snaps 📸</div>
            </div>
        </div>
    );
}
