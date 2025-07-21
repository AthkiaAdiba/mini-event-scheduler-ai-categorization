export type Category = "Work" | "Personal" | "Other";

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  time: string; // HH:MM
  notes?: string;
  archived: boolean;
  category: Category;
}

export interface CreatedEvent {
  title: string;
  date: string; // ISO string
  time: string; // HH:MM
  notes?: string;
}
