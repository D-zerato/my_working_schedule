import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';
import {VacationScheduleModel} from '../../model/vacation/VacationScheduleModel';
import {MealCostModel} from '../../model/mealCost/MealCostModel';

const scheduleMap: Map<string, WorkingScheduleModel[]> = new Map();
const vacationMap: Map<number, VacationScheduleModel[]> = new Map();
const mealCoastsMap: Map<number, MealCostModel[]> = new Map();

export function findSchedules_DB(year: number, month: number): WorkingScheduleModel[] {
    return scheduleMap.get(`${year}_${month}`) || [];
}

export function registerSchedules_DB(year: number,
                                     month: number,
                                     workingSchedules: WorkingScheduleModel[]) {
    scheduleMap.set(`${year}_${month}`, workingSchedules);
}

export function findVacations_DB(year: number) {
    return vacationMap.get(year) || [];
}

export function registerVacations_DB(year: number, vacations: VacationScheduleModel[]) {
    vacationMap.set(year, vacations);
}

export function findMealCoasts_DB(year: number) {
    return mealCoastsMap.get(year) || [];
}

export function registerMealCoats_DB(year: number, mealCostModels: MealCostModel[]) {
    mealCoastsMap.set(year, mealCostModels);
}