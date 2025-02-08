import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Briefcase, Building, Calendar, MapPin, Star, 
  ChevronRight, Award, Link, Code, Zap, 
  CornerUpRightIcon
} from 'lucide-react';
import { theme } from '../utils';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.index]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.experience-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const experienceData = [
    {
      company: 'Cyient',
      icon: <Code className="w-6 h-6" />,
      location: 'Hyderabad',
      role: 'Technical Developer',
      startDate: '2021',
      endDate: '2023',
      description: 'Worked on enterprise solutions and gained experience in full-stack development.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      highlights: [
        'Led team of 5 developers',
        'Improved performance by 40%',
        'Implemented CI/CD pipeline'
      ],
      achievements: [
        { icon: <Award />, text: 'Best Developer 2022' },
        { icon: <Zap />, text: 'Performance Champion' }
      ]
    },
    {
      company: 'Ariveguru Technologies Pvt Ltd',
      icon: <Link className="w-6 h-6" />,
      location: 'Bangalore',
      role: 'Full Stack Developer',
      startDate: '2023',
      endDate: 'Present',
      description: 'Developing scalable web applications and leading front-end architecture.',
      skills: ['Next.js', 'TypeScript', 'GraphQL', 'Docker'],
      highlights: [
        'Architecture modernization',
        'Reduced loading time by 60%',
        'Mentored junior developers'
      ],
      achievements: [
        { icon: <Star />, text: 'Innovation Award' },
        { icon: <Building />, text: 'Tech Lead Excellence' }
      ]
    }
  ];

  return (
    <section className={`
            bg-slate-800/90 p-6 md:p-10 rounded-xl
            border ${theme.border}
            shadow-xl ${theme.shadow}
            transform
          `}>
                    {/* Animated Header */}
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="p-2 bg-slate-800 rounded-lg"
          >
            <CornerUpRightIcon className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Professional Journey</h2>
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto">


        <div className="relative space-y-32">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full">
            <div className="w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full">
              <div className="absolute top-0 left-0 w-full h-1/3 animate-pulse bg-white/20 rounded-full" />
            </div>
          </div>

          {experienceData.map((exp, index) => (
            <div
              key={index}
              data-index={index}
              className={`experience-card relative md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
              } ${isVisible[index] ? 'animate-fade-in-up' : 'opacity-0'}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Connector Line */}
              <div className={`absolute top-10 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                ${index % 2 === 0 ? 'right-full md:w-8' : 'left-full md:w-8'} hidden md:block`}>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-white/20" />
              </div>

              {/* Experience Card */}
              <div className="relative group perspective-1000">
                <div className={`relative bg-slate-800/90 p-6 md:p-8 rounded-2xl border border-yellow-500/20 
                  backdrop-blur-sm transform transition-all duration-500 
                  hover:scale-105 hover:rotate-y-10 ${
                    activeIndex === index ? 'shadow-2xl shadow-yellow-500/20' : ''
                  }`}>
                  {/* Floating Company Badge */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 
                    rounded-xl flex items-center justify-center transform 
                    group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    {exp.icon}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                      {exp.company}
                    </h3>

                    {/* Role and Location */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{exp.role}</span>
                      </div>
                      <span className="hidden md:block text-yellow-500/50">•</span>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{exp.startDate} - {exp.endDate}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 
                            border border-yellow-500/20 rounded-full text-yellow-400 transform hover:scale-105 
                            transition-transform duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-300 group/item"
                        >
                          <ChevronRight className="w-4 h-4 text-yellow-400 transform transition-transform 
                            group-hover/item:translate-x-1" />
                          <span className="group-hover/item:text-yellow-400 transition-colors duration-300">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {exp.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400/5 to-red-500/5 
                            rounded-lg border border-yellow-500/10 group/achievement"
                        >
                          <div className="text-yellow-400 group-hover/achievement:scale-110 transition-transform duration-300">
                            {achievement.icon}
                          </div>
                          <span className="text-sm text-gray-300">{achievement.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;