import {useGoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import {LocalStorageItemKeys} from '../../shared/model/LocalStorageItemKeys';
import {initDrive} from '../../server/service/auth.service';
import {validateAccessTokenApi} from '../../server/api/auth.api';

export function useGoogleLoginEvent() {
    const navigate = useNavigate();

    return useGoogleLogin({
        scope: "https://www.googleapis.com/auth/drive.file",
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            console.log("✅ 로그인 성공! accessToken:", accessToken);
            localStorage.setItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN, accessToken)
            await initDrive(accessToken);
            await navigate("/today")
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

        localStorage.setItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN, accessToken)
        initDrive(accessToken);
        navigate("/today")
        return;
    }
}