import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an AI assistant on Ankur Sharma's portfolio website. Answer questions about Ankur in a friendly, professional, and concise manner (2-4 sentences max).

About Ankur:
- Full-stack developer from Mathura, UP, India. Email: ankursharmapan125@gmail.com, Phone: +91 6396768622
- B.Tech CSE at IIIT Bhagalpur (2022-2026)
- Currently SDE Intern at Amber (May 2026-Present): Ruby on Rails, React.js, PostgreSQL. Built VAS module, Inventory features, round-robin lead assignment.
- Previously at CausalFunnel (Feb-May 2026): Heatmap/User Journey analytics, improved frontend by 25%, reduced API errors by 40%.
- Previously at SmallFare (Aug-Oct 2025): JWT auth middleware for 500+ users, migrated to Prisma ORM across 25+ endpoints.
- Projects: MediNexus (doctor appointments, JWT, Stripe, 12+ endpoints), Trip-Stay (travel booking, session auth, mobile-first)
- Skills: C/C++, Java, Python, Ruby, JavaScript, TypeScript, Ruby on Rails, React.js, Next.js, Node.js, Express.js, Tailwind, Prisma ORM, PostgreSQL, MongoDB, MySQL, Docker, Redis, AWS S3, Git
- Achievements: CodeChef 3-Star (rank 197, rating 1744), LeetCode top 5% (4M+ users), Codeforces Specialist (1402), 1000+ problems solved
- GitHub: github.com/ankursharma200, LinkedIn: linkedin.com/in/ankur-sharma299

Rules: Keep answers short. If not about Ankur, politely redirect. If asked about hiring, say he's open to opportunities.`;

// Fallback rule-based responses
function getRuleBasedResponse(input) {
  const q = input.toLowerCase().trim();

  if (q.match(/^(hi|hello|hey|hii|namaste|hola)/)) {
    return "Hey there! 👋 I'm **Ankur's AI assistant**. Ask me about his **skills**, **experience**, **projects**, or **achievements**!";
  }
  if (q.match(/who is|your name|about ankur|tell me about/)) {
    return "**Ankur Sharma** is a full-stack developer at **IIIT Bhagalpur** (B.Tech CSE, 2022-2026). He has production experience in **Ruby on Rails**, **MERN Stack**, and has solved **1000+ DSA problems**. Currently working as **SDE Intern at Amber**.";
  }
  if (q.match(/skill|tech|language|framework|tool|stack/)) {
    return "**Ankur's skills:**\n\n💻 **Languages:** C/C++, Java, Python, Ruby, JavaScript, TypeScript\n⚙️ **Frameworks:** Ruby on Rails, React.js, Next.js, Node.js, Express.js, Tailwind CSS\n🗄️ **Databases:** MongoDB, PostgreSQL, MySQL\n🛠️ **Tools:** Docker, Redis, AWS S3, Git, Postman\n🧠 **Core:** DSA, System Design, OOP, OS, DBMS";
  }
  if (q.match(/experience|work|intern|job|company|amber|causalfunnel|smallfare/)) {
    return "**Ankur's Experience:**\n\n🟢 **Amber** (May 2026-Present)\nSDE Intern — Built VAS module, Inventory features using Ruby on Rails & React.js\n\n🔵 **CausalFunnel** (Feb-May 2026)\nSoftware Dev Intern — Heatmap analytics, reduced API errors by 40%\n\n🟣 **SmallFare** (Aug-Oct 2025)\nBackend Dev Intern — JWT auth for 500+ users, Prisma ORM migration";
  }
  if (q.match(/project|medinexus|trip.?stay|built/)) {
    return "**Ankur's Projects:**\n\n🏥 **MediNexus** — Doctor appointment system\n• JWT role-based access (3 roles)\n• Stripe payments & slot-based booking\n• 12+ REST endpoints\n🔗 [Live](https://medinexus-frontend-hzd3.onrender.com) | [GitHub](https://github.com/ankursharma200/MediNexus)\n\n✈️ **Trip-Stay** — Travel booking platform\n• Secure session-based auth\n• Mobile-first responsive design\n🔗 [Live](https://trip-stay-app.onrender.com/) | [GitHub](https://github.com/ankursharma200/Trip-Stay)";
  }
  if (q.match(/achieve|leetcode|codechef|codeforces|rank|rating|competitive|dsa|problem/)) {
    return "**Ankur's Achievements:**\n\n🏆 **CodeChef:** 3-Star, peak rank 197, rating 1744\n⭐ **LeetCode:** Top 5% globally (4M+ users)\n🔷 **Codeforces:** Specialist, rating 1402\n🎯 **1000+ problems** solved across platforms\n🥉 Ranked 4th in PyC Contest pysort-23";
  }
  if (q.match(/education|college|university|degree|iiit|bhagalpur|study/)) {
    return "🎓 Ankur is pursuing **B.Tech in CSE** from **IIIT Bhagalpur** (2022-2026).\n\n📚 **Coursework:** Data Structures, Algorithms, DBMS, OS, Computer Networks, OOP.";
  }
  if (q.match(/contact|email|phone|reach|hire|available|connect/)) {
    return "**Reach Ankur at:**\n📧 [ankursharmapan125@gmail.com](mailto:ankursharmapan125@gmail.com)\n📱 [+91 6396768622](tel:+916396768622)\n💼 [LinkedIn](https://www.linkedin.com/in/ankur-sharma299/)\n🐙 [GitHub](https://github.com/ankursharma200)\n\n✅ He's **open to opportunities**!";
  }
  if (q.match(/location|where|from|city|live/)) {
    return "📍 Ankur is from **Mathura, Uttar Pradesh, India** and studies at **IIIT Bhagalpur**, Bihar.";
  }
  if (q.match(/resume|cv/)) {
    return "📄 You can view Ankur's resume by clicking the **'View Resume'** button in the **About** section above!";
  }
  if (q.match(/thank|thanks|bye|ok/)) {
    return "You're welcome! 😊 Feel free to ask **anything else** about Ankur. Have a **great day**! �";
  }
  return "I can help you learn about Ankur's **skills**, **experience**, **projects**, **achievements**, **education**, or **contact info**. What would you like to know? 🤔";
}

async function getAIResponse(userMessage) {
  if (!GEMINI_API_KEY) return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}` }] }
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 250 }
        })
      }
    );

    const data = await response.json();
    if (data.error) return null;
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch {
    return null;
  }
}

function formatMessage(text) {
  // Convert bold **text** to <strong>
  let html = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-indigo-600 dark:text-indigo-400">$1</strong>');
  // Convert markdown links [text](url) to clickable HTML links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">$1</a>');
  // Convert newlines to <br>
  html = html.replace(/\n/g, '<br>');
  return html;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm **Ankur's AI assistant**. Ask me about his **skills**, **experience**, **projects**, or **achievements**!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Try AI first, fallback to rules
    let botReply = await getAIResponse(userMessage);
    if (!botReply) {
      botReply = getRuleBasedResponse(userMessage);
    }

    setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    setIsLoading(false);
  };

  const handleQuickButton = async (tag) => {
    if (isLoading) return;
    setMessages(prev => [...prev, { role: 'user', text: tag }]);
    setIsLoading(true);

    let botReply = await getAIResponse(tag);
    if (!botReply) {
      botReply = getRuleBasedResponse(tag.toLowerCase());
    }

    setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-primary/40 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? { y: [0, -5, 0] } : {}}
        transition={!isOpen ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
        aria-label="Open chat"
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}
        {!isOpen && (
          <span className="absolute -top-10 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask me anything!
          </span>
        )}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[480px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-white px-4 py-3 flex items-center gap-3">
              <FaRobot size={20} />
              <div>
                <p className="font-semibold text-sm">Ask about Ankur</p>
                <p className="text-xs opacity-80">AI-powered assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl text-sm text-gray-500">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick buttons */}
            <div className="px-3 py-2 flex gap-2 flex-wrap border-t border-gray-100 dark:border-gray-700">
              {['Skills', 'Experience', 'Projects', 'Contact'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleQuickButton(tag)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
