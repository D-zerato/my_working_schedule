import {Schedule_Model} from '../model/schedule/Schedule_Model';
import {atom} from 'jotai/index';
import {Vacation_Model} from '../model/vacation/Vacation_Model';
import {MealCost_Model} from '../model/mealCost/MealCost_Model';

export const SchedulesMapAtom = atom<Map<string, Schedule_Model[]>>(new Map);
export const VacationsMapAtom = atom<Map<number, Vacation_Model[]>>(new Map);
export const MealCoastsMapAtom = atom<Map<number, MealCost_Model[]>>(new Map);