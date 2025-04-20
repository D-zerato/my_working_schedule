import {atom} from 'jotai';
import dayjs from 'dayjs';
import {Vacation_Model} from '../../model/vacation/Vacation_Model';

export const selectYearAtom = atom<number>(dayjs().year)

export const vacationsAtom = atom<Vacation_Model[]>([])