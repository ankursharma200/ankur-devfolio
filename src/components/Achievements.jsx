import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaCode, FaStar } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiCodeforces } from 'react-icons/si';

const achievements = [
  {
    icon: SiCodechef,
    color: 'text-amber-600',
    title: 'CodeChef',
    description: '3-Star rating with peak global rank of 197 and total rating of 1744.',
    link: 'https://www.codechef.com/users/codecrafter_01',
  },
  {
    icon: SiLeetcode,
    color: 'text-yellow-500',
    title: 'LeetCode',
    description: 'Ranked in the top 5% globally out of 4M+ users for problem-solving and data structure implementation.',
    link: 'https://leetcode.com/u/ankur_sharma299/',
  },
  {
    icon: SiCodeforces,
    color: 'text-blue-500',
    title: 'Codeforces',
    description: 'Specialist with rating 1402, demonstrating strong problem-solving and algorithm design skills.',
    link: 'https://codeforces.com/profile/anku__123',
  },
  {
    icon: FaTrophy,
    color: 'text-yellow-600',
    title: 'PyC Contest pysort-23',
    description: 'Ranked 4th in PyC (coding club, IIIT Bhagalpur) Contest out of 80+ participants.',
    link: null,
  },
  {
    icon: FaCode,
    color: 'text-green-500',
    title: '1000+ Problems Solved',
    description: 'Solved 1000+ problems across LeetCode, Codeforces, GeeksforGeeks, and CodeChef.',
    link: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20"
    >
      <div className="container px-6 md:px-12 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent mb-2">
            Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Competitive programming highlights and milestones
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-700`}>
                  <achievement.icon className={`text-2xl ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    {achievement.link ? (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors underline decoration-dotted"
                      >
                        {achievement.title}
                      </a>
                    ) : (
                      achievement.title
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
