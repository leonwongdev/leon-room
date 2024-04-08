import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import youtubeNoteTakingAppThumbnail from "./assets/img/youtube-note-taking.png";
import hackathonTeamBuilderThumbnail from "./assets/img/hacthon-team-builder.jpeg";
import chromeExtensionThumbnail from "./assets/img/chrome-extension.jpeg";
function App() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  // const [isShowProjects, setIsShowProjects] = useState(false);
  const isShowProjects = useRef(false);

  const splineComputerRef = useRef();

  function onSplineLoad(spline) {
    console.debug("Spline scene loaded");
    setTimeout(() => {
      setIsSplineLoaded(true);
    }, 1000);

    const splineComputer = spline.findObjectByName("Computer");
    splineComputerRef.current = splineComputer;
  }

  function onMouseDown(e) {
    if (e.target.name === "Computer") {
      console.debug("Computer Pressed");
      console.debug("OnMouseDown isShowProjects=", isShowProjects);
      if (isShowProjects.current === true) {
        isShowProjects.current = false;
        console.debug("set isShowProjects back false and exit");
        return;
      }
      setTimeout(() => {
        // Display project modal after Camera animation ends
        document.getElementById("my_modal_3").showModal();
        isShowProjects.current = true;
        console.debug("Showing modal isShowProjects=", isShowProjects);
      }, 1000);
    }
  }

  function onModalClose() {
    console.debug("MouseDown Reverse");
    splineComputerRef.current.emitEventReverse("mouseDown");
  }

  function renderLoading() {
    if (isSplineLoaded === false) {
      // Show loading animation
      return (
        <div className="h-screen flex items-center justify-center flex-col">
          <p>Loading Portfolio</p>
          <progress className="progress progress-primary w-56"></progress>
        </div>
      );
    }
    return <></>;
  }

  return (
    <>
      {renderLoading()}
      <Spline
        scene="https://prod.spline.design/He5R4YZaPhMFKUra/scene.splinecode"
        onLoad={onSplineLoad}
        onMouseDown={onMouseDown}
        className={isSplineLoaded ? "block" : "hidden"}
      />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-5xl md:w-4/4">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onModalClose}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">My Projects</h3>

          <div className="carousel space-x-4 w-full sm:h-96 lg:h-[35rem]">
            <div
              id="slide1"
              className="carousel-item relative w-full flex-col gap-2"
            >
              <p>Youtube Note-taking App</p>
              <div className="flex gap-1">
                <span className="badge badge-primary">React.js</span>
                <span className="badge badge-primary">.Net 8</span>
                <span className="badge badge-primary">T-SQL</span>
              </div>

              <div className="mockup-window border bg-blue-900 w-full">
                <div className="flex justify-center bg-base-200 h-full">
                  <img
                    src={youtubeNoteTakingAppThumbnail}
                    className="w-full h-full object-contain"
                    alt="Youtube Note-taking App Thumbnail"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <a
                  className="btn btn-outline btn-primary w-2/5"
                  href="https://youtubenotes.netlify.app/"
                  target="_blank"
                >
                  Live Demo
                </a>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle ">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            {/* Slide 2 */}
            <div
              id="slide2"
              className="carousel-item relative w-full flex-col gap-2"
            >
              <p>Hackathon Team Builder App</p>
              <div className="flex gap-1">
                <span className="badge badge-primary">.Net MVC 5</span>
                <span className="badge badge-primary">.Net WebAPI</span>
                <span className="badge badge-primary">EF 6</span>
              </div>
              <div className="mockup-window border bg-blue-900 w-full">
                <div className="flex justify-center bg-base-200 h-full">
                  <img
                    src={hackathonTeamBuilderThumbnail}
                    className="w-full h-full object-contain"
                    alt="Hackathon Team Builder App Thumbnail"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <a
                  className="btn btn-outline btn-primary w-2/5"
                  href="https://hackathonteambuilder20240320220041.azurewebsites.net/"
                  target="_blank"
                >
                  Live Demo
                </a>
              </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle ">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            {/* Slide 3 */}
            <div
              id="slide3"
              className="carousel-item relative w-full flex-col gap-2"
            >
              <p>
                Dictionary Chrome Extensio {"(4.3 Stars / 75 Active Users)"}
              </p>
              <div className="flex gap-1">
                <span className="badge badge-primary">HTML</span>
                <span className="badge badge-primary">CSS</span>
                <span className="badge badge-primary">JavaScript</span>
              </div>
              <div className="mockup-window border bg-blue-900 w-full">
                <div className="flex justify-center bg-base-200 h-full">
                  <img
                    src={chromeExtensionThumbnail}
                    className="w-full h-full object-contain"
                    alt="Dictionary Chrome Extension Thumbnail"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <a
                  className="btn btn-outline btn-primary w-2/5"
                  href="https://chromewebstore.google.com/detail/dictionary-search-diction/clhkbghopdclagfplhknlhcpnjefpacd?hl=en&authuser=0"
                  target="_blank"
                >
                  Get Extension
                </a>
              </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle ">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
