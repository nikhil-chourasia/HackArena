import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Octokit } from "@octokit/rest";

function detectLanguage(filename) {
  const ext = filename.split('.').pop();

  const extensionMap = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    php: "php",
    go: "go",
    sh: "shell",
    yml: "yaml",
    yaml: "yaml",
    txt: "plaintext"
  };

  return extensionMap[ext] || "plaintext";
}

function CodeEditor() {
  const [code, setCode] = useState("// Loading...");
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("plaintext");

  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN
  });

  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      try {
        const filePath = "frontend/src/components/pages/Home.jsx";

        const res = await octokit.repos.getContent({
          owner: "nikhil-chourasia",
          repo: "HackArena",
          path: filePath,
          ref: "main",
        });

        if (Array.isArray(res.data)) {
          setCode("// This is a directory, not a file.");
          setLanguage("plaintext");
        } else if (res.data.encoding !== "base64") {
          setCode("// Unexpected file encoding: " + res.data.encoding);
          setLanguage("plaintext");
        } else {
          const fileContent = atob(res.data.content);
          setCode(fileContent);
          setLanguage(detectLanguage(res.data.name));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching file content:", error);
        setCode("// Error loading file content.");
        setLanguage("plaintext");
        setLoading(false);
      }
    };

    fetchCode();
  }, []);

  return (
    <div className="w-full h-[100vh] border-2 border-gray-500 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={loading ? "// Loading..." : code}
        theme="vs-dark"
        options={{ readOnly: true }}
      />
    </div>
  );
}

export default CodeEditor;
