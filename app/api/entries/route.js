
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, readFile, mkdir } from 'fs/promises';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const ENTRIES_FILE = path.join(DATA_DIR, 'entries.json');

// Helper to ensure directories exist
async function ensureDirs() {
    await mkdir(DATA_DIR, { recursive: true });
    await mkdir(UPLOADS_DIR, { recursive: true });
}

// Helper to read entries
async function getEntries() {
    try {
        const data = await readFile(ENTRIES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

// GET /api/entries
export async function GET() {
    await ensureDirs();
    const entries = await getEntries();
    return NextResponse.json(entries);
}

// POST /api/entries
export async function POST(request) {
    try {
        await ensureDirs();
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const timestamp = Date.now();
        // Sanitize filename
        const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const filepath = path.join(UPLOADS_DIR, filename);

        // Write file
        await writeFile(filepath, buffer);

        // Update entries.json
        const entries = await getEntries();
        const newEntry = {
            id: timestamp.toString(),
            date: new Date().toISOString(),
            filename: filename,
            path: `/uploads/${filename}`
        };

        entries.push(newEntry);
        await writeFile(ENTRIES_FILE, JSON.stringify(entries, null, 2));

        return NextResponse.json(newEntry);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
