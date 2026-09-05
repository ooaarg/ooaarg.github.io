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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export default function MobileNav({ active }: Props) {
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
      aria-label="Site navigation"
    >
      <header>
        <a
          className="ooaarg-mark"
          href="/"
          style={{ "--ooaarg-size": "32px" }}
          aria-label="ÕOAARG home"
          onClick={() => setOpen(false)}
        >
          <span>ÕO</span>
          <span className="ooaarg-stretch">AARG</span>
        </a>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          autoFocus
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
      <p className="sheet-tagline">Online Optimization &amp; Applications Research Group</p>
    </dialog>
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
      {sheet}
    </>
  );
}
