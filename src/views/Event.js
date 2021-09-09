import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import Parser from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkedAlt,
  faLowVision,
  faBlind,
  faWheelchair,
  faEnvelope,
  faGlobeEurope,
  faPhoneAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Loader from "../components/Loader";
import MobileNavigation from "../components/MobileNavigation";

library.add(fab);

const Event = (props) => {
  const id = props.location.search.replace(/\?/g, "");
  const [eventDetails, setEventDetails] = useState(null);
  const [mapsUrl, setMapsUrl] = useState(null);

  useEffect(() => {
    if (id) {
      EventService.fetchEvent(id).then((response) => {
        setEventDetails(response.fields);
        setMapsUrl(createMapsUrl(response.fields));
      });
    }
  }, [id]);

  function createMapsUrl(dataset) {
    let url = `https://www.google.com/maps/embed/v1/place?key=
      ${process.env.REACT_APP_API_KEY}
    &q=${dataset.address_name && dataset.address_name.replace(/ /g, "+") + ","}
    ${dataset.address_street && dataset.address_street.replace(/ /g, "+") + ","}
    ${
      dataset.address_zipcode &&
      dataset.address_zipcode.replace(/ /g, "+") + ","
    }
    ${dataset.address_city && dataset.address_city.replace(/ /g, "+")}${
      dataset.lat_lon &&
      "&center=" + dataset.lat_lon.lat + "," + dataset.lat_lon.lon
    }`;
    return url;
  }

  return (
    <div>
      <Navigation />
      {!eventDetails && <Loader />}
      {eventDetails && (
        <main className="main-event">
          <div className="bg-introduction">
            <section className="introduction">
              <div className="cover">
                <img
                  src={eventDetails.cover.url}
                  alt={eventDetails.cover_alt}
                />
              </div>
              <div className="introduction-info-ctnr">
                {eventDetails.tags && eventDetails.tags.length !== 0 && (
                  <div>
                    {eventDetails.tags.map((tag) => (
                      <p key={tag} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
                )}
                <h1>{eventDetails.title}</h1>
                <p>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {eventDetails.date_start}
                </p>
                <p>
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                  {eventDetails.address_name}
                </p>
                <a href={eventDetails.access_link}>Visiter</a>
              </div>
            </section>
          </div>
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
                  <FontAwesomeIcon icon={faWheelchair} />
                  {eventDetails.pmr === 0 ? "Non accessible" : "Accessible"} aux
                  PMR
                </p>
                <p>
                  <FontAwesomeIcon icon={faBlind} />
                  {eventDetails.blind === 0
                    ? "Non accessible"
                    : "Accessible"}{" "}
                  aux mal voyants
                </p>
                <p>
                  <FontAwesomeIcon icon={faLowVision} />
                  {eventDetails.deaf === 0
                    ? "Non accessible"
                    : "Accessible"}{" "}
                  aux mal entendants
                </p>
              </div>
            </section>
            <section>
              <h2>Accès</h2>
              <p>
                {eventDetails.address_name && eventDetails.address_name + ", "}
                {eventDetails.address_street &&
                  eventDetails.address_street + " "}
                {eventDetails.address_zipcode &&
                  eventDetails.address_zipcode + " "}
                {eventDetails.address_city && eventDetails.address_city}
              </p>
              <iframe title="maps" src={mapsUrl} allowFullScreen></iframe>

              {eventDetails.transport && (
                <div>
                  {eventDetails.transport.split("\n").map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2>Contact</h2>
              {eventDetails.contact_facebook && (
                <a href={eventDetails.contact_facebook}>
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                  {eventDetails.contact_facebook}
                </a>
              )}
              {eventDetails.contact_mail && (
                <a href={"mailto:" + eventDetails.contact_mail}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  {eventDetails.contact_mail}
                </a>
              )}
              {eventDetails.contact_phone && (
                <a href={"tel:" + eventDetails.contact_phone}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  {eventDetails.contact_phone}
                </a>
              )}
              {eventDetails.contact_twitter && (
                <a href={eventDetails.contact_twitter}>
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                  {eventDetails.contact_twitter}
                </a>
              )}
              {eventDetails.contact_url && (
                <a href={eventDetails.contact_url}>
                  <FontAwesomeIcon icon={faGlobeEurope} />
                  {eventDetails.contact_url}
                </a>
              )}
            </section>
          </div>
        </main>
      )}
      <MobileNavigation />
    </div>
  );
};

export default Event;
