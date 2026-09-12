"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.28em] text-accent"
        >
          Full stack developer · Nine ships, one summer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display mt-6 max-w-4xl text-[2.6rem] italic leading-[1.08] tracking-tight text-paper sm:text-6xl"
        >
          Nine products. One summer. No two of them look alike.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I am Abudora. This summer I built a bookmark manager that thinks it
          is a contact sheet, a CV that swaps its whole personality per job,
          and a reader that watches manga pages closely enough to translate
          them on the spot. Nine ideas, nine finished products, all deployed
          and all still running.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            data-cursor="link"
            className="group flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            See the work
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="mailto:m.abdullah21306@gmail.com"
            data-cursor="link"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-accent"
          >
            Say hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
