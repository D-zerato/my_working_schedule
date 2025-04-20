import React, {useEffect} from "react";
import {Box, Container, Typography} from "@mui/material";
import GoogleLoginButton from './component/GoogleLoginButton';
import {LocalStorageItemKeys} from '../../shared/model/LocalStorageItemKeys';
import {useNavigate} from 'react-router-dom';
import {validateToken} from '../../logic/auth.logic';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem(LocalStorageItemKeys.GOOGLE_ACCESS_TOKEN) || undefined

    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
            return
        }

        validateToken(accessToken)
            .then((response) => {
                if (response) {
                    navigate("/today")
                    return
                } else {
                    navigate("/login")
                }
            }).catch((e) => console.error("Failed to validate token", e))

    }, [accessToken])

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
