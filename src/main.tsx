import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from 'react-ga4';

ReactGA.initialize('G-HN4ED578M3');

createRoot(document.getElementById("root")!).render(<App />);