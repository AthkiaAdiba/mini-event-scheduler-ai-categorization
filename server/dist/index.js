"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
dotenv_1.default.config();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// In-memory event store
const events = [];
function categorizeEvent(title, notes) {
    const workKeywords = [
        "meeting",
        "project",
        "client",
        "deadline",
        "presentation",
    ];
    const personalKeywords = ["birthday", "family", "home", "party", "vacation"];
    const content = `${title} ${notes || ""}`.toLowerCase();
    if (workKeywords.some((word) => content.includes(word)))
        return "Work";
    if (personalKeywords.some((word) => content.includes(word)))
        return "Personal";
    return "Other";
}
app.post("/events", (req, res) => {
    const { title, date, time, notes } = req.body;
    if (!title || !date || !time) {
        return res
            .status(400)
            .json({ message: "Title, date, and time are required." });
    }
    const newEvent = {
        id: (0, uuid_1.v4)(),
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
app.get("/events", (_req, res) => {
    const sortedEvents = events.sort((a, b) => {
        const aDate = new Date(`${a.date}T${a.time}`);
        const bDate = new Date(`${b.date}T${b.time}`);
        return aDate.getTime() - bDate.getTime();
    });
    return res.status(200).json(sortedEvents);
});
// PUT /events/:id
app.put("/events/:id", (req, res) => {
    const { id } = req.params;
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ message: "Event not found." });
    }
    event.archived = true;
    return res.status(200).json(event);
});
// DELETE /events/:id
app.delete("/events/:id", (req, res) => {
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
