import {
  Home,
  Calendar,
  BookOpen,
  Info,
  UserRoundKey,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Schedules", href: "/schedules", icon: Calendar },
  { label: "Blog", href: "/posts", icon: BookOpen },
  { label: "About", href: "/about", icon: Info },
];

export const mobileNavLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Schedules", href: "/schedules", icon: Calendar },
  { label: "Blog", href: "/posts", icon: BookOpen },
];

export const menuLinks = [
  { label: "Log In", href: "/login", icon: UserRoundKey },
];

export const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];