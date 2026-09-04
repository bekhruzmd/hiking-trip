"use client";

import Image from "next/image";
import { useEffect as reactUseEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  BedDouble,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  CookingPot,
  ExternalLink,
  Eye,
  Filter,
  Footprints,
  Home,
  Layers,
  MapPin,
  MapPinned,
  Moon,
  Mountain,
  ParkingCircle,
  Route,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sunset,
  ThumbsUp,
  Trees,
  Users,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  budgetCategories,
  BudgetScenario,
  routeStops,
  saturdayCandidates,
  SaturdayCandidate,
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
        meta: "Kia Carnival · 3 travelers",
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
    title: "Recovery & Trail Choice",
    label: "Cosby / Great Smoky Mountains",
    tone: "forest",
    items: [
      {
        time: "MORNING",
        title: "Arrive in Tennessee",
        meta: "Cosby basecamp arrival",
        icon: MapPin,
        kind: "drive",
      },
      {
        time: "4–5 HOURS",
        title: "Mandatory recovery sleep",
        meta: "Real rest before any trail exertion",
        icon: BedDouble,
        kind: "sleep",
        strong: true,
      },
      {
        time: "BREAKFAST",
        title: "Food + group trail choice",
        meta: "Review 5 researched candidate options below",
        icon: CookingPot,
        kind: "rest",
      },
      {
        time: "AFTER REST",
        title: "Saturday Hike Option",
        meta: "Select candidate below (Hen Wallow, Mouse Creek, Grotto, Laurel, Andrews Bald)",
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
    title: "Mount LeConte Summit Day",
    label: "Newfound Gap Rd → Mt. LeConte Peak",
    tone: "sunset",
    items: [
      {
        time: "6:30 AM",
        title: "Drive to Alum Cave Trailhead",
        meta: "Must arrive early before parking lot fills",
        icon: CarFront,
        kind: "drive",
      },
      {
        time: "11.0 MI RT",
        title: "Ascend Alum Cave Trail",
        meta: "Arch Rock (1.4 mi) → Alum Cave Bluffs (2.3 mi) → Ledge cables",
        icon: Mountain,
        kind: "sunset",
        strong: true,
      },
      {
        time: "6,593 FT",
        title: "Mount LeConte & Cliff Tops",
        meta: "Historic LeConte Lodge + 360° summit views",
        icon: Sunset,
        kind: "sunset",
      },
      {
        time: "AFTER SUMMIT",
        title: "Descend + celebrate",
        meta: "~6–8 hr total hike time · recovery meal",
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

const stays = [
  {
    night: "SATURDAY NIGHT",
    title: "Tiny Home on the River",
    subtitle: "RIVER BASECAMP",
    location: "Cosby, Tennessee",
    date: "Sep 5 → Sep 6",
    price: 177,
    confirmed: true,
    href: "https://www.airbnb.com/rooms/875500496054369234?check_in=2026-09-05&check_out=2026-09-06&adults=3",
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
    level: "critical",
    icon: ParkingCircle,
    title: "Alum Cave parking by 7:00 AM",
    text: "The Alum Cave Trailhead parking lot fills completely before 7:30 AM on Labor Day Weekend. 6:00 AM wake-up & early drive required.",
    status: "Arrive Early",
  },
  {
    level: "critical",
    icon: ShieldAlert,
    title: "Ledge hand-cables on LeConte",
    text: "The upper section of Alum Cave Trail traverses narrow stone ledges along steep bluffs with steel hand-cables. Take steady footing.",
    status: "Strenuous Trail",
  },
  {
    level: "warn",
    icon: Trees,
    title: "Saturday trail choice open",
    text: "Review the 5 researched Saturday trails below (0 to 60 min from Cosby) and choose the right recovery effort for the crew.",
    status: "5 Candidates",
  },
  {
    level: "warn",
    icon: ParkingCircle,
    title: "Park parking tag",
    text: "$5 daily parking tag required when the vehicle is parked anywhere in the park for more than 15 minutes.",
    status: "$5 / vehicle",
  },
  {
    level: "note",
    icon: Mountain,
    title: "LeConte summit weather (6,593 ft)",
    text: "Mount LeConte can be 15–20°F colder and windier than lower elevations. Pack a warm mid-layer, windbreaker, and extra water.",
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
  "Hiking boots / trail shoes",
  "Headlamps / flashlights",
  "Rain jackets / shell",
  "Hydration packs (3L+ for LeConte)",
  "Electrolytes / salt tablets",
  "High-calorie trail snacks",
  "First-aid kit & blister pads",
  "Sunscreen & sunglasses",
  "Bug spray",
  "Power banks & cables",
  "Offline maps (AllTrails / Gaia)",
  "Extra wool hiking socks",
  "Change of dry clothes",
  "Warm summit fleece / jacket",
  "Windbreaker",
  "Trekking poles (recommended)",
  "Cooler & recovery drinks",
  "Toiletries & small towels",
  "Overnight drive sleep pillows",
];

const decisions = {
  confirmed: [
    "3 people",
    "Kia Carnival rental",
    "Friday 8 PM departure",
    "Saturday Cosby Airbnb · $177",
    "Sunday flagship summit: Mount LeConte via Alum Cave Trail (6,593 ft)",
  ],
  inProgress: [
    "Saturday trail selection (5 candidate options researched on site)",
    "Sunday Airbnb lodging location",
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
      aria-label="Stylized route map from Tampa to Cosby, Saturday trail options, Mount LeConte summit, and back to Tampa"
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
          <Mountain size={13} /> Mt. LeConte Peak
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

function FlagshipLeConte() {
  const [showMilestones, setShowMilestones] = useState(false);

  return (
    <div className="flagship-leconte-card">
      <div className="leconte-hero-art">
        <Image
          src="/images/trails/alum-cave.jpg"
          alt="Alum Cave Bluffs and Mount LeConte cliff trails in the Smokies"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="hike-photo"
          priority
        />
        <div className="hike-photo-shade" />
        <div className="leconte-hero-content">
          <span className="flagship-badge">
            <Mountain size={13} /> SUNDAY CONFIRMED FLAGSHIP SUMMIT
          </span>
          <h2>Alum Cave Trail to Mount LeConte</h2>
          <p className="leconte-subtitle">
            <MapPin size={14} /> Great Smoky Mountains NP · Newfound Gap Road (US-441) · 6,593 ft Summit
          </p>
        </div>
      </div>

      <div className="leconte-body">
        <div className="leconte-metrics-grid">
          <div className="metric-box">
            <span>TOTAL DISTANCE</span>
            <strong>11.0 mi RT</strong>
            <small>Out-and-back trail</small>
          </div>
          <div className="metric-box">
            <span>ELEVATION GAIN</span>
            <strong>+2,763 ft</strong>
            <small>3,830 ft → 6,593 ft</small>
          </div>
          <div className="metric-box">
            <span>ESTIMATED TIME</span>
            <strong>6–8 Hours</strong>
            <small>Includes summit rest</small>
          </div>
          <div className="metric-box">
            <span>DIFFICULTY</span>
            <strong className="text-strenuous">Strenuous</strong>
            <small>Exposed cliff ledges</small>
          </div>
        </div>

        <p className="leconte-description">
          The ultimate Appalachian mountain climb. This iconic trail takes you through a stone archway (Arch Rock), along high cliff ledges with hand-cable railings, beneath the massive 80-foot Alum Cave Bluffs overhang, and up to the historic LeConte Lodge (est. 1926) and panoramic Cliff Tops summit view (6,593 ft).
        </p>

        <div className="milestone-toggle-row">
          <button
            className="milestone-toggle-btn"
            onClick={() => setShowMilestones(!showMilestones)}
            aria-expanded={showMilestones}
          >
            <Compass size={15} />
            <span>{showMilestones ? "Hide Landmark Progression" : "View Step-by-Step Landmark Progression (6 Milestones)"}</span>
            <ChevronRight size={14} className={showMilestones ? "rotate-90" : ""} />
          </button>
        </div>

        {showMilestones && (
          <div className="milestone-timeline">
            <div className="milestone-item">
              <span className="mile-tag">1.4 MI</span>
              <div>
                <strong>Arch Rock</strong>
                <p>Natural concavity carved into alum slate with stone staircase spiraling up through the rock archway.</p>
              </div>
            </div>
            <div className="milestone-item">
              <span className="mile-tag">2.0 MI</span>
              <div>
                <strong>Inspiration Point</strong>
                <p>High mountain ledge providing sweeping valley vistas, Little Pigeon River views, and Duckhawk Ridge.</p>
              </div>
            </div>
            <div className="milestone-item">
              <span className="mile-tag">2.3 MI</span>
              <div>
                <strong>Alum Cave Bluffs</strong>
                <p>Dramatic 80-foot high concave cliff face overhang. Popular shade break and historic saltpeter mining location.</p>
              </div>
            </div>
            <div className="milestone-item">
              <span className="mile-tag">3.0 MI</span>
              <div>
                <strong>The Ledge Cable Sections</strong>
                <p>Narrow stone shelf pathways along sheer bluffs with heavy-duty steel hand-cables installed in rock for safety.</p>
              </div>
            </div>
            <div className="milestone-item">
              <span className="mile-tag">5.0 MI</span>
              <div>
                <strong>LeConte Lodge (6,400 ft)</strong>
                <p>Historic high-elevation wilderness lodge established in 1926. No electricity, pack-mule supplied, drinking water refill.</p>
              </div>
            </div>
            <div className="milestone-item">
              <span className="mile-tag">5.3 MI</span>
              <div>
                <strong>Cliff Tops &amp; Myrtle Point Summit (6,593 ft)</strong>
                <p>360-degree panoramic vista over the entire Appalachian range. The crowning payoff of the entire trip.</p>
              </div>
            </div>
          </div>
        )}

        <div className="leconte-advisory-box">
          <AlertTriangle size={18} className="advisory-icon" />
          <div>
            <strong>Critical Logistics Alert for Sunday:</strong>
            <p>
              The Alum Cave trailhead parking lot on US-441 fills completely before 7:30 AM on Labor Day Weekend. We must leave Cosby basecamp by 6:15 AM to secure parking! A $5 daily Smoky Mountains parking tag is mandatory.
            </p>
          </div>
        </div>

        <div className="leconte-footer">
          <dl className="ratings mini-ratings">
            <div>
              <dt>Panoramic Views</dt>
              <dd>10 / 10</dd>
            </div>
            <div>
              <dt>Summit Payoff</dt>
              <dd>10 / 10</dd>
            </div>
            <div>
              <dt>Technical Thrill</dt>
              <dd>9 / 10 <small>(Cables)</small></dd>
            </div>
            <div>
              <dt>Trailhead Parking</dt>
              <dd>Arrive &lt; 7 AM</dd>
            </div>
          </dl>
          <div className="trail-links">
            <a
              href="https://www.nps.gov/places/alum-cave-bluff-trail.htm"
              target="_blank"
              rel="noreferrer"
            >
              NPS Alum Cave Guide <ExternalLink size={13} />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Alum+Cave+Trailhead+Great+Smoky+Mountains"
              target="_blank"
              rel="noreferrer"
            >
              Open Trailhead Map <MapPin size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaturdayTrailHub() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string>("hen-wallow");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("selected-saturday-trail");
      if (saved && saturdayCandidates.some((c) => c.id === saved)) {
        setSelectedId(saved);
      }
    } catch {}
    setLoaded(true);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("selected-saturday-trail", id);
      } catch {}
    }
  };

  const filteredCandidates = useMemo(() => {
    if (filter === "cosby") {
      return saturdayCandidates.filter((c) => c.driveFromCosby.includes("0 min") || c.driveFromCosby.includes("15 min"));
    }
    if (filter === "waterfall") {
      return saturdayCandidates.filter((c) => c.category.toLowerCase().includes("waterfall") || c.category.toLowerCase().includes("stream"));
    }
    if (filter === "view") {
      return saturdayCandidates.filter((c) => c.category.toLowerCase().includes("bald") || c.category.toLowerCase().includes("view"));
    }
    if (filter === "easy") {
      return saturdayCandidates.filter((c) => c.difficulty === "Easy" || c.elevationGain.includes("395"));
    }
    return saturdayCandidates;
  }, [filter]);

  const activeCandidate = useMemo(
    () => saturdayCandidates.find((c) => c.id === selectedId) || saturdayCandidates[0],
    [selectedId]
  );

  return (
    <div className="saturday-hub-container" id="saturday-selector">
      <div className="saturday-hub-head">
        <div>
          <span className="hub-eyebrow">
            <Sparkles size={14} /> SATURDAY TRAIL RESEARCH &amp; SELECTION
          </span>
          <h2>Saturday Trail Explorer</h2>
          <p>
            You haven't locked Saturday yet! Compare all 5 researched trails below to pick the best post-drive effort level before Sunday's Mount LeConte climb.
          </p>
        </div>

        <div className="active-selection-pill">
          <CheckCircle2 size={18} className="pill-check" />
          <div>
            <span>CURRENT SATURDAY SELECTION</span>
            <strong>{activeCandidate.name}</strong>
            <small>{activeCandidate.distance} · {activeCandidate.driveFromCosby} from Cosby</small>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">
          <Filter size={13} /> Filter Candidates:
        </span>
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All Candidates ({saturdayCandidates.length})
          </button>
          <button
            className={filter === "cosby" ? "active" : ""}
            onClick={() => setFilter("cosby")}
          >
            Near Cosby (&le;15m drive)
          </button>
          <button
            className={filter === "waterfall" ? "active" : ""}
            onClick={() => setFilter("waterfall")}
          >
            Waterfalls &amp; Rivers
          </button>
          <button
            className={filter === "view" ? "active" : ""}
            onClick={() => setFilter("view")}
          >
            High Ridge Views
          </button>
          <button
            className={filter === "easy" ? "active" : ""}
            onClick={() => setFilter("easy")}
          >
            Light / Easy Recovery
          </button>
        </div>
      </div>

      <div className="candidate-grid">
        {filteredCandidates.map((candidate) => {
          const isSelected = candidate.id === selectedId;
          return (
            <article
              key={candidate.id}
              className={`candidate-card ${isSelected ? "selected-candidate" : ""}`}
            >
              <div className="candidate-art">
                <Image
                  src={candidate.image}
                  alt={candidate.imageAlt}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  className="hike-photo"
                />
                <div className="hike-photo-shade" />
                <span className="candidate-tag">{candidate.tag}</span>
                {isSelected && (
                  <span className="active-badge">
                    <Check size={12} /> SATURDAY CHOICE
                  </span>
                )}
                <div className="candidate-title-overlay">
                  <h3>{candidate.name}</h3>
                  <p>{candidate.category}</p>
                </div>
              </div>

              <div className="candidate-body">
                <div className="candidate-metrics">
                  <div>
                    <span>DISTANCE</span>
                    <strong>{candidate.distance}</strong>
                  </div>
                  <div>
                    <span>ELEVATION</span>
                    <strong>{candidate.elevationGain}</strong>
                  </div>
                  <div>
                    <span>DRIVE FROM Airbnb</span>
                    <strong>{candidate.driveFromCosby}</strong>
                  </div>
                </div>

                <p className="candidate-desc">{candidate.description}</p>

                <div className="rec-box">
                  <ThumbsUp size={13} />
                  <span><strong>Ideal for:</strong> {candidate.recommendedFor}</span>
                </div>

                <div className="pro-con-grid">
                  <div className="pro-box">
                    <strong>PRO:</strong> {candidate.pros}
                  </div>
                  <div className="con-box">
                    <strong>CON:</strong> {candidate.cons}
                  </div>
                </div>

                <ul className="highlights-list">
                  {candidate.highlights.map((hl) => (
                    <li key={hl}>
                      <Check size={12} /> {hl}
                    </li>
                  ))}
                </ul>

                <div className="candidate-actions">
                  <button
                    className={`select-btn ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleSelect(candidate.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} /> Selected for Saturday
                      </>
                    ) : (
                      <>Select for Saturday</>
                    )}
                  </button>

                  <div className="candidate-links">
                    <a
                      href={candidate.trailUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Official NPS details for ${candidate.name}`}
                    >
                      Details <ExternalLink size={12} />
                    </a>
                    <a
                      href={candidate.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open map for ${candidate.name}`}
                    >
                      Map <MapPin size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Hikes() {
  return (
    <section className="content-section" id="hikes">
      <SectionHead
        eyebrow="02 · TRAILS & SUMMITS"
        title="Flagship LeConte Peak. 5 Researched Saturday Options."
        detail="Sunday is locked for Mount LeConte via Alum Cave Trail (6,593 ft peak). Review and select your preferred Saturday recovery hike below!"
      />

      <FlagshipLeConte />

      <SaturdayTrailHub />
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
  const [expenseValues, setExpenseValues] = useState(() =>
    Object.fromEntries(
      (["best", "expected", "worst"] as BudgetScenario[]).map((name) => [
        name,
        Object.fromEntries(
          budgetCategories.map((category) => [category.id, category[name]]),
        ),
      ]),
    ) as Record<BudgetScenario, Record<string, number>>,
  );
  const categories = useMemo(
    () =>
      budgetCategories.map((category) => ({
        ...category,
        value: expenseValues[scenario][category.id],
      })),
    [expenseValues, scenario],
  );
  const totalsByScenario = useMemo(
    () =>
      Object.fromEntries(
        (["best", "expected", "worst"] as BudgetScenario[]).map((name) => [
          name,
          Object.values(expenseValues[name]).reduce((sum, value) => sum + value, 0),
        ]),
      ) as Record<BudgetScenario, number>,
    [expenseValues],
  );
  const total = totalsByScenario[scenario];
  const perPerson = total / trip.travelers;
  const updateExpense = (id: string, value: number) => {
    setExpenseValues((current) => ({
      ...current,
      [scenario]: {
        ...current[scenario],
        [id]: Math.max(0, Number.isFinite(value) ? value : 0),
      },
    }));
  };
  return (
    <section className="budget-section" id="budget">
      <div className="content-section budget-inner">
        <SectionHead
          eyebrow="05 · TRIP BUDGET"
          title="Budget-conscious road trip."
          detail="Keep unnecessary costs low, prioritize hiking and scenery, and adjust estimates as plans are finalized."
        />
        <div className="scenario-bar" role="group" aria-label="Budget scenario">
          {(["best", "expected", "worst"] as BudgetScenario[]).map((s) => (
            <button
              className={scenario === s ? "active" : ""}
              onClick={() => setScenario(s)}
              key={s}
            >
              {s === "worst" ? "High / worst reasonable" : `${s} case`}
              <span>${formatMoney(totalsByScenario[s])}</span>
            </button>
          ))}
        </div>
        <div className="budget-dashboard">
          <div className="budget-main">
            <div className="budget-numbers">
              <div>
                <span>TOTAL TRIP COST</span>
                <strong key={total}>${formatMoney(total)}</strong>
                <small>{scenario} case estimate</small>
              </div>
              <div>
                <span>ESTIMATED COST PER PERSON</span>
                <strong key={perPerson}>${perPerson.toFixed(2)}</strong>
                <small>Total trip cost ÷ 3</small>
              </div>
            </div>
            <div className="stacked-bar" aria-label="Cost breakdown">
              {categories.map((c) => (
                <span
                  style={{
                    width: `${total > 0 ? (c.value / total) * 100 : 0}%`,
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
                    <em>EDITABLE</em>
                  </span>
                  <label className="expense-input">
                    <span className="sr-only">Edit {c.label} estimate</span>
                    <span aria-hidden="true">$</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      value={c.value}
                      onChange={(event) =>
                        updateExpense(c.id, event.currentTarget.valueAsNumber)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <aside className="split-panel">
            <p>TRIP-LEVEL ESTIMATE</p>
            <div className="traveler-count">
              <span>TRAVELERS</span>
              <strong>3</strong>
            </div>
            <div className="split-result">
              <span>Estimated cost per person</span>
              <strong>${perPerson.toFixed(2)}</strong>
            </div>
            <div className="subtotals">
              <p>
                <span>Free national park experiences</span>
                <b>Prioritized</b>
              </p>
              <p>
                <span>Groceries</span>
                <b>&gt; restaurant stops</b>
              </p>
              <p>
                <span>Tourist attractions</span>
                <b>Skip expensive ones</b>
              </p>
            </div>
            <div className="budget-callout">
              <ShieldAlert size={19} />
              <div>
                <strong>Keep unnecessary costs low</strong>
                <span>Prioritize hiking, scenery and free activities</span>
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
        detail="Mount LeConte peak hike is confirmed; Saturday trail option and Sunday lodging remain to be finalized."
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
        detail="Alum Cave early parking, ledge hand-cables, summit weather and Sunday lodging need active group coordination."
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
          <strong>Alum Cave &amp; Park Parking:</strong> Great Smoky Mountains National Park requires a $5 daily parking tag per vehicle for any stop over 15 minutes. The Alum Cave Trailhead lot fills very early (by 7:00 AM) on holiday weekends. Plan for a 6:00 AM departure from Cosby.
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
          <a href="#hikes">Hikes &amp; Summits</a>
          <a href="#saturday-selector">Saturday Explorer</a>
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
            Mount LeConte via Alum Cave Trail confirmed for Sunday’s 6,593 ft flagship summit climb, plus 5 researched Saturday trail options ready for group selection.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#hikes">
              View LeConte Climb <ArrowDown size={16} />
            </a>
            <a className="secondary-button" href="#saturday-selector">
              Saturday Hub <span>5 Candidates</span>
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
            Mt. LeConte Confirmed · 5 Saturday Candidates · 1 Airbnb Confirmed
          </p>
        </div>
        <RouteMap />
      </section>
      <section className="stat-strip" aria-label="Trip summary">
        <div>
          <strong>6,593 ft</strong>
          <span>Mt. LeConte Summit</span>
        </div>
        <div>
          <strong>11.0 mi</strong>
          <span>Alum Cave Climb</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Saturday Options</span>
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
