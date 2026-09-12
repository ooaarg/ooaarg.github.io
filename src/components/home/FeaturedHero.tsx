import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { TargetedKeyboardEvent, TargetedPointerEvent } from "preact";

export interface HeroSlide {
  id: string;
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

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function FeaturedHero({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [mobileSummaries, setMobileSummaries] = useState<string[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const sentences = new Intl.Segmenter("en", { granularity: "sentence" });
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
  }, [slides]);

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
      aria-label="Featured papers"
    >
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="container hero-featured-grid"
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div key={`text-${slide.id}`} className="hero-slide hero-slide-text">
              <div className="kicker">Featured paper</div>
              <div className="hero-copy" data-long-title={String(slide.title.length > 100)}>
                <h1>{slide.title}</h1>
                <p className="hero-sub hero-sub-desktop">{slide.summary}</p>
                {mobileSummaries[i] && <p className="hero-sub hero-sub-mobile">{mobileSummaries[i]}</p>}
              </div>
            </div>
            <ul className="hero-metadata hero-slide" aria-label="Venue and keywords">
              <li className="hero-ribbon hero-ribbon-venue">{slide.venue}</li>
              {slide.keywords.slice(0, 4).map((keyword) => (
                <li key={keyword} className="hero-ribbon">
                  #{keyword.replace(/\s+/g, "-")}
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
              <a className="btn btn-accent" href={`/publications/${slide.id}`}>
                Read more →
              </a>
              {slide.paper && (
                <a className="btn" href={slide.paper} target="_blank" rel="noopener">
                  View paper
                </a>
              )}
              {slide.github && (
                <a className="btn hero-cta-code" href={slide.github} target="_blank" rel="noopener">
                  View code
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
        <div className="hero-controls" role="group" aria-label="Carousel controls">
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            aria-label="Previous featured paper"
            onClick={() => go(index - 1)}
          >
            <Chevron dir="left" />
          </button>
          <div className="hero-dots" role="tablist" aria-label="Featured papers">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hero-dot"
                role="tab"
                aria-selected={i === index}
                aria-current={i === index || undefined}
                aria-label={`Show featured paper ${i + 1} of ${n}: ${s.title}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            aria-label="Next featured paper"
            onClick={() => go(index + 1)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
