import {atom} from 'jotai'

export type MealRecord = Record<string, number>
export const mealRecordAtom = atom<MealRecord>({})
