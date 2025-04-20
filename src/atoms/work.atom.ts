import {atom} from 'jotai'

export interface DailyWorkEntry {
    checkIn: string
    checkOut?: string
}

export type WorkRecord = Record<string, DailyWorkEntry[]>
export const workRecordAtom = atom<WorkRecord>({})