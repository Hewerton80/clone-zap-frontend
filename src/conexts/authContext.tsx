import { ReactNode } from 'react';
import { createContext } from "react";
import useAuth, { ICredentials, IUser } from '../hooks/useAuth';


interface IAuthContex {
    isSinged: boolean;
    user: IUser;
    isLoadResponse: boolean;
    isLoadPage: boolean;
    loginErr: string;
    singIn(credentials: ICredentials): Promise<void>;
    singOut: () => Promise<void>;
}

interface AuthContexrProviderProps {
    children: ReactNode
}
const authContex = createContext({} as IAuthContex);

function AuthContexrProvider({ children }: AuthContexrProviderProps) {

    const {
        user,
        isSinged,
        isLoadResponse,
        loginErr,
        isLoadPage,
        singIn,
        singOut,
    } = useAuth();

    return (
        <authContex.Provider
            value={{
                user,
                isSinged,
                isLoadResponse,
                loginErr,
                isLoadPage,
                singIn,
                singOut,
            }}
        >
            {isLoadPage ? <></> : children}
        </authContex.Provider>
    )
}

export { authContex, AuthContexrProvider };