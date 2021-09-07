import React from "react";
import { Link } from "react-router-dom";

const EventCard = (props) => {
  const { id, title, date, description, cover, cover_alt } = props;
  return (
    <div>
      <figure className="event-card">
        <Link
          to={{
            pathname: "/event",
            search: `${id}`
          }}
        >
          <img src={cover} alt={cover_alt} />
        </Link>

        <figcaption className="event-card__details">
          <p className="event-card__details--date">{date}</p>
          <Link
            to={{
              pathname: "/event",
              search: `${id}`
            }}
          >
            <h3 className="event-card__details--title">{title}</h3>
          </Link>
          {description && (
            <div className="event-card__details--description">
              {description}
            </div>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default EventCard;
