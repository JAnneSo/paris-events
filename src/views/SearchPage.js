import React, { useEffect, useRef, useState } from "react";
import EventCard from "../components/EventCard";
import MobileNavigation from "../components/MobileNavigation";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import formatDate from "../scripts/functions";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [noResultMessage, setNoResultMessage] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    document.getElementById("searchInput").focus();
  }, []);
  useEffect(() => {
    if (inputValue) {
      EventService.fetchResult(inputValue).then((response) => {
        if (response.length === 0) {
          setNoResultMessage("Aucun résultats...");
          setEventData(null);
        } else {
          setEventData(response);
          setNoResultMessage(null);
        }
      });
    }
  }, [inputValue]);

  function searchInput() {
    setInputValue(inputRef.current.value);
  }
  function onKeyDown(event) {
    if (event.keyCode === 13) {
      setInputValue(inputRef.current.value);
    }
  }
  return (
    <div>
      <Navigation />
      <main className="search-main">
        <h1>Rechercher un évènement</h1>
        <div className="input-ctnr">
          <input
            id="searchInput"
            type="text"
            ref={inputRef}
            placeholder="One man show, danse, théâtre, concert..."
            onKeyDown={onKeyDown}
          />
          <button onClick={searchInput}>Rechercher</button>
        </div>
        {noResultMessage && <h2 data-aos="fade-up">{noResultMessage}</h2>}
        {eventData && eventData.length !== 0 && (
          <div>
            <h2>Résultats de la recherche</h2>
            <div className="search-card-ctnr">
              {eventData.map((event) => (
                <EventCard
                  key={event.record.id}
                  id={event.record.id}
                  title={event.record.fields.title}
                  date={formatDate(event.record.fields.date_start)}
                  description={event.record.fields.lead_text}
                  cover={event.record.fields.cover.url}
                  cover_alt={event.record.fields.cover_alt}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default SearchPage;
