import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

export interface IUser {
    id: string;
    name: string;
    phone: string;
}

export interface ICredentials {
    name: string;
    phone: string;
    password: string;
}


const useAuth = () => {

    const [user, setUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState<string>('');
    const [isLoadResponse, setIsLoadResponse] = useState<boolean>(false);
    const [isLoadPage, setIsLoadPage] = useState<boolean>(true);
    const [loginErr, setLoginErr] = useState<string>('');

    const isSinged = useMemo<boolean>(() =>
        (!!user.id && !!user.name && !!user.phone && !!token)
        , [user, token]);

    useEffect(() => {
        const userData = localStorage.getItem('@user');
        const tokenData = localStorage.getItem('@token');
        if (!!userData && !!tokenData) {
            try {
                const userParsed = JSON.parse(userData) as IUser;
                setUser(userParsed);
                setToken(tokenData);
            }
            catch (err) {
                console.error('erro ao setar usuário');
            }
        }
        setIsLoadPage(false);
    }, []);

    const singIn = useCallback(async (credentials: ICredentials) => {
        setIsLoadResponse(true);
        setLoginErr('');
        try {
            const response = await api.post('/auth/login', credentials);
            const { user: userResponse, token } = response.data;
            setUser(userResponse);
            setToken(token);
            localStorage.setItem('@token', token);
            localStorage.setItem('@user', JSON.stringify(userResponse));
        }
        catch (err) {
            // console.log(Object.getOwnPropertyDescriptors(err));
            if (err?.response?.status === 400) {
                setLoginErr('Credenciais inválidas');
            }
            else if (err?.response?.status === 500) {
                setLoginErr('Falha ao fazer login, por favor, tente novamente mais tarde');
            }
            else {
                setLoginErr('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }

        }
        setIsLoadResponse(false);
    }, []);

    const singOut = useCallback(async () => {
        setUser({} as IUser);
        localStorage.clear();
    }, []);


    return {
        user,
        isSinged,
        isLoadResponse,
        loginErr,
        isLoadPage,
        singIn,
        singOut,
    };
}
export default useAuth;