# HabitSnap

HabitSnap is a lightweight, local-first web application designed to help users track their daily habits through photo evidence. Built with Next.js, it offers a privacy-centric approach by storing all data and images locally on the device, eliminating the need for external cloud storage or user accounts.

## Features

### core Functionality
- **Daily Photo Capture**: Users can capture or upload a single photo per day to document their habit progress.
- **Streak Visualization**: A monthly calendar view visually highlights days with completed entries, helping users maintain consistency.
- **Progress Tracking**: Automatic calculation of current streaks, best streaks, and total completions provides immediate feedback on engagement.

### Data Management
- **Local Storage**: All metadata is stored in a structured JSON format, and images are saved locally within the application directory.
- **Data Export**: Users can export their entire history, including a CSV log of all entries and the original image files, in a single ZIP archive for backup or external analysis.

## Technical Architecture

The application is built using the following technologies:
- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Native CSS with CSS Modules and CSS Variables for theming.
- **Data Persistence**: Node.js file system (fs/promises) for server-side read/write operations.

## Installation and Usage

To run the application locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/abhi3114-glitch/HabitSnap.git
    cd HabitSnap
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Access the application**
    Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

- `app/`: Contains the application source code.
    - `api/`: Backend API routes for data persistence and export functionality.
    - `components/`: Reusable React components (Calendar, Stats, Camera).
    - `page.js`: Main dashboard controller.
- `public/`: Static assets.
- `data/`: Local storage directory (created continuously at runtime).

## License

This project is open source and available under the MIT License.
