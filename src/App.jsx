import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import youtubeNoteTakingAppThumbnail from "./assets/img/youtube-note-taking.png";
import hackathonTeamBuilderThumbnail from "./assets/img/hacthon-team-builder.jpeg";
import chromeExtensionThumbnail from "./assets/img/chrome-extension.jpeg";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const pdfOptions = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resumeURL =
  "https://leonstorageac.blob.core.windows.net/assets/Lap_Wang_Wong_Resume.pdf";

function App() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const isShowProjects = useRef(false);
  const isShowingResume = useRef(false);

  const splineComputerRef = useRef();
  const splineArtBoardRef = useRef();

  function onSplineLoad(spline) {
    console.debug("Spline scene loaded");
    setTimeout(() => {
      setIsSplineLoaded(true);
    }, 1000);

    const splineComputer = spline.findObjectByName("Computer");
    splineComputerRef.current = splineComputer;

    splineArtBoardRef.current = spline.findObjectByName("artboard-2");
  }

  function onMouseDown(e) {
    console.debug("Event on mouse down=", e.target.name);

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
        document.getElementById("project_modal").showModal();
        isShowProjects.current = true;
        console.debug("Showing modal isShowProjects=", isShowProjects);
      }, 1000);
    }

    if (e.target.name === "artboard-2") {
      console.debug("artboard Pressed");
      console.debug("OnMouseDown isShowingResume=", isShowingResume);
      if (isShowingResume.current === true) {
        isShowingResume.current = false;
        console.debug("set isShowingResume back false and exit");
        return;
      }
      setTimeout(() => {
        // Display project modal after Camera animation ends
        document.getElementById("resume_modal").showModal();
        isShowingResume.current = true;
        console.debug("Showing modal isShowingResume=", isShowingResume);
      }, 1000);
    }
  }

  function onModalClose() {
    console.debug("MouseDown Reverse");
    splineComputerRef.current.emitEventReverse("mouseDown");
  }

  function onResumeModalClose() {
    splineArtBoardRef.current.emitEventReverse("mouseDown");
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

  function renderResumePDF() {
    return (
      <div className="w-full">
        <Document
          file={resumeURL}
          onLoadSuccess={() => {}}
          options={pdfOptions}
          className={"w-full"}
        >
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    );
  }

  return (
    <>
      {renderLoading()}
      <Spline
        scene="https://prod.spline.design/Hdt3y9wKpkr2uqxY/scene.splinecode"
        onLoad={onSplineLoad}
        onMouseDown={onMouseDown}
        className={isSplineLoaded ? "block" : "hidden"}
      />

      <dialog id="resume_modal" className="modal">
        <div className="modal-box sm:w-11/12 max-w-[644px] px-2 ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onResumeModalClose}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            <a className="link link-primary" href={resumeURL}>
              Download Resume
            </a>
          </h3>
          {renderResumePDF()}
        </div>
      </dialog>
      {/* Projects modal */}
      <dialog id="project_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-2/4 md:w-4/4 md:h-5/6 lg:h-5/6">
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

          {/* sm:h-96 lg:h-[30rem] */}
          <div className="carousel space-x-4 w-full h-5/6">
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
                Dictionary Chrome Extension {"(4.3 Stars / 75 Active Users)"}
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
                {/* <a href="#slide4" className="btn btn-circle">
                  ❯
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
