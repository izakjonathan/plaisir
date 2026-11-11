import type { Metadata } from "next";
import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { DAYPARTS, FORECASTS, FUNDING } from "../../lib/investor-forecast";
import AppConcept from "./AppConcept";
import DeckNavigation from "./DeckNavigation";
import s from "./seed.module.css";

export const metadata: Metadata = {
  title: "Plaisir · Seed presentation",
  description: "The proposed New York City flagship and its operating plan.",
  robots: { index: false, follow: false, noarchive: true },
};

const contents = [
  ["concept", "The concept", "Coffee, wine and the people who come for both"],
  ["app", "The Plaisir app", "An interactive preview of the guest and staff experience"],
  ["demand", "The flagship", "Demand, the New York site and the team"],
  ["sales", "The economics", "Daypart sales, operating costs and cash flow"],
  ["funding", "Seed funding", "Use of funds and the milestones ahead"],
];

function Title({ children, cover = false }: { children: string; cover?: boolean }) {
  const Heading = cover ? "h1" : "h2";
  return (
    <Heading className={cover ? s.coverTitle : s.title} aria-label={children.replace("\n", " ")}>
      {children.split(/(\s+)/).map((word, index) => (
        <Fragment key={index}>
          {word === "\n" ? <br /> : word === " " ? " " : (
            <span className={s.word} aria-hidden="true">
              <span style={{ "--word": index / 2 } as CSSProperties}>{word}</span>
            </span>
          )}
        </Fragment>
      ))}
    </Heading>
  );
}

function Slide({ id, number, chapter, tone = "green", image, children }: {
  id: string; number: number; chapter: string; tone?: "green" | "gold" | "photo";
  image?: { src: string; alt?: string }; children: ReactNode;
}) {
  return (
    <section id={id} data-seed-slide={number} data-tone={tone} className={s.slide} tabIndex={-1} aria-label={chapter}>
      {image && (
        <div className={s.backdrop}>
          <Image src={image.src} alt={image.alt ?? ""} fill sizes="100vw" preload={number === 1} />
        </div>
      )}
      <div className={s.slideContent}>{children}</div>
      <div className={s.folio} aria-hidden="true"><span>{chapter}</span><span>{String(number).padStart(2, "0")}</span></div>
    </section>
  );
}

function Scene({ src, alt }: { src: string; alt: string }) {
  return <div className={s.scenePhoto}><Image src={src} alt={alt} fill sizes="(min-width: 850px) 48vw, 100vw" /></div>;
}

function Notes({ items }: { items: readonly (readonly [string, string])[] }) {
  return <dl className={s.notes}>{items.map(([label, copy]) => (
    <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>
  ))}</dl>;
}

function Figures({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return <table className={s.figures}>
    <thead><tr>{columns.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
    <tbody>{rows.map(([label, ...values]) => (
      <tr key={label}><th scope="row">{label}</th>{values.map((value, i) => <td key={i}>{value}</td>)}</tr>
    ))}</tbody>
  </table>;
}

const base = FORECASTS.Base;
const usd = (value: number) => "$" + value.toLocaleString("en-US");
const thousands = (value: number) => (value < 0 ? "−" : "") + "$" + Math.round(Math.abs(value) / 1_000) + "k";
const millions = (value: number, precision: number) => "$" + (value / 1_000_000).toFixed(precision) + "m";
const visits = DAYPARTS.reduce((sum, part) => sum + part.visits, 0);
const sales = DAYPARTS.reduce((sum, part) => sum + part.visits * part.spend, 0);

export default function SeedPage() {
  return (
    <main id="seed-deck" className={s.deck}>
      <DeckNavigation />
      <div className={s.track} data-seed-track>
        <Slide id="cover" number={1} chapter="Seed presentation" tone="photo" image={{ src: "/brand/table.webp" }}>
          <div className={s.hero}>
            <p className={s.kicker}>Plaisir · Seed presentation</p>
            <Title cover>{"Coffee by day,\nwine by night."}</Title>
            <p className={s.lead}>A proposed New York City flagship.</p>
            <a className={s.textLink} href="#overview">Explore the deck <span aria-hidden="true">↓</span></a>
          </div>
          <span className={s.bottle} aria-hidden="true" />
        </Slide>

        <Slide id="overview" number={2} chapter="Overview" tone="gold">
          <div className={s.editorial}>
            <div><Title>The short version.</Title><p className={s.lead}>One neighbourhood room for a quick morning visit and an evening worth staying for.</p></div>
            <nav aria-label="Presentation chapters" className={s.chapters}>
              {contents.map(([id, title, detail], index) => (
                <a key={id} href={`#${id}`}><span>{title}<small>{detail}</small></span><span aria-hidden="true">0{index + 1} <i className={s.arrow} /></span></a>
              ))}
            </nav>
          </div>
        </Slide>

        <Slide id="concept" number={3} chapter="The concept">
          <div className={s.split}>
            <div className={s.copy}><Title>Coffee by day, wine by night.</Title><p className={s.lead}>One neighbourhood room for a quick morning visit and an evening worth staying for.</p></div>
            <Scene src="/brand/morning-service.webp" alt="Coffee served at a café counter" />
          </div>
        </Slide>

        <Slide id="guests" number={4} chapter="The guests" tone="gold">
          <div className={s.editorial}>
            <div><Title>Two occasions for regular visits.</Title><p className={s.lead}>The first location targets people who live or work within walking distance.</p></div>
            <div><Notes items={[
              ["Morning coffee", "Nearby workers and residents looking for a reliable espresso and pastry, with a quick takeaway option."],
              ["Evening wine", "After-work guests and local wine drinkers looking for a relaxed table, guided choices and food to share."],
            ]}/><p className={s.aside}>Afternoon coffee and light lunch give regulars another reason to return.</p></div>
          </div>
        </Slide>

        <Slide id="menu" number={5} chapter="The menu">
          <div className={s.split}>
            <div className={s.copy}><Title>A menu that changes with the day.</Title>
              <p className={s.lead}>The same room serves different occasions as the menu, lighting and music change.</p>
              <Notes items={[
                ["Morning", "Espresso, brewed coffee and pastries, with fast counter service."],
                ["Afternoon", "Coffee, light lunch and small plates, with wine available as service transitions."],
                ["Evening", "Wine by the glass, guided flights, cheese and charcuterie boards."],
              ]}/>
            </div>
            <Scene src="/brand/sharing-table.webp" alt="Wine, cheese and charcuterie on a table" />
          </div>
        </Slide>

        <Slide id="service" number={6} chapter="Operations" tone="gold">
          <div className={s.split}>
            <Scene src="/brand/wine-pouring.jpg" alt="Wine poured by the glass" />
            <div className={s.copy}><Title>Service and staffing.</Title>
              <p className={s.lead}>A warm welcome and practical wine guidance are part of the offer.</p>
              <Notes items={[
                ["Training", "Use tasting, pairing and service standards to develop staff across coffee and wine."],
                ["Staffing", "Schedule by expected demand and adjust coverage using order volume and service times."],
                ["Food preparation", "Standardise board portions, prep routines and stock rotation to manage cost and waste."],
              ]}/>
            </div>
          </div>
        </Slide>

        <Slide id="app" number={7} chapter="The Plaisir app">
          <AppConcept>
            <Title>The Plaisir app.</Title>
            <p className={s.lead}>Guests can explore the menu, track rewards and send gifts. Staff have a workspace for shifts, training and daily operations.</p>
          </AppConcept>
        </Slide>

        <Slide id="demand" number={8} chapter="Demand">
          <div className={s.editorial}>
            <div><Title>Demand before a lease.</Title><p className={s.lead}>The first tests should measure paid demand near candidate locations.</p></div>
            <Notes items={[
              ["Paid tastings and coffee pop-ups", "Test price, spend per visit, and the balance between coffee and wine demand."],
              ["Neighbourhood partners", "Try collaborations with nearby businesses and track how many guests return."],
              ["Repeat visits", "Pilot rewards that work across coffee and wine. Measure use and cost before expanding."],
            ]}/>
          </div>
        </Slide>

        <Slide id="flagship" number={9} chapter="The flagship" tone="photo"
          image={{ src: "/brand/flagship-front.jpg", alt: "Illustrative Plaisir storefront concept" }}>
          <div className={s.hero}><p className={s.kicker}>Storefront concept</p><Title>The New York flagship.</Title>
            <p className={s.lead}>The model assumes one site of about 1,000 sq ft at {usd(base.months[0].occupancy)} monthly occupancy cost.</p>
            <p className={s.aside}>Before lease signing, confirm foot traffic, build-out quotes, service capacity and the licensing path.</p>
          </div>
        </Slide>

        <Slide id="team" number={10} chapter="The team">
          <div className={s.editorial}>
            <Title>The team.</Title>
            <Notes items={[
              ["Kevin Murph · Founder & CEO", "Concept, culture and strategy"],
              ["Oliwier Papadopoulos · Partner & CFO", "Budget, cash flow and reporting"],
              ["Jose Sidoa · Partner & CWO", "Wine buying and service standards"],
              ["Mohammed Diomande · Partner & COO", "Staffing, training and operations"],
            ]}/>
          </div>
        </Slide>

        <Slide id="sales" number={11} chapter="Sales assumptions" tone="gold">
          <div className={s.data}><Title>Sales by time of day.</Title>
            <p className={s.lead}>Base case assumptions after the opening ramp, at starting prices.</p>
            <Figures columns={["Daypart", "Visits per day", "Avg. spend", "Daily net sales"]} rows={[
              ...DAYPARTS.map(part => [part.name, String(part.visits), usd(part.spend), usd(part.visits * part.spend)]),
              ["Total", String(visits), "$" + (sales / visits).toFixed(2) + " blended", usd(sales)],
            ]}/>
            <p className={s.aside}>Evening wine and food account for {Math.round(DAYPARTS[2].visits * DAYPARTS[2].spend / sales * 100)}% of modeled daily sales.</p>
          </div>
        </Slide>

        <Slide id="economics" number={12} chapter="Flagship economics">
          <div className={s.data}><Title>Flagship economics.</Title>
            <p className={s.lead}>Three-year base case, USD. Trading years begin at opening.</p>
            <Figures columns={["Metric", "Year 1", "Year 2", "Year 3"]} rows={[
              ["Net sales", ...base.years.map(year => millions(year.sales, 3))],
              ["Gross margin", ...base.years.map(year => (year.grossMargin * 100).toFixed(1) + "%")],
              ["EBITDA", ...base.years.map(year => thousands(year.ebitda))],
              ["Free cash flow", ...base.years.map(year => thousands(year.freeCashFlow))],
            ]}/>
            <p className={s.aside}>The base case remains cash-flow-negative. In the downside case, cash runs out in trading month {FORECASTS.Downside.cashShortfall} at the modeled funding level.</p>
          </div>
        </Slide>

        <Slide id="funding" number={13} chapter="Seed funding" tone="gold">
          <div className={s.editorial}>
            <div><Title>Seed funding and use of funds.</Title><p className={s.amount}>{millions(FUNDING, 2)}</p><p className={s.aside}>Funding assumed in the flagship model.</p></div>
            <div><Figures columns={["Modeled use", "USD"]} rows={[
              ["Build-out, equipment and contingency", thousands(base.initialCapex)],
              ["Other pre-opening uses", thousands(base.openingUses - base.initialCapex)],
              ["Cash available at opening", thousands(base.openingCash)],
              ["Total modeled funding", millions(FUNDING, 2)],
            ]}/>
            <p className={s.aside}>Confirm the final raise and terms after site and budget validation.</p></div>
          </div>
        </Slide>

        <Slide id="milestones" number={14} chapter="Flagship milestones">
          <div className={s.split}>
            <div className={s.copy}><Title>Flagship milestones.</Title>
              <Notes items={[
                ["Before signing", "Validate paid demand and spend. Confirm site costs, approvals and the staffing plan."],
                ["Through opening", "Complete the build-out, train the team and track service, sales and cash against the budget."],
                ["Before a second lease", "Review repeat visits, contribution and cash performance. Expand when the first location supports it."],
              ]}/>
              <a className={s.textLink} href="#cover">Back to the beginning <span aria-hidden="true">↑</span></a>
            </div>
            <Scene src="/brand/good-company.jpg" alt="Guests sharing a table outside a wine bar" />
          </div>
        </Slide>
      </div>
    </main>
  );
}
