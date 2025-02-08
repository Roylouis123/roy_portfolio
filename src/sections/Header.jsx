import { map } from "lodash";
import { Briefcase, Target, Terminal, Zap } from "lucide-react";
import { theme } from "../utils";

const Header = () => {

  const navLinks = [
    {
      name: "Projects",
      icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
      href: "#projects",
    },
    {
      name: "Skills",
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      href: "#skills",
    },
    {
      name: "Experience",
      icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
      href: "#experience",
    },
    {
      name: "Contact",
      icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />,
      href: "#contact",
    },
  ];

  return (
    <header
      className={`
            relative py-6 md:py-12 px-4 md:px-8
            border-b-2 ${theme.border}
            shadow-lg shadow-yellow-500/20
            flex flex-col md:flex-row justify-between items-center
          `}
    >
      {/* Name and Title */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1
          className={`
                text-3xl md:text-5xl font-bold tracking-widest
                relative z-10 animate-text bg-gradient-to-r
                ${theme.gradient} bg-clip-text
              `}
        >
          ROYSTON M LOUIS
        </h1>
        <p className="text-base md:text-xl mt-2 tracking-wider opacity-80">
          <div
            className={`
                  inline-flex items-center
                  transform hover:scale-105 transition-all duration-300
                  ${theme.shadow}
                `}
          >
            <Terminal className="w-6 h-6 animate-pulse" />
            <p className="text-lg md:text-xl tracking-wider">
              FULL STACK DEVELOPER | JS ARCHITECT
            </p>
          </div>
        </p>
      </div>

      {/* Navbar */}
      <nav className="relative z-10">
        <ul className="flex space-x-4 md:space-x-8">
          {map(navLinks,(link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`
                        inline-flex items-center gap-2
                        px-3 py-2 rounded-md
                        ${theme.primary} hover:text-white
                        bg-slate-800 hover:bg-slate-700
                        transition-colors duration-300
                        shadow-md hover:shadow-lg
                        ${theme.buttonShadow} hover:${theme.buttonHoverShadow}
                      `}
              >
                {link.icon}
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
