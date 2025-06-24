import React, { useEffect, useState } from "react";
import "./HackathonForms.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Select,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function HackathonForms() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [readmeText, setReadmeText] = useState("");
  const [readmeMode, setReadmeMode] = useState("write");
  const [course, setCourse] = useState("");
  const [skills, setSkills] = useState([""]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) return;
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();

        const filtered = data.filter((repo) => !repo.fork && !repo.private);
        setRepos(filtered);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setRepos([]);
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <>
      <div className="form-container">
        <div className="form-content">
          <form action="">
            <Accordion aria-controls="panel1-content" id="panel1-header">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Personal Information</h1>
              </AccordionSummary>
              <AccordionDetails className="personal-info">
                <label
                  htmlFor="name"
                  style={{ gridColumn: "1 / 2", gridRow: "1 / 2" }}
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}
                />

                <label
                  htmlFor="username"
                  style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}
                >
                  Github Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  value={username}
                />

                <label
                  htmlFor="email"
                  style={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{ gridColumn: "1 / 2", gridRow: "4 / 5" }}
                />

                <label
                  htmlFor="phone"
                  style={{ gridColumn: "2 / 3", gridRow: "3 / 4" }}
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  style={{ gridColumn: "2 / 3", gridRow: "4 / 5" }}
                />

                <div
                  className="readme-editor"
                  style={{ gridColumn: "1 / 3", gridRow: "5 / 7" }}
                >
                  <h1>Tell Us about Yourself:</h1>
                  <div className="editor-tabs">
                    <button
                      onClick={() => setReadmeMode("write")}
                      className={readmeMode === "write" ? "active" : ""}
                    >
                      Write
                    </button>
                    <button
                      onClick={() => setReadmeMode("preview")}
                      className={readmeMode === "preview" ? "active" : ""}
                    >
                      Preview
                    </button>
                  </div>

                  {readmeMode === "write" ? (
                    <textarea
                      value={readmeText}
                      onChange={(e) => setReadmeText(e.target.value)}
                      placeholder="Write your README here in Markdown..."
                    />
                  ) : (
                    <div className="markdown-preview">
                      <ReactMarkdown>
                        {readmeText || "*Nothing to preview yet.*"}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion aria-controls="panel1-content" id="panel1-header">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Educational Information</h1>
              </AccordionSummary>
              <AccordionDetails className="educational-info">
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  required
                  placeholder="Enter your Institute Name"
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Enter your Course
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="Course"
                    onChange={handleChange}
                  >
                    <MenuItem value={"school"}>School</MenuItem>
                    <MenuItem value={"bachelors"}>Bachelors</MenuItem>
                    <MenuItem value={"masters"}>Masters</MenuItem>
                    <MenuItem value={"phd"}>PhD</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{
                    width: "100%",
                    gridColumn: "1 / 3",
                    gridRow: "2 / 3",
                  }}
                >
                  <DatePicker
                    views={["year", "month"]}
                    label="Course Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => (
                      <input {...params} placeholder="Start" />
                    )}
                  />

                  <DatePicker
                    views={["year", "month"]}
                    label="Course End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => (
                      <input {...params} placeholder="End" />
                    )}
                  />
                </LocalizationProvider>
                <label
                  style={{
                    marginLeft: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    gridColumn: "1 / 3",
                    gridRow: "3 / 4",
                  }}
                >
                  <input
                    type="checkbox"
                    name="currentlyStudying"
                    className="checkBox"
                  />
                  I am currently studying in this Institute
                </label>
              </AccordionDetails>
            </Accordion>
            <Accordion aria-controls="panel1-content" id="panel1-header">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Your Experiences and Skills</h1>
              </AccordionSummary>
              <AccordionDetails className="experiences-skills">
                <div className="skills-section">
                  <div className="skills-header">
                    <h1>List Your 7 Skills Below</h1>
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="add-skill-btn"
                    >
                      <img src="../src/assets/add.svg" alt="" />
                      Add Skill
                    </button>
                  </div>
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-input-wrapper">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                        placeholder={`Skill #${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <img src="../src/assets/delete.svg" alt="" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="portfolio-section">
                  <h1>You can provide your Portfolio Link here (Optional)</h1>
                  <input
                    type="text"
                    placeholder="Enter Portfolio Link"
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion aria-controls="panel1-content" id="panel1-header">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Create or Join Team</h1>
              </AccordionSummary>
              <AccordionDetails className="teaming">
                <button className="create-team-btn">Create Team</button>
                <button className="join-team-btn">Join Team</button>
                <h1>Select your Repository for this Hackathon</h1>
                <FormControl fullWidth className="repo-select">
                  <InputLabel id="repo-select-label">
                    Select Repository
                  </InputLabel>
                  <Select
                    labelId="repo-select-label"
                    id="repo-select"
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                  >
                    {repos.map((repo) => (
                      <MenuItem key={repo.id} value={repo.name}>
                        {repo.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </form>
        </div>
        <div className="form-sidebar">
          <h1>Hackathon Name</h1>
          <p>
            A placeholder for time left in the hackathon, e.g., "Time Left: 2
            days, 3 hours"
          </p>
          <p>
            A small chip for how many team members are required
          </p>
          <button className="submit-application-btn" form="hackathon-form" type="submit">Submit Application</button>
        </div>
      </div>
    </>
  );
}

export default HackathonForms;
