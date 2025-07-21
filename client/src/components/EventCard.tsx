import type { Event } from "../types/event";

interface EventCardProps {
  event: Event;
  onDelete: () => void;
  onArchive: () => void;
}

export function EventCard({ event, onDelete, onArchive }: EventCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Work":
        return (
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6"
            />
          </svg>
        );
      case "Personal":
        return (
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      default:
        return (
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
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
        );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Personal":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(Number.parseInt(hours), Number.parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div
      className={`rounded-xl border p-3 sm:p-4 transition-all duration-200 hover:shadow-lg transform hover:scale-[1.01] sm:hover:scale-[1.02] ${
        event.archived
          ? "bg-slate-50/80 border-slate-200 opacity-75"
          : "bg-white/80 border-slate-200 hover:border-slate-300 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center gap-2 mb-2 flex-wrap">
            <h3
              className={`font-semibold text-base sm:text-lg truncate ${
                event.archived ? "text-slate-500" : "text-slate-800"
              }`}
            >
              {event.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                  event.category
                )}`}
              >
                {getCategoryIcon(event.category)}
                <span>{event.category}</span>
              </span>
              {event.archived && (
                <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
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
                      d="M5 8l4 4 4-4m0 0V4a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4z"
                    />
                  </svg>
                  <span>Archived</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
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
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1">
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
              <span>{formatTime(event.time)}</span>
            </div>
          </div>

          {event.notes && (
            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0"
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
              <p className="line-clamp-2 leading-relaxed">{event.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0">
          {!event.archived && (
            <button
              onClick={onArchive}
              className="p-2 sm:p-2.5 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 active:scale-95 min-h-[36px] sm:min-h-[40px] min-w-[36px] sm:min-w-[40px]"
              title="Archive Event"
              aria-label="Archive Event"
              style={{ touchAction: "manipulation" }}
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8l4 4 4-4m0 0V4a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4z"
                />
              </svg>
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 sm:p-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 active:scale-95 min-h-[36px] sm:min-h-[40px] min-w-[36px] sm:min-w-[40px]"
            title="Delete Event"
            aria-label="Delete Event"
            style={{ touchAction: "manipulation" }}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
