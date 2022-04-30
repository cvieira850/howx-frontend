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
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
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
        setUser({ id: '1234', name: 'Caio Vieira', email: 'contato@caiovieira.com.br', role: 'user' })
        if(!token) {
            // api.get('/me').then(response => {
            //     const { email, name, id, role } = response.data
            //     if(role === 'admin') {
            //         isAdmin = true
            //     }
            //     setUser({ id, name, email, role })
            // }).catch(() => {
            //     signOut()
            // })
        }
    },[])

    async function signIn({email, password}: SignInCredentials) {
        try {
            const response = await api.post('signin', {
                email,
                password
            })
            const { accessToken } = response.data;
            setCookie(undefined, 'nextauth.token', accessToken, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })

            setUser({
                email
            })
            console.log(response.data)
            api.defaults.headers['x-access-token'] = accessToken;

            Router.push("/")
        } catch (err){
            console.log(err)
        }
        
    }

    return(
        <AuthContext.Provider value={{signIn, isAuthenticated, user, isAdmin, signOut  }}>
            {children}
        </AuthContext.Provider>
    )
}
