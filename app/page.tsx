import Image from "next/image";
import Link from "next/link";
import LandingHero from "./LandingHero";
export default function Home() {
    return (<main id="main" className="experience">
      <LandingHero />
      <section id="welcome" className="manifesto gold-section">
        <h2 data-reveal>
          Not intimidating.
          <br />
          Never boring.
        </h2>
        <div className="manifesto-bottom" data-reveal>
          <p>
            French café influences. New York personality. A warm room shaped by
            Danish design. Come for something good. Stay for the feeling.
          </p>
          <a className="pill" href="#coffee">
            Meet your new ritual
          </a>
        </div>
      </section>
      <section id="coffee" className="split-scene">
        <figure className="split-photo">
          <Image src="/brand/morning-service.webp" width="1024" height="1536" alt="Coffee served at the Plaisir counter, concept image" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
        </figure>
        <div className="split-copy">
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
          <a data-reveal className="pill" href="#wine">
            Stay for a glass
          </a>
        </div>
      </section>
      <section id="wine" className="scene wine-scene" aria-labelledby="wine-title">
        <Image className="scene-photo" src="/brand/evening-social.webp" width="1024" height="1536" alt="Friends gathering over wine in a warmly lit bar, concept image" loading="lazy" sizes="100vw"/>
        <div className="scene-shade"/>
        <div className="scene-content">
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
          <a data-reveal className="pill" href="#table">
            Something to share
          </a>
        </div>
      </section>
      <section id="table" className="split-scene food-scene gold-section">
        <div className="split-copy">
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
          <a data-reveal className="pill" href="#neighbourhood">
            Find our first chapter
          </a>
        </div>
        <figure className="split-photo">
          <Image src="/brand/sharing-table.webp" width="1400" height="933" alt="A sharing board, bread and wine at a Plaisir table, concept image" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
        </figure>
      </section>
      <section className="brand-world">
        <div className="world-heading">
          <h2 data-reveal>
            Familiar.
            <br />
            In every detail.
          </h2>
          <p data-reveal>
            From your morning cup to the table you return to. Considered
            details, made for everyday life.
          </p>
        </div>
        <div className="world-images">
          <figure>
            <Image src="/brand/takeaway.webp" width="1536" height="1024" alt="Plaisir cups, pastry bags and takeaway packaging concepts" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
          </figure>
          <figure>
            <Image src="/brand/merchandise.webp" width="1536" height="1024" alt="Plaisir cap, sweatshirt and canvas bag concepts" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
          </figure>
        </div>
      </section>
      <section id="neighbourhood" className="scene visit-scene">
        <Image className="scene-photo" src="/brand/facade.webp" width="1536" height="1024" alt="Architectural concept for a Plaisir storefront; not confirmed premises" loading="lazy" sizes="100vw"/>
        <div className="scene-shade"/>
        <div className="scene-content">
          <h2 data-reveal>
            Your new
            <br />
            usual.
          </h2>
          <p data-reveal>
            Imagined for the East Village.
            <br />
            We’re not open yet. Our address, hours and final menu will follow.
          </p>
          <Link data-reveal className="pill" href="/investors">
            The story behind Plaisir
          </Link>
        </div>
      </section>
    </main>);
}
