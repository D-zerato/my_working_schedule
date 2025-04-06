import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'jotai';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            refetchOnWindowFocus: false,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <App/>
                </Provider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

reportWebVitals();
