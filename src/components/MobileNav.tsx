import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NavLink {
  href: string;
  label: string;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
];

interface Props {
  active?: string;
}

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export default function MobileNav({ active }: Props) {
  const [open, setOpen] = useState(false);
  // The sheet is portalled to <body>. Without portalling, the parent
  // .site-header creates a containing block (via backdrop-filter) and
  // position:fixed inset:0 sizes to the header instead of the viewport.
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    sheetRef.current
      ?.querySelector<HTMLButtonElement>("button[data-close]")
      ?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [open]);

  const sheet = (
    <div
      ref={sheetRef}
      id="mobile-nav-sheet"
      className="mobile-nav-sheet"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <header>
        <a
          className="ooaarg-mark"
          href="/"
          style={{ ["--ooaarg-size" as never]: "32px" }}
          aria-label="OOAARG home"
          onClick={() => setOpen(false)}
        >
          <span>ÕO</span>
          <span className="ooaarg-stretch">AARG</span>
        </a>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          data-close
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </button>
      </header>
      <nav aria-label="Mobile navigation">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={active === l.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <p className="sheet-tagline">
        Online Optimization &amp; Applications Research Group
      </p>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-ghost btn-icon mobile-only"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      {mounted ? createPortal(sheet, document.body) : null}
    </>
  );
}
