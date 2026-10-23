import type { Metadata } from "next";
import Link from "next/link";
import { Display, Note } from "../BrandUI";

export const metadata: Metadata = {
  title: "Plaisir · Investor overview",
  description:
    "The Plaisir concept, guest experience, operating approach, proposed flagship and investment questions.",
};
const team = [
  ["Kevin Murph", "Founder & CEO", "Concept, culture and strategy"],
  ["Oliwier Papadopoulos", "Partner & CFO", "Budget, cash flow and reporting"],
  ["Jose Sidoa", "Partner & CWO", "Wine buying and service standards"],
  ["Mohammed Diomande", "Partner & COO", "Staffing, training and operations"],
];
export default function Investors() {
  return (
    <main id="main" className="pl-main pl-investor-page">
      <div className="pl-area-heading">
        <span>02 / Investor overview</span>
        <Link href="/">View the public experience →</Link>
      </div>
      <section className="pl-investor-opening">
        <div>
          <span className="pl-kicker">The business behind the feeling</span>
          <h1>
            The Plaisir
            <br />
            <em>proposition.</em>
          </h1>
          <p>
            Plaisir brings morning coffee and approachable evening wine into one
            neighbourhood space. The ambition is a recognisable hospitality
            brand, built on a flagship that proves the operation first.
          </p>
          <Link className="pl-solid-link" href="/financials">
            Explore the financial model <span aria-hidden="true">→</span>
          </Link>
        </div>
        <img
          src="/brand/table.webp"
          width="1536"
          height="1024"
          alt="Plaisir table-service branding concept"
        />
      </section>
      <div className="pl-investor-body">
        <section
          className="pl-investor-story"
          aria-labelledby="proposition-title"
        >
          <div>
            <span className="pl-kicker">The proposition</span>
            <Display id="proposition-title">
              Two reasons to visit.
              <br />
              <em>One familiar place.</em>
            </Display>
          </div>
          <div>
            <p>
              The public experience introduces a daily habit, rather than an
              occasional destination: coffee and pastries in the morning; wine,
              boards and small bites later.
            </p>
            <p>
              The visual identity connects the counter, table and street. The
              service proposition is equally simple: warm welcomes and wine
              guidance through conversation.
            </p>
            <dl className="pl-operating-list">
              <div>
                <dt>Guests</dt>
                <dd>
                  Nearby residents and workers, after-work groups, couples and
                  daytime visitors.
                </dd>
              </div>
              <div>
                <dt>Offer</dt>
                <dd>
                  A focused menu with shared ingredients, simple assembly and
                  consistent portions.
                </dd>
              </div>
              <div>
                <dt>Identity</dt>
                <dd>
                  French café influences, New York personality and Danish
                  design. Forest green, warm amber, the original script and
                  bottle.
                </dd>
              </div>
            </dl>
            <Note>
              Deck slides 2–10. Guest groups are proposed audiences, not
              validated market research. Menu selection, prices, hours and
              staffing remain to be costed. The public page is a preview, not an
              operating venue.
            </Note>
          </div>
        </section>
        <section className="pl-investor-site" aria-labelledby="site-title">
          <figure>
            <img
              src="/brand/facade.webp"
              width="1536"
              height="1024"
              alt="Architectural concept for the proposed Plaisir flagship"
              loading="lazy"
            />
            <figcaption>Concept rendering · No confirmed site</figcaption>
          </figure>
          <div>
            <span className="pl-kicker">The proposed starting point</span>
            <Display id="site-title">
              East Village.
              <br />
              <em>Flagship first.</em>
            </Display>
            <p>
              The source proposal describes a compact site with a clear street
              identity and a warm, authentic interior.
            </p>
            <dl className="pl-operating-list">
              <div>
                <dt>500 sq ft</dt>
                <dd>Plus basement in the source proposal.</dd>
              </div>
              <div>
                <dt>$6,000 / month</dt>
                <dd>Proposed rent, before a complete occupancy budget.</dd>
              </div>
            </dl>
            <Note title="What needs reconciliation?">
              Other source modelling assumes 900–1,200 sq ft and 35–45 seats.
              The proposed $72k annual rent has not been reconciled with $216k
              annual model occupancy; the $144k difference remains unresolved.
              Lease, usable area, capacity, permissions, opening hours and full
              costs require confirmation. Deck slides 22–23. The dashboard
              retains the editable $216k baseline.
            </Note>
          </div>
        </section>
        <section className="pl-investor-team" aria-labelledby="team-title">
          <span className="pl-kicker">People & service</span>
          <Display id="team-title">
            A culture worth
            <br />
            <em>coming back to.</em>
          </Display>
          <p>
            Hire for warmth and judgement. Build product knowledge through paid
            learning, practical service standards and feedback.
          </p>
          <div className="pl-team">
            {team.map(([name, role, responsibility]) => (
              <div key={name}>
                <h3>{name}</h3>
                <span>{role}</span>
                <p>{responsibility}</p>
              </div>
            ))}
          </div>
          <Note>
            Leadership roles reported in deck slide 13. Availability,
            compensation and decision rights require confirmation.
          </Note>
        </section>
        <section className="pl-investor-growth" aria-labelledby="growth-title">
          <div>
            <span className="pl-kicker">Launch & growth</span>
            <Display id="growth-title">
              Prove it.
              <br />
              <em>Then grow it.</em>
            </Display>
            <p>
              Expansion follows sustained cash generation, repeat demand and
              reliable manager-led service.
            </p>
          </div>
          <div>
            <ol className="pl-launch">
              <li>
                <strong>Agreement</strong>Site, capacity, costed menu, hours and
                a complete budget.
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
            <Note title="Growth assumptions & outstanding terms">
              Three sites at $1.2–1.5m annual sales each would imply $3.6–4.5m
              combined annual revenue. This is an illustration without a
              validated timetable or profitability assumption. Funding terms,
              rewards, benefits and investor perks remain to be agreed. No
              opening date or approved forecast is supplied. Deck slides 27–31.
            </Note>
          </div>
        </section>
        <section className="pl-model-invitation">
          <span className="pl-kicker">From the story to the assumptions</span>
          <h2>
            Put the model
            <br />
            <em>through its paces.</em>
          </h2>
          <p>
            Explore the deck’s revenue illustration, operating costs, opening
            cash reserve and unresolved demand assumptions in the dedicated
            dashboard.
          </p>
          <Link className="pl-solid-link" href="/financials">
            Open the financial dashboard <span aria-hidden="true">→</span>
          </Link>
          <p className="pl-small-print">
            Source-derived illustrations, not an approved forecast or an
            investment return calculation.
          </p>
        </section>
      </div>
    </main>
  );
}
