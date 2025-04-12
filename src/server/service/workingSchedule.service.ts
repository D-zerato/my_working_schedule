import {createEmptyJsonFile, findFileByName} from '../api/file.api';
import {DriveFileContentModel} from '../model/DriveFileContentModel';
import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';
import {findDriveFolder} from './folder.service';
import dayjs from 'dayjs';

export async function findWorkingSchedulesByYearAndMonth(year: number, month: number): Promise<WorkingScheduleModel[]> {
    let file: DriveFileContentModel | undefined = await findFileByName(await findDriveFolder(), generateFileName(year, month));
    if (!file) {
        file = await createEmptyFile(year, month);
    }

    if (!file) {
        throw new Error(`Failed to find file with ${year}, ${month}`);
    }

    return JSON.parse(file.content);
}

function generateFileName(year: number, month: number) {
    return `${year}-${month}-workingSchedule.json`
}

async function createEmptyFile(year: number, month: number): Promise<DriveFileContentModel | undefined> {
    return await createEmptyJsonFile(await findDriveFolder(), generateFileName(year, month));
}

export async function findNearMonthSchedule(year: number, month: number): Promise<{
    before: WorkingScheduleModel[],
    target: WorkingScheduleModel[],
    after: WorkingScheduleModel[]
}> {

    const dayData = dayjs().set('year', year).set('month', month)

    const beforeYear = dayData.add(-1, 'month').year()
    const beforeMonth = dayData.add(-1, 'month').month()
    const beforeMonthSchedules: WorkingScheduleModel[] = await findWorkingSchedulesByYearAndMonth(beforeYear, beforeMonth)

    const targetMonthSchedules: WorkingScheduleModel[] = await findWorkingSchedulesByYearAndMonth(month, month)

    const afterYear = dayData.add(1, 'month').year()
    const afterMonth = dayData.add(1, 'month').month()
    const afterMonthSchedules: WorkingScheduleModel[] = await findWorkingSchedulesByYearAndMonth(afterYear, afterMonth)

    return {
        before: beforeMonthSchedules,
        target: targetMonthSchedules,
        after: afterMonthSchedules,
    }
}