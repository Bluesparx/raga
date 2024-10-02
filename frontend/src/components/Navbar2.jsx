import React, { useState } from "react";

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
export const HoveredLink = ({ children, href }) => {
  return (
    <a href={href} className="text-neutral-200 hover:text-black">
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

  return (
    <div className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}>
      <Menu setActive={setActive}>
        {/* Services Menu Item */}
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/sleep">Sleep Tracker</HoveredLink>
            <HoveredLink href="/mood">Mood Tracker</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>

        {/* Products Menu Item */}
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind CSS components for your next project."
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI."
            />
          </div>
        </MenuItem>

        {/* Pricing Menu Item */}
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
