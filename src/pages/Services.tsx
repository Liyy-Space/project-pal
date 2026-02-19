import { BarChart3, Lightbulb, Server, BookOpen } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedCard from "@/components/AnimatedCard";

const services = [
  {
    icon: BarChart3,
    title: "Data Analytics & Visualization",
    desc: "Transform raw data into compelling visual stories that drive business decisions.",
    benefits: ["Interactive dashboards and reports", "Real-time data monitoring", "Custom KPI tracking", "Automated reporting systems", "Self-service analytics platforms"],
    story: "Helped a retail chain increase sales by 23% through customer behavior analytics and personalized marketing campaigns.",
  },
  {
    icon: Lightbulb,
    title: "Machine Learning Solutions",
    desc: "Build intelligent systems that learn from your data and make predictions.",
    benefits: ["Predictive modeling and forecasting", "Automated decision-making systems", "Natural language processing", "Computer vision applications", "Recommendation systems"],
    story: "Developed a predictive maintenance system for a manufacturing company, reducing equipment downtime by 40% and saving $2M annually.",
  },
  {
    icon: Server,
    title: "Data Engineering & Infrastructure",
    desc: "Build robust, scalable data infrastructure that can handle your growing data needs.",
    benefits: ["Scalable data pipelines", "Cloud-native architectures", "Real-time data processing", "Data quality and governance", "ETL/ELT automation"],
    story: "Migrated a financial services company's data infrastructure to the cloud, improving processing speed by 10x while reducing costs by 35%.",
  },
  {
    icon: BookOpen,
    title: "Training & Consulting",
    desc: "Empower your team with data science skills and strategic guidance.",
    benefits: ["Custom training programs", "Data strategy consulting", "Team skill development", "Best practices implementation", "Ongoing support and mentoring"],
    story: "Trained 10+ employees at a healthcare organization, enabling them to build internal analytics capabilities and reduce external consulting costs by 60%.",
  },
];

const Services = () => (
  <div className="pt-16">
    <PageHero icon={BarChart3} title="Our Services" description="Comprehensive data science solutions designed to transform your business operations and drive measurable results." />

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <AnimatedCard key={s.title} delay={i * 0.1} className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <s.icon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent-foreground mb-1 text-sm">Success Story:</h4>
                <p className="text-accent-foreground/80 text-sm">{s.story}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
