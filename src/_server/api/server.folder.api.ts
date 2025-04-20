import {DriveFolder_Model} from '../model/DriveFolder_Model';

const FolderApi_Server = () => {
    async function find(googleAccessKey: string, folderName: string): Promise<DriveFolder_Model | undefined> {
        const queryParams = new URLSearchParams({
            q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id)',
        })

        const response = await fetch(`https://www.googleapis.com/drive/v3/files?${queryParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${googleAccessKey}`,
            },
        });

        const data = await response.json();
        if (data.files && data.files.length > 0) {
            return data.files[0] as DriveFolder_Model; // 첫 번째 폴더의 ID 반환
        } else {
            console.log('Folder not found');
            return undefined;
        }
    }

    async function create(googleAccessKey: string, folderName: string): Promise<DriveFolder_Model> {
        const response = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${googleAccessKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder', // 폴더 MIME 타입
            }),
        });

        return await response.json();
    }

    return {
        create,
        find,
    }
}

export default FolderApi_Server