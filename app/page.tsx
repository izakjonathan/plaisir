"use client";

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ReactNode,
} from "react";
import PageMotion from "./PageMotion";
import FinancialDashboard from "./FinancialDashboard";

const team = [
  ["Kevin Murph", "Founder & CEO", "Concept, culture and strategy"],
  ["Oliwier Papadopoulos", "Partner & CFO", "Budget, cash flow and reporting"],
  ["Jose Sidoa", "Partner & CWO", "Wine buying and service standards"],
  ["Mohammed Diomande", "Partner & COO", "Staffing, training and operations"],
];
const dayparts = {
  Morning: {
    label: "01 / An easy start",
    title: ["Your usual,", "with pleasure."],
    text: "Good coffee. A pastry. A familiar face behind the counter. Settle in for a while, or take a little Plaisir into your day.",
    image: "takeaway",
    alt: "Plaisir coffee cups, pastry bag and takeaway box branding concept",
    menu: [
      "Coffee, made with care",
      "Pastries & easy mornings",
      "Here or on your way",
    ],
  },
  Evening: {
    label: "02 / A little later",
    title: ["One glass.", "No hurry."],
    text: "Approachable wine, something in the middle of the table, and a conversation worth staying for. Tell us what you enjoy. We’ll take it from there.",
    image: "table",
    alt: "Plaisir wine glasses and green table-service branding concept",
    menu: [
      "By the glass & by the bottle",
      "Boards, small bites & light food",
      "Made for sharing",
    ],
  },
};
function Note({
  children,
  title = "Concept notes",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <details className="pl-note">
      <summary>
        {title}
        <span aria-hidden="true">+</span>
      </summary>
      <div>{children}</div>
    </details>
  );
}
function Display({ children, id }: { children: ReactNode; id?: string }) {
  const lines: ReactNode[][] = [[]];
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return (
    <h2 id={id} className="pl-display" data-reveal>
      {lines.map((line, index) => (
        <span className="pl-display-line" key={index}>
          <span style={{ transitionDelay: `${index * 65}ms` }}>{line} </span>
        </span>
      ))}
    </h2>
  );
}

export default function Home() {
  const menu = useRef<HTMLDialogElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const [daypart, setDaypart] = useState<keyof typeof dayparts>("Morning");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const selected = dayparts[daypart];
  const moveGallery = (index: number) => {
    const track = gallery.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (track && target)
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft,
        behavior:
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.documentElement.hasAttribute("data-motion-off")
            ? "instant"
            : "smooth",
      });
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="pl-header">
        <a href="#" className="pl-header-brand" aria-label="Plaisir home">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
          />
        </a>
        <span className="pl-header-descriptor">Coffee & wine</span>
        <a className="pl-header-investors" href="#financials">
          For investors
        </a>
        <button
          className="pl-menu-button"
          onClick={() => menu.current?.showModal()}
          aria-haspopup="dialog"
          aria-controls="pl-navigation"
        >
          Menu{" "}
          <span aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <span className="pl-progress" aria-hidden="true" />
      </header>
      <dialog
        ref={menu}
        id="pl-navigation"
        className="pl-menu"
        aria-label="Explore Plaisir"
        onClick={(e) => {
          if (e.target === e.currentTarget) menu.current?.close();
        }}
      >
        <div className="pl-menu-top">
          <span>Coffee & wine. Good company.</span>
          <button
            autoFocus
            onClick={() => menu.current?.close()}
            aria-label="Close menu"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Main navigation">
          {[
            ["01", "The Plaisir way", "#concept"],
            ["02", "Day into night", "#experience"],
            ["03", "The first address", "#flagship"],
            ["04", "For investors", "#financials"],
          ].map(([n, text, href]) => (
            <a key={href} href={href} onClick={() => menu.current?.close()}>
              <span>{n}</span>
              {text}
            </a>
          ))}
        </nav>
        <p>
          A neighbourhood concept.
          <br />A little everyday pleasure.
        </p>
        <span className="pl-menu-bottom">Plaisir / coffee & wine</span>
      </dialog>
      <main id="main" className="pl-main">
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
              alt="Concept image of friends sharing red and white wine at a warmly lit neighbourhood bar"
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
            <a href="#experience" className="pl-hero-discover">
              Take a look around <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="pl-hero-footnote">
            An idea taking shape · Concept imagery
          </span>
        </section>
        <section
          id="concept"
          className="pl-section pl-intro"
          aria-labelledby="concept-title"
        >
          <div className="pl-section-label">
            <span>01 / The Plaisir way</span>
            <span>Make yourself at home</span>
          </div>
          <Display id="concept-title">
            Good coffee.
            <br />
            Good wine.
            <br />
            <em>Even better company.</em>
          </Display>
          <div className="pl-intro-bottom" data-reveal>
            <img
              className="pl-bottle"
              src="/brand/bottle-neck.webp"
              width="440"
              height="780"
              alt=""
              aria-hidden="true"
            />
            <div>
              <p>
                French café influences. New York personality. A warm, authentic
                room shaped by Danish design.
              </p>
              <p>
                Easy mornings become unhurried evenings. Thoughtful hospitality
                turns familiar faces into regulars.
              </p>
            </div>
          </div>
          <Note>
            Concept drawn from the business deck, slides 2–3. Plaisir is a
            coffee and wine concept in development.
          </Note>
        </section>
        <section
          id="experience"
          className="pl-experience"
          aria-labelledby="experience-title"
        >
          <div className="pl-section pl-experience-heading">
            <div className="pl-section-label">
              <span>02 / Two rhythms. One place.</span>
            </div>
            <Display id="experience-title">
              From your first sip
              <br />
              <em>to one more glass.</em>
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
                  aria-pressed={daypart === name}
                  onClick={() => setDaypart(name)}
                >
                  {name === "Morning" ? "Morning coffee" : "Evening wine"}
                  <span aria-hidden="true">
                    {name === "Morning" ? "01" : "02"}
                  </span>
                </button>
              ),
            )}
          </div>
          <div className="pl-daypart" data-daypart={daypart}>
            <div className="pl-daypart-image" data-reveal>
              {(Object.keys(dayparts) as (keyof typeof dayparts)[]).map(
                (name) => (
                  <img
                    key={name}
                    src={`/brand/${dayparts[name].image}.webp`}
                    alt={daypart === name ? dayparts[name].alt : ""}
                    aria-hidden={daypart !== name}
                    className={daypart === name ? "is-active" : ""}
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                ),
              )}
              <span>Brand concept rendering</span>
            </div>
            <div className="pl-daypart-copy" key={daypart} aria-live="polite">
              <span className="pl-kicker">{selected.label}</span>
              <h3>
                {selected.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>{selected.text}</p>
              <ul>
                {selected.menu.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pl-experience-note">
            <Note title="The proposed menu">
              Coffee and pastries in the morning. Wine by the glass and bottle,
              boards, small bites and light food later. Shared ingredients,
              simple assembly and consistent portions. Final selection, prices
              and hours follow costing and site confirmation.
            </Note>
          </div>
        </section>
        <section
          className="pl-section pl-hospitality"
          aria-labelledby="hospitality-title"
        >
          <div className="pl-section-label">
            <span>Good wine starts with a conversation</span>
          </div>
          <Display id="hospitality-title">
            “What do you
            <br />
            <em>usually enjoy?”</em>
          </Display>
          <div className="pl-hospitality-bottom" data-reveal>
            <p>
              A familiar question. A few thoughtful suggestions.
              <br />
              An experience that stays relaxed.
            </p>
            <div className="pl-wine-words">
              <span>Lighter or fuller</span>
              <span>Dry or a little sweetness</span>
              <span>With food or just a glass</span>
            </div>
          </div>
          <span className="pl-philosophy">Atmosphere over wine.</span>
        </section>
        <section className="pl-journal-section" aria-labelledby="details-title">
          <div className="pl-section pl-journal-heading">
            <div className="pl-section-label">
              <span>03 / The little things</span>
              <span>Swipe to explore</span>
            </div>
            <Display id="details-title">
              A world of <em>Plaisir.</em>
            </Display>
          </div>
          <div
            className="pl-journal"
            ref={gallery}
            aria-label="Plaisir brand concepts"
            onScroll={(e) => {
              const track = e.currentTarget;
              const width =
                (track.children[0] as HTMLElement)?.offsetWidth || 1;
              setGalleryIndex(
                Math.max(
                  0,
                  Math.min(2, Math.round(track.scrollLeft / (width + 16))),
                ),
              );
            }}
          >
            {[
              [
                "coffee",
                "Your everyday ritual.",
                "Coffee, carried into the neighbourhood.",
                "774",
                "908",
              ],
              [
                "merchandise",
                "A familiar feeling.",
                "The identity, beyond the counter.",
                "1536",
                "1024",
              ],
              [
                "table",
                "A table to return to.",
                "Forest green. Warm amber. The original script.",
                "1536",
                "1024",
              ],
            ].map(([img, title, text, width, height], i) => (
              <figure className="pl-journal-card" key={img} tabIndex={0}>
                <div>
                  <img
                    src={`/brand/${img}.webp`}
                    width={width}
                    height={height}
                    alt={`${title} Plaisir branding concept rendering`}
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="pl-journal-controls">
            <span aria-live="polite">
              0{galleryIndex + 1} <span>/ 03</span>
            </span>
            <div>
              <button
                onClick={() => moveGallery(Math.max(0, galleryIndex - 1))}
                disabled={galleryIndex === 0}
                aria-label="Previous brand image"
              >
                ←
              </button>
              <button
                onClick={() => moveGallery(Math.min(2, galleryIndex + 1))}
                disabled={galleryIndex === 2}
                aria-label="Next brand image"
              >
                →
              </button>
            </div>
          </div>
          <div className="pl-experience-note">
            <Note>
              Supplied concepts and generated renderings, rather than produced
              packaging or launched merchandise. Staff clothing comes first; a
              limited retail selection would follow demand and reliable supply.
              No merchandise sales enter the financial illustration.
            </Note>
          </div>
        </section>
        <section
          id="flagship"
          className="pl-flagship"
          aria-labelledby="flagship-title"
        >
          <div className="pl-section pl-flagship-heading">
            <div className="pl-section-label">
              <span>04 / The first address</span>
              <span>Proposed flagship</span>
            </div>
            <Display id="flagship-title">
              New York energy.
              <br />
              <em>Neighbourhood soul.</em>
            </Display>
            <p>
              East Village, New York.
              <br />
              The starting point for the Plaisir proposal.
            </p>
          </div>
          <figure className="pl-facade" data-reveal>
            <img
              src="/brand/facade.webp"
              width="1536"
              height="1024"
              alt="Architectural concept for a Plaisir coffee and wine frontage; no confirmed premises"
              loading="lazy"
            />
            <figcaption>
              Architectural concept · Site and opening date to be confirmed
            </figcaption>
          </figure>
          <div className="pl-section pl-site-details">
            <div>
              <span className="pl-kicker">The source proposal</span>
              <p>
                A compact footprint.
                <br />A clear identity on the street.
                <br />
                Warmth from within.
              </p>
            </div>
            <Note title="Site assumptions to resolve">
              The proposal gives 500 sq ft plus basement and $6,000 monthly
              rent. Other modelling assumes 900–1,200 sq ft and 35–45 seats.
              Annual rent of $72k has not been reconciled with the model’s $216k
              occupancy budget. Lease, usable area, seating, permissions, hours
              and full costs remain unconfirmed. Deck slides 22–23.
            </Note>
          </div>
        </section>
        <section
          className="pl-section pl-investor-bridge"
          aria-labelledby="investor-title"
        >
          <div className="pl-section-label">
            <span>05 / The business behind the feeling</span>
          </div>
          <Display id="investor-title">
            One neighbourhood.
            <br />
            <em>Then the next.</em>
          </Display>
          <div className="pl-investor-copy" data-reveal>
            <p>
              Build the culture. Prove the flagship. Grow when the operation is
              ready.
            </p>
            <p>
              A coffee and wine model with two reasons to visit, a focused food
              offer and clear service standards. Explore the assumptions behind
              the first site below.
            </p>
          </div>
          <div className="pl-investor-details">
            <Note title="The people behind Plaisir">
              <div className="pl-team">
                {team.map(([name, role, responsibility]) => (
                  <div key={name}>
                    <h3>{name}</h3>
                    <span>{role}</span>
                    <p>{responsibility}</p>
                  </div>
                ))}
              </div>
              <p>
                Leadership roles as reported in deck slide 13. Availability,
                compensation and decision rights require confirmation. The
                proposed culture emphasises warmth, paid learning, feedback and
                consistent service.
              </p>
            </Note>
            <Note title="From first site to future growth">
              <ol className="pl-launch">
                <li>
                  <strong>Agreement</strong>Site, capacity, costed menu, hours
                  and full budget.
                </li>
                <li>
                  <strong>Readiness</strong>Suppliers, paid rota, standards and
                  practical training.
                </li>
                <li>
                  <strong>Soft opening</strong>Service trials and a controlled
                  opening period.
                </li>
                <li>
                  <strong>Trading review</strong>Margin, labour, waste, cash and
                  repeat visits.
                </li>
              </ol>
              <p>
                Expansion follows sustained cash generation, repeat demand and
                reliable manager-led service. Three sites at $1.2–1.5m annual
                sales each would imply $3.6–4.5m combined revenue; this is an
                illustration, without a validated timetable or profitability
                assumption. Final investment terms, rewards and benefits remain
                to be agreed. Deck slides 27–31.
              </p>
            </Note>
          </div>
        </section>
        <section
          id="financials"
          className="financials pl-financials"
          aria-label="Interactive financial illustration"
        >
          <FinancialDashboard />
        </section>
        <section className="pl-closing" aria-label="Plaisir brand closing">
          <span>Coffee & wine. Good company.</span>
          <p>
            A little everyday
            <br />
            <em>pleasure.</em>
          </p>
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
            loading="lazy"
          />
          <a href="#experience">Back to the experience ↑</a>
        </section>
      </main>
      <footer className="pl-footer">
        <div>
          <p>Concept & investor overview</p>
          <p>
            Concept imagery, including AI-generated scenes.
            <br />
            Financial illustrations require validation and approval.
          </p>
        </div>
        <PageMotion />
      </footer>
      <nav className="pl-mobile-dock" aria-label="Quick navigation">
        <a href="#experience">
          The experience <span aria-hidden="true">↓</span>
        </a>
        <a href="#financials">
          For investors <span aria-hidden="true">+</span>
        </a>
      </nav>
    </>
  );
}
