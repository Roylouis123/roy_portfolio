import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Building, Calendar, MapPin, Star, 
  ChevronRight, Award, Link, Code, Zap, 
  CornerRightDown, GitBranch, Rocket, BarChart,
  Check, Timer, Users, Shield, ExternalLink, Sparkles, CircleDollarSign
} from 'lucide-react';
import { theme } from '../utils';

// Timeline dot component with animation
const TimelineDot = ({ active, index, onClick }) => {
  return (
    <motion.div 
      className={`
        w-5 h-5 rounded-full cursor-pointer relative z-10
        transition-all duration-300 ease-out
        ${active ? 'scale-125' : 'hover:scale-110'}
      `}
      style={{
        background: active 
          ? 'linear-gradient(135deg, #f59e0b, #ec4899)' 
          : 'linear-gradient(135deg, #f59e0b40, #ec489940)',
        boxShadow: active 
          ? '0 0 0 3px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.5)' 
          : '0 0 0 2px rgba(245, 158, 11, 0.1)'
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {active && (
        <motion.div 
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ background: 'linear-gradient(135deg, #f59e0b30, #ec489930)' }}
        />
      )}
    </motion.div>
  );
};

// Skill tag with animated gradient
const SkillTag = ({ name }) => {
  return (
    <motion.span
      className="inline-flex px-3 py-1.5 text-xs font-medium rounded-full relative overflow-hidden"
      whileHover={{ scale: 1.05, y: -2 }}
      style={{
        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.1))',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        color: '#fbbf24'
      }}
    >
      <span className="relative z-10">{name}</span>
      <motion.div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to right, rgba(251, 191, 36, 0.15), rgba(236, 72, 153, 0.15))',
        }}
        animate={{
          x: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.span>
  );
};

const Experience = () => {
  // Set the current company (index 1 - Ariveguru Technologies) as default
  const [activeExperience, setActiveExperience] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const containerRef = useRef(null);
  
  // Enhanced experience data with additional details and metrics
  const experienceData = [
    {
      id: 'cyient',
      company: 'Cyient',
      logo: '/placeholder-logo.svg',  // If you want to add actual logos later
      icon: Code,
      color: '#4f46e5',
      secondaryColor: '#8b5cf6',
      location: 'Hyderabad',
      role: 'Technical Developer',
      department: 'Enterprise Solutions',
      startDate: '2021',
      endDate: '2023',
      duration: '2 years',
      description: 'Led development of enterprise solutions with focus on scalability and performance optimization, implementing modern architecture patterns while mentoring junior developers.',
      longDescription: 'As a Technical Developer at Cyient, I was responsible for designing and implementing full-stack solutions for enterprise clients. I focused on creating scalable architectures, optimizing performance, and ensuring high code quality through CI/CD implementation. Additionally, I led a team of developers and contributed to knowledge sharing across the organization.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'CI/CD'],
      highlights: [
        { 
          icon: Users, 
          text: 'Led team of 5 developers for cross-functional projects',
          color: '#4f46e5'
        },
        { 
          icon: BarChart, 
          text: 'Improved application performance by 40% through code optimization',
          color: '#06b6d4'
        },
        { 
          icon: GitBranch, 
          text: 'Implemented CI/CD pipeline reducing deployment time by 60%',
          color: '#ec4899'
        },
        { 
          icon: Shield, 
          text: 'Enhanced security protocols for sensitive financial data',
          color: '#10b981'
        }
      ],
      achievements: [
        { icon: Award, text: 'Best Developer 2022', color: '#f59e0b' },
        { icon: Zap, text: 'Performance Champion', color: '#06b6d4' }
      ],
      metrics: [
        { label: 'Projects Delivered', value: '12', icon: Rocket },
        { label: 'Code Quality Score', value: '94%', icon: Check },
        { label: 'Team Size', value: '5', icon: Users }
      ]
    },
    {
      id: 'ariveguru',
      company: 'Ariveguru Technologies',
      logo: '/placeholder-logo.svg',
      icon: Rocket,
      color: '#06b6d4',
      secondaryColor: '#0ea5e9',
      location: 'Bangalore',
      role: 'Full Stack Developer',
      department: 'Product Development',
      startDate: '2023',
      endDate: 'Present',
      duration: '1+ years',
      description: 'Developing innovative web applications with cutting-edge technologies while leading front-end architecture initiatives and mentoring team members.',
      longDescription: 'At Ariveguru Technologies, I\'ve been responsible for building and maintaining scalable web applications using modern JavaScript frameworks. I\'ve led front-end architecture decisions, implemented performance optimizations, and worked closely with design and product teams to deliver exceptional user experiences. I also mentor junior developers and contribute to technical documentation and knowledge sharing.',
      skills: ['Next.js', 'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Tailwind CSS'],
      highlights: [
        { 
          icon: Rocket, 
          text: 'Led architecture modernization initiative for flagship product',
          color: '#0ea5e9'
        },
        { 
          icon: Timer, 
          text: 'Reduced page loading time by 60% through code optimization',
          color: '#10b981'
        },
        { 
          icon: Users, 
          text: 'Mentored 4 junior developers through structured program',
          color: '#f59e0b'
        },
        { 
          icon: CircleDollarSign, 
          text: 'Implemented features increasing revenue by 25%',
          color: '#8b5cf6'
        }
      ],
      achievements: [
        { icon: Sparkles, text: 'Innovation Award', color: '#0ea5e9' },
        { icon: Building, text: 'Tech Lead Excellence', color: '#8b5cf6' }
      ],
      metrics: [
        { label: 'Feature Delivery', value: '35+', icon: Rocket },
        { label: 'Code Reviews', value: '120+', icon: GitBranch },
        { label: 'Uptime', value: '99.9%', icon: Timer }
      ]
    }
  ];

  const handleTimelineClick = (index) => {
    setActiveExperience(index);
  };
  
  const handleCardMouseEnter = (index) => {
    setHoverIndex(index);
    setIsAnyCardHovered(true);
  };
  
  const handleCardMouseLeave = () => {
    setHoverIndex(null);
    setIsAnyCardHovered(false);
  };

  return (
    <section 
      id="experience"
      className="relative py-16 overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-10 w-1/3 h-1/4 bg-gradient-to-br from-yellow-500/5 to-pink-500/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-10 w-1/4 h-1/3 bg-gradient-to-br from-yellow-500/5 to-purple-500/5 rounded-full blur-[100px]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>
      
      {/* Section header */}
      <div className="mb-16 text-center sm:text-left">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-2 justify-center sm:justify-start"
        >
          <div className="h-px w-6 bg-yellow-500"></div>
          <span className="text-yellow-500 font-medium tracking-wider text-sm">WORK HISTORY</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Professional Journey
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-slate-400 max-w-2xl mx-auto sm:mx-0"
        >
          A timeline of my career highlighting key roles, skills and accomplishments that 
          have shaped my professional development.
        </motion.p>
      </div>
      
      {/* Interactive Timeline */}
      <div className="flex flex-col gap-8 items-start">
        {/* Timeline Navigation - Horizontal Row */}
        <div className="w-full mb-8 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {experienceData.map((exp, index) => (
              <motion.div 
                key={index} 
                className={`
                  relative cursor-pointer rounded-xl border transition-all duration-300 ease-out flex-1 min-w-[200px]
                  ${activeExperience === index 
                    ? 'border-yellow-500/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg' 
                    : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/70'}
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTimelineClick(index)}
              >
                <div 
                  className="p-4 relative overflow-hidden"
                  style={{
                    background: activeExperience === index 
                      ? `radial-gradient(circle at 15% 50%, ${exp.color}15, transparent 50%),
                         radial-gradient(circle at 85% 30%, ${exp.secondaryColor}10, transparent 50%)`
                      : 'none'
                  }}
                >
                  {/* Current indicator */}
                  {exp.endDate === 'Present' && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                      <span className="text-[10px] text-yellow-500 font-medium">Current</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    {/* Company Icon */}
                    <div 
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${activeExperience === index 
                          ? 'bg-gradient-to-br' 
                          : 'bg-slate-700/50'}
                      `}
                      style={{
                        background: activeExperience === index 
                          ? `linear-gradient(135deg, ${exp.color}30, ${exp.secondaryColor}30)`
                          : undefined,
                        boxShadow: activeExperience === index 
                          ? `0 4px 12px ${exp.color}20`
                          : undefined
                      }}
                    >
                      {React.createElement(exp.icon, {
                        className: "w-5 h-5",
                        style: { color: activeExperience === index ? exp.color : '#fbbf24' }
                      })}
                    </div>
                    
                    <div>
                      {/* Year */}
                      <div className="text-xs text-yellow-500 font-medium mb-1">
                        {exp.startDate} — {exp.endDate}
                      </div>
                      
                      {/* Company */}
                      <h3 className={`text-base font-bold transition-colors duration-300 ${activeExperience === index ? 'text-white' : 'text-slate-300'}`}>
                        {exp.company}
                      </h3>
                      
                      {/* Role */}
                      <p className={`text-xs transition-colors duration-300 ${activeExperience === index ? 'text-slate-300' : 'text-slate-400'}`}>
                        {exp.role}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Active indicator line */}
                {activeExperience === index && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Experience Card Detail */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden"
            >
              {/* Company & Role Header */}
              <div 
                className="relative p-6 sm:p-8 border-b border-slate-700/50"
                style={{
                  background: `linear-gradient(to right, rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 0.5)), 
                              radial-gradient(circle at 15% 50%, ${experienceData[activeExperience].color}15, transparent 25%),
                              radial-gradient(circle at 85% 30%, ${experienceData[activeExperience].secondaryColor}10, transparent 25%)`
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  {/* Company Icon */}
                  <div 
                    className="w-16 h-16 flex items-center justify-center rounded-xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${experienceData[activeExperience].color}30, ${experienceData[activeExperience].secondaryColor}30)`,
                      boxShadow: `0 8px 20px ${experienceData[activeExperience].color}20`
                    }}
                  >
                    {React.createElement(experienceData[activeExperience].icon, {
                      className: "w-8 h-8",
                      style: { color: experienceData[activeExperience].color }
                    })}
                  </div>
                  
                  {/* Company & Role */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {experienceData[activeExperience].company}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-yellow-500" />
                        <span>{experienceData[activeExperience].role}</span>
                      </div>
                      
                      <span className="hidden sm:block text-slate-500">•</span>
                      
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-yellow-500" />
                        <span>{experienceData[activeExperience].location}</span>
                      </div>
                      
                      <span className="hidden sm:block text-slate-500">•</span>
                      
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-yellow-500" />
                        <span>{experienceData[activeExperience].duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience Content */}
              <div className="p-6 sm:p-8">
                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-3">About the Role</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {experienceData[activeExperience].longDescription}
                  </p>
                </div>
                
                {/* Key metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {experienceData[activeExperience].metrics.map((metric, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${experienceData[activeExperience].color}20, ${experienceData[activeExperience].secondaryColor}10)`,
                          }}
                        >
                          {React.createElement(metric.icon, {
                            className: "w-5 h-5",
                            style: { color: experienceData[activeExperience].color }
                          })}
                        </div>
                        
                        <div>
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-slate-400">{metric.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Key Highlights */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Highlights</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {experienceData[activeExperience].highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-300 hover:bg-slate-800/50"
                      >
                        <div 
                          className="p-1.5 rounded-lg mt-0.5"
                          style={{
                            background: `${highlight.color}15`,
                          }}
                        >
                          {React.createElement(highlight.icon, {
                            className: "w-4 h-4",
                            style: { color: highlight.color }
                          })}
                        </div>
                        
                        <p className="text-sm text-slate-300">
                          {highlight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Technologies & Skills */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Technologies & Skills</h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {experienceData[activeExperience].skills.map((skill, idx) => (
                      <SkillTag key={idx} name={skill} />
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Achievements</h4>
                  
                  <div className="flex flex-wrap gap-3">
                    {experienceData[activeExperience].achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/70 border border-slate-700/50 transition-colors duration-300"
                        style={{
                          background: `linear-gradient(to right, ${achievement.color}10, transparent)`
                        }}
                      >
                        {React.createElement(achievement.icon, {
                          className: "w-4 h-4",
                          style: { color: achievement.color }
                        })}
                        <span className="text-sm text-slate-300">{achievement.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Additional decorative element */}
      <div className="absolute bottom-0 right-20 w-20 h-20 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(255, 215, 0, 0.5)" d="M44.3,-51.5C59.9,-37.7,76.5,-25.5,80.5,-10.2C84.5,5.1,76.1,23.5,63.5,37.4C51,51.2,34.3,60.5,16.2,66.4C-1.8,72.3,-21.2,74.7,-36.8,67.5C-52.5,60.3,-64.3,43.5,-71.4,24.4C-78.4,5.2,-80.7,-16.3,-72.9,-32.9C-65.1,-49.5,-47.2,-61.3,-30.3,-74.5C-13.5,-87.7,3.3,-102.4,15.8,-97.1C28.2,-91.8,36.2,-66.6,44.3,-51.5Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};

export default Experience;