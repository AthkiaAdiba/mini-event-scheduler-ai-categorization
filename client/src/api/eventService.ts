import type { CreatedEvent } from "@/types/event";

// api/eventApi.ts
const API_BASE_URL = "https://mini-event-scheduler-ai-categorizat.vercel.app";

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};

export const createEvent = async (event: CreatedEvent): Promise<Event> => {
  try {
    console.log("Sending event data:", event); // Log what's being sent

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`Failed to create event: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Created event:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error in createEvent:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
};

export const updateEvent = async (eventId: string): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to archive event");
  return response.json();
};
