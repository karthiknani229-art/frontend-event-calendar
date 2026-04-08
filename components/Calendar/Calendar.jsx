"use client";

import { useState } from "react";
import DayCell from "./DayCell";

export default function Calendar({ start, end, setStart, setEnd }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // Generate days
  function getDays() {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(d);

    return days;
  }

  // Month navigation
  function changeMonth(dir) {
    if (dir === "next") {
      if (month === 11) {
        setMonth(0);
        setYear((y) => y + 1);
      } else {
        setMonth(month + 1);
      }
    } else {
      if (month === 0) {
        setMonth(11);
        setYear((y) => y - 1);
      } else {
        setMonth(month - 1);
      }
    }

    // reset selection on month change
    setStart(null);
    setEnd(null);
  }

  // Handle range selection
  function handleSelect(day) {
    if (!day) return;

    const date = new Date(year, month, day);

    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
    } else {
      if (date < start) {
        setStart(date);
        setEnd(start);
      } else {
        setEnd(date);
      }
    }
  }

  // Compare dates
  function isSame(a, b) {
    return (
      a &&
      b &&
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  // Check range
  function isBetween(date) {
    if (!start || !end) return false;
    return date >= start && date <= end;
  }

  const days = getDays();

  return (
    <div className="md:col-span-2">

      {/* NAV */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth("prev")}
          className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => changeMonth("next")}
          className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
        >
          →
        </button>
      </div>

      {/* WEEK LABELS */}
      <div className="grid grid-cols-7 text-xs text-gray-500 uppercase tracking-wide mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const date = day ? new Date(year, month, day) : null;

            return (
              <DayCell
                key={i}
                day={day}
                onClick={() => handleSelect(day)}
                isStart={isSame(date, start)}
                isEnd={isSame(date, end)}
                inRange={date ? isBetween(date) : false}
                month={month}   // ✅ FIX FOR TODAY
                year={year}     // ✅ FIX FOR TODAY
              />
            );
          })}
        </div>
      </div>

      {/* RANGE TEXT */}
      {start && end && (
        <p className="text-xs text-gray-600 mt-3">
          Selected: {start.toDateString()} → {end.toDateString()}
        </p>
      )}
    </div>
  );
}