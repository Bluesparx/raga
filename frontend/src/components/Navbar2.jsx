import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import { Menu as MenuIcon, X } from "lucide-react";

// MenuItem component
export const MenuItem = ({ setActive, active, item, children, onClick }) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      onClick={onClick}
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
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 hidden md:block">
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
export const HoveredLink = ({ children, href, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();  
      onClick();
    }
  };

  return (
    <a
      href={href || "#"}
      onClick={handleClick}
      className="text-neutral-200 hover:text-blue-500 transition duration-150"
    >
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

// Navbar2 component
export function Navbar2() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-white"></p>
    </div>
  );
}

// Navbar component
function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}>
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Menu setActive={setActive}>
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
              <HoveredLink href="/breathing-game">Breathing Exercise</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Analytics">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/sgraph">Sleep Map</HoveredLink>
              <HoveredLink href="/mgraph">Mood Map</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/contact">Contact Us</HoveredLink>
              <HoveredLink href="/about">About us</HoveredLink>
              <HoveredLink onClick={handleLogout}>Logout</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="fixed top-5 right-5 z-50 p-2 bg-black/90 rounded-full border border-white/20"
        >
          {isMenuOpen ? <X className="text-white" /> : <MenuIcon className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center md:hidden">
          <nav className="flex flex-col items-center space-y-6">
            <HoveredLink href="/">Home</HoveredLink>
            <div className="flex flex-col items-center">
              <p className="text-white text-lg font-semibold mb-2">Tracker</p>
              <HoveredLink href="/sleep">Sleep Tracker</HoveredLink>
              <HoveredLink href="/mood">Mood Tracker</HoveredLink>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-lg font-semibold mb-2">Services</p>
              <HoveredLink href="/joke">Joke Generator</HoveredLink>
              <HoveredLink href="/calendar">Calendar</HoveredLink>
              <HoveredLink href="/blogs">Community</HoveredLink>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-lg font-semibold mb-2">Analytics</p>
              <HoveredLink href="/sgraph">Sleep Map</HoveredLink>
              <HoveredLink href="/mgraph">Mood Map</HoveredLink>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-lg font-semibold mb-2">About</p>
              <HoveredLink href="/contact">Contact Us</HoveredLink>
              <HoveredLink href="/about">About us</HoveredLink>
              <HoveredLink onClick={() => { toggleMenu(); handleLogout(); }}>Logout</HoveredLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;