import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Linkedin, GraduationCap, Github, X, Users } from "lucide-react";
import SEO from "@/components/SEO";
import bernardPhoto from "@/assets/team/bernard.jpg";
import jamesPhoto from "@/assets/team/james.png";
import luongPhoto from "@/assets/team/luong.jpg";
import expertsBanner from "@/assets/experts-banner.jpg";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 22%) 0%, hsl(199 70% 22%) 50%, hsl(178 65% 20%) 100%)";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  degrees: string;
  specialties: string[];
  photo: string | null;
  linkedin?: string;
  scholar?: string;
  github?: string;
  photoPosition?: string; // CSS object-position value, defaults to "center"
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "bernard-isekah-osangir",
    name: "Bernard Isekah Osang'ir",
    role: "Co-Founder",
    photoPosition: "center 25%",
    degrees: "PhD Biostatistics & Bioinformatics, MSc Statistics & Data Science",
    specialties: ["Biostatistics", "Bioinformatics", "Clinical Trial Analysis", "Survey Design"],
    photo: bernardPhoto,
    linkedin: "https://www.linkedin.com/in/bernard-isekah-osang-ir-89b09a12b/",
    scholar: "https://orcid.org/0000-0002-5557-3602",
    github: "https://github.com/bosangir",
    bio: "Bernard has over ten years of experience in public health studies, clinical trials, and data management. He is an expert in designing and analysing studies to support decisions in clinical and public health settings. He works across bioinformatics, statistical methods, and research software development, and teaches R programming, data management, and applied statistics at postgraduate level.",
  },
  {
    id: "james-wambua",
    name: "Dr. James Wambua",
    role: "Co-Founder",
    photoPosition: "center 70%", // shifts crop down to reduce blank space above head
    degrees: "BSc Statistics, MSc Epidemiology, MSc Mathematical Sciences, BSc Mathematics",
    specialties: ["Epidemiology", "Statistics", "Mathematical Modeling", "Health Economics"],
    photo: jamesPhoto,
    bio: "James is a research scientist with over nine years of experience specializing in the development and application of advanced data-analytic methodologies to address complex public health challenges using real-world data. He has extensive experience working with and consulting for international organizations, including the European Centre for Disease Prevention and Control (ECDC), international pharmaceutical companies such as Merck & Co., Inc. (MSD), and national research institutions such as KEMRI-Wellcome Trust.",
  },
  {
    id: "my-luong-vuong",
    name: "My-Luong Vuong",
    role: "Co-Founder",
    photoPosition: "center 15%", // full-body shot — focus higher toward face
    degrees: "PharmD, MSc Epidemiology, MSc Biostatistics, PhD Pharmacometrics (in progress)",
    specialties: ["Epidemiology", "Biostatistics", "Pharmacometrics", "Modelling and Simulation"],
    photo: luongPhoto,
    linkedin: "https://www.linkedin.com/in/my-luong-vuong/",
    scholar: "https://orcid.org/0000-0001-9203-6745",
    bio: "My-Luong Vuong holds a PharmD from Hanoi University of Pharmacy, Vietnam, along with a Master's in Epidemiology from the University of Antwerp, Belgium, and a Master's in Biostatistics from Hasselt University, Belgium. He is currently in his final year of his PhD in pharmacometrics at KU Leuven, Belgium, where he aims to optimise antimicrobial dosing in special patient populations including paediatric patients and critically ill patients admitted to the intensive care unit.",
  },
];

function MemberCard({ member, onSelect }: { member: TeamMember; onSelect: () => void }) {
  const { t } = useTranslation();
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer group w-full sm:w-[340px]"
    >
      <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-primary/20 transition-all duration-300 mb-5 shrink-0">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{ objectPosition: member.photoPosition || "center" }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>

      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{member.role}</p>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
      <p className="text-gray-400 text-xs mb-4">{member.degrees}</p>

      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {member.specialties.map((s) => (
          <span key={s} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{s}</span>
        ))}
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{member.bio}</p>

      <div className="flex items-center gap-2 mb-4">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary/10 transition-colors">
            <Linkedin className="w-4 h-4 text-gray-500" />
          </a>
        )}
        {member.scholar && (
          <a href={member.scholar} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary/10 transition-colors">
            <GraduationCap className="w-4 h-4 text-gray-500" />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary/10 transition-colors">
            <Github className="w-4 h-4 text-gray-500" />
          </a>
        )}
      </div>

      <span className="text-primary text-sm font-semibold group-hover:underline">{t("experts.readMore")}</span>
    </div>
  );
}

const Experts = () => {
  const { t } = useTranslation();
  const members = teamMembers.map((m) => {
    const sp = t(`experts.members.${m.id}.specialties`, { returnObjects: true });
    return {
      ...m,
      role: t(`experts.members.${m.id}.role`, { defaultValue: m.role }),
      degrees: t(`experts.members.${m.id}.degrees`, { defaultValue: m.degrees }),
      bio: t(`experts.members.${m.id}.bio`, { defaultValue: m.bio }),
      specialties: Array.isArray(sp) ? (sp as string[]) : m.specialties,
    };
  });
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="pt-16">
      <SEO
        title="Our Experts"
        description="Meet Neudata's co-founders: biostatisticians, epidemiologists and pharmacometricians with expertise in clinical trials, public health and modelling."
        path="/experts"
      />

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={expertsBanner} alt="Our Experts" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT, opacity: 0.85 }} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Users className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("experts.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            {t("experts.titlePrefix")} <span className="text-teal-300">{t("experts.titleHighlight")}</span>
          </h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base">{t("experts.subtitle")}</p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} onSelect={() => setSelected(member)} />
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                {selected.photo ? (
                  <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                <p className="text-primary text-sm font-semibold">{selected.role}</p>
                <p className="text-gray-400 text-xs">{selected.degrees}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{selected.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experts;
