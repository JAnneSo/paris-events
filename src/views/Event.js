import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import EventService from "../EventService";
import Parser from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
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
import LikeButton from "../components/LikeButton";
import formatDate from "../scripts/functions";

library.add(fab);

const Event = (props) => {
  const id = props.location.search.replace(/\?/g, "");
  const [eventDetails, setEventDetails] = useState(null);
  const [mapsUrl, setMapsUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    if (id) {
      EventService.fetchEvent(id).then((response) => {
        if (response.message) {
          if (response.message.includes("Request failed")) {
            setErrorMsg(true);
          }
        } else {
          setEventDetails(response.fields);
          setMapsUrl(createMapsUrl(response.fields));
          setErrorMsg(false);
        }
      });
    }
  }, [id]);

  function createMapsUrl(dataset) {
    let url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNRhySENGiqlfdPxPP4A5JZyIvq4cxCGc&q=${
      dataset.address_name && dataset.address_name.replace(/ /g, "+") + ","
    }
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
      {!eventDetails && !errorMsg && <Loader />}
      {eventDetails && (
        <main className="main-event">
          <div className="bg-introduction">
            <section className="introduction">
              <div className="cover" data-aos="fade-up">
                <img
                  src={eventDetails.cover.url}
                  alt={eventDetails.cover_alt}
                />
              </div>
              <div className="introduction-info-ctnr" data-aos="fade-up">
                <h1>{eventDetails.title}</h1>

                <p className="date">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {formatDate(eventDetails.date_start)}
                </p>
                <p className="address">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {eventDetails.address_name}
                </p>
                <div className="cta-ctnr">
                  <a
                    href={eventDetails.access_link}
                    target="_blank"
                    rel="noreferrer"
                    className="colored-btn"
                  >
                    Visiter le site web
                  </a>
                  <LikeButton id={id} />
                </div>
              </div>
            </section>
          </div>
          <div className="content" data-aos="fade-up">
            <section className="description">
              {eventDetails.tags && eventDetails.tags.length !== 0 && (
                <div className="tags-ctnr">
                  {eventDetails.tags.map((tag) => (
                    <p key={tag} className="tag">
                      {tag}
                    </p>
                  ))}
                </div>
              )}
              {Parser(eventDetails.description)}
              <div className="access-section">
                <h2>Accès</h2>
                <p className="address">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {eventDetails.address_name &&
                    eventDetails.address_name + ", "}
                  {eventDetails.address_street &&
                    eventDetails.address_street + " "}
                  {eventDetails.address_zipcode &&
                    eventDetails.address_zipcode + " "}
                  {eventDetails.address_city && eventDetails.address_city}
                </p>
                {eventDetails.transport && (
                  <div>
                    <h3>Transport</h3>
                    {eventDetails.transport.split("\n").map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                )}
                <iframe title="maps" src={mapsUrl} allowFullScreen></iframe>
              </div>
            </section>
            <section className="main-info-section">
              <div className="card">
                <h2>Dates</h2>
                <p>{Parser(eventDetails.date_description)}</p>
              </div>
              {eventDetails.price_detail && (
                <div className="card">
                  <h2>Prix</h2>
                  <p>{eventDetails.price_detail}</p>
                </div>
              )}
              <div className="card accessibilite">
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
              {(eventDetails.contact_facebook ||
                eventDetails.contact_mail ||
                eventDetails.contact_phone ||
                eventDetails.contact_twitter ||
                eventDetails.contact_url) && (
                <div className=" card contact-section">
                  <h2>Contact</h2>
                  {eventDetails.contact_facebook && (
                    <a
                      href={eventDetails.contact_facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={["fab", "facebook"]} />
                      {eventDetails.contact_facebook}
                    </a>
                  )}
                  {eventDetails.contact_mail && (
                    <a
                      href={"mailto:" + eventDetails.contact_mail}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      {eventDetails.contact_mail}
                    </a>
                  )}
                  {eventDetails.contact_phone && (
                    <a
                      href={"tel:" + eventDetails.contact_phone}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faPhoneAlt} />
                      {eventDetails.contact_phone}
                    </a>
                  )}
                  {eventDetails.contact_twitter && (
                    <a
                      href={eventDetails.contact_twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={["fab", "twitter"]} />
                      {eventDetails.contact_twitter}
                    </a>
                  )}
                  {eventDetails.contact_url && (
                    <a
                      href={eventDetails.contact_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faGlobeEurope} />
                      {eventDetails.contact_url}
                    </a>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      )}
      {errorMsg && (
        <main>
          <h1>Oups, cet évènement n'est plus disponible</h1>
        </main>
      )}
      <MobileNavigation />
    </div>
  );
};

export default Event;
