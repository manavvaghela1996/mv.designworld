import SectionLabel from "../components/SectionLabel";
import SkillWall from "../components/SkillWall";
import Reveal from "../components/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <Reveal className="mb-10 max-w-3xl md:mb-14">
        <SectionLabel>Tools</SectionLabel>
        <h2 className="mega mt-4 font-display font-bold uppercase">
          Tools &
          <br />
          Expertise
        </h2>
      </Reveal>
      <SkillWall />
    </section>
  );
}
