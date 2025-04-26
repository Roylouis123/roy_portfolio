import { Briefcase, Target, Terminal, Zap } from "lucide-react";
import { theme } from "../utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { map } from "lodash";

const Header = () => {
  const [active, setActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Projects", icon: Target, href: "#projects" },
    { name: "Skills", icon: Zap, href: "#skills" },
    { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Contact", icon: Terminal, href: "#contact" },
  ];

  return (
    <header
      className={`
        relative
        py-4 sm:py-6 md:py-8
        px-4 sm:px-6 md:px-10
        border-b-2
        shadow-xl
        bg-opacity-90
        backdrop-blur-lg
        border-gradient-to-r from-yellow-500 to-purple-500
        flex
        flex-col md:flex-row
        justify-between
        items-center
        rounded-b-3xl
        ${theme.shadow}
      `}
    >
      {/* Branding */}
      <div className="text-center md:text-left mb-4 md:mb-0 w-full md:w-auto">
        <h1
          className={`
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold
            tracking-widest
            bg-gradient-to-r ${theme.gradient}
            bg-clip-text
            text-transparent
          `}
        >
          ROYSTON M LOUIS
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 10px 20px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"],
            transition: {
              duration: 2,
              textShadow: {
                repeat: Infinity,
                duration: 3
              }
            }
          }}
          className="text-base sm:text-lg md:text-xl mt-2 tracking-wider opacity-85 flex items-center gap-2 justify-center md:justify-start font-bold"
          style={{ 
            transform: "perspective(1000px) rotateX(10deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-pulse text-yellow-500" />
          FULL STACK DEVELOPER
        </motion.p>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-yellow-400"
        aria-label="Toggle navigation menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navbar */}
      <nav
        className={`
          relative
          z-10
          w-full md:w-auto
          ${isMenuOpen ? "block" : "hidden md:block"}
          mt-4 md:mt-0
        `}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 md:items-center">
          {map(navLinks, (link, index) => {
            const Icon = link.icon;
            return (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="transition-all duration-300 flex justify-center md:justify-start"
              >
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)} // Close menu on nav link click (mobile)
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  className={`
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    transition-colors
                    duration-300
                    bg-slate-800
                    hover:text-white
                    shadow-lg
                    ${theme.buttonShadow}
                    ${active === index ? "shadow-2xl" : ""}
                    w-[80%] md:w-auto
                    justify-center md:justify-start
                  `}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                  <span className="text-sm sm:text-base text-yellow-400 font-medium tracking-wide">
                    {link.name}
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
