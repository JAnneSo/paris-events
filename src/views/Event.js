import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import EventService from "../EventService";

const Event = (props) => {
  const [id, setId] = useState(props.location.search.replace(/\?/g, ""));
  const [eventDetails, setEventDetails] = useState(null);

  console.log(props.location.search.replace(/\?/g, ""));
  useEffect(() => {
    if (id) {
      EventService.fetchEvent(id).then((response) => {
        setEventDetails(response);
        console.log(response);
      });
    }
  }, [id]);
  return (
    <div>
      <Navigation />
      <h1>Evenement</h1>
    </div>
  );
};

export default Event;
