
import { NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';
import AdmZip from 'adm-zip';

const DATA_DIR = path.join(process.cwd(), 'data');
const ENTRIES_FILE = path.join(DATA_DIR, 'entries.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
    try {
        const zip = new AdmZip();
        let entries = [];

        // 1. Try to read entries.json
        try {
            const data = await readFile(ENTRIES_FILE, 'utf-8');
            entries = JSON.parse(data);
        } catch (e) {
            if (e.code !== 'ENOENT') throw e;
        }

        // 2. Generate Simplified CSV (Readable Date, Filename)
        // "Date, Time, Image"
        const csvHeader = 'Date,Time,Image\n';
        const csvRows = entries.map(e => {
            const d = new Date(e.date);
            const dateStr = d.toLocaleDateString();
            const timeStr = d.toLocaleTimeString();
            return `"${dateStr}","${timeStr}","${e.filename}"`;
        }).join('\n');

        const csvContent = csvHeader + csvRows;

        // 3. Add CSV to zip as "log.csv" (simpler name)
        zip.addFile("log.csv", Buffer.from(csvContent, "utf8"));

        // 4. Add images to zip
        for (const entry of entries) {
            if (entry.filename) {
                try {
                    const filePath = path.join(UPLOADS_DIR, entry.filename);
                    // Add to 'images' folder
                    zip.addLocalFile(filePath, "images");
                } catch (err) {
                    console.error(`Failed to add file ${entry.filename} to zip`, err);
                }
            }
        }

        const zipBuffer = zip.toBuffer();

        return new NextResponse(zipBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                // Generic simplified filename
                'Content-Disposition': 'attachment; filename="habitsnap_data.zip"',
            },
        });

    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json({ error: 'Export failed' }, { status: 500 });
    }
}
