import { map } from "lodash";
import { theme } from "../utils";

const Projects = () => {
  const projects = [
    {
      name: "AI-Powered Dashboard",
      description:
        "React-based analytics platform with real-time data visualization",
      imageSrc: "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Placeholder image URL
      link: "#project1",
    },
    {
      name: "Cloud Microservices Architecture",
      description: "Node.js & Express-based scalable enterprise solution",
      imageSrc: "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Placeholder image URL
      link: "#project2",
    },
    {
      name: "JavaScript Game Engine",
      description: "Custom WebGL-based 2D game framework",
      imageSrc: "https://www.figma.com/community/resource/86e778d8-5df9-4dc7-a4f3-6e6ec0134e6f/thumbnail", // Placeholder image URL
      link: "#project3",
    },
  ];

  return (
    <section id="projects" className="w-full py-12">
      <h2
        className={`
          text-3xl md:text-4xl font-bold text-center mb-8
          ${theme.primary}
        `}
      >
        NOTABLE PROJECTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
        {map(projects,(project, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={project.imageSrc}
              alt={project.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/70 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                {project.name}
              </h3>
              <button
                className={`
                    bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2 px-4 rounded
                    shadow-md hover:shadow-lg transition-colors duration-300
                  `}
              >
                Have a Look
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
