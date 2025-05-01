import { motion } from "framer-motion";
import { 
  Gamepad2, Dumbbell, Utensils, Users, 
  Film, Brain, HeartPulse, Music, Plane,
  BookOpen, Camera, Coffee, Palette, Mountain
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { theme } from "../utils";

// Custom component for the 3D hover effect
const HobbyCard = ({ hobby, isActive, onClick }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  
  // 3D tilt effect based on mouse position
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: hover
          ? `perspective(1000px) rotateX(${-mousePosition.y * 10}deg) rotateY(${mousePosition.x * 15}deg)`
          : "perspective(1000px) rotateX(0) rotateY(0)",
        transition: "transform 0.2s ease-out"
      }}
    >
      {/* Card background with decorative elements */}
      <div 
        className={`
          relative overflow-hidden h-full 
          rounded-xl border border-slate-700/60
          transition-all duration-300
          ${isActive ? 'border-opacity-100 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'hover:border-yellow-500/30'}
          bg-gradient-to-br from-slate-800 to-slate-900
        `}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Decorative circle background behind icon */}
        <div 
          className={`
            absolute top-4 right-4 w-16 h-16 rounded-full opacity-20
            transition-opacity duration-300 ${hover ? 'opacity-50' : ''}
            bg-gradient-to-r ${hobby.gradient}
            blur-md
          `}
        />
        
        {/* Main content */}
        <div className="p-6 relative z-10">
          {/* Icon with gradient background */}
          <div 
            className={`
              w-12 h-12 rounded-xl mb-5
              flex items-center justify-center
              relative transform rotate-3
              transition-all duration-300 ${hover ? '-rotate-3' : ''}
              shadow-lg
            `}
            style={{ 
              background: `linear-gradient(135deg, ${hobby.colors[0]}30, ${hobby.colors[1]}50)`,
              boxShadow: `0 8px 20px -12px ${hobby.colors[0]}80`
            }}
          >
            <hobby.icon 
              className={`w-6 h-6 transition-transform duration-500 ${hover ? 'scale-110' : ''}`}
              style={{ color: hobby.colors[0] }} 
            />
          </div>
          
          {/* Hobby name and description */}
          <h3 
            className="text-xl font-bold mb-2 transition-colors duration-300"
            style={{ 
              color: hover ? hobby.colors[0] : 'white',
              textShadow: hover ? `0 0 20px ${hobby.colors[0]}40` : 'none'
            }}
          >
            {hobby.name}
          </h3>
          
          <p className="text-slate-400 text-sm mb-4 pr-4 line-clamp-2">
            {hobby.description}
          </p>
          
          {/* Tags/details */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {hobby.details.slice(0, 3).map((detail, idx) => (
              <span
                key={idx}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium
                  transition-transform duration-300 ${hover ? 'scale-105' : ''}
                `}
                style={{ 
                  background: `linear-gradient(135deg, ${hobby.colors[0]}30, ${hobby.colors[0]}10)`,
                  color: hobby.colors[0],
                  boxShadow: hover ? `0 2px 8px -2px ${hobby.colors[0]}50` : 'none'
                }}
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Expanded hobby detail view
const ExpandedHobbyView = ({ hobby, onClose }) => {
  if (!hobby) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700 mt-8 relative"
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Icon and basic info */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
            style={{ 
              background: `linear-gradient(135deg, ${hobby.colors[0]}30, ${hobby.colors[1]}50)`,
              boxShadow: `0 8px 32px -12px ${hobby.colors[0]}80`
            }}
          >
            <hobby.icon className="w-10 h-10" style={{ color: hobby.colors[0] }} />
          </div>
          
          <h3 className="text-2xl font-bold mb-2" style={{ color: hobby.colors[0] }}>
            {hobby.name}
          </h3>
          
          <p className="text-slate-300 mb-4 text-center md:text-left">
            {hobby.description}
          </p>
          
          {/* Experience level */}
          {hobby.level && (
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Experience</span>
                <span style={{ color: hobby.colors[0] }}>
                  {hobby.level === 5 ? "Expert" : 
                   hobby.level === 4 ? "Advanced" :
                   hobby.level === 3 ? "Intermediate" :
                   hobby.level === 2 ? "Beginner" : "Novice"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${hobby.level * 20}%`,
                    background: `linear-gradient(to right, ${hobby.colors[0]}, ${hobby.colors[1]})`
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Details and specifics */}
        <div className="md:w-2/3">
          {/* Long description */}
          {hobby.longDescription && (
            <div className="mb-6">
              <h4 className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-2">About this hobby</h4>
              <p className="text-slate-300">{hobby.longDescription}</p>
            </div>
          )}
          
          {/* What I enjoy */}
          <div className="mb-6">
            <h4 className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-3">What I enjoy</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hobby.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <div 
                    className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${hobby.colors[0]}20` }}
                  >
                    <div 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: hobby.colors[0] }}
                    />
                  </div>
                  <span className="text-slate-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Related activities/equipment */}
          {hobby.related && (
            <div>
              <h4 className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-3">Related interests</h4>
              <div className="flex flex-wrap gap-2">
                {hobby.related.map((item, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-sm bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Hobbies = () => {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [expandedHobby, setExpandedHobby] = useState(null);
  
  // Rich hobby data with gradients, colors, and expanded descriptions
  const hobbies = [
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Immersive worlds and strategic challenges across PC and console gaming",
      longDescription: "Gaming has been my passion since childhood. I enjoy exploring immersive virtual worlds, solving complex puzzles, and the strategic thinking required in competitive games. It's both an escape and a way to connect with friends online.",
      details: ["RPGs", "Strategy Games", "Racing", "Survival Games", "Indie Games"],
      related: ["Gaming PC Setup", "Game Design", "E-Sports", "Game Development"],
      level: 5,
      gradient: "from-indigo-500 to-blue-600",
      colors: ["#6366f1", "#2563eb"]
    },
    {
      name: "Fitness",
      icon: Dumbbell,
      description: "Strength training and cardio routines to maintain peak physical condition",
      longDescription: "Fitness is a cornerstone of my daily routine. I've developed a structured workout regimen focusing on progressive strength training while incorporating flexibility work and cardio for overall health.",
      details: ["Weight Training", "HIIT Workouts", "CrossFit", "Running", "Mobility Work"],
      related: ["Nutrition", "Fitness Apps", "Recovery Techniques", "Home Gym Equipment"],
      level: 4,
      gradient: "from-emerald-500 to-green-600",
      colors: ["#10b981", "#059669"]
    },
    {
      name: "Cooking",
      icon: Utensils,
      description: "Culinary explorations from home comfort food to international cuisines",
      longDescription: "Cooking is both a creative outlet and practical skill I've developed over years. I enjoy experimenting with flavors and techniques from around the world, with a particular focus on Asian cuisine and baking.",
      details: ["Asian Cuisine", "Baking", "Grilling", "Pasta Making", "Spice Blending"],
      related: ["Kitchen Gadgets", "Cooking Shows", "Farmers Markets", "Food Photography"],
      level: 3,
      gradient: "from-rose-500 to-pink-600",
      colors: ["#f43f5e", "#db2777"]
    },
    {
      name: "Music",
      icon: Music,
      description: "Playing instruments and exploring diverse musical genres",
      longDescription: "Music has always been a significant part of my life. From learning instruments to attending concerts, I'm constantly exploring new genres and appreciating the technical and emotional elements of music.",
      details: ["Guitar", "Piano", "Music Production", "Live Concerts", "Music Theory"],
      related: ["Vinyl Collection", "Audio Equipment", "Music History", "Festival Culture"],
      level: 3,
      gradient: "from-purple-500 to-indigo-600",
      colors: ["#8b5cf6", "#6366f1"]
    },
    {
      name: "Travel",
      icon: Plane,
      description: "Exploring new destinations, cultures and experiences around the world",
      longDescription: "Travel has broadened my perspective and introduced me to diverse cultures and experiences. I enjoy both planning detailed itineraries and occasionally venturing off the beaten path for authentic local experiences.",
      details: ["Cultural Exploration", "Food Tourism", "Historical Sites", "Landscape Photography", "Adventure Activities"],
      related: ["Language Learning", "Travel Planning", "Travel Tech", "Digital Nomadism"],
      level: 4,
      gradient: "from-sky-500 to-blue-600",
      colors: ["#0ea5e9", "#2563eb"]
    },
    {
      name: "Reading",
      icon: BookOpen,
      description: "Fiction and non-fiction books across various genres and topics",
      longDescription: "Reading is my favorite way to learn and unwind. I consume a mix of fiction for enjoyment and non-fiction for continuous learning, particularly in areas of technology, science, and personal development.",
      details: ["Science Fiction", "Tech Books", "Philosophy", "Biographies", "Self Development"],
      related: ["Book Clubs", "E-readers", "Book Collections", "Audiobooks"],
      level: 5,
      gradient: "from-amber-500 to-orange-600",
      colors: ["#f59e0b", "#ea580c"]
    },
    {
      name: "Photography",
      icon: Camera,
      description: "Capturing moments and perspectives through digital photography",
      longDescription: "Photography allows me to document experiences and view the world through a creative lens. I enjoy both the technical aspects of camera settings and the artistic elements of composition and lighting.",
      details: ["Street Photography", "Landscape", "Macro", "Night Photography", "Post-Processing"],
      related: ["Camera Equipment", "Photo Editing", "Printing", "Photography Communities"],
      level: 3,
      gradient: "from-teal-500 to-emerald-600",
      colors: ["#14b8a6", "#059669"]
    },
    {
      name: "Coffee",
      icon: Coffee,
      description: "Exploring specialty coffee brewing methods and origin varieties",
      longDescription: "What started as a morning routine has evolved into a hobby where I explore different brewing methods, bean origins, and roast profiles. I enjoy the ritual of manual brewing and the subtle flavor variations between different coffees.",
      details: ["Pour Over", "Espresso", "Single Origin Beans", "Home Roasting", "Latte Art"],
      related: ["Brewing Equipment", "Coffee Shops", "Roasters", "Specialty Beans"],
      level: 4,
      gradient: "from-yellow-500 to-amber-600",
      colors: ["#eab308", "#d97706"]
    },
    {
      name: "Art",
      icon: Palette,
      description: "Digital art creation and appreciation of various art forms",
      longDescription: "Art allows me to express creativity and appreciate visual aesthetics. I practice digital art and enjoy exploring museums, galleries, and learning about art history across different periods and cultures.",
      details: ["Digital Illustration", "Museum Visits", "Art History", "Design", "Contemporary Art"],
      related: ["Digital Art Tools", "Art Exhibitions", "Art Books", "Creative Communities"],
      level: 2,
      gradient: "from-fuchsia-500 to-purple-600",
      colors: ["#d946ef", "#9333ea"]
    },
    {
      name: "Hiking",
      icon: Mountain,
      description: "Outdoor adventures exploring nature trails and scenic landscapes",
      longDescription: "Hiking connects me with nature and provides both physical challenge and mental rejuvenation. I enjoy discovering new trails, from local nature paths to more challenging mountain hikes during travels.",
      details: ["Mountain Trails", "National Parks", "Wildlife Spotting", "Nature Photography", "Camping"],
      related: ["Outdoor Gear", "Trail Maps", "Weather Planning", "Conservation"],
      level: 3,
      gradient: "from-lime-500 to-green-600",
      colors: ["#84cc16", "#16a34a"]
    },
  ];

  // Handle selecting a hobby for detailed view
  const handleCardClick = (hobby) => {
    setExpandedHobby(hobby);
  };

  return (
    <section 
      id="hobbies"
      className="relative py-12"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-1/3 h-48 bg-yellow-500/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-0 w-1/3 h-48 bg-purple-500/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      {/* Section header */}
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="h-px w-6 bg-yellow-500"></div>
          <span className="text-yellow-500 font-medium tracking-wider text-sm">BEYOND CODING</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Hobbies & Interests
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-slate-400 max-w-2xl"
        >
          Life beyond code - exploring diverse interests that fuel creativity, maintain balance,
          and bring joy to everyday experiences.
        </motion.p>
      </div>
      
      {/* Hobby cards grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
      >
        {hobbies.map((hobby, index) => (
          <HobbyCard 
            key={index}
            hobby={hobby}
            isActive={selectedHobby === index}
            onClick={() => handleCardClick(hobby)}
          />
        ))}
      </motion.div>
      
      {/* Expanded hobby view */}
      {expandedHobby && (
        <ExpandedHobbyView 
          hobby={expandedHobby}
          onClose={() => setExpandedHobby(null)}
        />
      )}
    </section>
  );
};

export default Hobbies;