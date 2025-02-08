import { motion } from "framer-motion";
import { 
  Gamepad2, Dumbbell, Utensils, Users, 
  Film, Brain, HeartPulse 
} from "lucide-react";
import { useState } from "react";
import { theme } from "../utils";

const Hobbies = () => {
  const [selectedHobby, setSelectedHobby] = useState(null);

  const hobbies = [
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "PC & Console Gaming",
      details: ["RPGs", "Strategy Games", "Racing"],
      bgClass: "bg-indigo-500"
    },
    {
      name: "Fitness",
      icon: Dumbbell,
      description: "Gym & Workouts",
      details: ["Weight Training", "Cardio", "CrossFit"],
      bgClass: "bg-emerald-500"
    },
    {
      name: "Cooking",
      icon: Utensils,
      description: "Culinary Adventures",
      details: ["Asian Cuisine", "Baking", "Grilling"],
      bgClass: "bg-rose-500"
    },
    // {
    //   name: "Sports",
    //   icon: Basketball,
    //   description: "Indoor & Outdoor Games",
    //   details: ["Basketball", "Table Tennis", "Volleyball"],
    //   bgClass: "bg-amber-500"
    // },
    {
      name: "Entertainment",
      icon: Film,
      description: "Movies & Series",
      details: ["Sci-Fi", "Thrillers", "Anime"],
      bgClass: "bg-cyan-500"
    },
    {
      name: "Socializing",
      icon: Users,
      description: "Friend Hangouts",
      details: ["Game Nights", "Travel", "Dining Out"],
      bgClass: "bg-violet-500"
    },
    {
      name: "Learning",
      icon: Brain,
      description: "Skill Development",
      details: ["Online Courses", "Books", "Workshops"],
      bgClass: "bg-fuchsia-500"
    },
    {
      name: "Health",
      icon: HeartPulse,
      description: "Wellness Activities",
      details: ["Meditation", "Yoga", "Nutrition"],
      bgClass: "bg-red-500"
    }
  ];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className={`
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
            <Brain className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Hobbies & Interests</h2>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="relative group"
            onMouseEnter={() => setSelectedHobby(index)}
            onMouseLeave={() => setSelectedHobby(null)}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            
            <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700 transition-all duration-300">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`p-3 rounded-xl ${hobby.bgClass} bg-opacity-20 mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <hobby.icon className={`w-8 h-8 ${hobby.bgClass} bg-clip-text text-transparent`} />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2">{hobby.name}</h3>
                <p className="text-slate-400 text-sm text-center mb-4">{hobby.description}</p>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedHobby === index ? 1 : 0,
                    height: selectedHobby === index ? 'auto' : 0,
                  }}
                  className="w-full"
                >
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {hobby.details.map((detail, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`px-2 py-1 rounded-full text-xs ${hobby.bgClass} bg-opacity-20 text-white`}
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hobbies;