/**
 * Portfolio slots.
 * These are editable placeholders, not completed case studies.
 * Replace copy, year, role, tools, and images when real work is available.
 *
 * Portrait: public/assets/manav-profile.png
 * Project images: public/assets/projects/project-01.jpg ... project-08.jpg
 */

export const projects = [
  {
    number: "01",
    slug: "brand-identity",
    title: "Brand Identity",
    category: "Brand Identity",
    year: "",
    placeholder: true,
    layout: "featured",
    image: "/assets/projects/project-01.jpg",
    imageAlt: "Placeholder for a brand identity project",
    summary:
      "An open slot for a brand identity project. Replace this copy, the year, and the image when the work is ready.",
    overview:
      "This page is a placeholder for a brand identity case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "02",
    slug: "ui-ux-experience",
    title: "UI/UX Experience",
    category: "UI/UX Experience",
    year: "",
    placeholder: true,
    layout: "tall",
    image: "/assets/projects/project-02.jpg",
    imageAlt: "Placeholder for a UI/UX project",
    summary:
      "An open slot for an interface project. Add screens, the problem, and the design decisions here.",
    overview:
      "This page is a placeholder for a UI/UX case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "03",
    slug: "social-media-design",
    title: "Social Media Design",
    category: "Social Media Design",
    year: "",
    placeholder: true,
    layout: "wide",
    image: "/assets/projects/project-03.jpg",
    imageAlt: "Placeholder for a social media design project",
    summary:
      "An open slot for social and campaign visuals. Swap in the real series when assets are available.",
    overview:
      "This page is a placeholder for a social media design case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "04",
    slug: "digital-campaign",
    title: "Digital Campaign",
    category: "Digital Campaign",
    year: "",
    placeholder: true,
    layout: "editorial",
    image: "/assets/projects/project-04.jpg",
    imageAlt: "Placeholder for a digital campaign project",
    summary:
      "An open slot for a digital campaign. Use this layout for a wider story once the work exists.",
    overview:
      "This page is a placeholder for a digital campaign case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "05",
    slug: "visual-design",
    title: "Visual Design",
    category: "Visual Design",
    year: "",
    placeholder: true,
    layout: "portrait",
    image: "/assets/projects/project-05.jpg",
    imageAlt: "Placeholder for a visual design project",
    summary:
      "An open slot for visual design work. Replace the plate with a finished image and a short description.",
    overview:
      "This page is a placeholder for a visual design case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "06",
    slug: "mobile-app-ui",
    title: "Mobile App UI",
    category: "Mobile App UI",
    year: "",
    placeholder: true,
    layout: "landscape",
    image: "/assets/projects/project-06.jpg",
    imageAlt: "Placeholder for a mobile app UI project",
    summary:
      "An open slot for a mobile interface. Add flows, screens, and notes when a real project is ready.",
    overview:
      "This page is a placeholder for a mobile app UI case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "07",
    slug: "web-design",
    title: "Web Design",
    category: "Web Design",
    year: "",
    placeholder: true,
    layout: "full",
    image: "/assets/projects/project-07.jpg",
    imageAlt: "Placeholder for a web design project",
    summary:
      "An open slot for a website or digital layout. Point the image path at the final key visual.",
    overview:
      "This page is a placeholder for a web design case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
  {
    number: "08",
    slug: "creative-direction",
    title: "Creative Direction",
    category: "Creative Direction",
    year: "",
    placeholder: true,
    layout: "reverse",
    image: "/assets/projects/project-08.jpg",
    imageAlt: "Placeholder for a creative direction project",
    summary:
      "An open slot for direction-led work. Replace this entry rather than presenting it as a finished project.",
    overview:
      "This page is a placeholder for a creative direction case study. Add the real overview, role, tools, and images in src/data/projects.js.",
    role: "",
    tools: [],
    gallery: [],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbors(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { prev: null, next: null };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
