"use client";

import { useState } from "react";
import Calendar from "@/components/Calendar/Calendar";
import Notes from "@/components/Notes/Notes";

export default function Home() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* HERO */}
        <div className="relative h-52">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/60" />
          <div className="absolute bottom-4 left-5 text-white">
            <h1 className="text-xl font-semibold">Monthly Planner</h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          <Notes start={start} end={end} />
          <Calendar
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
        </div>

      </div>
    </main>
  );
}