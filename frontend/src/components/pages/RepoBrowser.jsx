import React, { useState } from "react";
import DisplayRepos from "../Test/RepoFetch";
import RepoExplorer from "./RepoExplorer";
import CodeEditor from "./CodeEditor";

export default function RepoBrowser() {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ minWidth: 300, borderRight: "1px solid #333" }}>
        <DisplayRepos
          onRepoClick={(repo) => {
            setSelectedRepo(repo);
            setSelectedFile(null);
          }}
        />
      </div>
      <div style={{ minWidth: 350, borderRight: "1px solid #333" }}>
        {selectedRepo && (
          <RepoExplorer
            owner={selectedRepo.owner.login}
            repo={selectedRepo.name}
            onFileSelect={(path) => setSelectedFile(path)}
          />
        )}
      </div>
      <div style={{ flex: 1, padding: 16 }}>
        {selectedFile ? (
          <CodeEditor
            owner={selectedRepo.owner.login}
            repo={selectedRepo.name}
            path={selectedFile}
          />
        ) : (
          <div>Select a file to view its contents.</div>
        )}
      </div>
    </div>
  );
}
