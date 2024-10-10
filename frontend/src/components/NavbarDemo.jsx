import React, { useState } from "react";

// MenuItem component
export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative group"
    >
      <p
        className={`cursor-pointer hover:opacity-90 text-white transition duration-200 ${
          active === item ? "opacity-90" : ""
        }`}
      >
        {item}
      </p>
      {active === item && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4">
          <div className="bg-black backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-lg">
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
      className="relative rounded-full bg-black/90 border border-white/20 shadow-lg flex justify-center space-x-6 px-10 py-4"
    >
      {children}
    </nav>
  );
};

// ProductItem component (for dropdown content if needed)
export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a href={href} className="flex space-x-4">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-lg"
      />
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-sm text-neutral-300">{description}</p>
      </div>
    </a>
  );
};

// HoveredLink component
export const HoveredLink = ({ children, href }) => {
  return (
    <a href={href} className="text-neutral-200 hover:text-blue-500 transition duration-150">
      {children}
    </a>
  );
};

// NavbarDemo component
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <Navbar className="top-0" />
    </div>
  );
}

// Navbar component
function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className="fixed top-5 inset-x-0 max-w-3xl mx-auto z-50 ${className}">
      <Menu setActive={setActive}>
        {/* Home */}
        <HoveredLink href="/"><MenuItem item="Home" /></HoveredLink>

        {/* About */}
        <HoveredLink href="/about"><MenuItem item="About" /></HoveredLink>

        {/* Login */}
        <HoveredLink href="/login"><MenuItem item="Login" /></HoveredLink>

        {/* Sign Up */}
        <HoveredLink href="/register"><MenuItem item="Sign Up" /></HoveredLink>
  
        <HoveredLink href="/contact"><MenuItem item="Contact Us"/></HoveredLink>
        </Menu>
    </div>
  );
};