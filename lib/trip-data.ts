export type BudgetScenario = 'best' | 'expected' | 'worst';

export type BudgetCategory = {
  id: 'vehicle' | 'lodging' | 'gas' | 'food' | 'parking' | 'supplies';
  label: string;
  best: number;
  expected: number;
  worst: number;
  color: string;
};

export const trip = {
  title: 'Labor Day Mountain Run',
  subtitle: 'Tampa → Smokies → McAfee Knob → Tampa',
  dateRange: 'Sept 4–7, 2026',
  travelers: 5,
  vehicle: 'Kia Carnival',
  hikes: 2,
  airbnbs: 2,
  routeMiles: '1,700+',
} as const;

export const budgetCategories: BudgetCategory[] = [
  { id: 'vehicle', label: 'Kia Carnival', best: 194, expected: 210, worst: 240, color: '#90a38d' },
  { id: 'lodging', label: 'Lodging', best: 375.19, expected: 375.19, worst: 375.19, color: '#d3c4a8' },
  { id: 'gas', label: 'Gas', best: 200, expected: 225, worst: 250, color: '#738b78' },
  { id: 'food', label: 'Food', best: 200, expected: 275, worst: 350, color: '#cc794f' },
  { id: 'parking', label: 'Parking + tolls', best: 15, expected: 25, worst: 40, color: '#a59d91' },
  { id: 'supplies', label: 'Misc. supplies', best: 25, expected: 26, worst: 75, color: '#5d6a62' },
];

export const scenarioTotals: Record<BudgetScenario, number> = { best: 1009.19, expected: 1143.19, worst: 1330.19 };

export const routeStops = [
  { marker: 'A', title: 'Tampa', detail: 'Departure · Fri 8:00 PM', x: 20, y: 80 },
  { marker: 'B', title: 'Great Smoky Mountains', detail: 'Alum Cave Bluffs', x: 47, y: 43 },
  { marker: 'C', title: 'McAfee Knob', detail: 'Sunset hike', x: 75, y: 23 },
  { marker: 'D', title: 'Roanoke', detail: 'Sunday night', x: 84, y: 38 },
  { marker: 'E', title: 'Tampa', detail: 'Return · Monday', x: 30, y: 86 },
] as const;
