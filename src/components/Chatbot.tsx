import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  keywords: string[];
  answer: string;
}

const faqs: FAQ[] = [
  {
    keywords: ["service", "offer", "do", "provide", "help", "what do you", "what can"],
    answer: "We offer 4 core services:\n\n1. 📊 Data Analytics & Visualization\n2. 🤖 Machine Learning Solutions\n3. 🔧 Data Engineering & Infrastructure\n4. 🎓 Training & Consulting\n\nEach is tailored to your business needs. Visit our Services page to learn more!",
  },
  {
    keywords: ["price", "cost", "pricing", "charge", "fee", "rate", "how much", "afford", "budget", "quote"],
    answer: "Our pricing depends on the scope and complexity of your project. We offer flexible packages for businesses of all sizes.\n\nContact us for a FREE consultation and we'll provide a detailed quote tailored to your needs! 💼",
  },
  {
    keywords: ["contact", "reach", "email", "talk", "speak", "message", "touch", "connect", "call"],
    answer: "You can reach us through:\n\n📧 info@neudata.com\n📧 sales@neudata.com\n📍 Nairobi, Kenya\n🕐 Mon-Fri: 9AM - 6PM\n\nOr visit our Contact page to send a message directly!",
  },
  {
    keywords: ["long", "timeline", "duration", "time", "take", "how long", "weeks", "months", "deadline"],
    answer: "Project timelines vary based on complexity:\n\n⚡ Simple dashboard: 2-4 weeks\n📈 Analytics project: 1-2 months\n🤖 ML pipeline: 2-3 months\n🏗️ Full data infrastructure: 3-6 months\n\nWe'll give you a clear timeline during our initial consultation!",
  },
  {
    keywords: ["industry", "sector", "work with", "client", "business", "company", "who", "type"],
    answer: "We work across many industries including:\n\n🏦 Finance & Banking\n🏥 Healthcare\n🛒 Retail & E-commerce\n🏭 Manufacturing\n💻 Technology\n📱 Startups\n\nOur solutions are adaptable to any sector!",
  },
  {
    keywords: ["about", "neudata", "company", "firm", "team", "founded", "who are"],
    answer: "Neudata is a data science consulting firm based in Nairobi, Kenya 🇰🇪\n\nWe help businesses unlock the power of their data through analytics, machine learning, and data engineering.\n\nOur mission is to make advanced data science accessible to organizations of all sizes!",
  },
  {
    keywords: ["book", "publication", "read", "resource", "learn", "study", "material", "guide"],
    answer: "Yes! We have published books on data science, analytics, and AI 📚\n\nThey're great resources for both beginners and professionals. Visit our Books page to check them out!",
  },
  {
    keywords: ["start", "begin", "get started", "first step", "how do i", "next step", "ready"],
    answer: "Getting started is easy! 🚀\n\n1. Visit our Contact page\n2. Send us a message about your project\n3. We'll schedule a FREE consultation\n4. We'll propose a tailored solution\n\nWe typically respond within 24 hours!",
  },
  {
    keywords: ["machine learning", "ml", "ai", "artificial intelligence", "model", "prediction", "algorithm"],
    answer: "Our Machine Learning services include:\n\n🤖 Predictive modeling\n🧠 Natural Language Processing (NLP)\n👁️ Computer Vision\n📊 Recommendation systems\n⚡ Real-time ML pipelines\n\nWe build custom AI solutions tailored to your business!",
  },
  {
    keywords: ["data analytics", "analytics", "visualization", "dashboard", "report", "insight", "chart"],
    answer: "Our Data Analytics services include:\n\n📊 Interactive dashboards\n📈 Business intelligence reports\n🔍 Data exploration & insights\n📉 KPI tracking & monitoring\n\nWe turn your raw data into actionable insights!",
  },
  {
    keywords: ["data engineering", "pipeline", "infrastructure", "database", "etl", "cloud", "storage"],
    answer: "Our Data Engineering services include:\n\n🔧 Data pipeline development\n☁️ Cloud architecture (AWS, GCP, Azure)\n🗄️ Database design & optimization\n⚡ Real-time data streaming\n\nWe build the foundation your data needs!",
  },
  {
    keywords: ["training", "consulting", "workshop", "course", "learn", "teach", "education"],
    answer: "Our Training & Consulting services include:\n\n🎓 Data science workshops\n👥 Team training programs\n📋 Strategic data consulting\n🗺️ Data roadmap planning\n\nWe help your team become data-driven!",
  },
  {
    keywords: ["location", "where", "nairobi", "kenya", "office", "based", "country"],
    answer: "We are based in Nairobi, Kenya 🇰🇪\n\n📍 Nairobi, Kenya\n🕐 Office Hours: Mon-Fri, 9AM - 6PM\n\nWe also work with clients remotely across Africa and beyond!",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "howdy", "greetings"],
    answer: "Hello! 👋 Welcome to Neudata!\n\nI'm here to help you learn about our data science services. What would you like to know?\n\n• Our services\n• Pricing\n• How to get started\n• Our team",
  },
  {
    keywords: ["thank", "thanks", "appreciate", "helpful", "great", "awesome", "good"],
    answer: "You're welcome! 😊 We're happy to help!\n\nIf you have any more questions or are ready to get started, don't hesitate to reach out via our Contact page. We'd love to work with you! 🚀",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "ciao"],
    answer: "Goodbye! 👋 Thanks for chatting with us!\n\nFeel free to come back anytime. You can also reach us at info@neudata.com. Have a great day! 😊",
  },
];

const suggestedQuestions = [
  "What services do you offer?",
  "How much do your services cost?",
  "How do I get started?",
  "What industries do you work with?",
];

interface Message {
  role: "user" | "bot";
  content: string;
}

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  
  // Score each FAQ by how many keywords match
  let bestScore = 0;
  let bestAnswer = "";

  for (const faq of faqs) {
    const score = faq.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  }

  if (bestScore > 0) return bestAnswer;

  return "I'm not sure about that. 🤔\n\nYou can:\n• Ask about our services, pricing, or timeline\n• Visit our Contact page\n• Email us at info@neudata.com\n\nWe typically respond within 24 hours!";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! 👋 I'm Neudata's assistant. Ask me about our services, pricing, or how to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = { role: "bot", content: findAnswer(text) };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-hero px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">Neudata Assistant</p>
                  <p className="text-xs text-primary-foreground/70">Ask me anything</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-xl rounded-bl-sm text-sm text-muted-foreground animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Type your question..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;