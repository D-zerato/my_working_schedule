import {DriveFileContent_Model} from '../model/DriveFileContent_Model';

const FileApi_Server = () => {
    async function find(googleAccessKey: string, folderId: string, fileName: string): Promise<DriveFileContent_Model | undefined> {
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
    }

    async function create(googleAccessKey: string, folderId: string, fileName: string, fileContents: any): Promise<DriveFileContent_Model | undefined> {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${googleAccessKey}`,
                'Content-Type': 'multipart/related; boundary=foo_bar_baz',
            },
            body: [
                '--foo_bar_baz',
                'Content-Type: application/json; charset=UTF-8',
                '',
                JSON.stringify({
                    name: fileName,
                    mimeType: 'application/json',
                    parents: [folderId],
                }),
                '--foo_bar_baz',
                'Content-Type: application/json; charset=UTF-8',
                '',
                fileContents ? JSON.stringify(fileContents, null, 2) : '{}',
                '--foo_bar_baz--',
            ].join('\r\n'),
        });

        const fileData = await response.json();
        if (fileData.id) {
            console.log(`File created with ID: ${fileData.id}`);
            return fileData.id;
        } else {
            console.error('Failed to create file');
        }
    }

    return {
        find,
        create,
    }
}

export default FileApi_Server