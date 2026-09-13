import { type Locale } from "../../lib/i18n";
import { useLocale } from "../../lib/use-locale";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { buildBibtex, buildApa, type CitablePublication } from "../../lib/bibtex";

interface Props {
  initialLocale: Locale;
  pub: CitablePublication;
  open: boolean;
  onClose: () => void;
}

export default function CiteModal({ initialLocale, pub, open, onClose }: Props) {
  const { t } = useLocale(initialLocale);
  const [tab, setTab] = useState<"bibtex" | "apa">("bibtex");
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const text = tab === "bibtex" ? buildBibtex(pub) : buildApa(pub);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    setCopyStatus("");
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy failed. Select and copy the citation manually.");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="cite-modal"
      aria-label={`${t("Cite")}: ${pub.title}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="panel">
        <h2>{t("Cite this publication")}</h2>
        <p className="sub">{pub.title}</p>
        <div className="cite-tabs" role="group" aria-label={t("Citation format")}>
          <button
            type="button"
            aria-pressed={tab === "bibtex"}
            className={tab === "bibtex" ? "active" : ""}
            onClick={() => {
              setTab("bibtex");
              setCopyStatus("");
            }}
          >
            BibTeX
          </button>
          <button
            type="button"
            aria-pressed={tab === "apa"}
            className={tab === "apa" ? "active" : ""}
            onClick={() => {
              setTab("apa");
              setCopyStatus("");
            }}
          >
            {t("APA-style")}
          </button>
        </div>
        <pre lang="en" className={`cite-block${tab === "apa" ? " cite-block-apa" : ""}`} tabIndex={0}>
          {text}
        </pre>
        <p className="cite-status" role="status">
          {t(copyStatus)}
          {copyStatus === "Copied" && (
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <g fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          )}
        </p>
        <div className="modal-actions">
          <a className="btn" href={`/publications/${pub.id}.bib`} download={`${pub.id}.bib`}>
            {t("Download .bib")}
          </a>
          <button ref={closeBtnRef} type="button" className="btn" onClick={() => dialogRef.current?.close()}>
            {t("Close")}
          </button>
          <button type="button" className="btn btn-primary" onClick={copy}>
            {t("Copy")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
