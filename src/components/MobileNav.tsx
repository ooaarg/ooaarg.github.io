import { useLocale } from "../lib/use-locale";
import { useEffect, useRef, useState } from "preact/hooks";

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
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none">
      <path
        d="M4 5H20M4 12H20M4 19H20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none">
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

export default function MobileNav({ active }: Props) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    // A modal dialog enters the top layer, outside the header's containing block.
    sheet?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      sheet?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const sheet = (
    <dialog
      ref={sheetRef}
      id="mobile-nav-sheet"
      className="mobile-nav-sheet"
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      aria-label={t("Site navigation")}
    >
      <header>
        <a
          className="ooaarg-mark"
          href="/"
          style={{ "--ooaarg-size": "28px" }}
          aria-label={t("OOAARG home")}
          onClick={() => setOpen(false)}
        >
          <span>{t("OO")}</span>
          <span className="ooaarg-stretch">{t("AARG")}</span>
        </a>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          autoFocus
          aria-label={t("Close menu")}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </button>
      </header>
      <nav aria-label={t("Mobile navigation")}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={active === l.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {t(l.label)}
          </a>
        ))}
      </nav>
      <p className="sheet-tagline">{t("Online Optimization & Applications Research Group")}</p>
    </dialog>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-ghost btn-icon mobile-only"
        aria-label={t("Open menu")}
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      {sheet}
    </>
  );
}
