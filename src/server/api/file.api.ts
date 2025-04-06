import {DriveFileContentModel} from '../model/DriveFileContentModel';
import {DriveFolderModel} from '../model/DriveFolderModel';

export let googleAccessKey: undefined | string = undefined

export function initAccessKey(accessToken: string) {
    googleAccessKey = accessToken;
}

export const findFileByName = async (folderId: string, fileName: string): Promise<DriveFileContentModel | undefined> => {
    try {
        const queryParams = new URLSearchParams({
            q: `'${folderId}' in parents and name = '${fileName}' and mimeType = 'application/json'`,
            fields: 'files(id, name)',
        })

        const response = await fetch(`https://www.googleapis.com/drive/v3/files?${queryParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${googleAccessKey}`,
            },
        });

        const fileData = await response.json();
        if (fileData.files && fileData.files.length > 0) {
            const fileId = fileData.files[0].id;

            // 파일 내용 조회
            const contentResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${googleAccessKey}`,
                },
            });

            const content = await contentResponse.text();
            return {
                id: fileId,
                name: fileData.files[0].name,
                content: content,  // JSON 파일 내용
            };
        } else {
            console.log('File not found');
            return undefined;
        }
    } catch (error) {
        console.error('Error fetching file content:', error);
    }
};

export const createEmptyJsonFile = async (folderId: string, fileName: string): Promise<DriveFileContentModel | undefined> => {
    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${googleAccessKey}`,
                'Content-Type': 'multipart/related; boundary=foo_bar_baz',
            },
            body: `
        --foo_bar_baz
        Content-Type: application/json; charset=UTF-8
        Content-Disposition: form-data; name="metadata"
        
        {
          "name": "${fileName}",
          "mimeType": "application/json",
          "parents": ["${folderId}"]
        }
        --foo_bar_baz
        Content-Type: application/json
        
        {}
        --foo_bar_baz--
      `,
        });

        const fileData = await response.json();
        if (fileData.id) {
            console.log(`File created with ID: ${fileData.id}`);
            return fileData.id;
        } else {
            console.error('Failed to create file');
        }
    } catch (error) {
        console.error('Error creating empty JSON file:', error);
    }
};


export const findFolder = async (folderName: string): Promise<DriveFolderModel | undefined> => {
    try {
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
            return data.files[0] as DriveFolderModel; // 첫 번째 폴더의 ID 반환
        } else {
            console.log('Folder not found');
            return undefined;
        }
    } catch (error) {
        console.error('Error fetching folder ID:', error);
        return undefined;
    }
};

export const createFolder = async (folderName: string): Promise<string | undefined> => {
    try {
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

        const folderData = await response.json();
        if (folderData.id) {
            console.log(`Folder created with ID: ${folderData.id}`);
            return folderData.id;
        } else {
            console.error('Failed to create folder');
        }
    } catch (error) {
        console.error('Error creating folder:', error);
    }
};