import Spline from "@splinetool/react-spline";

function App() {
  function onMouseDown(e) {
    if (e.target.name === "Computer") {
      console.log("Toggle portfolio");
    }

    console.log(e.target.name);
  }
  return (
    <>
      <Spline
        scene="https://prod.spline.design/He5R4YZaPhMFKUra/scene.splinecode"
        onMouseDown={onMouseDown}
      />
    </>
  );
}

export default App;
