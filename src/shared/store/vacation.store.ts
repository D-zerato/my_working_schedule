import {atom} from 'jotai';
import dayjs from 'dayjs';
import {VacationScheduleModel} from '../../model/vacation/VacationScheduleModel';

export const selectYearAtom = atom<number>(dayjs().year)

export const vacationsAtom = atom<VacationScheduleModel[]>([])