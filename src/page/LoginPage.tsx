import React from 'react'
import {Box, Button, Container, Typography} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import {useGoogleLoginEvent} from './login.event';

const LoginPage: React.FC = () => {
    const login = useGoogleLoginEvent()

    return (
        <Container maxWidth='sm' sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <Box
                width='100%'
                textAlign='center'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                px={3}
            >
                <Typography variant='h4' fontWeight={700} mb={4}>
                    My Working Schedule
                </Typography>

                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<GoogleIcon/>}
                    sx={{
                        textTransform: 'none',
                        borderRadius: '50px',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        width: '100%',
                        maxWidth: '300px'
                    }}
                    onClick={() => login()}
                >
                    Google로 로그인
                </Button>
            </Box>
        </Container>
    )
}

export default LoginPage