import {TokenResponse, useGoogleLogin} from '@react-oauth/google';
import ServerLogic from '../_server/logic/server.logic';
import {useNavigate} from 'react-router-dom';

const serverLogic = ServerLogic();

export function useLoginEvent() {
    const navigate = useNavigate()

    async function onSuccess(accessToken: string, tokenResponse: TokenResponse) {
        await serverLogic.init(accessToken)
        navigate("/today")
    }

    function onError(error: unknown) {

    }

    return useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/drive.file',
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            try {
                const accessToken = tokenResponse.access_token;
                console.log('✅ 로그인 성공! accessToken:', accessToken);
                if (onSuccess) {
                    await onSuccess(accessToken, tokenResponse);
                }
            } catch (e) {
                console.error('❌ 로그인 처리 중 오류 발생:', e);
                onError?.(e);
            }
        },
        onError: (err) => {
            console.error('❌ 로그인 실패:', err);
            onError?.(err);
        },
    });
}

export async function validateToken(token: string) {
    const result = await serverLogic.validateAccessToken(token);
    if (result) {
        await serverLogic.init(token)
    }

    return result;
}

