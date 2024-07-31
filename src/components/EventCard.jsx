import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedEvent, removeSelectedEvent } from "../store/eventsSlice";

const EventCard = ({ event, isSelected }) => {
  const dispatch = useDispatch();
  const selectedEvents = useSelector((state) => state.events.selectedEvents);
  const [showConflictPopup, setShowConflictPopup] = useState(false);

  const handleSelect = () => {
    if (isSelected) {
      dispatch(removeSelectedEvent(event.id));
    } else {
      const isConflicting = selectedEvents.some(
        (selectedEvent) =>
          new Date(selectedEvent.start_time) < new Date(event.end_time) &&
          new Date(selectedEvent.end_time) > new Date(event.start_time)
      );

      if (isConflicting) {
        setShowConflictPopup(true);
      } else if (selectedEvents.length < 3) {
        dispatch(addSelectedEvent(event));
      }
    }
  };

  const handleClosePopup = () => {
    setShowConflictPopup(false);
  };

  return (
    <div>
      <div className={`event-card ${isSelected ? "selected" : ""}`}>
        <h3>{event.event_name}</h3>
        <p>{event.event_category}</p>
        <p>
          {new Date(event.start_time).toLocaleTimeString()} -{" "}
          {new Date(event.end_time).toLocaleTimeString()}
        </p>
        <button onClick={handleSelect}>
          {isSelected ? "Deselect" : "Select"}
        </button>
      </div>

      {showConflictPopup && (
        <div className="conflict-popup">
          <div className="popup-content">
            <h4>Conflict Detected</h4>
            <p>This event conflicts with an already selected event.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
