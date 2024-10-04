import React, { useState } from "react";

// MenuItem component
export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p
        className="cursor-pointer  hover:opacity-[0.9]text-white"
      >
        {item}
      </p>
      {active !== null && active === item && (
        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
          <div className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
            <div className="w-max h-full p-4">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Menu component
export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent bg-black border-white/[0.2]  shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

// ProductItem component
export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">
          {title}
        </h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

// HoveredLink component
export const HoveredLink = ({ children, href }) => {
  return (
    <a href={href} className="text-neutral-200 hover:text-blue">
      {children}
    </a>
  );
};

// NavbarDemo component
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

// Navbar component
function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}>
      <Menu setActive={setActive}>
        {/* Home */}
        <HoveredLink href="/home"><MenuItem item="Home"> </MenuItem></HoveredLink>

        {/* About*/}
        <HoveredLink href="/about"><MenuItem item="About"> </MenuItem></HoveredLink>
         

        {/* login*/}
        <HoveredLink href="/login"><MenuItem item="Login"> </MenuItem></HoveredLink>
       
      </Menu>
    </div>
  );
}
