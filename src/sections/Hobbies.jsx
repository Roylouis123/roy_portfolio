import { map } from "lodash";
import { Accessibility, Book, Code, Gamepad2 } from "lucide-react";
import { theme } from "../utils";

const Hobbies = () => {
  const hobbies = [
    { name: "Gaming", icon: Gamepad2, description: "PC & Console" },
    { name: "Reading", icon: Book, description: "Sci-Fi & Fantasy" },
    { name: "Coding", icon: Code, description: "Personal Projects" },
  ];

  return (
    <section
      id="hobbies"
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
        <Gamepad2 className="w-6 h-6 md:w-8 md:h-8" />
        HOBBIES & INTERESTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {map(hobbies, (hobby, index) => (
          <div
            key={index}
            className="bg-slate-700/50 p-4 rounded-lg shadow-md hover:shadow-yellow-500/30 transition-all flex flex-col items-center justify-center"
          >
            <Accessibility className="w-8 h-8 text-yellow-400 mb-2" />
            <strong className="text-yellow-300">{hobby.name}</strong>
            <p className="text-gray-300 text-sm text-center">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
