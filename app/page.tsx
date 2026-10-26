import Link from "next/link";

export default function Home() {
  return (
    <main id="main" className="experience">
      <section className="scene hero" aria-labelledby="home-title">
        <img
          className="scene-photo"
          src="/brand/table.webp"
          width="1536"
          height="1024"
          alt="Wine glasses and a Plaisir menu in warm evening light"
          fetchPriority="high"
        />
        <div className="scene-shade" />
        <div className="scene-content">
          <p className="eyebrow">Coffee & wine. Good company.</p>
          <h1 id="home-title">
            A little
            <br />
            everyday
            <br />
            <em>plaisir.</em>
          </h1>
          <a className="pill" href="#welcome">
            Discover the feeling <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="scene-bottom">
          <span>From the first coffee to the last glass.</span>
          <span>New York · Concept in the making</span>
        </div>
      </section>
      <section id="welcome" className="manifesto gold-section">
        <p className="eyebrow" data-reveal>
          A place to feel at home
        </p>
        <h2 data-reveal>
          Not intimidating.
          <br />
          Never boring.
        </h2>
        <div className="manifesto-bottom" data-reveal>
          <span className="tiny-mark" aria-hidden="true">
            ✳
          </span>
          <p>
            French café influences. New York personality. A warm room shaped by
            Danish design. Come for something good. Stay for the feeling.
          </p>
          <a className="pill" href="#coffee">
            Meet your new ritual <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section id="coffee" className="split-scene">
        <figure className="split-photo">
          <img
            src="/brand/morning-service.webp"
            width="1024"
            height="1536"
            alt="Coffee served at the Plaisir counter, concept image"
            loading="lazy"
          />
        </figure>
        <div className="split-copy">
          <p className="eyebrow" data-reveal>
            Morning, made better
          </p>
          <h2 data-reveal>
            Your day.
            <br />A little
            <br />
            slower.
          </h2>
          <p data-reveal>
            Good coffee. A warm pastry. A familiar face. Take a moment at the
            counter, settle in, or carry a little Plaisir into your day.
          </p>
          <a className="pill" href="#wine">
            Stay for a glass <span aria-hidden="true">↓</span>
          </a>
          <span className="section-folio">01 / Coffee & pastries</span>
        </div>
      </section>
      <section
        id="wine"
        className="scene wine-scene"
        aria-labelledby="wine-title"
      >
        <img
          className="scene-photo"
          src="/brand/evening-social.webp"
          width="1024"
          height="1536"
          alt="Friends gathering over wine in a warmly lit bar, concept image"
          loading="lazy"
        />
        <div className="scene-shade" />
        <div className="scene-content">
          <p className="eyebrow">No expertise required</p>
          <h2 id="wine-title" data-reveal>
            One glass.
            <br />
            No hurry.
          </h2>
          <p data-reveal>
            “What do you usually enjoy?”
            <br />A simple conversation. A few good suggestions. Your next
            favourite, by the glass or bottle.
          </p>
          <a className="pill" href="#table">
            Something to share <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="scene-bottom">
          <span>02 / Wine & conversation</span>
          <span>Atmosphere over wine.</span>
        </div>
      </section>
      <section id="table" className="split-scene food-scene gold-section">
        <div className="split-copy">
          <p className="eyebrow" data-reveal>
            No occasion needed
          </p>
          <h2 data-reveal>
            Good things.
            <br />
            In the middle
            <br />
            of the table.
          </h2>
          <p data-reveal>
            Boards, small bites and light food. A little of this, a little of
            that. Made to go with your glass, and even better with your company.
          </p>
          <a className="pill" href="#neighbourhood">
            Find our first chapter <span aria-hidden="true">↓</span>
          </a>
          <span className="section-folio">03 / Food & good company</span>
        </div>
        <figure className="split-photo">
          <img
            src="/brand/sharing-table.webp"
            width="1400"
            height="933"
            alt="A sharing board, bread and wine at a Plaisir table, concept image"
            loading="lazy"
          />
        </figure>
      </section>
      <section className="brand-world">
        <div className="world-heading">
          <p className="eyebrow">The Plaisir feeling</p>
          <h2 data-reveal>
            Familiar.
            <br />
            In every detail.
          </h2>
          <p>
            From your morning cup to the table you return to. Considered
            details, made for everyday life.
          </p>
        </div>
        <div className="world-images">
          <figure>
            <img
              src="/brand/takeaway.webp"
              width="1536"
              height="1024"
              alt="Plaisir cups, pastry bags and takeaway packaging concepts"
              loading="lazy"
            />
            <figcaption>Out into the neighbourhood.</figcaption>
          </figure>
          <figure>
            <img
              src="/brand/merchandise.webp"
              width="1536"
              height="1024"
              alt="Plaisir cap, sweatshirt and canvas bag concepts"
              loading="lazy"
            />
            <figcaption>A little Plaisir, wherever you go.</figcaption>
          </figure>
        </div>
      </section>
      <section id="neighbourhood" className="scene visit-scene">
        <img
          className="scene-photo"
          src="/brand/facade.webp"
          width="1536"
          height="1024"
          alt="Architectural concept for a Plaisir storefront; not confirmed premises"
          loading="lazy"
        />
        <div className="scene-shade" />
        <div className="scene-content">
          <p className="eyebrow">Our first chapter</p>
          <h2 data-reveal>
            Your new
            <br />
            usual.
          </h2>
          <p>
            Imagined for the East Village.
            <br />
            We’re not open yet. Our address, hours and final menu will follow.
          </p>
          <Link className="pill" href="/investors">
            The story behind Plaisir <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="scene-bottom">
          <span>New York, in the making.</span>
          <span>Architectural concept · No confirmed site</span>
        </div>
      </section>
    </main>
  );
}
