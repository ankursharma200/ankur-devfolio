import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const phrases = [
  { text: 'Building scalable software.', color: 'text-indigo-500' },
  { text: 'Solving real-world problems.', color: 'text-emerald-500' },
  { text: 'Creating exceptional user experiences.', color: 'text-amber-500' },
];

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [completedPhrases, setCompletedPhrases] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const phrase = phrases[currentPhrase].text;
    const speed = 60;

    const timeout = setTimeout(() => {
      setDisplayText(phrase.slice(0, displayText.length + 1));

      if (displayText.length + 1 === phrase.length) {
        // Phrase completed
        setTimeout(() => {
          setCompletedPhrases((prev) => [...prev, { text: phrase, color: phrases[currentPhrase].color }]);
          setDisplayText('');
          if (currentPhrase + 1 < phrases.length) {
            setCurrentPhrase((prev) => prev + 1);
          } else {
            setIsFinished(true);
          }
        }, 400);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentPhrase, isFinished]);

  return (
    <section id="home" className="section pt-20 md:pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 md:mb-0 pl-4 md:pl-10"
          >
            <motion.p variants={childVariant} className="text-lg text-primary font-medium mb-2">
              Hello, I'm
            </motion.p>

            <motion.h1 variants={childVariant} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Ankur Sharma
            </motion.h1>

            <motion.h2 variants={childVariant} className="text-xl md:text-2xl mb-6 text-gray-600 dark:text-gray-400">
              Web Developer | Software Engineer | Tech Enthusiast
            </motion.h2>

            <motion.div variants={childVariant} className="text-lg mb-8 max-w-lg min-h-[80px]">
              {completedPhrases.map((phrase, i) => (
                <span key={i} className={`font-semibold ${phrase.color} mr-1`}>
                  {phrase.text}{' '}
                </span>
              ))}
              {!isFinished && (
                <>
                  <span className={`font-semibold ${phrases[currentPhrase].color}`}>
                    {displayText}
                  </span>
                  <span className="animate-pulse text-primary">|</span>
                </>
              )}
            </motion.div>

            <motion.div variants={childVariant} className="flex flex-wrap gap-4 mb-8">
              <a
                href="#experience"
                className="px-8 py-3 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition duration-300"
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={childVariant} className="flex gap-5 text-2xl">
              <a href="https://github.com/ankursharma200" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/ankur-sharma299/" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:ankursharmapan125@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="tel:+916396768622"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="Phone">
                <FaPhone />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            className="order-first md:order-last flex justify-center items-center"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              {/* Animated gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500 animate-spin-slow opacity-40 blur-sm"></div>
              
              {/* Ring border */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-primary to-purple-500 p-[3px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                  {/* Profile photo */}
                  <img
                    src="/assets/Ankur_image.jpeg"
                    alt="Ankur Sharma"
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-full shadow-lg"
              >
                1000+ Problems
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
