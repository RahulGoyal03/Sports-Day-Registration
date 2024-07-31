import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "./store/eventsSlice";
import EventList from "./components/EventList";
import SelectedEvents from "./components/SelectedEvents";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const selectedEventsCount = useSelector(
    (state) => state.events.selectedEvents.length
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllEvents());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Sports Day Registration</h1>
      <div className="event-container">
        <div className="column">
          <h2>All Events</h2>
          <EventList />
        </div>
        <div className="separator"></div>

        <div className="column">
          <h2>Selected Events ({selectedEventsCount}/3)</h2>
          <SelectedEvents />
        </div>
      </div>
    </div>
  );
}

export default App;
