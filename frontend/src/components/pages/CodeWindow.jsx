import React from "react";
import RepoExplorer from "./RepoExplorer";
import CodeEditor from "./CodeEditor";
import "./CodeWindow.css";
import Navbar from "./Navbar";

function CodeWindow() {
  const [selectedfilePath, setselectedfilePath] = React.useState("README.md");
  return (
    <>
      <Navbar />
      <main className="flex justify-between h-[100vh] w-full">
        <RepoExplorer onFileSelect={(path) => setselectedfilePath(path)} />
        <CodeEditor path={selectedfilePath} />
      </main>
    </>
  );
}

export default CodeWindow;
