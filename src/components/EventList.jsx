import React from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const EventList = () => {
  const allEvents = useSelector((state) => state.events.allEvents);

  return (
    <div className="event-grid">
      {allEvents.map((event) => (
        <EventCard key={event.id} event={event} isSelected={false} />
      ))}
    </div>
  );
};

export default EventList;
