import {createEmptyJsonFile, findFileByName} from '../api/file.api';
import {DriveFileContentModel} from '../model/DriveFileContentModel';
import {MealCostModel} from '../../model/mealCost/MealCostModel';
import {findDriveFolder} from './folder.service';

export async function findMealCostsByYear(year: number): Promise<MealCostModel[]> {
    let file: DriveFileContentModel | undefined = await findFileByName(await findDriveFolder(), generateFileName(year));
    if (!file) {
        file = await createEmptyFile(year);
    }

    if (!file) {
        throw new Error(`Failed Find file with ${year}}`);
    }

    return JSON.parse(file.content);
}

function generateFileName(year: number) {
    return `${year}-mealCost.json`
}

async function createEmptyFile(year: number): Promise<DriveFileContentModel | undefined> {
    return await createEmptyJsonFile(await findDriveFolder(), generateFileName(year));
}