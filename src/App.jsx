import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Hobbies from "./sections/Hobbies";
import Location from "./sections/Location";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import { theme } from "./utils";

const SplashScreen = ({ onComplete }) => {
  const fullText = "FULL STACK DEVELOPER";
  const words = fullText.split(' ');
  const totalCharCount = fullText.replace(/\s/g, '').length;
  
  // Letters fall animation complete and transition to main content
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, totalCharCount * 100 + 1500); // Allow time for all letters to drop in and be visible
    
    return () => clearTimeout(timeout);
  }, [totalCharCount, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative p-4 sm:p-6 md:p-8 lg:p-12 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold"
        style={{ 
          transform: "perspective(1000px) rotateX(10deg)",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="text-yellow-400 flex flex-wrap justify-center">
          {fullText.split(' ').map((word, wordIndex) => (
            <div key={wordIndex} className="flex mx-1 my-1">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: (wordIndex * word.length + letterIndex) * 0.1,
                  }}
                  className="mx-[0.5px] sm:mx-[1px] md:mx-[2px]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showSplash ? 0 : 1,
          transition: { delay: 0.2, duration: 0.8 }
        }}
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
      </motion.div>
    </>
  );
};

export default App;
