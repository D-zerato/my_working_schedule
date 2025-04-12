import {initDriveAccessKey} from '../api/file.api';
import {LocalStorageItemKeys} from '../../shared/model/LocalStorageItemKeys';

export async function setAccessToken(token: string) {
    //
    localStorage.setItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN, token)
    await initDriveAccessKey(token)
}
