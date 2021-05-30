import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { baseURL } from '../services/api';
import { authContex } from "./authContext";

interface ISocketContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const SocketContext = createContext({} as ISocketContext);

interface SocketContextProviderProps {
    children: ReactNode
}

function SocketContextProvider({ children }: SocketContextProviderProps) {

    const { isSinged } = useContext(authContex);
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

    useEffect(() => {
        if (isSinged) {
            setSocket(io(baseURL, {
                query: {
                    token: sessionStorage.getItem('@token')
                }
            }))
        }
    }, [isSinged]);

    useEffect(() => {
        if (socket) {
            socket?.emit('change_status_user', true, (status: boolean) => {
                console.log('>>>ONLINE: ', status);
            })
        }
    }, [socket]);

    // desconecta quando usuário fizer logout
    useEffect((): any => {
        if (!isSinged) {
            return () => socket?.disconnect()
        }
    }, [isSinged]);

    // desconecta quando a página for desmontada
    useEffect((): any => {
        return () => socket?.disconnect()
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

export { SocketContext, SocketContextProvider };