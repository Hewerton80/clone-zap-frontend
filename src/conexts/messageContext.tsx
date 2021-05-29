import { createContext, ReactNode } from "react";
import useMessage, { IMessage, StatusMsgType } from "../hooks/useMessage";

interface IMessageContext {
    messages: IMessage[];
    clearMessages: () => void;
    addMessage: (message: IMessage) => void;
    handleSetMessages: (messages: IMessage[]) => void;
    updateStatusMenssageByIds: (ids: string[], status: StatusMsgType) => void
}

const MessageContext = createContext({
    messages: []
} as IMessageContext);

interface MessageContextProviderProps {
    children: ReactNode
}

function MessageContextProvider({ children }: MessageContextProviderProps) {

    const messageValues = useMessage();

    return (
        <MessageContext.Provider
            value={messageValues}
        >
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageContextProvider };