import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Problem Statements", href: "/problems" },
    { name: "Guidelines", href: "/guidelines" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Committees", href: "/committees" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 font-space ${
        isScrolled ? "bg-blue-darker/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="relative group flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <div className="h-20 flex items-center">
              <img 
                src="/magnitude_logo1.png" 
                alt="Magnitude Logo" 
                className="h-full w-auto object-contain cursor-pointer"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative group px-3 py-2"
              >
                <span
                  className={`text-[15px] font-medium tracking-wide transition-colors duration-300 uppercase ${
                    location.pathname === link.href
                      ? "text-blue-light"
                      : "text-gray-300 group-hover:text-blue-pale"
                  }`}
                >
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-light to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between items-center">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ease-out ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden py-4 bg-blue-darker/90 backdrop-blur-lg"
          >
            {navigation.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-4 py-3 text-[15px] font-medium tracking-wide transition-all duration-300 uppercase ${
                  location.pathname === link.href
                    ? "text-blue-light bg-blue-dark/50"
                    : "text-gray-300 hover:text-blue-pale hover:bg-blue-dark/30 hover:pl-6"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
