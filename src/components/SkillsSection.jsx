import { useState } from "react";
import { cn } from "@/lib/utils";
const skills = [
  // Frontend
  { name: "HTML/CSS", level: 99, category: "frontend" },
  { name: "Javascript", level: 94, category: "frontend" },
  { name: "React", level: 82, category: "frontend" },
  { name: "Tailwind CSS", level: 46, category: "frontend" },
  { name: "Typescript", level: 41, category: "frontend" },
  { name: "React Native", level: 62, category: "frontend" },
  //Backend

  { name: "C#", level: 44, category: "backend" },
  { name: "PostgreSQL", level: 36, category: "backend" },
  { name: "NodeJs", level: 72, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  //Tools
  { name: "Git/Github", level: 93, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Minhas <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize hover:scale-105",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-md"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover group"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
              <div className="w-full bg-secondary/50 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full origin-left transition-all duration-1000 ease-out group-hover:shadow-lg"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  Proficiência
                </span>
                <span className="text-sm font-medium text-primary">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Skills counter */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <span className="text-sm font-medium">
              {filteredSkills.length} tecnologias{" "}
              {activeCategory !== "all" && `em ${activeCategory}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
