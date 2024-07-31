import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedEvent } from "../store/eventsSlice";
import EventCard from "./EventCard";

const SelectedEvents = () => {
  const dispatch = useDispatch();
  const selectedEvents = useSelector((state) => state.events.selectedEvents);

  const handleRemove = (event) => {
    dispatch(removeSelectedEvent(event.id));
  };

  return (
    <div className="event-grid">
      {selectedEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isSelected={true}
          onClick={() => handleRemove(event)}
        />
      ))}
    </div>
  );
};

export default SelectedEvents;
