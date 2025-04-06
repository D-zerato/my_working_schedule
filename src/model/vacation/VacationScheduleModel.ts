import {VacationType} from './VacationType';

export interface VacationScheduleModel {
    date: Date
    type: VacationType;
    registeredTime: Date;
}