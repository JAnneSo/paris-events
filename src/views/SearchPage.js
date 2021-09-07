import React, { useEffect, useRef, useState } from "react";
import EventCard from "../components/EventCard";
import Navigation from "../components/Navigation";
import EventService from "../EventService";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState(null);
  const [eventData, setEventData] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (inputValue) {
      EventService.fetchResult(inputValue).then((response) => {
        console.log(response);
        setEventData(response);
      });
    }
  }, [inputValue]);

  function searchInput() {
    setInputValue(inputRef.current.value);
  }
  return (
    <div>
      <Navigation />
      <main>
        <h1>Rechercher un évènement</h1>
        <div className="input-ctnr">
          <input
            type="text"
            ref={inputRef}
            placeholder="One man show, danse, théâtre, concert..."
          />
          <button onClick={searchInput}>Rechercher</button>
        </div>
        {eventData && (
          <div>
            <h2>Résultats de la recherche</h2>
            <div className="search-card-ctnr">
              {eventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={event.record.fields.date_start}
                  description={event.record.fields.lead_text}
                  cover={event.record.fields.cover.url}
                  cover_alt={event.record.fields.cover_alt}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
