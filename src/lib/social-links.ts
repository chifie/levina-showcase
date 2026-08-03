import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";

export const SOCIAL_LINKS: { Icon: IconType; href: string; label: string }[] = [
  { Icon: FaGithub, href: "https://github.com/chifie", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://linkedin.com/in/levinachifie", label: "LinkedIn" },
  { Icon: FaEnvelope, href: "mailto:levinachifie@gmail.com", label: "Email" },
];
