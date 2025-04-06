import {createEmptyJsonFile, findFileByName} from '../api/file.api';
import {DriveFileContentModel} from '../model/DriveFileContentModel';
import {WorkingScheduleModel} from '../../model/workingSchedule/WorkingScheduleModel';
import {findFolderId} from './folder.service';

export async function findWorkingSchedulesByYearAndMonth(year: number, month: number): Promise<WorkingScheduleModel[]> {
    let file: DriveFileContentModel | undefined = await findFileByName(await findFolderId(), generateFileName(year, month));
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
    return await createEmptyJsonFile(await findFolderId(), generateFileName(year, month));
}