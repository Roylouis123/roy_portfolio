import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Hobbies from "./sections/Hobbies";
import Location from "./sections/Location";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import { theme } from "./utils";

const App = () => {
  return (
    <div
      className={`
      bg-slate-900 ${theme.primary} font-mono
      min-h-screen p-4 md:p-8 space-y-6 md:space-y-12
      overflow-hidden relative
    `}
    >
      {/* JavaScript-themed Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full
          bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-amber-900/20
          animate-pulse opacity-40 mix-blend-overlay"
        ></div>
      </div>

      {/* Render Sections */}
      <Header />
      <Projects />
       <Skills />
      <Hobbies />
      <Experience/>
      <Location />
      <Contact />
    </div>
  );
};

export default App;
