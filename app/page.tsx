import Image from "next/image";
import Link from "next/link";
export default function Home() {
    return (<main id="main" className="experience">
      <section className="scene hero" aria-labelledby="home-title">
        <Image className="scene-photo" src="/brand/table.webp" width="1536" height="1024" alt="Wine glasses and a Plaisir menu in warm evening light" fetchPriority="high" loading="eager" sizes="100vw"/>
        <div className="scene-shade"/>
        <div className="scene-content">
          <h1 id="home-title">
            A little
            <br />
            everyday
            <br />
            <em>plaisir.</em>
          </h1>
          <a className="pill" href="#welcome">
            Discover the feeling
          </a>
        </div>
      </section>
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
          <Image src="/brand/wine-pouring.jpg" width="1200" height="1600" alt="Wine being poured at a tiled bar counter" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
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
        <Image className="scene-photo" src="/brand/wine-conversation.jpg" width="1200" height="1500" alt="Friends sharing glasses of wine" loading="lazy" sizes="100vw"/>
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
          <Image src="/brand/neighbourhood-evening.jpg" width="1200" height="1600" alt="Friends gathered around a table outside a neighbourhood bar" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/>
        </figure>
      </section>
      <section className="photo-story" aria-label="Wine and everyday rituals">
        <figure><Image src="/brand/wine-service.jpg" width="1200" height="1578" alt="A server carrying glasses of red wine" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/></figure>
        <figure><Image src="/brand/wine-discovery.jpg" width="736" height="920" alt="A relaxed moment pouring a glass of wine" loading="lazy" sizes="(max-width: 600px) 100vw, 50vw"/></figure>
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
        <Image className="scene-photo" src="/brand/flagship-front.jpg" width="1636" height="1083" alt="Architectural concept for a Plaisir storefront; not confirmed premises" loading="lazy" sizes="100vw"/>
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
