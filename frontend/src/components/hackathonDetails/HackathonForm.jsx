import React, { useState } from "react";

const HackathonForm = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send form data to your backend API
    alert("Hackathon hosted!\n" + JSON.stringify(form, null, 2));
    setForm({ name: "", date: "", description: "", location: "" });
  };

  return (
    <div className="hackathon-form-container">
      <h2>Host a Hackathon</h2>
      <form onSubmit={handleSubmit} className="hackathon-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Host Hackathon</button>
      </form>
    </div>
  );
};

export default HackathonForm;
