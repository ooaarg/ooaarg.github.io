import type { ComponentType } from "react";

type FigureModule = { default: ComponentType };

const modules = import.meta.glob<FigureModule>(
  "/src/content/publications/*.tsx",
  { eager: true },
);

const FIGURE_MAP: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const slug = path
      .split("/")
      .pop()!
      .replace(/\.tsx$/, "");
    return [slug, mod.default];
  }),
);

export function hasPaperFigure(id: string): boolean {
  return Object.hasOwn(FIGURE_MAP, id);
}

interface Props {
  id: string;
}

export default function PaperFigure({ id }: Props) {
  const Figure = FIGURE_MAP[id];
  if (!Figure) return null;
  return <Figure />;
}
