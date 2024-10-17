'use client';

import { useState, useEffect } from 'react';
import EventList from '../../components/EventList';
import AddEventForm from '../../components/AddEventForm';
import { db, Event } from '../../lib/db';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [groupBy, setGroupBy] = useState<'category' | 'date'>('category');
  const [showAddForm, setShowAddForm] = useState(false);

  const loadEvents = async () => {
    const loadedEvents = await db.events.toArray();
    setEvents(loadedEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="mb-4">
        <button
          onClick={() => setGroupBy('category')}
          className={`mr-2 px-2 py-1 rounded ${groupBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Group by Category
        </button>
        <button
          onClick={() => setGroupBy('date')}
          className={`mr-2 px-2 py-1 rounded ${groupBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Group by Date
        </button>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-2 py-1 rounded bg-green-500 text-white"
        >
          {showAddForm ? 'Hide Form' : 'Add Event'}
        </button>
      </div>
      {showAddForm && <AddEventForm onEventAdded={loadEvents} />}
      <EventList events={events} groupBy={groupBy} />
    </div>
  );
}