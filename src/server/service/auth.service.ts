import {initAccessKey} from '../api/file.api';
import {findFolderId} from './folder.service';

export async function initDrive(token: string) {
    //
    await initAccessKey(token)
    await findFolderId()
}
