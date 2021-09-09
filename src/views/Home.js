import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import MobileNavigation from "../components/MobileNavigation";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import formatDate from "../scripts/functions";

const Home = () => {
  const [lastEventData, setLastEventData] = useState(null);
  const [freeEventData, setFreeEventData] = useState(null);
  const [pmrEventData, setPmrEventData] = useState(null);

  useEffect(() => {
    EventService.fetchLastUpdatedEvents().then((response) =>
      setLastEventData(response)
    );
    EventService.fetchByCriterion("price_type", "gratuit").then((response) =>
      setFreeEventData(response)
    );
    EventService.fetchByCriterion("pmr", "1").then((response) =>
      setPmrEventData(response)
    );
  }, []);

  return (
    <div>
      <Navigation />
      {!lastEventData && !freeEventData && !pmrEventData && <Loader />}
      <main className="home-main">
        <section className="banner">
          <div className="banner-text">
            <h1>Que faire à Paris ?</h1>
            <p>
              L'application qui permet de rechercher en direct les prochains
              évènements Parisiens.
            </p>
          </div>
          <div className="banner__img-ctnr">
            <img src="/assets/eiffel-tour.jpg" alt="paris" />
          </div>
        </section>

        {lastEventData && (
          <section className="last-event-section">
            <h2>Derniers évènements</h2>
            <div className="event-grid">
              {lastEventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={formatDate(event.record.fields.date_start)}
                  cover={event.record.fields.cover.url}
                  cover_alt={event.record.fields.cover_alt}
                />
              ))}
            </div>
          </section>
        )}
        {freeEventData && (
          <section className="free-event-section">
            <h2>Évènements gratuits</h2>
            <div className="event-grid">
              {freeEventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={formatDate(event.record.fields.date_start)}
                  cover={event.record.fields.cover.url}
                  cover_alt={event.record.fields.cover_alt}
                />
              ))}
            </div>
          </section>
        )}
        {pmrEventData && (
          <section className="pmr-event-section">
            <h2>Évènements accessibles aux PMR</h2>
            <div className="event-grid">
              {pmrEventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={formatDate(event.record.fields.date_start)}
                  cover={event.record.fields.cover.url}
                  cover_alt={event.record.fields.cover_alt}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Home;
