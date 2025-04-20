import {DriveFolder_Model} from '../model/DriveFolder_Model';
import {DriveFileContent_Model} from '../model/DriveFileContent_Model';
import AuthApi_Server from '../api/server.auth.api';
import FileApi_Server from '../api/server.file.api';
import FolderApi_Server from '../api/server.folder.api';
import {LocalStorageItemKeys} from '../../shared/model/LocalStorageItemKeys';

const DEFAULT_DRIVE_FOLDER_NAME = 'App_My_Working_Schedule'

const ServerLogic = () => {
    const authApi = AuthApi_Server()
    const fileApi = FileApi_Server()
    const folderApi = FolderApi_Server()

    let folderId: string | undefined = undefined

    function validateAccessToken(token: string) {
        return authApi.validateGoogleAccessToken(token);
    }

    async function init(accessToken: string) {
        await initFolder(accessToken)
        localStorage.setItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN, accessToken);
    }

    async function initFolder(accessToken: string) {
        let folder: DriveFolder_Model | undefined = await folderApi.find(accessToken, DEFAULT_DRIVE_FOLDER_NAME)
        if (!folder) {
            folder = await folderApi.create(accessToken, DEFAULT_DRIVE_FOLDER_NAME)
        }

        folderId = folder.id
        localStorage.setItem(LocalStorageItemKeys.GOOGLE_FOLDER_ID, folderId);
        return folderId
    }

    async function registerFile(fileName: string, fileContents?: any) {
        const accessKey = getAccessToken()
        if (!accessKey) {
            throw new Error('Unable to create access access token')
        }

        await fileApi.create(accessKey, await getFolderId(), fileName, fileContents)
    }

    async function findFile(fileName: string): Promise<DriveFileContent_Model | undefined> {
        const accessKey = getAccessToken()
        if (!accessKey) {
            throw new Error('Unable to create access access token')
        }

        return await fileApi.find(accessKey, await getFolderId(), fileName)
    }

    async function getFolderId() {
        const accessToken = localStorage.getItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN)

        if (!accessToken) {
            throw new Error("Unable to create access access token")
        }

        const folderId = localStorage.getItem(LocalStorageItemKeys.GOOGLE_FOLDER_ID)
        if (!folderId) {
            return await initFolder(accessToken)
        }

        return folderId
    }

    function getAccessToken() {
        return localStorage.getItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN)
    }

    return {
        validateAccessToken,
        init,
        registerFile,
        findFile,
    }
}

export default ServerLogic