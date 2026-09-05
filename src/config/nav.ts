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
    { title: "Home", href: "/#home" },
    { title: "About", href: "/#about" },
    { title: "Projects", href: "/#projects" },
    { title: "Lab", href: "/lab" },
    { title: "Skills", href: "/#skills" },
    { title: "Contact", href: "/#contact" },
  ],
  external: [
    {
      title: "GitHub",
      href: "https://github.com/Ashish-Dhankecha",
      external: true,
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com",
      external: true,
    },
    {
      title: "Email",
      href: "mailto:ashishdhankecha256@gmail.com",
      external: true,
    },
  ],
};
