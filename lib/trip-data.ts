export type BudgetScenario = 'best' | 'expected' | 'worst';

export type BudgetCategory = {
  id: 'vehicle' | 'saturday_lodging' | 'sunday_lodging' | 'gas' | 'food' | 'parking' | 'supplies';
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
  travelers: 5,
  vehicle: 'Kia Carnival',
  hikes: 2,
  confirmedAirbnbs: 1,
  tbdAirbnbs: 1,
} as const;

export const budgetCategories: BudgetCategory[] = [
  { id: 'vehicle', label: 'Kia Carnival', best: 194, expected: 220, worst: 240, color: '#90a38d' },
  { id: 'saturday_lodging', label: 'Saturday Airbnb', best: 177, expected: 177, worst: 177, color: '#d3c4a8' },
  { id: 'sunday_lodging', label: 'Sunday Airbnb', best: 150, expected: 175, worst: 200, color: '#b6aa93' },
  { id: 'gas', label: 'Gas', best: 170, expected: 200, worst: 240, color: '#738b78' },
  { id: 'food', label: 'Food', best: 200, expected: 275, worst: 350, color: '#cc794f' },
  { id: 'parking', label: 'Parking + tolls', best: 10, expected: 20, worst: 40, color: '#a59d91' },
  { id: 'supplies', label: 'Misc. supplies', best: 25, expected: 50, worst: 75, color: '#5d6a62' },
];

export const scenarioTotals: Record<BudgetScenario, number> = { best: 926, expected: 1117, worst: 1322 };

export const routeStops = [
  { marker: 'A', title: 'Tampa', detail: 'Departure · Fri 8:00 PM', x: 20, y: 80 },
  { marker: 'B', title: 'Cosby / Smokies', detail: 'Mountain base', x: 48, y: 38 },
  { marker: 'C', title: 'Hen Wallow Falls', detail: 'Saturday · recovery hike', x: 57, y: 45 },
  { marker: 'D', title: 'Kuwohi', detail: 'Sunday · 6,643 ft', x: 69, y: 28 },
  { marker: 'E', title: 'Sunday lodging', detail: 'Location TBD', x: 59, y: 59, placeholder: true },
  { marker: 'F', title: 'Tampa', detail: 'Return · Monday', x: 30, y: 86 },
] as const;
