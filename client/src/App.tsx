/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Event } from "./types/event";
import Header from "./components/Header";
import { EventForm } from "./components/EventForm";
import { Toast } from "./components/toast";
import { EventList } from "./components/EventList";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "./api/eventService";
import { Footer } from "./components/Footer";

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "Work" | "Personal" | "Other">(
    "all"
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch and sort events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = (await getEvents()) as unknown as Event[];
      // Sort by date and time ascending
      fetchedEvents.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      setEvents(fetchedEvents);
    } catch (error: any) {
      showToast("Failed to fetch events. Please try again.", error.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEventCreated = async (newEvent: Omit<Event, "id">) => {
    try {
      setLoading(true);
      const createdEvent = (await createEvent(newEvent)) as unknown as Event;
      // Add new event and re-sort
      const updatedEvents: Event[] = [...events, createdEvent].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      setEvents(updatedEvents);
      showToast("Event created successfully!", "success");
    } catch (error: any) {
      showToast("Failed to create event. Please try again.", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEventDeleted = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      showToast("Event deleted successfully!", "success");
    } catch (error: any) {
      showToast("Failed to delete event. Please try again.", error.message);
    }
  };

  const handleEventArchived = async (eventId: string) => {
    try {
      const updatedEvent = (await updateEvent(eventId)) as unknown as Event;
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? updatedEvent : event))
      );
      showToast("Event archived successfully!", "success");
    } catch (error: any) {
      showToast("Failed to archive event. Please try again.", error.message);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.category === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-blue-600"></div>
          <span className="text-slate-600 text-sm sm:text-base">
            Loading events...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-20 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="xl:col-span-1 order-2 xl:order-1">
            <EventForm
              handleEventCreated={handleEventCreated}
              showToast={showToast}
            />
          </div>
          <div className="xl:col-span-2 order-1 xl:order-2">
            <EventList
              events={filteredEvents}
              filter={filter}
              onFilterChange={setFilter}
              onEventDeleted={handleEventDeleted}
              onEventArchived={handleEventArchived}
            />
          </div>
        </div>
      </main>
      <Footer />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;
