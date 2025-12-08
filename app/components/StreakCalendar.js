
'use client';

import { useState } from 'react';
import styles from './StreakCalendar.module.css';

export default function StreakCalendar({ entries = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthEntries = entries.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });

    const getEntryForDay = (day) => {
        return monthEntries.find(e => new Date(e.date).getDate() === day);
    };

    return (
        <div className={`${styles.calendar} glass-panel`}>
            <div className={styles.header}>
                <button className="btn-text" onClick={handlePrevMonth}>&lt;</button>
                <h3>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h3>
                <button className="btn-text" onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className={styles.grid}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={`${d}-${i}`} style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>{d}</div>
                ))}
                {Array(firstDayOfMonth).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array(daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1;
                    const entry = getEntryForDay(day);
                    const isToday = day === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear();

                    return (
                        <div key={day} className={`${styles.day} ${entry ? styles.hasEntry : ''} ${isToday ? styles.today : ''}`}>
                            {entry ? (
                                <span title={new Date(entry.date).toLocaleTimeString()}>✓</span>
                            ) : day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
