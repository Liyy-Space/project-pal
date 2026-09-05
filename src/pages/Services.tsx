import { useState } from "react";
import servicesBanner from "@/assets/services-banner.jpg"
import { Link } from "react-router-dom";
import {
  BarChart3, TrendingUp, FlaskConical, Shield, PenLine, FileText,
  Database, Code2, BrainCircuit, Search, GraduationCap, ArrowRight,
  Compass, ShieldCheck, GitBranch,
} from "lucide-react";
 

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const services = [
  { number: "01", icon: BarChart3, title: "Survey Methodology & Field Data Systems", desc: "Designing surveys that produce defensible estimates, and the field systems that collect them cleanly the first time.", textColor: "text-teal-500", borderColor: "border-teal-500", details: ["Sample design — stratification, PPS and multi-stage cluster sampling", "GIS and spatial sampling: PSU delineation, gridded enumeration-area frames", "Electronic data capture in SurveyCTO / ODK / XLSForm", "Weighting, non-response adjustment and design-based variance estimation", "Coverage, serosurvey, KAP, nutrition and health-facility assessments"], outputs: "Sampling plan, programmed instrument, field manuals, weighting report, public-use dataset." },
  { number: "02", icon: TrendingUp, title: "Statistical Consultancy", desc: "A senior statistician on call for design, analysis and the questions reviewers will eventually ask.", textColor: "text-blue-500", borderColor: "border-blue-500", details: ["Study and experimental design: hypotheses, endpoints, estimands, randomization", "Applied modelling — regression, mixed models, survival analysis, Bayesian approaches", "Causal inference: propensity scores, matching, instrumental variables", "Statistical analysis plans (SAPs) and reproducible analysis", "Methods review and statistical input for manuscripts and theses"], outputs: "Study design memo, SAP, analysis report with reproducible code, reviewer-response support." },
  { number: "03", icon: FlaskConical, title: "Clinical Trial Support", desc: "End-to-end biostatistics and data services for interventional and observational studies, aligned to ICH-GCP.", textColor: "text-red-500", borderColor: "border-red-500", details: ["Protocol and statistical-section development, endpoint and estimand definition", "Sample-size, power and adaptive / interim-analysis planning", "CRF design, edit checks, database build in REDCap and comparable EDC platforms", "Analysis to CDISC-aligned standards, CONSORT-compliant reporting", "Pharmacovigilance and safety-data handling, listings and summaries"], outputs: "Protocol statistics, SAP, validated trial database, CSR-ready tables, listings and figures." },
  { number: "04", icon: Shield, title: "Data & Safety Monitoring Board (DSMB)", desc: "Independent statistical membership and the unblinded analytics that keep trial participants safe.", textColor: "text-orange-500", borderColor: "border-orange-500", details: ["Independent statistician membership on DSMBs and safety-monitoring committees", "DSMB charters, stopping rules and group-sequential frameworks", "Preparation of closed and open safety reports for board review", "Unblinded interim analyses delivered independently of the study team", "Benefit–risk summaries and minuted recommendations to sponsors"], outputs: "DSMB charter, interim safety reports, group-sequential plan, independent statistician sign-off." },
  { number: "05", icon: PenLine, title: "Medical & Scientific Writing", desc: "Turning analysis into clear, submission-ready scientific text — written to report what the data actually show.", textColor: "text-yellow-600", borderColor: "border-yellow-500", details: ["Manuscripts, abstracts and conference posters, including methods and results sections", "Clinical study reports, protocols and statistical sections", "Systematic reviews, meta-analyses and evidence syntheses (PRISMA-aligned)", "Policy briefs and technical reports for non-specialist audiences", "Journal submission support, reviewer responses and revision handling"], outputs: "Publication-ready manuscript, CSR, technical report, reviewer-response document." },
  { number: "06", icon: FileText, title: "Grants & Proposal Development", desc: "Strengthening the quantitative spine of competitive applications — the part funders scrutinise hardest.", textColor: "text-purple-500", borderColor: "border-purple-500", details: ["Study-design, sampling and statistical sections for grant applications", "Power and sample-size justification, and analysis plans reviewers can assess", "Monitoring-and-evaluation and data-management plans aligned to funder requirements", "Budgeting and justification for data, analytics and statistical components", "Concept notes, full proposals and responses to reviewer queries"], outputs: "Methods and analysis sections, sample-size justification, M&E and data-management plans." },
  { number: "07", icon: Database, title: "Data Management", desc: "Clean, well-governed data with an audit trail — the foundation everything else depends on.", textColor: "text-cyan-500", borderColor: "border-cyan-500", details: ["Database design and build, EDC configuration, and ETL / data-integration pipelines", "Data-quality monitoring: validation rules, automated checks, query management", "Data cleaning, harmonization and linkage, including record matching and de-duplication", "Governance: data-management plans, SOPs, audit trails, de-identification", "Secure storage, controlled access and analysis-ready dataset preparation"], outputs: "Data-management plan, validated database, DQ reports, locked analysis dataset, linkage SOP." },
  { number: "08", icon: Code2, title: "Statistical Programming & Software", desc: "Production-quality code and tools — well documented, version-controlled and reproducible.", textColor: "text-green-500", borderColor: "border-green-500", details: ["Statistical programming in R, Python, Stata and SAS, including package development", "Reproducible analytical workflows, automated reporting (R Markdown / Quarto)", "Interactive dashboards (Shiny, Power BI) for monitoring and dissemination", "Methodological software — simulation engines and custom statistical methods", "Code review, validation and refactoring of inherited analysis code"], outputs: "Documented codebase, reproducible pipeline, dashboard, validated analysis package." },
  { number: "09", icon: BrainCircuit, title: "Mathematical & Statistical Modelling", desc: "Models that explain mechanisms, project forward and quantify uncertainty honestly.", textColor: "text-pink-500", borderColor: "border-pink-500", details: ["Infectious-disease and compartmental models (SIR / SEIR) and transmission dynamics", "Forecasting and time-series methods for surveillance and programme planning", "Bayesian hierarchical modelling, small-area estimation and spatial models", "Simulation, scenario analysis and sensitivity / uncertainty quantification", "Latent-variable and multi-omics integration methods"], outputs: "Calibrated model, forecasts with uncertainty intervals, simulation study, technical documentation." },
  { number: "10", icon: Search, title: "Research & Analytics", desc: "Full-cycle research support and the applied data science behind data-driven decisions.", textColor: "text-rose-500", borderColor: "border-rose-500", details: ["End-to-end study support — from research question through analysis to dissemination", "Epidemiological and public-health analytics, including surveillance and programme evaluation", "Predictive modelling and machine learning where genuinely warranted", "Data visualization, KPI tracking and analytical reporting for operational decisions", "Secondary analysis and evidence synthesis of existing data assets"], outputs: "Research outputs, evaluation reports, predictive models with validation, decision-ready analytics." },
  { number: "11", icon: GraduationCap, title: "Training & Capacity Building", desc: "Leaving teams able to do the work themselves — not dependent on us.", textColor: "text-indigo-500", borderColor: "border-indigo-500", details: ["Hands-on courses in R, Python, Stata and reproducible research", "Applied biostatistics, survey methods, epidemiology and data management", "Mentored, on-the-job support for analysts, students and institutional staff", "Curriculum design and tailored in-house workshops in English and French", "Ongoing methods support and analytical mentoring after handover"], outputs: "Course materials, hands-on workshops, mentoring plan, certificate-ready curricula." },
];

const pillars = [
  { icon: Compass, title: "Methodologically led", desc: "Senior statisticians own the design and the analysis, not just the code." },
  { icon: ShieldCheck, title: "Standards-aware", desc: "Work delivered to ICH-GCP, CONSORT, STROBE and GAMP expectations where they apply." },
  { icon: GitBranch, title: "Reproducible", desc: "Versioned code, documented pipelines and analysis plans you can hand to an auditor." },
];

function ServiceCard({ s }: { s: typeof services[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = s.icon;
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 flex flex-col group ${expanded ? "ring-2 " + s.borderColor : ""}`}>
      {/* Icon circle */}
      <div className={`w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${s.textColor}`} />
      </div>

      {/* Number */}
      <span className="text-xs font-bold text-gray-300 mb-1">{s.number}</span>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{s.title}</h3>

      {/* Desc */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>

      {/* Expanded details */}
      {expanded && (
        <div className="mb-4 space-y-2">
          <ul className="space-y-1.5">
            {s.details.map((d) => (
              <li key={d} className={`flex items-start gap-2 text-xs text-gray-500`}>
                <span className={`font-bold mt-0.5 ${s.textColor}`}>✓</span>
                {d}
              </li>
            ))}
          </ul>
          <div className={`mt-3 p-3 rounded-lg bg-gray-50 border-l-2 ${s.borderColor}`}>
            <span className={`text-xs font-bold ${s.textColor}`}>Outputs: </span>
            <span className="text-xs text-gray-500">{s.outputs}</span>
          </div>
        </div>
      )}

      {/* Read More */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`inline-flex items-center gap-1 text-sm font-semibold ${s.textColor} hover:gap-2 transition-all`}
      >
        {expanded ? "Show Less ↑" : "Read More →"}
      </button>
    </div>
  );
}

const Services = () => (
  <div className="pt-16">
    {/* Hero Banner */}
<div className="relative h-72 md:h-96 overflow-hidden">
  <img
    src={servicesBanner}
    alt="Our Services"
    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
  />
  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)" }} />
  <div className="absolute inset-0 grid-pattern opacity-20" />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
      <BarChart3 className="w-3 h-3 text-teal-300" />
      <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">What We Offer</span>
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
      Our <span className="text-teal-300">Services</span>
    </h1>
    <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
      An African quantitative-science partner to clinical trials, public-health programmes, research institutions and data-driven organisations.
    </p>
  </div>
</div>
    {/* Services Grid */}
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            A wide range of data science services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Offered individually or as an integrated package across the life of a study. Click any card to see full details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="py-20 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="container relative">
        <div className="text-center mb-12">
          <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">How We Work</h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm">Three commitments that hold across every engagement.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-teal-500/30 border border-teal-400/30 flex items-center justify-center mb-4 mx-auto">
                <p.icon className="w-5 h-5 text-teal-300" />
              </div>
              <h3 className="text-white font-bold mb-2">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-card">
      <div className="container text-center max-w-2xl mx-auto">
        <span className="text-primary text-xs font-semibold uppercase tracking-widest">Work With Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Tell us about your study, dataset or deadline
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We will tell you honestly what it needs and how we can help — whether that is a single statistical review or a full engagement across the life of the project.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          style={{ background: HERO_GRADIENT }}
        >
          Get In Touch <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default Services;