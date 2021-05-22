import { ReactNode } from 'react';
import { createContext } from "react";
import useAuth, { ICredentialsSingIn, ICredentialsSingUp, IUser } from '../hooks/useAuth';


interface IAuthContex {
    isSinged: boolean;
    user: IUser;
    isLoadResponse: boolean;
    isLoadPage: boolean;
    loginErr: string;
    registerErr: string;
    singIn(credentials: ICredentialsSingIn): Promise<void>;
    singUp(credentials: ICredentialsSingUp): Promise<void>;
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
        registerErr,
        isLoadPage,
        singIn,
        singUp,
        singOut,
    } = useAuth();

    return (
        <authContex.Provider
            value={{
                user,
                isSinged,
                isLoadResponse,
                loginErr,
                registerErr,
                isLoadPage,
                singIn,
                singUp,
                singOut,
            }}
        >
            {isLoadPage ? <></> : children}
        </authContex.Provider>
    )
}

export { authContex, AuthContexrProvider };