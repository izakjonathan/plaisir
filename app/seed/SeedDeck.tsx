"use client";

import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { CASE_NOTES, DAYPARTS, FORECASTS, FUNDING } from "../../lib/investor-forecast";
import { FormattedText, useContent } from "../Content";
import { imageValue, textValue, type ContentDocument } from "../../lib/content-schema";
import { imageOverlayStrength } from "../../lib/image-treatment";
import AppConcept from "./AppConcept";
import DeckNavigation from "./DeckNavigation";
import s from "./seed.module.css";

const contents = [
  "guests",
  "flagship",
  "demand",
  "team",
  "funding",
  "app",
];

const competitors = [{ id: "competitor-analysis", number: 20 }, { id: "competitor-benchmarks", number: 21 }];

function Title({ children, cover = false }: { children: string; cover?: boolean }) {
  const Heading = cover ? "h1" : "h2";
  return (
    <Heading className={cover ? s.coverTitle : s.title} aria-label={children.replace(/\s+/g, " ")}>
      {children.replace(/\r\n?/g, "\n").split(/(\n|[^\S\n]+)/).map((word, index) => (
        <Fragment key={index}>
          {word === "\n" ? <br /> : /^\s+$/.test(word) ? " " : (
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
  image?: string; children: ReactNode;
}) {
  return (
    <section id={id} data-seed-slide={number} data-tone={tone} className={s.slide} tabIndex={-1} aria-label={chapter}>
      {image && (
        <SeedPhoto field={`seed.${id}.${image}`} backdrop preload={number === 1} />
      )}
      <div className={s.slideContent}>{children}</div>
      <div className={s.folio} aria-hidden="true"><span>{chapter}</span><span>{String(number).padStart(2, "0")}</span></div>
    </section>
  );
}

function SeedPhoto({ field, backdrop = false, preload = false }: { field: string; backdrop?: boolean; preload?: boolean }) {
  const content = useContent();
  const image = imageValue(content, field);
  const opacity = imageOverlayStrength(content, image) * (backdrop ? 1 : .68);
  return (
    <div className={backdrop ? s.backdrop : s.scenePhoto} style={{ "--seed-overlay": opacity } as CSSProperties}>
      <Image src={image.src} alt={image.alt} fill sizes={backdrop ? "100vw" : "(min-width: 850px) 48vw, 100vw"} preload={preload} style={{ objectPosition: `${image.x}% ${image.y}%` }} />
    </div>
  );
}

function Notes({ items }: { items: readonly (readonly [string, string])[] }) {
  return <dl className={s.notes}>{items.map(([label, copy], index) => (
    <div key={index}><dt>{label}</dt><dd>{copy}</dd></div>
  ))}</dl>;
}

function Figures({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return <table className={s.figures}>
    <thead><tr>{columns.map((label, index) => <th key={index} scope="col">{label}</th>)}</tr></thead>
    <tbody>{rows.map(([label, ...values], index) => (
      <tr key={index}><th scope="row">{label}</th>{values.map((value, i) => <td key={i}>{value}</td>)}</tr>
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

const forecastTokens: Record<string, string | number | undefined> = {
  visits, breakEvenVisits, eveningShare, funding: millions(FUNDING, 2),
  downsideAssumptions: CASE_NOTES.Downside,
  reserveBreach: downside.reserveBreach, cashShortfall: downside.cashShortfall,
};

function seedText(document: ContentDocument, slide: string, key: string): string {
  return textValue(document, `seed.${slide}.${key}`).replace(/\{(\w+)\}/g, (token, name) =>
    Object.hasOwn(forecastTokens, name) ? String(forecastTokens[name] ?? "—") : token);
}

export default function SeedDeck() {
  const document = useContent();
  const renderSlide = (id: string, render: (copy: (key: string) => string) => ReactNode) =>
    render(key => seedText(document, id, key));
  return (
    <main id="seed-deck" className={s.deck}>
      <DeckNavigation />
      <div className={s.track} data-seed-track>
        {renderSlide("cover", copy => (
          <Slide id="cover" number={1} chapter={copy("chapter")} tone="photo" image="image">
            <div className={s.hero}>
              <p className={s.kicker}>{copy("p.1")}</p>
              <Title cover>{copy("heading")}</Title>
              <p className={s.lead}>{copy("p.2")}</p>
              <a className={s.textLink} href={copy("link.1.url")}>{copy("link.1.label")} <span aria-hidden="true">↓</span></a>
            </div>
            <span className={s.bottle} aria-hidden="true" />
          </Slide>
        ))}

        {renderSlide("guests", copy => (
          <Slide id="guests" number={2} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title><p className={s.lead}>{copy("p.1")}</p></div>
              <div><Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
              ]}/><p className={s.aside}>{copy("p.2")}</p></div>
            </div>
          </Slide>
        ))}

        {renderSlide("concept", copy => (
          <Slide id="concept" number={3} chapter={copy("chapter")}>
            <div className={s.split}>
              <div className={s.copy}>
                <Title>{copy("heading")}</Title>
                <Notes items={[
                  [copy("item.1.heading"), copy("item.1.text")],
                  [copy("item.2.heading"), copy("item.2.text")],
                  [copy("item.3.heading"), copy("item.3.text")],
                ]}/>
                <a className={s.textLink} href={copy("link.1.url")}>{copy("link.1.label")} <i className={s.arrow} aria-hidden="true" /></a>
              </div>
              <SeedPhoto field="seed.concept.image" />
            </div>
          </Slide>
        ))}

        {renderSlide("flagship", copy => (
          <Slide id="flagship" number={4} chapter={copy("chapter")} tone="photo"
          image="image">
            <div className={s.hero}>
              <p className={s.kicker}>{copy("p.1")}</p>
              <Title>{copy("heading")}</Title>
              <p className={s.lead}>{copy("p.2")}</p>
              <p className={s.aside}>{copy("p.3")}</p>
              <a className={s.textLink} href={copy("link.1.url")} target="_blank" rel="noreferrer">{copy("link.1.label")} <i className={s.arrow} aria-hidden="true" /></a>
            </div>
          </Slide>
        ))}

        {renderSlide("competition", copy => (
          <Slide id="competition" number={5} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
              </div>
              <dl className={s.notes}>
                <div><dt><a href={copy("link.1.url")} target="_blank" rel="noreferrer">{copy("link.1.label")}</a></dt><dd>{copy("dd.1")}</dd></div>
                <div><dt><a href={copy("link.2.url")} target="_blank" rel="noreferrer">{copy("link.2.label")}</a></dt><dd>{copy("dd.2")}</dd></div>
                <div><dt><a href={copy("link.3.url")} target="_blank" rel="noreferrer">{copy("link.3.label")}</a></dt><dd>{copy("dd.3")}</dd></div>
              </dl>
            </div>
          </Slide>
        ))}

        {renderSlide("demand", copy => (
          <Slide id="demand" number={6} chapter={copy("chapter")}>
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title><p className={s.lead}>{copy("p.1")}</p></div>
              <Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
                [copy("item.3.heading"), copy("item.3.text")],
              ]}/>
            </div>
          </Slide>
        ))}

        {renderSlide("business", copy => (
          <Slide id="business" number={7} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <a className={s.textLink} href={copy("link.1.url")}>{copy("link.1.label")} <i className={s.arrow} aria-hidden="true" /></a>
              </div>
              <div>
                <Figures columns={[copy("column.1"), copy("column.2")]} rows={[
                  [`Daily sales at established trade (${visits} visits × $${(sales / visits).toFixed(2)})`, usd(sales)],
                  [copy("row.1"), millions(base.years[0].sales, 3)],
                  [copy("row.2"), millions(base.years[0].breakEven, 3)],
                  [copy("row.3"), thousands(base.years[0].freeCashFlow)],
                ]}/>
                <p className={s.aside}>{copy("p.2")}</p>
              </div>
            </div>
          </Slide>
        ))}

        {renderSlide("team", copy => (
          <Slide id="team" number={8} chapter={copy("chapter")}>
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title><p className={s.lead}>{copy("p.1")}</p></div>
              <Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
                [copy("item.3.heading"), copy("item.3.text")],
                [copy("item.4.heading"), copy("item.4.text")],
              ]}/>
            </div>
          </Slide>
        ))}

        {renderSlide("team-model", copy => (
          <Slide id="team-model" number={9} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <p className={s.aside}>{copy("p.2")}</p>
              </div>
              <Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
                [copy("item.3.heading"), copy("item.3.text")],
              ]}/>
            </div>
          </Slide>
        ))}

        {renderSlide("milestones", copy => (
          <Slide id="milestones" number={10} chapter={copy("chapter")}>
            <div className={s.split}>
              <div className={s.copy}><Title>{copy("heading")}</Title>
                <Notes items={[
                  [copy("item.1.heading"), copy("item.1.text")],
                  [copy("item.2.heading"), copy("item.2.text")],
                  [copy("item.3.heading"), copy("item.3.text")],
                ]}/>
                <a className={s.textLink} href={copy("link.1.url")}>{copy("link.1.label")} <i className={s.arrow} aria-hidden="true" /></a>
              </div>
              <SeedPhoto field="seed.milestones.image" />
            </div>
          </Slide>
        ))}

        {renderSlide("funding", copy => (
          <Slide id="funding" number={11} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title><p className={s.amount}>{millions(FUNDING, 2)}</p><p className={s.aside}>{copy("p.1")}</p></div>
              <div><Figures columns={[copy("column.1"), copy("column.2")]} rows={[
                [copy("row.1"), thousands(base.initialCapex)],
                [copy("row.2"), thousands(base.openingUses - base.initialCapex)],
                [copy("row.3"), thousands(base.openingCash)],
                [copy("row.4"), millions(FUNDING, 2)],
              ]}/>
              <p className={s.aside}>{copy("p.2")}</p></div>
            </div>
          </Slide>
        ))}

        {renderSlide("overview", copy => (
          <Slide id="overview" number={12} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title><p className={s.lead}>{copy("p.1")}</p></div>
              <nav aria-label="Presentation chapters" className={s.chapters}>
                {contents.map((id, index) => (
                  <a key={id} href={`#${id}`}><span>{copy(`index.${index + 1}.title`)}<small>{copy(`index.${index + 1}.detail`)}</small></span><span aria-hidden="true">0{index + 1} <i className={s.arrow} /></span></a>
                ))}
              </nav>
            </div>
          </Slide>
        ))}

        {renderSlide("app", copy => (
          <Slide id="app" number={13} chapter={copy("chapter")}>
            <AppConcept>
              <Title>{copy("heading")}</Title>
              <p className={s.lead}>{copy("p.1")}</p>
            </AppConcept>
          </Slide>
        ))}

        {renderSlide("menu", copy => (
          <Slide id="menu" number={14} chapter={copy("chapter")}>
            <div className={s.split}>
              <div className={s.copy}><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <Notes items={[
                  [copy("item.1.heading"), copy("item.1.text")],
                  [copy("item.2.heading"), copy("item.2.text")],
                  [copy("item.3.heading"), copy("item.3.text")],
                ]}/>
              </div>
              <SeedPhoto field="seed.menu.image" />
            </div>
          </Slide>
        ))}

        {renderSlide("service", copy => (
          <Slide id="service" number={15} chapter={copy("chapter")} tone="gold">
            <div className={s.split}>
              <SeedPhoto field="seed.service.image" />
              <div className={s.copy}><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <Notes items={[
                  [copy("item.1.heading"), copy("item.1.text")],
                  [copy("item.2.heading"), copy("item.2.text")],
                  [copy("item.3.heading"), copy("item.3.text")],
                ]}/>
              </div>
            </div>
          </Slide>
        ))}

        {renderSlide("sales", copy => (
          <Slide id="sales" number={16} chapter={copy("chapter")} tone="gold">
            <div className={s.data}><Title>{copy("heading")}</Title>
              <p className={s.lead}>{copy("p.1")}</p>
              <Figures columns={[copy("column.1"), copy("column.2"), copy("column.3"), copy("column.4")]} rows={[
                ...DAYPARTS.map(part => [part.name, String(part.visits), usd(part.spend), usd(part.visits * part.spend)]),
                [copy("row.1"), String(visits), "$" + (sales / visits).toFixed(2) + " blended", usd(sales)],
              ]}/>
              <p className={s.aside}>{copy("p.2")}</p>
            </div>
          </Slide>
        ))}

        {renderSlide("economics", copy => (
          <Slide id="economics" number={17} chapter={copy("chapter")}>
            <div className={s.data}><Title>{copy("heading")}</Title>
              <p className={s.lead}>{copy("p.1")}</p>
              <Figures columns={[copy("column.1"), copy("column.2"), copy("column.3"), copy("column.4")]} rows={[
                [copy("row.1"), ...base.years.map(year => millions(year.sales, 3))],
                [copy("row.2"), ...base.years.map(year => (year.grossMargin * 100).toFixed(1) + "%")],
                [copy("row.3"), ...base.years.map(year => thousands(year.ebitda))],
                [copy("row.4"), ...base.years.map(year => thousands(year.freeCashFlow))],
              ]}/>
              <p className={s.aside}>{copy("p.2")}</p>
              <a className={s.textLink} href={copy("link.1.url")}>{copy("link.1.label")} <i className={s.arrow} aria-hidden="true" /></a>
            </div>
          </Slide>
        ))}

        {renderSlide("swot", copy => (
          <Slide id="swot" number={18} chapter={copy("chapter")}>
            <div className={s.data}>
              <Title>{copy("heading")}</Title>
              <p className={s.analysisIntro}>{copy("p.1")}</p>
              <dl className={s.swotMatrix}>
                <div>
                  <dt><span aria-hidden="true">S</span>{copy("quadrant.1.label")}</dt>
                  <dd><strong>{copy("quadrant.1.lead")}</strong> {copy("quadrant.1.text")}</dd>
                </div>
                <div>
                  <dt><span aria-hidden="true">W</span>{copy("quadrant.2.label")}</dt>
                  <dd><strong>{copy("quadrant.2.lead")}</strong> {copy("quadrant.2.text")}</dd>
                </div>
                <div>
                  <dt><span aria-hidden="true">O</span>{copy("quadrant.3.label")}</dt>
                  <dd><strong>{copy("quadrant.3.lead")}</strong> {copy("quadrant.3.text")}</dd>
                </div>
                <div>
                  <dt><span aria-hidden="true">T</span>{copy("quadrant.4.label")}</dt>
                  <dd><strong>{copy("quadrant.4.lead")}</strong> {copy("quadrant.4.text")}</dd>
                </div>
              </dl>
            </div>
          </Slide>
        ))}

        {renderSlide("swot-validation", copy => (
          <Slide id="swot-validation" number={19} chapter={copy("chapter")} tone="gold">
            <div className={s.data}>
              <Title>{copy("heading")}</Title>
              <p className={s.analysisIntro}>{copy("p.1")}</p>
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
                  <h3>{copy("h3.1")}</h3>
                  <p>{copy("p.2")}</p>
                </div>
                <div>
                  <h3>{copy("h3.2")}</h3>
                  <p><FormattedText value={copy("stress")} /></p>
                </div>
              </div>
              <p className={s.analysisSource}>{copy("p.3")}</p>
            </div>
          </Slide>
        ))}

        {competitors.map(({ id, number }) => renderSlide(id, copy => (
          <Slide key={id} id={id} number={number} chapter={copy("chapter")} tone={id === "competitor-analysis" ? "gold" : "green"}>
            <div className={s.comparison}>
              <Title>{copy("heading")}</Title>
              <p className={s.comparisonIntro}>{copy("intro")}</p>
              <div className={s.comparisonLabels} aria-hidden="true">
                <span>{copy("columns.venue")}</span><span>{copy("columns.offer")}</span><span>{copy("columns.test")}</span>
              </div>
              <div className={s.comparisonRows}>
                {[1, 2, 3].map(venue => (
                  <section className={s.comparisonRow} key={venue}>
                    <div>
                      <h3><a href={copy(`venue.${venue}.url`)} target="_blank" rel="noreferrer">{copy(`venue.${venue}.name`)}<i className={s.arrow} aria-hidden="true" /></a></h3>
                      <p className={s.comparisonRole}>{copy(`venue.${venue}.role`)}</p>
                    </div>
                    <p>{copy(`venue.${venue}.offering`)}</p>
                    <p><span className={s.comparisonPrompt}>{copy("columns.test")}</span>{copy(`venue.${venue}.hypothesis`)}</p>
                  </section>
                ))}
              </div>
              {id === "competitor-benchmarks" && <p className={s.comparisonSource}>{copy("source")}</p>}
            </div>
          </Slide>
        )))}

        {renderSlide("additional-revenue", copy => (
          <Slide id="additional-revenue" number={22} chapter={copy("chapter")} tone="gold">
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <p className={s.aside}>{copy("p.2")}</p>
              </div>
              <Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
                [copy("item.3.heading"), copy("item.3.text")],
              ]}/>
            </div>
          </Slide>
        ))}

        {renderSlide("second-location", copy => (
          <Slide id="second-location" number={23} chapter={copy("chapter")}>
            <div className={s.editorial}>
              <div><Title>{copy("heading")}</Title>
                <p className={s.lead}>{copy("p.1")}</p>
                <p className={s.aside}>{copy("p.2")}</p>
              </div>
              <Notes items={[
                [copy("item.1.heading"), copy("item.1.text")],
                [copy("item.2.heading"), copy("item.2.text")],
                [copy("item.3.heading"), copy("item.3.text")],
              ]}/>
            </div>
          </Slide>
        ))}
      </div>
    </main>
  );
}
