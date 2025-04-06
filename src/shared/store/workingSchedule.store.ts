import {atom} from 'jotai/index';
import dayjs from 'dayjs';
import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';

export const selectYearAtom = atom<number>(dayjs().year)

export const selectMonthAtom = atom<number>(dayjs().month)

export const workingScheduleMapAtom = atom<Map<string, WorkingScheduleModel[]> | undefined>(undefined)