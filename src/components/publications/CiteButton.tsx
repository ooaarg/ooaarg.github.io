import { useState } from "react";
import CiteModal from "../shared/CiteModal";
import type { CitablePublication } from "../../lib/bibtex";

interface Props {
  pub: Omit<CitablePublication, "date"> & { dateISO: string };
  variant?: "default" | "accent";
  size?: "sm" | "md";
  label?: string;
}

export default function CiteButton({ pub, variant = "default", size = "sm", label = "Cite" }: Props) {
  const [open, setOpen] = useState(false);
  const className = ["btn", size === "sm" ? "btn-sm" : "", variant === "accent" ? "btn-accent" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {label}
      </button>
      <CiteModal pub={{ ...pub, date: new Date(pub.dateISO) }} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
