import type { Metadata } from "next";
import Link from "next/link";
import { Note } from "../BrandUI";
export const metadata: Metadata = {
  title: "Plaisir · The story",
  description:
    "A neighbourhood coffee-and-wine concept. Explore the proposed flagship, operating approach and financial illustration.",
};
const team = [
  ["Kevin Murph", "Founder & CEO", "Concept, culture and strategy"],
  ["Oliwier Papadopoulos", "Partner & CFO", "Budget, cash flow and reporting"],
  ["Jose Sidoa", "Partner & CWO", "Wine buying and service standards"],
  ["Mohammed Diomande", "Partner & COO", "Staffing, training and operations"],
];
export default function Investors() {
  return (
    <main id="main">
      <section className="scene investor-hero">
        <img
          className="scene-photo"
          src="/brand/facade.webp"
          width="1536"
          height="1024"
          alt="Architectural concept for a Plaisir flagship; not confirmed premises"
          fetchPriority="high"
        />
        <div className="scene-shade" />
        <div className="scene-content">
          <h1>
            A familiar place.
            <br />A new chapter.
          </h1>
          <p>
            Morning coffee and evening wine. One neighbourhood space, with a
            flagship that proves the operation first.
          </p>
          <a className="pill" href="#proposition">
            Explore the proposition
          </a>
        </div>
      </section>
      <section id="proposition" className="investor-intro gold-section">
        <div>
          <h2 data-reveal>
            Two reasons
            <br />
            to visit.
            <br />
            One place.
          </h2>
        </div>
        <div>
          <p>
            The morning ritual becomes the evening meeting place. Coffee and
            pastries at the counter. Wine, boards and small bites around a
            table.
          </p>
          <p>
            The identity connects the street, the counter and the room. The
            hospitality stays simple: a warm welcome and good guidance through
            conversation.
          </p>
          <dl className="pl-operating-list">
            <div>
              <dt>The guests</dt>
              <dd>
                Nearby residents and workers, after-work groups and friends
                sharing an evening.
              </dd>
            </div>
            <div>
              <dt>The offer</dt>
              <dd>
                A focused menu. Shared ingredients, simple assembly and
                consistent portions.
              </dd>
            </div>
            <div>
              <dt>The identity</dt>
              <dd>
                French café influences. New York personality. Danish design.
                Olive green, ochre and the original bottle and script.
              </dd>
            </div>
          </dl>
          <Note title="Concept & source notes">
            Proposed audiences, not validated market research. Menu, pricing,
            hours and staffing require costing. The public experience is a
            concept preview, not an operating venue.
          </Note>
        </div>
      </section>
      <section className="split-scene">
        <figure className="split-photo">
          <img
            src="/brand/table.webp"
            width="1536"
            height="1024"
            alt="Plaisir table-service concept"
            loading="lazy"
          />
        </figure>
        <div className="split-copy">
          <h2 data-reveal>
            Flagship
            <br />
            first.
          </h2>
          <p>
            The East Village proposal describes 500 sq ft plus a basement, with
            base rent of $6,000 per month. The actual premises must determine
            the offer, capacity and complete opening budget.
          </p>
          <Note title="Premises assumptions to reconcile">
            Other modelling assumes 900–1,200 sq ft and 35–45 seats. The
            proposed $72k annual rent has not been reconciled with $216k annual
            model occupancy: a $144k difference. Lease, usable area,
            permissions, capacity and full occupancy costs require confirmation.
          </Note>
          <Link className="pill" href="/financials">
            Explore the assumptions
          </Link>
        </div>
      </section>
      <section className="investor-people">
        <h2 data-reveal>
          A culture worth
          <br />
          coming back to.
        </h2>
        <p>
          Hire for warmth and judgement. Build product knowledge through paid
          learning, practical standards and feedback.
        </p>
        <div className="pl-team">
          {team.map(([name, role, detail]) => (
            <div key={name}>
              <h3>{name}</h3>
              <span>{role}</span>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <Note title="Leadership notes">
          Source-reported leadership roles. Availability, compensation and
          decision rights require confirmation.
        </Note>
      </section>
      <section className="growth-section gold-section">
        <div>
          <h2 data-reveal>
            Prove it.
            <br />
            Then grow.
          </h2>
          <p>
            Expansion follows sustained cash generation, repeat demand and
            reliable manager-led service.
          </p>
        </div>
        <div>
          <ol className="pl-launch">
            <li>
              <strong>Agreement</strong>One site, operating capacity, costed
              menu, hours and complete budget.
            </li>
            <li>
              <strong>Readiness</strong>Suppliers, paid rota, service standards
              and practical training.
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
          <Note title="Growth assumptions">
            Three sites at $1.2–1.5m annual sales each imply $3.6–4.5m combined
            revenue. This is an illustration without a validated timetable or
            profitability assumption. Funding terms, benefits and investor
            rights remain to be agreed.
          </Note>
        </div>
      </section>
      <section className="model-invitation">
        <h2 data-reveal>
          Behind
          <br />
          the feeling.
          <br />
          The figures.
        </h2>
        <p>
          Explore the proposed operating model, funding allocation, opening cash
          and demand assumptions. Adjust the inputs and see what changes.
        </p>
        <Link className="pill" href="/financials">
          Open the financial dashboard
        </Link>
        <p className="pl-small-print">
          Source-derived illustrations. Not an approved forecast or investment
          return calculation.
        </p>
      </section>
    </main>
  );
}
