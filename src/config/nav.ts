import { NavItem } from "@/types/navigation";

export const mainNav: NavItem[] = [
  {
    index: "01",
    title: "Home",
    href: "/#home",
  },
  {
    index: "02",
    title: "About",
    href: "/#about",
  },
  {
    index: "03",
    title: "Projects",
    href: "/#projects",
  },
  {
    index: "04",
    title: "Lab",
    href: "/lab",
  },
  {
    index: "05",
    title: "Skills",
    href: "/#skills",
  },
  {
    index: "06",
    title: "Contact",
    href: "/#contact",
  },
];

export const footerNav = {
  internal: [
    { title: "Home", href: "/" },
    { title: "Specifications", href: "/projects" },
    { title: "Lab", href: "/lab" },
    { title: "Inventor", href: "/#inventor" },
    { title: "Method", href: "/#method" },
    { title: "Correspondence", href: "/#correspondence" },
  ],
  external: [
    {
      title: "GitHub",
      href: "https://github.com/Ashish-Dhankecha",
      external: true,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/ashish-dhankecha-a993703a5/?isSelfProfile=false",
      external: true,
    },
    {
      title: "X (Twitter)",
      href: "https://x.com/Ashishdhankecha",
      external: true,
    },
    {
      title: "Email",
      href: "mailto:ashishdhankecha256@gmail.com",
      external: true,
    },
  ],
};
