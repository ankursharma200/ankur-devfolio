import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiCodeforces } from 'react-icons/si';
import emailjs from '@emailjs/browser';

const service_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const template_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const public_Key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ankursharma200',
    icon: FaGithub,
    color: 'text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ankur-sharma299/',
    icon: FaLinkedin,
    color: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/ankur_sharma299/',
    icon: SiLeetcode,
    color: 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-500',
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/codecrafter_01',
    icon: SiCodechef,
    color: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-500',
  },
  {
    name: 'Codeforces',
    url: 'https://codeforces.com/profile/anku__123',
    icon: SiCodeforces,
    color: 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500',
  },
];

export default function Contact() {
  const form = useRef();

  useEffect(() => {
    if (public_Key) {
      emailjs.init(public_Key);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(service_ID, template_ID, form.current)
      .then(
        () => {
          alert('✅ Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          alert('❌ Failed to send message. Try again later.');
          console.error(error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20"
    >
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10"
        >
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent mb-6 text-center">
            Get in Touch
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-10 text-center">
            Feel free to reach out for collaborations, opportunities, or just a friendly hello!
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                <p className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaEnvelope className="text-primary text-lg" />
                  <a href="mailto:ankursharmapan125@gmail.com" className="hover:text-primary transition-colors">
                    ankursharmapan125@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaPhone className="text-primary text-lg" />
                  <a href="tel:+916396768622" className="hover:text-primary transition-colors">
                    +91 6396768622
                  </a>
                </p>
                <p className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaMapMarkerAlt className="text-primary text-lg" />
                  Mathura, Uttar Pradesh, India
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-primary">
                Profiles
              </h3>
              <div className="flex flex-wrap gap-5 text-2xl">
                {socialLinks.map(({ name, url, icon: Icon, color }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${color} hover:scale-110 transition-transform duration-300`}
                    aria-label={name}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl shadow-md transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
