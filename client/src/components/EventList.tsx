import type { Event } from "../types/event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  filter: "all" | "Work" | "Personal" | "Other";
  onFilterChange: (filter: "all" | "Work" | "Personal" | "Other") => void;
  onEventDeleted: (id: string) => void;
  onEventArchived: (id: string) => void;
}

export function EventList({
  events,
  filter,
  onFilterChange,
  onEventDeleted,
  onEventArchived,
}: EventListProps) {
  const allEvents = events.length;
  const workEvents = events.filter((e) => e.category === "Work").length;
  const personalEvents = events.filter((e) => e.category === "Personal").length;
  const otherEvents = events.filter((e) => e.category === "Other").length;

  const filterOptions = [
    { value: "all" as const, label: "All Events", count: allEvents },
    { value: "Work" as const, label: "Work", count: workEvents },
    { value: "Personal" as const, label: "Personal", count: personalEvents },
    { value: "Other" as const, label: "Other", count: otherEvents },
  ];

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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Your Events</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 leading-relaxed">
          Manage and view all your scheduled events
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 mr-1 sm:mr-2 mb-1">
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="hidden sm:inline">Filter:</span>
          </div>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[40px] ${
                filter === option.value
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white/80 backdrop-blur-sm"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        {events.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3 sm:mb-4"
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
            <h3 className="text-base sm:text-lg font-medium text-slate-600 mb-1 sm:mb-2">
              No events yet
            </h3>
            <p className="text-sm sm:text-base text-slate-500">
              Create your first event to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={() => onEventDeleted(event.id)}
                onArchive={() => onEventArchived(event.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
