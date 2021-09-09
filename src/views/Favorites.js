import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import MobileNavigation from "../components/MobileNavigation";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import formatDate from "../scripts/functions";

const Favorites = () => {
  const localStorageName = "paris_event_asj";
  const [eventsTab, setEventsTab] = useState(null);

  useEffect(() => {
    const getDatas = async () => {
      //setLoading(true);
      const storedList = localStorage.getItem(localStorageName);
      let storageArray = [];
      if (storedList) {
        storageArray = JSON.parse(storedList);
        console.log("storageArray", storageArray);
        try {
          const detailsData = storageArray?.map(async (id) => {
            const preFetchData = await EventService.fetchEvent(id).then(
              (response) => response
            );
            return preFetchData;
          });
          const payload = await Promise.all(detailsData);
          setEventsTab(payload);
        } catch (error) {
          console.log(error);
          //setError(error);
        }
        //return setLoading(false);
        return;
      }
    };
    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   async function getDatas() {
  //     // Get events stored in localStorage
  //     const storedList = localStorage.getItem(localStorageName);
  //     let storageArray = [];
  //     if (storedList) {
  //       storageArray = JSON.parse(storedList);
  //       console.log("storageArray", storageArray);

  //       const tab = await function get() {
  //         let copy = [];
  //         for (var i = 0; i < storageArray.length; i++) {
  //           const id = storageArray[i];
  //           EventService.fetchEvent(id).then((response) => {
  //             copy.push(response);
  //           });
  //         }
  //         return copy;
  //       };

  //       setEventsTab(tab);
  //       console.log("eventsTab", eventsTab);
  //     }
  //   }

  //   getDatas();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  console.log("eventsTab", eventsTab);

  return (
    <div>
      <Navigation />
      {!eventsTab && <Loader />}
      <main className="favorite-main">
        <h1>Mes Favoris</h1>
        {eventsTab && eventsTab.length !== 0 && (
          <div className="search-card-ctnr">
            {eventsTab.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.fields.title}
                date={formatDate(event.fields.date_start)}
                description={event.fields.lead_text}
                cover={event.fields.cover.url}
                cover_alt={event.fields.cover_alt}
              />
            ))}
          </div>
        )}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Favorites;
