import {atom} from 'jotai';
import {Schedule_Model} from '../model/schedule/Schedule_Model';

export const SchedulesMapAtom = atom<Map<string, Schedule_Model[]>>(new Map)


function generateScheduleKey(year: number, month: number) {
    return `${year}-${month}`
}