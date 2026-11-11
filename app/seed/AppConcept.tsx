"use client";

import { useState, type ReactNode } from "react";
import styles from "./app-concept.module.css";

const screens = [
  { id: "home", label: "Home", detail: "A welcome and a route into the menu or Pass.", icon: "m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" },
  { id: "menu", label: "Menu", detail: "Explore the menu for pickup, delivery or an outpost.", icon: "M4 4v6a2 2 0 0 0 4 0V4M6 4v17M16 4c-2 2-3 5-3 8h5M18 4v17" },
  { id: "loyalty", label: "Loyalty", detail: "The Plaisir Pass tracks visits, rewards and progress.", icon: "M4 6h16v12H4zM4 10h16M7 14h4" },
  { id: "scan", label: "Scan", detail: "A single screen for earning, redeeming and paying.", icon: "M3 8V4h4m10 0h4v4m0 8v4h-4m-10 0H3v-4m5-4h8" },
  { id: "gift", label: "Gift", detail: "Choose a gift card or redeem one you received.", icon: "M4 10h16v10H4zm-1-4h18v4H3zm9 0v14m0-14C4 6 7-2 12 6c5-8 8 0 0 0Z" },
  { id: "subscriptions", label: "Subscriptions", detail: "See what’s included and what’s left this week.", icon: "M19 8a8 8 0 0 0-13-2L4 8m0-4v4h4m-3 8a8 8 0 0 0 13 2l2-2m0 4v-4h-4" },
  { id: "staff", label: "Staff", detail: "The Plaisir Family workspace brings shifts and daily tasks together.", icon: "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 9v-2a5 5 0 0 1 10 0v2m2-15a3 3 0 1 1 0 6m2 2a5 5 0 0 1 4 5v2" },
] as const;

type Screen = (typeof screens)[number];

function Icon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

function AppRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return <dl className={styles.appRows}>{rows.map(([label, copy]) => <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>)}</dl>;
}

function ScreenPreview({ id, choose }: { id: Screen["id"]; choose: (id: Screen["id"]) => void }): ReactNode {
  const [orderMode, setOrderMode] = useState("Pickup");
  const [scanMode, setScanMode] = useState("Earn & redeem");

  switch (id) {
    case "home":
      return <div className={styles.appWelcome}>
        <p className={styles.appEyebrow}>Your neighbourhood table</p>
        <h3>Coffee by day.<br />Wine by night.</h3>
        <button type="button" className={styles.appAction} onClick={() => choose("menu")}>Explore the menu <span aria-hidden="true">→</span></button>
      </div>;
    case "menu":
      return <>
        <h3>The menu</h3>
        <div className={styles.appOptions} aria-label="Order options">
          {["Pickup", "Delivery", "Outpost"].map(mode => <button type="button" key={mode} aria-pressed={mode === orderMode} onClick={() => setOrderMode(mode)}>{mode}</button>)}
        </div>
        <p>{orderMode === "Outpost" ? "Find a Plaisir outpost." : `Browse the New York flagship menu for ${orderMode.toLowerCase()}.`}</p>
        <AppRows rows={[["Morning", "Espresso, brewed coffee and pastries"], ["Afternoon", "Coffee, light lunch and small plates"], ["Evening", "Wine, guided flights and sharing boards"]]} />
      </>;
    case "loyalty":
      return <>
        <h3>Plaisir Pass</h3><p>Make every visit count.</p>
        <div className={styles.appPass}>
          <span className={styles.appBottle} aria-hidden="true" />
          <div><strong>44</strong><span>Example visits</span></div><div><strong>4</strong><span>Example rewards</span></div>
        </div>
        <p>Three visits to the next $5 reward.</p>
        <button type="button" className={styles.appAction} onClick={() => choose("scan")}>Open scan preview <span aria-hidden="true">→</span></button>
      </>;
    case "scan":
      return <>
        <h3>Scan at the counter</h3>
        <div className={styles.appOptions} aria-label="Scan modes">
          {["Earn & redeem", "Pay"].map(mode => <button type="button" key={mode} aria-pressed={mode === scanMode} onClick={() => setScanMode(mode)}>{mode}</button>)}
        </div>
        <div className={styles.appScan} aria-hidden="true"><span className={styles.appBottle} /></div>
        <p>{scanMode === "Pay" ? "Payment preview" : "Rewards scan preview"}</p>
      </>;
    case "gift":
      return <>
        <h3>Send a Plaisir gift</h3><p>A little something for their next visit.</p>
        <div className={styles.appGifts}>{["$20", "$50"].map(amount => <div key={amount}><span className={styles.appBottle} aria-hidden="true" /><strong>{amount}</strong></div>)}</div>
        <p>Seasonal, Wine O’Clock or Congrats.</p>
        <p className={styles.appEyebrow}>Gift and redemption preview</p>
      </>;
    case "subscriptions":
      return <>
        <h3>Your subscription</h3>
        <div className={styles.appMembership}><span className={styles.appEyebrow}>Example membership</span><strong>Active</strong></div>
        <AppRows rows={[["This week", "One glass remaining"], ["Membership", "Review benefits and explore tiers"]]} />
      </>;
    case "staff":
      return <>
        <p className={styles.appEyebrow}>Plaisir Family</p><h3>Staff workspace</h3>
        <AppRows rows={[["Shifts", "Shift planner and weekly hours"], ["Training", "Development and daily workflow"], ["Operations", "Cleaning, inventory and wine and coffee waste"], ["Safety", "Health and food safety"]]} />
      </>;
  }
}

export default function AppConcept({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Screen["id"]>("home");
  const current = screens.find(screen => screen.id === selected) ?? screens[0];

  return <div className={styles.appShowcase}>
    <div>
      {children}
      <div className={styles.appPicker} role="group" aria-label="Choose a concept screen">
        {screens.map(screen => <button key={screen.id} type="button" aria-pressed={selected === screen.id} aria-controls="app-concept-screen" onClick={() => setSelected(screen.id)}>{screen.label}</button>)}
      </div>
      <p className={styles.appDetail} aria-live="polite">{current.detail}</p>
    </div>
    <div className={styles.appDevice}>
      <div className={styles.appTop}><span className={styles.appMark} role="img" aria-label="Plaisir" /><span>Concept</span></div>
      <div id="app-concept-screen" className={styles.appScreen} aria-label={current.label + " screen"}>
        <div key={selected} className={styles.appView} data-screen={selected}>
          <ScreenPreview id={selected} choose={setSelected} />
        </div>
      </div>
      <nav className={styles.appDock} aria-label="App preview navigation">
        {screens.slice(0, 5).map(screen => <button key={screen.id} type="button" aria-pressed={selected === screen.id} onClick={() => setSelected(screen.id)}><Icon path={screen.icon} />{screen.label}</button>)}
      </nav>
    </div>
  </div>;
}
