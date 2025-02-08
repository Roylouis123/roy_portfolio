import { Activity, BluetoothConnectedIcon, Code, Globe, Network } from "lucide-react";
import { theme } from "../utils";

const Contact = () => {
  return (
    <section
      id="contact"
      className={`
            bg-slate-800/90 p-6 md:p-8 rounded-xl
            border ${theme.border}
            shadow-xl ${theme.shadow}
          `}
    >
      <h2
        className={`
              text-xl md:text-3xl flex items-center gap-2 md:gap-4 mb-6
              ${theme.primary}
            `}
      >
        <Network className="w-6 h-6 md:w-8 md:h-8" />
        CONNECT
      </h2>
      <div className="flex justify-center gap-6 md:gap-8">
        {[
          {
            name: "Email",
            link: "mailto:roylouis17@gmail.com",
            icon: Code,
          },
          {
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/royston-louis-5454881b4/",
            icon: Globe,
          },
          {
            name: "Twitter",
            link: "https://twitter.com/@roylouis123",
            icon: Activity,
          },
        ].map((connection) => (
          <a
            key={connection.name}
            href={connection.link}
            className={`
                  bg-slate-700 p-4 rounded-full
                  hover:scale-110 transition-all duration-300
                  shadow-lg hover:shadow-yellow-500/50
                `}
          >
            <BluetoothConnectedIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
