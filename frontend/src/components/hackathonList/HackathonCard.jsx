import React from "react";
import { Link } from "react-router-dom";

const HackathonCard = ({ hackathon }) => (
  <div className="hackathon-card">
    {/* Cover Image */}
    {hackathon.coverImage && (
      <img
        src={
          typeof hackathon.coverImage === "string"
            ? hackathon.coverImage
            : URL.createObjectURL(hackathon.coverImage)
        }
        alt={hackathon.title}
        className="hackathon-cover"
        style={{
          width: "100%",
          maxHeight: 180,
          objectFit: "cover",
        }}
      />
    )}

    <h3>{hackathon.title}</h3>
    {hackathon.tagline && <p className="tagline">{hackathon.tagline}</p>}

    <p>
      <strong>Type:</strong> {hackathon.hackathonType}
    </p>
    <p>
      <strong>Start:</strong>{" "}
      {hackathon.startDate
        ? new Date(hackathon.startDate).toLocaleString()
        : "TBA"}
    </p>
    <p>
      <strong>End:</strong>{" "}
      {hackathon.endDate ? new Date(hackathon.endDate).toLocaleString() : "TBA"}
    </p>
    <p>
      <strong>Registration Deadline:</strong>{" "}
      {hackathon.registrationDeadline
        ? new Date(hackathon.registrationDeadline).toLocaleString()
        : "TBA"}
    </p>
    <p>
      <strong>Organizer:</strong> {hackathon.OrganizerName}
    </p>
    <p>
      <strong>Location:</strong>{" "}
      {hackathon.hackathonType === "Offline" && hackathon.location
        ? hackathon.location
        : hackathon.hackathonType}
    </p>
    <p>
      <strong>Participation:</strong> {hackathon.participationType}
      {hackathon.participationType === "Team" &&
        ` (Team size: ${hackathon.minTeamSize || 1}-${
          hackathon.maxTeamSize || "N/A"
        })`}
    </p>
    <p>
      <strong>Participants Limit:</strong>{" "}
      {hackathon.participantLimit || "Unlimited"}
    </p>
    <p>
      <strong>Prize:</strong> {hackathon.prizeInfo}
    </p>
    <p>
      <strong>Sponsors:</strong> {hackathon.sponsors}
    </p>
    <p>
      <strong>Fee:</strong>{" "}
      {hackathon.registrationFee ? `₹${hackathon.registrationFee}` : "Free"}
    </p>
    <p>
      <strong>Judging:</strong> {hackathon.judgingMethod}
    </p>
    <p>
      <strong>Description:</strong> {hackathon.description}
    </p>
    <Link to={`/hackathons/${hackathon.id}`} className="btn">
      View Details
    </Link>
  </div>
);

export default HackathonCard;
