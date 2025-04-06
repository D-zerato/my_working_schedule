import {createEmptyJsonFile, findFileByName} from '../api/file.api';
import {DriveFileContentModel} from '../model/DriveFileContentModel';
import {VacationScheduleModel} from '../../model/vacation/VacationScheduleModel';
import {findFolderId} from './folder.service';

export async function findVacationsByYear(year: number): Promise<VacationScheduleModel[]> {
    let file: DriveFileContentModel | undefined = await findFileByName(await findFolderId(), generateFileName(year));
    if (!file) {
        file = await createEmptyFile(year);
    }

    if (!file) {
        throw new Error(`Failed Finding file with ${year}}`);
    }

    return JSON.parse(file.content);
}

function generateFileName(year: number) {
    return `${year}-vacation.json`
}

async function createEmptyFile(year: number): Promise<DriveFileContentModel | undefined> {
    return await createEmptyJsonFile(await findFolderId(), generateFileName(year));
}