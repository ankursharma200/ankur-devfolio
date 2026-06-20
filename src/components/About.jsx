import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const service_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const template_RESUME_ID = import.meta.env.VITE_EMAILJS_RESUME_TEMPLATE_ID;
const public_Key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const handleResumeClick = () => {
  // Send notification email
  if (service_ID && template_RESUME_ID && public_Key) {
    emailjs.send(service_ID, template_RESUME_ID, {
      view_time: new Date().toLocaleString(),
      message: 'Someone viewed your resume from your portfolio website.',
    }, public_Key).catch((err) => console.log('Tracking silent fail:', err));
  }

  // Open resume in new tab
  window.open('https://drive.google.com/file/d/1c2gAFEIMfeon64YGLEi28SvUjTXmIvSA/view?usp=sharing', '_blank');
};

export default function About() {
  return (
    <section
      id="about"
      className="section bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20"
    >
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
            About Me
            <span className="block w-16 h-1 bg-primary rounded-full mt-2 mx-auto"></span>
          </h2>

          <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300 text-center">
            Full-stack developer with production experience in{' '}
            <span className="font-semibold text-primary">Ruby on Rails</span>,{' '}
            <span className="font-semibold text-primary">MERN Stack</span>, and{' '}
            <span className="font-semibold text-primary">Node.js</span>.
            Built lead management systems, inventory modules, and RESTful APIs serving real users at scale.
            Strong in Data Structures and Algorithms with{' '}
            <span className="font-semibold text-green-600">1000+ problems solved</span> and{' '}
            <span className="font-semibold text-yellow-600">top 5% LeetCode ranking</span>.
          </p>

          {/* Education */}
          <div className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <FaGraduationCap className="text-3xl text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Indian Institute of Information Technology Bhagalpur
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Bachelor of Technology in Computer Science and Engineering
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Batch : 2022-2026
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-red-400" />
                  Bhagalpur, Bihar
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium">Coursework:</span> Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, OOP
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleResumeClick}
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg cursor-pointer"
            >
              View Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
