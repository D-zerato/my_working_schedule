const AuthApi_Server = () => {
    async function validateGoogleAccessToken(token: string): Promise<boolean> {
        return await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(async (response) => {
                const data = await response.json()
                if (data.error) {
                    console.error(data.error);
                    return false;
                }
                return true
            }).catch(e => {
                console.error(e);
                return false;
            });
    }

    return {
        validateGoogleAccessToken,
    }
}

export default AuthApi_Server;