import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {Button} from '@mui/material';
import {useLoginEvent} from '../../../logic/auth.logic';

export const GoogleLoginButton = () => {
    const login = useLoginEvent()
    return <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon/>}
        sx={{
            textTransform: "none",
            borderRadius: "50px",
            padding: "12px 24px",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "300px",
        }}
        onClick={() => login()}
    >
        Google로 로그인
    </Button>
}

export default GoogleLoginButton;