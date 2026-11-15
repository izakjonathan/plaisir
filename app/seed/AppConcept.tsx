"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./app-concept.module.css";

const navigation = [
  { id: "home", label: "Home", icon: "m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" },
  { id: "menu", label: "Menu", icon: "M4 4v6a2 2 0 0 0 4 0V4M6 4v17M16 4c-2 2-3 5-3 8h5M18 4v17" },
  { id: "loyalty", label: "Pass", icon: "M4 6h16v12H4zM4 10h16M7 14h4" },
  { id: "scan", label: "Scan", icon: "M3 8V4h4m10 0h4v4m0 8v4h-4m-10 0H3v-4m5-4h8" },
] as const;

const screens = {
  home: { label: "Home", detail: "A coffee run in the morning, a glass of wine after work." },
  menu: { label: "Menu", detail: "Browse by daypart, then head to pickup or explore the wine list." },
  pickup: { label: "Pickup", detail: "Try building a coffee order and choosing a pickup window." },
  table: { label: "Table", detail: "Preview how guests could order another glass from their table." },
  guide: { label: "Wine guide", detail: "Try a short taste-based guide to wines by the glass." },
  loyalty: { label: "Pass", detail: "A single Pass for coffee and wine visits, with rewards and membership in one place." },
  scan: { label: "Scan", detail: "A preview of presenting the Pass at the counter." },
  gift: { label: "Gifting", detail: "Choose an amount for a digital Plaisir gift." },
  subscriptions: { label: "Membership", detail: "See example coffee and wine benefits and a stored-bottle concept." },
  staff: { label: "Staff", detail: "A staff workspace for shifts, training and daily checks." },
} as const;

type ScreenId = keyof typeof screens;
type Choose = (screen: ScreenId) => void;

const guestScreens: ScreenId[] = ["home", "menu", "pickup", "table", "guide", "loyalty", "scan", "gift", "subscriptions"];

const menus = {
  Coffee: [["Flat white", "Espresso and steamed milk"], ["Filter coffee", "Brewed coffee, ready at the counter"], ["Butter croissant", "A flaky morning pastry"]],
  Food: [["Light lunch", "A changing selection of small plates"], ["Cheese board", "A selection to share"], ["Charcuterie", "Cured meats and accompaniments"]],
  Wine: [["By the glass", "A rotating selection"], ["Guided flight", "Three small pours to compare"], ["Sharing boards", "Cheese and charcuterie pairings"]],
} as const;

function Icon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

function Action({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className={styles.appAction} type="button" onClick={onClick}>{children}<span aria-hidden="true">↗</span></button>;
}

function Choices<T extends string>({ label, options, value, onChange }: {
  label: string; options: readonly T[]; value: T; onChange: (value: T) => void;
}) {
  return <div className={styles.appChoices} role="group" aria-label={label}>
    {options.map(option => <button type="button" key={option} aria-pressed={option === value} onClick={() => onChange(option)}>{option}</button>)}
  </div>;
}

function Rows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return <dl className={styles.appRows}>{rows.map(([label, copy]) => <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>)}</dl>;
}

function ScreenPreview({ id, choose }: { id: ScreenId; choose: Choose }) {
  const [category, setCategory] = useState<keyof typeof menus>("Coffee");
  const [drink, setDrink] = useState("Flat white");
  const [time, setTime] = useState("8:25");
  const [taste, setTaste] = useState("Bright");
  const [gift, setGift] = useState("$25");
  const [plan, setPlan] = useState("Wine");
  const [review, setReview] = useState(false);

  switch (id) {
    case "home":
      return <div className={styles.appHero}>
        <p className={styles.appEyebrow}>East Village, New York</p>
        <h3>A little everyday plaisir.</h3>
        <p>Coffee by day. Wine by night.</p>
        <Action onClick={() => choose("pickup")}>Order coffee</Action>
        <Action onClick={() => choose("guide")}>Find a wine</Action>
      </div>;
    case "menu":
      return <>
        <h3>On the menu.</h3>
        <Choices label="Menu category" options={["Coffee", "Food", "Wine"]} value={category} onChange={setCategory} />
        <Rows rows={menus[category]} />
        <Action onClick={() => choose(category === "Wine" ? "guide" : "pickup")}>{category === "Wine" ? "Find a wine" : "Order for pickup"}</Action>
      </>;
    case "pickup":
      return <>
        <p className={styles.appEyebrow}>East Village pickup</p><h3>On your way.</h3>
        <Choices label="Coffee" options={["Flat white", "Filter"]} value={drink} onChange={value => { setDrink(value); setReview(false); }} />
        <p>Choose a pickup time</p>
        <Choices label="Pickup time" options={["8:25", "8:35", "8:45"]} value={time} onChange={value => { setTime(value); setReview(false); }} />
        <Action onClick={() => setReview(true)}>Review pickup</Action>
        {review && <p className={styles.appFeedback} role="status">{drink} · {time} AM · Demo order</p>}
      </>;
    case "table":
      return <>
        <p className={styles.appEyebrow}>Table 04</p><h3>Another glass?</h3>
        <Rows rows={[["House red", "A glass to go with the cheese board"], ["Ask the team", "We’ll help you find something you like"]]} />
        <Action onClick={() => setReview(true)}>Preview order</Action>
        {review && <p className={styles.appFeedback} role="status">House red · One glass · Demo order</p>}
      </>;
    case "guide":
      return <>
        <h3>What do you like?</h3>
        <Choices label="Wine taste" options={["Bright", "Soft", "Bold"]} value={taste} onChange={setTaste} />
        <Rows rows={taste === "Bright" ? [["A crisp white", "Fresh acidity. Try it with a soft cheese."]] : taste === "Soft" ? [["A light red", "Juicy and easy-drinking. Try it with charcuterie."]] : [["A fuller red", "Rich and structured. Try it with an aged cheese."]]} />
        <Action onClick={() => choose("table")}>See the table preview</Action>
      </>;
    case "loyalty":
      return <>
        <h3>Plaisir Pass.</h3>
        <div className={styles.appPass}><span className={styles.appBottle} aria-hidden="true" /><div><span className={styles.appEyebrow}>Example balance</span><strong>4 rewards</strong><span>Three visits to the next reward</span></div></div>
        <Action onClick={() => choose("scan")}>Open your Pass</Action>
        <Action onClick={() => choose("subscriptions")}>Explore membership</Action>
        <Action onClick={() => choose("gift")}>Send a gift</Action>
      </>;
    case "scan":
      return <>
        <h3>At the counter.</h3>
        <div className={styles.appScan}><span className={styles.appBottle} aria-hidden="true" /></div>
        <p>Pass preview. A working code would appear here.</p>
        <Action onClick={() => choose("loyalty")}>Back to Pass</Action>
      </>;
    case "gift":
      return <>
        <h3>A little something.</h3>
        <div className={styles.appPass}><span className={styles.appBottle} aria-hidden="true" /><div><span className={styles.appEyebrow}>Digital gift</span><strong>{gift}</strong></div></div>
        <Choices label="Gift amount" options={["$25", "$50", "$75"]} value={gift} onChange={value => { setGift(value); setReview(false); }} />
        <Action onClick={() => setReview(true)}>Preview gift</Action>
        {review && <p className={styles.appFeedback} role="status">{gift} Plaisir gift · Preview</p>}
      </>;
    case "subscriptions":
      return <>
        <h3>Make it a ritual.</h3>
        <Choices label="Membership type" options={["Wine", "Coffee"]} value={plan} onChange={setPlan} />
        <Rows rows={plan === "Wine" ? [["Weekly wine plan", "One glass remaining this week in this example"], ["1er Cru", "A potential stored-bottle programme"]] : [["Coffee plan", "An example subscription for your daily coffee"], ["Pickup", "Use it when ordering ahead"]]} />
        <Action onClick={() => choose("loyalty")}>Back to Pass</Action>
      </>;
    case "staff":
      return <>
        <p className={styles.appEyebrow}>Plaisir Family</p><h3>On shift.</h3>
        <Rows rows={[["Today’s shift", "Morning counter · 7 AM–12 PM"], ["Training Academy", "Espresso workflow and guided wine service"], ["Daily checks", "Stock, cleaning and coffee and wine waste"], ["Weekly review", "Discuss service times and waste with the manager"]]} />
      </>;
  }
}

export default function AppConcept({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ScreenId>("home");
  const viewport = useRef<HTMLDivElement>(null);
  const current = screens[selected];
  const choose: Choose = id => {
    if (id === selected) return;
    viewport.current?.scrollTo({ top: 0, behavior: "instant" });
    setSelected(id);
  };
  const activeTab = selected === "pickup" || selected === "table" || selected === "guide" ? "menu"
    : selected === "subscriptions" || selected === "gift" ? "loyalty" : selected;

  const picker = (id: ScreenId) => (
    <button key={id} type="button" aria-pressed={selected === id} aria-controls="app-concept-screen" onClick={() => choose(id)}>{screens[id].label}</button>
  );

  return <div className={styles.appShowcase}>
    <div className={styles.appIntro}>
      {children}
      <div className={styles.appPicker} role="group" aria-label="Guest app screens">{guestScreens.map(picker)}</div>
      <div className={styles.appPicker} role="group" aria-label="Staff app screens">{picker("staff")}</div>
      <p className={styles.appDetail} aria-live="polite">{current.detail}</p>
    </div>
    <div className={styles.appStage}>
      <div className={styles.appDevice} role="group" aria-label="iPhone 18 Pro Max app prototype">
        <div className={styles.appStatus} aria-hidden="true"><span>9:41</span><i /><span className={styles.appBattery} /></div>
        <div className={styles.appTop}><span className={styles.appMark} role="img" aria-label="Plaisir" /><span className={styles.appEyebrow}>Prototype</span></div>
        <div ref={viewport} id="app-concept-screen" className={styles.appScreen} role="region" aria-label={current.label + " screen"} tabIndex={0}>
          <div key={selected} className={styles.appView} data-screen={selected}>
            <ScreenPreview id={selected} choose={choose} />
          </div>
        </div>
        {selected !== "staff" && <nav className={styles.appDock} aria-label="App preview navigation">
          {navigation.map(screen => <button key={screen.id} type="button" aria-pressed={activeTab === screen.id} onClick={() => choose(screen.id)}><Icon path={screen.icon} />{screen.label}</button>)}
        </nav>}
        <span className={styles.appHomeBar} aria-hidden="true" />
      </div>
    </div>
  </div>;
}
