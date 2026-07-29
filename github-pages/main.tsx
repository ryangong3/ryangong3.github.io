import { createRoot } from "react-dom/client";
import PortfolioPage from "../app/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing application root");
}

createRoot(root).render(<PortfolioPage />);
