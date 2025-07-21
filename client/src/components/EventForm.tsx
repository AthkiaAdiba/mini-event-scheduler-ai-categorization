/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState } from "react";
import type { CreatedEvent, Event, Category } from "../types/event";

interface EventFormProps {
  handleEventCreated: (event: Event) => void;
  showToast: (message: string, type: "success" | "error") => void;
}

export function EventForm({ handleEventCreated, showToast }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date || !formData.time) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    console.log(formData);

    try {
      setLoading(true);

      const newEvent: CreatedEvent = {
        title: formData.title.trim(),
        date: formData.date,
        time: formData.time,
        notes: formData.notes.trim(),
      };

      // Provide default/placeholder values for missing Event fields
      const tempEvent: Event = {
        ...newEvent,
        id: "temp-id-" + Date.now(),
        archived: false,
        category: "uncategorized" as Category,
      };

      handleEventCreated(tempEvent);
      setFormData({ title: "", date: "", time: "", notes: "" });
    } catch (error: any) {
      showToast("Failed to create event. Please try again.", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border-0 p-4 sm:p-6 ring-1 ring-slate-200/50">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2 mb-2">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Create New Event</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Add a new event to your schedule. AI will automatically categorize it
          for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Event Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter event title..."
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700 flex items-center gap-1"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Date *</span>
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full px-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-slate-700 flex items-center gap-1"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Time *</span>
            </label>
            <input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full px-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-slate-700 flex items-center gap-1"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Notes (Optional)</span>
          </label>
          <textarea
            id="notes"
            placeholder="Add any additional notes..."
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full px-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 min-h-16 sm:min-h-20 resize-y bg-white/50 backdrop-blur-sm text-sm sm:text-base"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 sm:py-3.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base min-h-[44px]"
          disabled={loading}
          style={{ touchAction: "manipulation" }}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-white" />
              <span>Creating Event...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Create Event</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
