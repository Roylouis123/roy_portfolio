import { map } from "lodash";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNodeJs, faJs, faPython, faJava, faAws } from "@fortawesome/free-brands-svg-icons";
import { Code, CodeSquare, Globe, Database, ArrowRight, ExternalLink, Zap } from "lucide-react";
import { theme } from "../utils";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container with 3D effect */}
      <div 
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-yellow-500/20 h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "perspective(1000px) rotateY(5deg)" : "perspective(1000px) rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Card header/media */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90 z-10"></div>
          
          {/* Project image */}
          <img
            src={project.imageSrc}
            alt={project.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out scale-100 group-hover:scale-110"
          />
          
          {/* Project badge (top left) */}
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300">
              {project.category || "Project"}
            </span>
          </div>
          
          {/* Project name overlay */}
          <div className="absolute bottom-0 left-0 w-full z-20 p-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 transition-transform duration-300 group-hover:translate-y-[-5px]">
              {project.name}
            </h3>
            
            {/* Technology icons */}
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.map((icon, techIndex) => (
                <span 
                  key={techIndex} 
                  className="bg-slate-800/80 backdrop-blur-sm p-1.5 rounded-md text-yellow-400 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Card body/content */}
        <div className="p-5">
          <p className="text-slate-300 text-sm mb-4">
            {project.description}
          </p>
          
          {/* Key features */}
          <div className="space-y-2 mb-5">
            {project.features && project.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5">
                  <Zap className="h-4 w-4" />
                </span>
                <span className="text-slate-400 text-xs">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div 
            className="mt-auto pt-2 border-t border-slate-700/50 flex justify-between items-center"
          >
            <a 
              href={project.link} 
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm"
            >
              Explore Project
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
            
            {project.liveDemo && (
              <a 
                href={project.liveDemo} 
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 transform rotate-45 translate-x-5 -translate-y-3 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg"></div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  
  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "backend", label: "Backend" }
  ];
  
  // No video preloading needed
  
  const projects = [
    {
      name: "AI Analytics Dashboard",
      category: "Web",
      description: "Interactive data visualization platform with real-time analytics and AI-powered insights",
      features: [
        "Real-time data processing pipeline",
        "Interactive dashboard with D3.js visualizations",
        "Machine learning model integration"
      ],
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#project1",
      liveDemo: "#live-demo-1",
      technologies: [faReact, faJs, faAws],
      type: "web"
    },
    {
      name: "Microservices Architecture",
      category: "Backend",
      description: "Scalable enterprise solution with distributed systems and cloud infrastructure",
      features: [
        "Event-driven architecture with Kafka",
        "Docker containerization & Kubernetes",
        "CI/CD pipeline with automated testing"
      ],
      imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      link: "#project2",
      technologies: [faNodeJs, faAws, faJava],
      type: "backend"
    },
    {
      name: "WebGL Game Engine",
      category: "Game Dev",
      description: "High-performance 2D/3D game framework with modern rendering techniques",
      features: [
        "Custom shader pipeline for visual effects",
        "Physics engine integration",
        "Asset management system"
      ],
      imageSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      link: "#project3",
      liveDemo: "#live-demo-3",
      technologies: [faJs, faPython],
      type: "web"
    },
    {
      name: "Mobile Healthcare App",
      category: "Mobile",
      description: "Cross-platform mobile application for healthcare professionals with secure patient data management",
      features: [
        "End-to-end encryption for patient data",
        "Offline-first architecture",
        "Biometric authentication"
      ],
      imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      link: "#project4",
      liveDemo: "#live-demo-4",
      technologies: [faReact, faJs],
      type: "mobile"
    },
    {
      name: "E-Commerce Platform",
      category: "Web",
      description: "Comprehensive online shopping solution with inventory management and payment processing",
      features: [
        "Stripe and PayPal integration",
        "Inventory management system",
        "Advanced product search and filtering"
      ],
      imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1978&auto=format&fit=crop",
      link: "#project5",
      technologies: [faReact, faNodeJs],
      type: "web"
    },
    {
      name: "Machine Learning API",
      category: "Backend",
      description: "Scalable machine learning inference API with model versioning and performance monitoring",
      features: [
        "Auto-scaling deployment architecture",
        "Model versioning and A/B testing",
        "Real-time performance monitoring"
      ],
      imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1974&auto=format&fit=crop",
      link: "#project6",
      liveDemo: "#live-demo-6",
      technologies: [faPython, faAws],
      type: "backend"
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative pt-6 pb-12"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-yellow-500/5 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/3 w-1/4 h-32 bg-yellow-400/10 rounded-full filter blur-[50px]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,215,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
      </div>
      
      {/* Section header */}
      <div className="relative mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-yellow-500/70"></div>
              <span className="text-yellow-500 uppercase text-sm font-medium tracking-wider">My Work</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            
            <p className="text-slate-400 max-w-2xl">
              A collection of my most significant work showcasing my skills in full-stack development, 
              cloud architecture, and innovative problem-solving.
            </p>
          </div>
          
          {/* Project filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
