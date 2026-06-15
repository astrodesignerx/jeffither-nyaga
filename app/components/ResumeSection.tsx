"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  IconBook,
  IconCamera,
  IconPlane,
  IconChess,
} from "@tabler/icons-react";
import { siteData } from "@/lib/data";
import { ProgressBar } from "./ProgressBar";

const hobbyIcons: Record<string, React.ElementType> = {
  IconBook,
  IconCamera,
  IconPlane,
  IconChess,
};

export function ResumeSection() {
  const reduce = useReducedMotion();

  return (
    <section id="resume" className="bg-background py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-foreground leading-[1.1] font-[family-name:var(--font-poppins)] uppercase tracking-[-0.01em]">
            Professional
            <br />
            Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
          {/* LEFT COLUMN — Skills */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-8 font-[family-name:var(--font-dm-mono)]">
                Legal Expertise
              </h3>
              <div className="flex flex-col gap-6">
                {siteData.skills.map((skill, i) => (
                  <div key={i}>
                    <ProgressBar name={skill.name} level={skill.level} />
                    <p className="text-[12px] text-muted leading-[1.6] -mt-2 font-[family-name:var(--font-inter)]">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CENTER COLUMN — Experience + Languages */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-6 font-[family-name:var(--font-dm-mono)]">
                Experience
              </h3>
              <div className="relative border-l border-[#ffffff]/10 pl-6">
                {siteData.experience.map((entry, i) => (
                  <div key={i} className="relative pb-8 last:pb-0">
                    <div className="absolute -left-6 top-1 w-[10px] h-[10px] rounded-full bg-[#45B6D1] shadow-[0_0_6px_rgba(69,182,209,0.4)]" />
                    <span className="text-[11px] text-muted font-[family-name:var(--font-dm-mono)] mb-1 block">
                      {entry.year}
                    </span>
                    <p className="text-[clamp(14px,1.5vw,15px)] font-semibold text-foreground font-[family-name:var(--font-poppins)] leading-tight">
                      {entry.role}
                    </p>
                    <p className="text-[clamp(12px,1.3vw,13px)] text-[#45B6D1] mt-0.5 font-[family-name:var(--font-inter)]">
                      {entry.firm}
                    </p>
                    {"description" in entry && (
                      <p className="text-[clamp(11px,1.2vw,12px)] text-muted mt-2 leading-[1.6] font-[family-name:var(--font-inter)]">
                        {entry.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-4 font-[family-name:var(--font-dm-mono)]">
                Languages
              </h3>
              {siteData.languages.map((lang) => (
                <div key={lang.name} className="flex items-baseline gap-2 mb-2">
                  <span className="text-[clamp(13px,1.4vw,14px)] text-foreground font-[family-name:var(--font-inter)]">
                    {lang.name}
                  </span>
                  <span className="text-[11px] text-muted font-[family-name:var(--font-dm-mono)]">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Education + Personal Skills + Hobbies */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-6 font-[family-name:var(--font-dm-mono)]">
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {siteData.education.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 mt-2 shrink-0 rounded-full bg-[#45B6D1]/60" />
                    <div>
                      <p className="text-[13px] text-foreground leading-[1.5] font-[family-name:var(--font-inter)]">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted font-[family-name:var(--font-dm-mono)]">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-6 font-[family-name:var(--font-dm-mono)]">
                Personal Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteData.personalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[12px] text-muted font-[family-name:var(--font-inter)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#45B6D1] mb-6 font-[family-name:var(--font-dm-mono)]">
                Hobbies & Interests
              </h3>
              <div className="flex flex-wrap gap-4">
                {siteData.hobbies.map((hobby) => {
                  const Icon = hobbyIcons[hobby.icon];
                  return (
                    <div
                      key={hobby.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-14 h-14 rounded-full border border-white/10 bg-card flex items-center justify-center hover:border-[#45B6D1]/30 hover:bg-[#45B6D1]/5 transition-colors duration-300">
                        {Icon && (
                          <Icon size={20} strokeWidth={1.5} className="text-[#45B6D1]" />
                        )}
                      </div>
                      <span className="text-[10px] text-muted font-[family-name:var(--font-dm-mono)]">
                        {hobby.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
