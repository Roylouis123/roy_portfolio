import { Briefcase, Code, Home, Rocket, Sparkles, Terminal, Zap } from "lucide-react";
import { theme } from "../utils";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { map } from "lodash";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);

  const navLinks = [
    { name: "Projects", icon: Rocket, href: "#projects" },
    { name: "Skills", icon: Sparkles, href: "#skills" },
    { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Contact", icon: Terminal, href: "#contact" },
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate styles based on scroll position
  const headerBgOpacity = Math.min(0.95, 0.4 + (scrollY / 400));
  const borderOpacity = Math.min(0.8, scrollY / 500);
  
  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, ${headerBgOpacity}), rgba(20, 30, 50, ${headerBgOpacity}))`,
        backdropFilter: `blur(10px)`,
        WebkitBackdropFilter: `blur(10px)`, /* For Safari */
        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
        borderBottom: `1px solid rgba(255, 215, 0, ${borderOpacity})`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 md:py-5">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: loaded ? 1 : 0, 
                  x: loaded ? 0 : -20,
                  transition: { duration: 0.5, delay: 0.2 } 
                }}
                className="mr-2 hidden sm:block"
              >
                <div className="relative">
                  <Code className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400" />
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md animate-pulse" />
                </div>
              </motion.div>
              
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: loaded ? 1 : 0, 
                    y: loaded ? 0 : -10,
                    transition: { duration: 0.5, delay: 0.3 }
                  }}
                  className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent tracking-wide"
                >
                  ROYSTON M LOUIS
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: loaded ? 1 : 0, 
                    y: loaded ? 0 : 10,
                    transition: { duration: 0.5, delay: 0.4 }
                  }}
                  className="flex items-center"
                >
                  <span className="text-[10px] xs:text-xs sm:text-sm text-yellow-400/90 font-medium tracking-wider whitespace-nowrap">
                    FULL STACK DEVELOPER
                  </span>
                  <span className="ml-1 hidden sm:inline-block w-1 sm:w-2 h-3 sm:h-4 bg-yellow-400/30 animate-blink"></span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-white hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              style={{
                boxShadow: isMenuOpen ? "0 0 15px rgba(234, 179, 8, 0.2)" : "none"
              }}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <span 
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2.5 w-5 sm:top-3 sm:w-6' : 'top-1.5 w-5 sm:top-2 sm:w-6'}`} 
                />
                <span 
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 top-2.5 w-5 sm:top-3 sm:w-6' : 'top-2.5 w-3 sm:top-3 sm:w-4 right-0'}`} 
                />
                <span 
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2.5 w-5 sm:top-3 sm:w-6' : 'top-3.5 w-5 sm:top-4 sm:w-6'}`} 
                />
              </div>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeLink === index;
              
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: loaded ? 1 : 0, 
                    y: loaded ? 0 : -20,
                    transition: { duration: 0.5, delay: 0.3 + (index * 0.1) } 
                  }}
                >
                  <a 
                    href={link.href}
                    className="group relative flex items-center text-sm font-medium py-2 px-1"
                    onMouseEnter={() => setActiveLink(index)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    {/* Background hover effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    
                    {/* Icon */}
                    <span className="relative mr-2">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-yellow-400' : 'text-yellow-500/80 group-hover:text-yellow-400'} transition-colors duration-300`} />
                      {isActive && (
                        <span className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md animate-pulse-slow"></span>
                      )}
                    </span>
                    
                    {/* Text */}
                    <span className={`${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors duration-300`}>
                      {link.name}
                    </span>
                    
                    {/* Bottom line indicator */}
                    <span 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-600 transform origin-left transition-transform duration-300 ease-out"
                      style={{ 
                        width: '100%',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    ></span>
                  </a>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`} 
        id="mobile-menu"
      >
        <div className="px-3 sm:px-4 pt-2 pb-4 sm:pb-6 space-y-1 sm:space-y-2 bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-lg shadow-lg">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-yellow-400 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors duration-200 active:bg-slate-700/80 active:scale-[0.98]"
              >
                <Icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                {link.name}
                
                {/* Right arrow indicator */}
                <svg className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-yellow-500/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
      
      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
    </header>
  );
};

export default Header;
