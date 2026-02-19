import { useState } from "react";
import { BookOpen, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedCard from "@/components/AnimatedCard";

const categories = ["all", "beginner", "python", "machine-learning", "statistics", "intermediate", "advanced", "r"];

const books = [
  { title: "Data Science for Beginners: A Complete Guide", author: "Sarah Johnson & Michael Chen", desc: "Perfect introduction to data science concepts, tools, and methodologies.", level: "Beginner", category: "beginner", rating: 4.8, tags: ["Python Basics", "Data Visualization", "Statistics", "Pandas"], img: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Python for Data Analysis: 3rd Edition", author: "Wes McKinney", desc: "The definitive guide to data manipulation and analysis with Python.", level: "Beginner to Intermediate", category: "python", rating: 4.9, tags: ["NumPy", "Pandas", "Matplotlib", "Data Cleaning"], img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Hands-On Machine Learning with Scikit-Learn and TensorFlow", author: "Aurélien Géron", desc: "Practical guide to machine learning with concrete examples and minimal theory.", level: "Intermediate", category: "machine-learning", rating: 4.7, tags: ["Scikit-Learn", "TensorFlow", "Deep Learning", "Neural Networks"], img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "An Introduction to Statistical Learning", author: "Gareth James et al.", desc: "Accessible introduction to statistical learning methods with R code examples.", level: "Intermediate", category: "statistics", rating: 4.6, tags: ["Statistical Learning", "R Programming", "Regression", "Classification"], img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", desc: "Comprehensive treatment of pattern recognition from a Bayesian perspective.", level: "Advanced", category: "advanced", rating: 4.5, tags: ["Bayesian Methods", "Pattern Recognition", "Probability", "Advanced ML"], img: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "R for Data Science: 2nd Edition", author: "Hadley Wickham & Garrett Grolemund", desc: "Learn how to turn raw data into understanding using R and the tidyverse.", level: "Beginner to Intermediate", category: "r", rating: 4.8, tags: ["Tidyverse", "ggplot2", "dplyr", "Data Wrangling"], img: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Feature Engineering for Machine Learning", author: "Alice Zheng & Amanda Casari", desc: "Practical techniques that can make the difference between mediocre and excellent ML models.", level: "Intermediate", category: "intermediate", rating: 4.7, tags: ["Feature Engineering", "Data Preprocessing", "Model Performance", "Python"], img: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Deep Learning", author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville", desc: "The definitive textbook on deep learning with comprehensive mathematical foundations.", level: "Advanced", category: "advanced", rating: 4.9, tags: ["Deep Learning", "Neural Networks", "Optimization", "Regularization"], img: "https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Storytelling with Data", author: "Cole Nussbaumer Knaflic", desc: "Learn how to communicate effectively with data through compelling visualizations.", level: "Beginner", category: "beginner", rating: 4.6, tags: ["Data Visualization", "Communication", "Business Intelligence", "Presentation"], img: "https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Interpretable Machine Learning", author: "Christoph Molnar", desc: "A guide for making black box models explainable.", level: "Intermediate to Advanced", category: "machine-learning", rating: 4.7, tags: ["Model Interpretability", "Explainable AI", "SHAP", "LIME"], img: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const Books = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? books : books.filter((b) => b.category === filter);

  return (
    <div className="pt-16">
      <PageHero icon={BookOpen} title="Data Science Books" description="Curated collection of essential books for data scientists, analysts, and business professionals." />

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {c === "machine-learning" ? "Machine Learning" : c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b, i) => (
              <AnimatedCard key={b.title} delay={i * 0.05}>
                <div className="relative">
                  <img src={b.img} alt={b.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full capitalize">{b.category}</span>
                  <span className="absolute top-3 right-3 bg-card/90 text-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {b.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-1 text-sm leading-snug">{b.title}</h3>
                  <p className="text-primary text-xs mb-2">by {b.author}</p>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{b.desc}</p>
                  <p className="text-xs text-muted-foreground mb-3"><strong>Level:</strong> {b.level}</p>
                  <div className="flex flex-wrap gap-1">
                    {b.tags.map((t) => (
                      <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
