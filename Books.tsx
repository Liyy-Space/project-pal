import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, ExternalLink, BarChart2, ClipboardList, TrendingUp,
  FlaskConical, PenLine, FileText, Code2, Database, BrainCircuit,
  Microscope, GraduationCap, Star,
} from "lucide-react";

const categories = [
  { id: "foundations", label: "Foundations & Data Science", icon: BarChart2, color: "text-teal-400", bg: "from-teal-900 to-teal-700" },
  { id: "survey", label: "Survey Methodology", icon: ClipboardList, color: "text-blue-400", bg: "from-blue-900 to-blue-700" },
  { id: "statistical", label: "Statistical Consultancy", icon: TrendingUp, color: "text-purple-400", bg: "from-purple-900 to-purple-700" },
  { id: "clinical", label: "Clinical Trials", icon: FlaskConical, color: "text-red-400", bg: "from-red-900 to-red-700" },
  { id: "writing", label: "Scientific Writing", icon: PenLine, color: "text-yellow-400", bg: "from-yellow-900 to-yellow-700" },
  { id: "grants", label: "Grants & Proposals", icon: FileText, color: "text-orange-400", bg: "from-orange-900 to-orange-700" },
  { id: "programming", label: "Programming & Software", icon: Code2, color: "text-green-400", bg: "from-green-900 to-green-700" },
  { id: "engineering", label: "Data Engineering", icon: Database, color: "text-cyan-400", bg: "from-cyan-900 to-cyan-700" },
  { id: "modelling", label: "Mathematical Modelling", icon: BrainCircuit, color: "text-pink-400", bg: "from-pink-900 to-pink-700" },
  { id: "epidemiology", label: "Epidemiology", icon: Microscope, color: "text-rose-400", bg: "from-rose-900 to-rose-700" },
  { id: "training", label: "Training & Reproducibility", icon: GraduationCap, color: "text-indigo-400", bg: "from-indigo-900 to-indigo-700" },
];

interface Book {
  number: number;
  title: string;
  author: string;
  publisher: string;
  desc: string;
  category: string;
  rating: number;
  isbn?: string;
  freeLink?: string;
  buyLink?: string;
}

const books: Book[] = [
  { number: 1, title: "R for Data Science (2nd ed.)", author: "Hadley Wickham et al.", publisher: "O'Reilly, 2023", desc: "The standard entry point to the tidyverse: importing, tidying, transforming, visualising and modelling data in R.", category: "foundations", rating: 4.9, isbn: "9781492097402", freeLink: "https://r4ds.hadley.nz", buyLink: "https://www.amazon.com/dp/1492097403" },
  { number: 2, title: "Python for Data Analysis (3rd ed.)", author: "Wes McKinney", publisher: "O'Reilly, 2022", desc: "Data wrangling with pandas and NumPy, by the creator of pandas.", category: "foundations", rating: 4.8, isbn: "9781098104030", freeLink: "https://wesmckinney.com/book", buyLink: "https://www.amazon.com/dp/109810403X" },
  { number: 3, title: "Python Data Science Handbook (2nd ed.)", author: "Jake VanderPlas", publisher: "O'Reilly, 2023", desc: "NumPy, pandas, Matplotlib and scikit-learn for the working data scientist.", category: "foundations", rating: 4.8, isbn: "9781098121228", freeLink: "https://jakevdp.github.io/PythonDataScienceHandbook", buyLink: "https://www.amazon.com/dp/1098121228" },
  { number: 4, title: "The Art of Statistics", author: "David Spiegelhalter", publisher: "Pelican/Basic Books, 2019", desc: "Statistical thinking for a general and professional audience — excellent for non-specialist stakeholders.", category: "foundations", rating: 4.7, isbn: "9781541618510", buyLink: "https://www.amazon.com/dp/1541618513" },
  { number: 5, title: "Sampling: Design and Analysis (3rd ed.)", author: "Sharon L. Lohr", publisher: "Chapman & Hall/CRC, 2021", desc: "A clear, modern treatment of survey sampling theory and practice.", category: "survey", rating: 4.6, isbn: "9780367279509", buyLink: "https://www.routledge.com/Sampling-Design-and-Analysis/Lohr/p/book/9780367279509" },
  { number: 6, title: "Survey Methodology (2nd ed.)", author: "Robert M. Groves et al.", publisher: "Wiley, 2009", desc: "The foundational text on total survey error, questionnaire design and survey operations.", category: "survey", rating: 4.5, isbn: "9780470465462", buyLink: "https://www.wiley.com/en-us/Survey+Methodology" },
  { number: 7, title: "Model-Assisted Survey Sampling", author: "Carl-Erik Särndal et al.", publisher: "Springer, 2003", desc: "The reference for design-based inference and calibration estimators in complex surveys.", category: "survey", rating: 4.5, isbn: "9780387406206", buyLink: "https://www.springer.com/gp/book/9780387406206" },
  { number: 8, title: "An Introduction to Statistical Learning", author: "Gareth James et al.", publisher: "Springer, 2021/2023", desc: "The most accessible route into modern statistical learning; Springer-authorised free PDFs.", category: "statistical", rating: 4.9, isbn: "9781461471370", freeLink: "https://www.statlearning.com" },
  { number: 9, title: "The Elements of Statistical Learning (2nd ed.)", author: "Trevor Hastie et al.", publisher: "Springer, 2009", desc: "The advanced companion to ISL — the deeper theory behind the methods.", category: "statistical", rating: 4.8, isbn: "9780387848570", freeLink: "https://hastie.su.domains/ElemStatLearn" },
  { number: 10, title: "Regression Modeling Strategies (2nd ed.)", author: "Frank E. Harrell Jr.", publisher: "Springer, 2015", desc: "Indispensable for applied regression, splines, validation and prediction modelling.", category: "statistical", rating: 4.7, isbn: "9783319194240", freeLink: "https://hbiostat.org/rmsc" },
  { number: 11, title: "Categorical Data Analysis (3rd ed.)", author: "Alan Agresti", publisher: "Wiley, 2013", desc: "The standard reference for logistic regression, contingency tables and models for categorical outcomes.", category: "statistical", rating: 4.6, isbn: "9780470463635", buyLink: "https://www.wiley.com/en-us/Categorical+Data+Analysis" },
  { number: 12, title: "Fundamentals of Clinical Trials (5th ed.)", author: "Lawrence M. Friedman et al.", publisher: "Springer, 2015", desc: "The core text on trial design, conduct, monitoring and analysis.", category: "clinical", rating: 4.7, isbn: "9783319185385", buyLink: "https://www.springer.com/gp/book/9783319185385" },
  { number: 13, title: "Designing Clinical Research (4th ed.)", author: "Stephen B. Hulley et al.", publisher: "Wolters Kluwer, 2013", desc: "Practical guidance on research questions, study designs and sample size.", category: "clinical", rating: 4.6, isbn: "9781608318049", buyLink: "https://www.lww.com/Product/9781608318049" },
  { number: 14, title: "Statistical Monitoring of Clinical Trials", author: "Michael A. Proschan et al.", publisher: "Springer, 2006", desc: "Group-sequential methods and interim monitoring — directly relevant to DSMB statistical work.", category: "clinical", rating: 4.5, isbn: "9780387300597", buyLink: "https://www.springer.com/gp/book/9780387300597" },
  { number: 15, title: "Data Monitoring Committees in Clinical Trials (2nd ed.)", author: "Susan S. Ellenberg et al.", publisher: "Wiley, 2019", desc: "The definitive practical guide to running and contributing to DSMBs.", category: "clinical", rating: 4.6, isbn: "9781119512653", buyLink: "https://www.wiley.com/en-us/Data+Monitoring+Committees" },
  { number: 16, title: "Successful Scientific Writing (4th ed.)", author: "Janice R. Matthews & Robert W. Matthews", publisher: "Cambridge University Press, 2014", desc: "A practical guide to writing and publishing in the biological and health sciences.", category: "writing", rating: 4.5, isbn: "9781107691551", buyLink: "https://www.cambridge.org/core/books/successful-scientific-writing/" },
  { number: 17, title: "How to Write and Publish a Scientific Paper (8th ed.)", author: "Barbara Gastel & Robert A. Day", publisher: "Cambridge University Press, 2016", desc: "A long-standing standard on structuring and submitting scientific manuscripts.", category: "writing", rating: 4.5, isbn: "9781316612039", buyLink: "https://www.cambridge.org/core/books/how-to-write-and-publish-a-scientific-paper/" },
  { number: 18, title: "Reporting Guidelines (EQUATOR Network)", author: "CONSORT, STROBE, PRISMA, SPIRIT", publisher: "EQUATOR Network", desc: "The essential checklists every manuscript and protocol should follow.", category: "writing", rating: 4.8, freeLink: "https://www.equator-network.org" },
  { number: 19, title: "The Grant Application Writer's Workbook", author: "Stephen W. Russell & David C. Morrison", publisher: "Grant Writers' Seminars, 2020", desc: "A structured, widely used workbook for building competitive proposals.", category: "grants", rating: 4.5, buyLink: "https://www.grantcentral.com" },
  { number: 20, title: "Writing Science", author: "Joshua Schimel", publisher: "Oxford University Press, 2012", desc: "On narrative and structure in both papers and funding proposals.", category: "grants", rating: 4.7, isbn: "9780199760244", buyLink: "https://www.amazon.com/dp/0199760241" },
  { number: 21, title: "Advanced R (2nd ed.)", author: "Hadley Wickham", publisher: "Chapman & Hall/CRC, 2019", desc: "How R really works — essential for writing robust, efficient R code and packages.", category: "programming", rating: 4.8, isbn: "9780815384571", freeLink: "https://adv-r.hadley.nz", buyLink: "https://www.amazon.com/dp/0815384572" },
  { number: 22, title: "R Packages (2nd ed.)", author: "Hadley Wickham & Jennifer Bryan", publisher: "O'Reilly, 2023", desc: "The reference for building, testing and shipping R packages.", category: "programming", rating: 4.7, isbn: "9781098134945", freeLink: "https://r-pkgs.org" },
  { number: 23, title: "Fluent Python (2nd ed.)", author: "Luciano Ramalho", publisher: "O'Reilly, 2022", desc: "Writing idiomatic, high-quality Python — a step beyond introductory texts.", category: "programming", rating: 4.8, isbn: "9781492056355", buyLink: "https://www.amazon.com/dp/1492056359" },
  { number: 24, title: "Clean Code", author: "Robert C. Martin", publisher: "Prentice Hall, 2008", desc: "Principles of readable, maintainable code that apply across languages.", category: "programming", rating: 4.7, isbn: "9780132350884", buyLink: "https://www.amazon.com/dp/0132350882" },
  { number: 25, title: "Fundamentals of Data Engineering", author: "Joe Reis & Matt Housley", publisher: "O'Reilly, 2022", desc: "A vendor-neutral map of the modern data lifecycle.", category: "engineering", rating: 4.7, isbn: "9781098108298", buyLink: "https://www.amazon.com/dp/1098108302" },
  { number: 26, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", publisher: "O'Reilly, 2017", desc: "The reference on the systems behind reliable, scalable data infrastructure.", category: "engineering", rating: 4.9, isbn: "9781449373320", buyLink: "https://www.amazon.com/dp/1449373321" },
  { number: 27, title: "Tidy Data", author: "Hadley Wickham", publisher: "Journal of Statistical Software, 2014", desc: "The short, foundational paper on structuring data for analysis — free.", category: "engineering", rating: 4.6, freeLink: "https://www.jstatsoft.org/article/view/v059i10" },
  { number: 28, title: "Statistical Rethinking (2nd ed.)", author: "Richard McElreath", publisher: "Chapman & Hall/CRC, 2020", desc: "The best modern introduction to applied Bayesian modelling.", category: "modelling", rating: 4.9, isbn: "9780367139919", freeLink: "https://xcelab.net/rm/statistical-rethinking", buyLink: "https://www.amazon.com/dp/036713991X" },
  { number: 29, title: "Bayesian Data Analysis (3rd ed.)", author: "Andrew Gelman et al.", publisher: "Chapman & Hall/CRC, 2013", desc: "The comprehensive Bayesian reference; the authors provide a free PDF.", category: "modelling", rating: 4.8, isbn: "9781439840955", freeLink: "http://www.stat.columbia.edu/~gelman/book" },
  { number: 30, title: "Forecasting: Principles and Practice (3rd ed.)", author: "Rob J. Hyndman & George Athanasopoulos", publisher: "OTexts, 2021", desc: "The standard, fully free text on time-series forecasting.", category: "modelling", rating: 4.8, freeLink: "https://otexts.com/fpp3" },
  { number: 31, title: "Modeling Infectious Diseases in Humans and Animals", author: "Matt J. Keeling & Pejman Rohani", publisher: "Princeton University Press, 2008", desc: "The reference for compartmental and transmission-dynamic models.", category: "modelling", rating: 4.6, isbn: "9780691116174", buyLink: "https://www.amazon.com/dp/0691116172" },
  { number: 32, title: "Modern Epidemiology (4th ed.)", author: "Kenneth J. Rothman et al.", publisher: "Wolters Kluwer, 2021", desc: "The definitive graduate-level epidemiology reference.", category: "epidemiology", rating: 4.7, isbn: "9781451193282", buyLink: "https://www.lww.com/Product/9781451193282" },
  { number: 33, title: "Causal Inference: What If", author: "Miguel A. Hernán & James M. Robins", publisher: "Chapman & Hall/CRC, 2020", desc: "The leading modern text on causal inference from observational data.", category: "epidemiology", rating: 4.9, freeLink: "https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book" },
  { number: 34, title: "Essential Medical Statistics (2nd ed.)", author: "Betty R. Kirkwood & Jonathan A. C. Sterne", publisher: "Wiley-Blackwell, 2003", desc: "A clear, applied medical-statistics text widely used in public-health training.", category: "epidemiology", rating: 4.6, isbn: "9780865428713", buyLink: "https://www.wiley.com/en-us/Essential+Medical+Statistics" },
  { number: 35, title: "R Markdown: The Definitive Guide", author: "Yihui Xie et al.", publisher: "Chapman & Hall/CRC, 2018", desc: "Reproducible reporting and automated documents in R.", category: "training", rating: 4.7, isbn: "9781138359338", freeLink: "https://bookdown.org/yihui/rmarkdown" },
  { number: 36, title: "The Visual Display of Quantitative Information (2nd ed.)", author: "Edward R. Tufte", publisher: "Graphics Press, 2001", desc: "The classic on data visualisation and the ethics of showing data well.", category: "training", rating: 4.8, isbn: "9780961392147", buyLink: "https://www.edwardtufte.com/tufte/books_vdqi" },
  { number: 37, title: "Fundamentals of Data Visualization", author: "Claus O. Wilke", publisher: "O'Reilly, 2019", desc: "A practical, free guide to making clear, honest figures.", category: "training", rating: 4.7, isbn: "9781492031086", freeLink: "https://clauswilke.com/dataviz" },
];

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

function BookCard({ book, catMeta }: { book: Book; catMeta: typeof categories[0] }) {
  const Icon = catMeta.icon;
  const [imgError, setImgError] = useState(false);
  const coverUrl = book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg` : null;

  return (
    <div className="group relative w-52 shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:z-10">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${catMeta.bg} opacity-90`} />

      {/* Book cover image */}
      {coverUrl && !imgError ? (
        <img
          src={coverUrl}
          alt={book.title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Icon className="w-20 h-20 text-white" />
        </div>
      )}

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20 group-hover:bg-black/10 transition-all duration-500" />

      {/* Glass card content */}
      <div className="relative z-10 p-4 h-72 flex flex-col justify-between">
        {/* Top */}
        <div>
          <span className="text-white/40 text-xs font-bold">#{String(book.number).padStart(2, "0")}</span>
          <h3 className="text-white font-bold text-sm leading-snug mt-1 line-clamp-2">{book.title}</h3>
          <p className="text-white/70 text-xs mt-1">{book.author}</p>
          <div className="mt-2">
            <StarRating rating={book.rating} />
          </div>
        </div>

        {/* Description - shows on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{book.desc}</p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2">
          <p className="text-white/50 text-xs">{book.publisher}</p>

          {/* Glass buttons */}
          <div className="flex gap-2 flex-wrap">
            {book.freeLink && (
              <a
                href={book.freeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                Free Online ↗
              </a>
            )}
            {book.buyLink && (
              <a
                href={book.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                Buy Now ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCarousel({ category }: { category: typeof categories[0] }) {
  const catBooks = books.filter((b) => b.category === category.id);
  if (catBooks.length === 0) return null;

  // Duplicate books for infinite scroll effect
  const doubled = [...catBooks, ...catBooks, ...catBooks];
  const Icon = category.icon;

  return (
    <div className="mb-16">
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${category.color}`} />
        </div>
        <h2 className="text-xl font-bold text-foreground">{category.label}</h2>
        <span className="text-sm text-muted-foreground">({catBooks.length} books)</span>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 pb-4"
          style={{
            animation: `scroll-left ${catBooks.length * 4}s linear infinite`,
            width: "max-content",
          }}
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
  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Books"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/40 flex flex-col items-start justify-center px-8 md:px-20">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Curated Reading List</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-xl leading-tight">
            Essential Books for Data Professionals
          </h1>
          <p className="text-white/70 max-w-lg mb-6 text-sm md:text-base">
            37 hand-picked titles across data science, statistics, clinical research, and more.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#books"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Browse Collection
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              Suggest a Book
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container flex flex-wrap justify-center gap-8 text-center">
          <div><span className="font-bold text-xl">37</span><p className="text-xs opacity-80">Curated Books</p></div>
          <div><span className="font-bold text-xl">11</span><p className="text-xs opacity-80">Categories</p></div>
          <div><span className="font-bold text-xl">20+</span><p className="text-xs opacity-80">Free Online</p></div>
          <div><span className="font-bold text-xl">100%</span><p className="text-xs opacity-80">Expert Picks</p></div>
        </div>
      </div>

      {/* Carousels Section */}
      <section id="books" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Hover over any book to see more details.</p>
          </div>

          {categories.map((cat) => (
            <CategoryCarousel key={cat.id} category={cat} />
          ))}

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground mt-4 opacity-60">
            Book covers and information are provided for reference purposes only. All rights belong to their respective authors and publishers.
          </p>

          {/* Suggest a title */}
          <div className="mt-8 text-center bg-card rounded-lg p-8 shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-3">Suggest a Title</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              This list grows. If there is a book that has shaped how you work — tell us and we will consider it for the collection.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Suggest a Book
            </Link>
          </div>
        </div>
      </section>

      {/* CSS for scroll animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default Books;
