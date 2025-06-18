function Authentication() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/github";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#181818" }}>
      <div style={{ color: "white", textAlign: "center" }}>
        <h1>Login</h1>
        <button
          onClick={handleLogin}
          style={{
            background: "#24292f",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Authentication;
