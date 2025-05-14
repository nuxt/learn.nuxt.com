export interface Week {
  number: number
  weekStart: Date
  weekEnd: Date
  isCurrentWeek: boolean
}

// Function to calculate weeks with start and end dates
// This function calculates all weeks for a given year and returns an array of Week objects
// Each Week object contains:
// - number: The week number (1-53)
// - weekStart: Date object for the start of week (Jan 1st for first week)
// - weekEnd: Date object for end of week (Dec 31st for last week)
// - isCurrentWeek: Boolean indicating if this is the current week
export function calculateWeeks(year: number): Week[] {
  const today = new Date() // Get current date for comparing current week
  const weeks: Week[] = []

  // Start from January 1st of the selected year
  const date = new Date(year, 0, 1)

  // Calculate weeks by iterating through the year
  let weekNumber = 1
  while (date.getFullYear() === year) {
    // Start of week is the current date
    const weekStart = new Date(date)

    // Move date to the end of the week (next Sunday)
    // For first week, this could be less than 7 days if year starts mid-week
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7))

    // Handle edge case for year boundary
    const weekEnd
      = date.getFullYear() !== year
        ? new Date(year, 11, 31, 23, 59, 59) // December 31st 23:59:59
        : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

    // Check if this week contains today's date
    const isCurrentWeek = today >= weekStart && today <= weekEnd

    // Add the week to our array
    weeks.push({ number: weekNumber, weekStart, weekEnd, isCurrentWeek })

    // Move to start of next week
    date.setDate(date.getDate() + 1)
    weekNumber++
  }

  return weeks
}
