import React, { useState } from "react";
import HackathonCard from "../hackathonList/HackathonCard";

const initalForm = {
  //basic information

  title: " ",
  tagline: "",
  description: "",
  hackathonType: "",
  coverImage: null,

  // Timeline

  startDate: "",
  endDate: "",
  registrationDeadline: "",

  //Team & participants

  participationType: "Individual",
  maxTeamSize: "",
  minTeamSize: "",
  participantLimit: "",

  // Organizer

  OrganizerName: "",
  contactEmail: "",
  phoneNumber: "",
  website: "",

  //Sponsorship & Rewards

  prizeInfo: "",
  sponsors: "",
  registrationFee: "",

  //Judging

  judgingMethod: "",
  judgingCriteria: "",
  judges: "",

  //Extra

  problemStatement: null,
  submissionFormat: "",
  allowPublicVoting: false,
  liveChat: false,
  visibility: "public",
};

const HackathonHost = () => {
  const [form, setForm] = useState(initalForm);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleConfirm = () => {
    setShowPreview(false);
    alert("Hackathon hosted successfully!");
    setForm(initalForm);
  };

  return (
    <div>
      <h2>Host a Hackathon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Basic Info</h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tagline"
            placeholder="Title"
            value={form.tagline}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description, rules, theme , etc."
            value={form.description}
            onChange={handleChange}
            required
          />
          <select
            name="hackathonType"
            value={form.hackathonType}
            onChange={handleChange}
          >
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onCanPlay={handleChange}
          />
        </div>

        <div>
          <h3>Timeline</h3>
          <input
            type="datetime-local"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="endDate"
            value={form.endDateDate}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="registrationDeadline"
            value={form.registrationDeadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <h3>Team & Participants</h3>
          <div>
            <label>
              <input
                type="radio"
                name="participationType"
                value="Individual"
                checked={form.participationType === "Individual"}
                onChange={handleChange}
              />{" "}
              Individual
            </label>
            <label>
              <input
                type="radio"
                name="participationType"
                value="Team"
                checked={form.participationType === "Team"}
                onChange={handleChange}
              />{" "}
              Individual
            </label>
          </div>
          <input
            type="number"
            name="maxTeamSize"
            placeholder="Max Team Size"
            value={form.maxTeamSize}
            onChange={handleChange}
          />
          <input
            type="number"
            name="minTeamSize"
            placeholder="Min Team Size"
            value={form.minTeamSize}
            onChange={handleChange}
          />
          <input
            type="number"
            name="participantLimit"
            placeholder="Participant Limit"
            value={form.participantLimit}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Orgasizer</h3>

          <input
            type="text"
            name="organizerName"
            placeholder="Organizer Name"
            value={form.OrganizerName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact email"
            value={form.contactEmail}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="website"
            name="website"
            placeholder="website / Social media "
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Sponsorship & Rewards</h3>

          <textarea
            name="prizeInfo"
            placeholder="prize info"
            value={form.prizeInfo}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            name="sponsors"
            placeholder="Sponsors (name or link )"
            value={form.sponsors}
            onChange={handleChange}
          />
          <input
            type="number"
            name="registrationFee"
            placeholder="Registration fee"
            value={form.registrationFee}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Judging</h3>
          <div>
            <label>
              <input
                type="radio"
                name="judgingMethod"
                value="Manual"
                checked={form.judgingMethod === "Manual"}
                onChange={handleChange}
              />{" "}
              Manual
            </label>

            <label>
              <input
                type="radio"
                name="judgingMethod"
                value="Auto"
                checked={form.judgingMethod === "Auto"}
                onChange={handleChange}
              />{" "}
              Auto
            </label>

            <label>
              <input
                type="radio"
                name="judgingMethod"
                value="Public voting"
                checked={form.judgingMethod === "Public voting"}
                onChange={handleChange}
              />{" "}
              Public voting
            </label>
          </div>

          <textarea
            name="judgingCriteria"
            placeholder="judging Criteria"
            value={form.judgingCriteria}
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            type="text"
            name="judges"
            placeholder="judges (optional)"
            value={form.judges}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <h3>Extra Setting</h3>

          <input
            type="file"
            name="problemStatement"
            accept=".pdf, .doc"
            onChange={handleSubmit}
          />
          <input
            type="text"
            name="submissionFormat"
            placeholder="Submission formate (eg, Github link, pdf, video)"
            value={form.submissionFormat}
            onChange={handleSubmit}
          />

          <div>
            <label> Allow public voting </label>
            <input
              type="checkbox"
              name="allowPublicVoting"
              checked={form.allowPublicVoting}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Live Chat / Q & A Enabled</label>
            <input
              type="checkbox"
              name="liveChat"
              checked={form.liveChat}
              onChange={handleChange}
            />
          </div>

          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
          >
            <option> Public </option>
            <option> Private </option>
          </select>
        </div>

        {/* Final Step */}
        <button type="submit">Create hackathon</button>
      </form>

      {showPreview && (
        <div>
          <div>
            <h3>Preview Hackathon</h3>
            <pre>{JSON.stringify(form, null, 2)}</pre>
            <div>
              <button onClick={() => setShowPreview(false)}>Edit</button>
              <button onClick={handleConfirm}>Confirm and Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonHost;
