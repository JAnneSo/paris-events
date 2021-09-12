import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import MobileNavigation from "../components/MobileNavigation";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import formatDate from "../scripts/functions";
import StorageService from "../StorageService";

const Favorites = () => {
  const [eventsTab, setEventsTab] = useState(null);
  // Get events stored in localStorage
  let storageArray = StorageService.getLocalStorage();

  function fetchProfileData() {
    return Promise.all(
      storageArray.map((myId) =>
        EventService.fetchEvent(myId).then((response) => response)
      )
    ).then((tableau) => {
      return tableau;
    });
  }

  useEffect(() => {
    if (storageArray) {
      const promise = fetchProfileData();
      promise.then((data) => {
        setEventsTab(data);
      });
    } else {
      setEventsTab([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("eventsTab", eventsTab);

  return (
    <div>
      <Navigation />
      {!eventsTab && <Loader />}
      <main className="favorite-main">
        <h1>Mes Favoris</h1>
        {eventsTab && eventsTab.length === 0 && (
          <h3>Vous n'avez aucun favori</h3>
        )}
        {eventsTab && eventsTab.length !== 0 && (
          <div className="search-card-ctnr">
            {eventsTab.map((event) =>
              event ? (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.fields.title}
                  date={formatDate(event.fields.date_start)}
                  description={event.fields.lead_text}
                  cover={event.fields.cover.url}
                  cover_alt={event.fields.cover_alt}
                />
              ) : (
                ""
              )
            )}
          </div>
        )}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Favorites;
