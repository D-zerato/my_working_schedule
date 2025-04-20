import {atom} from 'jotai'

export type VacationType = '오전 반반차' | '오전 반차' | '오후 반반차' | '오후 반차' | '휴가'
export type VacationRecord = Record<string, VacationType>
export const vacationRecordAtom = atom<VacationRecord>({})