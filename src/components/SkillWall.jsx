import { tools, capabilities } from "../data/skills";
import Reveal from "./Reveal";

export default function SkillWall() {
  return (
    <div>
      <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
        {tools.map((tool) => (
          <li key={tool.name} className="border-b border-r border-line">
            <div
              tabIndex={0}
              className="group relative flex min-h-40 flex-col justify-between bg-surface p-4 transition-colors duration-300 hover:bg-ink hover:text-bg focus-visible:bg-ink focus-visible:text-bg sm:min-h-52 sm:p-6"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted group-hover:text-bg/60 group-focus-visible:text-bg/60">
                Tool
              </span>
              <span className="font-display text-5xl leading-none transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110 sm:text-6xl">
                {tool.short}
              </span>
              <span className="max-w-[12ch] text-sm opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {tool.name}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </div>
          </li>
        ))}
      </ul>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {capabilities.map((item, index) => (
          <Reveal key={item} delay={index * 0.04}>
            <li className="group flex items-center justify-between gap-4 py-4 sm:py-5">
              <span className="font-display text-2xl uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                {item}
              </span>
              <span className="h-2.5 w-2.5 shrink-0 bg-transparent transition group-hover:bg-accent" />
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
