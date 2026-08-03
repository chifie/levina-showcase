import type { ComponentType, CSSProperties } from "react";
import {
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaCode,
  FaPython,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDart,
  SiNextdotjs,
  SiFlutter,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiPhp,
} from "react-icons/si";

export type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

export interface Skill {
  name: string;
  icon: SkillIcon;
  level: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: SkillIcon;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: FaCode,
    skills: [
      { name: "JavaScript", icon: FaJs, level: 92, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, level: 85, color: "#3178C6" },
      { name: "Python", icon: FaPython, level: 78, color: "#3776AB" },
      { name: "PHP", icon: SiPhp, level: 72, color: "#777BB4" },
    ],
  },
  {
    title: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React", icon: FaReact, level: 90, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, level: 80, color: "#000000" },
      { name: "HTML5", icon: FaHtml5, level: 95, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, level: 90, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: FaNodeJs,
    skills: [
      { name: "FastAPI", icon: FaCode, level: 75, color: "#009688" },
      { name: "NestJS", icon: SiTypescript, level: 70, color: "#E0234E" },
      { name: "Express.js", icon: SiExpress, level: 78, color: "#000000" },
      { name: "Node.js", icon: FaNodeJs, level: 82, color: "#339933" },
      { name: "REST APIs", icon: FaCode, level: 85, color: "#6366F1" },
    ],
  },
  {
    title: "Mobile",
    icon: SiFlutter,
    skills: [
      { name: "Flutter", icon: SiFlutter, level: 72, color: "#02569B" },
      { name: "Dart", icon: SiDart, level: 70, color: "#0175C2" },
    ],
  },
  {
    title: "Databases",
    icon: SiPostgresql,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 65, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, level: 72, color: "#4479A1" },
    ],
  },
  {
    title: "Tools",
    icon: FaGitAlt,
    skills: [
      { name: "Git", icon: FaGitAlt, level: 88, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, level: 85, color: "#181717" },
      { name: "VS Code", icon: FaCode, level: 90, color: "#007ACC" },
      { name: "Postman", icon: FaCode, level: 80, color: "#FF6C37" },
      { name: "Docker", icon: FaDocker, level: 78, color: "#2496ED" },
    ],
  },
];
