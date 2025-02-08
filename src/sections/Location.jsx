import { MapPin } from "lucide-react";
import { theme } from "../utils";

const Location = () => {
    return (
        <section id="location" className={`
            bg-slate-800/90 p-6 md:p-8 rounded-xl
            border ${theme.border}
            shadow-xl ${theme.shadow}
          `}>
                <h2 className={`
              text-xl md:text-3xl flex items-center gap-2 md:gap-4 mb-6
              ${theme.primary}
            `}>
                    <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                    CURRENT LOCATION & AVAILABILITY
                </h2>
                <div className="space-y-4">
                    <div className="bg-slate-700/50 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-yellow-300">Bangalore, India</p>
                        <p className="text-gray-300 mt-2">Global Tech Innovation Hub</p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-yellow-300">Time Zone</p>
                        <p className="text-gray-300 mt-2">IST (UTC+5:30)</p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-yellow-300">Work Status</p>
                        <p className="text-gray-300 mt-2">Available for JavaScript Projects</p>
                    </div>
                </div>
            </section>
    );
  };
  
  export default Location;