import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestQueue = [];

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'x-access-token': cookies['nextauth.token']
        }
    });
    
    api.interceptors.response.use( response => {
        return response;
    }, (error: AxiosError<any,any>) => {
        if(error.response.status === 401) {
            if(error.response.data?.code === 'token.expired'){
                cookies = parseCookies(ctx);
    
                const { 'nextauth.refreshToken': refreshToken } = cookies;
                const originalConfig = error.config
    
                if(!isRefreshing){
                    isRefreshing = true
    
                    api.post('/refresh', {
                        refreshToken
                    }).then(response => {
                        const { accessToken: newToken } = response.data
                        setCookie(ctx, 'nextauth.token', newToken, {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/'
                        });
                        api.defaults.headers['x-access-token'] = newToken;
    
                        failedRequestQueue.forEach(request => request.onSucess(newToken))
                        failedRequestQueue = []
                    }).catch(err => {
                        failedRequestQueue.forEach(request => request.onFailure(err))
                        failedRequestQueue = []
    
                        if(typeof window !== 'undefined') {
                            signOut();
                        }
                    }).finally(() => {
                        isRefreshing = false
                    });
                }
    
                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSucess: (token: string) => {
                            originalConfig.headers['x-access-token'] = token;
    
                            resolve(api(originalConfig))
                        },
                        onFailure: (err: AxiosError) => {
                            reject(err)
                        }
                    })
                })
            } else {
                if(typeof window !== 'undefined') {
                    signOut();
                } else {
                  return Promise.reject(new AuthTokenError())
                }
            }
        }
    
        return Promise.reject(error);
    });
    return api;
}
