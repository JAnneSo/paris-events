import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Navigation from "../components/Navigation";
import EventService from "../EventService";

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
    <div className="home">
      <Navigation />
      <main>
        <h1>Accueil</h1>

        {lastEventData && (
          <section className="last-event-section">
            <h2>Derniers évènements</h2>
            <div className="event-grid">
              {lastEventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={event.record.fields.date_start}
                  cover={event.record.fields.cover.url}
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
                  date={event.record.fields.date_start}
                  cover={event.record.fields.cover.url}
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
                  date={event.record.fields.date_start}
                  cover={event.record.fields.cover.url}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
