import { Activity, Code, Cpu, Database, Globe, Layers, Cloud, Terminal, Palette, Box, GitBranch, Monitor, Layout, Workflow } from "lucide-react";
import { theme } from "../utils";
import { motion } from "framer-motion";
import { useState } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    { id: "all", name: "All Skills", icon: Layers, color: "#FFD700" },
    { id: "frontend", name: "Frontend", icon: Layout, color: "#00ff87" },
    { id: "backend", name: "Backend", icon: Terminal, color: "#ff4757" },
    { id: "database", name: "Database", icon: Database, color: "#2ed573" },
    { id: "tools", name: "Tools & DevOps", icon: GitBranch, color: "#1e90ff" },
  ];

  const skills = [
    // Frontend
    { name: "JavaScript", icon: Code, category: "frontend", color: "#f7df1e" },
    { name: "React", icon: Layers, category: "frontend", color: "#61dafb" },
    { name: "Next.js", icon: Box, category: "frontend", color: "#000000" },
    { name: "HTML5", icon: Layout, category: "frontend", color: "#e34f26" },
    { name: "CSS3", icon: Palette, category: "frontend", color: "#264de4" },
    { name: "Tailwind", icon: Palette, category: "frontend", color: "#38bdf8" },
    
    // Backend
    { name: "Node.js", icon: Terminal, category: "backend", color: "#339933" },
    { name: "Express.js", icon: Cpu, category: "backend", color: "#000000" },
    { name: "Python", icon: Terminal, category: "backend", color: "#3776ab" },
    
    // Database
    { name: "MongoDB", icon: Database, category: "database", color: "#47a248" },
    { name: "MySQL", icon: Database, category: "database", color: "#4479a1" },
    { name: "RethinkDB", icon: Database, category: "database", color: "#273238" },
    { name: "Firebase", icon: Cloud, category: "database", color: "#ffca28" },
    
    // Tools & DevOps
    { name: "AWS", icon: Cloud, category: "tools", color: "#ff9900" },
    { name: "Docker", icon: Box, category: "tools", color: "#2496ed" },
    { name: "Git", icon: GitBranch, category: "tools", color: "#f05032" },
    { name: "Figma", icon: Palette, category: "tools", color: "#f24e1e" },
    { name: "Jira", icon: Workflow, category: "tools", color: "#0052cc" },
    { name: "MS Office", icon: Monitor, category: "tools", color: "#d83b01" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className={`
        bg-slate-800/90 p-4 md:p-6 rounded-xl
        border ${theme.border}
        shadow-xl ${theme.shadow}
      `}
    >
      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`
          text-xl md:text-3xl flex items-center gap-2 md:gap-4 mb-6
          ${theme.primary} font-bold
        `}
      >
        <Activity className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
        SKILLS & EXPERTISE
      </motion.h2>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                transition-all duration-300
                ${activeCategory === category.id 
                  ? 'bg-yellow-500 text-slate-900 shadow-lg' 
                  : 'bg-slate-700 text-yellow-500 hover:bg-slate-600'}
              `}
            >
              <Icon className="w-4 h-4" style={{ color: category.color }} />
              {category.name}
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className={`
              relative bg-slate-700/50 p-3 rounded-lg
              shadow-lg hover:shadow-yellow-500/30
              transition-all duration-300
              border border-slate-600/50
              overflow-hidden
              group
            `}
          >
            {/* Background Glow Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ 
                background: `radial-gradient(circle at center, ${skill.color}, transparent)` 
              }}
            />
            
            {/* Skill Content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className="mb-2 p-2 bg-slate-800 rounded-lg shadow-inner"
              >
                <skill.icon 
                  className="w-5 h-5" 
                  style={{ color: skill.color }}
                />
              </motion.div>
              
              {/* Skill Name */}
              <strong className="text-center text-sm" style={{ color: skill.color }}>
                {skill.name}
              </strong>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;