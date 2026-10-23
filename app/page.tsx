"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Display } from "./BrandUI";

const dayparts = {
  Morning: {
    title: "Your usual, with pleasure.",
    text: "Good coffee. A pastry. A familiar face behind the counter. Settle in for a while, or take a little Plaisir into your day.",
    image: "takeaway",
    alt: "Plaisir coffee and pastry packaging concept",
    menu: [
      "Coffee, made with care",
      "Pastries & easy mornings",
      "Here or on your way",
    ],
  },
  Evening: {
    title: "One glass. No hurry.",
    text: "Approachable wine, something in the middle of the table, and a conversation worth staying for. Tell us what you enjoy. We’ll take it from there.",
    image: "table",
    alt: "Plaisir wine and table-service concept",
    menu: [
      "By the glass & by the bottle",
      "Boards, small bites & light food",
      "Made for sharing",
    ],
  },
};
export default function Home() {
  const [daypart, setDaypart] = useState<keyof typeof dayparts>("Morning");
  const gallery = useRef<HTMLDivElement>(null);
  const selected = dayparts[daypart];
  const shiftGallery = (direction: number) => {
    const track = gallery.current;
    if (track)
      track.scrollBy({
        left: direction * track.clientWidth * 0.8,
        behavior:
          document.documentElement.hasAttribute("data-motion-off") ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
      });
  };
  return (
    <main id="main" className="pl-main pl-public">
      <section className="pl-hero" aria-labelledby="hero-title">
        <picture className="pl-hero-scene">
          <source
            media="(max-width: 640px)"
            srcSet="/brand/evening-social-mobile.webp"
          />
          <img
            src="/brand/evening-social.webp"
            width="1024"
            height="1536"
            fetchPriority="high"
            alt="Concept image of friends sharing wine in a warmly lit neighbourhood bar"
          />
        </picture>
        <div className="pl-hero-shade" />
        <div className="pl-hero-identity">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
            fetchPriority="high"
          />
          <p>Coffee & wine · Good company</p>
        </div>
        <div className="pl-hero-copy">
          <h1 id="hero-title" className="pl-hero-title">
            <span className="pl-line">
              <span>Coffee first.</span>
            </span>
            <span className="pl-line">
              <span>Wine later.</span>
            </span>
          </h1>
          <p>
            A little everyday pleasure.
            <br />
            From the first coffee to the last glass.
          </p>
          <a href="#our-day" className="pl-hero-discover">
            Spend a little time with us <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="pl-public-flow">
        <section className="pl-welcome" aria-labelledby="welcome-title">
          <div>
            <span className="pl-kicker">Make yourself at home</span>
            <Display id="welcome-title">
              Good things happen
              <br />
              <em>around a table.</em>
            </Display>
          </div>
          <div data-reveal>
            <p>
              A morning ritual. An afternoon catch-up. That glass that turns
              into an evening.
            </p>
            <p>
              French café influences, New York personality and a warm room
              shaped by Danish design. Plaisir is a place for everyday
              pleasures, and the people you share them with.
            </p>
          </div>
        </section>
        <section
          id="our-day"
          className="pl-our-day"
          aria-labelledby="our-day-title"
        >
          <div className="pl-day-introduction">
            <span className="pl-kicker">One place, two rhythms</span>
            <Display id="our-day-title">
              Whatever time
              <br />
              <em>you find us.</em>
            </Display>
          </div>
          <div
            className="pl-daypart-nav"
            role="group"
            aria-label="Explore the dayparts"
          >
            <span
              className={
                daypart === "Evening"
                  ? "pl-daypart-indicator is-evening"
                  : "pl-daypart-indicator"
              }
              aria-hidden="true"
            />
            {(Object.keys(dayparts) as (keyof typeof dayparts)[]).map(
              (name) => (
                <button
                  key={name}
                  aria-pressed={name === daypart}
                  onClick={() => setDaypart(name)}
                >
                  {name === "Morning" ? "Morning coffee" : "Evening wine"}
                </button>
              ),
            )}
          </div>
          <div className="pl-daypart">
            <div className="pl-daypart-image" data-reveal>
              {(Object.keys(dayparts) as (keyof typeof dayparts)[]).map(
                (name) => (
                  <img
                    key={name}
                    src={`/brand/${dayparts[name].image}.webp`}
                    alt={name === daypart ? dayparts[name].alt : ""}
                    aria-hidden={name !== daypart}
                    className={name === daypart ? "is-active" : ""}
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                ),
              )}
            </div>
            <div className="pl-daypart-copy" key={daypart} aria-live="polite">
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
              <ul>
                {selected.menu.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section
          className="pl-conversation"
          aria-labelledby="conversation-title"
        >
          <img
            src="/brand/bottle-neck.webp"
            alt=""
            aria-hidden="true"
            width="440"
            height="780"
          />
          <div>
            <span className="pl-kicker">A good place to start</span>
            <Display id="conversation-title">
              “What do you
              <br />
              <em>usually enjoy?”</em>
            </Display>
            <p>
              A familiar question. A few thoughtful suggestions.
              <br />
              Good wine comes with a conversation.
            </p>
          </div>
        </section>
        <section className="pl-public-journal" aria-labelledby="journal-title">
          <div className="pl-journal-title">
            <div>
              <span className="pl-kicker">The little things</span>
              <Display id="journal-title">
                A feeling that
                <br />
                <em>stays with you.</em>
              </Display>
            </div>
            <div className="pl-gallery-buttons">
              <button
                onClick={() => shiftGallery(-1)}
                aria-label="Previous brand image"
              >
                ←
              </button>
              <button
                onClick={() => shiftGallery(1)}
                aria-label="Next brand image"
              >
                →
              </button>
            </div>
          </div>
          <div
            className="pl-journal"
            ref={gallery}
            aria-label="Plaisir brand concepts"
          >
            {[
              ["coffee", "Your everyday ritual."],
              ["merchandise", "A familiar feeling."],
              ["table", "A table to return to."],
            ].map(([image, caption]) => (
              <figure className="pl-journal-card" key={image} tabIndex={0}>
                <div>
                  <img
                    src={`/brand/${image}.webp`}
                    width={image === "coffee" ? "774" : "1536"}
                    height={image === "coffee" ? "908" : "1024"}
                    alt={`${caption} Plaisir concept imagery`}
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <h3>{caption}</h3>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section id="visit" className="pl-visit" aria-labelledby="visit-title">
          <div>
            <span className="pl-kicker">Something good is taking shape</span>
            <Display id="visit-title">
              See you in
              <br />
              <em>the neighbourhood.</em>
            </Display>
            <p>
              Our first chapter is being imagined in New York’s East Village.
              We’re not open yet. Our address, hours and final menu will follow.
            </p>
          </div>
          <img
            src="/brand/facade.webp"
            width="1536"
            height="1024"
            alt="Architectural concept for a proposed Plaisir frontage; no confirmed premises"
            loading="lazy"
          />
        </section>
        <div className="pl-public-signoff">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
            loading="lazy"
          />
          <span>Coffee & wine. Good company.</span>
          <Link href="/investors">
            Discover the business behind Plaisir{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
