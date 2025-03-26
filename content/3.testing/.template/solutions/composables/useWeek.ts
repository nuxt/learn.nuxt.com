export function useWeek() {
  const yearRef = ref(new Date().getFullYear())
  const weeks = computed(() => calculateWeeks(yearRef.value))

  const currentWeekNumber = computed(() => weeks.value.find(week => week.isCurrentWeek)?.number ?? 0)

  const totalWeeks = computed(() => weeks.value.length)

  const remainingWeeks = computed(() => totalWeeks.value - currentWeekNumber.value)

  const changeYear = (year: number) => {
    yearRef.value = year
  }

  return {
    weeks,
    currentWeekNumber,
    totalWeeks,
    remainingWeeks,
    changeYear,
  }
}
