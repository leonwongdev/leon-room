import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Helmet } from "react-helmet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <Helmet>
      <title>{"Leon's Room"}</title>
      <meta name="description" content="Leon's Portfolio" />
      <meta property="og:title" content="Leon's Portfolio" />
      <meta property="og:description" content="Leon's Portfolio" />
      <meta property="og:image" content="/public/thumbnail.png" />
    </Helmet>
    <App />
  </>

  // </React.StrictMode>,
);
