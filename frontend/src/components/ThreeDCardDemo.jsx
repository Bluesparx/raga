import React from "react";
import { NavbarDemo } from "./NavbarDemo";
export function ThreeDCardDemo() {
  return (
    <div className="inter-var">
    
      <div className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <div
          style={{ transform: "translateZ(50px)" }}
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </div>
        <p
          style={{ transform: "translateZ(60px)" }}
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </p>
        <div
          style={{ transform: "translateZ(100px) rotateX(20deg) rotateZ(-10deg)" }}
          className="w-full mt-4"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="thumbnail"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </div>
        <div className="flex justify-between items-center mt-20">
          <button
            style={{ transform: "translateZ(20px) translateX(-40px)" }}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </button>
          <button
            style={{ transform: "translateZ(20px) translateX(40px)" }}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
