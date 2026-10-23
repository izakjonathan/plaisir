"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Display } from "./BrandUI";

const offerings = [
  {
    name: "Morning coffee",
    title: "An easy start.",
    text: "Good coffee, a pastry and a familiar face. Settle in for a while, or take a little Plaisir into your day.",
    details: "Coffee & pastries · Here or on your way",
    image: "morning-service",
    width: 1024,
    height: 1536,
    alt: "Concept image of a server placing a green espresso cup on a café counter",
  },
  {
    name: "Evening wine",
    title: "One glass. No hurry.",
    text: "Approachable wines by the glass and bottle. Tell us what you usually enjoy. A little conversation is all it takes to find your next glass.",
    details: "Wine by the glass & bottle · Thoughtful guidance",
    image: "evening-social",
    width: 1024,
    height: 1536,
    alt: "Concept image of friends sharing wine at a neighbourhood bar",
  },
  {
    name: "A little to share",
    title: "Better together.",
    text: "Boards, small bites and light food. Something delicious in the middle of the table, made to go with your glass and your company.",
    details: "Boards & small bites · Made for sharing",
    image: "sharing-table",
    width: 1400,
    height: 933,
    alt: "Concept image of cheese, cured ham, olives and bread with wine",
  },
];
export default function Home() {
  const [selected, setSelected] = useState(0);
  const gallery = useRef<HTMLDivElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const offering = offerings[selected];
  const moveGallery = (direction: number) => {
    const track = gallery.current;
    if (track)
      track.scrollBy({
        left: direction * track.clientWidth * 0.7,
        behavior:
          document.documentElement.hasAttribute("data-motion-off") ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
      });
  };
  return (
    <main id="main" className="pc-main pc-public">
      <section
        className="pc-opening"
        aria-label="Plaisir, from morning coffee to evening wine"
      >
        <figure className="pc-opening-photo">
          <picture>
            <source
              media="(max-width:640px)"
              srcSet="/brand/morning-service-mobile.webp"
            />
            <img
              src="/brand/morning-service.webp"
              width="1024"
              height="1536"
              fetchPriority="high"
              alt="Morning concept: a green coffee cup served in warm café light"
            />
          </picture>
          <figcaption>Morning coffee</figcaption>
        </figure>
        <figure className="pc-opening-photo">
          <picture>
            <source
              media="(max-width:640px)"
              srcSet="/brand/evening-social-mobile.webp"
            />
            <img
              src="/brand/evening-social.webp"
              width="1024"
              height="1536"
              fetchPriority="high"
              alt="Evening concept: friends meeting over glasses of wine"
            />
          </picture>
          <figcaption>Evening wine</figcaption>
        </figure>
        <a
          className="pc-scroll-cue"
          href="#plaisir"
          aria-label="Discover Plaisir"
        >
          ↓
        </a>
      </section>
      <section id="plaisir" className="pc-intro">
        <p className="pc-eyebrow">Plaisir / coffee & wine</p>
        <h1 className="pc-title" data-reveal>
          Coffee. Wine.
          <br />
          Good company.
        </h1>
        <div className="pc-intro-copy" data-reveal>
          <p>
            A morning ritual. An afternoon catch-up.
            <br />
            That glass that turns into an evening.
          </p>
          <p>
            French café influences. New York personality. A warm room shaped by
            Danish design. A little everyday pleasure, shared.
          </p>
        </div>
        <div className="pc-intro-links">
          <a href="#the-menu">
            Explore our days <span aria-hidden="true">↓</span>
          </a>
          <a href="#visit">
            Our first chapter <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        className="pc-gallery-section"
        aria-label="A glimpse of the Plaisir world"
      >
        <div className="pc-gallery" ref={gallery}>
          {[
            ["coffee", "Your everyday ritual", "774", "908"],
            ["sharing-table", "A little to share", "1400", "933"],
            ["table", "One more glass", "1536", "1024"],
            ["merchandise", "A familiar feeling", "1536", "1024"],
          ].map(([image, caption, width, height], index) => (
            <figure
              key={image}
              className={`pc-gallery-item pc-gallery-item-${index}`}
              tabIndex={0}
            >
              <div>
                <img
                  src={`/brand/${image}.webp`}
                  width={width}
                  height={height}
                  alt={`${caption} · Plaisir concept imagery`}
                  loading="lazy"
                />
              </div>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="pc-gallery-tools">
          <span>A little of the Plaisir world</span>
          <div>
            <button
              onClick={() => moveGallery(-1)}
              aria-label="Previous brand image"
            >
              ←
            </button>
            <button
              onClick={() => moveGallery(1)}
              aria-label="Next brand image"
            >
              →
            </button>
          </div>
        </div>
      </section>
      <section className="pc-statement">
        <Display>
          From first coffee
          <br />
          to one more glass.
        </Display>
        <p>
          A place to drop into. A table to settle around.
          <br />
          Uncomplicated hospitality, whatever the hour.
        </p>
      </section>
      <section
        id="the-menu"
        className="pc-offerings"
        aria-labelledby="offering-title"
      >
        <div className="pc-offering-copy">
          <span className="pc-eyebrow">The Plaisir day</span>
          <h2 id="offering-title" className="pc-section-title">
            Find your
            <br />
            kind of pleasure.
          </h2>
          <div
            role="tablist"
            aria-label="Explore the Plaisir menu"
            className="pc-offering-tabs"
            aria-orientation="vertical"
          >
            {offerings.map((item, index) => (
              <button
                key={item.name}
                ref={(el) => {
                  controls.current[index] = el;
                }}
                id={`offering-tab-${index}`}
                role="tab"
                aria-selected={selected === index}
                aria-controls="offering-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  const offsets: Record<string, number> = {
                    ArrowDown: 1,
                    ArrowRight: 1,
                    ArrowUp: -1,
                    ArrowLeft: -1,
                  };
                  if (
                    event.key in offsets ||
                    event.key === "Home" ||
                    event.key === "End"
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? offerings.length - 1
                          : (selected + offsets[event.key] + offerings.length) %
                            offerings.length;
                    setSelected(next);
                    controls.current[next]?.focus();
                  }
                }}
              >
                {item.name}
                <span aria-hidden="true">{selected === index ? "−" : "+"}</span>
              </button>
            ))}
          </div>
          <div
            id="offering-panel"
            role="tabpanel"
            aria-labelledby={`offering-tab-${selected}`}
            className="pc-offering-text"
            key={selected}
          >
            <h3>{offering.title}</h3>
            <p>{offering.text}</p>
            <span>{offering.details}</span>
          </div>
        </div>
        <div className="pc-offering-image" data-reveal>
          {offerings.map((item, index) => (
            <picture
              key={item.image}
              className={index === selected ? "is-active" : ""}
            >
              <source
                media="(max-width:640px)"
                srcSet={`/brand/${item.image}-mobile.webp`}
              />
              <img
                src={`/brand/${item.image}.webp`}
                width={item.width}
                height={item.height}
                alt={index === selected ? item.alt : ""}
                aria-hidden={index !== selected}
                loading="lazy"
              />
            </picture>
          ))}
        </div>
      </section>
      <section className="pc-editorial-pair" aria-labelledby="table-title">
        <figure>
          <img
            src="/brand/sharing-table.webp"
            width="1400"
            height="933"
            alt="Plaisir sharing food and wine concept"
            loading="lazy"
          />
        </figure>
        <div>
          <span className="pc-eyebrow">No occasion needed</span>
          <Display id="table-title">
            A table
            <br />
            to share.
          </Display>
          <p>
            Good wine starts with a conversation.
            <br />
            “What do you usually enjoy?”
            <br />
            We’ll take it from there.
          </p>
          <a className="pc-text-link" href="#the-menu">
            Find your next glass <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>
      <section id="visit" className="pc-visit" aria-labelledby="visit-title">
        <div>
          <span className="pc-eyebrow">Our first chapter</span>
          <Display id="visit-title">
            New York energy.
            <br />
            Neighbourhood soul.
          </Display>
          <p>
            Our first Plaisir is being imagined in the East Village. We’re not
            open yet. The address, hours and final menu will follow.
          </p>
          <Link className="pc-text-link" href="/investors">
            The story behind Plaisir <span aria-hidden="true">→</span>
          </Link>
        </div>
        <figure>
          <img
            src="/brand/facade.webp"
            width="1536"
            height="1024"
            alt="Architectural brand concept for Plaisir; no confirmed site"
            loading="lazy"
          />
          <figcaption>
            First-address concept · Not confirmed premises
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
