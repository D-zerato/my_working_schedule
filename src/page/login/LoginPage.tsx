import React, {useEffect} from "react";
import {Box, Container, Typography} from "@mui/material";
import GoogleLoginButton from './component/GoogleLoginButton';
import {LocalStorageItemKeys} from '../../shared/model/LocalStorageItemKeys';
import {useValidateAccessTokenEvent} from './login.event';
import {useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN) || undefined

    const loginCheck = useValidateAccessTokenEvent()

    useEffect(() => {
        loginCheck(accessToken)
    }, [accessToken]);

    return (
        <Container maxWidth="sm" sx={{height: "100vh", display: "flex", alignItems: "center"}}>
            <Box
                width="100%"
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                px={3}
            >
                <Typography variant="h4" fontWeight={700} mb={4}>
                    My Working Schedule
                </Typography>

                <GoogleLoginButton/>
            </Box>
        </Container>
    );
};

export default LoginPage;
