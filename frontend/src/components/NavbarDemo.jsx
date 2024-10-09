import React, { useState } from "react";
import { Menu, X } from "lucide-react";

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
      {active === item && children && (
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
export const MenuDesktop = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-black/90 border border-white/20 shadow-lg flex justify-center space-x-6 px-10 py-4"
    >
      {children}
    </nav>
  );
};

// HoveredLink component
export const HoveredLink = ({ children, href, onClick }) => {
  return (
    <a href={href} onClick={onClick} className="text-neutral-200 hover:text-blue-500 transition duration-150">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/register" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className={`fixed top-5 inset-x-0 max-w-3xl mx-auto z-50 ${className}`}>
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <MenuDesktop setActive={setActive}>
          {menuItems.map((item) => (
            <HoveredLink key={item.label} href={item.href}>
              <MenuItem setActive={setActive} active={active} item={item.label} />
            </HoveredLink>
          ))}
        </MenuDesktop>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="fixed top-5 right-5 z-50 p-2 bg-black/90 rounded-full border border-white/20"
        >
          {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-6">
            {menuItems.map((item) => (
              <HoveredLink key={item.label} href={item.href} onClick={toggleMenu}>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item={item.label}
                  onClick={toggleMenu}
                />
              </HoveredLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;