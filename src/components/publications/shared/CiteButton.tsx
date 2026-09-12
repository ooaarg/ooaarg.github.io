import { useLocale } from "../../../lib/use-locale";
import { useState } from "preact/hooks";
import CiteModal from "../../shared/CiteModal";
import type { CitablePublication } from "../../../lib/bibtex";

interface Props {
  pub: Omit<CitablePublication, "date"> & { dateISO: string };
  variant?: "default" | "accent";
  size?: "sm" | "md";
  label?: string;
}

export default function CiteButton({ pub, variant = "default", size = "sm", label = "Cite" }: Props) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const className = ["btn", size === "sm" ? "btn-sm" : "", variant === "accent" ? "btn-accent" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {size === "md" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 4h7v8c0 5-3 8-7 8v-3c2 0 4-2 4-5H4V4Zm10 0h7v8c0 5-3 8-7 8v-3c2 0 4-2 4-5h-4V4Z" />
          </svg>
        )}
        {t(label)}
      </button>
      <CiteModal pub={{ ...pub, date: new Date(pub.dateISO) }} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
