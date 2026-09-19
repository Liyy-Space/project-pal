import { useState } from "react";
import booksBanner from "@/assets/books-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen, BarChart2, ClipboardList, TrendingUp,
  FlaskConical, PenLine, FileText, Code2, Database, BrainCircuit,
  Microscope, GraduationCap, Star,
} from "lucide-react";

const categoryMeta = [
  { id: "foundations", icon: BarChart2, color: "text-teal-300", bg: "from-teal-900 to-teal-700" },
  { id: "survey", icon: ClipboardList, color: "text-blue-300", bg: "from-blue-900 to-blue-700" },
  { id: "statistical", icon: TrendingUp, color: "text-purple-300", bg: "from-purple-900 to-purple-700" },
  { id: "clinical", icon: FlaskConical, color: "text-red-300", bg: "from-red-900 to-red-700" },
  { id: "writing", icon: PenLine, color: "text-yellow-300", bg: "from-yellow-900 to-yellow-700" },
  { id: "grants", icon: FileText, color: "text-orange-300", bg: "from-orange-900 to-orange-700" },
  { id: "programming", icon: Code2, color: "text-green-300", bg: "from-green-900 to-green-700" },
  { id: "engineering", icon: Database, color: "text-cyan-300", bg: "from-cyan-900 to-cyan-700" },
  { id: "modelling", icon: BrainCircuit, color: "text-pink-300", bg: "from-pink-900 to-pink-700" },
  { id: "epidemiology", icon: Microscope, color: "text-rose-300", bg: "from-rose-900 to-rose-700" },
  { id: "training", icon: GraduationCap, color: "text-indigo-300", bg: "from-indigo-900 to-indigo-700" },
];

interface Book {
  key: string;
  number: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  rating: number;
  isbn?: string;
  freeLink?: string;
  buyLink?: string;
}

const books: Book[] = [
  { key: "b01", number: 1, title: "R for Data Science (2nd ed.)", author: "Hadley Wickham et al.", publisher: "O'Reilly, 2023", category: "foundations", rating: 4.9, isbn: "9781492097402", freeLink: "https://r4ds.hadley.nz", buyLink: "https://www.amazon.com/dp/1492097403" },
  { key: "b02", number: 2, title: "Python for Data Analysis (3rd ed.)", author: "Wes McKinney", publisher: "O'Reilly, 2022", category: "foundations", rating: 4.8, isbn: "9781098104030", freeLink: "https://wesmckinney.com/book", buyLink: "https://www.amazon.com/dp/109810403X" },
  { key: "b03", number: 3, title: "Python Data Science Handbook (2nd ed.)", author: "Jake VanderPlas", publisher: "O'Reilly, 2023", category: "foundations", rating: 4.8, isbn: "9781098121228", freeLink: "https://jakevdp.github.io/PythonDataScienceHandbook", buyLink: "https://www.amazon.com/dp/1098121228" },
  { key: "b04", number: 4, title: "The Art of Statistics", author: "David Spiegelhalter", publisher: "Pelican/Basic Books, 2019", category: "foundations", rating: 4.7, isbn: "9781541618510", buyLink: "https://www.amazon.com/dp/1541618513" },
  { key: "b05", number: 5, title: "Sampling: Design and Analysis (3rd ed.)", author: "Sharon L. Lohr", publisher: "Chapman & Hall/CRC, 2021", category: "survey", rating: 4.6, isbn: "9780367279509", buyLink: "https://www.routledge.com/Sampling-Design-and-Analysis/Lohr/p/book/9780367279509" },
  { key: "b06", number: 6, title: "Survey Methodology (2nd ed.)", author: "Robert M. Groves et al.", publisher: "Wiley, 2009", category: "survey", rating: 4.5, isbn: "9780470465462", buyLink: "https://www.wiley.com/en-us/Survey+Methodology" },
  { key: "b07", number: 7, title: "Model-Assisted Survey Sampling", author: "Carl-Erik Särndal et al.", publisher: "Springer, 2003", category: "survey", rating: 4.5, isbn: "9780387406206", buyLink: "https://www.springer.com/gp/book/9780387406206" },
  { key: "b08", number: 8, title: "An Introduction to Statistical Learning", author: "Gareth James et al.", publisher: "Springer, 2021/2023", category: "statistical", rating: 4.9, isbn: "9781461471370", freeLink: "https://www.statlearning.com" },
  { key: "b09", number: 9, title: "The Elements of Statistical Learning (2nd ed.)", author: "Trevor Hastie et al.", publisher: "Springer, 2009", category: "statistical", rating: 4.8, isbn: "9780387848570", freeLink: "https://hastie.su.domains/ElemStatLearn" },
  { key: "b10", number: 10, title: "Regression Modeling Strategies (2nd ed.)", author: "Frank E. Harrell Jr.", publisher: "Springer, 2015", category: "statistical", rating: 4.7, isbn: "9783319194240", freeLink: "https://hbiostat.org/rmsc" },
  { key: "b11", number: 11, title: "Categorical Data Analysis (3rd ed.)", author: "Alan Agresti", publisher: "Wiley, 2013", category: "statistical", rating: 4.6, isbn: "9780470463635", buyLink: "https://www.wiley.com/en-us/Categorical+Data+Analysis" },
  { key: "b12", number: 12, title: "Fundamentals of Clinical Trials (5th ed.)", author: "Lawrence M. Friedman et al.", publisher: "Springer, 2015", category: "clinical", rating: 4.7, isbn: "9783319185385", buyLink: "https://www.springer.com/gp/book/9783319185385" },
  { key: "b13", number: 13, title: "Designing Clinical Research (4th ed.)", author: "Stephen B. Hulley et al.", publisher: "Wolters Kluwer, 2013", category: "clinical", rating: 4.6, isbn: "9781608318049", buyLink: "https://www.lww.com/Product/9781608318049" },
  { key: "b14", number: 14, title: "Statistical Monitoring of Clinical Trials", author: "Michael A. Proschan et al.", publisher: "Springer, 2006", category: "clinical", rating: 4.5, isbn: "9780387300597", buyLink: "https://www.springer.com/gp/book/9780387300597" },
  { key: "b15", number: 15, title: "Data Monitoring Committees in Clinical Trials (2nd ed.)", author: "Susan S. Ellenberg et al.", publisher: "Wiley, 2019", category: "clinical", rating: 4.6, isbn: "9781119512653", buyLink: "https://www.wiley.com/en-us/Data+Monitoring+Committees" },
  { key: "b16", number: 16, title: "Successful Scientific Writing (4th ed.)", author: "Janice R. Matthews & Robert W. Matthews", publisher: "Cambridge University Press, 2014", category: "writing", rating: 4.5, isbn: "9781107691551", buyLink: "https://www.cambridge.org/core/books/successful-scientific-writing/" },
  { key: "b17", number: 17, title: "How to Write and Publish a Scientific Paper (8th ed.)", author: "Barbara Gastel & Robert A. Day", publisher: "Cambridge University Press, 2016", category: "writing", rating: 4.5, isbn: "9781316612039", buyLink: "https://www.cambridge.org/core/books/how-to-write-and-publish-a-scientific-paper/" },
  { key: "b18", number: 18, title: "Reporting Guidelines (EQUATOR Network)", author: "CONSORT, STROBE, PRISMA, SPIRIT", publisher: "EQUATOR Network", category: "writing", rating: 4.8, freeLink: "https://www.equator-network.org" },
  { key: "b19", number: 19, title: "The Grant Application Writer's Workbook", author: "Stephen W. Russell & David C. Morrison", publisher: "Grant Writers' Seminars, 2020", category: "grants", rating: 4.5, buyLink: "https://www.grantcentral.com" },
  { key: "b20", number: 20, title: "Writing Science", author: "Joshua Schimel", publisher: "Oxford University Press, 2012", category: "grants", rating: 4.7, isbn: "9780199760244", buyLink: "https://www.amazon.com/dp/0199760241" },
  { key: "b21", number: 21, title: "Advanced R (2nd ed.)", author: "Hadley Wickham", publisher: "Chapman & Hall/CRC, 2019", category: "programming", rating: 4.8, isbn: "9780815384571", freeLink: "https://adv-r.hadley.nz", buyLink: "https://www.amazon.com/dp/0815384572" },
  { key: "b22", number: 22, title: "R Packages (2nd ed.)", author: "Hadley Wickham & Jennifer Bryan", publisher: "O'Reilly, 2023", category: "programming", rating: 4.7, isbn: "9781098134945", freeLink: "https://r-pkgs.org" },
  { key: "b23", number: 23, title: "Fluent Python (2nd ed.)", author: "Luciano Ramalho", publisher: "O'Reilly, 2022", category: "programming", rating: 4.8, isbn: "9781492056355", buyLink: "https://www.amazon.com/dp/1492056359" },
  { key: "b24", number: 24, title: "Clean Code", author: "Robert C. Martin", publisher: "Prentice Hall, 2008", category: "programming", rating: 4.7, isbn: "9780132350884", buyLink: "https://www.amazon.com/dp/0132350882" },
  { key: "b25", number: 25, title: "Fundamentals of Data Engineering", author: "Joe Reis & Matt Housley", publisher: "O'Reilly, 2022", category: "engineering", rating: 4.7, isbn: "9781098108298", buyLink: "https://www.amazon.com/dp/1098108302" },
  { key: "b26", number: 26, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", publisher: "O'Reilly, 2017", category: "engineering", rating: 4.9, isbn: "9781449373320", buyLink: "https://www.amazon.com/dp/1449373321" },
  { key: "b27", number: 27, title: "Tidy Data", author: "Hadley Wickham", publisher: "Journal of Statistical Software, 2014", category: "engineering", rating: 4.6, freeLink: "https://www.jstatsoft.org/article/view/v059i10" },
  { key: "b28", number: 28, title: "Statistical Rethinking (2nd ed.)", author: "Richard McElreath", publisher: "Chapman & Hall/CRC, 2020", category: "modelling", rating: 4.9, isbn: "9780367139919", freeLink: "https://xcelab.net/rm/statistical-rethinking", buyLink: "https://www.amazon.com/dp/036713991X" },
  { key: "b29", number: 29, title: "Bayesian Data Analysis (3rd ed.)", author: "Andrew Gelman et al.", publisher: "Chapman & Hall/CRC, 2013", category: "modelling", rating: 4.8, isbn: "9781439840955", freeLink: "http://www.stat.columbia.edu/~gelman/book" },
  { key: "b30", number: 30, title: "Forecasting: Principles and Practice (3rd ed.)", author: "Rob J. Hyndman & George Athanasopoulos", publisher: "OTexts, 2021", category: "modelling", rating: 4.8, freeLink: "https://otexts.com/fpp3" },
  { key: "b31", number: 31, title: "Modeling Infectious Diseases in Humans and Animals", author: "Matt J. Keeling & Pejman Rohani", publisher: "Princeton University Press, 2008", category: "modelling", rating: 4.6, isbn: "9780691116174", buyLink: "https://www.amazon.com/dp/0691116172" },
  { key: "b32", number: 32, title: "Modern Epidemiology (4th ed.)", author: "Kenneth J. Rothman et al.", publisher: "Wolters Kluwer, 2021", category: "epidemiology", rating: 4.7, isbn: "9781451193282", buyLink: "https://www.lww.com/Product/9781451193282" },
  { key: "b33", number: 33, title: "Causal Inference: What If", author: "Miguel A. Hernán & James M. Robins", publisher: "Chapman & Hall/CRC, 2020", category: "epidemiology", rating: 4.9, freeLink: "https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book" },
  { key: "b34", number: 34, title: "Essential Medical Statistics (2nd ed.)", author: "Betty R. Kirkwood & Jonathan A. C. Sterne", publisher: "Wiley-Blackwell, 2003", category: "epidemiology", rating: 4.6, isbn: "9780865428713", buyLink: "https://www.wiley.com/en-us/Essential+Medical+Statistics" },
  { key: "b35", number: 35, title: "R Markdown: The Definitive Guide", author: "Yihui Xie et al.", publisher: "Chapman & Hall/CRC, 2018", category: "training", rating: 4.7, isbn: "9781138359338", freeLink: "https://bookdown.org/yihui/rmarkdown" },
  { key: "b36", number: 36, title: "The Visual Display of Quantitative Information (2nd ed.)", author: "Edward R. Tufte", publisher: "Graphics Press, 2001", category: "training", rating: 4.8, isbn: "9780961392147", buyLink: "https://www.edwardtufte.com/tufte/books_vdqi" },
  { key: "b37", number: 37, title: "Fundamentals of Data Visualization", author: "Claus O. Wilke", publisher: "O'Reilly, 2019", category: "training", rating: 4.7, isbn: "9781492031086", freeLink: "https://clauswilke.com/dataviz" },
];

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";
const STATS_GRADIENT = "linear-gradient(135deg, hsl(176 69% 22%) 0%, hsl(142 64% 32%) 100%)";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`} />
      ))}
      <span className="text-xs text-white/60 ml-1">{rating}</span>
    </div>
  );
}

function BookCard({ book, catMeta }: { book: Book; catMeta: typeof categoryMeta[0] }) {
  const { t } = useTranslation();
  const Icon = catMeta.icon;
  const [imgError, setImgError] = useState(false);
  const coverUrl = book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg` : null;

  return (
    <div className="group relative w-52 shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:z-10 shadow-xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${catMeta.bg}`} />
      {coverUrl && !imgError ? (
        <img
          src={coverUrl}
          alt={book.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-15 transition-opacity duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Icon className="w-20 h-20 text-white" />
        </div>
      )}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
      <div className="relative z-10 p-4 h-72 flex flex-col justify-between">
        <div>
          <span className="text-white/30 text-xs font-bold">#{String(book.number).padStart(2, "0")}</span>
          <h3 className="text-white font-bold text-sm leading-snug mt-1 line-clamp-2">{book.title}</h3>
          <p className={`text-xs mt-1 font-medium ${catMeta.color}`}>{book.author}</p>
          <div className="mt-2"><StarRating rating={book.rating} /></div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{t(`books.items.${book.key}`)}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/40 text-xs">{book.publisher}</p>
          <div className="flex gap-2 flex-wrap">
            {book.freeLink && (
              <a href={book.freeLink} target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full backdrop-blur-md bg-teal-500/30 border border-teal-400/40 text-teal-200 hover:bg-teal-500/50 transition-all"
                onClick={(e) => e.stopPropagation()}>
                {t("books.freeOnline")}
              </a>
            )}
            {book.buyLink && (
              <a href={book.buyLink} target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all"
                onClick={(e) => e.stopPropagation()}>
                {t("books.buyNow")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCarousel({ category }: { category: typeof categoryMeta[0] }) {
  const { t } = useTranslation();
  const catBooks = books.filter((b) => b.category === category.id);
  if (catBooks.length === 0) return null;
  const doubled = [...catBooks, ...catBooks, ...catBooks];
  const Icon = category.icon;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${category.bg} flex items-center justify-center shadow-lg`}>
          <Icon className={`w-4 h-4 ${category.color}`} />
        </div>
        <h2 className="text-xl font-bold text-foreground">{t(`books.categories.${category.id}`)}</h2>
        <span className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full">
          {catBooks.length} {t("books.booksCountSuffix")}
        </span>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        <div
          className="flex gap-4 pb-4 carousel-track"
          style={{ animation: `scroll-left ${catBooks.length * 5}s linear infinite`, width: "max-content" }}
        >
          {doubled.map((book, i) => (
            <BookCard key={`${book.number}-${i}`} book={book} catMeta={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Books = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">

      {/* Hero Banner */}
      <div className="relative h-80 md:h-[420px] overflow-hidden">
        <img
          src={booksBanner}
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT, opacity: 0.85 }} />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("books.hero.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl leading-tight">
            {t("books.hero.titleMain")} <span className="text-teal-300">{t("books.hero.titleHighlight")}</span>
          </h1>
          <p className="text-white/70 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
            {t("books.hero.subtitle")}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#books"
              className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all text-sm shadow-lg shadow-teal-500/30">
              {t("books.hero.browseButton")}
            </a>
            <Link to="/contact"
              className="px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm backdrop-blur-sm">
              {t("books.hero.suggestButton")}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="py-5 text-white" style={{ background: STATS_GRADIENT }}>
        <div className="container flex flex-wrap justify-center gap-12 text-center">
          {[
            { num: "37", key: "curatedResources" },
            { num: "11", key: "categories" },
            { num: "20+", key: "freeOnlineStat" },
            { num: "100%", key: "expertPicks" },
          ].map((s) => (
            <div key={s.key}>
              <span className="font-bold text-2xl text-white">{s.num}</span>
              <p className="text-xs text-white/60 mt-0.5">{t(`books.stats.${s.key}`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousels Section */}
      <section id="books" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("books.section.eyebrow")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">{t("books.section.title")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t("books.section.subtitle")}</p>
          </div>

          {categoryMeta.map((cat) => (
            <CategoryCarousel key={cat.id} category={cat} />
          ))}

          <p className="text-center text-xs text-muted-foreground mt-4 opacity-50">
            {t("books.disclaimer")}
          </p>

          {/* Suggest CTA */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-10 text-center" style={{ background: HERO_GRADIENT }}>
              <BookOpen className="w-10 h-10 text-teal-300 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold text-white mb-3">{t("books.suggestCta.title")}</h3>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                {t("books.suggestCta.subtitle")}
              </p>
              <Link to="/contact"
                className="inline-block px-8 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30">
                {t("books.suggestCta.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Books;