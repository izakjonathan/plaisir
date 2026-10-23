"use client";
import { useState } from "react";
import FinancialDashboard from "./FinancialDashboard";

const team = [
  ["Kevin Murph", "Founder & CEO", "Concept, culture and strategy"],
  ["Oliwier Papadopoulos", "Partner & CFO", "Budget, cash flow and reporting"],
  ["Jose Sidoa", "Partner & CWO", "Wine buying and service standards"],
  ["Mohammed Diomande", "Partner & COO", "Staffing, training and operations"],
];
const dayparts = {
  Morning: {
    heading: "Coffee in the morning",
    text: "Good coffee, pastries and an easy start to the day. A familiar stop for the neighbourhood, whether guests settle in or take their coffee with them.",
    image: "takeaway",
    caption: "Takeaway family · Brand concept rendering",
  },
  Evening: {
    heading: "Approachable wine later in the day",
    text: "Wine, simple food and time for conversation. An approachable by-the-glass list, bottles and food made for sharing. The experience stays relaxed.",
    image: "table",
    caption: "Wine and table service · Brand concept rendering",
  },
};
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [daypart, setDaypart] = useState<keyof typeof dayparts>("Morning");
  const selected = dayparts[daypart];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand-lockup" href="#" aria-label="Plaisir home">
          <strong>Plaisir</strong>
          <span>coffee & wine</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="site-navigation"
          aria-label="Main navigation"
          className={menuOpen ? "open" : ""}
        >
          {[
            ["Concept", "#concept"],
            ["Experience", "#experience"],
            ["Flagship", "#flagship"],
            ["Financial model", "#financials"],
            ["Team", "#team"],
            ["Launch", "#launch"],
          ].map(([text, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {text}
            </a>
          ))}
        </nav>
      </header>
      <main id="main">
        <section className="cover" aria-labelledby="cover-title">
          <img
            className="cover-bottle decorative"
            src="/brand/bottle.webp"
            alt=""
            width="320"
            height="1000"
          />
          <div className="cover-center">
            <h1 id="cover-title">
              <span className="sr-only">Plaisir coffee & wine</span>
              <img
                src="/brand/wordmark.webp"
                alt=""
                width="900"
                height="380"
                fetchPriority="high"
              />
            </h1>
            <p>coffee & wine</p>
          </div>
          <div className="cover-footer">
            <a href="#concept">Discover the concept</a>
            <span>Brand & flagship proposal</span>
            <a href="#financials">Explore the financial illustration</a>
          </div>
        </section>
        <section
          id="concept"
          className="section concept"
          aria-labelledby="concept-title"
        >
          <p className="section-kicker">01 / Concept overview</p>
          <div className="concept-content">
            <div className="concept-lockup">
              <img
                src="/brand/wordmark.webp"
                alt="Plaisir"
                width="225"
                height="95"
              />
              <span>is…</span>
            </div>
            <h2 id="concept-title">
              French café influences, an outgoing New York personality
              <br className="desktop-break" /> and a warm, authentic room shaped
              by Danish design.
            </h2>
            <p>
              Coffee in the morning. Approachable wine later in the day.
              <br />
              Thoughtful hospitality that turns familiar faces into regulars.
            </p>
          </div>
          <p className="source-note">
            Concept consolidated in the business deck, slides 2–3.
          </p>
        </section>
        <section className="brand-philosophy" aria-label="Brand philosophy">
          <div>
            <p>Not intimidating</p>
            <p>Not boring</p>
            <h2>Atmosphere over wine</h2>
          </div>
          <img
            className="philosophy-bottle decorative"
            src="/brand/bottle-neck.webp"
            alt=""
            width="440"
            height="780"
          />
        </section>
        <section
          id="experience"
          className="section experience"
          aria-labelledby="experience-title"
        >
          <div className="section-top">
            <p className="section-kicker">02 / Coffee and wine</p>
            <h2 id="experience-title" className="serif-heading">
              A familiar place, through the day
            </h2>
          </div>
          <div
            className="daypart-tabs"
            role="group"
            aria-label="Explore the dayparts"
          >
            {(Object.keys(dayparts) as (keyof typeof dayparts)[]).map(
              (name) => (
                <button
                  key={name}
                  aria-pressed={daypart === name}
                  onClick={() => setDaypart(name)}
                >
                  {name}
                </button>
              ),
            )}
          </div>
          <div className="experience-layout">
            <figure>
              <img
                src={`/brand/${selected.image}.webp`}
                alt={
                  daypart === "Morning"
                    ? "Plaisir branded coffee cups, pastry bag and takeaway box concept"
                    : "Plaisir wine glasses, green menu and coasters concept"
                }
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>{selected.caption}</figcaption>
            </figure>
            <div className="experience-copy" aria-live="polite">
              <h3>{selected.heading}</h3>
              <p>{selected.text}</p>
              <p className="serif-label">A small menu</p>
              <p>
                Coffee and pastries.
                <br />
                Wine by the glass and bottle.
                <br />
                Boards, small bites and light food.
              </p>
              <p className="small-copy">
                Shared ingredients. Simple assembly. Consistent portions and
                clear prices. Launch selection and pricing remain subject to
                costing.
              </p>
            </div>
          </div>
          <div className="guest-row">
            <div>
              <h3>Daily regulars</h3>
              <p>Nearby residents and workers with a morning coffee habit.</p>
            </div>
            <div>
              <h3>After work</h3>
              <p>Friends and colleagues looking for an easy place to meet.</p>
            </div>
            <div>
              <h3>Evenings together</h3>
              <p>Couples and small groups sharing wine and food.</p>
            </div>
            <div>
              <h3>A slower afternoon</h3>
              <p>Daytime visitors during the quieter hours.</p>
            </div>
          </div>
          <p className="source-note">
            Proposed guest groups, not validated market research. Deck slides
            5–10.
          </p>
        </section>
        <section
          className="section hospitality"
          aria-labelledby="hospitality-title"
        >
          <div>
            <p className="section-kicker">Wine guidance</p>
            <h2 id="hospitality-title" className="serif-heading">
              “What do you usually enjoy?”
            </h2>
            <p>
              A familiar question opens the conversation. Staff can then suggest
              a few relevant options.
            </p>
            <div className="wine-prompts">
              <span>Lighter or fuller</span>
              <span>Dry or some sweetness</span>
              <span>With food or a glass on its own</span>
            </div>
          </div>
          <p className="hospitality-close">The experience stays relaxed.</p>
        </section>
        <section
          className="section brand-world"
          aria-labelledby="brand-world-title"
        >
          <div className="section-top">
            <p className="section-kicker">03 / Brand experience</p>
            <h2 id="brand-world-title" className="serif-heading">
              Familiar in every detail
            </h2>
          </div>
          <div className="brand-images">
            <figure>
              <img
                src="/brand/coffee.webp"
                alt="Green Plaisir coffee-cup branding concept"
                width="774"
                height="908"
                loading="lazy"
              />
              <figcaption>Coffee, carried into the neighbourhood</figcaption>
            </figure>
            <figure>
              <img
                src="/brand/merchandise.webp"
                alt="Plaisir staff clothing and canvas tote brand concept"
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>The identity beyond the counter</figcaption>
            </figure>
          </div>
          <div className="brand-description">
            <h3>
              Forest green. Warm amber.
              <br />
              The original bottle and script.
            </h3>
            <p>
              Natural textures and a considered set of details connect the
              counter, the table and the street. Staff clothing comes first. A
              limited retail selection follows demand and a reliable supply
              process.
            </p>
          </div>
          <p className="source-note">
            Supplied branding concepts and AI-generated renderings from the
            deck. These do not depict produced packaging or launched
            merchandise. No merchandise revenue enters the financial model.
          </p>
        </section>
        <section
          id="flagship"
          className="section flagship"
          aria-labelledby="flagship-title"
        >
          <div className="section-top">
            <p className="section-kicker">04 / The proposed flagship</p>
            <h2 id="flagship-title" className="serif-heading">
              East Village, New York
            </h2>
          </div>
          <div className="flagship-layout">
            <figure>
              <img
                src="/brand/facade.webp"
                alt="Architectural brand concept for a Plaisir coffee and wine frontage"
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>
                Architectural brand concept. No confirmed site is depicted.
              </figcaption>
            </figure>
            <div>
              <div className="site-stat">
                <strong>500 sq ft</strong>
                <span>plus a basement in the source proposal</span>
              </div>
              <div className="site-stat">
                <strong>$6,000 / month</strong>
                <span>proposed rent, before a full occupancy budget</span>
              </div>
              <p>
                A clear window identity. A small projecting sign. Warmth from
                within.
              </p>
              <p className="small-copy">
                The lease, usable area, seating capacity and permissions remain
                unconfirmed. Fit-out, operating hours and the full occupancy
                cost must align with the actual premises.
              </p>
              <details className="site-question">
                <summary>What still needs reconciliation?</summary>
                <p>
                  Other source modelling assumes 900–1,200 sq ft and 35–45
                  seats. The proposed rent annualises to $72,000, while the
                  annual financial illustration uses $216,000 for occupancy. The
                  additional $144,000 has not been explained. The dashboard
                  keeps the deck’s $216,000 baseline visible and editable.
                </p>
              </details>
            </div>
          </div>
          <p className="source-note">
            Source proposal and unresolved site assumptions: deck slides 22–23.
          </p>
        </section>
        <section
          id="team"
          className="section team"
          aria-labelledby="team-title"
        >
          <div className="section-top">
            <p className="section-kicker">05 / People</p>
            <h2 id="team-title" className="serif-heading">
              A culture of hospitality
            </h2>
          </div>
          <div className="team-intro">
            <p>
              We hire for warmth and judgement.
              <br />
              We build product knowledge through practice.
            </p>
            <p>
              Clear recipes and service standards give the team confidence. Paid
              learning, feedback and progression support consistency.
            </p>
          </div>
          <div className="team-list">
            {team.map(([name, role, responsibility]) => (
              <div key={name}>
                <h3>{name}</h3>
                <span>{role}</span>
                <p>{responsibility}</p>
              </div>
            ))}
          </div>
          <p className="source-note">
            Leadership roles as reported in the source deck, slide 13.
            Availability, compensation and decision rights require confirmation.
          </p>
        </section>
        <section
          id="financials"
          className="section financials"
          aria-label="Interactive financial illustration"
        >
          <FinancialDashboard />
        </section>
        <section
          id="launch"
          className="section launch"
          aria-labelledby="launch-title"
        >
          <div className="section-top">
            <p className="section-kicker">07 / Launch and growth</p>
            <h2 id="launch-title" className="serif-heading">
              A proven flagship first
            </h2>
          </div>
          <div className="launch-steps">
            {[
              [
                "01",
                "Agreement",
                "Site, capacity, costed menu, hours and a complete budget.",
              ],
              [
                "02",
                "Readiness",
                "Suppliers, paid rota, service standards and practical training.",
              ],
              [
                "03",
                "Soft opening",
                "Service trials and a controlled opening period.",
              ],
              [
                "04",
                "Trading review",
                "Margin, labour, waste, cash and repeat visits.",
              ],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="growth">
            <div>
              <h3>Growth after evidence</h3>
              <p>
                Expansion follows sustained cash generation, repeat demand and
                reliable manager-led service.
              </p>
              <p>
                Three sites at $1.2–1.5m annual sales each would imply $3.6–4.5m
                combined annual revenue. This is an illustration, with no
                validated timetable or profitability assumption.
              </p>
            </div>
            <div>
              <h3>Before launch commitment</h3>
              <p>
                One site and operating capacity.
                <br />
                One costed menu and staffing plan.
                <br />
                One financial model and cash reserve.
                <br />
                Clear terms for rewards, benefits and investor perks.
              </p>
            </div>
          </div>
          <p className="source-note">
            Deck slides 27–31. Opening dates follow readiness. No lease, opening
            date or approved forecast has been supplied.
          </p>
        </section>
        <section className="closing" aria-label="Plaisir brand closing">
          <img
            src="/brand/wordmark.webp"
            alt="Plaisir"
            width="900"
            height="380"
            loading="lazy"
          />
          <p>coffee & wine</p>
          <a href="#financials">Return to the financial model</a>
        </section>
      </main>
      <footer>
        <a className="brand-lockup" href="#">
          <strong>Plaisir</strong>
          <span>coffee & wine</span>
        </a>
        <p>Leadership draft · Concept and investor overview</p>
        <p>Financial illustrations require validation and approval.</p>
      </footer>
    </>
  );
}
