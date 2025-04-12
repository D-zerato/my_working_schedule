import {findFolder} from '../api/file.api';
import {findNearMonthSchedule} from './workingSchedule.service';
import dayjs from 'dayjs';
import {findVacationsByYear} from './vacation.service';
import {findMealCostsByYear} from './mealCost.service';
import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';
import {VacationScheduleModel} from '../../model/vacation/VacationScheduleModel';
import {MealCostModel} from '../../model/mealCost/MealCostModel';

export async function initDB(accessKey: string) {
    await findFolder(accessKey)

    const year = dayjs().year()
    const month = dayjs().month()

    const schedules: {
        before: WorkingScheduleModel[],
        target: WorkingScheduleModel[],
        after: WorkingScheduleModel[]
    } = await findNearMonthSchedule(year, month)

    const vacations: VacationScheduleModel[] = await findVacationsByYear(year)

    const mealCosts: MealCostModel[] = await findMealCostsByYear(year)


}