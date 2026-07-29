import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    Icon: FaEnvelope,
    label: "Email",
    value: "levinachifie@gmail.com",
    href: "mailto:levinachifie@gmail.com",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    value: "github.com/chifie",
    href: "https://github.com/chifie",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/levinachifie",
    href: "https://linkedin.com/in/levinachifie",
  },
  {
    Icon: FaMapMarkerAlt,
    label: "Location",
    value: "Available Worldwide",
    href: null,
  },
];

function RippleButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    // Create ripple
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.transform = "translate(-50%, -50%)";

    btn.appendChild(ripple);

    gsap.to(ripple, {
      width: 300,
      height: 300,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });

    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-elegant"
    >
      {children}
    </button>
  );
}

function FloatingInput({
  name,
  label,
  type = "text",
  isTextarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  isTextarea?: boolean;
}) {
  const wrapperRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const input = wrapper.querySelector("input, textarea") as HTMLElement;

    const onFocus = () => {
      gsap.to(wrapper.querySelector(".float-label"), {
        top: "0.5rem",
        fontSize: "0.75rem",
        color: "#d946ef",
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onBlur = () => {
      const hasValue = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement
        ? input.value.length > 0
        : false;
      if (!hasValue) {
        gsap.to(wrapper.querySelector(".float-label"), {
          top: "1rem",
          fontSize: "0.875rem",
          color: "var(--muted-foreground)",
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);

    return () => {
      input.removeEventListener("focus", onFocus);
      input.removeEventListener("blur", onBlur);
    };
  }, []);

  const InputTag = isTextarea ? "textarea" : "input";
  const rows = isTextarea ? 5 : undefined;

  return (
    <label ref={wrapperRef} className="relative block">
      <InputTag
        required
        name={name}
        type={isTextarea ? undefined : type}
        rows={rows}
        placeholder=" "
        className={`peer w-full rounded-xl border border-border bg-background/50 outline-none transition-all duration-300 focus:border-fuchsia-500 focus:bg-background focus:ring-2 focus:ring-fuchsia-500/20 ${
          isTextarea ? "resize-none px-4 pt-6 pb-2" : "px-4 pt-6 pb-2"
        } text-sm`}
      />
      <span className="float-label pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200">
        {label}
      </span>
    </label>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-anim]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Contact info stagger
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll("[data-contact]");
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Form reveal
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate sending
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setTimeout(() => {
          setSubmitting(false);
          setSent(true);
          setTimeout(() => setSent(false), 4000);
          (e.target as HTMLFormElement).reset();
        }, 500);
      },
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 h-72 w-72 rounded-full bg-fuchsia-400/5 blur-[100px]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-fuchsia-500/20 animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${5 + i}s`,
          }}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            data-anim
            className="inline-block rounded-full glassborder border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-500">
            Contact
          </span>
          <h2
            data-anim
            className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Let&apos;s Create{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <p
            data-anim
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            Have an idea or opportunity? I&apos;d love to hear from you. Let&apos;s build
            something amazing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div
            ref={infoRef}
            className="space-y-4 lg:col-span-2"
          >
            {CONTACT_INFO.map((item, i) => {
              const { Icon, label, value, href } = item;
              const Content = (
                <div className="group flex items-center gap-4 rounded-2xl glass-strong border border-fuchsia-500/10 p-5 shadow-elegant transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5">
                  <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-lg" />
                  </span>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      {label}
                    </div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </div>
              );

              if (href) {
                return (
                  <a
                    key={i}
                    data-contact
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ opacity: 0 }}
                  >
                    {Content}
                  </a>
                );
              }
              return (
                <div key={i} data-contact style={{ opacity: 0 }}>
                  {Content}
                </div>
              );
            })}
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glow-border rounded-3xl glass-strong border border-fuchsia-500/10 p-8 shadow-elegant lg:col-span-3"
            style={{ opacity: 0 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FloatingInput name="name" label="Your Name" type="text" />
              <FloatingInput name="email" label="Email Address" type="email" />
            </div>
            <div className="mt-5">
              <FloatingInput name="subject" label="Subject" type="text" />
            </div>
            <div className="mt-5">
              <FloatingInput name="message" label="Your Message" isTextarea />
            </div>

            <div className="mt-6">
              <RippleButton type="submit">
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <FaCheck className="text-lg" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Send Message
                  </>
                )}
              </RippleButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
