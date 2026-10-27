import { Copy, ContentImage, ContentLink } from "../Content";
import type { Metadata } from "next";
import BottleAccent from "../BottleAccent";
import { Note } from "../BrandUI";
export const metadata: Metadata = {
    title: "Plaisir · The story",
    description: "A neighbourhood coffee-and-wine concept. Explore the proposed flagship, operating approach and financial illustration.",
};
const team = [
    ["Kevin Murph", "Founder & CEO", "Concept, culture and strategy"],
    ["Oliwier Papadopoulos", "Partner & CFO", "Budget, cash flow and reporting"],
    ["Jose Sidoa", "Partner & CWO", "Wine buying and service standards"],
    ["Mohammed Diomande", "Partner & COO", "Staffing, training and operations"],
];
export default function Investors() {
    return (<main id="main" data-reveal-page="story">
      <section className="scene investor-hero">
        <ContentImage field="story.page.image1" className="scene-photo" fetchPriority="high" loading="eager" sizes="100vw"/>
        <div className="scene-shade"/>
        <div className="scene-content">
          <h1 data-reveal="story-0"><Copy field="story.page.text2"/></h1>
          <p data-reveal="story-1"><Copy field="story.page.text3"/></p>
          <ContentLink data-reveal="story-2" className="pill" field="story.page.link1"><Copy field="story.page.text4"/></ContentLink>
        </div>
      </section>
      <section id="proposition" className="investor-intro gold-section">
        <div>
          <h2 data-reveal="story-3"><Copy field="story.page.text5"/></h2>
        </div>
        <div>
          <p data-reveal="story-4"><Copy field="story.page.text6"/></p>
          <p data-reveal="story-5"><Copy field="story.page.text7"/></p>
          <dl className="pl-operating-list">
            <div data-reveal="story-6">
              <dt><Copy field="story.page.text8"/></dt>
              <dd><Copy field="story.page.text9"/></dd>
            </div>
            <div data-reveal="story-7">
              <dt><Copy field="story.page.text10"/></dt>
              <dd><Copy field="story.page.text11"/></dd>
            </div>
            <div data-reveal="story-8">
              <dt><Copy field="story.page.text12"/></dt>
              <dd><Copy field="story.page.text13"/></dd>
            </div>
          </dl>
          <Note title="Concept & source notes"><Copy field="story.page.text14"/></Note>
        </div>
      </section>
      <section className="split-scene">
        <figure className="split-photo">
          <ContentImage field="story.page.image15" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
        </figure>
        <div className="split-copy">
          <h2 data-reveal="story-9"><Copy field="story.page.text16"/></h2>
          <p data-reveal="story-10"><Copy field="story.page.text17"/></p>
          <Note title="Premises assumptions to reconcile"><Copy field="story.page.text18"/></Note>
          <ContentLink data-reveal="story-11" className="pill" field="story.page.link2"><Copy field="story.page.text19"/></ContentLink>
        </div>
      </section>
      <section className="investor-people bottle-art-section">
        <BottleAccent variant="edge" />
        <h2 data-reveal="story-12"><Copy field="story.page.text20"/></h2>
        <p data-reveal="story-13"><Copy field="story.page.text21"/></p>
        <div className="pl-team">
          {team.map(([name, role, detail], index) => (<div key={name} data-reveal={`story-person-${index}`}>
              <h3><Copy field={`story.team.${index}.0`}/></h3>
              <span><Copy field={`story.team.${index}.1`}/></span>
              <p><Copy field={`story.team.${index}.2`}/></p>
            </div>))}
        </div>
        <Note title="Leadership notes"><Copy field="story.page.text22"/></Note>
      </section>
      <figure className="company-photo"><ContentImage field="story.page.image23" loading="lazy" sizes="100vw"/></figure>
      <section className="growth-section gold-section">
        <div>
          <h2 data-reveal="story-16"><Copy field="story.page.text24"/></h2>
          <p data-reveal="story-17"><Copy field="story.page.text25"/></p>
        </div>
        <div>
          <ol className="pl-launch">
            <li data-reveal="story-18"><Copy field="story.page.text26"/></li>
            <li data-reveal="story-19"><Copy field="story.page.text27"/></li>
            <li data-reveal="story-20"><Copy field="story.page.text28"/></li>
            <li data-reveal="story-21"><Copy field="story.page.text29"/></li>
          </ol>
          <Note title="Growth assumptions"><Copy field="story.page.text30"/></Note>
        </div>
      </section>
      <section className="model-invitation bottle-art-section">
        <BottleAccent variant="loop" />
        <h2 data-reveal="story-22"><Copy field="story.page.text31"/></h2>
        <p data-reveal="story-23"><Copy field="story.page.text32"/></p>
        <ContentLink data-reveal="story-24" className="pill" field="story.page.link3"><Copy field="story.page.text33"/></ContentLink>
        <p className="pl-small-print"><Copy field="story.page.text34"/></p>
      </section>
    </main>);
}

