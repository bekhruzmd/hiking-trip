export type BudgetScenario = 'best' | 'expected' | 'worst';

export type BudgetCategory = {
  id: 'lodging' | 'car_rental' | 'gas' | 'food' | 'parking' | 'miscellaneous' | 'early_check_in';
  label: string;
  best: number;
  expected: number;
  worst: number;
  color: string;
};

export const trip = {
  title: 'Labor Day Mountain Run',
  subtitle: 'Tampa → Great Smoky Mountains → Tampa',
  dateRange: 'Sept 4–7, 2026',
  travelers: 3,
  vehicle: 'Kia Carnival',
  hikes: 2,
  confirmedAirbnbs: 1,
  tbdAirbnbs: 1,
} as const;

export const budgetCategories: BudgetCategory[] = [
  { id: 'lodging', label: 'Lodging', best: 327, expected: 352, worst: 377, color: '#d3c4a8' },
  { id: 'car_rental', label: 'Car rental', best: 194, expected: 220, worst: 240, color: '#90a38d' },
  { id: 'gas', label: 'Gas', best: 170, expected: 200, worst: 240, color: '#738b78' },
  { id: 'food', label: 'Food', best: 200, expected: 275, worst: 350, color: '#cc794f' },
  { id: 'parking', label: 'Parking', best: 10, expected: 20, worst: 40, color: '#a59d91' },
  { id: 'miscellaneous', label: 'Miscellaneous', best: 25, expected: 50, worst: 75, color: '#5d6a62' },
  { id: 'early_check_in', label: 'Optional early check-in', best: 0, expected: 25, worst: 50, color: '#b9875f' },
];

export const routeStops = [
  { marker: 'A', title: 'Tampa', detail: 'Departure · Fri 8:00 PM', x: 20, y: 80 },
  { marker: 'B', title: 'Cosby / Smokies', detail: 'Mountain base', x: 48, y: 38 },
  { marker: 'C', title: 'Saturday Hike (TBD)', detail: 'Saturday · post-drive option', x: 57, y: 45 },
  { marker: 'D', title: 'Mount LeConte', detail: 'Sunday summit · 6,593 ft', x: 69, y: 28 },
  { marker: 'E', title: 'Sunday lodging', detail: 'Location TBD', x: 59, y: 59, placeholder: true },
  { marker: 'F', title: 'Tampa', detail: 'Return · Monday', x: 30, y: 86 },
] as const;

export type SaturdayCandidate = {
  id: string;
  name: string;
  category: string;
  distance: string;
  elevationGain: string;
  time: string;
  difficulty: 'Easy' | 'Moderate';
  driveFromCosby: string;
  highlights: string[];
  description: string;
  pros: string;
  cons: string;
  image: string;
  imageAlt: string;
  trailUrl: string;
  mapUrl: string;
  tag: string;
  recommendedFor: string;
};

export const saturdayCandidates: SaturdayCandidate[] = [
  {
    id: 'hen-wallow',
    name: 'Hen Wallow Falls',
    category: 'Waterfall & Forest',
    distance: '4.3 mi RT',
    elevationGain: '520 ft',
    time: '3–4 hr',
    difficulty: 'Moderate',
    driveFromCosby: '0 min (Cosby Airbnb)',
    highlights: ['90-ft fan waterfall', 'Hemlock & rhododendron forest', 'Cosby Creek crossings'],
    description: 'A quiet, shaded forest trail leading down to a beautiful 90-foot fan waterfall. Starts right at Cosby campground near your Saturday lodging.',
    pros: 'Zero drive time from Airbnb, avoids main park traffic, great post-drive stretch.',
    cons: 'Rock/root trail surface; continuous moderate incline on return.',
    image: '/images/trails/hen-wallow-falls.jpg',
    imageAlt: 'Hen Wallow Falls cascading through forest in the Smokies',
    trailUrl: 'https://www.nps.gov/places/hen-wallow-falls.htm',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hen+Wallow+Falls+Trailhead+Cosby+Tennessee',
    tag: 'Cosby Basecamp Pick',
    recommendedFor: 'Tired legs wanting no driving after Friday night travel',
  },
  {
    id: 'mouse-creek',
    name: 'Mouse Creek Falls & Midnight Hole',
    category: 'Stream & Waterfall',
    distance: '5.7 mi RT',
    elevationGain: '530 ft',
    time: '3–4 hr',
    difficulty: 'Moderate',
    driveFromCosby: '15 min',
    highlights: ['45-ft Mouse Creek Falls', 'Midnight Hole emerald pool', 'Gentle old railroad grade'],
    description: 'Hike along Big Creek on a wide, gentle gravel railroad grade. Features Midnight Hole (a crystal-clear deep emerald swimming hole) and Mouse Creek Falls.',
    pros: 'Super smooth trail grade, scenic river, very low physical fatigue before LeConte.',
    cons: 'Gets popular by midday; parking lot fills around 10 AM.',
    image: '/images/trails/mouse-creek-falls.jpg',
    imageAlt: 'Mouse Creek Falls tumbling into Big Creek with emerald pool',
    trailUrl: 'https://www.nps.gov/grsm/planyourvisit/big-creek.htm',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Big+Creek+Trailhead+Great+Smoky+Mountains',
    tag: 'Most Scenic Water',
    recommendedFor: 'Scenic water views with low gradient leg strain',
  },
  {
    id: 'grotto-falls',
    name: 'Grotto Falls via Trillium Gap',
    category: 'Waterfall Cave',
    distance: '2.6 mi RT',
    elevationGain: '585 ft',
    time: '2–3 hr',
    difficulty: 'Moderate',
    driveFromCosby: '35 min',
    highlights: ['Walk BEHIND the waterfall', 'Roaring Fork scenic drive', 'Old-growth hemlock forest'],
    description: 'The only waterfall in Great Smoky Mountains National Park where you can walk directly behind the cascading wall of water. Accessible via Roaring Fork Motor Nature Trail.',
    pros: 'Unique walk-behind experience, shorter distance leaves time for Gatlinburg/lunch.',
    cons: 'Roaring Fork traffic can be slow on holiday weekend.',
    image: '/images/trails/grotto-falls.jpg',
    imageAlt: 'Hikers walking on trail behind Grotto Falls cascade',
    trailUrl: 'https://www.nps.gov/places/grotto-falls.htm',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grotto+Falls+Trailhead+Roaring+Fork',
    tag: 'Unique Experience',
    recommendedFor: 'Cool breeze & walking behind a waterfall',
  },
  {
    id: 'laurel-falls',
    name: 'Laurel Falls',
    category: 'Paved Waterfall',
    distance: '2.6 mi RT',
    elevationGain: '395 ft',
    time: '1.5–2 hr',
    difficulty: 'Easy',
    driveFromCosby: '45 min',
    highlights: ['80-ft multi-tier waterfall', 'Paved path', 'Cross footbridge over upper/lower falls'],
    description: 'An iconic 80-foot high waterfall split into upper and lower sections by a walkway footbridge. The path is paved, making it easy on recovery legs.',
    pros: 'Easiest trail physically, paved surface, gorgeous waterfall photo spot.',
    cons: 'Highest crowds in the park; requires early parking or reservation planning.',
    image: '/images/trails/laurel-falls.jpg',
    imageAlt: 'Laurel Falls cascading under footbridge in Smokies',
    trailUrl: 'https://www.nps.gov/grsm/planyourvisit/laurel-falls.htm',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Laurel+Falls+Trailhead+Smokies',
    tag: 'Easiest Leg Stretch',
    recommendedFor: 'Maximum recovery & minimal elevation strain',
  },
  {
    id: 'andrews-bald',
    name: 'Andrews Bald via Forney Ridge',
    category: 'High Elevation Bald',
    distance: '3.5 mi RT',
    elevationGain: '900 ft',
    time: '2.5–3.5 hr',
    difficulty: 'Moderate',
    driveFromCosby: '60 min',
    highlights: ['High elevation meadow (5,920 ft)', 'Panoramic mountain ridge views', 'Flame azalea balds'],
    description: 'Starts at the Kuwohi (Clingmans Dome) parking area and descends along Forney Ridge to open high-elevation grassy balds with expansive valley views.',
    pros: 'Incredible ridge panoramas, cool high-elevation air, previews Sunday region.',
    cons: 'Rock stairs on return climb; 1 hr drive from Cosby.',
    image: '/images/trails/andrews-bald.jpg',
    imageAlt: 'Panoramic high elevation grassy bald with azaleas overlooking Smoky Mountain ridges',
    trailUrl: 'https://www.nps.gov/grsm/planyourvisit/andrews-bald.htm',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Forney+Ridge+Trailhead+Clingmans+Dome',
    tag: 'Best Ridge Views',
    recommendedFor: 'Huge high-mountain panoramic views without climbing LeConte early',
  },
];
