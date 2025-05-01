import { MapPin, Clock, Globe, Calendar, Wifi } from "lucide-react";
import { theme } from "../utils";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Calculate the current time in Bangalore
const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Format time for IST timezone (UTC+5:30)
  const options = { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(time);
};

// Interactive 3D Globe component
const InteractiveGlobe = () => {
  const globeRef = useRef(null);
  const currentTime = useCurrentTime();
  
  useEffect(() => {
    // Only run if the ref is attached and window exists
    if (globeRef.current && typeof window !== 'undefined' && window.Globe) {
      // Initialize the globe using the global Globe.gl variable
      const globe = window.Globe()
        (globeRef.current)
        .globeImageUrl('https://unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe@2.30.0/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe@2.30.0/example/img/night-sky.png')
        .pointOfView({ 
          lat: 12.9716, 
          lng: 77.5946, 
          altitude: 2.5 
        })
        .pointsData([{
          lat: 12.9716,
          lng: 77.5946,
          size: 0.12,
          color: "#fcd34d"
        }])
        .pointAltitude('size')
        .pointColor('color')
        .pointRadius(0.5)
        .pointsMerge(true)
        .enablePointerInteraction(true);
    
      // Add glow to the globe
      const globeMaterial = globe.globeMaterial();
      globeMaterial.emissive.set('#1e40af');
      globeMaterial.emissiveIntensity = 0.1;
      
      // Auto-rotate
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      // Initial animation to focus on Bangalore
      setTimeout(() => {
        globe.pointOfView({ 
          lat: 12.9716, 
          lng: 77.5946, 
          altitude: 1.8 
        }, 1000);
      }, 500);
      
      // Hide loading overlay once globe is initialized (faster)
      const loadingEl = document.querySelector('.globe-loading');
      if (loadingEl) {
        setTimeout(() => {
          loadingEl.style.display = 'none';
        }, 800);
      }
      
      // Clean up on component unmount
      return () => {
        if (globe && typeof globe.dispose === 'function') {
          globe.dispose();
        }
      };
    } else {
      // If Globe.gl is not available, retry after a short delay
      const retryTimer = setTimeout(() => {
        if (window.Globe) {
          // Force a re-render by updating state
          setRetryCount(prevCount => prevCount + 1);
        }
      }, 300);
      
      return () => clearTimeout(retryTimer);
    }
  }, []);
  
  // State to track retry attempts if Globe.gl isn't loaded yet
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  
  // Show fallback after just 2 seconds if Globe still hasn't loaded
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!window.Globe) {
        setShowFallback(true);
      }
    }, 2000);
    
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Simplified fallback globe that doesn't rely on globe.gl
  const SimpleFallbackGlobe = () => (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Static globe fallback - responsive sizes */}
      <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.3)] globe-container">
        {/* Simplified globe texture */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, rgba(30,58,138,0.8) 0%, rgba(15,23,42,0.95) 100%)`,
          }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 border-t border-b border-blue-500/20 top-1/4 bottom-1/4"></div>
            <div className="absolute inset-0 border-t border-b border-blue-500/20 top-2/5 bottom-2/5"></div>
            <div className="absolute inset-0 border-l border-r border-blue-500/20 left-1/4 right-1/4"></div>
            <div className="absolute inset-0 border-l border-r border-blue-500/20 left-2/5 right-2/5"></div>
            <div className="absolute inset-0 rounded-full border border-blue-500/40"></div>
          </div>
          
          {/* Bangalore location marker with pulsing effect - responsive sizes */}
          <div className="absolute" style={{ top: '40%', left: '62%' }}>
            <div className="absolute w-6 h-6 sm:w-8 sm:h-8 -ml-3 -mt-3 sm:-ml-4 sm:-mt-4">
              <div className="absolute inset-0 rounded-full bg-yellow-500/80 animate-ping"></div>
              <div className="absolute inset-1 rounded-full bg-yellow-500/50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-2 rounded-full bg-yellow-500/30 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full -ml-0.75 -mt-0.75 sm:-ml-1 sm:-mt-1 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
          </div>
          
          {/* Equator line */}
          <div className="absolute inset-0 border-t border-b border-blue-500/50 top-1/2 bottom-1/2"></div>
        </div>
      </div>
      
      {/* Orbital ring - responsive sizes */}
      <div className="absolute w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-blue-500/30 animate-spin-slow"></div>
      
      {/* Location Data Box - hidden since we already have one in the parent component */}
    </div>
  );

  return (
    <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 overflow-hidden">
      {/* Globe container */}
      <div ref={globeRef} className="w-full h-full"></div>
      
      {/* Loading overlay - shown until globe loads */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 globe-loading">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-400 text-xs sm:text-sm font-mono">INITIALIZING GLOBE...</p>
        </div>
      </div>
      
      {/* Show fallback globe if the 3D globe doesn't load */}
      {showFallback && (
        <div className="absolute inset-0">
          <SimpleFallbackGlobe />
        </div>
      )}
      
      {/* Location Data Box */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-center w-auto max-w-[90%]">
        <div className="text-[10px] xs:text-xs text-blue-400 font-mono">LOCATION: BANGALORE, INDIA</div>
        <div className="text-[10px] xs:text-xs text-yellow-500 font-mono mt-0.5 sm:mt-1">12.9716° N, 77.5946° E</div>
      </div>
    </div>
  );
};

// Main component
const Location = () => {
  return (
    <section id="location" className="relative py-16">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-500/5 rounded-full filter blur-[80px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-yellow-500/5 rounded-full filter blur-[80px] -z-10"></div>
      
      {/* World map grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0zNiAxOGMxLjIzIDAgMi4xOTguOTY5IDIuMTk4IDIuMlYyMC4yYzAgMS4yMzEtLjk2OCAyLjItMi4xOTggMi4ySDM1LjhjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4ydi0uMDAxYzAtMS4yMzEuOTctMi4yIDIuMi0yLjJIMzZ6TTI0IDE4YzEuMjMgMCAyLjIuOTY5IDIuMiAyLjJ2LjAwMWMwIDEuMjMtLjk3IDIuMTk5LTIuMiAyLjE5OWgtLjJjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4yVjIwLjJjMC0xLjIzLjk3LTIuMiAyLjItMi4ySDI0ek0xMiAxOGMxLjIzIDAgMi4yLjk2OSAyLjIgMi4ydi4wMDFjMCAxLjIzLS45NyAyLjE5OS0yLjIgMi4xOTloLS4yYy0xLjIzIDAgLTIuMi0uOTY5LTIuMi0yLjJWMjAuMmMwLTEuMjMuOTctMi4yIDIuMi0yLjJIMTJ6TTQ4IDE4YzEuMjMgMCAyLjIuOTY5IDIuMiAyLjJ2LjAwMWMwIDEuMjMtLjk3IDIuMTk5LTIuMiAyLjE5OWgtLjJjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4yVjIwLjJjMC0xLjIzLjk3LTIuMiAyLjItMi4ySDQ4ek0zNiAzMGMxLjIzIDAgMi4xOTguOTY5IDIuMTk4IDIuMlYzMi4yYzAgMS4yMzEtLjk2OCAyLjItMi4xOTggMi4ySDM1LjhjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4ydi0uMDAxYzAtMS4yMzEuOTctMi4yIDIuMi0yLjJIMzZ6TTI0IDMwYzEuMjMgMCAyLjIuOTY5IDIuMiAyLjJ2LjAwMWMwIDEuMjMtLjk3IDIuMTk5LTIuMiAyLjE5OWgtLjJjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4yVjMyLjJjMC0xLjIzLjk3LTIuMiAyLjItMi4ySDI0ek0xMiAzMGMxLjIzIDAgMi4yLjk2OSAyLjIgMi4ydi4wMDFjMCAxLjIzLS45NyAyLjE5OS0yLjIgMi4xOTloLS4yYy0xLjIzIDAtMi4yLS45NjktMi4yLTIuMlYzMi4yYzAtMS4yMy45Ny0yLjIgMi4yLTIuMkgxMnpNNDggMzBjMS4yMyAwIDIuMi45NjkgMi4yIDIuMnYuMDAxYzAgMS4yMy0uOTcgMi4xOTktMi4yIDIuMTk5aC0uMmMtMS4yMyAwLTIuMi0uOTY5LTIuMi0yLjJWMzIuMmMwLTEuMjMuOTctMi4yIDIuMi0yLjJINDh6TTM2IDQyYzEuMjMgMCAyLjE5OC45NjkgMi4xOTggMi4yVjQ0LjJjMCAxLjIzMS0uOTY4IDIuMi0yLjE5OCAyLjJIMzUuOGMtMS4yMyAwLTIuMi0uOTY5LTIuMi0yLjJ2LS4wMDFjMC0xLjIzMS45Ny0yLjIgMi4yLTIuMkgzNnpNMjQgNDJjMS4yMyAwIDIuMi45NjkgMi4yIDIuMnYuMDAxYzAgMS4yMy0uOTcgMi4xOTktMi4yIDIuMTk5aC0uMmMtMS4yMyAwLTIuMi0uOTY5LTIuMi0yLjJWNDQuMmMwLTEuMjMuOTctMi4yIDIuMi0yLjJIMjR6TTEyIDQyYzEuMjMgMCAyLjIuOTY5IDIuMiAyLjJ2LjAwMWMwIDEuMjMtLjk3IDIuMTk5LTIuMiAyLjE5OWgtLjJjLTEuMjMgMC0yLjItLjk2OS0yLjItMi4yVjQ0LjJjMC0xLjIzLjk3LTIuMiAyLjItMi4ySDEyek00OCA0MmMxLjIzIDAgMi4yLjk2OSAyLjIgMi4ydi4wMDFjMCAxLjIzLS45NyAyLjE5OS0yLjIgMi4xOTloLS4yYy0xLjIzIDAtMi4yLS45NjktMi4yLTIuMlY0NC4yYzAtMS4yMy45Ny0yLjIgMi4yLTIuMkg0OHoiLz48L2c+PC9zdmc+')] -z-10"></div>
      
      {/* Section header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto text-center px-4"
      >
        <div className="inline-flex items-center justify-center mb-2 sm:mb-3">
          <div className="h-px w-4 sm:w-6 md:w-8 bg-yellow-500 mr-2 sm:mr-3"></div>
          <span className="text-yellow-500 text-xs sm:text-sm font-medium tracking-wider">CURRENT LOCATION</span>
          <div className="h-px w-4 sm:w-6 md:w-8 bg-yellow-500 ml-2 sm:ml-3"></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-5">Bangalore, India</h2>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Based in India's silicon valley, home to a thriving tech ecosystem and innovation hub.
        </p>
      </motion.div>
      
      {/* Content - Responsive layout - stacked on mobile, side-by-side on larger screens */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 md:gap-8"
        >
          {/* Globe column - (full width on mobile, half on desktop) */}
          <div className="w-full md:w-1/2 mx-auto max-w-[500px] md:max-w-none">
            <InteractiveGlobe />
          </div>
          
          {/* Data column - (full width on mobile, half on desktop) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center mt-6 md:mt-0">
            {/* Info panel */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
              {/* Current time display */}
              <div className="mb-4 sm:mb-6">
                <p className="text-blue-400 text-xs font-mono mb-1">CURRENT TIME</p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white">{useCurrentTime()}</span>
                </div>
                <p className="text-blue-400 text-[10px] xs:text-xs font-mono mt-1 sm:mt-2">IST (UTC+5:30)</p>
              </div>
              
              {/* Connection status */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-400 text-[10px] xs:text-xs font-mono">CONNECTION ACTIVE</p>
                </div>
              </div>
              
              {/* Additional location info - Sci-fi styled in grid on small screens */}
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/50 p-2 sm:p-3 rounded border border-slate-700/50">
                  <div className="p-1 sm:p-1.5 rounded-full bg-blue-500/20">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-xs sm:text-sm">GMT+5:30 / Asia/Kolkata</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/50 p-2 sm:p-3 rounded border border-slate-700/50">
                  <div className="p-1 sm:p-1.5 rounded-full bg-blue-500/20">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-xs sm:text-sm">09:00 - 18:00 IST</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/50 p-2 sm:p-3 rounded border border-slate-700/50 xs:col-span-2 md:col-span-1 lg:col-span-2">
                  <div className="p-1 sm:p-1.5 rounded-full bg-blue-500/20">
                    <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-xs sm:text-sm">Remote Capability: Active</span>
                </div>
              </div>
              
              {/* Additional information section */}
              <div className="mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-slate-700/50">
                <h3 className="text-yellow-400 text-base sm:text-lg font-bold mb-2 sm:mb-4">About Bangalore</h3>
                <div className="space-y-2 sm:space-y-3 text-slate-300 text-xs sm:text-sm">
                  <p>Known as India's Silicon Valley, Bangalore is the center of India's high-tech industry. The city is home to numerous tech companies, startups, and educational institutions.</p>
                  <p>With a rich culture, pleasant climate, and diverse population, it offers an ideal environment for technology professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;