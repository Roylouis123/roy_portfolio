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
  const codeText = "{ code: passion }";
  const [showCode, setShowCode] = useState(false);
  const words = fullText.split(' ');
  const totalCharCount = fullText.replace(/\s/g, '').length;
  
  // Letters fall animation complete and transition to main content
  useEffect(() => {
    // Calculate the time when all letters will be displayed
    const letterAnimationTime = totalCharCount * 0.1 * 1000; // Convert to milliseconds
    
    // Show code text after main text is fully displayed
    const codeTimer = setTimeout(() => {
      setShowCode(true);
    }, letterAnimationTime + 100); // Small buffer after letters are displayed
    
    // Complete the splash screen after text is fully displayed
    const completeTimer = setTimeout(() => {
      onComplete();
    }, letterAnimationTime + 800); // Add delay after text is fully displayed
    
    return () => {
      clearTimeout(codeTimer);
      clearTimeout(completeTimer);
    };
  }, [totalCharCount, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "brightness(2)",
        transition: { duration: 0.4, ease: "easeInOut" }
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background elements */}
      <motion.div className="absolute inset-0">
        {/* Grid lines */}
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1, duration: 2 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 5}%`}
                x2="100%"
                y2={`${i * 5}%`}
                stroke="#FFD700"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={`${i * 5}%`}
                y1="0"
                x2={`${i * 5}%`}
                y2="100%"
                stroke="#FFD700"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative p-4 sm:p-6 md:p-8 lg:p-12 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold z-10"
        style={{ 
          transform: "perspective(1000px) rotateX(10deg)",
          transformStyle: "preserve-3d"
        }}
        animate={{ 
          rotateX: [10, 5, 10],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {/* Glowing effect background */}
        <motion.div 
          className="absolute inset-0 bg-yellow-500/20 rounded-3xl blur-2xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Main Text */}
        <div className="text-yellow-400 flex flex-wrap justify-center relative z-10">
          {fullText.split(' ').map((word, wordIndex) => (
            <div key={wordIndex} className="flex mx-1 my-1">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: -100, opacity: 0, rotateX: -90 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    rotateX: 0,
                    textShadow: "0 0 10px rgba(255, 215, 0, 0.7)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
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
        
        {/* Code text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showCode ? 1 : 0, 
            y: showCode ? 0 : 20,
          }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-cyan-400 font-mono tracking-wider"
        >
          {codeText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.5 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Set content ready immediately when splash is complete
    setContentReady(true);
  };

  // No additional timer needed - content loads immediately after splash screen completes

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, background: "rgba(15, 23, 42, 0)" }}
        animate={{ 
          opacity: !showSplash && contentReady ? 1 : 0,
          background: !showSplash && contentReady ? "rgba(15, 23, 42, 1)" : "rgba(15, 23, 42, 0)",
          transition: { 
            delay: 0, 
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
        className={`
          ${theme.primary} font-mono
          min-h-screen p-4 md:p-8 pt-28 sm:pt-32 md:pt-36 space-y-16 md:space-y-24
          overflow-hidden relative
        `}
      >
        {/* Enhanced Background with Particles */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: !showSplash && contentReady ? 1 : 0,
            transition: { duration: 2, delay: 0.5 }
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full
            bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-amber-900/20
            mix-blend-overlay"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          
          {/* Particle effects */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-400/30 mix-blend-screen"
              style={{
                width: Math.random() * 30 + 5,
                height: Math.random() * 30 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * -100, Math.random() * 100],
                x: [Math.random() * -100, Math.random() * 100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        {/* Render Sections with staggered animations */}
        {!showSplash && contentReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Header />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Projects />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Skills />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Hobbies />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <Experience/>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <Location />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
            >
              <Contact />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default App;