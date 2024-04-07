import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
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
        document.getElementById("my_modal_1").showModal();
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
      {/* <h1 className="text-3xl font-bold underline text-blue-500">
        Hello world!asds
      </h1> */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close,isShowProjects=
            {isShowProjects ? "true" : "false"}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={onModalClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
