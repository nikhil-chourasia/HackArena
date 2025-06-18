function Authentication() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/github";
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}

export default Authentication;
