
'use client';

import { useState, useRef } from 'react';
import styles from './CameraCapture.module.css';

export default function CameraCapture({ onUploadSuccess }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/entries', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const newEntry = await res.json();
            if (onUploadSuccess) onUploadSuccess(newEntry);

        } catch (error) {
            alert('Failed to save snap!');
            console.error(error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`${styles.container} glass-panel`}>
            <h3>Daily Snap</h3>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />

            <button
                className={styles.snapButton}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Take Photo"
            />

            {uploading && <p className={styles.uploading}>Saving your habit...</p>}
            {!uploading && <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Tap circle to capture</p>}
        </div>
    );
}
