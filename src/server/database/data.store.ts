import {atom} from 'jotai';
import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';
import {VacationScheduleModel} from '../../model/vacation/VacationScheduleModel';
import {MealCostModel} from '../../model/mealCost/MealCostModel';

export const origin_beforeMonthWorkingScheduleAtom = atom<WorkingScheduleModel[]>([]);

export const origin_targetMonthWorkingScheduleAtom = atom<WorkingScheduleModel[]>([]);

export const origin_afterMonthWorkingScheduleAtom = atom<WorkingScheduleModel[]>([]);

export const origin_vacationScheduleAtom = atom<VacationScheduleModel[]>([]);

export const origin_mealCostAtom = atom<MealCostModel[]>([]);
