import type { Metadata } from "next";
import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { CASE_NOTES, DAYPARTS, FORECASTS, FUNDING } from "../../lib/investor-forecast";
import AppConcept from "./AppConcept";
import DeckNavigation from "./DeckNavigation";
import s from "./seed.module.css";

export const metadata: Metadata = {
  title: "Plaisir · Seed presentation",
  description: "The proposed New York City flagship and its operating plan.",
  robots: { index: false, follow: false, noarchive: true },
};

const contents = [
  ["guests", "Customer & concept", "The occasions Plaisir is designed around"],
  ["flagship", "Market & competition", "The East Village and the venues guests choose today"],
  ["demand", "Progress & economics", "What exists today and what the flagship needs to prove"],
  ["team", "Team & milestones", "Who will open the flagship and how progress will be measured"],
  ["funding", "Seed funding", "The model’s capital assumption and use of funds"],
  ["app", "Appendix", "App prototype, menu, operations, financial detail and market analysis"],
];

const competitors = [
  {
    id: "competitor-analysis",
    number: 19,
    title: "All-day neighbours.",
    introduction: "East Village cafés already serve several of the occasions Plaisir is designed for, from the morning coffee run to drinks with friends.",
    venues: [
      ["Café Maud", "https://www.cafemaud.com/", "Direct all-day competitor", "A morning coffee window, breakfast and brunch, dinner, cocktails and a speakeasy.", "Can fast specialty coffee and a wine-led evening earn visits when guests already have a morning-to-late-night option?"],
      ["MUD / Mudspot", "https://www.mudnyc.com/pages/mudspot", "Direct all-day competitor", "An established neighbourhood coffee brand with all-day brunch, beer and wine, and garden seating.", "Can Plaisir build a morning routine of its own and give those regulars a reason to return for wine and boards?"],
      ["Marylou", "https://marylou.nyc/", "Direct social-occasion competitor", "A French-inspired café, bistro and speakeasy with lunch from noon, weekend brunch, sharing plates, wine and cocktails.", "Can early coffee lead to evening visits, and will a glass and a board suit guests who want a shorter visit?"],
    ],
  },
  {
    id: "competitor-benchmarks",
    number: 20,
    title: "Coffee and wine specialists.",
    introduction: "The East Village also has specialists that set the bar for coffee quality, wine discovery and a glass with food.",
    venues: [
      ["La Cabra", "https://us.lacabra.com/pages/east-village", "Morning benchmark", "Specialty coffee, a bakery and a design identity rooted in Aarhus.", "Can coffee quality, queue speed and the value of a coffee-and-pastry pairing earn repeat morning visits?"],
      ["Ruffian", "https://ruffiannyc.com/", "Wine discovery benchmark", "A deep Eastern European natural-wine list, seasonal food and guided pairings.", "Can staff help a guest find a glass they’ll enjoy in a short conversation and give them a reason to return?"],
      ["DiVin", "https://www.divinwinebar.com/", "Wine and small plates competitor", "A French-focused cellar and tapas on Second Avenue.", "Will by-the-glass guidance, shareable boards and familiarity from daytime visits bring guests back after work?"],
    ],
  },
] as const;

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
const yearTwo = base.years[1];
const breakEvenVisits = (yearTwo.breakEven / yearTwo.spend / 360).toFixed(1);
const eveningShare = Math.round(DAYPARTS[2].visits * DAYPARTS[2].spend / sales * 100);
const downside = FORECASTS.Downside;

export default function SeedPage() {
  return (
    <main id="seed-deck" className={s.deck}>
      <DeckNavigation />
      <div className={s.track} data-seed-track>
        <Slide id="cover" number={1} chapter="Seed presentation" tone="photo" image={{ src: "/brand/table.webp" }}>
          <div className={s.hero}>
            <p className={s.kicker}>Plaisir · Seed presentation</p>
            <Title cover>{"Coffee by day,\nwine by night."}</Title>
            <p className={s.lead}>A neighbourhood coffee bar by day and wine bar by night, starting with a proposed New York City flagship.</p>
            <a className={s.textLink} href="#guests">Start the pitch <span aria-hidden="true">↓</span></a>
          </div>
          <span className={s.bottle} aria-hidden="true" />
        </Slide>

        <Slide id="guests" number={2} chapter="Customer opportunity" tone="gold">
          <div className={s.editorial}>
            <div><Title>Two reasons to become a regular.</Title><p className={s.lead}>Plaisir is designed for people who live or work within walking distance of the flagship.</p></div>
            <div><Notes items={[
              ["Morning coffee", "Nearby workers and residents looking for a reliable espresso and pastry, with a quick takeaway option."],
              ["Evening wine", "After-work guests and local wine drinkers looking for a relaxed table, guided choices and food to share."],
            ]}/><p className={s.aside}>Afternoon coffee and light lunch give regulars another reason to return.</p></div>
          </div>
        </Slide>

        <Slide id="concept" number={3} chapter="The Plaisir experience">
          <div className={s.split}>
            <div className={s.copy}>
              <Title>One room, from coffee to wine.</Title>
              <p className={s.lead}>A quick morning coffee, a light lunch, then wine by the glass, guided flights and boards to share.</p>
              <a className={s.textLink} href="#app">Explore the app prototype <i className={s.arrow} aria-hidden="true" /></a>
            </div>
            <Scene src="/brand/sharing-table.webp" alt="Wine, cheese and charcuterie on a table" />
          </div>
        </Slide>

        <Slide id="flagship" number={4} chapter="Market opportunity" tone="photo"
          image={{ src: "/brand/flagship-front.jpg", alt: "Illustrative Plaisir storefront concept" }}>
          <div className={s.hero}>
            <p className={s.kicker}>Illustrative storefront · Proposed neighbourhood</p>
            <Title>Why the East Village?</Title>
            <p className={s.lead}>The neighbourhood combines walkable commercial streets with a dining and nightlife draw.</p>
            <p className={s.aside}>The model assumes {visits} paid visits per day at established trade. To test that assumption, estimate visits from foot traffic and observed conversion by daypart, then check spend and venue capacity at each candidate site.</p>
            <a className={s.textLink} href="https://www.nyc.gov/assets/sbs/downloads/pdf/neighborhoods/avenyc-cdna-eastvillage.pdf" target="_blank" rel="noreferrer">NYC neighbourhood assessment <i className={s.arrow} aria-hidden="true" /></a>
          </div>
        </Slide>

        <Slide id="competition" number={5} chapter="Competition" tone="gold">
          <div className={s.editorial}>
            <div><Title>Where Plaisir fits.</Title>
              <p className={s.lead}>The proposition to test is whether fast morning service and approachable evening wine can earn repeat visits from the same neighbourhood.</p>
            </div>
            <dl className={s.notes}>
              <div><dt><a href="https://us.lacabra.com/pages/east-village" target="_blank" rel="noreferrer">La Cabra</a></dt><dd>Specialty coffee and bakery. A benchmark for the morning visit.</dd></div>
              <div><dt><a href="https://ruffiannyc.com/" target="_blank" rel="noreferrer">Ruffian</a></dt><dd>Natural wine, seasonal dishes and guided pairings. An evening alternative.</dd></div>
              <div><dt><a href="https://www.cafemaud.com/east-village" target="_blank" rel="noreferrer">Café Maud</a></dt><dd>Breakfast through late-night cocktails. A direct all-day comparison.</dd></div>
            </dl>
          </div>
        </Slide>

        <Slide id="demand" number={6} chapter="Progress and validation">
          <div className={s.editorial}>
            <div><Title>Test demand before a lease.</Title><p className={s.lead}>The brand, service plan and interactive app prototype are in place. The flagship is pre-launch.</p></div>
            <Notes items={[
              ["Paid coffee pop-ups and wine tastings", "Record paid visits and spend per guest by daypart."],
              ["Neighbourhood partnerships", "Test collaborations and track how guests find Plaisir."],
              ["Repeat visits", "Measure return rates and the cost of rewards during pilots."],
            ]}/>
          </div>
        </Slide>

        <Slide id="business" number={7} chapter="Business model" tone="gold">
          <div className={s.editorial}>
            <div><Title>How one site earns.</Title>
              <p className={s.lead}>Coffee and breakfast bring morning traffic. Wine and sharing food account for {eveningShare}% of modeled daily sales.</p>
              <a className={s.textLink} href="#economics">See the three-year forecast <i className={s.arrow} aria-hidden="true" /></a>
            </div>
            <div>
              <Figures columns={["Base case", "USD"]} rows={[
                [`Daily sales at established trade (${visits} visits × $${(sales / visits).toFixed(2)})`, usd(sales)],
                ["Year 1 sales including the opening ramp", millions(base.years[0].sales, 3)],
                ["Annual operating break-even at Year 1 costs", millions(base.years[0].breakEven, 3)],
                ["Year 1 free cash flow", thousands(base.years[0].freeCashFlow)],
              ]}/>
              <p className={s.aside}>Free cash flow stays negative in all three base-case years. Validate sales, staffing and occupancy costs against the break-even threshold before committing to a lease.</p>
            </div>
          </div>
        </Slide>

        <Slide id="team" number={8} chapter="The team">
          <div className={s.editorial}>
            <div><Title>The team behind the flagship.</Title><p className={s.lead}>Four operating roles cover the concept, finance, wine and service.</p></div>
            <Notes items={[
              ["Kevin Murph · Founder & CEO", "Concept, culture and strategy"],
              ["Oliwier Papadopoulos · Partner & CFO", "Budget, cash flow and reporting"],
              ["Jose Sidoa · Partner & CWO", "Wine buying and service standards"],
              ["Mohammed Diomande · Partner & COO", "Staffing, training and operations"],
            ]}/>
          </div>
        </Slide>

        <Slide id="milestones" number={9} chapter="Flagship milestones">
          <div className={s.split}>
            <div className={s.copy}><Title>What the flagship must prove.</Title>
              <Notes items={[
                ["Before signing", "Validate paid demand and spend. Confirm site costs, approvals and the staffing plan."],
                ["At opening", "Complete the build-out, train the team and track service, sales and cash against the budget."],
                ["Before a second lease", "Require evidence of repeat demand, positive cash flow and an operating playbook the team can repeat."],
              ]}/>
            </div>
            <Scene src="/brand/good-company.jpg" alt="Guests sharing a table outside a wine bar" />
          </div>
        </Slide>

        <Slide id="funding" number={10} chapter="Seed funding" tone="gold">
          <div className={s.editorial}>
            <div><Title>Capital for the first location.</Title><p className={s.amount}>{millions(FUNDING, 2)}</p><p className={s.aside}>Modeled funding for the flagship.</p></div>
            <div><Figures columns={["Modeled use", "USD"]} rows={[
              ["Build-out, equipment and contingency", thousands(base.initialCapex)],
              ["Other pre-opening uses", thousands(base.openingUses - base.initialCapex)],
              ["Cash available at opening", thousands(base.openingCash)],
              ["Total modeled funding", millions(FUNDING, 2)],
            ]}/>
            <p className={s.aside}>Capital would fund build-out, opening and early operations. The raise amount and terms are subject to site and budget validation.</p></div>
          </div>
        </Slide>

        <Slide id="overview" number={11} chapter="Overview" tone="gold">
          <div className={s.editorial}>
            <div><Title>Presentation index.</Title><p className={s.lead}>Jump to a section of the pitch or explore the supporting material.</p></div>
            <nav aria-label="Presentation chapters" className={s.chapters}>
              {contents.map(([id, title, detail], index) => (
                <a key={id} href={`#${id}`}><span>{title}<small>{detail}</small></span><span aria-hidden="true">0{index + 1} <i className={s.arrow} /></span></a>
              ))}
            </nav>
          </div>
        </Slide>

        <Slide id="app" number={12} chapter="Appendix · The Plaisir app">
          <AppConcept>
            <Title>The Plaisir app.</Title>
            <p className={s.lead}>Guests can explore the menu, track rewards and send gifts. Staff have a workspace for shifts, training and daily operations.</p>
          </AppConcept>
        </Slide>

        <Slide id="menu" number={13} chapter="Appendix · The menu">
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

        <Slide id="service" number={14} chapter="Appendix · Operations" tone="gold">
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

        <Slide id="sales" number={15} chapter="Appendix · Sales assumptions" tone="gold">
          <div className={s.data}><Title>Sales by time of day.</Title>
            <p className={s.lead}>Base case assumptions after the opening ramp, at starting prices.</p>
            <Figures columns={["Daypart", "Visits per day", "Avg. spend", "Daily net sales"]} rows={[
              ...DAYPARTS.map(part => [part.name, String(part.visits), usd(part.spend), usd(part.visits * part.spend)]),
              ["Total", String(visits), "$" + (sales / visits).toFixed(2) + " blended", usd(sales)],
            ]}/>
            <p className={s.aside}>Evening wine and food account for {eveningShare}% of modeled daily sales.</p>
          </div>
        </Slide>

        <Slide id="economics" number={16} chapter="Appendix · Flagship economics">
          <div className={s.data}><Title>Flagship economics.</Title>
            <p className={s.lead}>Three-year base case, USD. Trading years begin at opening.</p>
            <Figures columns={["Metric", "Year 1", "Year 2", "Year 3"]} rows={[
              ["Net sales", ...base.years.map(year => millions(year.sales, 3))],
              ["Gross margin", ...base.years.map(year => (year.grossMargin * 100).toFixed(1) + "%")],
              ["EBITDA", ...base.years.map(year => thousands(year.ebitda))],
              ["Free cash flow", ...base.years.map(year => thousands(year.freeCashFlow))],
            ]}/>
            <p className={s.aside}>Downside assumptions. {CASE_NOTES.Downside} At the modeled funding level, cash runs out in trading month {FORECASTS.Downside.cashShortfall}.</p>
            <a className={s.textLink} href="#funding">Back to the funding slide <i className={s.arrow} aria-hidden="true" /></a>
          </div>
        </Slide>

        <Slide id="swot" number={17} chapter="Appendix · SWOT analysis">
          <div className={s.data}>
            <Title>SWOT analysis.</Title>
            <p className={s.analysisIntro}>The flagship has to prove that two repeat occasions work at the same address.</p>
            <dl className={s.swotMatrix}>
              <div>
                <dt><span aria-hidden="true">S</span>Strengths</dt>
                <dd><strong>Two reasons to return.</strong> Fast specialty coffee and breakfast give commuters a weekday ritual. Guided wine by the glass and shareable boards give neighbours a reason to return after work. The workflow and training cover the shift from quick counter service to personal evening service. An assembly-led menu limits kitchen complexity.</dd>
              </div>
              <div>
                <dt><span aria-hidden="true">W</span>Weaknesses</dt>
                <dd><strong>{visits} vs {breakEvenVisits} paid visits/day.</strong> The first is the established base case. The second is Year 2 EBITDA break-even at the modelled spend, mix and staffing. Free cash flow stays negative in all three base-case years. Site-specific demand is untested, and 40 seats is a design target.</dd>
              </div>
              <div>
                <dt><span aria-hidden="true">O</span>Opportunities</dt>
                <dd><strong>Turn coffee regulars into wine regulars.</strong> Coffee-and-pastry pairings can build morning frequency. Staff recommendations, tastings and neighbourhood partnerships can bring guests back in the evening. Loyalty can track how often they return across dayparts.</dd>
              </div>
              <div>
                <dt><span aria-hidden="true">T</span>Threats</dt>
                <dd><strong>{eveningShare}% of modelled sales come from afternoon and evening wine and food.</strong> East Village cafés and bars already compete for coffee, all-day social visits and evening wine. Lower traffic and higher opening costs put the cash reserve at risk.</dd>
              </div>
            </dl>
          </div>
        </Slide>

        <Slide id="swot-validation" number={18} chapter="Appendix · SWOT and validation" tone="gold">
          <div className={s.data}>
            <Title>What to prove before a lease.</Title>
            <p className={s.analysisIntro}>Paid visits per day at established trade, with net spend per visit at opening prices. Wine and food includes afternoon and evening service.</p>
            <dl className={s.daypartTargets}>
              {DAYPARTS.map(({ name, visits, spend }) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd><strong>{visits}</strong> visits at <strong>{usd(spend)}</strong></dd>
                </div>
              ))}
            </dl>
            <div className={s.validationGrid}>
              <div>
                <h3>Measure demand and service</h3>
                <p>Count traffic at candidate addresses. Use paid pop-ups to test purchase volumes, actual checks, morning service speed, evening labour needs and how many guests return across dayparts.</p>
              </div>
              <div>
                <h3>Stress-test the cash reserve</h3>
                <p>With 20% fewer visits, 20% higher opening capex and staffing held constant, the forecast falls below its three-month reserve in <strong>month {downside.reserveBreach}</strong> and cash turns negative in <strong>month {downside.cashShortfall}</strong> at {millions(FUNDING, 2)} of modelled funding.</p>
              </div>
            </div>
            <p className={s.analysisSource}>Plaisir Investor Forecast, pp. 2 and 5. Flagship sales exclude membership, private events, catering, retail wine, franchising and expansion.</p>
          </div>
        </Slide>

        {competitors.map(({ id, number, title, introduction, venues }) => (
          <Slide key={id} id={id} number={number} chapter="Appendix · East Village competition" tone={number === 19 ? "gold" : "green"}>
            <div className={s.comparison}>
              <Title>{title}</Title>
              <p className={s.comparisonIntro}>{introduction}</p>
              <div className={s.comparisonLabels} aria-hidden="true">
                <span>Venue</span><span>What guests get</span><span>What Plaisir has to prove</span>
              </div>
              <div className={s.comparisonRows}>
                {venues.map(([name, url, role, offering, hypothesis]) => (
                  <section className={s.comparisonRow} key={name}>
                    <div>
                      <h3><a href={url} target="_blank" rel="noreferrer">{name}<i className={s.arrow} aria-hidden="true" /></a></h3>
                      <p className={s.comparisonRole}>{role}</p>
                    </div>
                    <p>{offering}</p>
                    <p><span className={s.comparisonPrompt}>What Plaisir has to prove</span>{hypothesis}</p>
                  </section>
                ))}
              </div>
              {number === 20 && <p className={s.comparisonSource}>Plaisir’s opportunity is to earn both the morning coffee and the evening wine visit from the same regular. The Plaisir Bible’s wider Manhattan comparisons provide context. Venue links document the local offerings.</p>}
            </div>
          </Slide>
        ))}
      </div>
    </main>
  );
}
