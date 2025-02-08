import { Activity, Code, Cpu, Globe, Layers, Network, SkullIcon, Zap } from "lucide-react";
import { theme } from "../utils";
import { map } from "lodash";

const Skills = () => {
  const skills = [
    { name: "JavaScript", icon: Code, description: "Core Language" },
    { name: "React", icon: Layers, description: "UI Framework" },
    { name: "Node.js", icon: Network, description: "Backend Runtime" },
    { name: "Express.js", icon: Cpu, description: "Web Framework" },
    { name: "MongoDB", icon: Globe, description: "Database" },
    { name: "REST APIs", icon: Activity, description: "API Design" },
  ];

  return (
    <section
      id="skills"
      className={`
        bg-slate-800/90 p-6 md:p-8 rounded-xl
        border ${theme.border}
        shadow-xl ${theme.shadow}
        transform hover:scale-105 transition-all duration-300
      `}
    >
      <h2
        className={`
          text-xl md:text-3xl flex items-center gap-2 md:gap-4 mb-6
          ${theme.primary}
        `}
      >
        <Zap className="w-6 h-6 md:w-8 md:h-8" />
        SKILLS & EXPERTISE
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {map(skills, (skill, index) => (
          <div
            key={index}
            className="bg-slate-700/50 p-4 rounded-lg shadow-md hover:shadow-yellow-500/30 transition-all flex flex-col items-center justify-center"
          >
            <SkullIcon className="w-8 h-8 text-yellow-400 mb-2" />
            <strong className="text-yellow-300">{skill.name}</strong>
            <p className="text-gray-300 text-sm text-center">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
