import { type Locale } from "../../lib/i18n";
import { useLocale } from "../../lib/use-locale";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { buildBibtex, buildApa, type CitablePublication } from "../../lib/bibtex";
import { enterSurface } from "../../lib/surface-motion";

interface Props {
  initialLocale: Locale;
  pub: CitablePublication;
  open: boolean;
  pointerOpened: boolean;
  onClose: () => void;
}

export default function CiteModal({ initialLocale, pub, open, pointerOpened, onClose }: Props) {
  const { t } = useLocale(initialLocale);
  const [tab, setTab] = useState<"bibtex" | "apa">("bibtex");
  const [copyStatus, setCopyStatus] = useState("");
  const [animateCopy, setAnimateCopy] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const copyRequestRef = useRef<object | null>(null);
  const resetCopy = () => {
    copyRequestRef.current = null;
    clearTimeout(copyTimerRef.current);
    setCopyStatus("");
    setAnimateCopy(false);
  };
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const text = tab === "bibtex" ? buildBibtex(pub) : buildApa(pub);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    const entrance = enterSurface(dialog.querySelector<HTMLElement>(".panel"), "modal", pointerOpened);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    resetCopy();
    return () => {
      copyRequestRef.current = null;
      clearTimeout(copyTimerRef.current);
      entrance?.cancel();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [open, pointerOpened]);

  const copy = async (pointer: boolean) => {
    const request = {};
    copyRequestRef.current = request;
    clearTimeout(copyTimerRef.current);
    setAnimateCopy(pointer);
    try {
      await navigator.clipboard.writeText(text);
      if (request !== copyRequestRef.current || !dialogRef.current?.open) return;
      setCopyStatus("Copied");
      copyTimerRef.current = setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      if (request !== copyRequestRef.current || !dialogRef.current?.open) return;
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
              resetCopy();
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
              resetCopy();
            }}
          >
            {t("APA-style")}
          </button>
        </div>
        <pre lang="en" className={`cite-block${tab === "apa" ? " cite-block-apa" : ""}`} tabIndex={0}>
          {text}
        </pre>
        <p
          className={copyStatus === "Copied" || !copyStatus ? "copy-announcement" : "cite-status"}
          role="status"
        >
          {t(copyStatus)}
        </p>
        <div className="modal-actions">
          <a className="btn" href={`/publications/${pub.id}.bib`} download={`${pub.id}.bib`}>
            {t("Download .bib")}
          </a>
          <button ref={closeBtnRef} type="button" className="btn" onClick={() => dialogRef.current?.close()}>
            {t("Close")}
          </button>
          <button
            type="button"
            className="btn btn-primary cite-copy"
            aria-label={t("Copy")}
            data-copied={copyStatus === "Copied" ? "true" : "false"}
            data-animate={animateCopy ? "true" : "false"}
            onClick={(e) => copy(e.detail > 0)}
          >
            <span className="copy-label" aria-hidden="true">
              {t("Copy")}
            </span>
            <span className="copy-success" aria-hidden="true">
              {t("Copied")}
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M20 6L9 17L4 12"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
