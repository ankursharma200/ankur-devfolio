import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaGitAlt, FaGithub,
  FaDatabase, FaDocker, FaCloud, FaLinux, FaCode, FaCogs,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiRedis, SiRubyonrails, SiTypescript, SiPrisma, SiNextdotjs,
  SiRuby, SiPython, SiCplusplus, SiVite, SiPostman,
} from 'react-icons/si';

const skillsData = {
  'Languages': [
    { name: 'C/C++', icon: SiCplusplus, color: 'text-blue-600' },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
    { name: 'Python', icon: SiPython, color: 'text-green-600' },
    { name: 'Ruby', icon: SiRuby, color: 'text-red-500' },
    { name: 'SQL', icon: FaDatabase, color: 'text-indigo-600' },
    { name: 'HTML', icon: FaHtml5, color: 'text-orange-500' },
    { name: 'CSS', icon: FaCss3Alt, color: 'text-blue-500' },
  ],
  'Frameworks': [
    { name: 'Ruby on Rails', icon: SiRubyonrails, color: 'text-red-600' },
    { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-800 dark:text-white' },
    { name: 'Node.js', icon: FaNode, color: 'text-green-500' },
    { name: 'Express.js', icon: SiExpress, color: 'text-gray-600 dark:text-gray-300' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'Prisma ORM', icon: SiPrisma, color: 'text-indigo-600' },
  ],
  'Databases': [
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'MySQL', icon: SiMysql, color: 'text-blue-400' },
  ],
  'Tools & Platforms': [
    { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
    { name: 'GitHub', icon: FaGithub, color: 'text-gray-700 dark:text-white' },
    { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
    { name: 'Docker', icon: FaDocker, color: 'text-blue-400' },
    { name: 'Linux', icon: FaLinux, color: 'text-yellow-600' },
    { name: 'Vite', icon: SiVite, color: 'text-purple-500' },
    { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
    { name: 'AWS S3', icon: FaCloud, color: 'text-orange-400' },
  ],
  'Core CS': [
    { name: 'Data Structures', icon: FaCode, color: 'text-primary' },
    { name: 'Algorithms', icon: FaCode, color: 'text-green-600' },
    { name: 'OOP', icon: FaCogs, color: 'text-purple-600' },
    { name: 'OS', icon: FaCogs, color: 'text-blue-700' },
    { name: 'DBMS', icon: FaDatabase, color: 'text-teal-600' },
    { name: 'Networks', icon: FaCogs, color: 'text-cyan-600' },
    { name: 'System Design', icon: FaCogs, color: 'text-red-500' },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="section bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20"
    >
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent mb-2">
            Technical Skills
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-xl mx-auto">
            Technologies and tools I work with in production
          </p>
        </motion.div>

        <div className="space-y-10">
          {Object.entries(skillsData).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {category}
              </h3>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {skills.map(({ name, icon: Icon, color }) => (
                  <motion.div
                    key={name}
                    variants={item}
                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:scale-105 duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
                    title={name}
                  >
                    <Icon className={`text-3xl ${color} mb-2`} />
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 text-center">{name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
