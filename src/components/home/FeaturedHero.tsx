import { contentText, contentLanguage } from "../../lib/content-language";
import { useLocale } from "../../lib/use-locale";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { TargetedKeyboardEvent, TargetedPointerEvent } from "preact";

export interface HeroSlide {
  id: string;
  ru?: { title?: string; summary?: string; venue?: string; keywords?: Record<string, string> };
  title: string;
  venue: string;
  keywords: string[];
  summary: string;
  paper?: string | null;
  arxiv?: string;
  github?: string;
}

interface Props {
  slides: HeroSlide[];
}

const SWIPE_THRESHOLD = 40;

// Long titles need more room; the detail page carries the complete summary.
function desktopSummary(title: string, summary: string, locale: string): string {
  if (title.length <= 100) return summary;
  return (
    new Intl.Segmenter(locale, { granularity: "sentence" })
      .segment(summary)
      [Symbol.iterator]()
      .next()
      .value?.segment.trim() ?? summary
  );
}

const Chevron = ({ dir }: { dir: "left" | "right" }) =>
  dir === "left" ? (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none">
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );

export default function FeaturedHero({ slides: sourceSlides }: Props) {
  const { t, locale } = useLocale();
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
  const [mobileSummaries, setMobileSummaries] = useState<string[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const sentences = new Intl.Segmenter(locale, { granularity: "sentence" });
    const measureLayout = () => {
      const nextSummaries: string[] = [];
      const mobile = window.matchMedia("(max-width: 900px)").matches;
      for (const [i, copy] of Array.from(hero.querySelectorAll<HTMLElement>(".hero-copy")).entries()) {
        const title = copy.querySelector("h1");
        if (!title) continue;
        // Measure at the normal mobile title size, independent of the expanded style.
        copy.removeAttribute("data-long-title");
        copy.dataset.measuringTitle = "true";
        const lineHeight = Number.parseFloat(getComputedStyle(title).lineHeight);
        const isLong = title.getBoundingClientRect().height > lineHeight * 4 + 1;
        delete copy.dataset.measuringTitle;
        copy.dataset.longTitle = String(isLong);
        let fitted = "";
        if (mobile && !isLong) {
          const probe = document.createElement("p");
          probe.className = "hero-sub";
          probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${copy.clientWidth}px;`;
          copy.append(probe);
          const available =
            copy.clientHeight -
            title.getBoundingClientRect().height -
            Number.parseFloat(getComputedStyle(probe).marginTop);
          let candidate = "";
          for (const { segment } of sentences.segment(slides[i]?.summary ?? "")) {
            candidate += segment;
            if (!/[.!?]["'”’\])}]*$/u.test(candidate.trim())) continue;
            probe.textContent = candidate.trim();
            if (probe.getBoundingClientRect().height > available + 1) break;
            fitted = candidate.trim();
          }
          probe.remove();
        }
        nextSummaries.push(fitted);
      }
      setMobileSummaries((previous) =>
        previous.length === nextSummaries.length && previous.every((text, i) => text === nextSummaries[i])
          ? previous
          : nextSummaries,
      );
      for (const row of hero.querySelectorAll<HTMLElement>(".hero-cta")) {
        row.dataset.actionsFit = "true";
        row.dataset.actionsFit = String(row.scrollWidth <= row.clientWidth);
      }
    };
    const observer = new ResizeObserver(measureLayout);
    observer.observe(hero);
    measureLayout();
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) measureLayout();
    });
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [slides, locale]);

  const n = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (next: number) => {
      if (n === 0) return;
      setIndex(((next % n) + n) % n);
    },
    [n],
  );

  const onKeyDown = (e: TargetedKeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: TargetedPointerEvent<HTMLElement>) => {
    // Preact refs are mutable; this React rule does not recognize preact/hooks useRef.
    // oxlint-disable-next-line react/immutability
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: TargetedPointerEvent<HTMLElement>) => {
    if (dragStart.current == null) return;
    const dx = e.clientX - dragStart.current;
    // Preact refs are mutable; this React rule does not recognize preact/hooks useRef.
    // oxlint-disable-next-line react/immutability
    dragStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
  };

  if (n === 0 || !slide) return null;

  return (
    <section
      ref={heroRef}
      className="hero hero-featured"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-roledescription="carousel"
      aria-label={t("Featured papers")}
    >
      <div className="hero-slides">
        {/* Reserve both translations before hydration so changing language cannot
            move the actions or the following section. These copies are inert. */}
        {sourceSlides.map((slide) => {
          const sizingLocale = locale === "en" ? "ru" : "en";
          return (
            <div
              key={`sizing-${slide.id}`}
              className="container hero-featured-grid hero-sizing"
              aria-hidden="true"
              inert
            >
              <div className="hero-slide-text">
                <div className="kicker">{t("Featured paper")}</div>
                <div
                  className="hero-sizing-copy"
                  data-extended-title={String(
                    contentText(slide.title, slide.ru?.title, sizingLocale).length > 100,
                  )}
                >
                  <h1>{contentText(slide.title, slide.ru?.title, sizingLocale)}</h1>
                  <p className="hero-sub hero-sub-desktop">
                    {desktopSummary(
                      contentText(slide.title, slide.ru?.title, sizingLocale),
                      contentText(slide.summary, slide.ru?.summary, sizingLocale),
                      sizingLocale,
                    )}
                  </p>
                </div>
              </div>
              <ul className="hero-metadata">
                <li className="hero-ribbon hero-ribbon-venue">
                  {contentText(slide.venue, slide.ru?.venue, sizingLocale)}
                </li>
                {slide.keywords.slice(0, 4).map((keyword) => (
                  <li key={keyword} className="hero-ribbon">
                    #{contentText(keyword, slide.ru?.keywords?.[keyword], sizingLocale).replace(/\s+/g, "-")}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="container hero-featured-grid"
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div key={`text-${slide.id}`} className="hero-slide hero-slide-text">
              <div className="kicker">{t("Featured paper")}</div>
              <div
                lang={contentLanguage(slide.ru?.summary, locale)}
                className="hero-copy"
                data-extended-title={String(slide.title.length > 100)}
                data-long-title={String(slide.title.length > 100)}
              >
                <h1 lang={contentLanguage(slide.ru?.title, locale)}>{slide.title}</h1>
                <p className="hero-sub hero-sub-desktop">
                  {desktopSummary(slide.title, slide.summary, locale)}
                </p>
                {mobileSummaries[i] && <p className="hero-sub hero-sub-mobile">{mobileSummaries[i]}</p>}
              </div>
            </div>
            <ul className="hero-metadata hero-slide" aria-label={t("Venue and keywords")}>
              <li className="hero-ribbon hero-ribbon-venue" lang={contentLanguage(slide.ru?.venue, locale)}>
                {slide.venue}
              </li>
              {slide.keywords.slice(0, 4).map((keyword) => (
                <li
                  key={keyword}
                  className="hero-ribbon"
                  lang={contentLanguage(slide.ru?.keywords?.[keyword], locale)}
                >
                  #{contentText(keyword, slide.ru?.keywords?.[keyword], locale).replace(/\s+/g, "-")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container hero-actions">
        <div className="hero-cta-stack">
          {slides.map((slide, i) => (
            <div key={slide.id} className="hero-cta" aria-hidden={i !== index} inert={i !== index}>
              <a
                className="btn btn-accent"
                href={`/publications/${slide.id}`}
                aria-label={`${t("Read")}: ${slide.title}`}
              >
                {t("Publication details")}
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <g fill="none">
                    <path
                      d="M5 12H19M12 19L19 12L12 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </a>
              {slide.paper && (
                <a className="btn" href={slide.paper} target="_blank" rel="noopener">
                  {t("View paper")}
                </a>
              )}
              {slide.github && (
                <a className="btn hero-cta-code" href={slide.github} target="_blank" rel="noopener">
                  {t("View code")}
                </a>
              )}
              {!slide.paper && slide.arxiv && (
                <a
                  className="btn btn-ghost"
                  href={`https://arxiv.org/abs/${slide.arxiv}`}
                  target="_blank"
                  rel="noopener"
                >
                  arXiv
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="hero-controls" role="group" aria-label={t("Carousel controls")}>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            aria-label={t("Previous featured paper")}
            onClick={() => go(index - 1)}
          >
            <Chevron dir="left" />
          </button>
          <div className="hero-dots" role="tablist" aria-label={t("Featured papers")}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hero-dot"
                role="tab"
                aria-selected={i === index}
                aria-current={i === index || undefined}
                aria-label={`${t("Show featured paper")} ${i + 1} ${t("of")} ${n}: ${s.title}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            aria-label={t("Next featured paper")}
            onClick={() => go(index + 1)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
