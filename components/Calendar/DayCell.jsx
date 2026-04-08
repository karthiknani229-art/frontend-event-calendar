export default function DayCell({
  day,
  onClick,
  isStart,
  isEnd,
  inRange,
  month,
  year,
}) {
  const today = new Date();

  const isToday =
    day &&
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  return (
    <div
      onClick={onClick}
      className={`
        relative h-12 flex items-center justify-center text-sm font-medium
        border border-gray-300 transition-all duration-150

        ${!day ? "bg-transparent border-none" : "cursor-pointer"}

        ${isStart ? "bg-blue-800 text-white rounded-l-xl shadow-sm" : ""}
        ${isEnd ? "bg-blue-800 text-white rounded-r-xl shadow-sm" : ""}

        ${inRange && !isStart && !isEnd ? "bg-blue-300 text-blue-900" : ""}

        ${
          !isStart && !isEnd && !inRange
            ? "hover:bg-gray-100 hover:scale-[1.03] text-gray-900"
            : ""
        }
      `}
    >
      {/* TODAY DOT */}
      {isToday && !isStart && !isEnd && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
      )}

      {/* DAY NUMBER */}
      <span
        className={`${
          isToday && !isStart && !isEnd
            ? "font-bold text-blue-700"
            : ""
        }`}
      >
        {day}
      </span>
    </div>
  );
}