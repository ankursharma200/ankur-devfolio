import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    title: 'Software Developer Engineer Intern',
    company: 'Amber',
    period: 'May 2026 – Present',
    tech: 'Ruby on Rails, PostgreSQL, React.js, JavaScript, REST APIs',
    points: [
      'Developed and integrated a Value Added Services (VAS) module in Amber CRM, enabling lead management workflows across 10+ API endpoints through routing, state management, and agent assignment.',
      'Delivered complete Inventory Reviews and Inventory Offers features with CRUD operations, activity history tracking, forms, and backend integration across 8+ endpoints.',
      'Implemented round-robin lead assignment and advanced filtering workflows using Ruby on Rails and PostgreSQL, improving lead distribution and operational efficiency.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'CausalFunnel',
    period: 'Feb 2026 – May 2026',
    tech: 'MongoDB, Python, Remix, React.js, REST APIs, JavaScript',
    points: [
      'Contributed to core Heatmap and User Journey analytics tools, improving frontend responsiveness by 25%.',
      'Resolved 15+ API/JSON issues and delivered backend fixes using Firebase and Python, reducing API errors by 40%.',
      'Enhanced React-based A/B Testing UI and API handling, increasing experiment reliability by 30%.',
    ],
  },
  {
    title: 'Backend Developer Intern',
    company: 'SmallFare',
    period: 'Aug 2025 – Oct 2025',
    tech: 'MongoDB, Node.js, Express.js, REST APIs, JavaScript',
    points: [
      'Designed secure authentication and authorization middleware in Node.js/Express.js using JWT refresh tokens, managing sessions for 500+ users.',
      'Led migration from raw SQL to Prisma ORM across 25+ API endpoints, improving type-safety, speeding development by 20%, and reducing injection vulnerabilities by 30%.',
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section
      id="experience"
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent mb-2">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Production-level work across multiple companies
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-500 hidden md:block"></div>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={item}
                className="relative flex gap-6 items-start"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800 shadow-md z-10"></div>

                {/* Card */}
                <div className="md:ml-16 flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
                    {exp.tech}
                  </p>

                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-primary mt-1.5 text-xs">●</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
