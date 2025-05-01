import { Activity, Code, Cpu, Database, Globe, Layers, Cloud, Terminal, Palette, Box, GitBranch, Monitor, Layout, Workflow, Zap, Star, BookOpen, Brain, Lightbulb, Radar, ArrowLeft, ArrowRight, Trophy, Hammer, Shield, Server, Bolt } from "lucide-react";
import { theme } from "../utils";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Custom skill level indicator component
const SkillLevel = ({ level, color }) => {
  const maxLevel = 5;
  const levels = Array.from({ length: maxLevel }, (_, i) => i < level);
  
  return (
    <div className="flex items-center gap-1 mt-1">
      {levels.map((filled, i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-300 ${filled ? 'w-3' : 'w-2 opacity-40'}`}
          style={{ backgroundColor: filled ? color : '#ffffff' }}
        />
      ))}
    </div>
  );
};

const SkillCard = ({ skill, index, isSelected, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 24,
          delay: index * 0.04
        }
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px ${skill.color}30`
      }}
      onClick={onClick}
      className={`
        relative cursor-pointer
        bg-gradient-to-br from-slate-800 to-slate-900
        p-3 sm:p-4 rounded-xl
        transition-all duration-300 ease-out
        border ${isSelected ? 'border-yellow-400' : 'border-slate-700'}
        overflow-hidden
        flex flex-col items-center
        group
        ${isSelected ? 'ring-2 ring-yellow-500/50' : ''}
      `}
    >
      {/* Skill header with icon */}
      <div className="relative z-10 flex flex-col items-center mb-2">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`
            w-11 h-11 flex items-center justify-center rounded-xl mb-3
            bg-gradient-to-br from-slate-700/80 to-slate-800/80
            shadow-inner border border-slate-700/50
          `}
        >
          <skill.icon 
            className="w-5 h-5" 
            style={{ color: skill.color }}
          />
        </motion.div>
        
        {/* Skill name with gradient text */}
        <h3 
          className="font-bold text-sm sm:text-base mb-0.5 bg-clip-text text-transparent"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${skill.color}, ${skill.secondaryColor || skill.color})` 
          }}
        >
          {skill.name}
        </h3>
        
        {/* Skill level indicator */}
        <SkillLevel level={skill.level} color={skill.color} />
      </div>
      
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${skill.color}60 0%, transparent 70%)`,
          filter: 'blur(10px)'
        }}
      />
    </motion.div>
  );
};

const SkillDetails = ({ skill, onClose }) => {
  if (!skill) return null;
  
  const Icon = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-xl border border-slate-700 mt-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div 
            className="p-2.5 rounded-xl mr-3"
            style={{ 
              backgroundColor: `${skill.color}20`,
              border: `1px solid ${skill.color}40`
            }}
          >
            <Icon className="w-6 h-6" style={{ color: skill.color }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
            <p className="text-slate-400 text-sm">{skill.category}</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Description */}
        <div>
          <h4 className="text-yellow-400 text-sm font-medium mb-2">ABOUT THIS SKILL</h4>
          <p className="text-slate-300 mb-4 text-sm">
            {skill.description}
          </p>
          
          {/* Experience */}
          <div className="flex items-center mb-1.5">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-white text-sm">Experience Level</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${skill.level * 20}%`,
                background: `linear-gradient(to right, ${skill.color}, ${skill.secondaryColor || skill.color})`
              }}
            />
          </div>
          
          {/* Projects count */}
          {skill.projectsCount && (
            <div className="rounded-lg bg-slate-800/50 p-3 flex items-center">
              <Hammer className="w-4 h-4 text-slate-400 mr-2" />
              <span className="text-slate-300 text-sm">Used in <strong className="text-white">{skill.projectsCount}</strong> projects</span>
            </div>
          )}
        </div>
        
        {/* Details */}
        <div>
          {skill.keyPoints && (
            <>
              <h4 className="text-yellow-400 text-sm font-medium mb-2">KEY STRENGTHS</h4>
              <ul className="space-y-2 mb-4">
                {skill.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <Zap className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {/* Related skills */}
          {skill.relatedSkills && (
            <>
              <h4 className="text-yellow-400 text-sm font-medium mb-2">RELATED SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {skill.relatedSkills.map((relatedSkill, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1.5 text-xs rounded-md bg-slate-700/80 text-slate-300"
                  >
                    {relatedSkill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsCarousel = ({ skills, activeCategory, onSelectSkill }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const containerRef = useRef(null);
  
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
    
  const maxStartIndex = Math.max(0, filteredSkills.length - visibleCount);
  
  // Update visible count based on container width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 640) setVisibleCount(6);
        else if (width < 768) setVisibleCount(8);
        else if (width < 1024) setVisibleCount(9);
        else setVisibleCount(12);
      }
    };
    
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);
  
  // Reset start index when category changes
  useEffect(() => {
    setStartIndex(0);
  }, [activeCategory]);
  
  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 4, maxStartIndex));
  };
  
  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 4, 0));
  };
  
  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`
            p-2 rounded-full transition-all duration-200
            ${startIndex === 0 
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-800 text-yellow-500 hover:bg-yellow-500/20'}
          `}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={startIndex >= maxStartIndex}
          className={`
            p-2 rounded-full transition-all duration-200
            ${startIndex >= maxStartIndex 
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-800 text-yellow-500 hover:bg-yellow-500/20'}
          `}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Skills grid */}
      <div 
        ref={containerRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        {filteredSkills
          .slice(startIndex, startIndex + visibleCount)
          .map((skill, index) => (
            <SkillCard
              key={`${skill.name}-${index}`}
              skill={skill}
              index={index}
              isSelected={false}
              onClick={() => onSelectSkill(skill)}
            />
          ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  const skillCategories = [
    { id: "all", name: "All", icon: Zap, color: "#FFD700" },
    { id: "frontend", name: "Frontend", icon: Layout, color: "#38bdf8" },
    { id: "backend", name: "Backend", icon: Terminal, color: "#10b981" },
    { id: "database", name: "Database", icon: Database, color: "#8b5cf6" },
    { id: "tools", name: "Tools & DevOps", icon: GitBranch, color: "#f43f5e" },
    { id: "soft", name: "Soft Skills", icon: Brain, color: "#f97316" },
  ];

  const skills = [
    // Frontend
    { 
      name: "JavaScript", 
      icon: Code, 
      category: "frontend", 
      level: 5,
      color: "#f7df1e",
      secondaryColor: "#f0db4f",
      description: "Expert-level JavaScript developer with deep understanding of language fundamentals, modern ES6+ features, DOM manipulation, and asynchronous programming.",
      keyPoints: [
        "Advanced async patterns using Promises and async/await",
        "Functional programming techniques", 
        "Performance optimization",
        "Deep understanding of the event loop"
      ],
      projectsCount: 15,
      relatedSkills: ["TypeScript", "ES6+", "Node.js", "React", "jQuery"]
    },
    { 
      name: "React", 
      icon: Layers, 
      category: "frontend", 
      level: 5,
      color: "#61dafb", 
      secondaryColor: "#00c2f7",
      description: "Specialized in building complex React applications using modern patterns including hooks, context API, and server components.",
      keyPoints: [
        "Component architecture and reusability",
        "State management with Context API and Redux",
        "Performance optimization techniques",
        "React hooks patterns and custom hooks"
      ],
      projectsCount: 12,
      relatedSkills: ["React Router", "Redux", "Next.js", "React Query"]
    },
    { 
      name: "Next.js", 
      icon: Box, 
      category: "frontend", 
      level: 4,
      color: "#000000", 
      secondaryColor: "#404040"
    },
    { 
      name: "HTML5", 
      icon: Layout, 
      category: "frontend", 
      level: 5,
      color: "#e34f26", 
      secondaryColor: "#f06529"
    },
    { 
      name: "CSS3", 
      icon: Palette, 
      category: "frontend", 
      level: 4,
      color: "#264de4", 
      secondaryColor: "#2965f1"
    },
    { 
      name: "Tailwind", 
      icon: Palette, 
      category: "frontend", 
      level: 5,
      color: "#38bdf8", 
      secondaryColor: "#0ea5e9"
    },
    { 
      name: "TypeScript", 
      icon: Code, 
      category: "frontend", 
      level: 4,
      color: "#3178c6", 
      secondaryColor: "#235a97"
    },
    { 
      name: "Angular", 
      icon: Globe, 
      category: "frontend", 
      level: 3,
      color: "#dd0031", 
      secondaryColor: "#c3002f"
    },
    { 
      name: "Vue.js", 
      icon: Layers, 
      category: "frontend", 
      level: 3,
      color: "#4FC08D", 
      secondaryColor: "#42b883"
    },
    
    // Backend
    { 
      name: "Node.js", 
      icon: Server, 
      category: "backend", 
      level: 5,
      color: "#339933", 
      secondaryColor: "#68a063",
      description: "Extensive experience building server-side applications with Node.js including RESTful APIs, microservices, and real-time systems.",
      keyPoints: [
        "Asynchronous programming patterns",
        "Building scalable architectures",
        "Performance optimization and debugging",
        "Integration with various databases and services"
      ],
      projectsCount: 10,
      relatedSkills: ["Express.js", "Fastify", "Nest.js", "MongoDB", "REST APIs"]
    },
    { 
      name: "Express.js", 
      icon: Cpu, 
      category: "backend", 
      level: 5,
      color: "#000000", 
      secondaryColor: "#404040"
    },
    { 
      name: "Python", 
      icon: Terminal, 
      category: "backend", 
      level: 4,
      color: "#3776ab", 
      secondaryColor: "#ffd343"
    },
    { 
      name: "FastAPI", 
      icon: Bolt, 
      category: "backend", 
      level: 3,
      color: "#009688", 
      secondaryColor: "#00bfa5"
    },
    { 
      name: "GraphQL", 
      icon: Database, 
      category: "backend", 
      level: 4,
      color: "#e535ab", 
      secondaryColor: "#cb2b83"
    },
    
    // Database
    { 
      name: "MongoDB", 
      icon: Database, 
      category: "database", 
      level: 5,
      color: "#47a248", 
      secondaryColor: "#599636",
      description: "Expert in MongoDB database design, query optimization, and advanced features like aggregation pipelines and transactions.",
      keyPoints: [
        "Schema design and data modeling",
        "Complex aggregation pipelines",
        "Performance optimization and indexing",
        "Atlas cloud deployment and management"
      ],
      projectsCount: 8,
      relatedSkills: ["Mongoose", "MongoDB Atlas", "NoSQL", "Aggregation Framework"]
    },
    { 
      name: "MySQL", 
      icon: Database, 
      category: "database", 
      level: 4,
      color: "#4479a1", 
      secondaryColor: "#2b5d83"
    },
    { 
      name: "PostgreSQL", 
      icon: Database, 
      category: "database", 
      level: 4,
      color: "#336791", 
      secondaryColor: "#2a547b"
    },
    { 
      name: "Redis", 
      icon: Database, 
      category: "database", 
      level: 3,
      color: "#dc382d", 
      secondaryColor: "#a41e11"
    },
    { 
      name: "Firebase", 
      icon: Cloud, 
      category: "database", 
      level: 4,
      color: "#ffca28", 
      secondaryColor: "#ffb300"
    },
    
    // Tools & DevOps
    { 
      name: "AWS", 
      icon: Cloud, 
      category: "tools", 
      level: 4,
      color: "#ff9900", 
      secondaryColor: "#ec7211",
      description: "Extensive experience with AWS cloud services for building scalable, secure, and reliable applications and infrastructure.",
      keyPoints: [
        "Serverless architectures with Lambda and API Gateway",
        "Container orchestration with ECS and EKS",
        "Infrastructure as Code using CloudFormation and CDK",
        "CI/CD pipeline design and implementation"
      ],
      projectsCount: 7,
      relatedSkills: ["Lambda", "S3", "EC2", "DynamoDB", "CloudFormation"]
    },
    { 
      name: "Docker", 
      icon: Box, 
      category: "tools", 
      level: 4,
      color: "#2496ed", 
      secondaryColor: "#0db7ed"
    },
    { 
      name: "Git", 
      icon: GitBranch, 
      category: "tools", 
      level: 5,
      color: "#f05032", 
      secondaryColor: "#f14e32"
    },
    { 
      name: "GitHub Actions", 
      icon: Workflow, 
      category: "tools", 
      level: 4,
      color: "#2088ff", 
      secondaryColor: "#0070e0"
    },
    { 
      name: "Kubernetes", 
      icon: Box, 
      category: "tools", 
      level: 3,
      color: "#326ce5", 
      secondaryColor: "#2f5bb7"
    },
    { 
      name: "Terraform", 
      icon: Cloud, 
      category: "tools", 
      level: 3,
      color: "#7b42bc", 
      secondaryColor: "#5c32a8"
    },
    
    // Soft Skills
    { 
      name: "Problem Solving", 
      icon: Lightbulb, 
      category: "soft", 
      level: 5,
      color: "#fbbf24", 
      secondaryColor: "#f59e0b",
      description: "Exceptional problem-solving abilities with a methodical approach to breaking down complex challenges into manageable components.",
      keyPoints: [
        "Analytical thinking and systematic approach",
        "Creative solutions to difficult problems",
        "Debugging and troubleshooting expertise",
        "Algorithm design and optimization"
      ]
    },
    { 
      name: "Communication", 
      icon: Globe, 
      category: "soft", 
      level: 5,
      color: "#3b82f6", 
      secondaryColor: "#2563eb"
    },
    { 
      name: "Leadership", 
      icon: Star, 
      category: "soft", 
      level: 4,
      color: "#ec4899", 
      secondaryColor: "#db2777"
    },
    { 
      name: "Agile Methodologies", 
      icon: Radar, 
      category: "soft", 
      level: 4,
      color: "#8b5cf6", 
      secondaryColor: "#7c3aed"
    },
    { 
      name: "Technical Writing", 
      icon: BookOpen, 
      category: "soft", 
      level: 4,
      color: "#10b981", 
      secondaryColor: "#059669"
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-8 pb-16"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-500/5 rounded-full filter blur-[80px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/5 bg-blue-500/5 rounded-full filter blur-[60px] -z-10" />
      
      {/* Section title */}
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="h-px w-6 bg-yellow-500" />
          <span className="text-yellow-500 font-medium text-sm tracking-wider">EXPERTISE</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white"
        >
          Skills & Technologies
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-3 text-slate-400 max-w-2xl"
        >
          A curated collection of skills I've developed throughout my career, 
          specialized in full-stack web development with a focus on modern JavaScript technologies.
        </motion.p>
      </div>
      
      {/* Skill categories */}
      <div className="overflow-x-auto pb-2 mb-6">
        <div className="flex gap-2 min-w-max">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedSkill(null);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full 
                  font-medium text-sm transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-700/20' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'}
                `}
              >
                <Icon 
                  className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} 
                  style={isActive ? {} : { color: category.color }}
                />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Skills carousel grid */}
      <SkillsCarousel 
        skills={skills}
        activeCategory={activeCategory}
        onSelectSkill={setSelectedSkill}
      />
      
      {/* Selected skill details */}
      {selectedSkill && (
        <SkillDetails 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
      
      {/* Progress bar - illustration of skill improvement over time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 bg-slate-800/50 p-5 rounded-xl border border-slate-700/50"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
          <div>
            <h3 className="text-white font-bold text-lg">Continuous Learning Journey</h3>
            <p className="text-slate-400 text-sm">Tracking progress and skill development over time</p>
          </div>
          
          <div className="bg-slate-900/70 rounded-lg p-1.5">
            <div className="flex text-xs">
              <span className="px-3 py-1 rounded-md bg-yellow-500 text-slate-900 font-medium">2023</span>
              <span className="px-3 py-1 text-slate-400">2024</span>
              <span className="px-3 py-1 text-slate-400">2025</span>
            </div>
          </div>
        </div>
        
        {/* Skill growth visualization */}
        <div className="space-y-4">
          {["Frontend", "Backend", "Database", "DevOps"].map((area, i) => (
            <div key={area} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{area}</span>
                <span className="text-yellow-500 font-medium">
                  {85 - i * 8}%
                </span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r"
                  style={{ 
                    width: `${85 - i * 8}%`,
                    backgroundImage: i === 0 
                      ? 'linear-gradient(to right, #f59e0b, #f97316)' 
                      : i === 1 
                        ? 'linear-gradient(to right, #10b981, #059669)' 
                        : i === 2 
                          ? 'linear-gradient(to right, #8b5cf6, #6d28d9)' 
                          : 'linear-gradient(to right, #3b82f6, #2563eb)'
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${85 - i * 8}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;