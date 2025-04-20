import {atom} from 'jotai/index';
import dayjs from 'dayjs';
import {Schedule_Model} from '../../model/schedule/Schedule_Model';

export const selectYearAtom = atom<number>(dayjs().year)

export const selectMonthAtom = atom<number>(dayjs().month)

export const workingScheduleMapAtom = atom<Map<string, Schedule_Model[]> | undefined>(undefined)