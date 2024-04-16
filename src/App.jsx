import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
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

  // Skills
  const [skills, setSkills] = useState();
  const [projects, setProjects] = useState();

  // Function to fetch data
  const fetchSkills = async () => {
    try {
      const response = await fetch(
        "https://portfolio-express-server-pi.vercel.app/api/skills"
      ); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setSkills(result);
    } catch (error) {
      console.debug(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://portfolio-express-server-pi.vercel.app/api/projects"
      ); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.debug("fetch projects payload=", result);
      setProjects(result);
    } catch (error) {
      console.debug(error);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

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

  function renderSkillsSection() {
    if (skills == null) {
      return null;
    }
    return (
      <div className="container mx-auto py-4 skills">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id.$oid}
              className="card bg-base-100 shadow-md p-4 flex flex-col items-center"
            >
              {/* Render icon using dangerouslySetInnerHTML */}
              <div
                className="w-12 h-12 mb-2"
                dangerouslySetInnerHTML={{ __html: skill.iconPath }}
              />
              <p className="font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderProjectsCarousel(projects) {
    if (!projects || projects.length === 0) {
      console.debug("renderProjectsCarousel:", "no projects");
      return;
    }
    console.debug("renderProjectsCarousel: rendering project carousel");
    return (
      <div className="carousel space-x-4 w-full h-5/6">
        {projects.map((project, index) => (
          <div
            key={project._id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full flex-col gap-2"
          >
            <p>{project.name}</p>
            <div className="flex gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="badge badge-primary">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mockup-window border bg-blue-900 w-full">
              <div className="flex justify-center bg-base-200 h-full">
                <img
                  src={project.imageUrl}
                  className="w-full h-full object-contain"
                  alt={`${project.name} Thumbnail`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <a
                className="btn btn-outline btn-primary w-2/5"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? projects.length : index}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === projects.length - 1 ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
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
          {renderSkillsSection()}
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
          {renderProjectsCarousel(projects)}
        </div>
      </dialog>
    </>
  );
}

export default App;
