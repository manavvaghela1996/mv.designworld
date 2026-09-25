export const SOCIAL_LINKS = {
  behance: "",
  linkedin: "",
  instagram: "",
  facebook: "",
};

const LABELS = {
  behance: "Behance",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

export function getActiveSocialLinks() {
  return Object.entries(SOCIAL_LINKS)
    .filter(([, url]) => typeof url === "string" && /^https?:\/\//.test(url.trim()))
    .map(([key, url]) => ({
      key,
      label: LABELS[key] || key,
      url: url.trim(),
    }));
}
