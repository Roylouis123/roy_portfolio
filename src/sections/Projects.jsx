import { map } from "lodash";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNodeJs, faJs } from "@fortawesome/free-brands-svg-icons"; // Example icons - install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
import { ChartBar, GitGraph } from "lucide-react";
import { theme } from "../utils";

const Projects = () => {
  const projects = [
    {
      name: "AI-Powered Dashboard",
      description:
        "React-based analytics platform with real-time data visualization",
      imageSrc:
        "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Replace with actual image path in your public/images folder or use URL
      link: "#project1",
      technologies: [faReact], // Add relevant icons
    },
    {
      name: "Cloud Microservices Architecture",
      description: "Node.js & Express-based scalable enterprise solution",
      imageSrc:
        "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Replace with actual image path
      link: "#project2",
      technologies: [faNodeJs], // Add relevant icons
    },
    {
      name: "JavaScript Game Engine",
      description: "Custom WebGL-based 2D game framework",
      imageSrc:
        "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Replace with actual image path
      link: "#project3",
      technologies: [faJs], // Add relevant icons
    },
  ];

  return (
    <section id="projects" className={`
            bg-slate-800/90 p-6 md:p-10 rounded-xl
            border ${theme.border}
            shadow-xl ${theme.shadow}
          `}>
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
            <ChartBar className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">PROJECTS</h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
        {map(projects, (project, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group" // Added 'group' class for group-hover effect
          >
            <img
              src={project.imageSrc}
              alt={project.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" // Zoom effect on hover
            />
            <div className="absolute inset-0 bg-slate-900/80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {" "}
              {/* Adjusted opacity and added group-hover */}
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-300 px-4 text-center mb-4">
                {project.description}
              </p>{" "}
              {/* Added description in overlay */}
              <div className="flex space-x-2 mb-4">
                {" "}
                {/* Technology icons */}
                {project.technologies &&
                  project.technologies.map((icon, iconIndex) => (
                    <FontAwesomeIcon
                      key={iconIndex}
                      icon={icon}
                      className="text-yellow-300 text-lg"
                    />
                  ))}
              </div>
              <button
                className={`
                  bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2 px-4 rounded
                  shadow-md hover:shadow-lg transition-colors duration-300
                `}
              >
                Learn More {/* Changed button text */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
