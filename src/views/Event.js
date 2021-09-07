import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import Parser from "html-react-parser";

const Event = (props) => {
  const id = props.location.search.replace(/\?/g, "");
  const [eventDetails, setEventDetails] = useState(null);
  const [mapsUrl, setMapsUrl] = useState(null);

  useEffect(() => {
    if (id) {
      EventService.fetchEvent(id).then((response) => {
        setEventDetails(response.fields);
        setMapsUrl(createMapsUrl(response.fields));
        console.log(response);
        console.log(process.env.REACT_APP_API_KEY);
      });
    }
  }, [id]);

  function createMapsUrl(dataset) {
    let url = `https://www.google.com/maps/embed/v1/place?key=${
      process.env.REACT_APP_API_KEY
    }&q=${dataset.address_name.replace(/ /g, "+") + ","}
    ${dataset.address_street.replace(/ /g, "+") + ","}
    ${dataset.address_zipcode.replace(/ /g, "+") + ","}
    ${dataset.address_city.replace(/ /g, "+")}`;
    return url;
  }

  return (
    <div>
      <Navigation />

      {eventDetails && (
        <main>
          <section className="introduction">
            <div>
              {eventDetails.tags?.eventDetails.tags.map((tag) => (
                <p key={tag} className="tag">
                  {tag}
                </p>
              ))}
              <h1>{eventDetails.title}</h1>
              <p>{eventDetails.date_start}</p>
              <p>{eventDetails.address_name}</p>
              <a href={eventDetails.access_link}>Visiter</a>
            </div>
            <div>
              <img src={eventDetails.cover.url} alt={eventDetails.cover_alt} />
            </div>
          </section>
          <div>
            <section className="description">
              {Parser(eventDetails.description)}
            </section>
            <section>
              <div>
                <h2>Dates</h2>
                {Parser(eventDetails.date_description)}
              </div>
              {eventDetails.price_detail && (
                <div>
                  <h2>Prix</h2>
                  <p>{eventDetails.price_detail}</p>
                </div>
              )}
              <div>
                <h2>Accessibilité</h2>
                <p>
                  {eventDetails.pmr === 0 ? "Non accessible" : "Accessible"} aux
                  PMR
                </p>
                <p>
                  {eventDetails.blind === 0 ? "Non accessible" : "Accessible"}{" "}
                  aux mal voyants
                </p>
                <p>
                  {eventDetails.deaf === 0 ? "Non accessible" : "Accessible"}{" "}
                  aux mal entendants
                </p>
              </div>
            </section>
            <section>
              <h2>Accès</h2>
              <iframe title="maps" src={mapsUrl} allowFullScreen></iframe>
              {eventDetails.transport && (
                <div>
                  {eventDetails.transport.split("\n").map((t) => (
                    <p>{t}</p>
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2>Contact</h2>
              {eventDetails.contact_facebook && (
                <a href={eventDetails.contact_facebook}>
                  {eventDetails.contact_facebook}
                </a>
              )}
              {eventDetails.contact_mail && (
                <a href={"mailto:" + eventDetails.contact_mail}>
                  {eventDetails.contact_mail}
                </a>
              )}
              {eventDetails.contact_phone && (
                <a href={"tel:" + eventDetails.contact_phone}>
                  {eventDetails.contact_phone}
                </a>
              )}
              {eventDetails.contact_twitter && (
                <a href={eventDetails.contact_twitter}>
                  {eventDetails.contact_twitter}
                </a>
              )}
              {eventDetails.contact_url && (
                <a href={eventDetails.contact_url}>
                  {eventDetails.contact_url}
                </a>
              )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default Event;
