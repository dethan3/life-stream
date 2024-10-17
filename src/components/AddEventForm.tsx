import React, { useState } from 'react';
import { db, Event } from '../lib/db';

interface AddEventFormProps {
  onEventAdded: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onEventAdded }) => {
  const [event, setEvent] = useState<Omit<Event, 'id'>>({
    type: '',
    title: '',
    date: new Date(),
    location: '',
    notes: '',
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.events.add(event);
    onEventAdded();
    setEvent({ type: '', title: '', date: new Date(), location: '', notes: '', category: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: name === 'date' ? new Date(value) : value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={event.title}
          onChange={handleChange}
          required
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="type" className="block mb-1">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          value={event.type}
          onChange={handleChange}
          required
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block mb-1">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={event.date.toISOString().split('T')[0]}
          onChange={handleChange}
          required
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={event.category}
          onChange={handleChange}
          required
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={event.location}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block mb-1">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={event.notes}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Event
      </button>
    </form>
  );
};

export default AddEventForm;