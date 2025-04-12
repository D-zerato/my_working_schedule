import {createFolder, findFolder} from '../api/file.api';

const DEFAULT_PROJECT_FOLDER_NAME = "app_my_working_schedule";

let folderId: string | undefined = undefined;

export async function findDriveFolder(): Promise<string> {
    //
    if (folderId) {
        return folderId;
    }

    const driveFolder = await findFolder(DEFAULT_PROJECT_FOLDER_NAME)
    if (!driveFolder) {
        const folderId = await createFolder(DEFAULT_PROJECT_FOLDER_NAME);

        if (!folderId) {
            throw new Error(`Failed to find folder with ${folderId}`);
        }
        return folderId;
    }
    return driveFolder.id
}