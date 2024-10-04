import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";

// MenuItem component
export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p
        className="cursor-pointer  hover:opacity-[0.9] text-white"
      >
        {item}
      </p>
      {active !== null && active === item && (
        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
          <div className=" bg-black backdrop-blur-sm rounded-2xl overflow-hidden border  border-white/[0.2] shadow-xl">
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
      className="relative rounded-full border border-transparent bg-black border-white/[0.2] shadow-input flex justify-center space-x-4 px-8 py-6"
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
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
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
export const HoveredLink = ({ children, href, onClick }) => {
  return (
    <a
      href={href || '#'}
      onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : null}
      className="text-neutral-200 hover:text-black"
    >
      {children}
    </a>
  );
};


// NavbarDemo component
export function Navbar2() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-white">
      
      </p>
    </div>
  );
}

// Navbar component
function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log('Logout successful', response);
      navigate('/');
    } catch (error) {
      console.error('Could not log in:', error);
    }
  }

  return (
    <div className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}>
     
           
            
      <Menu setActive={setActive}>
        {/* Services Menu Item */}
        <HoveredLink href="/">Home</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Tracker">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/sleep">Sleep Tracker</HoveredLink>
            <HoveredLink href="/mood">Mood Tracker</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Services">
        <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/joke">Joke Generator</HoveredLink>
            <HoveredLink href="/calendar">Calendar</HoveredLink>
            <HoveredLink href="/blogs">Community</HoveredLink>
            </div>
            </MenuItem>
        {/* Services Menu Item */}
        <MenuItem setActive={setActive} active={active} item="Analytics">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/sgraph">Sleep Map</HoveredLink>
            <HoveredLink href="/mgraph">Mood Map</HoveredLink>
           
          </div>
        </MenuItem>

        {/* Pricing Menu Item */}
        <MenuItem setActive={setActive} active={active} item="About">
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/contact">Contact Us</HoveredLink>
        <HoveredLink href="/about">About us</HoveredLink>
        <HoveredLink onClick={handleLogout}>Logout</HoveredLink>
        </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
