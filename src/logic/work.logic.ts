import {DailyWorkEntry, WorkRecord} from '../atoms/work.atom'
import dayjs from 'dayjs'

export function getDiffMinutes(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    let startMinutes = sh * 60 + sm
    let endMinutes = eh * 60 + em
    if (endMinutes < startMinutes) endMinutes += 24 * 60
    return endMinutes - startMinutes
}

export function calculateTotalWorkedMinutes(entries: DailyWorkEntry[]): number {
    return entries.reduce((sum, entry) => {
        if (entry.checkIn && entry.checkOut) {
            return sum + getDiffMinutes(entry.checkIn, entry.checkOut)
        }
        return sum
    }, 0)
}

export function getThisWeekDates(): string[] {
    const today = dayjs()
    const monday = today.startOf('week').add(1, 'day')
    return Array.from({length: 7}, (_, i) => monday.add(i, 'day').format('YYYY-MM-DD'))
}

export function calculateWeeklyMinutes(workMap: WorkRecord): number {
    return getThisWeekDates().reduce((total, date) => {
        const entries = workMap[date] || []
        return total + calculateTotalWorkedMinutes(entries)
    }, 0)
}