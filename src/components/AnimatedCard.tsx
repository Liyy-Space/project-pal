import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;
