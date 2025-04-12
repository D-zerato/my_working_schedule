import {useGoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import {setAccessToken} from '../../server/service/auth.service';
import {validateAccessTokenApi} from '../../server/api/auth.api';
import {findDriveFolder} from '../../server/service/folder.service';

export function useGoogleLoginEvent() {
    const navigate = useNavigate();

    return useGoogleLogin({
        scope: "https://www.googleapis.com/auth/drive.file",
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            console.log("✅ 로그인 성공! accessToken:", accessToken);
            await setAccessToken(accessToken);
            await findDriveFolder();
            navigate("/today")
        },
        onError: (err) => {
            console.error(err)
        },
        flow: "implicit", // 또는 "auth-code" 방식 (원하면 변경 가능)
    })
}

export function useValidateAccessTokenEvent() {
    const navigate = useNavigate();

    return async (accessToken: string | undefined) => {
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const result = await validateAccessTokenApi(accessToken)
        if (!result) {
            navigate("/login");
            return;
        }

        await setAccessToken(accessToken);
        await findDriveFolder()
        navigate("/today")
        return;
    }
}