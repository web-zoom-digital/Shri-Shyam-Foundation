/**
 * Single source of truth for general (non-cow) donation amounts & impact copy.
 * Keep Home Quick Donate, /donate, and /impact in sync via this file.
 */

export const MEAL_UNIT_COST = 101

export type DonationOption = {
  amount: number
  label: string
  impact: string
  /** Approx. meals when the gift is meal-focused; null for non-meal packages */
  meals: number | null
}

/** User-friendly NGO presets — auspicious amounts ending in 1 */
export const GENERAL_DONATION_OPTIONS: DonationOption[] = [
  {
    amount: 101,
    label: "One Meal",
    impact: "Provides one hot, nutritious meal for a person in need",
    meals: 1,
  },
  {
    amount: 501,
    label: "Family Day",
    impact: "Feeds a family of four for one full day",
    meals: 5,
  },
  {
    amount: 1001,
    label: "10 Meals",
    impact: "Sponsors about 10 nutritious meals at our food drives",
    meals: 10,
  },
  {
    amount: 2501,
    label: "Child Support",
    impact: "Supports one child's school essentials for a month",
    meals: null,
  },
  {
    amount: 5001,
    label: "Kitchen Half-Day",
    impact: "Helps run our community kitchen for half a day",
    meals: null,
  },
  {
    amount: 10001,
    label: "Community Drive",
    impact: "Helps organise a community food or medical outreach day",
    meals: null,
  },
]

export const GENERAL_PRESET_AMOUNTS = GENERAL_DONATION_OPTIONS.map((o) => o.amount)

export const GENERAL_IMPACT_MAP: Record<number, string> = Object.fromEntries(
  GENERAL_DONATION_OPTIONS.map((o) => [o.amount, o.impact])
)

export function getDonationOption(amount: number): DonationOption | undefined {
  return GENERAL_DONATION_OPTIONS.find((o) => o.amount === amount)
}

export function estimateMeals(amount: number): number {
  if (amount <= 0) return 0
  const known = getDonationOption(amount)
  if (known?.meals != null) return known.meals
  return Math.max(1, Math.floor(amount / MEAL_UNIT_COST))
}

export function formatInr(amount: number): string {
  return amount.toLocaleString("en-IN")
}
