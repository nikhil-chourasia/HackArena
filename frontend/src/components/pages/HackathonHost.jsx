import React, { useState } from "react";
import HackathonCard from "../hackathonList/HackathonCard";

const HackathonHost = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    website: "",
    prize: "",
    contact: "",
  });
  const [hostedHackathon, setHostedHackathon] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate ID generation
    const hackathonWithId = { ...form, id: Date.now() };
    setHostedHackathon(hackathonWithId);
    setForm({
      name: "",
      date: "",
      location: "",
      description: "",
      website: "",
      prize: "",
      contact: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Host a Hackathon</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Hackathon Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="website"
          placeholder="Website (optional)"
          value={form.website}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="prize"
          placeholder="Prize (optional)"
          value={form.prize}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Email/Phone"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Host Hackathon
        </button>
      </form>
      {hostedHackathon && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Your Hosted Hackathon:</h3>
          <HackathonCard hackathon={hostedHackathon} />
        </div>
      )}
    </div>
  );
};

export default HackathonHost;
