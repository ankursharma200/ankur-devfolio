import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaMoon, FaSun } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Achievements', to: 'achievements' },
  { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            AS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-100}
                className="hover:text-primary cursor-pointer transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="container mx-auto px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-100}
              className="block py-2 hover:text-primary cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
