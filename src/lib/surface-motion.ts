/** Animate an already visible native surface. Closed surfaces have no motion styles. */
export function enterSurface(
  element: HTMLElement | null,
  kind: "modal" | "sheet" | "menu",
  pointerOpened: boolean,
): Animation | undefined {
  if (!element || !pointerOpened) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phoneModal = kind === "modal" && window.matchMedia("(max-width: 640px)").matches;
  const style = getComputedStyle(element);
  const transform = kind === "sheet" ? "translateY(100%)" : "scale(0.97)";
  return element.animate(
    reduce || phoneModal
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [
          { opacity: 0, transform },
          { opacity: 1, transform: "none" },
        ],
    {
      duration: reduce ? 120 : kind === "menu" ? 150 : 200,
      easing: reduce
        ? "ease"
        : style.getPropertyValue(kind === "sheet" ? "--ease-drawer" : "--ease-out").trim(),
    },
  );
}
