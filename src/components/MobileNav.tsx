import { localizedHref, type Locale } from "../lib/i18n";
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
  { href: "/#join", label: "Contact" },
];

interface Props {
  initialLocale: Locale;
  active?: string;
}

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none">
      <path
        d="M4 5H20M4 12H20M4 19H20"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g fill="none">
      <path
        d="M20 4L4 20M4 4L20 20"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

export default function MobileNav({ initialLocale, active }: Props) {
  const { t } = useLocale(initialLocale);
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
          href={localizedHref("/", initialLocale)}
          style={{ "--ooaarg-size": "clamp(28px, calc(10vw - 4px), 32px)" }}
          aria-label={t("OOAARG home")}
          onClick={() => setOpen(false)}
        >
          <span>OO</span>
          <span className="ooaarg-stretch">AARG</span>
        </a>
        <button
          type="button"
          className="nav-icon-control mobile-nav-close"
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
            href={localizedHref(l.href, initialLocale)}
            className={active === l.href ? "active" : ""}
            aria-current={active === l.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {t(l.label)}
          </a>
        ))}
      </nav>
    </dialog>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="nav-icon-control mobile-only mobile-nav-trigger"
        aria-label={t("Open menu")}
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        onClick={(event) => {
          event.currentTarget.dataset.pointerFocus = String(event.detail > 0);
          setOpen(true);
        }}
      >
        <MenuIcon />
      </button>
      {sheet}
    </>
  );
}
