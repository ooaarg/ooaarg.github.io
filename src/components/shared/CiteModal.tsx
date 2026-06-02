import { useEffect, useRef, useState } from "react";
import { buildBibtex, buildApa, type CitablePublication } from "../../lib/bibtex";

interface Props {
  pub: CitablePublication & { dateISO: string };
  open: boolean;
  onClose: () => void;
}

export default function CiteModal({ pub, open, onClose }: Props) {
  const [tab, setTab] = useState<"bibtex" | "apa">("bibtex");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Reconstruct Date from ISO string (we receive it serialized from Astro).
  const citable: CitablePublication = { ...pub, date: new Date(pub.dateISO) };
  const text = tab === "bibtex" ? buildBibtex(citable) : buildApa(citable);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be denied; fall back silently.
    }
  };

  return (
    <div
      ref={dialogRef}
      className="cite-modal"
      hidden={!open}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cite-modal-title"
    >
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <h3 id="cite-modal-title">Cite this paper</h3>
        <p className="sub">{pub.title}</p>
        <div className="cite-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "bibtex"}
            className={tab === "bibtex" ? "active" : ""}
            onClick={() => setTab("bibtex")}
          >
            BibTeX
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "apa"}
            className={tab === "apa" ? "active" : ""}
            onClick={() => setTab("apa")}
          >
            APA
          </button>
        </div>
        <pre className="cite-block">{text}</pre>
        <div className="modal-actions">
          <button ref={closeBtnRef} type="button" className="btn" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={copy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
