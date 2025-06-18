
import "./Home.css"
import codeEditorPreview from "../../assets/undraw_dev-environment_n5by.svg";
import github from "../../assets/github.png";
import blob from "../../assets/Blob (3).svg";
import rightArrow from "../../assets/right-arrow.png";
function Home() {

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/github";
  }

  return (
    <div className="home-wrapper">
      <main className="flex items-center justify-center h-[80vh] w-full space-x-0">
        <div className="content-container-1 flex flex-col justify-center text-right">
          <h3 className="text-4xl font-semibold mb-4 text-left text-white site-greeting">
            Welcome to
          </h3>
          <h1 className="text-8xl font-bold mb-6 text-left site-name">
            HackArena_
          </h1>
          <p className="text-white font-normal mb-4">
            Collaborate with your team, code in real-time, and submit without
            chaos. <br />
            HackArena brings everything you need for a smooth, modern hackathon
            — all in one place.
          </p>
          <div className="landing-page-buttons-1 flex space-x-[16px]">
            <button
              className="github-btn text-white mr-4"
              onClick={handleLogin}
            >
              <img
                src={github}
                alt=""
                className="w-5 h-5 inline-block mr-[16px]"
              />
              <span>Login with GitHub</span>
            </button>
            <button className="explore-btn">
              <a href="/hackathons" className="">
                <span>Explore more Events</span>
                <img
                  src={rightArrow}
                  alt=""
                  className="w-5 h-5 inline-block ml-[16px]"
                />
              </a>
            </button>
          </div>
        </div>
        <div className="content-container-2 flex flex-col items-center justify-center">
          <img className="code-editor-preview" src={codeEditorPreview} alt="" />
          <img className="blob" src={blob} alt="" />
        </div>
      </main>
      <main className="h-[90vh] w-full mt-[20vh]"></main>
    </div>
  );
}

export default Home;

