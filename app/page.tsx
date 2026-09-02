"use client";

import Image from "next/image";
import { useEffect as reactUseEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  BedDouble,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  CookingPot,
  ExternalLink,
  Home,
  MapPin,
  MapPinned,
  Moon,
  Mountain,
  ParkingCircle,
  Route,
  ShieldAlert,
  Sunset,
  Trees,
  Users,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  budgetCategories,
  BudgetScenario,
  routeStops,
  scenarioTotals,
  trip,
} from "@/lib/trip-data";

const useEffect = (effect: () => unknown, dependencies: React.DependencyList) =>
  reactUseEffect(() => {
    effect();
  }, dependencies);

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });

const days = [
  {
    day: "FRI",
    date: "SEP 04",
    title: "Night departure",
    label: "Tampa → Tennessee",
    tone: "night",
    items: [
      {
        time: "8:00 PM",
        title: "Leave Tampa",
        meta: "Kia Carnival · 5 travelers",
        icon: CarFront,
        kind: "drive",
      },
      {
        time: "OVERNIGHT",
        title: "Drive north",
        meta: "Rotate alert drivers · breaks required",
        icon: Moon,
        kind: "night",
      },
    ],
  },
  {
    day: "SAT",
    date: "SEP 05",
    title: "Recovery / Waterfall Day",
    label: "Cosby / Great Smoky Mountains",
    tone: "forest",
    items: [
      {
        time: "MORNING",
        title: "Arrive in Tennessee",
        meta: "Arrival time is approximate",
        icon: MapPin,
        kind: "drive",
      },
      {
        time: "4–5 HOURS",
        title: "Mandatory recovery sleep",
        meta: "Real rest before any trail decision",
        icon: BedDouble,
        kind: "sleep",
        strong: true,
      },
      {
        time: "BREAKFAST",
        title: "Food + trail prep",
        meta: "Easy morning before the hike",
        icon: CookingPot,
        kind: "rest",
      },
      {
        time: "AFTER REST",
        title: "Hen Wallow Falls",
        meta: "~4.3 mi round trip · 3–4 hr",
        icon: Trees,
        kind: "hike",
      },
      {
        time: "NIGHT",
        title: "Tiny Home on the River",
        meta: "Cosby, TN · shower, food, sleep · $177",
        icon: Home,
        kind: "stay",
      },
    ],
  },
  {
    day: "SUN",
    date: "SEP 06",
    title: "Summit / Adventure Day",
    label: "Great Smoky Mountains → Kuwohi",
    tone: "sunset",
    items: [
      {
        time: "MORNING",
        title: "Breakfast + chosen trailhead",
        meta: "Summit route still being finalized",
        icon: CarFront,
        kind: "drive",
      },
      {
        time: "ROUTE TBD",
        title: "Summit hike to Kuwohi",
        meta: "Target 7–10 mi if practical · do not lock mileage",
        icon: Mountain,
        kind: "sunset",
        strong: true,
      },
      {
        time: "6,643 FT",
        title: "Summit + observation tower",
        meta: "Panoramic views · weather permitting",
        icon: Sunset,
        kind: "sunset",
      },
      {
        time: "AFTER SUMMIT",
        title: "Descend + food",
        meta: "Recover before checking in",
        icon: CookingPot,
        kind: "rest",
      },
      {
        time: "NIGHT",
        title: "Sunday lodging TBD",
        meta: "Smokies / route toward Tampa · estimate only",
        icon: Home,
        kind: "stay",
      },
    ],
  },
  {
    day: "MON",
    date: "SEP 07",
    title: "The long way home",
    label: "Smokies region → Tampa",
    tone: "return",
    items: [
      {
        time: "MORNING",
        title: "Breakfast + pack",
        meta: "Recovery morning · no major hike",
        icon: CookingPot,
        kind: "rest",
      },
      {
        time: "DAYTIME",
        title: "Return to Tampa",
        meta: "Drive time is intentionally flexible",
        icon: Route,
        kind: "drive",
        strong: true,
      },
      {
        time: "RENTAL",
        title: "Return Kia Carnival",
        meta: "Confirm return window avoids extra day",
        icon: CheckCircle2,
        kind: "alert",
      },
    ],
  },
];

const hikes = [
  {
    id: "hen-wallow",
    eyebrow: "SATURDAY · RECOVERY DAY",
    title: "Hen Wallow Falls",
    place: "Cosby, Great Smoky Mountains NP",
    category: "Waterfall / forest",
    distance: "~4.3 mi RT",
    time: "3–4 hr",
    difficulty: "Moderate",
    scoreOneLabel: "Waterfall",
    scoreOne: "9 / 10",
    scoreTwoLabel: "Scenery",
    scoreTwo: "8 / 10",
    scoreThreeLabel: "Difficulty",
    scoreThree: "5 / 10",
    scoreFourLabel: "From Cosby",
    scoreFour: "10 / 10",
    description:
      "A restorative forest hike through hemlock, rhododendron and hardwoods to an approximately 90-foot waterfall. Some uphill switchbacks, but intentionally the lighter day.",
    accent: "forest",
    image: "/images/trails/hen-wallow-falls.jpg",
    imageAlt:
      "Hen Wallow Falls cascading through dense forest in the Smokies",
    trailUrl: "https://www.nps.gov/places/hen-wallow-falls.htm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hen+Wallow+Falls+Trailhead+Cosby+Tennessee",
  },
  {
    id: "kuwohi",
    eyebrow: "SUNDAY · FLAGSHIP SUMMIT",
    title: "Kuwohi Summit Hike",
    place: "Great Smoky Mountains NP · 6,643 ft",
    category: "Mountain summit",
    distance: "TBD",
    time: "TBD",
    difficulty: "Challenging",
    scoreOneLabel: "Views",
    scoreOne: "10 / 10",
    scoreTwoLabel: "Summit payoff",
    scoreTwo: "10 / 10",
    scoreThreeLabel: "Difficulty",
    scoreThree: "TBD",
    scoreFourLabel: "Route planning",
    scoreFour: "In progress",
    description:
      "The trip’s main adventure: a real ascent ending at the highest point in the Smokies and its observation tower. The exact trailhead, mileage and route remain deliberately open.",
    accent: "summit flagship",
    image: "/images/trails/kuwohi-summit.jpg",
    imageAlt: "Kuwohi observation tower above misty Appalachian ridges",
    trailUrl: "https://www.nps.gov/grsm/planyourvisit/kuwohi-nfg.htm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Kuwohi+Great+Smoky+Mountains",
  },
];

const stays = [
  {
    night: "SATURDAY NIGHT",
    title: "Tiny Home on the River",
    subtitle: "WATERFALL RUSH",
    location: "Cosby, Tennessee",
    date: "Sep 5 → Sep 6",
    price: 177,
    confirmed: true,
    href: "https://www.airbnb.com/rooms/875500496054369234?check_in=2026-09-05&check_out=2026-09-06&adults=5",
    amenities: ["River setting", "Tiny home", "Near Smokies"],
    icon: Trees,
  },
  {
    night: "SUNDAY NIGHT",
    title: "Sunday lodging being decided",
    subtitle: "IN PROGRESS · ESTIMATE ONLY",
    location: "Smokies / route toward Tampa",
    date: "Sep 6 → Sep 7",
    price: 175,
    confirmed: false,
    href: "",
    amenities: ["Location TBD", "$175 expected", "Sleep + recover"],
    icon: Home,
  },
];

const alerts = [
  {
    level: "critical",
    icon: Moon,
    title: "Overnight drive",
    text: "Friday’s 8 PM departure makes Saturday recovery sleep mandatory before hiking.",
    status: "Non-negotiable",
  },
  {
    level: "warn",
    icon: Trees,
    title: "Saturday = easy day",
    text: "Hen Wallow Falls is intentionally the lighter recovery-day hike after the overnight drive.",
    status: "Intentional",
  },
  {
    level: "critical",
    icon: Route,
    title: "Sunday summit route TBD",
    text: "Do not lock Sunday mileage or a trailhead until the Kuwohi ascent route is finalized.",
    status: "Unresolved",
  },
  {
    level: "warn",
    icon: ParkingCircle,
    title: "Kuwohi parking",
    text: "Parking can be extremely busy during Labor Day weekend. Final access depends on the chosen ascent trailhead.",
    status: "Plan ahead",
  },
  {
    level: "warn",
    icon: ParkingCircle,
    title: "Parking tag",
    text: "$5 daily parking tag required when the vehicle is parked for more than 15 minutes.",
    status: "$5 / vehicle",
  },
  {
    level: "note",
    icon: Mountain,
    title: "Summit weather",
    text: "Kuwohi can be dramatically colder, windier and cloudier than lower elevations. Pack a warm layer and windbreaker.",
    status: "High elevation",
  },
  {
    level: "note",
    icon: CarFront,
    title: "Rental return",
    text: "Confirm taxes, fees and the Kia Carnival return time so the trip does not trigger another rental day.",
    status: "Not finalized",
  },
];

const packing = [
  "Hiking shoes",
  "Headlamps",
  "Rain jackets",
  "Hydration packs",
  "Extra water",
  "Electrolytes",
  "Hiking snacks",
  "First-aid kit",
  "Sunscreen",
  "Bug spray",
  "Battery packs",
  "Offline maps",
  "Extra socks",
  "Change of clothes",
  "Light warm summit layer",
  "Windbreaker",
  "Cooler",
  "Toiletries",
  "Phone cables",
  "Small towels",
  "Overnight drive sleep items",
];

const decisions = {
  confirmed: [
    "5 people",
    "Kia Carnival",
    "Friday 8 PM departure",
    "Saturday Hen Wallow Falls",
    "Saturday Cosby Airbnb · $177",
    "Sunday Kuwohi summit destination",
  ],
  inProgress: [
    "Exact Kuwohi ascent trail",
    "Sunday Airbnb",
    "Exact final rental price",
    "Exact gas stops",
  ],
};

function SectionHead({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{detail}</p>
    </div>
  );
}

function RouteMap() {
  return (
    <div
      className="route-map"
      aria-label="Stylized route map from Tampa to Cosby, Hen Wallow Falls, Kuwohi, and back to Tampa"
    >
      <div className="map-topline">
        <span>
          <MapPinned size={15} /> Road trip route
        </span>
        <span className="approx-label">APPROXIMATE</span>
      </div>
      <svg
        className="route-svg"
        viewBox="0 0 100 100"
        role="img"
        aria-label="Six-stop Smokies trip route"
      >
        <path
          className="contour c1"
          d="M-4 35 C14 22 22 41 40 29 S72 5 104 22"
        />
        <path
          className="contour c2"
          d="M-4 55 C22 35 31 60 53 45 S82 20 105 39"
        />
        <path
          className="contour c3"
          d="M2 76 C28 55 45 85 68 60 S90 42 105 56"
        />
        <path
          className="route-shadow"
          d="M20 80 C31 69 38 49 48 38 C52 38 54 43 57 45 C62 39 66 31 69 28 C69 42 64 53 59 59 C53 72 43 83 30 86"
        />
        <path
          className="route-line"
          d="M20 80 C31 69 38 49 48 38 C52 38 54 43 57 45 C62 39 66 31 69 28 C69 42 64 53 59 59 C53 72 43 83 30 86"
        />
      </svg>
      {routeStops.map((stop) => (
        <div
          className={`route-stop stop-${stop.marker.toLowerCase()} ${"placeholder" in stop ? "placeholder" : ""}`}
          style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          key={stop.marker}
        >
          <span className="marker">{stop.marker}</span>
          <span className="stop-copy">
            <strong>{stop.title}</strong>
            <small>{stop.detail}</small>
          </span>
        </div>
      ))}
      <div className="map-legend">
        <span>
          <Moon size={13} /> Overnight north
        </span>
        <span>
          <CarFront size={13} /> Return Monday
        </span>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="timeline-grid">
      {days.map((day, index) => (
        <article className={`day-card ${day.tone}`} key={day.day}>
          <div className="day-top">
            <span className="day-index">0{index + 1}</span>
            <div>
              <p>{day.day}</p>
              <strong>{day.date}</strong>
            </div>
          </div>
          <h3>{day.title}</h3>
          <p className="day-route">{day.label}</p>
          <div className="day-events">
            {day.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  className={`event ${item.kind} ${item.strong ? "strong" : ""}`}
                  key={item.title}
                >
                  <span className="event-icon">
                    <Icon size={15} />
                  </span>
                  <div>
                    <time>{item.time}</time>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </div>
                  {i < day.items.length - 1 && <span className="event-line" />}
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}

function Hikes() {
  const [routeOpen, setRouteOpen] = useState(false);
  return (
    <section className="content-section" id="hikes">
      <SectionHead
        eyebrow="02 · TRAILS"
        title="Waterfall recovery. Summit payoff."
        detail="Saturday stays intentionally lighter. Sunday is the flagship hike, with the exact Kuwohi ascent still under active review."
      />
      <div className="hike-grid">
        {hikes.map((hike) => (
          <article className={`hike-card ${hike.accent}`} key={hike.id}>
            <div className="hike-art">
              <Image
                src={hike.image}
                alt={hike.imageAlt}
                fill
                sizes="(max-width: 800px) 100vw, 21vw"
                className="hike-photo"
              />
              <div className="hike-photo-shade" />
              <span>{hike.eyebrow}</span>
              <div>
                <h3>{hike.title}</h3>
                <p>
                  <MapPin size={13} />
                  {hike.place}
                </p>
              </div>
            </div>
            <div className="hike-body">
              <span className="hike-category">{hike.category}</span>
              {hike.id === "kuwohi" && (
                <span className="route-badge">
                  Route TBD — do not finalize mileage yet
                </span>
              )}
              <div className="hike-metrics">
                <div>
                  <span>DISTANCE</span>
                  <strong>{hike.distance}</strong>
                </div>
                <div>
                  <span>TIME</span>
                  <strong>{hike.time}</strong>
                </div>
                <div>
                  <span>DIFFICULTY</span>
                  <strong>{hike.difficulty}</strong>
                </div>
              </div>
              <p>{hike.description}</p>
              <dl className="ratings">
                <div>
                  <dt>{hike.scoreOneLabel}</dt>
                  <dd>{hike.scoreOne}</dd>
                </div>
                <div>
                  <dt>{hike.scoreTwoLabel}</dt>
                  <dd>{hike.scoreTwo}</dd>
                </div>
                <div>
                  <dt>{hike.scoreThreeLabel}</dt>
                  <dd>{hike.scoreThree}</dd>
                </div>
                <div>
                  <dt>{hike.scoreFourLabel}</dt>
                  <dd>{hike.scoreFour}</dd>
                </div>
              </dl>
              <div className="trail-links">
                <a
                  href={hike.trailUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Trail details <ExternalLink size={13} />
                </a>
                <a href={hike.mapUrl} target="_blank" rel="noreferrer">
                  Open location <MapPin size={13} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <article className={`route-tbd-card ${routeOpen ? "selected" : ""}`}>
        <div className="stretch-mark">
          <Route size={18} />
        </div>
        <div>
          <p>ROUTE TBD · DO NOT FINALIZE MILEAGE YET</p>
          <h3>Kuwohi ascent route being finalized</h3>
          <span>
            Target: challenging but realistic · roughly 7–10 miles total if
            practical · scenic · ends at Kuwohi summit
          </span>
          {routeOpen && (
            <div className="route-criteria">
              <span>Chosen trailhead</span>
              <strong>TBD</strong>
              <span>Final mileage</span>
              <strong>TBD</strong>
              <span>Decision rule</span>
              <strong>Avoid 15+ mile one-way routes</strong>
            </div>
          )}
        </div>
        <button onClick={() => setRouteOpen(!routeOpen)} aria-expanded={routeOpen}>
          {routeOpen ? "Hide criteria" : "View route criteria"}
          <ChevronRight size={14} />
        </button>
      </article>
    </section>
  );
}

function Lodging() {
  return (
    <section className="content-section" id="stays">
      <SectionHead
        eyebrow="03 · WHERE WE SLEEP"
        title="One stay locked. One still open."
        detail="Saturday is confirmed at $177 total. Sunday carries a $175 planning estimate until the group books it."
      />
      <div className="lodging-grid">
        {stays.map((stay, index) => {
          const Icon = stay.icon;
          return (
            <article className="stay-card" key={stay.title}>
              <div className="stay-visual">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={48} />
                <div className="mini-contours" />
              </div>
              <div className="stay-body">
                <div className="stay-label">
                  <span>{stay.night}</span>
                  <span>{stay.confirmed ? "CONFIRMED" : "TBD"}</span>
                </div>
                <h3>{stay.title}</h3>
                <p className="stay-subtitle">{stay.subtitle}</p>
                <p className="stay-location">
                  <MapPin size={14} />
                  {stay.location}
                </p>
                <div className="amenities">
                  {stay.amenities.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
                <div className="stay-bottom">
                  <div>
                    <small>{stay.date}</small>
                    <strong>
                      {stay.confirmed
                        ? `$${formatMoney(stay.price)} total`
                        : `$${formatMoney(stay.price)} expected`}{" "}
                      <span>· ${(stay.price / 5).toFixed(2)} each</span>
                    </strong>
                  </div>
                  {stay.confirmed ? (
                    <a
                      className="stay-link"
                      href={stay.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${stay.title} on Airbnb`}
                    >
                      <span>Open Airbnb</span>
                      <ExternalLink size={15} />
                    </a>
                  ) : (
                    <span className="tbd-lodging-badge">Not booked</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Budget() {
  const [scenario, setScenario] = useState<BudgetScenario>("expected");
  const [travelers, setTravelers] = useState(5);
  const total = scenarioTotals[scenario];
  const perPerson = total / travelers;
  const categories = useMemo(
    () => budgetCategories.map((c) => ({ ...c, value: c[scenario] })),
    [scenario],
  );
  const transport = categories
    .filter((c) => ["vehicle", "gas", "parking"].includes(c.id))
    .reduce((a, c) => a + c.value, 0);
  const lodging = categories
    .filter((c) => ["saturday_lodging", "sunday_lodging"].includes(c.id))
    .reduce((a, c) => a + c.value, 0);
  return (
    <section className="budget-section" id="budget">
      <div className="content-section budget-inner">
        <SectionHead
          eyebrow="05 · MONEY"
          title="The whole trip, split cleanly."
          detail="Sunday lodging and the final rental price remain estimates. Every scenario still updates automatically for the group size."
        />
        <div className="scenario-bar" role="group" aria-label="Budget scenario">
          {(["best", "expected", "worst"] as BudgetScenario[]).map((s) => (
            <button
              className={scenario === s ? "active" : ""}
              onClick={() => setScenario(s)}
              key={s}
            >
              {s === "worst" ? "Worst reasonable" : s}
              <span>${formatMoney(scenarioTotals[s])}</span>
            </button>
          ))}
        </div>
        <div className="budget-dashboard">
          <div className="budget-main">
            <div className="budget-numbers">
              <div>
                <span>TOTAL TRIP</span>
                <strong key={total}>${formatMoney(total)}</strong>
                <small>{scenario} case estimate</small>
              </div>
              <div>
                <span>PER PERSON</span>
                <strong key={perPerson}>${perPerson.toFixed(2)}</strong>
                <small>split by {travelers}</small>
              </div>
            </div>
            <div className="stacked-bar" aria-label="Cost breakdown">
              {categories.map((c) => (
                <span
                  style={{
                    width: `${(c.value / total) * 100}%`,
                    background: c.color,
                  }}
                  title={`${c.label}: $${c.value}`}
                  key={c.id}
                />
              ))}
            </div>
            <div className="cost-list">
              {categories.map((c) => (
                <div key={c.id}>
                  <span>
                    <i style={{ background: c.color }} />
                    {c.label}
                    {c.id === "vehicle" && <em>ESTIMATE</em>}
                    {c.id === "sunday_lodging" && <em>NOT BOOKED</em>}
                  </span>
                  <strong>${formatMoney(c.value)}</strong>
                </div>
              ))}
            </div>
          </div>
          <aside className="split-panel">
            <p>SPLIT CALCULATOR</p>
            <label>
              Travelers{" "}
              <span>
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  aria-label="Remove traveler"
                >
                  −
                </button>
                <b>{travelers}</b>
                <button
                  onClick={() => setTravelers(Math.min(12, travelers + 1))}
                  aria-label="Add traveler"
                >
                  +
                </button>
              </span>
            </label>
            <div className="split-result">
              <span>Each person pays</span>
              <strong>${perPerson.toFixed(2)}</strong>
            </div>
            <div className="subtotals">
              <p>
                <span>Lodging</span>
                <b>${formatMoney(lodging)}</b>
              </p>
              <p>
                <span>Transportation</span>
                <b>${transport}</b>
              </p>
              <p>
                <span>Food</span>
                <b>${categories.find((c) => c.id === "food")?.value}</b>
              </p>
            </div>
            <div className="budget-callout">
              <ShieldAlert size={19} />
              <div>
                <strong>Budget $250–$300</strong>
                <span>per person for a safer cushion</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DecisionStatus() {
  return (
    <section className="content-section decision-section" id="decisions">
      <SectionHead
        eyebrow="04 · DECISION STATUS"
        title="What’s locked. What still moves."
        detail="The destination is clear; the group still has two meaningful booking and route decisions to finish."
      />
      <div className="decision-grid">
        <article className="decision-card confirmed">
          <div className="decision-title">
            <CheckCircle2 size={18} />
            <div>
              <span>CONFIRMED</span>
              <strong>{decisions.confirmed.length} decisions locked</strong>
            </div>
          </div>
          <ul>
            {decisions.confirmed.map((item) => (
              <li key={item}>
                <Check size={13} /> {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="decision-card in-progress">
          <div className="decision-title">
            <Route size={18} />
            <div>
              <span>IN PROGRESS</span>
              <strong>{decisions.inProgress.length} items to resolve</strong>
            </div>
          </div>
          <ul>
            {decisions.inProgress.map((item) => (
              <li key={item}>
                <span className="open-dot" /> {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Logistics() {
  return (
    <section className="content-section" id="logistics">
      <SectionHead
        eyebrow="06 · DO NOT MISS"
        title="Seven things can make or break the weekend."
        detail="Saturday recovery is fixed. Sunday’s route, parking approach, summit weather and lodging still need active planning."
      />
      <div className="alert-grid">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <article className={`alert-card ${alert.level}`} key={alert.title}>
              <div className="alert-icon">
                <Icon size={19} />
              </div>
              <div>
                <div className="alert-top">
                  <h3>{alert.title}</h3>
                  <span>{alert.status}</span>
                </div>
                <p>{alert.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="parking-note">
        <AlertTriangle size={18} />
        <p>
          <strong>Kuwohi access:</strong> The park has no entrance fee and the
          observation tower is free, but a $5 daily parking tag is required for
          stops longer than 15 minutes. The final trailhead remains TBD.
        </p>
      </div>
    </section>
  );
}

function Packing() {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mountain-run-packing") || "[]",
      ) as string[];
      setChecked(saved.filter((item) => packing.includes(item)));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded)
      localStorage.setItem("mountain-run-packing", JSON.stringify(checked));
  }, [checked, loaded]);
  const toggle = (item: string, value: boolean) =>
    setChecked((old) =>
      value ? [...new Set([...old, item])] : old.filter((x) => x !== item),
    );
  return (
    <section className="packing-section" id="packing">
      <div className="content-section">
        <div className="packing-head">
          <div>
            <p className="section-kicker">07 · PACKING</p>
            <h2>
              Ready means {packing.length}/{packing.length}.
            </h2>
            <p>Your checklist saves automatically on this device.</p>
          </div>
          <div className="packing-progress">
            <strong>{checked.length}</strong>
            <span>of {packing.length} packed</span>
            <div>
              <i
                style={{ width: `${(checked.length / packing.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="packing-grid">
          {packing.map((item) => (
            <label
              className={checked.includes(item) ? "checked" : ""}
              key={item}
            >
              <Checkbox
                checked={checked.includes(item)}
                onCheckedChange={(value) => toggle(item, Boolean(value))}
              />
              <span>{item}</span>
              {checked.includes(item) && <Check size={14} />}
            </label>
          ))}
        </div>
        {checked.length > 0 && (
          <button className="clear-button" onClick={() => setChecked([])}>
            <X size={13} /> Clear checklist
          </button>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [dark, setDark] = useState(true);
  useEffect(
    () => document.documentElement.classList.toggle("dark", dark),
    [dark],
  );
  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Labor Day Mountain Run home"
        >
          <span className="brand-mark">
            <Mountain size={17} />
          </span>
          <span>
            Mountain Run <small>LDW ’26</small>
          </span>
        </a>
        <nav aria-label="Trip sections">
          <a href="#itinerary">Itinerary</a>
          <a href="#hikes">Hikes</a>
          <a href="#stays">Stays</a>
          <a href="#budget">Budget</a>
          <a href="#packing">Packing</a>
        </nav>
        <button
          className="theme-button"
          onClick={() => setDark((v) => !v)}
          aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        >
          <Moon size={16} />
          <span>{dark ? "Dark" : "Light"}</span>
        </button>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />4 DAYS · LABOR DAY WEEKEND
          </div>
          <h1>{trip.title}</h1>
          <p className="route-title">{trip.subtitle}</p>
          <p className="lede">
            A recovery-day waterfall, a flagship summit ascent, and one focused
            Smokies weekend with the route still being planned honestly.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#itinerary">
              View itinerary <ArrowDown size={16} />
            </a>
            <a className="secondary-button" href="#budget">
              Budget <span>~$223 / person</span>
            </a>
          </div>
          <dl className="hero-facts">
            <div>
              <dt>
                <CalendarDays size={15} />
                Dates
              </dt>
              <dd>{trip.dateRange}</dd>
            </div>
            <div>
              <dt>
                <Users size={15} />
                Crew
              </dt>
              <dd>{trip.travelers} travelers</dd>
            </div>
            <div>
              <dt>
                <CarFront size={15} />
                Vehicle
              </dt>
              <dd>{trip.vehicle}</dd>
            </div>
          </dl>
          <p className="hero-plan-meta">
            2 main hikes · 1 confirmed Airbnb · 1 Airbnb TBD
          </p>
        </div>
        <RouteMap />
      </section>
      <section className="stat-strip" aria-label="Trip summary">
        <div>
          <strong>2</strong>
          <span>Hikes</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Travelers</span>
        </div>
        <div>
          <strong>6,643 ft</strong>
          <span>Summit</span>
        </div>
        <div>
          <strong>~$223</strong>
          <span>Expected / person</span>
        </div>
      </section>
      <section className="content-section" id="itinerary">
        <SectionHead
          eyebrow="01 · THE PLAN"
          title="Four days. Every critical handoff visible."
          detail="Timing remains approximate where bookings and exact drive windows are not confirmed."
        />
        <Timeline />
      </section>
      <Hikes />
      <Lodging />
      <DecisionStatus />
      <Budget />
      <Logistics />
      <Packing />
      <footer>
        <div>
          <span className="brand-mark">
            <Mountain size={17} />
          </span>
          <p>
            <strong>Labor Day Mountain Run</strong>
            <small>Tampa → Great Smoky Mountains → Tampa</small>
          </p>
        </div>
        <p>Sept 4–7, 2026 · Plan responsibly. Hike safely.</p>
      </footer>
    </main>
  );
}
