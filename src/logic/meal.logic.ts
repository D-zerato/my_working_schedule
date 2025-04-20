import {getFileIdByName, uploadJsonToDrive} from '../api/drive.file'
import {MealRecord, mealRecordAtom} from '../atoms/meal.atom'
import {getDefaultStore} from 'jotai'
import {getToday} from '../utils/date.utils'

const store = getDefaultStore()
const FILE_NAME = '2025-meal.json'

export async function saveTodayMealCost(amount: number): Promise<void> {
    const today = getToday()
    const mealMap = store.get(mealRecordAtom) as MealRecord
    const updated: MealRecord = {...(mealMap || {}), [today]: amount}
    store.set(mealRecordAtom, updated)
    const fileId = await getFileIdByName(FILE_NAME)
    if (fileId) await uploadJsonToDrive(fileId, updated)
}