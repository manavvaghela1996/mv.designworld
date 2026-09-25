import { hobbies } from "../data/hobbies";

export default function Hobbies() {
  if (!hobbies.length) return null;

  return (
    <section id="hobbies" className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10">
      <h2 className="text-[11px] uppercase tracking-[0.28em] text-muted">Personal hobby</h2>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {hobbies.map((hobby) => (
          <li key={hobby.name} className="font-display text-3xl uppercase">
            {hobby.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
