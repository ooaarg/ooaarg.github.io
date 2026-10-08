import { localizedHref, type Locale } from "../../lib/i18n";
import { contentText, contentLanguage } from "../../lib/content-language";
import { useLocale } from "../../lib/use-locale";
import { useMemo, useRef, useState } from "preact/hooks";
import type { TargetedKeyboardEvent, TargetedTouchEvent } from "preact";

export interface HeroSlide {
  id: string;
  ru?: { title?: string; summary?: string; venue?: string };
  title: string;
  venue: string;
  summary: string;
  paper?: string | null;
  arxiv?: string;
  github?: string;
}

interface Props {
  initialLocale: Locale;
  slides: HeroSlide[];
}

export default function FeaturedHero({ initialLocale, slides: sourceSlides }: Props) {
  const { t, locale } = useLocale(initialLocale);
  const slides = useMemo(
    () =>
      sourceSlides.map((slide) => ({
        ...slide,
        title: contentText(slide.title, slide.ru?.title, locale),
        summary: contentText(slide.summary, slide.ru?.summary, locale),
        venue: contentText(slide.venue, slide.ru?.venue, locale),
      })),
    [sourceSlides, locale],
  );
  const [index, setIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const swipeStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const n = slides.length;
  const go = (next: number) => {
    if (n === 0) return;
    setIndex(((next % n) + n) % n);
    setHasInteracted(true);
  };
  const onKeyDown = (event: TargetedKeyboardEvent<HTMLElement>) => {
    const button = event.target;
    if (button instanceof HTMLButtonElement) {
      const pointerFocus = button.dataset.pointerFocus === "true";
      delete button.dataset.pointerFocus;
      if (event.key === "Escape" && pointerFocus) {
        button.blur();
        return;
      }
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };
  const clearSwipe = () => {
    // Preact refs are mutable; this rule only recognizes React's useRef.
    // oxlint-disable-next-line react/immutability
    swipeStart.current = null;
  };
  const onTouchStart = (event: TargetedTouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      clearSwipe();
      return;
    }
    const touch = event.touches[0];
    // Preact refs are mutable; this rule only recognizes React's useRef.
    // oxlint-disable-next-line react/immutability
    swipeStart.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TargetedTouchEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    clearSwipe();
    if (!start || event.touches.length) return;
    const touch = Array.from(event.changedTouches).find((touch) => touch.identifier === start.id);
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(index + (dx < 0 ? 1 : -1));
    }
  };
  if (n === 0) return null;
  const current = slides[index];
  const detail = localizedHref(`/publications/${current.id}`, locale);
  const paper = current.paper ?? (current.arxiv ? `https://arxiv.org/abs/${current.arxiv}` : null);

  return (
    <section className="hero hero-featured" aria-roledescription="carousel" aria-label={t("Featured papers")}>
      <div className="container">
        <div
          className="hero-slides"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={clearSwipe}
        >
          {slides.map((slide, i) => (
            <article
              key={slide.id}
              className="hero-slide"
              data-active={i === index}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <h1 data-long={slide.title.length > 100} lang={contentLanguage(slide.ru?.title, locale)}>
                <a href={localizedHref(`/publications/${slide.id}`, locale)}>{slide.title}</a>
              </h1>
              <div className="hero-description">
                <p className="hero-venue" lang={contentLanguage(slide.ru?.venue, locale)}>
                  {slide.venue}
                </p>
                <p className="hero-sub" lang={contentLanguage(slide.ru?.summary, locale)}>
                  {slide.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="hero-footer">
          <div className="hero-actions">
            <a
              className="hero-link hero-primary"
              href={paper ?? detail}
              target={paper ? "_blank" : undefined}
              rel={paper ? "noopener" : undefined}
            >
              {paper ? t("Read paper") : t("Publication details")}{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d={paper ? "M17 17V7H7M17 7L7 17" : "M5 12H19M12 19L19 12L12 5"}
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            {current.github && (
              <a className="hero-link hero-secondary" href={current.github} target="_blank" rel="noopener">
                {t("Code")}{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M17 17V7H7M17 7L7 17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          <div
            className="hero-controls"
            role="group"
            aria-label={t("Carousel controls")}
            onKeyDown={onKeyDown}
          >
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              aria-label={t("Previous featured paper")}
              onClick={(event) => {
                event.currentTarget.dataset.pointerFocus = String(event.detail > 0);
                go(index - 1);
              }}
              onBlur={(event) => delete event.currentTarget.dataset.pointerFocus}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 12H19M12 19L19 12L12 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span className="hero-counter">
              {String(index + 1).padStart(2, "0")} <span>/ {String(n).padStart(2, "0")}</span>
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              aria-label={t("Next featured paper")}
              onClick={(event) => {
                event.currentTarget.dataset.pointerFocus = String(event.detail > 0);
                go(index + 1);
              }}
              onBlur={(event) => delete event.currentTarget.dataset.pointerFocus}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 12H19M12 19L19 12L12 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p className="hero-status" role="status" aria-live="polite" aria-atomic="true">
        {hasInteracted ? `${index + 1} ${t("of")} ${n}: ${current.title}` : ""}
      </p>
    </section>
  );
}
