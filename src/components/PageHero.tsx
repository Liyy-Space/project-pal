import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface PageHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PageHero = ({ icon: Icon, title, description }: PageHeroProps) => (
  <section className="gradient-page-hero text-primary-foreground py-20 text-center">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Icon className="w-16 h-16 text-teal-300 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed opacity-80">{description}</p>
      </motion.div>
    </div>
  </section>
);

export default PageHero;
