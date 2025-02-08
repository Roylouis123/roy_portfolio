import { Activity, Mail, Linkedin, Network, Github, MessageCircle, Send } from "lucide-react";
import { theme } from "../utils";
import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className={`
        bg-slate-800/90 p-6 md:p-8 rounded-xl
        border ${theme.border}
        shadow-xl ${theme.shadow}
        relative overflow-hidden // For background animation positioning
      `}
    >
      {/* Animated Background (Example - you might need a particle library) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-20 animate-pulse-bg"></div>

      <h2
        className={`
            text-xl md:text-3xl flex items-center gap-2 md:gap-4 mb-8
            ${theme.primary} relative z-10 // Ensure text is above background
          `}
      >
        <Network className="w-6 h-6 md:w-8 md:h-8" />
        CONNECT
      </h2>

      <div className="relative z-10 flex justify-center items-center">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            {
              name: "Email",
              link: "mailto:roylouis17@gmail.com",
              icon: Mail,
            },
            {
              name: "LinkedIn",
              link: "https://www.linkedin.com/in/royston-louis-5454881b4/",
              icon: Linkedin,
            },
            {
              name: "Twitter",
              link: "https://twitter.com/@roylouis123",
              icon: Activity,
            },
            {
              name: "GitHub",
              link: "https://github.com/yourusername",
              icon: Github,
            },
            {
              name: "WhatsApp",
              link: "https://wa.me/yournumber",
              icon: MessageCircle,
            },
            {
              name: "Telegram",
              link: "https://t.me/yourusername",
              icon: Send,
            }
          ].map((connection) => (
            <a
              key={connection.name}
              href={connection.link}
              className={`
                  relative
                  group // For group-hover effects
                `}
            >
              <div
                className={`
                    bg-slate-700 p-5 rounded-full
                    hover:scale-110 transition-transform duration-300
                    shadow-lg group-hover:shadow-yellow-500/50
                    hover:animate-none // Disable default pulse, use custom
                    ring-0 group-hover:ring-2 group-hover:ring-yellow-500 // Ring effect on hover
                  `}
              >
                <connection.icon className="w-6 h-6 md:w-8 md:h-8 text-white transition-colors group-hover:text-yellow-400" />
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-300">{connection.name}</span> {/* Label below icon */}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;