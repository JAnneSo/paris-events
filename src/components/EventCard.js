import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const EventCard = (props) => {
  const { id, title, date, description, cover, cover_alt } = props;
  return (
    <figure className="event-card" data-aos="fade-up">
      <Link
        to={{
          pathname: "/event",
          search: `${id}`
        }}
      >
        <img src={cover} alt={cover_alt} />
      </Link>

      <figcaption className="event-card__details">
        <Link to={{ pathname: "/event", search: `${id}` }}>
          <h3 className="event-card__details--title">{title}</h3>
        </Link>
        <p className="event-card__details--date">
          {date}
          <LikeButton id={id} />
        </p>
        {description && (
          <div className="event-card__details--description">{description}</div>
        )}
      </figcaption>
    </figure>
  );
};

export default EventCard;
