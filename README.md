# 🗓️ Mini Event Scheduler with AI Categorization

Mini Event Scheduler is a full-stack web application that helps users efficiently manage their events by allowing them to create, view, archive, and delete events. What makes this scheduler special is its smart categorization feature — events are automatically tagged as Work, Personal, or Other using simple AI-inspired keyword detection.

## 🚀 Live Links

### Frontend Live Link = https://mini-event-scheduler-ai-categorizat-delta.vercel.app

### Backend Live Link = https://mini-event-scheduler-ai-categorizat.vercel.app

## ✨ Features

- Add events with title, date, time, and optional notes

- Automatically categorize events using keyword-based logic

- View a list of upcoming events sorted by date and time

- Archive and delete events

- Filter events by category

- Responsive design optimized for mobile and desktop

- Built with modern technologies: React, TypeScript, Node.js, Express, and Tailwind CSS

- Category filter to view specific types of events

- Graceful error handling in the UI for failed API calls

- Environment variable support for backend configuration

- Unit tests for categorization logic using Jest

## 🧠 Smart Event Categorization

When users create a new event, the backend analyzes the title and notes fields to assign a category:

- **Work:** Contains keywords like meeting, project, client, deadline, presentation

- **Personal:** Contains keywords like birthday, family, home, party

- **Other:** Default category if no keywords are matched

The matching is case-insensitive and flexible enough to categorize typical day-to-day events accurately.

## 👩‍💻 Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite

- **Backend:** Node.js, Express, TypeScript

## 📁 Project Structure

```bash
/client   → Frontend (React + TypeScript + Tailwind CSS)
/server   → Backend (Express + TypeScript)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Clone the Repository

```bash
git clone https://github.com/AthkiaAdiba/mini-event-scheduler-ai-categorization.git
cd mini-event-scheduler-ai-categorization
```

## Backend Setup

```bash
cd server
npm install
```

- Runs on http://localhost:5000 (customizable via .env)

## 🔗 Backend Scripts

- `npm run dev`: Starts the development backend with hot reloading.

- `npm run build`: Compiles TypeScript into JavaScript.

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

- Runs on http://localhost:5173 (Vite default)

## 🔌 API Endpoints

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/events`     | Create a new event                   |
| GET    | `/events`     | Get all events (sorted by date/time) |
| PUT    | `/events/:id` | Archive an event                     |
| DELETE | `/events/:id` | Delete an event                      |

## Example Event Response

```bash
{
  "id": "1",
  "title": "Project meeting",
  "date": "2025-07-21",
  "time": "14:00",
  "notes": "Client sync-up",
  "archived": false,
  "category": "Work"
}
```

## 📞 Contact

For any queries or feedback, feel free to reach out:
Email: athkiaadiba@gmail.com
