import {VacationRecord} from '../atoms/vacation.atom'
import {atom} from 'jotai'

export function calculateUsedVacation(vacations: VacationRecord): number {
    return Object.values(vacations).reduce((acc, type) => {
        switch (type) {
            case '오전 반반차':
            case '오후 반반차':
                return acc + 0.25
            case '오전 반차':
            case '오후 반차':
                return acc + 0.5
            case '휴가':
                return acc + 1
            default:
                return acc
        }
    }, 0)
}

export function calculateRemainingVacation(vacations: VacationRecord): number {
    const total = 15
    return total - calculateUsedVacation(vacations)
}

export interface DailyWorkEntry {
    checkIn: string
    checkOut?: string
}

export type WorkRecord = Record<string, DailyWorkEntry[]>
export const workRecordAtom = atom<WorkRecord>({})