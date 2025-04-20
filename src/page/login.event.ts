import {useGoogleLogin} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'

export function useGoogleLoginEvent() {
    const navigate = useNavigate()

    return useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/drive.file',
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token
            console.log('✅ 로그인 성공! accessToken:', accessToken)
            localStorage.setItem('GOOGLE_ACCESS_TOKEN', accessToken)
            navigate('/today')
        },
        onError: (err) => {
            console.error('❌ 로그인 오류:', err)
        }
    })
}