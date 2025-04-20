let folderIdCache: string | null = null
const DRIVE_FOLDER_NAME = 'APP_MY_WORKING_SCHEDULES'
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3'
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files'
const DRIVE_DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files'

const getAccessToken = (): string => {
    const token = localStorage.getItem('GOOGLE_ACCESS_TOKEN')
    if (!token) throw new Error('Google access token not found.')
    return token
}

// 🔹 폴더 없으면 생성
async function getOrCreateFolderId(): Promise<string> {
    if (folderIdCache !== null) return folderIdCache as string
    const accessToken = getAccessToken()

    const searchRes = await fetch(
        `${DRIVE_API_URL}/files?q=name='${DRIVE_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id,name)`,
        {
            headers: {Authorization: `Bearer ${accessToken}`}
        }
    )
    const result = await searchRes.json()
    const found = result?.files?.[0]
    if (found?.id) {
        folderIdCache = found.id
        return found.id
    }

    const createRes = await fetch(`${DRIVE_API_URL}/files`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: DRIVE_FOLDER_NAME,
            mimeType: 'application/vnd.google-apps.folder'
        })
    })

    const created = await createRes.json()
    folderIdCache = created.id
    return created.id
}

// 🔍 파일 ID 조회
export async function getFileIdByName(fileName: string): Promise<string | null> {
    const accessToken = getAccessToken()
    const folderId = await getOrCreateFolderId()
    const res = await fetch(
        `${DRIVE_API_URL}/files?q=name='${fileName}' and '${folderId}' in parents and trashed = false&fields=files(id,name)`,
        {
            headers: {Authorization: `Bearer ${accessToken}`}
        }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.files?.[0]?.id ?? null
}

// 📥 파일 다운로드
export async function downloadJsonFile(fileId: string): Promise<any | null> {
    const accessToken = getAccessToken()
    const res = await fetch(`${DRIVE_DOWNLOAD_URL}/${fileId}?alt=media`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    })
    if (!res.ok) return null
    return await res.json()
}

// 📤 파일 업로드
export async function uploadJsonToDrive(fileId: string, content: any): Promise<void> {
    const accessToken = getAccessToken()
    await fetch(`${DRIVE_UPLOAD_URL}/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content, null, 2)
    })
}

// 📦 파일 ID로 다운로드하는 유틸
export async function getJsonFromDrive(fileName: string): Promise<any | null> {
    const fileId = await getFileIdByName(fileName)
    if (!fileId) return null
    return await downloadJsonFile(fileId)
}
