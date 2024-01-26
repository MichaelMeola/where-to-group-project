import React, { useEffect } from "react";
import axios from "axios";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { events, setEvents } = useEventsStore();
  const { profile } = useProfileStore();
  const navigate = useNavigate();
  console.log(profile);
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

  return <div style={{padding: '70px 0px 0px 0px'}}>{eventCards}</div>;
};

export default Events;
