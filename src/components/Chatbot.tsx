import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  keywords: string[];
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    keywords: ["service", "offer", "do", "provide", "help"],
    question: "What services do you offer?",
    answer:
      "We offer Data Analytics, Machine Learning, Data Engineering, and Strategic Consulting. Each service is tailored to help businesses make data-driven decisions and optimize operations.",
  },
  {
    keywords: ["price", "cost", "pricing", "charge", "fee", "rate"],
    question: "How much do your services cost?",
    answer:
      "Our pricing depends on the scope and complexity of each project. Contact us for a free consultation and we'll provide a detailed quote tailored to your needs.",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "talk"],
    question: "How can I contact you?",
    answer:
      "You can reach us through the Contact page on our website, or email us directly. We typically respond within 24 hours on business days.",
  },
  {
    keywords: ["project", "long", "timeline", "duration", "time"],
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. A simple analytics dashboard might take 2-4 weeks, while a full ML pipeline could take 2-3 months. We'll provide a clear timeline during our initial consultation.",
  },
  {
    keywords: ["industry", "sector", "work with", "client"],
    question: "What industries do you work with?",
    answer:
      "We work across multiple industries including finance, healthcare, retail, manufacturing, and technology. Our data science solutions are adaptable to any sector.",
  },
  {
    keywords: ["about", "who", "team", "company", "neudata"],
    question: "Who is Neudata?",
    answer:
      "Neudata is a data science consulting firm that helps businesses unlock the power of their data. Our team of experts specializes in analytics, machine learning, and data engineering.",
  },
  {
    keywords: ["book", "publication", "read", "resource"],
    question: "Do you have any publications?",
    answer:
      "Yes! Check out our Books page where we share our publications on data science, analytics, and AI. They're great resources for both beginners and professionals.",
  },
  {
    keywords: ["start", "begin", "get started", "first step"],
    question: "How do I get started?",
    answer:
      "Simply visit our Contact page and send us a message describing your project or challenge. We'll schedule a free consultation to discuss how we can help.",
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
  for (const faq of faqs) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return "I'm not sure about that. Please visit our Contact page or ask about our services, pricing, projects, or team!";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! 👋 I'm Neudata's assistant. Ask me about our services, pricing, or how to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const botMsg: Message = { role: "bot", content: findAnswer(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
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
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
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
                disabled={!input.trim()}
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
