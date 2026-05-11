import { useCallback, useRef, useState } from "react";
import PaperFigure, { hasPaperFigure } from "../publication/PaperFigure";

export interface HeroSlide {
  id: string;
  title: string;
  venue: string;
  tag: string;
  summary: string;
  arxiv?: string;
  github?: string;
  pdf?: string;
}

interface Props {
  slides: HeroSlide[];
}

const SWIPE_THRESHOLD = 40;

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function FeaturedHero({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);

  const n = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (next: number) => {
      if (n === 0) return;
      setIndex(((next % n) + n) % n);
    },
    [n],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current == null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
  };

  if (n === 0 || !slide) return null;

  const hasFigure = hasPaperFigure(slide.id);

  return (
    <section
      className="hero hero-plot"
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label="Featured papers"
    >
      <div className="container hero-plot-grid">
        <div key={`text-${slide.id}`} className="hero-slide hero-slide-text">
          <div className="kicker">
            Featured · {slide.venue} · {slide.tag}
          </div>
          <h1>{slide.title}</h1>
          <p className="hero-sub">{slide.summary}</p>
        </div>
        {hasFigure && (
          <div
            key={`fig-${slide.id}`}
            className="regret-plot fig-placeholder hero-slide hero-slide-fig"
            style={{ aspectRatio: "4 / 3" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <PaperFigure id={slide.id} />
          </div>
        )}
      </div>
      <div className="container hero-actions">
        <div key={`cta-${slide.id}`} className="hero-cta">
          <a className="btn btn-accent" href={`/publications/${slide.id}`}>
            Read paper →
          </a>
          {slide.github && (
            <a className="btn" href={slide.github}>
              View code
            </a>
          )}
          {slide.arxiv && (
            <a
              className="btn btn-ghost"
              href={`https://arxiv.org/abs/${slide.arxiv}`}
            >
              arXiv
            </a>
          )}
        </div>
        <div
          className="hero-controls"
          role="group"
          aria-label="Carousel controls"
        >
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            aria-label="Previous featured paper"
            onClick={() => go(index - 1)}
          >
            <Chevron dir="left" />
          </button>
          <div
            className="hero-dots"
            role="tablist"
            aria-label="Featured papers"
          >
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
          <span className="hero-counter mono">
            {index + 1} / {n}
          </span>
        </div>
      </div>
    </section>
  );
}
