import { useWeek } from './useWeek'

describe('useWeek', () => {
  beforeEach(() => {
    // Mock the current date to a fixed value for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-03-14'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with current year', () => {
    const { weeks, currentWeekNumber, totalWeeks } = useWeek()

    expect(weeks.value.length).toBeGreaterThan(0)
    expect(currentWeekNumber.value).toBe(11) // Week 11 in March 14, 2024
    expect(totalWeeks.value).toBe(53)
  })

  it('calculates remaining weeks correctly', () => {
    const { remainingWeeks, currentWeekNumber, totalWeeks } = useWeek()

    expect(remainingWeeks.value).toBe(totalWeeks.value - currentWeekNumber.value)
  })

  it('changes year correctly', () => {
    const { changeYear, weeks, currentWeekNumber } = useWeek()

    // Change to previous year
    changeYear(2023)
    expect(weeks.value.length).toBe(53)

    expect(currentWeekNumber.value).toBe(0)
  })

  it('handles leap years correctly', () => {
    const { changeYear, weeks } = useWeek()

    // 2024 is a leap year
    changeYear(2024)
    expect(weeks.value.length).toBe(53)

    // 2025 is not a leap year
    changeYear(2025)
    expect(weeks.value.length).toBe(53)
  })
})
