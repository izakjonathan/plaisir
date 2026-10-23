'use client';

import { useState } from 'react';

const tastes = {
  fresh: { name: 'Light & fresh', note: 'Bright acidity, delicate fruit, a refreshing finish.', suggestion: 'Start with a crisp white or a light, lively red.', x: 68, y: 28, label: 'Something lively' },
  dry: { name: 'Crisp & dry', note: 'Clean, mineral and a little more restrained.', suggestion: 'Explore a mineral white or a dry, textured orange wine.', x: 29, y: 27, label: 'Keep it crisp' },
  rich: { name: 'Rich & rounded', note: 'Fuller texture, deeper fruit and a lingering finish.', suggestion: 'Try a rounded white or a generous, full-bodied red.', x: 28, y: 71, label: 'A little more depth' },
  soft: { name: 'Soft & fruity', note: 'Gentle edges, expressive fruit and an easy-going feel.', suggestion: 'Look for a fruit-forward red or a softly aromatic white.', x: 69, y: 70, label: 'Fruit comes first' },
};
type Taste = keyof typeof tastes;

function Bottle({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 170 440" fill="none" aria-hidden="true"><path d="M70 18c-6-3-7-10 5-10 17 0 30 4 28 8-2 4-29 6-33 2Zm4 3 1 83c1 20-24 27-35 47-9 17-6 51-6 70l-4 173c0 29 103 31 105 4l-7-190c-1-24 1-44-11-58-14-17-26-28-25-47l1-81M36 399c15-19 65-22 92-1M49 390c14-8 42-12 64-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [taste, setTaste] = useState<Taste>('fresh');
  const selected = tastes[taste];
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <a href="#" aria-label="Plaisir home" className="brand"><img src="/images/wordmark.png" alt="Plaisir" width="170" height="56" /></a>
      <button className="menu-toggle" aria-expanded={navOpen} aria-controls="navigation" onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'Close −' : 'Explore +'}</button>
      <nav id="navigation" className={navOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        {[['The idea', '#about'], ['Wine compass', '#wine'], ['Little plates', '#food'], ['What’s next', '#visit']].map(([title, href]) => <a key={href} href={href} onClick={() => setNavOpen(false)}>{title}</a>)}
      </nav>
      <span className="header-note">A casual wine bar</span>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grain" />
        <div className="hero-topline"><span>Wine. Food. Good company.</span><span>Simple pleasures, shared.</span></div>
        <div className="hero-center">
          <p className="eyebrow">Make yourself at home</p>
          <h1 id="hero-title"><span className="sr-only">Plaisir — a little everyday pleasure</span><img src="/images/wordmark.png" alt="" width="970" height="320" /></h1>
          <p className="hero-subtitle">A little everyday <em>pleasure.</em></p>
          <a className="text-link" href="#about">Get to know Plaisir <span aria-hidden="true">↗</span></a>
        </div>
        <Bottle className="hero-bottle" />
        <div className="hero-bottom"><span>Good wine. No occasion needed.</span><a href="#about" aria-label="Discover the concept">Scroll a little <span aria-hidden="true">↓</span></a></div>
      </section>

      <section id="about" className="intro section-pad">
        <p className="eyebrow">01 / The idea</p>
        <div className="intro-grid"><h2>Come for a glass.<br />Stay for the <em>feeling.</em></h2><div className="intro-copy"><p>That first sip. Something delicious in the middle of the table. A conversation that runs a little longer.</p><p>Plaisir is a casual wine bar concept built around the pleasure of being together. Thoughtful wine, simple food, and a warm welcome — without making things complicated.</p><a className="text-link dark" href="#wine">Find your kind of wine <span aria-hidden="true">↗</span></a></div></div>
        <div className="values"><span>Uncomplicated wine</span><span>Plates for sharing</span><span>Time well spent</span></div>
      </section>

      <section id="wine" className="wine section-pad" aria-labelledby="wine-title">
        <div className="section-heading"><p className="eyebrow">02 / Follow your taste</p><span className="small-note">A little curiosity goes a long way.</span></div>
        <div className="wine-grid"><div className="wine-copy"><h2 id="wine-title">Less guessing.<br />More <em>discovering.</em></h2><p>You don’t need the right words to find a wine you love. Start with what you like, and let our wine compass point you somewhere new.</p><p className="selector-label" id="taste-label">What are you in the mood for?</p><div className="taste-options" role="group" aria-labelledby="taste-label">{(Object.keys(tastes) as Taste[]).map(key => <button key={key} onClick={() => setTaste(key)} aria-pressed={taste === key}>{tastes[key].name}<span aria-hidden="true">↗</span></button>)}</div></div>
        <div className="compass-panel"><div className="compass" aria-hidden="true"><span className="axis axis-top">dry</span><span className="axis axis-right">light</span><span className="axis axis-bottom">sweet</span><span className="axis axis-left">full</span><div className="ring ring-one"/><div className="ring ring-two"/><div className="ring ring-three"/><div className="cross horizontal"/><div className="cross vertical"/><span className="compass-center">p.</span><span className="compass-point" style={{left:`${selected.x}%`,top:`${selected.y}%`}}><span>✦</span></span></div><div className="wine-result" aria-live="polite" aria-atomic="true"><span className="eyebrow">{selected.label}</span><h3>{selected.name}</h3><p>{selected.note} {selected.suggestion}</p></div><p className="compass-footnote">A guide to flavour, rather than a live wine list.</p></div></div>
      </section>

      <section id="food" className="food section-pad">
        <div className="section-heading"><p className="eyebrow">03 / A little something alongside</p><span className="small-note">Better in the middle of the table.</span></div>
        <div className="food-intro"><h2>A glass in hand.<br /><em>A little to share.</em></h2><p>Good bread, seasonal flavours, cheese and charcuterie. Food that belongs next to a glass of wine, and between friends.</p></div>
        <div className="food-images"><figure className="food-large"><img src="/images/sharing-board.webp" alt="Concept inspiration: a board of cheese, charcuterie and accompaniments" width="477" height="288" loading="lazy"/><figcaption><span>01 — A little of everything</span><span>Made for sharing</span></figcaption></figure><figure className="food-small"><img src="/images/seasonal-plate.webp" alt="Concept inspiration: a colourful seasonal salad" width="355" height="393" loading="lazy"/><figcaption>02 — Something fresh</figcaption></figure></div>
        <p className="image-note">Food imagery from the Plaisir concept moodboard. Final menu to follow.</p>
      </section>

      <section className="atmosphere section-pad" aria-labelledby="atmosphere-title"><div className="atmosphere-image"><img src="/images/interior-study.webp" alt="Interior moodboard: natural textures, soft light and relaxed seating" width="845" height="630" loading="lazy"/><span>From the Plaisir moodboard</span></div><div className="atmosphere-copy"><p className="eyebrow">04 / The feeling</p><h2 id="atmosphere-title">A place to<br /><em>settle in.</em></h2><p>Natural textures. Warm light. A little character. We imagine a space that feels familiar from the moment you walk in.</p><p>Raw, authentic and timeless. Somewhere to slow down, find your corner, and enjoy the company.</p><Bottle className="small-bottle"/></div></section>

      <section id="visit" className="closing section-pad"><p className="eyebrow">Something good is taking shape</p><h2>See you over<br /><em>a glass.</em></h2><p>The Plaisir story is just beginning.<br />Location, opening details and the final menu will follow.</p><a href="#wine" className="outline-link">Explore your taste <span aria-hidden="true">↗</span></a><span className="closing-word">plaisir <i>n.</i> / pleasure</span></section>
    </main>
    <footer><a href="#" aria-label="Back to top"><img src="/images/wordmark.png" alt="Plaisir" width="145" height="48"/></a><span>A casual wine bar concept</span><a href="#">Back to the top ↑</a></footer>
  </>;
}
