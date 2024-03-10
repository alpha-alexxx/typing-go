export const NAV_ITEMS: { name: string; keyword: string; href: string }[] = [
  {
    name: "Home",
    keyword: "home",
    href: "#home",
  },
  {
    name: "About",
    keyword: "about",
    href: "#about",
  },
  {
    name: "Features",
    keyword: "features",
    href: "#features",
  },
  {
    name: "F&Qs",
    keyword: "facts-and-questions",
    href: "#f&qs",
  },
  {
    name: "Contact",
    keyword: "contact",
    href: "#contact",
  },
];
export interface BAR {
  active: string;
  setActive: Function;
}
