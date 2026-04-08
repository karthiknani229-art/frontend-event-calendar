"use client";

import { useEffect, useState } from "react";

export default function Notes({ start, end }) {
  const [notes, setNotes] = useState({});
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const key =
    start && end
      ? `${start.toDateString()}_${end.toDateString()}`
      : "";

  // LOAD notes
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "{}");
    setNotes(savedNotes);

    if (key && savedNotes[key]) {
      setNote(savedNotes[key]);
    } else {
      setNote("");
    }

    setSaved(false);
  }, [key]);

  // SAVE notes
  useEffect(() => {
    if (!key) return;

    const updated = { ...notes, [key]: note };
    localStorage.setItem("notes", JSON.stringify(updated));

    setSaved(true);

    const timer = setTimeout(() => setSaved(false), 1000);
    return () => clearTimeout(timer);
  }, [note]);

  return (
    <div className="md:col-span-1 bg-gray-50 border border-gray-200 rounded-xl p-4">
      
      <h2 className="text-sm text-gray-700 font-medium mb-1">
        Notes for selected range
      </h2>

      <p className="text-xs text-gray-500 mb-2">
        {start && end
          ? `${start.toDateString()} → ${end.toDateString()}`
          : "Select a date range to add notes"}
      </p>

      {/* SAVE INDICATOR */}
      {saved && (
        <p className="text-xs text-blue-600 mb-2">
          ✓ Saved
        </p>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write notes..."
        disabled={!key}
        className="w-full h-32 md:h-40 p-3 rounded-md text-sm bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
    </div>
  );
}