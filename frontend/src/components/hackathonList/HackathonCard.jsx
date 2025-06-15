import React from "react";
import { Link } from "react-router-dom";

const HackathonCard = ({ hackathon }) => (
  <div className="hackathon-card">
    <h3>{hackathon.name}</h3>
    <p>
      <strong>Date:</strong> {hackathon.date}
    </p>
    <p>
      <strong>Location:</strong> {hackathon.location}
    </p>
    <p>{hackathon.description}</p>
    <Link to={`/hackathons/${hackathon.id}`} className="btn">
      View Details
    </Link>
  </div>
);

export default HackathonCard;
