import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  archived: boolean;
  category: "Work" | "Personal" | "Other";
};

// In-memory event store
const events: Event[] = [];

function categorizeEvent(
  title: string,
  notes?: string
): "Work" | "Personal" | "Other" {
  const workKeywords = [
    "meeting",
    "project",
    "client",
    "deadline",
    "presentation",
  ];
  const personalKeywords = ["birthday", "family", "home", "party", "vacation"];

  const content = `${title} ${notes || ""}`.toLowerCase();

  if (workKeywords.some((word) => content.includes(word))) return "Work";
  if (personalKeywords.some((word) => content.includes(word)))
    return "Personal";
  return "Other";
}

app.post("/events", (req: Request, res: Response) => {
  const { title, date, time, notes } = req.body;

  if (!title || !date || !time) {
    return res
      .status(400)
      .json({ message: "Title, date, and time are required." });
  }

  const newEvent: Event = {
    id: uuidv4(),
    title,
    date,
    time,
    notes,
    archived: false,
    category: categorizeEvent(title, notes),
  };

  events.push(newEvent);

  return res.status(201).json(newEvent);
});

// GET /events
app.get("/events", (_req: Request, res: Response) => {
  const sortedEvents = events.sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.time}`);
    const bDate = new Date(`${b.date}T${b.time}`);
    return aDate.getTime() - bDate.getTime();
  });
  return res.status(200).json(sortedEvents);
});

// PUT /events/:id
app.put("/events/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  event.archived = true;
  return res.status(200).json(event);
});

// DELETE /events/:id
app.delete("/events/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found." });
  }

  events.splice(index, 1);
  return res.status(201).send({ message: "Event is deleted successfully!" });
});

app.get("/", (req, res) => {
  res.send("Mini Event Scheduler AI Categorization app!");
});

app.listen(port, () => {
  console.log(`Mini Event Scheduler AI Categorization app: ${port}`);
});
