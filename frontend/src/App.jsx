
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">R</span>
          Resume<span className="brand-accent">Pilot</span>
        </a>
        <span className="nav-label">AI Resume Analyzer</span>
      </header>

      <Home />

      <footer className="footer">
        <p>ResumePilot · AI-powered resume analysis and learning support</p>
      </footer>
    </div>
  );
}
