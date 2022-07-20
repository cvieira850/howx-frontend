import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router';
import { api } from "../services/apiClient";

type SignInCredentials = {
    email: string;
    password: string;
};

type User = {
    id?: string;
    name?: string;
    email: string;
    role?: 'admin' | 'user' | 'sysAdmin';
    accessToken: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<User | null>;
    signOut: () =>  void;
    user:User;
    isAuthenticated: boolean;
    isAdmin: boolean;
}



type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(undefined, 'nextauth.token')

    authChannel.postMessage('signOut')

    Router.push('/')
}
export function AuthProvider({ children } : AuthProviderProps) {
    const [user, setUser] = useState<User>()
    let isAuthenticated = !! user;
    let isAdmin = false;

    useEffect(() => {
      authChannel = new BroadcastChannel('auth')
      authChannel.onmessage = (message) => {
        switch (message.data) {
          case 'signOut':
            signOut();
            isAuthenticated = false;
            break;
          default:
            break;
        }
      }
    }, [])

    useEffect(() => {
        const { 'nextauth.token' : token} = parseCookies()
        // setUser({ id: '1234', name: 'Caio Vieira', email: 'contato@caiovieira.com.br', role: 'user' })
        if(token) {
            api.get('/me').then(response => {
                const { email, name, id, role, accessToken } = response.data
                console.log(response.data)
                if(role === 'admin') {
                    isAdmin = true
                }
                setUser({ id, name, email, role, accessToken })
            }).catch(() => {
                signOut()
            })
        }
    },[])

    async function signIn({email, password}: SignInCredentials): Promise<User | null> {
        try {
            const response = await api.post('signin', {
                email,
                password
            })
            const { access_token } = response.data.data

            setCookie(undefined, 'nextauth.token', access_token, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })

            setUser({
                email,
                accessToken: access_token
            })
            
            api.defaults.headers['x-access-token'] = access_token;

            Router.push("/")
            const token: string = access_token
            return { 
                email,
                accessToken: token
            }
        } catch (err){
            console.log(err)
            return null
        }
        
    }

    return(
        <AuthContext.Provider value={{signIn, isAuthenticated, user, isAdmin, signOut  }}>
            {children}
        </AuthContext.Provider>
    )
}
