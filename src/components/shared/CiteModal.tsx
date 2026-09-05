import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { buildBibtex, buildApa, type CitablePublication } from "../../lib/bibtex";

interface Props {
  pub: CitablePublication;
  open: boolean;
  onClose: () => void;
}

export default function CiteModal({ pub, open, onClose }: Props) {
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
      setCopyStatus("Copied ✓");
    } catch {
      setCopyStatus("Copy failed. Select and copy the citation manually.");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="cite-modal"
      aria-label={`Cite: ${pub.title}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="panel">
        <h2>Cite this publication</h2>
        <p className="sub">{pub.title}</p>
        <div className="cite-tabs" role="group" aria-label="Citation format">
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
            APA-style
          </button>
        </div>
        <pre className="cite-block" tabIndex={0}>
          {text}
        </pre>
        <p className="cite-status" role="status">
          {copyStatus}
        </p>
        <div className="modal-actions">
          <button ref={closeBtnRef} type="button" className="btn" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={copy}>
            Copy
          </button>
        </div>
      </div>
    </dialog>
  );
}
