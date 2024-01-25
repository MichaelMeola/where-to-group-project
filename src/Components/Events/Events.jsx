import React, { useEffect } from "react";
import axios from "axios";
import { useEventsStore } from "../../globalState.jsx";

const Events = () => {
  const { events, setEvents } = useEventsStore();

  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEvents]);

  const eventCards = events.map((event) => (
    <div key={event.id}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
    
    </div>
  ));

  return <div>{eventCards}</div>;
};

export default Events;