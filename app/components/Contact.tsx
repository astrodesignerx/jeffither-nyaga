"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { IconMapPin, IconPhone, IconMail, IconClock } from "@tabler/icons-react";
import { siteData } from "@/lib/data";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="bg-background py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-foreground leading-[1.1] font-[family-name:var(--font-poppins)] uppercase tracking-[-0.01em] mb-14">
              Get in
              <br />
              Touch
            </h2>

            <div className="flex flex-col gap-6">
              <div className="rounded-lg border border-white/5 bg-card p-6 flex items-start gap-4 hover:border-[#45B6D1]/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-md bg-[#45B6D1]/10 flex items-center justify-center shrink-0">
                  <IconMapPin size={18} strokeWidth={1.5} className="text-[#45B6D1]" />
                </div>
                <div>
                  <p className="text-[11px] text-muted tracking-[0.1em] uppercase font-[family-name:var(--font-dm-mono)] mb-1">
                    Address
                  </p>
                  <p className="text-[14px] text-foreground font-[family-name:var(--font-inter)]">
                    {siteData.contact.address}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-card p-6 flex items-start gap-4 hover:border-[#45B6D1]/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-md bg-[#45B6D1]/10 flex items-center justify-center shrink-0">
                  <IconPhone size={18} strokeWidth={1.5} className="text-[#45B6D1]" />
                </div>
                <div>
                  <p className="text-[11px] text-muted tracking-[0.1em] uppercase font-[family-name:var(--font-dm-mono)] mb-1">
                    Phone
                  </p>
                  <p className="text-[14px] text-foreground font-[family-name:var(--font-inter)]">
                    {siteData.contact.phone}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-card p-6 flex items-start gap-4 hover:border-[#45B6D1]/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-md bg-[#45B6D1]/10 flex items-center justify-center shrink-0">
                  <IconMail size={18} strokeWidth={1.5} className="text-[#45B6D1]" />
                </div>
                <div>
                  <p className="text-[11px] text-muted tracking-[0.1em] uppercase font-[family-name:var(--font-dm-mono)] mb-1">
                    Email
                  </p>
                  <p className="text-[14px] text-foreground font-[family-name:var(--font-inter)]">
                    {siteData.contact.email}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-card p-6 flex items-start gap-4 hover:border-[#45B6D1]/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-md bg-[#45B6D1]/10 flex items-center justify-center shrink-0">
                  <IconClock size={18} strokeWidth={1.5} className="text-[#45B6D1]" />
                </div>
                <div>
                  <p className="text-[11px] text-muted tracking-[0.1em] uppercase font-[family-name:var(--font-dm-mono)] mb-1">
                    Hours
                  </p>
                  <p className="text-[14px] text-foreground font-[family-name:var(--font-inter)]">
                    {siteData.contact.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <form onSubmit={handleSubmit} className="rounded-lg border border-white/5 bg-card p-8 flex flex-col h-full gap-8">
              <div className="flex flex-col gap-8 flex-1 justify-center">
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[15px] text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-[#45B6D1] font-[family-name:var(--font-inter)]"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[15px] text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-[#45B6D1] font-[family-name:var(--font-inter)]"
                />
              </div>

              <div className="relative">
                <select
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[15px] text-foreground outline-none transition-all duration-300 focus:border-[#45B6D1] font-[family-name:var(--font-inter)] appearance-none cursor-pointer"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled className="text-muted bg-card">
                    Subject
                  </option>
                  <option value="litigation" className="bg-card text-foreground">
                    Litigation
                  </option>
                  <option value="advisory" className="bg-card text-foreground">
                    Advisory
                  </option>
                  <option value="other" className="bg-card text-foreground">
                    Other
                  </option>
                </select>
              </div>

              <div className="relative">
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[15px] text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-[#45B6D1] resize-none font-[family-name:var(--font-inter)]"
                />
              </div>

              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden mt-4 px-10 py-4 border border-[#45B6D1] text-[#45B6D1] text-[12px] tracking-[0.15em] uppercase font-semibold font-[family-name:var(--font-dm-mono)] rounded-sm transition-all duration-300 hover:bg-[#45B6D1] hover:text-background"
              >
                {submitted ? "Message Sent" : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
