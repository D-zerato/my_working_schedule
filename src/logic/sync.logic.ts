import {getJsonFromDrive} from '../api/drive.file'
import {isLoadingAtom} from '../atoms/shared.store'
import {WorkRecord, workRecordAtom} from '../atoms/work.atom'
import {MealRecord, mealRecordAtom} from '../atoms/meal.atom'
import {VacationRecord, vacationRecordAtom} from '../atoms/vacation.atom'
import {Setter} from 'jotai'

export async function initData(set: Setter): Promise<void> {
    set(isLoadingAtom, true)
    try {
        const [workJson, mealJson, vacationJson] = await Promise.all([
            getJsonFromDrive('2025-04.json'),
            getJsonFromDrive('2025-meal.json'),
            getJsonFromDrive('2025-vacation.json')
        ])
        set(workRecordAtom, (workJson ?? {}) as WorkRecord)
        set(mealRecordAtom, (mealJson ?? {}) as MealRecord)
        set(vacationRecordAtom, (vacationJson ?? {}) as VacationRecord)
    } catch (e) {
        console.error('initData error:', e)
    }
    set(isLoadingAtom, false)
}