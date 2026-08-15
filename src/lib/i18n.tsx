/* eslint-disable react-refresh/only-export-components -- context module: provider + hook + dictionaries */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NAV_LINKS } from "@/lib/nav-links";

export type Language = "en" | "sw";

/**
 * Flat string dictionaries per language. Every key must exist in BOTH
 * languages — TypeScript enforces this via `TranslationKey`.
 */
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Common
    "common.cv": "CV",
    "common.downloadCV": "Download CV",
    "common.switchToLight": "Switch to light mode",
    "common.switchToDark": "Switch to dark mode",
    "common.switchToEnglish": "Switch to English",
    "common.switchToSwahili": "Switch to Swahili",
    "common.openMenu": "Open menu",
    "common.closeMenu": "Close menu",
    "common.skipToContent": "Skip to content",
    "common.backToTop": "Back to top",
    "common.primaryNav": "Primary navigation",
    "common.siteNav": "Site navigation",

    // Preloader
    "preloader.label": "Loading Levina Chifie portfolio",
    "preloader.loading": "Loading portfolio",

    // Hero
    "hero.available": "Available for opportunities",
    "hero.greeting": "Hi, I'm",
    "hero.role": "Full Stack Software Developer",
    "hero.roleAnd": "& Mobile App Developer",
    "hero.description":
      "I build modern, scalable web and mobile applications with clean architecture, elegant design, and robust backend systems that deliver real value.",
    "hero.viewProjects": "View Projects",
    "hero.contactMe": "Contact Me",
    "hero.openToWork": "Open to work",
    "hero.experienceYears": "3+ Years",
    "hero.experience": "Experience",
    "hero.scrollDown": "Scroll Down",
    "hero.alt": "Levina Chifie - Full Stack Software Developer",

    // About
    "about.eyebrow": "About",
    "about.titleA": "Crafting Code with",
    "about.titleB": "Purpose",
    "about.subtitle":
      "Building high-quality software that solves real problems and delivers exceptional user experiences",
    "about.intro": "I'm a dedicated Full Stack Software Developer",
    "about.tag.web": "Web Development",
    "about.tag.mobile": "Mobile Development",
    "about.tag.api": "API Design",
    "about.tag.ui": "UI Implementation",
    "about.p1":
      "With a good foundation in software engineering, I specialize in building modern, scalable web and mobile applications. I transform complex requirements into clean, maintainable code and intuitive user interfaces that users love.",
    "about.p2":
      "I work across the entire stack — from designing polished front-end experiences with React and Next.js, to building robust back-end APIs with FastAPI and NestJS. My focus is on writing code that is not only functional but also performant, secure, and easy to maintain.",
    "about.p3":
      "Mobile development is another core strength. I build cross-platform mobile applications with Flutter and Dart, delivering native-quality experiences on both iOS and Android from a single codebase. I also build native Android applications using Java.",
    "about.stat.fullstack": "Full Stack",
    "about.stat.fullstackDetail": "Web + Mobile + API",
    "about.stat.clean": "Clean Code",
    "about.stat.cleanDetail": "Tested & Maintainable",
    "about.stat.user": "User First",
    "about.stat.userDetail": "Polished Experiences",
    "about.alt": "Levina Chifie portrait",

    // Skills
    "skills.eyebrow": "Skills",
    "skills.titleA": "Technical",
    "skills.titleB": "Competencies",
    "skills.subtitle":
      "A comprehensive set of tools and technologies I work with to deliver high-quality software products",
    "skills.count": "{count} technologies across {categories} categories",
    "skills.technologies": "technologies",
    "skills.cat.languages": "Languages",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.mobile": "Mobile",
    "skills.cat.databases": "Databases",
    "skills.cat.tools": "Tools",

    // Services
    "services.eyebrow": "Services",
    "services.titleA": "What I",
    "services.titleB": "Do",
    "services.subtitle":
      "I deliver end-to-end software solutions across web, mobile, and backend platforms with a focus on quality and user experience",
    "services.web.title": "Web Application Development",
    "services.web.desc":
      "Building modern, responsive web applications with React, Next.js, and TypeScript. From landing pages to complex full-featured platforms, I deliver clean code and exceptional user experiences.",
    "services.backend.title": "Backend API Development",
    "services.backend.desc":
      "Designing and implementing robust RESTful APIs and backend services with FastAPI, NestJS, and Node.js. Built for scalability, security, and performance.",
    "services.mobile.title": "Mobile Application Development",
    "services.mobile.desc":
      "Creating cross-platform mobile applications with Flutter and Dart. Native-quality performance and pixel-perfect UI across iOS and Android from a single codebase.",
    "services.ui.title": "UI Implementation",
    "services.ui.desc":
      "Translating designs into pixel-perfect, responsive interfaces using Tailwind CSS, modern CSS techniques, and component-driven architecture for consistent, maintainable results.",
    "services.learnMore": "Learn more",

    // Projects
    "projects.eyebrow": "Projects",
    "projects.titleA": "Featured",
    "projects.titleB": "Work",
    "projects.subtitle": "A selection of projects I have built with passion and precision",
    "projects.count": "{count} featured projects",
    "projects.searchLabel": "Search projects",
    "projects.searchPlaceholder": "Search projects by name or technology...",
    "projects.all": "All",
    "projects.noResults": "No projects match your search.",
    "projects.clearFilters": "Clear filters",
    "projects.github": "GitHub",
    "projects.liveDemo": "Live Demo",
    "projects.admin": "Admin Panel",
    "projects.backendRepo": "Backend Repo",
    "projects.githubAria": "View {title} source code on GitHub",
    "projects.demoAria": "View {title} live demo",
    "projects.adminAria": "Open {title} admin dashboard",
    "projects.githubBackendAria": "View {title} backend source code on GitHub",

    // Blog
    "blog.eyebrow": "Blog",
    "blog.titleA": "Thoughts &",
    "blog.titleB": "Insights",
    "blog.subtitle":
      "Articles on software development, design, and the craft of building great products",
    "blog.readMore": "Read More",
    "blog.readArticle": "Read article",
    "blog.allArticles": "All articles",
    "blog.backToHome": "Back to homepage",
    "blog.contact": "Contact",

    // Contact
    "contact.eyebrow": "Contact",
    "contact.titleA": "Let's Create",
    "contact.titleB": "Together",
    "contact.subtitle": "Have a project idea or need a developer? Let's connect.",
    "contact.emailLabel": "Email",
    "contact.githubLabel": "GitHub",
    "contact.linkedinLabel": "LinkedIn",
    "contact.yourName": "Your Name",
    "contact.emailAddress": "Email Address",
    "contact.subject": "Subject",
    "contact.yourMessage": "Your Message",
    "contact.replyWithin": "I typically reply within 24 hours",
    "contact.sending": "Sending your message",
    "contact.sent": "Your message was sent successfully",
    "contact.sendingBtn": "Sending...",
    "contact.sentBtn": "Message Sent!",
    "contact.sendMessage": "Send Message",
    "contact.leaveEmpty": "Leave this field empty",

    // Footer
    "footer.bio":
      "A dedicated Full Stack Software Developer and Mobile App Developer crafting modern digital experiences with clean code and elegant design.",
    "footer.navigation": "Navigation",
    "footer.getInTouch": "Get In Touch",
    "footer.availableWorldwide": "Available Worldwide",
    "footer.copyright": "© {year} Levina Chifie. Crafted with",
    "footer.copyrightEnd": "and code.",
  },
  sw: {
    // Navigation
    "nav.home": "Nyumbani",
    "nav.about": "Kuhusu",
    "nav.skills": "Ujuzi",
    "nav.services": "Huduma",
    "nav.projects": "Miradi",
    "nav.blog": "Blogu",
    "nav.contact": "Mawasiliano",

    // Common
    "common.cv": "CV",
    "common.downloadCV": "Pakua CV",
    "common.switchToLight": "Badilisha hadi mwanga",
    "common.switchToDark": "Badilisha hadi giza",
    "common.switchToEnglish": "Badilisha hadi Kiingereza",
    "common.switchToSwahili": "Badilisha hadi Kiswahili",
    "common.openMenu": "Fungua menyu",
    "common.closeMenu": "Funga menyu",
    "common.skipToContent": "Ruka hadi maudhui",
    "common.backToTop": "Rudi juu",
    "common.primaryNav": "Urambazaji mkuu",
    "common.siteNav": "Urambazaji wa tovuti",

    // Preloader
    "preloader.label": "Inapakia wasifu wa Levina Chifie",
    "preloader.loading": "Inapakia wasifu",

    // Hero
    "hero.available": "Nipo tayari kwa fursa",
    "hero.greeting": "Habari, mimi ni",
    "hero.role": "Msanidi Programu wa Full Stack",
    "hero.roleAnd": "na Msanidi Programu wa Simu",
    "hero.description":
      "Ninaunda programu za kisasa na zinazoweza kukua za wavuti na simu kwa usanifu safi, muundo wa hali ya juu, na mifumo imara ya backend inayotoa thamani halisi.",
    "hero.viewProjects": "Tazama Miradi",
    "hero.contactMe": "Wasiliana Nami",
    "hero.openToWork": "Nipo tayari kufanya kazi",
    "hero.experienceYears": "Miaka 3+",
    "hero.experience": "Uzoefu",
    "hero.scrollDown": "Tembeza Chini",
    "hero.alt": "Levina Chifie - Msanidi Programu wa Full Stack",

    // About
    "about.eyebrow": "Kuhusu",
    "about.titleA": "Kuandika Msimbo kwa",
    "about.titleB": "Kusudi",
    "about.subtitle":
      "Kujenga programu za ubora wa juu zinazotatua matatizo halisi na kutoa uzoefu bora wa mtumiaji",
    "about.intro": "Mimi ni Msanidi Programu wa Full Stack aliyejitolea",
    "about.tag.web": "Ukuzaji wa Wavuti",
    "about.tag.mobile": "Ukuzaji wa Simu",
    "about.tag.api": "Usanifu wa API",
    "about.tag.ui": "Utekelezaji wa UI",
    "about.p1":
      "Kwa msingi mzuri wa uhandisi wa programu, nimebobea katika kujenga programu za kisasa na zinazoweza kukua za wavuti na simu. Ninageuza mahitaji changamano kuwa msimbo safi, unaotunzika, na violesura angavu ambavyo watumiaji wanavipenda.",
    "about.p2":
      "Nafanya kazi katika mnyororo mzima — kuanzia kubuni uzoefu wa kisasa wa front-end kwa React na Next.js, hadi kujenga API imara za back-end kwa FastAPI na NestJS. Lengo langu ni kuandika msimbo usiofanya kazi tu bali pia wa haraka, salama, na rahisi kutunza.",
    "about.p3":
      "Ukuzaji wa programu za simu ni uwezo mwingine mkuu. Ninajenga programu za simu za mifumo mbalimbali kwa Flutter na Dart, nikitoa uzoefu wa ubora wa asili kwenye iOS na Android kutoka kwenye msimbo mmoja. Pia ninajenga programu asili za Android kwa kutumia Java.",
    "about.stat.fullstack": "Full Stack",
    "about.stat.fullstackDetail": "Wavuti + Simu + API",
    "about.stat.clean": "Msimbo Safi",
    "about.stat.cleanDetail": "Imethibitishwa na Inatunzika",
    "about.stat.user": "Mtumiaji Kwanza",
    "about.stat.userDetail": "Uzoefu wa Hali ya Juu",
    "about.alt": "Picha ya Levina Chifie",

    // Skills
    "skills.eyebrow": "Ujuzi",
    "skills.titleA": "Uwezo",
    "skills.titleB": "Kitaalamu",
    "skills.subtitle":
      "Seti kamili ya zana na teknolojia ninazotumia kutoa bidhaa za programu za ubora wa juu",
    "skills.count": "teknolojia {count} katika kategoria {categories}",
    "skills.technologies": "teknolojia",
    "skills.cat.languages": "Lugha",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.mobile": "Simu",
    "skills.cat.databases": "Hifadhidata",
    "skills.cat.tools": "Zana",

    // Services
    "services.eyebrow": "Huduma",
    "services.titleA": "Nini",
    "services.titleB": "Nafanya",
    "services.subtitle":
      "Natoa suluhisho kamili za programu katika mifumo ya wavuti, simu, na backend kwa kuzingatia ubora na uzoefu wa mtumiaji",
    "services.web.title": "Ukuzaji wa Programu za Wavuti",
    "services.web.desc":
      "Kujenga programu za kisasa na zinazoitikia vizuri kwa React, Next.js, na TypeScript. Kuanzia kurasa za kwanza hadi majukwaa changamano, natoa msimbo safi na uzoefu wa hali ya juu kwa watumiaji.",
    "services.backend.title": "Ukuzaji wa API za Backend",
    "services.backend.desc":
      "Kubuni na kutekeleza API imara za RESTful na huduma za backend kwa FastAPI, NestJS, na Node.js. Zimejengwa kwa ukuaji, usalama, na utendaji.",
    "services.mobile.title": "Ukuzaji wa Programu za Simu",
    "services.mobile.desc":
      "Kuunda programu za simu za mifumo mbalimbali kwa Flutter na Dart. Utendaji wa ubora wa asili na UI kamili kwenye iOS na Android kutoka msimbo mmoja.",
    "services.ui.title": "Utekelezaji wa UI",
    "services.ui.desc":
      "Kugeuza miundo kuwa violesura kamili, vinavyoitikia vizuri kwa Tailwind CSS, mbinu za kisasa za CSS, na usanifu unaoendeshwa na vipengele kwa matokeo thabiti na yanayotunzika.",
    "services.learnMore": "Jifunze zaidi",

    // Projects
    "projects.eyebrow": "Miradi",
    "projects.titleA": "Kazi",
    "projects.titleB": "Zilizochaguliwa",
    "projects.subtitle": "Mchanganuo wa miradi niliyojenga kwa shauku na usahihi",
    "projects.count": "miradi {count} iliyochaguliwa",
    "projects.searchLabel": "Tafuta miradi",
    "projects.searchPlaceholder": "Tafuta miradi kwa jina au teknolojia...",
    "projects.all": "Zote",
    "projects.noResults": "Hakuna miradi inayolingana na utafutaji wako.",
    "projects.clearFilters": "Futa vichujio",
    "projects.github": "GitHub",
    "projects.liveDemo": "Demo ya Moja kwa Moja",
    "projects.admin": "Menyu ya Usimamizi",
    "projects.backendRepo": "Repo ya Backend",
    "projects.githubAria": "Angalia msimbo chanzo wa {title} kwenye GitHub",
    "projects.demoAria": "Angalia demo ya moja kwa moja ya {title}",
    "projects.adminAria": "Fungua dashibodi ya usimamizi ya {title}",
    "projects.githubBackendAria": "Angalia msimbo chanzo wa backend ya {title} kwenye GitHub",

    // Blog
    "blog.eyebrow": "Blogu",
    "blog.titleA": "Mawazo na",
    "blog.titleB": "Ufahamu",
    "blog.subtitle": "Makala kuhusu ukuzaji wa programu, muundo, na sanaa ya kujenga bidhaa bora",
    "blog.readMore": "Soma Zaidi",
    "blog.readArticle": "Soma makala",
    "blog.allArticles": "Makala zote",
    "blog.backToHome": "Rudi kwenye ukurasa wa mwanzo",
    "blog.contact": "Mawasiliano",

    // Contact
    "contact.eyebrow": "Mawasiliano",
    "contact.titleA": "Tuunde",
    "contact.titleB": "Pamoja",
    "contact.subtitle": "Una wazo la mradi au unahitaji msanidi programu? Tuwasiliane.",
    "contact.emailLabel": "Barua Pepe",
    "contact.githubLabel": "GitHub",
    "contact.linkedinLabel": "LinkedIn",
    "contact.yourName": "Jina Lako",
    "contact.emailAddress": "Barua Pepe",
    "contact.subject": "Mada",
    "contact.yourMessage": "Ujumbe Wako",
    "contact.replyWithin": "Kwa kawaida ninajibu ndani ya saa 24",
    "contact.sending": "Inatuma ujumbe wako",
    "contact.sent": "Ujumbe wako umetumwa kwa mafanikio",
    "contact.sendingBtn": "Inatuma...",
    "contact.sentBtn": "Ujumbe Umetumwa!",
    "contact.sendMessage": "Tuma Ujumbe",
    "contact.leaveEmpty": "Acha sehemu hii ikiwa tupu",

    // Footer
    "footer.bio":
      "Msanidi Programu wa Full Stack na wa Simu aliyejitolea, akiunda uzoefu wa kisasa wa kidijitali kwa msimbo safi na muundo wa kifahari.",
    "footer.navigation": "Urambazaji",
    "footer.getInTouch": "Wasiliana Nasi",
    "footer.availableWorldwide": "Napatikana Ulimwenguni Kote",
    "footer.copyright": "© {year} Levina Chifie. Imeundwa kwa",
    "footer.copyrightEnd": "na msimbo.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

/** Maps each navigation link id to its translation key. */
export const NAV_LABEL_KEYS: Record<(typeof NAV_LINKS)[number]["id"], TranslationKey> = {
  home: "nav.home",
  about: "nav.about",
  skills: "nav.skills",
  services: "nav.services",
  projects: "nav.projects",
  blog: "nav.blog",
  contact: "nav.contact",
};

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Constant initial state so server and client first render match (no
  // hydration mismatch); the stored/browser language is applied after mount.
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    let stored: Language | null = null;
    try {
      const saved = window.localStorage.getItem("lang");
      if (saved === "en" || saved === "sw") stored = saved;
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    if (!stored) {
      stored = window.navigator.language.toLowerCase().startsWith("sw") ? "sw" : "en";
    }
    setLanguage(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("lang", language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  const t = useMemo<I18nContextValue["t"]>(
    () => (key, params) => {
      let text: string = translations[language][key] ?? translations.en[key];
      if (params) {
        for (const [name, value] of Object.entries(params)) {
          text = text.replaceAll(`{${name}}`, String(value));
        }
      }
      return text;
    },
    [language],
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
