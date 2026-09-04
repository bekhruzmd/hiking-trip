'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  BedDouble,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  Clock,
  CloudSun,
  Copy,
  ExternalLink,
  Footprints,
  Home,
  MapPin,
  MapPinned,
  Moon,
  Mountain,
  ParkingCircle,
  Route,
  ShieldAlert,
  Sunrise,
  Sunset,
  Trees,
  Users,
  X,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  budgetCategories,
  BudgetScenario,
  routeStops,
  trip,
} from '@/lib/trip-data';

const money = (value: number) =>
  value.toLocaleString('en-US', { maximumFractionDigits: 0 });
const budgetScenarios: BudgetScenario[] = ['best', 'expected', 'high'];
const hotelMap =
  'https://www.google.com/maps/search/?api=1&query=4236+Parkway+Pigeon+Forge+TN+37863';
const kuwohiMap =
  'https://www.google.com/maps/search/?api=1&query=Kuwohi+Observation+Tower+Great+Smoky+Mountains';

const days = [
  {
    day: 'FRI',
    date: 'SEP 04',
    title: 'The Night Drive',
    label: 'Tampa → Tennessee',
    tone: 'night',
    items: [
      ['8:00 PM', 'Leave Tampa', '3 travelers · Toyota Camry Hybrid', CarFront],
      [
        'OVERNIGHT',
        'Highway drive north',
        'Driver rotations · gas and bathroom stops',
        Moon,
      ],
      [
        'PASSENGERS',
        'Sleep and rest',
        'Pillows, blankets and eye masks',
        BedDouble,
      ],
      [
        '6–8 AM',
        'Expected Pigeon Forge area arrival',
        'Approximate only · never speed to make sunrise',
        Sunrise,
      ],
    ],
  },
  {
    day: 'SAT',
    date: 'SEP 05',
    title: 'Sunrise → Recovery → Sunset',
    label: 'Kuwohi / Pigeon Forge / Andrews Bald',
    tone: 'sunset',
    items: [
      [
        'BEST EFFORT',
        'Kuwohi sunrise',
        'Only if timing, weather and conditions allow',
        Sunrise,
      ],
      [
        'LATE MORNING',
        'Return to 4236 Parkway',
        'Ask for free early check-in around noon',
        Home,
      ],
      [
        'MIDDAY',
        'Sleep / recovery',
        'Rest is part of the itinerary',
        BedDouble,
      ],
      [
        'EVENING',
        'Andrews Bald via Forney Ridge',
        'Relaxed sunset hike · headlamp return',
        Sunset,
      ],
    ],
  },
  {
    day: 'SUN',
    date: 'SEP 06',
    title: 'The Summit Day',
    label: 'Real mountain ascent → Kuwohi',
    tone: 'forest',
    items: [
      [
        'MORNING',
        'Breakfast + selected trailhead',
        'Exact route and trailhead remain TBD',
        Route,
      ],
      [
        'BIG HIKE',
        'Legitimate climb from lower elevation',
        'Scenic, challenging and realistic as a day hike',
        Footprints,
      ],
      [
        '6,643 FT',
        'Reach Kuwohi Summit',
        'Observation tower · photos · rest · scenery',
        Mountain,
      ],
      ['AFTER HIKE', 'Descend + recover', 'Food, hotel and rest', Home],
    ],
  },
  {
    day: 'MON',
    date: 'SEP 07',
    title: 'Homebound',
    label: 'Pigeon Forge → Tampa',
    tone: 'return',
    items: [
      [
        'MORNING',
        'Breakfast, shower and pack',
        'No hike · calm departure morning',
        Home,
      ],
      ['10:00 AM', 'Depart Pigeon Forge', 'Toyota Camry Hybrid', CarFront],
      [
        'DAYTIME',
        'Road trip south',
        'No major detours unless added later',
        Route,
      ],
      ['HOME', 'Arrive in Tampa', 'Trip complete', CheckCircle2],
    ],
  },
] as const;

const packing = [
  '3 headlamps',
  'Hiking shoes',
  'Water / hydration',
  'Electrolytes',
  'Trail food',
  'Rain jackets',
  'Warm layers',
  'Windbreakers',
  'Power banks',
  'Offline maps',
  'First-aid kit',
  'Sunscreen',
  'Bug spray',
  'Extra socks',
  'Change of clothes',
  'Toiletries',
  'Car chargers',
  'Optional gloves',
  '2–3L water per person for Sunday',
  'Substantial summit snacks',
  'Pillows',
  'Blankets',
  'Comfortable drive clothes',
  'Eye masks',
];

const alerts = [
  ['Overnight drive', 'Do not speed to make sunrise.', Moon],
  ['Sunrise', 'Weather and arrival-time dependent.', Sunrise],
  ['Early check-in', 'Not guaranteed. Ask for free access around noon.', Clock],
  ['Recovery', 'Saturday rest is mandatory.', BedDouble],
  ['Kuwohi parking', 'Labor Day weekend may be extremely busy.', ParkingCircle],
  [
    'Parking tag',
    '$5 per day per vehicle when parked longer than 15 minutes.',
    ShieldAlert,
  ],
  ['Andrews Bald', 'The return is uphill and will be after dark.', Footprints],
  [
    'Headlamps',
    'One real headlamp per traveler; do not rely on phone flashlights.',
    Moon,
  ],
  ['Sunday route', 'The ascent route and trailhead are not finalized.', Route],
  [
    'Kuwohi weather',
    'High elevation can be colder, windier, wetter and foggier.',
    CloudSun,
  ],
] as const;

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
      aria-label="Route from Tampa through Kuwohi, Pigeon Forge and Andrews Bald, then back to Tampa"
    >
      <div className="map-topline">
        <span>
          <MapPinned size={15} /> Active trip route
        </span>
        <span className="approx-label">APPROXIMATE</span>
      </div>
      <svg
        className="route-svg"
        viewBox="0 0 100 100"
        aria-label="Eight-stop Smokies route"
      >
        <title>Eight-stop Great Smoky Mountains route</title>
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
          d="M18 84 C30 69 41 43 51 31 C58 40 64 47 63 48 C67 40 70 31 72 27 C62 38 50 44 44 48 C47 36 52 25 55 20 C60 35 65 49 67 55 C54 72 42 84 28 90"
        />
        <path
          className="route-line"
          d="M18 84 C30 69 41 43 51 31 C58 40 64 47 63 48 C67 40 70 31 72 27 C62 38 50 44 44 48 C47 36 52 25 55 20 C60 35 65 49 67 55 C54 72 42 84 28 90"
        />
        <path className="route-placeholder" d="M44 48 C48 38 52 27 55 20" />
      </svg>
      {routeStops.map((stop) => (
        <div
          className={`route-stop stop-${stop.marker.toLowerCase()} ${'placeholder' in stop ? 'placeholder' : ''}`}
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
          <Mountain size={13} /> 6,643-ft summit
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
            {day.items.map(([time, title, meta, Icon], i) => (
              <div className="event" key={title}>
                <span className="event-icon">
                  <Icon size={15} />
                </span>
                <div>
                  <time>{time}</time>
                  <strong>{title}</strong>
                  <small>{meta}</small>
                </div>
                {i < day.items.length - 1 && <span className="event-line" />}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function SaturdayStory() {
  const phases = [
    {
      time: 'MORNING',
      title: 'Kuwohi sunrise',
      text: 'Drive to the parking area, walk about 0.5 mile uphill to the observation tower, and catch early mountain views if timing and weather cooperate.',
      icon: Sunrise,
      tone: 'morning',
    },
    {
      time: 'MIDDAY',
      title: 'Recovery + hotel gap',
      text: 'Return to 4236 Parkway. Ask for free early check-in around noon. If unavailable, rest in the Camry only where legal and safe, eat cheaply and hydrate.',
      icon: BedDouble,
      tone: 'midday',
    },
    {
      time: 'EVENING',
      title: 'Andrews Bald sunset',
      text: 'Descend 1.8 miles on Forney Ridge, relax at the bald, then climb uphill after dark with real headlamps.',
      icon: Sunset,
      tone: 'evening',
    },
  ];
  return (
    <section className="content-section" id="saturday">
      <SectionHead
        eyebrow="02 · SATURDAY VISUAL STORY"
        title="Sunrise. Recovery. Sunset."
        detail="One full day in three deliberate phases. Rest is part of the itinerary."
      />
      <div className="story-flow">
        {phases.map(({ time, title, text, icon: Icon, tone }, index) => (
          <article className={`story-phase ${tone}`} key={title}>
            <span className="story-number">0{index + 1}</span>
            <Icon size={24} />
            <small>{time}</small>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="sunrise-note">
        <Sunrise size={19} />
        <div>
          <strong>SUNRISE · BEST EFFORT</strong>
          <span>
            Only if timing and conditions allow. Never speed. The tower and park
            entrance are free; a $5/day parking tag applies for stops over 15
            minutes.
          </span>
        </div>
      </div>
      <div className="hotel-grid">
        <article className="hotel-card">
          <p className="section-kicker">CONFIRMED LODGING</p>
          <h3>4236 Parkway</h3>
          <p>Pigeon Forge, TN 37863</p>
          <a href={hotelMap} target="_blank" rel="noreferrer">
            Open hotel map <ExternalLink size={14} />
          </a>
        </article>
        <article className="checkin-card">
          <div>
            <span>EARLY CHECK-IN</span>
            <strong>UNCONFIRMED</strong>
          </div>
          <dl>
            <div>
              <dt>Expected hotel access</dt>
              <dd>4:00 PM</dd>
            </div>
            <div>
              <dt>Preferred</dt>
              <dd>Free · around noon</dd>
            </div>
            <div>
              <dt>Acceptable</dt>
              <dd>Very small fee only</dd>
            </div>
            <div>
              <dt>Avoid</dt>
              <dd>Expensive early check-in</dd>
            </div>
          </dl>
          <blockquote>
            “We drove overnight from Tampa and arrived early. If the room is
            already clean and available, would a free early check-in around noon
            be possible?”
          </blockquote>
        </article>
      </div>
      <div className="schedule-card">
        {[
          ['4:00 PM', 'Hotel access if not already checked in'],
          ['4:00–4:30', 'Shower · change · unload'],
          ['~4:30–5:00', 'Leave hotel'],
          ['~6:00', 'Target Kuwohi parking'],
          ['~6:10', 'Start Forney Ridge Trail'],
          ['~7:00–7:15', 'Reach Andrews Bald'],
          ['LATE 7 PM', 'Approximate sunset'],
          ['~9:15–9:30', 'Target return to parking'],
        ].map(([time, title]) => (
          <div key={title}>
            <span>{time}</span>
            <strong>{title}</strong>
          </div>
        ))}
        <p>Approximate — weather / parking / traffic dependent.</p>
      </div>
    </section>
  );
}

function SummitPlan() {
  return (
    <section className="summit-section" id="sunday">
      <div className="content-section summit-inner">
        <div className="summit-copy">
          <p className="section-kicker">03 · SUNDAY CENTERPIECE</p>
          <span className="planning-badge">
            <Route size={14} /> SUNDAY ROUTE · PLANNING IN PROGRESS
          </span>
          <h2>Earn the summit.</h2>
          <p>
            This is a real mountain ascent from lower elevation—not a drive to
            the summit lot. The exact safe, practical route has not been
            selected yet.
          </p>
          <div className="summit-sequence">
            <span>REAL MOUNTAIN ASCENT</span>
            <ArrowDown size={18} />
            <span>KUWOHI SUMMIT</span>
            <ArrowDown size={18} />
            <strong>6,643 FT</strong>
            <ArrowDown size={18} />
            <span>OBSERVATION TOWER</span>
          </div>
        </div>
        <div className="elevation-panel">
          <div className="summit-marker">
            <Mountain size={30} />
            <strong>6,643 FT</strong>
            <span>KUWOHI SUMMIT</span>
          </div>
          <svg
            viewBox="0 0 600 260"
            aria-label="Conceptual elevation profile ending at Kuwohi summit"
          >
            <title>Conceptual elevation profile ending at Kuwohi summit</title>
            <path
              className="elevation-fill"
              d="M0 250 L0 225 C90 220 110 190 170 184 C240 178 250 142 320 136 C395 129 420 80 485 71 C535 64 556 28 600 18 L600 260 Z"
            />
            <path
              className="elevation-line"
              d="M0 225 C90 220 110 190 170 184 C240 178 250 142 320 136 C395 129 420 80 485 71 C535 64 556 28 600 18"
            />
          </svg>
        </div>
        <div className="route-status-grid">
          {[
            ['ROUTE', 'TBD'],
            ['TRAILHEAD', 'TBD'],
            ['DISTANCE', 'TBD'],
            ['ELEVATION GAIN', 'TBD'],
            ['ESTIMATED TIME', 'TBD'],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="route-goals">
          <strong>DESIRED ROUTE CHARACTERISTICS</strong>
          <span>Legitimate lower-elevation climb</span>
          <span>Scenic + challenging</span>
          <span>Realistic day hike</span>
          <span>Ideally 7–11 miles</span>
          <span>Roughly 2,000–3,000 ft climbing</span>
          <span>Approximately 5–7 hours</span>
          <span>No 15–20+ mile sufferfest</span>
        </div>
        <div className="day-chain">
          Wake up <ArrowDown /> Breakfast <ArrowDown /> Selected trailhead{' '}
          <ArrowDown /> Big summit hike <ArrowDown /> Kuwohi <ArrowDown />{' '}
          Photos + rest <ArrowDown /> Descend <ArrowDown /> Food + hotel
        </div>
      </div>
    </section>
  );
}

function Lodging() {
  return (
    <section className="content-section" id="hotel">
      <SectionHead
        eyebrow="04 · PIGEON FORGE BASE"
        title="One confirmed home base."
        detail="Normal access begins at 4 PM Saturday. Earlier room access is a request, not a promise."
      />
      <div className="lodging-single">
        <div>
          <MapPin size={28} />
          <span>CONFIRMED</span>
          <h3>4236 Parkway</h3>
          <p>Pigeon Forge, TN 37863</p>
        </div>
        <div>
          <span>NORMAL CHECK-IN</span>
          <strong>4:00 PM SATURDAY</strong>
          <small>Expected arrival in the area: approximately 6–8 AM</small>
        </div>
        <a href={hotelMap} target="_blank" rel="noreferrer">
          Open hotel map <ExternalLink size={15} />
        </a>
      </div>
    </section>
  );
}

function DecisionStatus() {
  const confirmed = [
    '3 travelers',
    'Toyota Camry Hybrid',
    'Friday 8 PM departure',
    'Pigeon Forge lodging',
    '4236 Parkway',
    'Saturday 4 PM normal check-in',
    'Saturday Kuwohi sunrise attempt',
    'Saturday Andrews Bald sunset',
    'Sunday = real Kuwohi summit hike',
    'Monday 10 AM departure for Tampa',
    'No Virginia',
  ];
  const open = [
    'Free early check-in',
    'Legal Saturday rest/sleep location if early check-in fails',
    'Exact Sunday Kuwohi ascent route',
    'Exact Camry rental total',
    'Exact lodging total',
    'Final gas estimate',
  ];
  return (
    <section className="content-section decision-section" id="decisions">
      <SectionHead
        eyebrow="05 · DECISION STATUS"
        title="What’s locked. What still moves."
        detail="The shape of the weekend is final. Only practical cost and route details remain open."
      />
      <div className="decision-grid">
        <article className="decision-card confirmed">
          <div className="decision-title">
            <CheckCircle2 size={18} />
            <div>
              <span>CONFIRMED</span>
              <strong>{confirmed.length} decisions locked</strong>
            </div>
          </div>
          <ul>
            {confirmed.map((item) => (
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
              <strong>{open.length} items to resolve</strong>
            </div>
          </div>
          <ul>
            {open.map((item) => (
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

function Budget() {
  const [scenario, setScenario] = useState<BudgetScenario>('expected');
  const [values, setValues] = useState(
    () =>
      Object.fromEntries(
        budgetScenarios.map((name) => [
          name,
          Object.fromEntries(budgetCategories.map((c) => [c.id, c[name]])),
        ]),
      ) as Record<BudgetScenario, Record<string, number>>,
  );
  const categories = useMemo(
    () =>
      budgetCategories.map((c) => ({ ...c, value: values[scenario][c.id] })),
    [scenario, values],
  );
  const totals = useMemo(
    () =>
      Object.fromEntries(
        budgetScenarios.map((name) => [
          name,
          Object.values(values[name]).reduce((sum, value) => sum + value, 0),
        ]),
      ) as Record<BudgetScenario, number>,
    [values],
  );
  const total = totals[scenario];
  const incomplete = categories.some((c) => c.pending && c.value === 0);
  const update = (id: string, value: number) =>
    setValues((current) => ({
      ...current,
      [scenario]: {
        ...current[scenario],
        [id]: Math.max(0, Number.isFinite(value) ? value : 0),
      },
    }));
  return (
    <section className="budget-section" id="budget">
      <div className="content-section budget-inner">
        <SectionHead
          eyebrow="06 · TRIP BUDGET"
          title="Shared trip costs only."
          detail="Rental and lodging are still TBD. Edit each scenario as quotes are finalized; early check-in starts at $0."
        />
        <fieldset className="scenario-bar">
          <legend className="sr-only">Budget scenario</legend>
          {budgetScenarios.map((name) => (
            <button
              className={scenario === name ? 'active' : ''}
              onClick={() => setScenario(name)}
              key={name}
            >
              {name}
              <span>${money(totals[name])}+</span>
            </button>
          ))}
        </fieldset>
        <div className="budget-dashboard">
          <div className="budget-main">
            <div className="budget-numbers">
              <div>
                <span>TOTAL TRIP COST</span>
                <strong>
                  ${money(total)}
                  {incomplete ? '+' : ''}
                </strong>
                <small>
                  {incomplete
                    ? 'Known estimates · rental and lodging still TBD'
                    : `${scenario} estimate`}
                </small>
              </div>
              <div>
                <span>COST PER PERSON</span>
                <strong>
                  ${(total / 3).toFixed(2)}
                  {incomplete ? '+' : ''}
                </strong>
                <small>Total trip cost ÷ 3</small>
              </div>
            </div>
            <div className="stacked-bar">
              {categories.map((c) => (
                <span
                  key={c.id}
                  style={{
                    width: `${total ? (c.value / total) * 100 : 0}%`,
                    background: c.color,
                  }}
                />
              ))}
            </div>
            <div className="cost-list">
              {categories.map((c) => (
                <div key={c.id}>
                  <span>
                    <i style={{ background: c.color }} />
                    {c.label}
                    <em>{c.pending && c.value === 0 ? 'TBD' : 'EDITABLE'}</em>
                  </span>
                  <label className="expense-input">
                    <span className="sr-only">Edit {c.label}</span>
                    <span aria-hidden="true">$</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      value={c.value}
                      onChange={(event) =>
                        update(c.id, event.currentTarget.valueAsNumber)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <aside className="split-panel">
            <p>PUBLIC TRIP ESTIMATE</p>
            <div className="traveler-count">
              <span>TRAVELERS</span>
              <strong>3</strong>
            </div>
            <div className="split-result">
              <span>Approximate cost per person</span>
              <strong>${(total / 3).toFixed(2)}+</strong>
            </div>
            <div className="subtotals">
              <p>
                <span>Park entrance</span>
                <b>Free</b>
              </p>
              <p>
                <span>Parking tag</span>
                <b>$5/day</b>
              </p>
              <p>
                <span>Early check-in default</span>
                <b>$0</b>
              </p>
            </div>
            <div className="budget-callout">
              <ShieldAlert size={19} />
              <div>
                <strong>Keep unnecessary costs low</strong>
                <span>Hiking, scenery and groceries first</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Logistics() {
  return (
    <section className="content-section" id="logistics">
      <SectionHead
        eyebrow="07 · SAFETY & LOGISTICS"
        title="The details that protect the weekend."
        detail="Timing is flexible. Safety, recovery and reliable equipment are not."
      />
      <div className="alert-grid">
        {alerts.map(([title, text, Icon]) => (
          <article className="alert-card" key={title}>
            <div className="alert-icon">
              <Icon size={19} />
            </div>
            <div>
              <div className="alert-top">
                <h3>{title}</h3>
                <span>IMPORTANT</span>
              </div>
              <p>{text}</p>
            </div>
          </article>
        ))}
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
        localStorage.getItem('mountain-run-packing') || '[]',
      ) as string[];
      queueMicrotask(() =>
        setChecked(saved.filter((item) => packing.includes(item))),
      );
    } catch {}
    queueMicrotask(() => setLoaded(true));
  }, []);
  useEffect(() => {
    if (loaded)
      localStorage.setItem('mountain-run-packing', JSON.stringify(checked));
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
            <p className="section-kicker">08 · PACKING</p>
            <h2>
              Ready means {packing.length}/{packing.length}.
            </h2>
            <p>Headlamps, layers and water are mission-critical.</p>
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
              className={checked.includes(item) ? 'checked' : ''}
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

function QuickActions() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    await navigator.clipboard.writeText(trip.hotelAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <nav className="quick-actions" aria-label="Trip quick actions">
      <a href={hotelMap} target="_blank" rel="noreferrer">
        <MapPin />
        Open hotel map
      </a>
      <a href={kuwohiMap} target="_blank" rel="noreferrer">
        <Mountain />
        Open Kuwohi map
      </a>
      <a href="#saturday">
        <Sunset />
        Saturday plan
      </a>
      <a href="#sunday">
        <Footprints />
        Sunday plan
      </a>
      <a href="#packing">
        <Check />
        Packing list
      </a>
      <a href="#budget">
        <span>$</span>Budget
      </a>
      <button onClick={copyAddress}>
        <Copy />
        {copied ? 'Address copied' : 'Copy hotel address'}
      </button>
    </nav>
  );
}

export default function HomePage() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Mountain size={17} />
          </span>
          <span>
            Mountain Run <small>LDW ’26</small>
          </span>
        </a>
        <nav>
          <a href="#itinerary">Itinerary</a>
          <a href="#saturday">Saturday</a>
          <a href="#sunday">Summit</a>
          <a href="#hotel">Hotel</a>
          <a href="#budget">Budget</a>
          <a href="#packing">Packing</a>
        </nav>
        <button
          className="theme-button"
          onClick={() => setDark((value) => !value)}
          aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
        >
          <Moon size={16} />
          <span>{dark ? 'Dark' : 'Light'}</span>
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
            Three friends. One overnight drive. Kuwohi sunrise, Andrews Bald
            sunset, and a real 6,643-ft summit ascent.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#itinerary">
              View final plan <ArrowDown size={16} />
            </a>
            <a className="secondary-button" href="#sunday">
              Summit plan <span>Route TBD</span>
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
              <dd>3 travelers</dd>
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
            Kuwohi Sunrise · Andrews Bald Sunset · Kuwohi Summit Hike · 6,643 FT
          </p>
        </div>
        <RouteMap />
      </section>
      <section className="stat-strip">
        <div>
          <strong>3</strong>
          <span>Travelers</span>
        </div>
        <div>
          <strong>6,643 ft</strong>
          <span>Summit</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Sunrise</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Sunset</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Big summit hike</span>
        </div>
      </section>
      <QuickActions />
      <section className="content-section" id="itinerary">
        <SectionHead
          eyebrow="01 · FINAL ITINERARY"
          title="Four days. One mountain story."
          detail="Tampa Friday at 8 PM. Pigeon Forge and the Smokies all weekend. Homebound Monday at 10 AM."
        />
        <Timeline />
      </section>
      <SaturdayStory />
      <SummitPlan />
      <Lodging />
      <DecisionStatus />
      <Budget />
      <Logistics />
      <Packing />
      <footer>
        <div>
          <span className="brand-mark">
            <Trees size={15} />
          </span>
          <p>
            <strong>Labor Day Mountain Run</strong>
            <small>Great Smoky Mountains · 2026</small>
          </p>
        </div>
        <p>Timing is approximate. Safety and recovery come first.</p>
      </footer>
    </main>
  );
}
