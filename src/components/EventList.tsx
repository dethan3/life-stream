import React from 'react';
import { Event } from '../lib/db';

interface EventListProps {
  events: Event[];
  groupBy: 'category' | 'date';
}

const EventList: React.FC<EventListProps> = ({ events, groupBy }) => {
  const groupedEvents = events.reduce((acc, event) => {
    const key = groupBy === 'category' ? event.category : event.date.toDateString();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div>
      {Object.entries(groupedEvents).map(([group, groupEvents]) => (
        <div key={group} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{group}</h2>
          <ul>
            {groupEvents.map((event) => (
              <li key={event.id} className="mb-2 p-2 border rounded">
                <h3>{event.title}</h3>
                <p>{event.date.toLocaleString()}</p>
                <p>{event.location}</p>
                <p>{event.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EventList;