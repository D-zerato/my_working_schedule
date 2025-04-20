import dayjs from 'dayjs'

export function getWeekNumber(date: Date): number {
    const d = dayjs(date)
    const firstDay = d.startOf('month')
    const offset = firstDay.day() === 0 ? 7 : firstDay.day()
    const diff = d.date() + offset - 2
    return Math.floor(diff / 7) + 1
}

export function formatDate(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD')
}

export function getToday(): string {
    return formatDate(dayjs().toDate())
}