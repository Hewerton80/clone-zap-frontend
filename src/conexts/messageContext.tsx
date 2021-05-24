import { createContext, ReactNode } from "react";
import useMessage, { IMessage, StatusMsgType } from "../hooks/useMessage";

interface IMessageContext {
    messages: IMessage[];
    clearMessages: () => void;
    addMessage: (message: IMessage) => void;
    handleSetMessages: (messages: IMessage[]) => void;
    updateStatusMenssageById: (id: string, status: StatusMsgType) => void
}

const MessageContext = createContext({
    messages: []
} as IMessageContext);

interface MessageContextProviderProps {
    children: ReactNode
}

function MessageContextProvider({ children }: MessageContextProviderProps) {

    const {
        messages,
        clearMessages,
        addMessage,
        handleSetMessages,
        updateStatusMenssageById
    } = useMessage();

    return (
        <MessageContext.Provider
            value={{
                messages,
                clearMessages,
                addMessage,
                handleSetMessages,
                updateStatusMenssageById
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageContextProvider };