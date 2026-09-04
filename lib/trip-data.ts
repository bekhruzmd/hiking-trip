export type BudgetScenario = 'best' | 'expected' | 'high';

export type BudgetCategory = {
  id:
    | 'car_rental'
    | 'lodging'
    | 'gas'
    | 'food'
    | 'parking'
    | 'miscellaneous'
    | 'early_check_in';
  label: string;
  best: number;
  expected: number;
  high: number;
  color: string;
  pending?: boolean;
};

export const trip = {
  title: 'Labor Day Mountain Run',
  subtitle: 'Tampa → Great Smoky Mountains → Tampa',
  dateRange: 'Sept 4–7, 2026',
  travelers: 3,
  vehicle: 'Toyota Camry Hybrid',
  summit: '6,643 ft',
  hotelAddress: '4236 Parkway, Pigeon Forge, TN 37863',
} as const;

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'car_rental',
    label: 'Toyota Camry Hybrid rental',
    best: 0,
    expected: 0,
    high: 0,
    color: '#90a38d',
    pending: true,
  },
  {
    id: 'lodging',
    label: 'Pigeon Forge lodging',
    best: 0,
    expected: 0,
    high: 0,
    color: '#d3c4a8',
    pending: true,
  },
  {
    id: 'gas',
    label: 'Gas',
    best: 80,
    expected: 110,
    high: 140,
    color: '#738b78',
  },
  {
    id: 'food',
    label: 'Food for 3',
    best: 100,
    expected: 150,
    high: 220,
    color: '#cc794f',
  },
  {
    id: 'parking',
    label: 'Parking',
    best: 10,
    expected: 15,
    high: 20,
    color: '#a59d91',
  },
  {
    id: 'miscellaneous',
    label: 'Miscellaneous',
    best: 0,
    expected: 10,
    high: 30,
    color: '#5d6a62',
  },
  {
    id: 'early_check_in',
    label: 'Early check-in',
    best: 0,
    expected: 0,
    high: 0,
    color: '#b9875f',
  },
];

export const routeStops = [
  {
    marker: 'A',
    title: 'Tampa, FL',
    detail: 'Fri · 8:00 PM departure',
    x: 18,
    y: 84,
  },
  {
    marker: 'B',
    title: 'Kuwohi',
    detail: 'Saturday sunrise attempt',
    x: 51,
    y: 31,
  },
  {
    marker: 'C',
    title: '4236 Parkway',
    detail: 'Pigeon Forge hotel',
    x: 63,
    y: 48,
  },
  {
    marker: 'D',
    title: 'Andrews Bald',
    detail: 'Saturday sunset',
    x: 72,
    y: 27,
  },
  {
    marker: 'E',
    title: 'Trailhead TBD',
    detail: 'Sunday ascent start',
    x: 44,
    y: 48,
    placeholder: true,
  },
  {
    marker: 'F',
    title: 'Kuwohi Summit',
    detail: 'Sunday · 6,643 ft',
    x: 55,
    y: 20,
  },
  {
    marker: 'G',
    title: 'Pigeon Forge',
    detail: 'Sunday recovery',
    x: 67,
    y: 55,
  },
  { marker: 'H', title: 'Tampa', detail: 'Monday return', x: 28, y: 90 },
] as const;
