import { createContext, ReactNode, useEffect, useMemo } from "react";
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { baseURL } from '../services/api';

interface ISocketContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const SocketContext = createContext({} as ISocketContext);

interface SocketContextProviderProps {
    children: ReactNode
}

function SocketContextProvider({ children }: SocketContextProviderProps) {

    const socket = useMemo(() => io(baseURL, {
        query: {
            token: sessionStorage.getItem('@token')
        }
    }), []);

    useEffect((): any => {
        return () => socket && socket.disconnect()
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketContextProvider};