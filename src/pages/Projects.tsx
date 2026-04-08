import { Server } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedCard from "@/components/AnimatedCard";

const projects = [
  {
    title: "Customer Behavior Analytics Platform",
    category: "E-commerce",
    desc: "Built a comprehensive analytics platform for a major e-commerce retailer to understand customer behavior, optimize product recommendations, and increase conversion rates.",
    achievements: ["35% increase in conversion rates", "Real-time personalization engine", "Advanced customer segmentation", "Automated A/B testing framework"],
    duration: "6 months", team: "8 team members",
    impact: "Significant increase in conversion rates",
    img: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Predictive Healthcare Analytics",
    category: "Healthcare",
    desc: "Developed machine learning models to predict patient readmission risks and optimize treatment plans for a large hospital network.",
    achievements: ["25% reduction in readmission rates", "Early warning system for critical patients", "Optimized resource allocation", "Improved patient outcomes"],
    duration: "8 months", team: "12 team members",
    impact: "Significant increase in conversion rates",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "AI-Powered Risk Management System",
    category: "Finance",
    desc: "Created an advanced risk assessment platform for a financial institution to detect fraud, assess credit risk, and ensure regulatory compliance.",
    achievements: ["90% fraud detection accuracy", "Real-time risk scoring", "Automated compliance reporting", "Reduced false positives by 60%"],
    duration: "10 months", team: "15 team members",
    impact: "Measurable reduction in readmission rates",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Smart Manufacturing Optimization",
    category: "Manufacturing",
    desc: "Implemented IoT sensors and machine learning algorithms to optimize production processes and predict equipment failures.",
    achievements: ["40% reduction in equipment downtime", "15% increase in production efficiency", "Predictive maintenance system", "Quality control automation"],
    duration: "12 months", team: "10 team members",
    impact: "Reduced fraud losses considerably",
    img: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Supply Chain Intelligence Platform",
    category: "Logistics",
    desc: "Built an end-to-end supply chain analytics platform to optimize inventory management, demand forecasting, and logistics operations.",
    achievements: ["30% reduction in inventory costs", "Improved demand forecasting accuracy", "Optimized delivery routes", "Real-time supply chain visibility"],
    duration: "9 months", team: "11 team members",
    impact: "$15M in operational savings",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Multi-Channel Marketing Attribution",
    category: "Marketing",
    desc: "Developed a sophisticated attribution model to track customer journeys across multiple touchpoints and optimize marketing spend allocation.",
    achievements: ["50% improvement in ROAS", "Cross-channel customer journey mapping", "Automated budget optimization", "Real-time campaign performance tracking"],
    duration: "7 months", team: "9 team members",
    impact: "20% increase in marketing ROI",
    img: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const Projects = () => (
  <div className="pt-16">
    <PageHero icon={Server} title="Our Projects" description="Explore our portfolio of successful data science projects across various industries." />

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <AnimatedCard key={p.title} delay={i * 0.08}>
              <div className="relative">
                <img src={p.img} alt={p.title} className="w-full h-48 object-cover rounded-t-lg" />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">{p.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground text-sm mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {p.achievements.map((a) => (
                      <li key={a} className="text-xs text-muted-foreground flex items-center gap-2">🏆 {a}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                  <span>📅 {p.duration}</span>
                  <span>👥 {p.team}</span>
                </div>
                <div className="bg-green-600/10 text-green-700 text-sm font-medium p-3 rounded-lg">
                  Impact: {p.impact}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Projects;
