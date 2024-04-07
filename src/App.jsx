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
      {/* <h1 className="text-3xl font-bold underline text-blue-500">
        Hello world!asds
      </h1> */}
    </>
  );
}

export default App;
