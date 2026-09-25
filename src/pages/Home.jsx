import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import About from "../sections/About";
import Work from "../sections/Work";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Languages from "../sections/Languages";
import Hobbies from "../sections/Hobbies";
import Process from "../sections/Process";
import Statement from "../sections/Statement";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Education />
      <Languages />
      <Hobbies />
      {/* <Process /> */}
      <Statement />
      <Contact />
    </main>
  );
}
